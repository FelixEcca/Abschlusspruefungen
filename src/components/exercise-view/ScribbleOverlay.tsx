// src/components/exercise-view/ScribbleOverlay.tsx
import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'
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
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

type Point = {
  x: number
  y: number
}

type Stroke = {
  points: Point[]
}

type ScribbleApiMessage = {
  id: string
  role: 'system' | 'user'
  content: string | Array<{ type: 'image'; image: string }>
}

const scribbleStorage = new Map<string, Stroke[]>()
const STORAGE_PREFIX = 'scribble-overlay-strokes:'

function normalizeMathForMarkdown(text: string): string {
  let t = text
  t = t.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner) => `$${inner}$`)
  t = t.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner) => `$$${inner}$$`)
  t = t.replace(/\[([^\]\n]*\\frac[^\]\n]*)\]/g, (_m, inner) => `$${inner}$`)
  t = t.replace(/\[([^\]\n]*\^[^\]\n]*)\]/g, (_m, inner) => `$${inner}$`)
  return t
}

function cloneStrokes(strokes: Stroke[]) {
  return strokes.map(stroke => ({
    points: stroke.points.map(point => ({ ...point })),
  }))
}

function readStoredStrokes(key: string): Stroke[] {
  const memoryValue = scribbleStorage.get(key)
  if (memoryValue) return cloneStrokes(memoryValue)

  try {
    const raw = window.sessionStorage.getItem(`${STORAGE_PREFIX}${key}`)
    if (!raw) return []

    const parsed = JSON.parse(raw) as Stroke[]
    const strokes = Array.isArray(parsed) ? parsed : []

    scribbleStorage.set(key, cloneStrokes(strokes))
    return cloneStrokes(strokes)
  } catch {
    return []
  }
}

function writeStoredStrokes(key: string, strokes: Stroke[]) {
  const cloned = cloneStrokes(strokes)
  scribbleStorage.set(key, cloned)

  try {
    window.sessionStorage.setItem(
      `${STORAGE_PREFIX}${key}`,
      JSON.stringify(cloned),
    )
  } catch {
    // sessionStorage may be unavailable or full
  }
}

function deleteStoredStrokes(key: string) {
  scribbleStorage.delete(key)

  try {
    window.sessionStorage.removeItem(`${STORAGE_PREFIX}${key}`)
  } catch {
    // sessionStorage may be unavailable
  }
}

