import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import {
  faQuestionCircle,
  faRobot,
  faPen,
} from '@fortawesome/free-solid-svg-icons'

import { SolutionOverlay } from './SolutionOverlay'
import { useRef, useEffect } from 'react'
import { ChatOverlay } from './ChatOverlay'
import { ScribbleOverlay } from './ScribbleOverlay'

export function ExerciseViewFooter() {
  const helpDropdownRef = useRef<HTMLDetailsElement>(null)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const needReset2 = ExerciseViewStore.useState(s => s.needReset2)

  useEffect(() => {
    setTimeout(() => {
      ExerciseViewStore.update(s => {
        s.needReset2 = false
      })
    }, 10)
  }, [needReset2])

  const isChatOpen = chatOverlay === 'chat'
  const isScribbleOpen = chatOverlay === 'scribble'

  return (
    <div className="bg-white relative pt-1">
      {/* kleine „Kappe“ oben am Footer */}
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow" />

      {/* Lösung-Overlay (liegt über dem Footer) */}
      <SolutionOverlay />

      {/* Button-Leiste */}
      <div className="flex justify-between items-center px-5 pt-2 pb-2 gap-2">
        <div className="flex gap-2">
          {/* KI-Chat */}
          <button
            className={`px-4 py-1 rounded text-sm ${
              isChatOpen ? 'bg-blue-100' : 'bg-gray-100'
            }`}
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = isChatOpen ? null : 'chat'
              })
            }}
          >
            <FaIcon icon={faRobot} /> KI-Chat
          </button>

          {/* Scribble */}
          <button
            className={`px-8 py-2 rounded text-sm  ${
              isScribbleOpen ? 'bg-blue-100' : 'bg-gray-100'
            } mx-auto`}
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = isScribbleOpen ? null : 'scribble'
              })
            }}
          >
            <FaIcon icon={faPen} /> Scribble
          </button>
        </div>

        {/* Lösung */}
        <details
          className="dropdown dropdown-top dropdown-end"
          ref={helpDropdownRef}
        >
          <summary
            className="list-none cursor-pointer px-4 py-2 bg-gray-100 rounded text-sm"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = 'solution'
              })
              if (helpDropdownRef.current) {
                helpDropdownRef.current.open = false
              }
            }}
          >
            <FaIcon icon={faQuestionCircle} /> Lösung
          </summary>
        </details>
      </div>

      {/* Inline-Overlays im Footer */}
      {chatOverlay === 'chat' && <ChatOverlay />}
      {chatOverlay === 'scribble' && <ScribbleOverlay />}
    </div>
  )
}
