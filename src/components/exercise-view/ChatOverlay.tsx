import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { FaIcon } from '../ui/FaIcon'
import {
  faArrowLeft,
  faArrowRight,
  faCamera,
  faClipboardCheck,
  faCommentDots,
  faFaceLaughBeam,
  faImage,
  faLightbulb,
  faMountain,
  faPaperPlane,
  faPenNib,
  faRotateLeft,
  faRotateRight,
  faRoute,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import {
  ExerciseViewStore,
  type ChatLearningMode,
} from './state/exercise-view-store'
import { exercisesData } from '@/content/exercises'
import { extractor } from './extractor/extractor'

type LearningMode = ChatLearningMode

type ErrorReview = {
  confidence: number
  label: string
  targetText: string
}

type ImageAnalysis = {
  confidence: number
  observation: string
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
  attachment?: {
    kind: 'image'
    src: string
    name?: string
    analysis?: ImageAnalysis
    review?: ErrorReview
  }
}

type PromptPart =
  | { type: 'text'; text: string }
  | { type: 'image'; image: string }

type PromptMessage = {
  id?: string
  role: 'system' | 'user' | 'assistant'
  content: string | PromptPart[]
}

type Attachment = {
  kind: 'image'
  src: string
  name?: string
  analysis?: ImageAnalysis
  review?: ErrorReview
}

type StrokePoint = {
  x: number
  y: number
}

type Stroke = {
  points: StrokePoint[]
}

function normalizeMathForMarkdown(text: string): string {
  let t = text
  t = t.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner) => `$${inner}$`)
  t = t.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner) => `$$${inner}$$`)
  t = t.replace(/\[([^\]\n]*\\frac[^\]\n]*)\]/g, (_m, inner) => `$${inner}$`)
  t = t.replace(/\[([^\]\n]*\^[^\]\n]*)\]/g, (_m, inner) => `$${inner}$`)
  return t
}

function stripInternalPromptMarkers(text: string) {
  return text
    .replace(/(?:AUFGABENSTELLUNG|INTERNE_MUSTERLOESUNG)_(?:BEGINN|ENDE)/g, '')
    .replace(/\n{3,}/g, '\n\n')
}

function hasDegenerateModelOutput(text: string) {
  return text.includes('\uFFFD') || /([()[\]{}])\1{15,}/.test(text)
}

function htmlToPromptText(html: string): string {
  if (typeof document === 'undefined') {
    return html.replace(/<[^>]+>/g, ' ')
  }

  const wrapper = document.createElement('div')
  wrapper.innerHTML = html

  return (wrapper.innerText || wrapper.textContent || '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () =>
      reject(new Error('Datei konnte nicht gelesen werden.'))
    reader.readAsDataURL(file)
  })
}