function drawStrokesToCanvas(
  canvas: HTMLCanvasElement,
  strokes: Stroke[],
  options?: { whiteBackground?: boolean },
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const rect = canvas.getBoundingClientRect()
  const dpr =
    rect.width > 0 ? canvas.width / rect.width : window.devicePixelRatio || 1

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (options?.whiteBackground) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.lineWidth = 2 * dpr
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = '#111827'
  ctx.globalAlpha = 0.95

  strokes.forEach(stroke => {
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

export function ScribbleOverlay({ mobileHeightVh }: { mobileHeightVh: number }) {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const pending = ExerciseViewStore.useState(s => s.chatPending)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const currentExerciseId = ExerciseViewStore.useState(s => s.id)
  const pages = ExerciseViewStore.useState(s => s.pages)
  const exerciseIDs = ExerciseViewStore.useState(s => s._exerciseIDs)

  const [lastFeedback, setLastFeedback] = useState<string | null>(null)
  const [historyLength, setHistoryLength] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [useSideCanvas, setUseSideCanvas] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawingRef = useRef(false)
  const strokesRef = useRef<Stroke[]>([])
  const currentStrokeRef = useRef<Stroke | null>(null)
  const historyRef = useRef<Stroke[][]>([])
  const currentKeyRef = useRef<string>('')

  const scribbleKey = useMemo(() => {
    const page = pages[navIndicatorPosition]
    const contextIndex = page?.context
    const exerciseId = contextIndex
      ? exerciseIDs[parseInt(contextIndex) - 1]
      : currentExerciseId

    return `${exerciseId}-${contextIndex ?? 'main'}`
  }, [pages, navIndicatorPosition, exerciseIDs, currentExerciseId])

  const saveCurrentStrokes = (key = currentKeyRef.current) => {
    if (!key) return
    writeStoredStrokes(key, strokesRef.current)
  }

  const loadStrokesForKey = (key: string) => {
    strokesRef.current = readStoredStrokes(key)
    historyRef.current = []
    setHistoryLength(0)

    const canvas = canvasRef.current
    if (canvas) drawStrokesToCanvas(canvas, strokesRef.current)
  }

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    const width = Math.round(rect.width * dpr)
    const height = Math.round(rect.height * dpr)

    if (width <= 0 || height <= 0) return

    const sizeChanged = canvas.width !== width || canvas.height !== height

    if (sizeChanged) {
      canvas.width = width
      canvas.height = height
    }

    drawStrokesToCanvas(canvas, strokesRef.current)
  }

  useEffect(() => {
    setMounted(true)

    const mq = window.matchMedia('(min-width: 1250px)')

    const update = () => {
      saveCurrentStrokes()
      setUseSideCanvas(mq.matches)
    }

    update()
    mq.addEventListener('change', update)

    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (chatOverlay !== 'scribble') return

    const oldKey = currentKeyRef.current

    if (oldKey && oldKey !== scribbleKey) {
      saveCurrentStrokes(oldKey)
    }

    currentKeyRef.current = scribbleKey
    loadStrokesForKey(scribbleKey)

    requestAnimationFrame(resizeCanvas)
  }, [scribbleKey, chatOverlay])

  useEffect(() => {
    if (chatOverlay !== 'scribble') return

    currentKeyRef.current = scribbleKey

    const canvas = canvasRef.current
    if (!canvas) return

    const frame = requestAnimationFrame(() => {
      resizeCanvas()
      loadStrokesForKey(scribbleKey)
      resizeCanvas()
    })

    const observer = new ResizeObserver(() => {
      resizeCanvas()
    })

    observer.observe(canvas)

    return () => {
      saveCurrentStrokes()
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [chatOverlay, useSideCanvas, scribbleKey])

  if (chatOverlay !== 'scribble') return null

  const pushHistory = () => {
    historyRef.current.push(cloneStrokes(strokesRef.current))

    if (historyRef.current.length > 20) {
      historyRef.current.shift()
    }

    setHistoryLength(historyRef.current.length)
  }

  const undoCanvas = () => {
    const previous = historyRef.current.pop()
    if (!previous) return

    strokesRef.current = cloneStrokes(previous)
    currentStrokeRef.current = null
    isDrawingRef.current = false

    const canvas = canvasRef.current
    if (canvas) drawStrokesToCanvas(canvas, strokesRef.current)

    saveCurrentStrokes()
    setHistoryLength(historyRef.current.length)
    setLastFeedback(null)
  }

  const getCanvasPoint = (e: PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()

    return {
      x: Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)),
    }
  }

  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.setPointerCapture(e.pointerId)

    pushHistory()

    const point = getCanvasPoint(e)
    const stroke: Stroke = { points: [point] }

    currentStrokeRef.current = stroke
    strokesRef.current.push(stroke)
    isDrawingRef.current = true

    drawStrokesToCanvas(canvas, strokesRef.current)
  }

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return

    e.preventDefault()

    const canvas = canvasRef.current
    const stroke = currentStrokeRef.current
    if (!canvas || !stroke) return

    const point = getCanvasPoint(e)
    const lastPoint = stroke.points[stroke.points.length - 1]

    const dx = point.x - lastPoint.x
    const dy = point.y - lastPoint.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 0.0015) return

    stroke.points.push(point)
    drawStrokesToCanvas(canvas, strokesRef.current)
  }

  const handlePointerEnd = (e: PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()

    const canvas = canvasRef.current

    if (canvas?.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId)
    }

    isDrawingRef.current = false
    currentStrokeRef.current = null
    saveCurrentStrokes()
  }

  const clearCanvas = () => {
    pushHistory()

    strokesRef.current = []
    currentStrokeRef.current = null
    isDrawingRef.current = false

    const canvas = canvasRef.current
    if (canvas) drawStrokesToCanvas(canvas, strokesRef.current)

    deleteStoredStrokes(currentKeyRef.current)
    setLastFeedback(null)
  }

  const createExportDataUrl = () => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = canvas.width
    exportCanvas.height = canvas.height

    const exportCtx = exportCanvas.getContext('2d')
    if (!exportCtx) return null

    exportCtx.fillStyle = '#ffffff'
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height)

    exportCtx.lineWidth = 2 * (window.devicePixelRatio || 1)
    exportCtx.lineCap = 'round'
    exportCtx.lineJoin = 'round'
    exportCtx.strokeStyle = '#111827'
    exportCtx.globalAlpha = 0.95

    strokesRef.current.forEach(stroke => {
      if (stroke.points.length < 2) return

      exportCtx.beginPath()
      exportCtx.moveTo(
        stroke.points[0].x * exportCanvas.width,
        stroke.points[0].y * exportCanvas.height,
      )

      stroke.points.slice(1).forEach(point => {
        exportCtx.lineTo(
          point.x * exportCanvas.width,
          point.y * exportCanvas.height,
        )
      })

      exportCtx.stroke()
    })

    return exportCanvas.toDataURL('image/png')
  }

  const sendScribble = async () => {
    saveCurrentStrokes()

    const dataUrl = createExportDataUrl()
    const base64 = dataUrl?.split(',')[1]
    if (!base64) return

    const state = ExerciseViewStore.getRawState()

    const canForwardToChat = Object.prototype.hasOwnProperty.call(
      state,
      'queuedChatSubmission',
    )

    if (canForwardToChat) {
      ExerciseViewStore.update(s => {
        s.chatMode = 'pruefen'
        s.queuedChatSubmission = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          content: '',
          attachment: {
            kind: 'image',
            src: dataUrl,
            name: 'Scribble',
          },
        }
        s.chatOverlay = 'chat'
      })
      return
    }

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

    const msgs: ScribbleApiMessage[] = [
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

- Wenn der Inhalt richtig ist, melde gutes Feedback zurück. Überprüfe jedoch die fachliche Korrektheit genau. Weise freundlich auf Fehler hin.
- Überprüfe, ob mit der Eingabe die entsprechende Teilaufgabe vollständig gelöst wurde.
- Falls Ergebnisse fehlen, melde das kurz zurück und motiviere weiterzumachen.
- Fasse dich sehr kurz.
- Falls etwas falsch ist, erkläre es in 1-2 Sätzen.
- Antworte auf Deutsch oder in der Sprache der Eingabe.
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
      },
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
      console.error('[ScribbleOverlay] request failed', error)
      const message =
        error instanceof Error ? error.message : 'Unbekannter Fehler'

      ExerciseViewStore.update(s => {
        s.chatMessages.push({
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `Fehler: ${message}`,
          createdAt: Date.now(),
        })
        s.chatPending = false
      })
    }
  }

  const content = (
    <div className="flex h-full select-none flex-col space-y-1.5 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-inner">
      <div className="min-h-0 flex-1 touch-none select-none overflow-hidden rounded-xl border bg-white">
        <canvas
          ref={canvasRef}
          className="h-full min-h-0 w-full touch-none select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
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
        <div className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-2 py-1.5 max-h-28 overflow-y-auto">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {lastFeedback}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )

  if (useSideCanvas && mounted) {
    return createPortal(
      <div className="fixed top-2 bottom-2 right-4 z-[9999] w-[360px]">
        {content}
      </div>,
      document.body,
    )
  }

  return (
    <div
      className="min-h-0 px-1 pb-1"
      style={{
        height: `${mobileHeightVh}dvh`,
        maxHeight: 'calc(100dvh - 7rem)',
      }}
    >
      {content}
    </div>
  )
}
