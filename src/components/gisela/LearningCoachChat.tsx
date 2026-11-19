import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useHistory } from 'react-router'
import {
  faArrowLeft,
  faArrowRight,
  faCompass,
  faPaperPlane,
  faRotateLeft,
  faStop,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { FaIcon } from '@/components/ui/FaIcon'
import { navigationData } from '@/content/navigations'
import { exercisesData } from '@/content/exercises'
import { isExamExerciseInNavigation } from '@/content/navigation-exercises'
import { setupExercise } from '@/components/exercise-view/state/actions'
import {
  coachProgress,
  requestCoachReply,
  type CoachTurn,
} from '@/helper/learning-coach-chat'
import type { Profile } from '../../../store/progress-store'
import { getCoachExercises } from './learning-coach'
import { Gisela } from './Gisela'
import { GiselaAvatar } from './GiselaAvatar'
import { getGiselaLook } from './gisela-looks'
import styles from './LearningCoachChat.module.css'

type Message = CoachTurn & { exerciseId?: number | null }
type Props = {
  courseId: number
  name: string
  progress: Profile['exercises']
  open: boolean
  onClose: () => void
}

export function LearningCoachChat({
  courseId,
  name,
  progress,
  open,
  onClose,
}: Props) {
  const history = useHistory()
  const titleId = useId()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const sequenceRef = useRef(0)
  const lastRequestRef = useRef<CoachTurn[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const entries = useMemo(
    () =>
      getCoachExercises(
        navigationData[courseId],
        exercisesData,
        Object.keys(exercisesData)
          .map(Number)
          .filter(id => isExamExerciseInNavigation(courseId, id)),
      ),
    [courseId],
  )

  const cancel = useCallback(() => {
    if (!abortRef.current) return
    sequenceRef.current += 1
    abortRef.current.abort()
    abortRef.current = null
    setPending(false)
    setError(
      'Die Antwort wurde unterbrochen. Du kannst es noch einmal versuchen.',
    )
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    const previousFocus = document.activeElement as HTMLElement | null
    dialog.showModal()
    closeRef.current?.focus()
    return () => {
      cancel()
      if (dialog.open) dialog.close()
      if (previousFocus?.isConnected && previousFocus.getClientRects().length) {
        previousFocus.focus({ preventScroll: true })
      }
    }
  }, [open, cancel])

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: 'end' })
  }, [open, messages, pending, error])

  async function answer(turns: CoachTurn[]) {
    if (abortRef.current) return
    const sequence = ++sequenceRef.current
    const controller = new AbortController()
    abortRef.current = controller
    lastRequestRef.current = turns
    setError('')
    setPending(true)
    try {
      const response = await requestCoachReply(
        turns,
        courseId,
        coachProgress(entries, progress),
        entries,
        controller.signal,
      )
      if (sequence !== sequenceRef.current) return
      setMessages(previous => [
        ...previous,
        {
          role: 'assistant',
          content: response.reply,
          exerciseId: response.exerciseId,
        },
      ])
    } catch (failure) {
      if (sequence !== sequenceRef.current) return
      setError(
        failure instanceof Error
          ? failure.message
          : 'Die Antwort konnte nicht geladen werden.',
      )
    } finally {
      if (sequence === sequenceRef.current) {
        abortRef.current = null
        setPending(false)
      }
    }
  }

  async function send(text: string) {
    const content = text.trim().slice(0, 4000)
    if (!content || abortRef.current) return
    const next: Message[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    await answer(next.map(({ role, content }) => ({ role, content })))
  }

  if (!open) return null
  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={event => {
        event.preventDefault()
        onClose()
      }}
    >
      <header className={styles.header}>
        <button
          ref={closeRef}
          type="button"
          className={styles.iconButton}
          aria-label="Zurück zur Startseite"
          title="Zurück zur Startseite"
          onClick={onClose}
        >
          <FaIcon icon={faArrowLeft} />
        </button>
        <div className={styles.heading}>
          <h2 id={titleId}>Lernassistent</h2>
          <p>{navigationData[courseId]?.shortTitle}</p>
        </div>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Neues Gespräch"
          title="Neues Gespräch"
          disabled={!messages.length && !pending}
          onClick={() => {
            cancel()
            lastRequestRef.current = []
            setMessages([])
            setInput('')
            setError('')
          }}
        >
          <FaIcon icon={faRotateLeft} />
        </button>
      </header>

      <div className={styles.conversation}>
        <div className={styles.welcome}>
          <div className={styles.mascot} aria-hidden="true">
            <Gisela className={styles.figure} look={getGiselaLook(courseId)} />
          </div>
          <div className={styles.greeting}>
            <p className={styles.hello}>
              Hallo{name.trim() ? `, ${name.trim()}` : ''}!
            </p>
            <p>
              Was ist gerade los? Weißt du nicht, was du üben sollst, oder
              kommst du bei etwas nicht weiter?
            </p>
          </div>
        </div>
        {!messages.length && (
          <div className={styles.questions}>
            <button type="button" onClick={() => send('Was soll ich lernen?')}>
              <FaIcon icon={faCompass} />
              <span>Was soll ich lernen?</span>
              <FaIcon icon={faArrowRight} />
            </button>
            <button
              type="button"
              onClick={() => send('Welche Aufgabe schlägst du vor?')}
            >
              <FaIcon icon={faWandMagicSparkles} />
              <span>Welche Aufgabe schlägst du vor?</span>
              <FaIcon icon={faArrowRight} />
            </button>
          </div>
        )}
        <div
          className={styles.messages}
          role="log"
          aria-label="Gespräch mit Gisela"
          aria-live="polite"
          aria-relevant="additions"
          aria-busy={pending}
        >
          {messages.map((message, index) => {
            const exercise =
              message.exerciseId == null
                ? undefined
                : entries.find(entry => entry.id === message.exerciseId)
            return (
              <div
                key={index}
                className={
                  message.role === 'user' ? styles.user : styles.assistant
                }
              >
                <span className={styles.sender}>
                  {message.role === 'user' ? 'Du' : 'Gisela'}
                </span>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[
                    [rehypeKatex, { strict: 'ignore', throwOnError: false }],
                  ]}
                  skipHtml
                  components={{
                    a: ({ children }) => <span>{children}</span>,
                    img: () => null,
                  }}
                >
                  {message.content
                    .replace(
                      /\\\(([\s\S]*?)\\\)/g,
                      (_match, math) => `$${math}$`,
                    )
                    .replace(
                      /\\\[([\s\S]*?)\\\]/g,
                      (_match, math) => `$$${math}$$`,
                    )}
                </ReactMarkdown>
                {exercise && (
                  <button
                    type="button"
                    className={styles.exercise}
                    onClick={() => {
                      setupExercise(exercise.id)
                      onClose()
                      history.push(`/exercise/${exercise.id}`)
                    }}
                  >
                    <span>
                      <small>{exercise.topic}</small>
                      <strong>{exercise.title}</strong>
                      <span>Aufgabe öffnen</span>
                    </span>
                    <FaIcon icon={faArrowRight} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
        {pending && (
          <div className={styles.thinking} role="status">
            <GiselaAvatar
              expression="thinking"
              decorative
              className={styles.thinkingAvatar}
            />
            <span>Gisela denkt nach...</span>
          </div>
        )}
        {error && (
          <div className={styles.error} role="alert">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => answer(lastRequestRef.current)}
            >
              Noch einmal versuchen
            </button>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        className={styles.composer}
        onSubmit={event => {
          event.preventDefault()
          void send(input)
        }}
      >
        <div className={styles.inputRow}>
          <TextareaAutosize
            aria-label="Nachricht an Gisela"
            placeholder="Was beschäftigt dich gerade?"
            value={input}
            maxLength={4000}
            minRows={2}
            maxRows={5}
            onChange={event => setInput(event.target.value)}
            onKeyDown={event => {
              if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault()
                void send(input)
              }
            }}
          />
          {pending ? (
            <button
              type="button"
              className={styles.send}
              aria-label="Antwort abbrechen"
              title="Antwort abbrechen"
              onClick={cancel}
            >
              <FaIcon icon={faStop} />
            </button>
          ) : (
            <button
              type="submit"
              className={styles.send}
              aria-label="Nachricht senden"
              title="Nachricht senden"
              disabled={!input.trim()}
            >
              <FaIcon icon={faPaperPlane} />
            </button>
          )}
        </div>
        <p className={styles.privacy}>
          Nachrichten und relevante Lernmarkierungen werden für die Antwort an
          OpenAI gesendet. Dein Profilname wird nicht mitgesendet.
        </p>
      </form>
    </dialog>,
    document.body,
  )
}
