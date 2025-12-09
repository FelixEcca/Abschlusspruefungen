// src/components/exercise-view/ScribbleOverlay.tsx
import { useEffect, useRef, useState } from 'react'
import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import {
  faTrash,
  faPaperPlane,
  faXmark,
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

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight

      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#111827'
    }
  }, [])

  if (chatOverlay !== 'scribble') return null

  const getCanvasPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      const t = e.touches[0]
      return { x: t.clientX - rect.left, y: t.clientY - rect.top }
    } else {
      const me = e as MouseEvent
      return { x: me.clientX - rect.left, y: me.clientY - rect.top }
    }
  }

  const handleStart = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    e.preventDefault()
    const ev =
      'touches' in e
        ? (e.nativeEvent as TouchEvent)
        : (e.nativeEvent as MouseEvent)
    const pos = getCanvasPos(ev)
    isDrawingRef.current = true
    lastPosRef.current = pos
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

    const msgs: IMessage[] = []

    msgs.push({
      id: 'context',
      role: 'system',
      content: exerciseContext,
    })

    msgs.push({
      id: 'prompt',
      role: 'system',
      content: `
Du erhältst gleich ein Bild mit einem handschriftlichen Ergebnis zu dieser Mathematikaufgabe.

- Sei sehr kulant und beharre nicht auf Kleinigkeiten. Wenn der Inhalt richtig ist, melde gutes Feedback zurück.
- Fasse dich sehr sehr kurz mit wenigen Worten.
- Falls etwas falsch ist, erkläre es in 1-2 Sätzen.
- Antworte auf deutsch oder alternativ in der Sprache auf der ich geschrieben habe.
- Gib danach keine weiteren Vorschläge oder Fragen mehr.
- Deine Antwort wird als Markdown mit LaTeX gerendert (\`$...$\` / \`$$...$$\`).
      `.trim(),
    })

    msgs.push({
      id: 'user-image',
      role: 'user',
      content: [
        {
          type: 'image',
          image: base64,
        },
      ],
    } as any)

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
    <div className="px-3 pb-2">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-inner p-3 space-y-3">
        <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
          <span>Scribble – Gib deine Rechnung oder Lösung an.</span>
          <button
            onClick={() =>
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
            }
          >
            <FaIcon icon={faXmark} />
          </button>
        </div>

        <p className="text-xs text-gray-600">
          Tippe auf <b>Senden</b>, um Feedback von der KI zu erhalten.
        </p>

        <div className="border rounded-xl overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            className="w-full h-40 touch-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="px-3 py-1 text-xs rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center gap-1"
            onClick={clearCanvas}
            disabled={pending}
          >
            <FaIcon icon={faTrash} /> Löschen
          </button>

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
          <div className="mt-2 text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
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
