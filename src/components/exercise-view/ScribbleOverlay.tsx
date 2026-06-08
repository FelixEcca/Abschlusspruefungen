// src/components/exercise-view/ScribbleOverlay.tsx
import { useEffect, useRef, useState } from 'react'
import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import {
  faTrash,
  faPaperPlane,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
import { exercisesData } from '@/content/exercises'
import { extractor } from './extractor/extractor'
import { makePost } from '@/helper/make-post'
import { IMessage } from '@/data/types'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

function normalizeMathForMarkdown(text: string): string {
  let t = text
  t = t.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner) => `$${inner}$`)
  t = t.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner) => `$$${inner}$$`)
  t = t.replace(/\[([^\]\n]*\\frac[^\]\n]*)\]/g, (_m, inner) => `$${inner}$`)
  t = t.replace(/\[([^\]\n]*\^[^\]\n]*)\]/g, (_m, inner) => `$${inner}$`)
  return t
}

export function ScribbleOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const pending = ExerciseViewStore.useState(s => s.chatPending)
  const [lastFeedback, setLastFeedback] = useState<string | null>(null)
  const [historyLength, setHistoryLength] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const historyRef = useRef<ImageData[]>([])

  useEffect(() => {
    if (chatOverlay !== 'scribble') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)

    ctx.scale(dpr, dpr)
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#111827'
  }, [chatOverlay])

  if (chatOverlay !== 'scribble') return null

  const saveHistory = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height))

    if (historyRef.current.length > 20) {
      historyRef.current.shift()
    }

    setHistoryLength(historyRef.current.length)
  }

  const undoCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const previous = historyRef.current.pop()
    if (!previous) return

    ctx.putImageData(previous, 0, 0)
    setHistoryLength(historyRef.current.length)
    setLastFeedback(null)
  }

  const getCanvasPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      const t = e.touches[0]
      return { x: t.clientX - rect.left, y: t.clientY - rect.top }
    }

    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handleStart = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault()
    saveHistory()

    const ev =
      'touches' in e
        ? (e.nativeEvent as TouchEvent)
        : (e.nativeEvent as MouseEvent)

    isDrawingRef.current = true
    lastPosRef.current = getCanvasPos(ev)
  }

  const handleMove = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawingRef.current || !canvasRef.current) return
    e.preventDefault()

    const ev =
      'touches' in e
        ? (e.nativeEvent as TouchEvent)
        : (e.nativeEvent as MouseEvent)

    const pos = getCanvasPos(ev)
    const last = lastPosRef.current
    if (!last) {
      lastPosRef.current = pos
      return
    }

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()

    lastPosRef.current = pos
  }

  const handleEnd = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault()
    isDrawingRef.current = false
    lastPosRef.current = null
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    saveHistory()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setLastFeedback(null)
  }

  const sendScribble = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL('image/png')
    const base64 = dataUrl.split(',')[1]
    if (!base64) return

    const state = ExerciseViewStore.getRawState()

    ExerciseViewStore.update(s => {
      s.chatPending = true
    })

    const page = state.pages[state.navIndicatorPosition]
    const contextIndex = page?.context
    const exerciseId = contextIndex
      ? state._exerciseIDs[parseInt(contextIndex) - 1]
      : state.id

    const data = contextIndex ? state.dataPerExercise[contextIndex] : state.data

    const exerciseContext = extractor(exercisesData[exerciseId], data, {
      includeIntroLabel: true,
      includeSolution: true,
      includeCorrectionHints: false,
    })

    const msgs: IMessage[] = [
      {
        id: 'context',
        role: 'system',
        content: exerciseContext,
      },
      {
        id: 'prompt',
        role: 'system',
        content: `
Du erhältst gleich ein Bild mit einem handschriftlichen Ergebnis zu dieser Mathematikaufgabe.

- Wenn der Inhalt richtig ist, melde gutes Feedback zurück. Überprüfe jedoch die fachliche Korrektheit genau.
- Überprüfe ob mit der Eingabe die Aufgabe vollständig gelöst wurde. Melde es andernfalls zurück, wenn Aufgabenteile fehlen und bewerte das, was vorhanden ist.
- Fasse dich sehr sehr kurz mit wenigen Worten.
- Falls etwas falsch ist, erkläre es in 1-2 Sätzen.
- Antworte auf deutsch oder alternativ in der Sprache auf der ich geschrieben habe.
- Gib danach keine weiteren Vorschläge oder Fragen mehr.
- Deine Antwort wird als Markdown mit LaTeX gerendert (\`$...$\` / \`$$...$$\`).
        `.trim(),
      },
      {
        id: 'user-image',
        role: 'user',
        content: [
          {
            type: 'image',
            image: base64,
          },
        ],
      } as any,
    ]

    try {
      const { text } = await makePost('/va89kjds', msgs)
      const normalized = normalizeMathForMarkdown(text)

      setLastFeedback(normalized)

      ExerciseViewStore.update(s => {
        s.chatMessages.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          role: 'user',
          content: '✏️ Skizze gesendet',
          createdAt: Date.now(),
        })
        s.chatMessages.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          role: 'assistant',
          content: normalized,
          createdAt: Date.now(),
        })
        s.chatPending = false
        s.chatOverlay = 'chat'
      })
    } catch (error) {
      console.error('Error fetching AI response (scribble):', error)
      ExerciseViewStore.update(s => {
        s.chatMessages.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          role: 'assistant',
          content:
            'Es ist ein Fehler bei der Analyse der Skizze aufgetreten. Bitte versuche es später noch einmal.',
          createdAt: Date.now(),
        })
        s.chatPending = false
        s.chatOverlay = 'chat'
      })
    }
  }

  return (
    <div className="px-1 pb-1">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-inner p-1.5 space-y-1.5">
        <div className="border rounded-xl overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            className="w-full h-[52vh] min-h-[300px] max-h-[560px] touch-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-1 text-xs rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center gap-1 disabled:opacity-50"
              onClick={clearCanvas}
              disabled={pending}
            >
              <FaIcon icon={faTrash} /> Löschen
            </button>

            <button
              type="button"
              className="px-3 py-1 text-xs rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center gap-1 disabled:opacity-50"
              onClick={undoCanvas}
              disabled={pending || historyLength === 0}
            >
              <FaIcon icon={faRotateLeft} /> Undo
            </button>
          </div>

          <button
            type="button"
            className="px-3 py-1 text-xs rounded-xl bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1 disabled:opacity-50"
            onClick={sendScribble}
            disabled={pending}
          >
            <FaIcon icon={faPaperPlane} /> Senden
          </button>
        </div>

        {lastFeedback && (
          <div className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-2 py-1.5">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {lastFeedback}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
