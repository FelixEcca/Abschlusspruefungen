'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { toPng } from 'html-to-image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {
  faArrowTrendUp,
  faDownload,
  faFileLines,
  faLanguage,
  faLayerGroup,
  faListOl,
  faMountain,
  faRoute,
  faSeedling,
  faSpinner,
  faTriangleExclamation,
  faWandMagicSparkles,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@/components/ui/FaIcon'
import { exercisesData } from '@/content/exercises'
import { extractor } from '@/components/exercise-view/extractor/extractor'
import { makePost } from '@/helper/make-post'

type WorksheetDifficulty = 'leichter' | 'gleich' | 'schwerer'
type WorksheetMaterialType = 'standard' | 'differentiated' | 'series'
type WorksheetLevel = 'a' | 'b' | 'c'
type WorksheetLevelCounts = Record<WorksheetLevel, number>

type WorksheetItem = {
  number: number
  content: string
}

type GeneratedWorksheet = {
  title: string
  intro: string
  tasks: WorksheetItem[]
  solutions: WorksheetItem[]
  materialType?: WorksheetMaterialType
  levelCounts?: WorksheetLevelCounts
}

type GeneratorStatus = 'idle' | 'requesting' | 'rendering' | 'ready'

type AiWorksheetGeneratorProps = {
  exerciseId: number
  data: object
  pageIndex: string
}

const difficultyOptions: Array<{
  value: WorksheetDifficulty
  label: string
}> = [
  { value: 'leichter', label: 'Leichter' },
  { value: 'gleich', label: 'Gleiches Niveau' },
  { value: 'schwerer', label: 'Schwerer' },
]

const materialTypeOptions = [
  {
    value: 'standard' as const,
    label: 'Sammlung',
    description: 'Kompakte, abwechslungsreiche Aufgaben',
    icon: faListOl,
  },
  {
    value: 'differentiated' as const,
    label: '3 Niveaus',
    description: 'Getrennte Aufgaben auf A-, B- und C-Niveau',
    icon: faLayerGroup,
  },
  {
    value: 'series' as const,
    label: 'Aufgabenserie',
    description: 'Geplanter Lernweg vom Einstieg bis zum Ziel',
    icon: faArrowTrendUp,
  },
]

const DIFFERENTIATION_BRIEF = `A-Niveau:
B-Niveau:
C-Niveau:`

const SERIES_BRIEF = `Startkompetenz:
Zielkompetenz:`

const NOTE_LIMIT = 1200

const levelOptions = [
  {
    key: 'a' as const,
    label: 'A-Niveau',
    description: 'Grundlagen',
    icon: faSeedling,
    color: '#13795b',
    background: '#ecfdf5',
  },
  {
    key: 'b' as const,
    label: 'B-Niveau',
    description: 'Anwendung',
    icon: faRoute,
    color: '#315aa6',
    background: '#eff6ff',
  },
  {
    key: 'c' as const,
    label: 'C-Niveau',
    description: 'Transfer',
    icon: faMountain,
    color: '#a84f12',
    background: '#fff7ed',
  },
]

function readBriefField(note: string, label: string) {
  const labels = [
    'A-Niveau',
    'B-Niveau',
    'C-Niveau',
    'Startkompetenz',
    'Zielkompetenz',
  ]
  const escapedLabels = labels
    .map(value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = note.match(
    new RegExp(
      `${escapedLabel}:[ \\t]*([\\s\\S]*?)(?=\\r?\\n(?:${escapedLabels}):|$)`,
      'i',
    ),
  )
  return match?.[1]?.trim() ?? ''
}

function validateMaterialBrief(
  materialType: WorksheetMaterialType,
  note: string,
) {
  if (materialType === 'differentiated') {
    const missing = ['A-Niveau', 'B-Niveau', 'C-Niveau'].filter(
      label => !readBriefField(note, label),
    )
    if (missing.length > 0) {
      return 'Bitte beschreibe die gewünschte Kompetenz für A-, B- und C-Niveau.'
    }
  }

  if (
    materialType === 'series' &&
    (!readBriefField(note, 'Startkompetenz') ||
      !readBriefField(note, 'Zielkompetenz'))
  ) {
    return 'Bitte beschreibe die Start- und die Zielkompetenz der Aufgabenserie.'
  }

  return null
}

function repairWorksheetLatex(text: string) {
  return text
    .replace(/\u0009imes\b/g, '\\cdot')
    .replace(/\u0009(ext|heta|an|au)\b/g, (_match, suffix) => `\\t${suffix}`)
    .replace(/\u000c(rac)\b/g, (_match, suffix) => `\\f${suffix}`)
    .replace(/\u0008(eta|egin)\b/g, (_match, suffix) => `\\b${suffix}`)
    .replace(/\r(mathrm|right|rho)\b/g, (_match, suffix) => `\\r${suffix}`)
    .replace(/\n(eq|u|abla)\b/g, (_match, suffix) => `\\n${suffix}`)
    .replace(/\\times\b/g, '\\cdot')
    .replace(/simes(?=\s*[\d({])/g, 's \\cdot ')
    .replace(/(^|[\d})\]])\s*imes(?=\s*[\d({])/g, '$1 \\cdot ')
}

function normalizeMathForMarkdown(text: string) {
  return repairWorksheetLatex(text)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_match, inner) => `$${inner}$`)
    .replace(/\\\[([\s\S]*?)\\\]/g, (_match, inner) => `$$${inner}$$`)
}

function htmlToPromptText(html: string) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html
  return (wrapper.innerText || wrapper.textContent || '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function safeFileName(value: string) {
  return value
    .trim()
    .replaceAll(' ', '-')
    .replace(/[^a-zA-Z0-9äöüÄÖÜß-]/g, '')
    .slice(0, 80)
}

function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement('a')
  link.download = fileName
  link.href = dataUrl
  link.click()
}

