// ExerciseViewFooter.tsx
import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import {
  faQuestionCircle,
  faRobot,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import { useRef, useEffect } from 'react'
import { SolutionOverlay } from './SolutionOverlay'

export function ExerciseViewFooter() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
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

  const sendMessage = () => {
    const value = textareaRef.current?.value?.trim()
    if (!value) return

    ExerciseViewStore.update(s => {
      s.chatMessages.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role: 'user',
        content: value,
        createdAt: Date.now(),
      })
    })

    textareaRef.current!.value = ''
  }

  return (
    <div className="bg-white min-h-[65px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow" />

      {/* Lösung bleibt wie gehabt */}
      <SolutionOverlay />

      <div className="h-1" />

      {(!chatOverlay || chatOverlay === 'chat') && (
        <div className="flex justify-between items-center px-5 pt-1 pb-2">
          <button
            className="px-2 py-0.5 bg-gray-100 rounded text-sm"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = 'chat'
              })
              setTimeout(() => textareaRef.current?.focus(), 0)
            }}
          >
            <FaIcon icon={faRobot} /> KI-Chat
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
      )}

      {/* Eingabefeld */}
      {chatOverlay === 'chat' && (
        <div className="px-4 pb-3">
          <div className="flex items-end gap-2 border rounded-xl px-3 py-2 bg-gray-50">
            <TextareaAutosize
              ref={textareaRef}
              minRows={1}
              maxRows={4}
              className="w-full resize-none outline-none bg-transparent text-sm"
              placeholder="Gib hier deine Frage oder Antwort ein..."
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
            />
            <button
              type="button"
              className="p-2 rounded-full bg-white shadow-sm border"
              onClick={sendMessage}
            >
              <FaIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
