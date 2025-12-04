import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import { faQuestionCircle, faRobot } from '@fortawesome/free-solid-svg-icons'

import { SolutionOverlay } from './SolutionOverlay'
import { useRef, useEffect } from 'react'
import { ChatOverlay } from './ChatOverlay'

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

  return (
    <div className="bg-white relative pt-1">
      {/* kleine „Kappe“ oben am Footer */}
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow" />

      {/* Lösung-Overlay (schwebt über dem Footer, wenn aktiv) */}
      <SolutionOverlay />

      {/* Kopfzeile mit Buttons */}
      <div className="flex justify-between items-center px-5 pt-2 pb-2">
        <button
          className="px-2 py-0.5 bg-gray-100 rounded text-sm"
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.chatOverlay = isChatOpen ? null : 'chat'
            })
          }}
        >
          <FaIcon icon={faRobot} /> {isChatOpen ? 'Chat schließen' : 'KI-Chat'}
        </button>

        <details
          className="dropdown dropdown-top dropdown-end"
          ref={helpDropdownRef}
        >
          <summary
            className="list-none cursor-pointer px-2 py-0.5 bg-gray-100 rounded text-sm"
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

      {/* KI-Chat: inline im Footer, kein zweites Textfeld mehr */}
      <ChatOverlay />
    </div>
  )
}
