import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import {
  faQuestionCircle,
  faRobot,
  faPen,
} from '@fortawesome/free-solid-svg-icons'

import { SolutionOverlay } from './SolutionOverlay'
import { useRef, useEffect, useState, type PointerEvent } from 'react'
import { ChatOverlay } from './ChatOverlay'
import { ScribbleOverlay } from './ScribbleOverlay'

const DEFAULT_OVERLAY_HEIGHT_VH = 40
const MIN_OVERLAY_HEIGHT_VH = 0
const MAX_OVERLAY_HEIGHT_VH = 84
const COLLAPSE_THRESHOLD_VH = 2

export function ExerciseViewFooter() {
  const resizeRef = useRef<{
    startY: number
    startHeightVh: number
    currentHeightVh: number
  } | null>(null)
  const wasResizableOverlayOpenRef = useRef(false)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const needReset2 = ExerciseViewStore.useState(s => s.needReset2)
  const [mobileOverlayHeightVh, setMobileOverlayHeightVh] = useState(
    DEFAULT_OVERLAY_HEIGHT_VH,
  )

  useEffect(() => {
    setTimeout(() => {
      ExerciseViewStore.update(s => {
        s.needReset2 = false
      })
    }, 10)
  }, [needReset2])

  const isChatOpen = chatOverlay === 'chat'
  const isScribbleOpen = chatOverlay === 'scribble'
  const isSolutionOpen = chatOverlay === 'solution'
  const isResizableOverlayOpen =
    isChatOpen || isScribbleOpen || isSolutionOpen

  useEffect(() => {
    if (isResizableOverlayOpen && !wasResizableOverlayOpenRef.current) {
      setMobileOverlayHeightVh(DEFAULT_OVERLAY_HEIGHT_VH)
    }
    wasResizableOverlayOpenRef.current = isResizableOverlayOpen
  }, [isResizableOverlayOpen])

  const navigationButtonClass = (active: boolean) =>
    `flex min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-sm font-medium transition ${
      active
        ? 'bg-white text-blue-800 shadow-sm'
        : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
    }`

  const startResize = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    resizeRef.current = {
      startY: event.clientY,
      startHeightVh: mobileOverlayHeightVh,
      currentHeightVh: mobileOverlayHeightVh,
    }
  }

  const moveResize = (event: PointerEvent<HTMLButtonElement>) => {
    const resize = resizeRef.current
    if (!resize) return

    const deltaVh = ((resize.startY - event.clientY) / window.innerHeight) * 100
    const nextHeight = Math.max(
      MIN_OVERLAY_HEIGHT_VH,
      Math.min(MAX_OVERLAY_HEIGHT_VH, resize.startHeightVh + deltaVh),
    )
    resize.currentHeightVh = nextHeight
    setMobileOverlayHeightVh(nextHeight)
  }

  const finishResize = (event: PointerEvent<HTMLButtonElement>) => {
    const resize = resizeRef.current
    if (!resize) return

    resizeRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (resize.currentHeightVh <= COLLAPSE_THRESHOLD_VH) {
      ExerciseViewStore.update(s => {
        s.chatOverlay = null
      })
      setMobileOverlayHeightVh(DEFAULT_OVERLAY_HEIGHT_VH)
      return
    }

    setMobileOverlayHeightVh(resize.currentHeightVh)
  }

  const toggleOverlay = (overlay: 'chat' | 'scribble' | 'solution') => {
    if (chatOverlay === overlay) {
      ExerciseViewStore.update(s => {
        s.chatOverlay = null
      })
      return
    }

    if (!isResizableOverlayOpen) {
      setMobileOverlayHeightVh(DEFAULT_OVERLAY_HEIGHT_VH)
    }

    ExerciseViewStore.update(s => {
      s.chatOverlay = overlay
    })
  }

  return (
    <div className="bg-white relative pt-1">
      {/* kleine „Kappe“ oben am Footer */}
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow" />

      {isResizableOverlayOpen && (
        <div className="absolute left-0 right-0 -top-5 z-20 flex h-8 items-center justify-center min-[1250px]:hidden">
          <button
            type="button"
            className="flex h-8 w-24 touch-none cursor-row-resize items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onPointerDown={startResize}
            onPointerMove={moveResize}
            onPointerUp={finishResize}
            onPointerCancel={finishResize}
            onKeyDown={event => {
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                setMobileOverlayHeightVh(height =>
                  Math.min(MAX_OVERLAY_HEIGHT_VH, height + 10),
                )
              } else if (event.key === 'ArrowDown') {
                event.preventDefault()
                setMobileOverlayHeightVh(height =>
                  Math.max(MIN_OVERLAY_HEIGHT_VH, height - 10),
                )
              } else if (event.key === 'Home') {
                event.preventDefault()
                setMobileOverlayHeightVh(MIN_OVERLAY_HEIGHT_VH)
              } else if (event.key === 'End') {
                event.preventDefault()
                setMobileOverlayHeightVh(MAX_OVERLAY_HEIGHT_VH)
              }
            }}
            aria-label="Höhe des Chatfensters ändern"
            title="Ziehen, um die Höhe zu ändern oder das Fenster einzufahren"
          >
            <span className="h-1.5 w-12 rounded-full bg-slate-400" />
          </button>
        </div>
      )}

      <div className="px-3 pb-2 pt-2">
        <nav
          className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1"
          aria-label="Aufgabenwerkzeuge"
        >
          <button
            type="button"
            className={navigationButtonClass(isChatOpen)}
            aria-pressed={isChatOpen}
            onClick={() => toggleOverlay('chat')}
          >
            <FaIcon icon={faRobot} className="shrink-0" />
            <span className="truncate">KI-Chat</span>
          </button>
          <button
            type="button"
            className={navigationButtonClass(isScribbleOpen)}
            aria-pressed={isScribbleOpen}
            onClick={() => toggleOverlay('scribble')}
          >
            <FaIcon icon={faPen} className="shrink-0" />
            <span className="truncate">Scribble</span>
          </button>
          <button
            type="button"
            className={navigationButtonClass(isSolutionOpen)}
            aria-pressed={isSolutionOpen}
            onClick={() => toggleOverlay('solution')}
          >
            <FaIcon icon={faQuestionCircle} className="shrink-0" />
            <span className="truncate">Lösung</span>
          </button>
        </nav>
      </div>

      {/* Inline-Overlays im Footer */}
      <SolutionOverlay mobileHeightVh={mobileOverlayHeightVh} />
      <ChatOverlay mobileHeightVh={mobileOverlayHeightVh} />
      {chatOverlay === 'scribble' && (
        <ScribbleOverlay mobileHeightVh={mobileOverlayHeightVh} />
      )}
    </div>
  )
}
