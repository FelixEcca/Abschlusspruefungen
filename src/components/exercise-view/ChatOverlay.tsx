// src/components/exercise-view/ChatOverlay.tsx
import { ExerciseViewStore } from './state/exercise-view-store'
import clsx from 'clsx'
import { FaIcon } from '../ui/FaIcon'
import { faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

// Kontext & API-Helper
import { exercisesData } from '@/content/exercises'
import { extractor } from './extractor/extractor'
import { makePost } from '@/helper/make-post'
import { IMessage } from '@/data/types'

// Markdown + LaTeX
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export function normalizeMathForMarkdown(text: string): string {
  let t = text

  t = t.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner) => `$${inner}$`)
  t = t.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner) => `$$${inner}$$`)
  t = t.replace(/\[([^\]\n]*\\frac[^\]\n]*)\]/g, (_m, inner) => `$${inner}$`)
  t = t.replace(/\[([^\]\n]*\^[^\]\n]*)\]/g, (_m, inner) => `$${inner}$`)

  return t
}

export function ChatOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const messages = ExerciseViewStore.useState(s => s.chatMessages)
  const pending = ExerciseViewStore.useState(s => s.chatPending)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages.length])

  if (chatOverlay !== 'chat') return null

  const sendMessage = async () => {
    const raw = inputRef.current?.value ?? ''
    const value = raw.trim()
    if (!value) return

    inputRef.current!.value = ''

    const state = ExerciseViewStore.getRawState()

    const userMessageId = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`
    ExerciseViewStore.update(s => {
      s.chatMessages.push({
        id: userMessageId,
        role: 'user',
        content: value,
        createdAt: Date.now(),
      })
      s.chatPending = true
    })

    const page = state.pages[state.navIndicatorPosition]
    const contextIndex = page?.context
    const exerciseId = contextIndex
      ? state._exerciseIDs[parseInt(contextIndex) - 1]
      : state.id

    const data = contextIndex ? state.dataPerExercise[contextIndex] : state.data

    const exerciseContext = extractor(exercisesData[exerciseId], data, {
      includeSolution: true,
      includeCorrectionHints: false,
      includeIntroLabel: true,
    })

    const historyText = state.chatMessages
      .map(m => `${m.role === 'user' ? 'Schülerin' : 'Tutor'}: ${m.content}`)
      .join('\n')

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
Du hilfst mir bei der Bearbeitung der Übungsaufgabe für die Schule.

- Antworte per default auf Deutsch. Falls man dich in einer anderen Sprache anspricht, antworte in derselben Sprache.
- Kontrolliere mein Ergebnis oder gehe auf meine Frage ein. Bestehe nicht auf Kleinigkeiten! Falls typische Fehler vorliegen, weise mich freundlich darauf hin.
- Deine Antwort wird als Markdown mit LaTeX gerendert.
- WICHTIG: Jede mathematische Formel MUSS in LaTeX-Umgebung geschrieben werden:
  - Inline: \`$ ... $\`
  - Abgesetzt: \`$$ ... $$\`
- Verwende NICHT nur eckige Klammern wie \`[ y = ... ]\`. Wenn du eine Formel angibst, setze sie IMMER in \`$...$\` oder \`$$...$$\`.
- Gehe auf die konkrete Aufgabe ein, nicht auf allgemeine Theorie.
- Du sollst grundsätzlich nur Hinweise geben, keine vollständigen Lösungen ausplaudern (außer auf ausdrückliche Nachfrage).

${
  historyText
    ? `
Hier ist der bisherige Chat-Verlauf:

${historyText}
`
    : ''
}
      `.trim(),
    })

    msgs.push({
      id: 'user',
      role: 'user',
      content: value,
    })

    try {
      const { text } = await makePost('/va89kjds', msgs)
      const normalized = normalizeMathForMarkdown(text)

      ExerciseViewStore.update(s => {
        s.chatMessages.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          role: 'assistant',
          content: normalized,
          createdAt: Date.now(),
        })
        s.chatPending = false
      })
    } catch (error) {
      console.error('Error fetching AI response:', error)
      ExerciseViewStore.update(s => {
        s.chatMessages.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          role: 'assistant',
          content:
            'Es ist ein Fehler bei der Verbindung zur KI aufgetreten. Bitte versuche es später noch einmal.',
          createdAt: Date.now(),
        })
        s.chatPending = false
      })
    }

    setTimeout(() => {
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
    }, 20)
  }

  return (
    <div className="px-3 pb-2">
      <div className="rounded-2xl border border-gray-200 max-h-[40vh] flex flex-col overflow-hidden bg-white shadow-inner">
        <div className="flex justify-between items-center px-3 py-2 border-b text-xs text-gray-600 bg-gray-50">
          <span>
            KI-Chat: Die KI <b>kann</b> Fehler machen oder deine Nachricht
            falsch verstehen.
          </span>
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

        <div
          ref={scrollRef}
          className="flex-1 px-3 py-2 overflow-y-auto space-y-2 text-sm"
        >
          {messages.length === 0 && !pending && (
            <div className="text-xs text-gray-500 pt-2">
              Stelle deine erste Frage unten im Eingabefeld.
            </div>
          )}

          {messages.map(m => (
            <div
              key={m.id}
              className={clsx(
                'flex',
                m.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <div
                className={clsx(
                  'max-w-[80%] rounded-2xl px-3 py-1.5 text-sm break-words',
                  m.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900',
                )}
              >
                {m.role === 'assistant' ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {m.content}
                  </ReactMarkdown>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}

          {pending && (
            <div className="text-xs text-gray-400 italic pt-1">
              KI denkt nach …
            </div>
          )}
        </div>

        <div className="border-t px-3 py-2 bg-gray-50">
          <div className="flex items-end gap-2 bg-white border rounded-xl px-3 py-2 shadow-sm">
            <TextareaAutosize
              ref={inputRef}
              minRows={1}
              maxRows={6}
              className="w-full resize-none outline-none bg-transparent text-sm"
              placeholder="Gib hier deine Frage oder Antwort ein..."
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  if (!pending) {
                    void sendMessage()
                  }
                }
              }}
            />

            <button
              type="button"
              className="p-2 rounded-full bg-white shadow-sm border disabled:opacity-50"
              onClick={() => {
                if (!pending) {
                  void sendMessage()
                }
              }}
              disabled={pending}
            >
              <FaIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
