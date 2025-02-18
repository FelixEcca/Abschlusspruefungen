import { ExerciseViewStore } from './state/exercise-view-store'
import { FaIcon } from '../ui/FaIcon'
import {
  faCameraAlt,
  faCaretDown,
  faCaretUp,
  faExpand,
  faQuestionCircle,
  faSquareRootVariable,
} from '@fortawesome/free-solid-svg-icons'

import { SolutionOverlay } from './SolutionOverlay'

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'

import { useRef, useEffect, Fragment } from 'react'
import { buildInlineFrac } from '@/helper/math-builder'

export function ExerciseViewFooter() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const formulaDropdownRef = useRef<HTMLDetailsElement>(null)
  const helpDropdownRef = useRef<HTMLDetailsElement>(null)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const chatHistoryRef = useRef<HTMLDivElement>(null)

  const id = ExerciseViewStore.useState(s => s.id)
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const needReset2 = ExerciseViewStore.useState(s => s.needReset2)

  useEffect(() => {
    setTimeout(() => {
      ExerciseViewStore.update(s => {
        s.needReset2 = false
      })
    }, 10)
  }, [needReset2])

  const insertSymbolAtCursor = (symbol: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value

    // Text vor und nach der aktuellen Cursorposition
    const newText = text.slice(0, start) + symbol + text.slice(end)
    textarea.value = newText

    // Cursorposition anpassen
    textarea.selectionStart = textarea.selectionEnd = start + symbol.length
    //textarea.focus()

    // Update in deinem State speichern

    if (formulaDropdownRef.current) {
      formulaDropdownRef.current.open = false
    }
  }

  return (
    <div className="bg-white min-h-[65px] relative">
      <div className="absolute left-0 right-0 -top-5 h-5 rounded-tl-full rounded-tr-full bg-white rounded-footer-shadow">
        {/* visual element*/}
      </div>

      <SolutionOverlay />

      <div className="h-1"></div>
      {chatOverlay == 'chat' && <></>}
      {(!chatOverlay || chatOverlay == 'chat') && (
        <>
          <div className="flex justify-between">
            <div className="ml-5"></div>
            <div>
              {
                <button
                  className="bg-gray-100 px-2 rounded mr-3"
                  onClick={() => {
                    ExerciseViewStore.update(s => {
                      if (s.chatOverlay) {
                        s.chatOverlay = null
                      } else {
                        s.chatOverlay = 'chat'
                      }
                    })
                  }}
                >
                  <FaIcon
                    icon={chatOverlay == 'chat' ? faCaretDown : faCaretUp}
                    className="text-lg"
                  />
                </button>
              }
              <details
                className="dropdown dropdown-top dropdown-end mr-5"
                ref={helpDropdownRef}
              >
                <summary className="list-none cursor-pointer px-2 py-0.5 bg-gray-100 rounded">
                  <FaIcon icon={faQuestionCircle} /> Lösung
                </summary>
                <ul className="dropdown-content w-[200px] bg-white p-2 rounded border">
                  <li
                    className="py-2 cursor-pointer hover:underline"
                    onClick={() => {
                      ExerciseViewStore.update(s => {
                        s.chatOverlay = 'solution'
                      })
                      if (helpDropdownRef.current) {
                        helpDropdownRef.current.open = false
                      }
                    }}
                  >
                    Mit Lösung vergleichen
                  </li>
                  {!toHome && (
                    <li
                      className="py-2 cursor-pointer hover:underline"
                      onClick={() => {
                        ExerciseViewStore.update(s => {
                          {
                            s.chatOverlay = 'chat'
                          }
                        })
                        if (helpDropdownRef.current) {
                          helpDropdownRef.current.open = false
                        }
                      }}
                    >
                      Wie lerne ich?
                    </li>
                  )}
                </ul>
              </details>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