function waitForRender() {
  return new Promise<void>(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

function WorksheetMarkdown({
  content,
  compact = false,
}: {
  content: string
  compact?: boolean
}) {
  return (
    <div
      className={
        compact
          ? 'worksheet-export-markdown worksheet-level-column prose prose-sm prose-slate max-w-none text-left prose-headings:my-1 prose-li:my-0.5 prose-ol:my-1 prose-p:my-1 prose-table:my-1 prose-ul:my-1'
          : 'worksheet-export-markdown prose prose-slate max-w-none text-left prose-headings:my-2 prose-li:my-0.5 prose-ol:my-1 prose-p:my-1 prose-table:my-2 prose-ul:my-1'
      }
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {normalizeMathForMarkdown(content)}
      </ReactMarkdown>
      <style jsx global>{`
        .worksheet-export-markdown .katex-display {
          margin: 0.45em 0;
        }

        .worksheet-export-markdown table {
          font-size: 0.95em;
        }

        .worksheet-level-column .katex-display {
          font-size: 0.86em;
          margin: 0.35em 0;
        }

        .worksheet-level-column table {
          font-size: 0.78em;
        }
      `}</style>
    </div>
  )
}

function WorksheetItems({
  items,
  numbered = false,
  compact = false,
}: {
  items: WorksheetItem[]
  numbered?: boolean
  compact?: boolean
}) {
  return (
    <div>
      {items.map((item, index) => (
        <div
          key={item.number}
          style={{
            alignItems: 'flex-start',
            breakInside: 'avoid',
            display: 'flex',
            gap: compact ? 7 : 10,
            marginBottom: index === items.length - 1 ? 0 : compact ? 10 : 12,
          }}
        >
          <span
            style={{
              alignItems: 'center',
              border: '1px solid #111827',
              borderRadius: '50%',
              display: 'inline-flex',
              flex: compact ? '0 0 19px' : '0 0 22px',
              fontFamily: 'Georgia, Cambria, serif',
              fontSize: compact ? 12 : 15,
              height: compact ? 19 : 22,
              justifyContent: 'center',
              lineHeight: 1,
              marginTop: 2,
              width: compact ? 19 : 22,
            }}
          >
            {numbered ? index + 1 : String.fromCharCode(97 + index)}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <WorksheetMarkdown content={item.content} compact={compact} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ExportSheet({
  heading,
  intro,
  items,
  sheetRef,
  levelCounts,
}: {
  heading: string
  intro?: string
  items: WorksheetItem[]
  sheetRef: React.RefObject<HTMLDivElement>
  levelCounts?: WorksheetLevelCounts
}) {
  let itemOffset = 0
  const levelSections = levelCounts
    ? levelOptions.map(level => {
        const sectionItems = items.slice(
          itemOffset,
          itemOffset + levelCounts[level.key],
        )
        itemOffset += levelCounts[level.key]
        return { ...level, items: sectionItems }
      })
    : []

  return (
    <div
      ref={sheetRef}
      style={{
        width: 860,
        padding: 24,
        background: '#ffffff',
        color: '#111827',
        fontFamily: 'Aptos, Segoe UI, sans-serif',
        fontSize: 18,
        lineHeight: 1.4,
      }}
    >
      <div
        style={{
          borderBottom: '1px solid #334155',
          color: '#315aa6',
          fontFamily: 'Georgia, Cambria, serif',
          fontSize: 25,
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: 8,
          paddingBottom: 4,
        }}
      >
        {heading}
      </div>

      {intro ? (
        <div style={{ marginBottom: 12 }}>
          <WorksheetMarkdown content={intro} />
        </div>
      ) : null}

      {levelCounts ? (
        <div
          style={{
            alignItems: 'stretch',
            border: '1px solid #cbd5e1',
            display: 'grid',
            gap: 0,
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            marginTop: 14,
          }}
        >
          {levelSections.map((section, sectionIndex) => (
            <section
              key={section.key}
              style={{
                borderLeft:
                  sectionIndex === 0 ? 'none' : '1px solid #cbd5e1',
                breakInside: 'avoid',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#f8fafc',
                  borderBottom: '1px solid #cbd5e1',
                  color: '#1e293b',
                  display: 'flex',
                  fontSize: 16,
                  fontWeight: 700,
                  justifyContent: 'center',
                  padding: '7px 8px',
                }}
              >
                <span>{section.label}</span>
              </div>
              <div style={{ padding: 9 }}>
                <WorksheetItems items={section.items} numbered compact />
              </div>
            </section>
          ))}
        </div>
      ) : (
        <WorksheetItems items={items} />
      )}
    </div>
  )
}

export function AiWorksheetGenerator({
  exerciseId,
  data,
  pageIndex,
}: AiWorksheetGeneratorProps) {
  const exercise = exercisesData[exerciseId]
  const taskSheetRef = React.useRef<HTMLDivElement>(null)
  const solutionSheetRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [count, setCount] = React.useState(5)
  const [difficulty, setDifficulty] =
    React.useState<WorksheetDifficulty>('gleich')
  const [materialType, setMaterialType] =
    React.useState<WorksheetMaterialType>('standard')
  const [levelCounts, setLevelCounts] = React.useState<WorksheetLevelCounts>({
    a: 1,
    b: 1,
    c: 1,
  })
  const [briefs, setBriefs] = React.useState<
    Record<WorksheetMaterialType, string>
  >({
    standard: '',
    differentiated: DIFFERENTIATION_BRIEF,
    series: SERIES_BRIEF,
  })
  const [includeErrorTask, setIncludeErrorTask] = React.useState(false)
  const [simpleLanguage, setSimpleLanguage] = React.useState(false)
  const [status, setStatus] = React.useState<GeneratorStatus>('idle')
  const [worksheet, setWorksheet] =
    React.useState<GeneratedWorksheet | null>(null)
  const [generatedTitle, setGeneratedTitle] = React.useState<string | null>(null)
  const [taskImage, setTaskImage] = React.useState<string | null>(null)
  const [solutionImage, setSolutionImage] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => setMounted(true), [])

  const note = briefs[materialType]
  const differentiatedCount =
    levelCounts.a + levelCounts.b + levelCounts.c
  const effectiveCount =
    materialType === 'differentiated' ? differentiatedCount : count

  const updateNote = (value: string) => {
    setBriefs(current => ({ ...current, [materialType]: value }))
  }

  const updateLevelCount = (level: WorksheetLevel, value: number) => {
    setLevelCounts(current => ({
      ...current,
      [level]: Math.max(1, Math.min(5, value || 1)),
    }))
  }

  React.useEffect(() => {
    if (!worksheet) return
    let cancelled = false

    const renderImages = async () => {
      setStatus('rendering')
      await waitForRender()
      await document.fonts?.ready

      if (!taskSheetRef.current || !solutionSheetRef.current || cancelled) {
        return
      }

      try {
        const exportOptions = {
          backgroundColor: '#ffffff',
          pixelRatio: 2,
          cacheBust: true,
        }
        const nextTaskImage = await toPng(
          taskSheetRef.current,
          exportOptions,
        )
        const nextSolutionImage = await toPng(
          solutionSheetRef.current,
          exportOptions,
        )

        if (!cancelled) {
          setTaskImage(nextTaskImage)
          setSolutionImage(nextSolutionImage)
          setGeneratedTitle(worksheet.title)
          setStatus('ready')
          setWorksheet(null)
        }
      } catch (renderError) {
        console.error('Worksheet image export failed', renderError)
        if (!cancelled) {
          setError('Die Bilddateien konnten nicht erstellt werden.')
          setStatus('idle')
        }
      }
    }

    renderImages()
    return () => {
      cancelled = true
    }
  }, [worksheet])

  if (!exercise) return null

  const generateWorksheet = async () => {
    const validationError = validateMaterialBrief(materialType, note)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setWorksheet(null)
    setGeneratedTitle(null)
    setTaskImage(null)
    setSolutionImage(null)
    setStatus('requesting')

    try {
      const contextHtml = extractor(exercise, data, {
        includeSolution: true,
        includeCorrectionHints: false,
        includeIntroLabel: true,
        pageIndex: pageIndex === 'single' ? undefined : pageIndex,
      })
      const context = htmlToPromptText(contextHtml)
      const response = await makePost('/va89kjds', {
        messages: [
          {
            role: 'user',
            content: `Titel: ${exercise.title}\nAktiver Aufgabenteil: ${pageIndex}\n\nAufgaben- und Lösungskontext:\n${context}`,
          },
        ],
        worksheet: {
          count: effectiveCount,
          difficulty,
          note,
          materialType,
          levelCounts,
          includeErrorTask,
          simpleLanguage,
        },
      })

      if (!response?.worksheet) {
        throw new Error('Arbeitsblatt fehlt')
      }
      setWorksheet({
        ...(response.worksheet as GeneratedWorksheet),
        materialType,
        levelCounts:
          materialType === 'differentiated'
            ? { ...levelCounts }
            : undefined,
      })
    } catch (requestError) {
      console.error('Worksheet generation failed', requestError)
      setError(
        'Das Arbeitsblatt konnte gerade nicht erstellt werden. Bitte versuche es erneut.',
      )
      setStatus('idle')
    }
  }

  const fileBase =
    safeFileName(generatedTitle || exercise.title || 'arbeitsblatt') ||
    'arbeitsblatt'
  const busy = status === 'requesting' || status === 'rendering'

  const dialog =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[10050] flex items-end justify-center bg-slate-950/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="worksheet-dialog-title"
            onMouseDown={event => {
              if (event.target === event.currentTarget && !busy) setOpen(false)
            }}
          >
            <div className="flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-slate-50 shadow-2xl sm:rounded-3xl">
              <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
                <div>
                  <div
                    id="worksheet-dialog-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    KI-Arbeitsblatt erstellen
                  </div>
                  <div className="text-xs text-slate-500">
                    Aufgaben und Lösungen als getrennte Bilddateien
                  </div>
                </div>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40"
                  onClick={() => setOpen(false)}
                  disabled={busy}
                  aria-label="Dialog schließen"
                >
                  <FaIcon icon={faXmark} />
                </button>
              </header>

              <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
                <fieldset disabled={busy}>
                  <legend className="mb-1.5 text-sm font-semibold text-slate-800">
                    Materialtyp
                  </legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {materialTypeOptions.map(option => {
                      const selected = materialType === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          aria-pressed={selected}
                          className={`rounded-2xl border p-3 text-left transition ${
                            selected
                              ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-sm ring-2 ring-blue-100'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/40'
                          }`}
                          onClick={() => {
                            setMaterialType(option.value)
                            setError(null)
                          }}
                        >
                          <FaIcon
                            icon={option.icon}
                            className={`mb-2 h-4 w-4 ${
                              selected ? 'text-blue-700' : 'text-slate-500'
                            }`}
                          />
                          <span className="block text-sm font-semibold">
                            {option.label}
                          </span>
                          <span className="mt-1 block text-[11px] leading-4 text-slate-500">
                            {option.description}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                {materialType === 'differentiated' ? (
                  <fieldset disabled={busy}>
                    <legend className="mb-1.5 text-sm font-semibold text-slate-800">
                      Aufgaben pro Niveau
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {levelOptions.map(level => (
                        <label
                          key={level.key}
                          className="rounded-2xl border border-slate-200 bg-white p-2.5"
                        >
                          <span
                            className="mb-2 flex items-center gap-1.5 text-xs font-semibold"
                            style={{ color: level.color }}
                          >
                            <FaIcon icon={level.icon} className="h-3.5 w-3.5" />
                            {level.label}
                          </span>
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={levelCounts[level.key]}
                            onChange={event =>
                              updateLevelCount(
                                level.key,
                                Number(event.target.value),
                              )
                            }
                            aria-label={`Aufgaben im ${level.label}`}
                            className="w-full rounded-xl border border-slate-300 bg-white px-2 py-2 text-center text-sm font-semibold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </label>
                      ))}
                    </div>
                    <div className="mt-2 text-right text-xs text-slate-500">
                      Insgesamt {differentiatedCount} Aufgaben
                    </div>
                  </fieldset>
                ) : (
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-slate-800">
                      Anzahl der Aufgaben
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={count}
                      disabled={busy}
                      onChange={event => {
                        const value = Number(event.target.value)
                        setCount(Math.max(1, Math.min(10, value || 1)))
                      }}
                      className="w-24 rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                )}

                {materialType === 'standard' ? (
                  <fieldset disabled={busy}>
                    <legend className="mb-1.5 text-sm font-semibold text-slate-800">
                      Schwierigkeit
                    </legend>
                    <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-200/70 p-1.5">
                      {difficultyOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          className={`rounded-xl px-2 py-2 text-xs font-semibold transition sm:text-sm ${
                            difficulty === option.value
                              ? 'bg-white text-blue-700 shadow-sm'
                              : 'text-slate-600 hover:bg-white/60'
                          }`}
                          onClick={() => setDifficulty(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : null}

                <fieldset disabled={busy}>
                  <legend className="mb-1.5 text-sm font-semibold text-slate-800">
                    Zusätzliche Optionen
                  </legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                        includeErrorTask
                          ? 'border-amber-400 bg-amber-50'
                          : 'border-slate-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={includeErrorTask}
                        onChange={event =>
                          setIncludeErrorTask(event.target.checked)
                        }
                        className="mt-2 h-4 w-4 shrink-0 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                        <FaIcon icon={faTriangleExclamation} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">
                          Finde den Fehler
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                          Genau eine Aufgabe enthält einen falschen Lösungsweg.
                        </span>
                      </span>
                    </label>

                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                        simpleLanguage
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-slate-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={simpleLanguage}
                        onChange={event => setSimpleLanguage(event.target.checked)}
                        className="mt-2 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <FaIcon icon={faLanguage} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">
                          Einfache Sprache
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
                          Kurze Sätze, klare Verben und erklärte Fachwörter.
                        </span>
                      </span>
                    </label>
                  </div>
                </fieldset>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-slate-800">
                    {materialType === 'differentiated'
                      ? 'Kompetenzen der drei Niveaus'
                      : materialType === 'series'
                        ? 'Lernweg der Aufgabenserie'
                        : 'Optionaler Zusatzwunsch'}
                    {materialType !== 'standard' ? (
                      <span className="ml-1 text-red-600">*</span>
                    ) : null}
                  </span>
                  <textarea
                    value={note}
                    maxLength={NOTE_LIMIT}
                    rows={materialType === 'differentiated' ? 6 : 4}
                    disabled={busy}
                    onChange={event => updateNote(event.target.value)}
                    placeholder={
                      materialType === 'differentiated'
                        ? DIFFERENTIATION_BRIEF
                        : materialType === 'series'
                          ? SERIES_BRIEF
                          : 'Zum Beispiel: Nutze glatte Ergebnisse oder alltagsnahe Beispiele.'
                    }
                    className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                  <span className="mt-1 flex items-start justify-between gap-3 text-[11px] text-slate-400">
                    <span>
                      {materialType === 'differentiated'
                        ? 'Bitte für A, B und C jeweils die zu erreichende Kompetenz beschreiben.'
                        : materialType === 'series'
                          ? 'Bitte angeben, was Lernende zu Beginn und am Ende können sollen.'
                          : 'Der Zusatzwunsch ist optional.'}
                    </span>
                    <span className="shrink-0">
                      {note.length}/{NOTE_LIMIT}
                    </span>
                  </span>
                </label>

                {error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                {status === 'ready' && taskImage && solutionImage ? (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <div className="text-sm font-semibold text-emerald-900">
                        PNG-Dateien sind bereit
                      </div>
                      <div className="mt-0.5 text-xs text-emerald-700">
                        Die Aufgaben und Lösungen werden ausschließlich als
                        Bilddateien ausgegeben.
                      </div>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        onClick={() =>
                          downloadDataUrl(
                            taskImage,
                            `${fileBase}-aufgaben.png`,
                          )
                        }
                      >
                        <FaIcon icon={faDownload} /> Aufgabenbild
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 px-3 py-2.5 text-sm font-semibold text-white hover:bg-slate-900"
                        onClick={() =>
                          downloadDataUrl(
                            solutionImage,
                            `${fileBase}-loesungen.png`,
                          )
                        }
                      >
                        <FaIcon icon={faDownload} /> Lösungsbild
                      </button>
                    </div>
                  </div>
                ) : null}

                <p className="text-xs leading-5 text-slate-500">
                  KI-generierte Aufgaben und Lösungen bitte vor dem Einsatz
                  fachlich prüfen.
                </p>
              </div>

              <footer className="border-t border-slate-200 bg-white p-4">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
                  onClick={generateWorksheet}
                  disabled={busy}
                >
                  <FaIcon
                    icon={busy ? faSpinner : faWandMagicSparkles}
                    className={busy ? 'animate-spin' : undefined}
                  />
                  {status === 'requesting'
                    ? 'Aufgaben werden erstellt ...'
                    : status === 'rendering'
                      ? 'Bilddateien werden gerendert ...'
                      : taskImage && solutionImage
                        ? 'Neu erstellen'
                        : 'Arbeitsblatt erstellen'}
                </button>
              </footer>
            </div>
          </div>,
          document.body,
        )
      : null

  const exportSurface =
    worksheet && mounted
      ? createPortal(
          <div
            aria-hidden="true"
            style={{
              clipPath: 'inset(100%)',
              height: 1,
              left: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
              position: 'fixed',
              top: 0,
              width: 1,
              zIndex: -2147483648,
            }}
          >
            <div style={{ position: 'absolute', left: -20000, top: -20000 }}>
              <ExportSheet
                heading="Aufgabe"
                intro={worksheet.intro}
                items={worksheet.tasks}
                sheetRef={taskSheetRef}
                levelCounts={worksheet.levelCounts}
              />
              <ExportSheet
                heading="Lösung"
                items={worksheet.solutions}
                sheetRef={solutionSheetRef}
                levelCounts={worksheet.levelCounts}
              />
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100"
        onClick={() => setOpen(true)}
      >
        <FaIcon icon={faFileLines} />
        KI-Arbeitsblatt
      </button>

      {dialog}
      {exportSurface}
    </>
  )
}