async function prepareImage(file: File) {
  const original = await readFileAsDataUrl(file)

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image()
      element.onload = () => resolve(element)
      element.onerror = () =>
        reject(new Error('Bild konnte nicht geladen werden.'))
      element.src = original
    })

    const maxEdge = 1600
    const scale = Math.min(1, maxEdge / Math.max(image.width, image.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(image.width * scale))
    canvas.height = Math.max(1, Math.round(image.height * scale))

    const context = canvas.getContext('2d')
    if (!context) return original

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    return canvas.toDataURL('image/jpeg', 0.86)
  } catch {
    return original
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

const HUMOR_CONTEXTS = [
  'Eine Pinguin-Eisdiele, in der die Kugeln schneller schmelzen als verkauft werden',
  'Eine Roboter-WG, die Ladekabel, Akkus und Haushaltsdienste organisiert',
  'Ein Superhelden-Büro mit sehr gewöhnlichen Alltagsproblemen',
  'Eine Zauberschule mit eigenwilligen Besen und misslungenen Tränken',
  'Ein Tier-Sportfest mit ungewöhnlichen Disziplinen',
  'Außerirdische bei ihrem ersten Besuch in einem irdischen Supermarkt',
  'Eine Piratencrew, die Pizza statt Schätze ausliefert',
  'Zeitreisende, die ständig zu früh oder zu spät ankommen',
  'Ein Detektivbüro, das das Verschwinden von Pausensnacks untersucht',
  'Eine Drachenfeuerwehr, bei der ausgerechnet die Drachen löschen müssen',
  'Ein Geisterhotel mit überraschend pingeligen Gästen',
  'Sprechende Schulsachen auf einem chaotischen Klassenausflug',
] as const

function shuffleHumorContexts(previous?: string) {
  const contexts = [...HUMOR_CONTEXTS]

  for (let index = contexts.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[contexts[index], contexts[swapIndex]] = [
      contexts[swapIndex],
      contexts[index],
    ]
  }

  if (previous && contexts[0] === previous) {
    ;[contexts[0], contexts[1]] = [contexts[1], contexts[0]]
  }

  return contexts
}

function getModeCardCopy(mode: LearningMode) {
  switch (mode) {
    case 'leicht':
      return { title: 'Leichter machen' }
    case 'schwer':
      return { title: 'Schwerer machen', intro: 'Schwierigere Aufgabe' }
    case 'schritt':
      return {
        title: 'Schritt für Schritt',
        intro: 'Hilfe bekommen und verstehen',
      }
    case 'tipp':
      return { title: 'Tipp bekommen', intro: '' }
    case 'humor':
      return { title: 'Mit Humor üben', intro: 'Eine Aufgabe zum Schmunzeln' }
    case 'pruefen':
      return { title: 'Lösungsweg prüfen', intro: 'Feedback zu deiner Lösung' }
  }
}

function getLearningCopy(mode: LearningMode) {
  switch (mode) {
    case 'leicht':
      return {
        title: 'Leichtere Aufgabe',
        intro: '',
        starter:
          'Erstelle eine leichtere Variante derselben Aufgabe. Halte den Aufgabentyp gleich und vereinfache nur Zahlen, Formen oder Werte. Gib mir die neue Aufgabe, nicht die Lösung der Originalaufgabe.',
      }
    case 'schwer':
      return {
        title: 'Schwerere Aufgabe',
        intro:
          'Gleicher Aufgabentyp, aber anspruchsvoller und etwas näher an Prüfungsniveau.',
        starter:
          'Erstelle eine schwerere Variante derselben Aufgabe. Halte den Aufgabentyp gleich und erschwere nur Zahlen, Formen oder Werte. Dabei soll auch kleiner Transfer notwendig sein. Gib mir die neue Aufgabe, nicht die Lösung der Originalaufgabe.',
      }
    case 'schritt':
      return {
        title: 'Erkläre mir die Aufgabe Schritt-für-Schritt',
        intro:
          'Wir gehen gemeinsam und in einfacher Sprache durch die Aufgabe. Bitte stelle nur wenige, größere Fragen.',
        starter:
          'Starte einen sehr einfachen, ruhigen Dialog zur Originalaufgabe. Verwende einfache Sprache. Stelle lieber wenige, größere Fragen statt viele kleine. Warte nach jeder Antwort auf mich und gib keine komplette Lösung.',
      }
    case 'tipp':
      return {
        title: 'Gib mir einen guten Tipp',
        intro: 'Nur ein klarer, hilfreicher Hinweis. Keine komplette Lösung.',
        starter:
          'Gib mir genau einen nützlichen Tipp zur Originalaufgabe. Leite den Tipp aus dem ersten fachlich sinnvollen Schritt der internen Musterlösung ab. Hilf mir, diesen Schritt selbst zu erkennen, ohne ihn auszurechnen oder das Ergebnis zu verraten. Antworte kurz, klar und in einfacher Sprache.',
      }
    case 'humor':
      return {
        title: 'Humorvolle Aufgabe',
        intro: 'Gleiche Kompetenz, aber mit einer überraschenden Geschichte.',
        starter:
          'Erstelle eine neue, humorvolle Aufgabe zur gleichen mathematischen Kompetenz und auf dem gleichen Schwierigkeitsniveau. Die Aufgabe soll mich zum Schmunzeln bringen und trotzdem klar und gut lösbar sein. Gib nur die neue Aufgabe aus, nicht die Lösung.',
      }
    case 'pruefen':
      return {
        title: 'Prüfe meinen Lösungsweg',
        intro: 'Die KI überprüft deine Idee.',
        starter:
          'Schicke mir jetzt deinen Lösungsweg. Du kannst ihn schreiben, scribbeln oder fotografieren.',
      }
  }
}

function getModeSystemInstruction(mode: LearningMode) {
  switch (mode) {
    case 'leicht':
      return 'Vereinfache die Aufgabe deutlich. Nutze kleinere Zahlen, leichtere Formen, einfachere Werte und einfache Sprache.'
    case 'schwer':
      return 'Erhöhe nur die Schwierigkeit derselben Aufgabensorte. Nutze größere Zahlen, anspruchsvollere Zahlenräume, eventuell Dezimalzahlen, zusätzliche Schritte oder etwas komplexere Formen. Die fachliche Struktur muss gleich bleiben.'
    case 'schritt':
      return 'Führe einen sehr einfachen sokratischen Dialog in einfacher Sprache. Stelle lieber wenige, größere Fragen statt viele kleine. Gib keine Komplettlösung. Warte immer auf die Antwort des Lernenden und baue den Weg zur Lösung Schritt für Schritt gemeinsam auf.'
    case 'tipp':
      return 'Nutze die interne Musterlösung als Orientierung. Bestimme deren ersten fachlich sinnvollen Lösungsschritt und formuliere genau einen Denkimpuls, der den Lernenden zu diesem Schritt führt. Verrate weder das Ergebnis dieses Schritts noch spätere Schritte oder die vollständige Lösung. Keine langen Erklärungen. Kurze, klare, motivierende Sprache.'
    case 'humor':
      return 'Erstelle eine neue Aufgabe, die dieselbe zentrale mathematische Kompetenz, denselben Aufgabentyp und ungefähr dasselbe Schwierigkeitsniveau prüft. Verwende den in der Lernendenanfrage vorgegebenen humorvollen Kontext verbindlich und übernimm nicht die Geschichte oder den erzählerischen Rahmen der Originalaufgabe. Der Humor darf aus Figuren, Gegenständen oder einer unerwarteten Alltagssituation entstehen, aber niemals auf Kosten von Personen oder Gruppen. Vermeide Insiderwissen, Sarkasmus und lange Witze. Alle Angaben müssen mathematisch sinnvoll, eindeutig und vollständig sein. Formuliere kompakt in einfacher Sprache. Gib nur die Aufgabe aus, keine Lösung, keine Lösungsschritte und keinen Hinweis auf die Originalaufgabe.'
    case 'pruefen':
      return 'Prüfe ausschließlich den Lösungsweg, den der Lernende in einer Nachricht mit der Rolle user eingereicht hat. Die interne Musterlösung ist nur eine fachliche Referenz und niemals eine Antwort des Lernenden. Falls noch kein Lösungsweg eingereicht wurde, bitte nur darum. Benenne erst, was richtig ist, dann den ersten Fehler oder das Fehlende und anschließend den nächsten kleinen Schritt. Gib weder die Musterlösung noch eine Komplettlösung aus.'
  }
}

function ModeCard(props: {
  mode: LearningMode
  onClick: (mode: LearningMode) => void
}) {
  const copy = getModeCardCopy(props.mode)
  const icon =
    props.mode === 'leicht'
      ? faLightbulb
      : props.mode === 'schwer'
        ? faMountain
        : props.mode === 'schritt'
          ? faRoute
          : props.mode === 'tipp'
            ? faCommentDots
            : props.mode === 'humor'
              ? faFaceLaughBeam
              : faClipboardCheck

  return (
    <button
      type="button"
      className="group w-full rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-md active:scale-[0.99]"
      onClick={() => props.onClick(props.mode)}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
          <FaIcon icon={icon} className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0 text-sm font-semibold leading-4 text-slate-900">
          {copy.title}
        </div>
        <FaIcon
          icon={faArrowRight}
          className="ml-auto hidden h-3 w-3 text-slate-300 min-[390px]:block"
        />
      </div>
    </button>
  )
}

function MarkdownBubble({
  content,
  user,
  attachment,
}: {
  content: string
  user: boolean
  attachment?: Attachment
}) {
  return (
    <div
      className={clsx(
        'max-w-[88%] rounded-2xl px-3 py-2 text-sm break-words shadow-sm',
        user ? 'ml-auto bg-blue-600 text-white' : 'bg-white text-slate-900',
      )}
    >
      {user ? (
        <div className="space-y-2">
          {content ? <div>{content}</div> : null}
          {attachment?.kind === 'image' ? (
            <div className="space-y-1.5">
              <div className="mx-auto w-fit max-w-full">
                <img
                  src={attachment.src}
                  alt={attachment.name ?? 'Anhang'}
                  className="block h-auto max-h-72 w-auto max-w-full rounded-xl border border-white/20"
                />
              </div>
              {attachment.review ? (
                <div className="rounded-lg bg-white/95 px-2 py-1 text-xs font-semibold text-red-700">
                  Erkannter Fehler:{' '}
                  {attachment.review.label || attachment.review.targetText}
                </div>
              ) : null}
              {attachment.analysis?.observation ? (
                <div className="rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-slate-700">
                  Bildanalyse: {attachment.analysis.observation}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {normalizeMathForMarkdown(stripInternalPromptMarkers(content))}
        </ReactMarkdown>
      )}
    </div>
  )
}

async function readStreamingText(
  response: Response,
  onChunk: (chunk: string) => void,
) {
  if (!response.body) {
    throw new Error('Keine Streaming-Antwort verfügbar.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    onChunk(decoder.decode(value, { stream: true }))
  }

  const finalChunk = decoder.decode()
  if (finalChunk) onChunk(finalChunk)
}

function buildImagePart(attachment: Attachment): PromptPart {
  return { type: 'image', image: attachment.src }
}

function buildAttachmentContext(attachment: Attachment) {
  const parts: string[] = []
  if (attachment.analysis?.observation) {
    parts.push(
      `Bisherige Bildanalyse: ${attachment.analysis.observation} ` +
        `(Sicherheit: ${Math.round(attachment.analysis.confidence * 100)}%).`,
    )
  }
  if (attachment.review) {
    parts.push(
      `Bisherige Fehleranalyse: ${attachment.review.label}. ` +
        `Markierter Ausdruck: ${attachment.review.targetText}.`,
    )
  }
  return parts.join('\n')
}

export function ChatOverlay({ mobileHeightVh }: { mobileHeightVh: number }) {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const messages = ExerciseViewStore.useState(s => s.chatMessages)
  const pending = ExerciseViewStore.useState(s => s.chatPending)
  const mode = ExerciseViewStore.useState(s => s.chatMode)
  const queuedChatSubmission = ExerciseViewStore.useState(
    s => s.queuedChatSubmission,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const pages = ExerciseViewStore.useState(s => s.pages)
  const currentExerciseId = ExerciseViewStore.useState(s => s.id)
  const exerciseIDs = ExerciseViewStore.useState(s => s._exerciseIDs)
  const exerciseData = ExerciseViewStore.useState(s => s.data)
  const exerciseDataPerExercise = ExerciseViewStore.useState(
    s => s.dataPerExercise,
  )

  const [input, setInput] = useState('')
  const [draft, setDraft] = useState('')
  const [attachment, setAttachment] = useState<Attachment | null>(null)
  const [scribbleOpen, setScribbleOpen] = useState(false)
  const [scribbleStrokeCount, setScribbleStrokeCount] = useState(0)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [cameraStarting, setCameraStarting] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [useSideChat, setUseSideChat] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const cameraVideoRef = useRef<HTMLVideoElement>(null)
  const cameraStreamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const streamMessageIdRef = useRef<string | null>(null)
  const requestSeqRef = useRef(0)
  const conversationKeyRef = useRef('')
  const resetConversationRef = useRef<(keepMode?: boolean) => void>(() => {})
  const submitReplyRef = useRef<
    (
      text: string,
      nextAttachment: Attachment | null,
      replyMode: LearningMode,
    ) => boolean
  >(() => false)
  const strokesRef = useRef<Stroke[]>([])
  const currentStrokeRef = useRef<Stroke | null>(null)
  const drawingRef = useRef(false)
  const humorContextQueueRef = useRef<string[]>([])
  const previousHumorContextRef = useRef<string>()

  const currentPage = pages[navIndicatorPosition]
  const contextIndex = currentPage?.context
  const exerciseId = contextIndex
    ? exerciseIDs[parseInt(contextIndex, 10) - 1]
    : currentExerciseId
  const currentData = contextIndex
    ? exerciseDataPerExercise[contextIndex]
    : exerciseData
  const exercise = exercisesData[exerciseId]

  const setMode = (nextMode: LearningMode | null) => {
    ExerciseViewStore.update(s => {
      s.chatMode = nextMode
    })
  }

  const { taskContext, solutionReferenceContext } = useMemo(() => {
    if (!exercise) {
      return { taskContext: '', solutionReferenceContext: '' }
    }

    const taskHtml = extractor(exercise, currentData, {
      includeSolution: false,
      includeCorrectionHints: false,
      includeIntroLabel: true,
    })
    const solutionHtml = extractor(exercise, currentData, {
      includeSolution: true,
      includeCorrectionHints: false,
      includeIntroLabel: true,
    })

    return {
      taskContext: htmlToPromptText(taskHtml),
      solutionReferenceContext: htmlToPromptText(solutionHtml),
    }
  }, [exercise, currentData])

  const clearCanvas = () => {
    strokesRef.current = []
    currentStrokeRef.current = null
    drawingRef.current = false
    setScribbleStrokeCount(0)
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const width = Math.max(1, Math.round(rect.width * dpr))
    const height = Math.max(1, Math.round(rect.height * dpr))

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 2 * dpr
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#0f172a'

    strokesRef.current.forEach(stroke => {
      if (stroke.points.length < 2) return
      ctx.beginPath()
      ctx.moveTo(
        stroke.points[0].x * canvas.width,
        stroke.points[0].y * canvas.height,
      )
      stroke.points.slice(1).forEach(point => {
        ctx.lineTo(point.x * canvas.width, point.y * canvas.height)
      })
      ctx.stroke()
    })
  }

  const undoScribbleStroke = () => {
    if (strokesRef.current.length === 0) return

    strokesRef.current = strokesRef.current.slice(0, -1)
    currentStrokeRef.current = null
    drawingRef.current = false
    setScribbleStrokeCount(strokesRef.current.length)
    resizeCanvas()
  }

  const drawPoint = (point: StrokePoint) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const stroke = currentStrokeRef.current
    if (!stroke) return

    const last = stroke.points[stroke.points.length - 2]
    const next = stroke.points[stroke.points.length - 1]
    if (!last || !next) return

    ctx.beginPath()
    ctx.moveTo(last.x * canvas.width, last.y * canvas.height)
    ctx.lineTo(next.x * canvas.width, next.y * canvas.height)
    ctx.stroke()
  }

  const startStroke = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const point = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }

    drawingRef.current = true
    currentStrokeRef.current = { points: [point] }
    strokesRef.current.push(currentStrokeRef.current)
    setScribbleStrokeCount(strokesRef.current.length)
  }

  const addPoint = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return
    const canvas = canvasRef.current
    if (!canvas || !currentStrokeRef.current) return

    const rect = canvas.getBoundingClientRect()
    const point = {
      x: clamp((e.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((e.clientY - rect.top) / rect.height, 0, 1),
    }

    currentStrokeRef.current.points.push(point)
    drawPoint(point)
  }

  const endStroke = () => {
    drawingRef.current = false
    currentStrokeRef.current = null
  }

  const makePromptContent = (
    text: string,
    nextAttachment: Attachment | null,
  ): string | PromptPart[] => {
    const parts: PromptPart[] = []
    if (text.trim()) {
      parts.push({ type: 'text', text: text.trim() })
    }
    if (nextAttachment?.kind === 'image') {
      const attachmentContext = buildAttachmentContext(nextAttachment)
      if (attachmentContext) {
        parts.push({ type: 'text', text: attachmentContext })
      }
      parts.push(buildImagePart(nextAttachment))
    }
    if (parts.length === 0) return ''
    if (parts.length === 1 && parts[0].type === 'text') {
      return parts[0].text
    }
    return parts
  }

  const buildRequestMessages = (
    selectedMode: LearningMode,
    transcript: ChatMessage[],
    extraUser?: string,
    extraAttachment?: Attachment | null,
  ) => {
    const copy = getLearningCopy(selectedMode)
    const convo = transcript.map<PromptMessage>(m => {
      const content = makePromptContent(
        stripInternalPromptMarkers(m.content),
        m.attachment ?? null,
      )
      return { role: m.role, content, id: m.id }
    })

    const out: PromptMessage[] = [
      {
        role: 'system',
        content:
          'Du bist ein freundlicher Lerncoach für schulische Mathematik. Antworte auf Deutsch in sehr einfacher Sprache. Bleibe beim aktuellen Aufgabeninhalt. Erfinde keine anderen Themen. Du erhältst die Aufgabenstellung und eine interne Musterlösung in getrennten Systemnachrichten. Die Musterlösung ist ausschließlich eine fachliche Referenz. Behandle sie niemals als Eingabe, Lösungsweg oder Aussage des Lernenden. Eine Lernendenantwort steht ausschließlich in einer Nachricht mit der Rolle user. Gib die interne Musterlösung niemals vollständig wieder und verrate keine Ergebnisse, solange der gewählte Modus dies nicht ausdrücklich erfordert. Beginne direkt mit deiner Antwort für den Lernenden. Wiederhole keine internen Metadaten, Abschnittsnamen oder Trennzeichen. Antworte in normalem Markdown und niemals mit HTML oder JSX. Schreibe jeden mathematischen Ausdruck als LaTeX: kurze Ausdrücke zwischen $...$, längere Formeln in einer eigenen Zeile zwischen $$...$$. Beispiel: $F_G = m \\cdot g$. Verwende keine langen Wiederholungen von Zeichen oder Klammern.',
      },
      {
        role: 'system',
        content: `Modus-Anweisung: ${getModeSystemInstruction(selectedMode)}`,
      },
      {
        role: 'system',
        content: `Aktuelle Aufgabenstellung:\n${taskContext}`,
      },
      {
        role: 'system',
        content: `Interne fachliche Referenz, nicht vom Lernenden:\n${solutionReferenceContext}`,
      },
      {
        role: 'system',
        content: `Aktiver Lernmodus: ${copy.title}`,
      },
      ...convo,
    ]

    if (extraUser || extraAttachment) {
      const content = makePromptContent(
        extraUser ?? '',
        extraAttachment ?? null,
      )
      out.push({
        role: 'user',
        content,
      })
    }

    return out
  }

  const resetComposer = () => {
    setInput('')
    setDraft('')
    setAttachment(null)
    setScribbleOpen(false)
    setCameraOpen(false)
    setCameraError(null)
    if (inputRef.current) inputRef.current.value = ''
    if (galleryInputRef.current) galleryInputRef.current.value = ''
  }

  const resetConversation = (keepMode = false) => {
    abortRef.current?.abort()
    streamMessageIdRef.current = null
    requestSeqRef.current += 1
    resetComposer()
    ExerciseViewStore.update(s => {
      s.chatMessages = []
      s.chatPending = false
      s.queuedChatSubmission = null
      if (!keepMode) s.chatMode = null
    })
    clearCanvas()
  }
  resetConversationRef.current = resetConversation

  const appendAssistantPlaceholder = (id: string) => {
    ExerciseViewStore.update(s => {
      s.chatPending = true
      s.chatMessages = [
        ...s.chatMessages,
        {
          id,
          role: 'assistant',
          content: '',
          createdAt: Date.now(),
        },
      ]
    })
  }

  const updateAssistantMessage = (nextContent: string) => {
    const streamId = streamMessageIdRef.current
    if (!streamId) return

    ExerciseViewStore.update(s => {
      s.chatMessages = s.chatMessages.map(msg =>
        msg.id === streamId ? { ...msg, content: nextContent } : msg,
      )
    })
  }

  const sendToAI = async (
    selectedMode: LearningMode,
    transcript: ChatMessage[],
    extraUser?: string,
    extraAttachment?: Attachment | null,
    extraUserMessageId?: string,
  ) => {
    if (!taskContext || !solutionReferenceContext) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const requestId = ++requestSeqRef.current

    const assistantId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    streamMessageIdRef.current = assistantId
    appendAssistantPlaceholder(assistantId)
    const wantsReview =
      selectedMode === 'pruefen' && !!extraAttachment && !!extraUserMessageId

    try {
      const requestBody = JSON.stringify({
        messages: buildRequestMessages(
          selectedMode,
          transcript,
          extraUser,
          extraAttachment,
        ),
        stream: !wantsReview,
        review: wantsReview,
        learningMode: selectedMode,
      })
      const requestAI = () =>
        fetch('/api/va89kjds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          body: requestBody,
        })

      const response = await requestAI()

      if (!response.ok) {
        let detail = `Request failed with status ${response.status}`
        try {
          const json = await response.json()
          detail = json?.detail ?? json?.error ?? detail
        } catch {}
        throw new Error(detail)
      }

      if (wantsReview) {
        const result = (await response.json()) as {
          text?: string
          imageAnalysis?: ImageAnalysis | null
          review?: ErrorReview | null
        }
        const feedback =
          result.text?.trim() ||
          'Ich konnte deinen Lösungsweg prüfen, aber keinen sicheren Fehler erkennen.'

        updateAssistantMessage(feedback)
        if (result.review || result.imageAnalysis) {
          ExerciseViewStore.update(s => {
            s.chatMessages = s.chatMessages.map(message =>
              message.id === extraUserMessageId && message.attachment
                ? {
                    ...message,
                    attachment: {
                      ...message.attachment,
                      analysis: result.imageAnalysis ?? undefined,
                      review: result.review ?? undefined,
                    },
                  }
                : message,
            )
          })
        }

        if (requestSeqRef.current === requestId) {
          setDraft('')
          streamMessageIdRef.current = null
          ExerciseViewStore.update(s => {
            s.chatPending = false
          })
        }
        return
      }

      let accumulated = ''
      await readStreamingText(response, chunk => {
        accumulated += chunk
        setDraft(accumulated)
        updateAssistantMessage(accumulated)
      })

      if (hasDegenerateModelOutput(accumulated)) {
        const retryResponse = await requestAI()
        if (!retryResponse.ok) {
          throw new Error(`Retry failed with status ${retryResponse.status}`)
        }

        accumulated = ''
        setDraft('')
        updateAssistantMessage('')
        await readStreamingText(retryResponse, chunk => {
          accumulated += chunk
          setDraft(accumulated)
          updateAssistantMessage(accumulated)
        })

        if (hasDegenerateModelOutput(accumulated)) {
          throw new Error('Degenerate model output after retry')
        }
      }

      if (requestSeqRef.current === requestId) {
        setDraft('')
        streamMessageIdRef.current = null
        ExerciseViewStore.update(s => {
          s.chatPending = false
        })
      }
    } catch (error: any) {
      if (error?.name === 'AbortError') return

      const errorMessage =
        typeof error?.message === 'string' ? error.message : ''
      const fallback =
        errorMessage.includes('nicht konfiguriert') ||
        errorMessage.includes('deaktiviert')
          ? errorMessage
          : 'Die KI-Antwort konnte gerade nicht geladen werden. Bitte versuche es noch einmal.'

      ExerciseViewStore.update(s => {
        s.chatMessages = s.chatMessages.map(msg =>
          msg.id === assistantId ? { ...msg, content: fallback } : msg,
        )
      })

      if (requestSeqRef.current === requestId) {
        setDraft('')
        streamMessageIdRef.current = null
        ExerciseViewStore.update(s => {
          s.chatPending = false
        })
      }
    }
  }

  const beginModeConversation = (selectedMode: LearningMode) => {
    if (selectedMode === 'pruefen') {
      ExerciseViewStore.update(s => {
        s.chatMessages = [
          ...s.chatMessages,
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            role: 'assistant',
            content: getLearningCopy(selectedMode).starter,
            createdAt: Date.now(),
          },
        ]
      })
      return
    }

    let starter = getLearningCopy(selectedMode).starter

    if (selectedMode === 'humor') {
      if (humorContextQueueRef.current.length === 0) {
        humorContextQueueRef.current = shuffleHumorContexts(
          previousHumorContextRef.current,
        )
      }

      const humorContext = humorContextQueueRef.current.shift()
      if (humorContext) {
        previousHumorContextRef.current = humorContext
        starter += ` Verwende diesmal verbindlich diesen Kontext: ${humorContext}. Baue die notwendigen Angaben natürlich in diese Situation ein.`
      }
    }

    void sendToAI(selectedMode, [], starter)
  }

  const startMode = (selectedMode: LearningMode) => {
    resetConversation(false)
    setMode(selectedMode)
    beginModeConversation(selectedMode)
  }

  const submitReply = (
    text: string,
    nextAttachment: Attachment | null,
    replyMode: LearningMode | null = mode,
  ) => {
    const value = text.trim()
    if ((!value && !nextAttachment) || pending || !replyMode) return false

    const userMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      role: 'user',
      content: value,
      createdAt: Date.now(),
      attachment: nextAttachment ?? undefined,
    }

    ExerciseViewStore.update(s => {
      s.chatMessages = [...s.chatMessages, userMessage]
    })

    setInput('')
    setDraft('')
    setAttachment(null)
    setScribbleOpen(false)
    if (inputRef.current) inputRef.current.value = ''
    if (galleryInputRef.current) galleryInputRef.current.value = ''

    void sendToAI(
      replyMode,
      messages,
      value,
      userMessage.attachment,
      userMessage.id,
    )
    return true
  }
  submitReplyRef.current = (text, nextAttachment, replyMode) =>
    submitReply(text, nextAttachment, replyMode)

  const sendUserReply = () => {
    submitReply(input, attachment)
  }

  const sendImageImmediately = async (file: File | undefined) => {
    if (!file) return

    const src = await prepareImage(file)
    submitReply(input, { kind: 'image', src, name: file.name })
  }

  const openCamera = () => {
    if (pending || !mode) return
    setScribbleOpen(false)
    setCameraError(null)
    setCameraOpen(true)
  }

  const captureCameraPhoto = () => {
    const video = cameraVideoRef.current
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setCameraError('Das Kamerabild ist noch nicht bereit. Bitte kurz warten.')
      return
    }

    const maxEdge = 1600
    const scale = Math.min(
      1,
      maxEdge / Math.max(video.videoWidth, video.videoHeight),
    )
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(video.videoWidth * scale))
    canvas.height = Math.max(1, Math.round(video.videoHeight * scale))

    const context = canvas.getContext('2d')
    if (!context) {
      setCameraError('Das Foto konnte nicht erstellt werden.')
      return
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const src = canvas.toDataURL('image/jpeg', 0.86)
    setCameraOpen(false)
    submitReply(input, { kind: 'image', src, name: 'Kamerafoto.jpg' })
  }

  useEffect(() => {
    setMounted(true)

    const mediaQuery = window.matchMedia('(min-width: 1250px)')
    const updateLayout = () => setUseSideChat(mediaQuery.matches)

    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)

    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  useEffect(() => {
    if (!cameraOpen) return

    let cancelled = false
    const videoElement = cameraVideoRef.current
    setCameraStarting(true)
    setCameraError(null)

    const startCamera = async () => {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
        setCameraError(
          'Die Kamera ist in diesem Browser nicht verfügbar. Öffne die App über HTTPS oder localhost.',
        )
        setCameraStarting(false)
        return
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        })

        if (cancelled) {
          stream.getTracks().forEach(track => track.stop())
          return
        }

        cameraStreamRef.current = stream
        if (videoElement) {
          videoElement.srcObject = stream
          await videoElement.play()
        }
      } catch (error: any) {
        const message =
          error?.name === 'NotAllowedError'
            ? 'Der Kamerazugriff wurde nicht erlaubt. Bitte erlaube ihn in den Browser-Einstellungen.'
            : error?.name === 'NotFoundError'
              ? 'Auf diesem Gerät wurde keine Kamera gefunden.'
              : 'Die Kamera konnte nicht gestartet werden. Bitte versuche es erneut.'
        setCameraError(message)
      } finally {
        if (!cancelled) setCameraStarting(false)
      }
    }

    void startCamera()

    return () => {
      cancelled = true
      cameraStreamRef.current?.getTracks().forEach(track => track.stop())
      cameraStreamRef.current = null
      if (videoElement) videoElement.srcObject = null
    }
  }, [cameraOpen])

  useEffect(() => {
    if (!queuedChatSubmission || pending) return

    const submission = queuedChatSubmission
    ExerciseViewStore.update(s => {
      if (s.queuedChatSubmission?.id === submission.id) {
        s.queuedChatSubmission = null
        s.chatMode = 'pruefen'
        s.chatOverlay = 'chat'
      }
    })

    submitReplyRef.current(submission.content, submission.attachment, 'pruefen')
  }, [queuedChatSubmission, pending])

  useEffect(() => {
    const key = `${exerciseId}-${navIndicatorPosition}`

    if (conversationKeyRef.current && conversationKeyRef.current !== key) {
      resetConversationRef.current(false)
    }

    conversationKeyRef.current = key

    if (chatOverlay !== 'chat') {
      setCameraOpen(false)
      setScribbleOpen(false)
    }
  }, [chatOverlay, exerciseId, navIndicatorPosition])

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
      ExerciseViewStore.update(s => {
        s.chatMessages = []
        s.chatPending = false
        s.chatMode = null
        s.queuedChatSubmission = null
      })
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages.length, draft, pending])

  useEffect(() => {
    if (!scribbleOpen) return
    clearCanvas()
    const frame = requestAnimationFrame(() => {
      resizeCanvas()
    })

    const canvas = canvasRef.current
    if (!canvas) return () => cancelAnimationFrame(frame)

    resizeObserverRef.current?.disconnect()
    resizeObserverRef.current = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserverRef.current.observe(canvas)

    const onResize = () => resizeCanvas()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      resizeObserverRef.current?.disconnect()
    }
  }, [scribbleOpen])

  if (chatOverlay !== 'chat') return null

  const activeCopy = mode ? getLearningCopy(mode) : null
  const canSend = !pending && (!!input.trim() || !!attachment)

  const content = (
    <div className={clsx(useSideChat ? 'h-full' : 'px-3 pb-2')}>
      <div
        className={clsx(
          'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white',
          useSideChat
            ? 'h-full shadow-[0_20px_60px_rgba(15,23,42,0.18)]'
            : 'shadow-inner',
        )}
        style={
          useSideChat
            ? undefined
            : {
                height: `${mobileHeightVh}dvh`,
                maxHeight: 'calc(100dvh - 7rem)',
              }
        }
      >
        {!mode ? (
          <div className="flex-1 overflow-y-auto px-2.5 py-2.5">
            <div className="grid grid-cols-2 gap-2">
              <ModeCard mode="leicht" onClick={startMode} />
              <ModeCard mode="schwer" onClick={startMode} />
              <ModeCard mode="schritt" onClick={startMode} />
              <ModeCard mode="tipp" onClick={startMode} />
              <ModeCard mode="humor" onClick={startMode} />
              <ModeCard mode="pruefen" onClick={startMode} />
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 truncate text-sm font-semibold text-slate-900">
                  {activeCopy?.title}
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
                    onClick={() => resetConversation(false)}
                    aria-label="Zur Modusübersicht"
                    title="Zur Modusübersicht"
                  >
                    <FaIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
                    onClick={() => {
                      resetConversation(true)
                      beginModeConversation(mode)
                    }}
                    aria-label="Modus neu starten"
                    title="Modus neu starten"
                  >
                    <FaIcon icon={faRotateRight} className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-3"
            >
              {messages.map(m => (
                <div
                  key={m.id}
                  className={clsx(
                    'flex',
                    m.role === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  <MarkdownBubble
                    content={m.content}
                    user={m.role === 'user'}
                    attachment={m.attachment}
                  />
                </div>
              ))}

              {pending && !draft && (
                <div className="text-xs italic text-slate-400">
                  KI denkt nach …
                </div>
              )}
            </div>

            {scribbleOpen && (
              <div className="border-t border-slate-200 bg-white px-3 py-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Scribble
                  </div>
                  <button
                    type="button"
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                    onClick={() => {
                      clearCanvas()
                      setScribbleOpen(false)
                    }}
                  >
                    Schließen
                  </button>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
                  <canvas
                    ref={canvasRef}
                    className="h-44 w-full touch-none rounded-xl bg-white"
                    onPointerDown={e => {
                      ;(e.currentTarget as HTMLCanvasElement).setPointerCapture(
                        e.pointerId,
                      )
                      startStroke(e)
                    }}
                    onPointerMove={addPoint}
                    onPointerUp={endStroke}
                    onPointerCancel={endStroke}
                    onPointerLeave={endStroke}
                  />
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={undoScribbleStroke}
                        disabled={scribbleStrokeCount === 0}
                      >
                        <FaIcon icon={faRotateLeft} className="mr-1" />
                        Undo
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={clearCanvas}
                        disabled={scribbleStrokeCount === 0}
                      >
                        <FaIcon icon={faTrash} className="mr-1" />
                        Löschen
                      </button>
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700"
                      onClick={() => {
                        const canvas = canvasRef.current
                        if (!canvas) return
                        const src = canvas.toDataURL('image/png')
                        setMode('pruefen')
                        submitReply(
                          input,
                          { kind: 'image', src, name: 'Scribble' },
                          'pruefen',
                        )
                      }}
                    >
                      Scribble prüfen
                    </button>
                  </div>
                </div>
              </div>
            )}

            {attachment && (
              <div className="border-t border-slate-200 bg-white px-3 py-2">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                  <img
                    src={attachment.src}
                    alt={attachment.name ?? 'Bildvorschau'}
                    className="h-20 w-20 rounded-xl border border-slate-200 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                      Anhang
                    </div>
                    <div className="mt-1 text-sm text-slate-700">
                      {attachment.name ?? 'Bild oder Scribble'}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition hover:bg-slate-100"
                    onClick={() => setAttachment(null)}
                  >
                    <FaIcon icon={faXmark} className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="border-t border-slate-200 bg-slate-50 px-3 py-2">
              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <div className="mb-2 grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    className={clsx(
                      'flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1.5 py-2 text-[11px] font-medium leading-3 transition',
                      scribbleOpen
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                    )}
                    onClick={() => setScribbleOpen(open => !open)}
                  >
                    <FaIcon icon={faPenNib} className="h-4 w-4" />
                    <span>Scribble</span>
                  </button>
                  <button
                    type="button"
                    className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 px-1.5 py-2 text-[11px] font-medium leading-3 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={openCamera}
                    disabled={pending}
                  >
                    <FaIcon icon={faCamera} className="h-4 w-4" />
                    <span className="text-center">Foto aufnehmen</span>
                  </button>
                  <button
                    type="button"
                    className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl bg-slate-100 px-1.5 py-2 text-[11px] font-medium leading-3 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => {
                      setScribbleOpen(false)
                      galleryInputRef.current?.click()
                    }}
                    disabled={pending}
                  >
                    <FaIcon icon={faImage} className="h-4 w-4" />
                    <span className="text-center">Foto hochladen</span>
                  </button>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async e => {
                      await sendImageImmediately(e.target.files?.[0])
                      e.target.value = ''
                    }}
                  />
                </div>

                <div className="flex items-end gap-2">
                  <TextareaAutosize
                    ref={inputRef}
                    minRows={1}
                    maxRows={6}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="none"
                    autoComplete="off"
                    data-ms-editor="false"
                    data-lt-active="false"
                    data-gramm="false"
                    data-gramm_editor="false"
                    data-enable-grammarly="false"
                    className="w-full resize-none bg-transparent text-sm outline-none"
                    placeholder={
                      mode === 'schritt'
                        ? 'Schreibe deine Antwort oder einen kurzen Gedanken …'
                        : 'Schreibe eine Rückfrage oder ergänze ein Bild / Scribble …'
                    }
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        if (canSend) sendUserReply()
                      }
                    }}
                  />

                  <button
                    type="button"
                    className="rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={sendUserReply}
                    disabled={!canSend}
                  >
                    <FaIcon icon={faPaperPlane} className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const cameraDialog =
    cameraOpen && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[10050] flex flex-col bg-slate-950 text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Foto aufnehmen"
          >
            <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-4 pb-10 pt-[max(1rem,env(safe-area-inset-top))]">
              <div className="text-sm font-semibold">Foto aufnehmen</div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
                onClick={() => setCameraOpen(false)}
                aria-label="Kamera schließen"
              >
                <FaIcon icon={faXmark} className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black">
              <video
                ref={cameraVideoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full object-contain"
              />

              {cameraStarting ? (
                <div className="absolute rounded-full bg-black/55 px-4 py-2 text-sm backdrop-blur">
                  Kamera wird gestartet …
                </div>
              ) : null}

              {cameraError ? (
                <div className="absolute mx-6 max-w-md rounded-2xl bg-slate-900/90 p-5 text-center shadow-2xl backdrop-blur">
                  <div className="text-sm leading-6 text-slate-100">
                    {cameraError}
                  </div>
                  <button
                    type="button"
                    className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
                    onClick={() => setCameraOpen(false)}
                  >
                    Schließen
                  </button>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-center bg-black px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
              <button
                type="button"
                className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/20 p-1 shadow-lg transition active:scale-95 disabled:opacity-40"
                onClick={captureCameraPhoto}
                disabled={cameraStarting || !!cameraError || pending}
                aria-label="Foto auslösen und senden"
              >
                <span className="h-14 w-14 rounded-full bg-white" />
              </button>
            </div>
          </div>,
          document.body,
        )
      : null

  if (useSideChat && mounted) {
    return (
      <>
        {createPortal(
          <aside
            className="fixed bottom-3 right-4 top-3 z-[9999]"
            style={{
              width: 'min(460px, calc((100vw - 375px) / 2 - 24px))',
            }}
            aria-label="KI-Lernchat"
          >
            {content}
          </aside>,
          document.body,
        )}
        {cameraDialog}
      </>
    )
  }

  return (
    <>
      {content}
      {cameraDialog}
    </>
  )
}
