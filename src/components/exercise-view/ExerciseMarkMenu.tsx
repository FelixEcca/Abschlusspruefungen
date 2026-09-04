import { FaIcon } from '@/components/ui/FaIcon'
import {
  faBookmark,
  faCheckCircle,
  faClock,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import {
  setExerciseLearningStatus,
  type ExerciseLearningStatus,
  useProgress,
} from '../../../store/progress-store'

type MarkFeedback = {
  status: ExerciseLearningStatus
  active: boolean
}

export function ExerciseMarkMenu({ exerciseId }: { exerciseId: number }) {
  const progress = useProgress(exerciseId)
  const activeStatus: ExerciseLearningStatus | null = progress?.solved
    ? 'solved'
    : progress?.flagged
      ? 'later'
      : progress?.reviewLater
        ? 'retry'
        : null
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [feedback, setFeedback] = useState<MarkFeedback | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const feedbackTimeoutRef = useRef<number | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  const cancelScheduledClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const scheduleClose = () => {
    if (pinned || feedback) return
    cancelScheduledClose()
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false)
    }, 650)
  }

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        cancelScheduledClose()
        setOpen(false)
        setPinned(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      if (feedbackTimeoutRef.current) {
        window.clearTimeout(feedbackTimeoutRef.current)
      }
      cancelScheduledClose()
    }
  }, [])

  const selectStatus = (status: ExerciseLearningStatus) => {
    const nextStatus = activeStatus === status ? null : status
    setExerciseLearningStatus(exerciseId, nextStatus)
    setFeedback({ status, active: nextStatus === status })
    setPinned(true)
    setOpen(true)

    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current)
    }
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedback(null)
    }, 1100)
  }

  return (
    <div
      ref={menuRef}
      className="relative shrink-0"
      onClick={event => event.stopPropagation()}
      onMouseEnter={() => {
        cancelScheduledClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          cancelScheduledClose()
          setOpen(false)
          setPinned(false)
        }
      }}
    >
      <button
        type="button"
        className="rounded-xl bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          cancelScheduledClose()
          setPinned(current => !current)
          setOpen(true)
        }}
        onFocus={() => {
          cancelScheduledClose()
          setOpen(true)
        }}
      >
        <FaIcon icon={faBookmark} className="mr-1" />
        Markieren
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Aufgabe markieren"
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
        >
          <StatusMenuButton
            status="solved"
            label="Gelöst"
            description="Aufgabe abgeschlossen"
            icon={faCheckCircle}
            activeStatus={activeStatus}
            feedback={feedback}
            onSelect={selectStatus}
          />
          <StatusMenuButton
            status="later"
            label="Später wiederholen"
            description="Noch einmal ansehen"
            icon={faClock}
            activeStatus={activeStatus}
            feedback={feedback}
            onSelect={selectStatus}
          />
          <StatusMenuButton
            status="retry"
            label="Merken, wieder versuchen"
            description="Hier brauche ich noch Übung"
            icon={faBookmark}
            activeStatus={activeStatus}
            feedback={feedback}
            onSelect={selectStatus}
          />
        </div>
      )}
    </div>
  )
}

type StatusMenuButtonProps = {
  status: ExerciseLearningStatus
  label: string
  description: string
  icon: IconDefinition
  activeStatus: ExerciseLearningStatus | null
  feedback: MarkFeedback | null
  onSelect: (status: ExerciseLearningStatus) => void
}

function StatusMenuButton({
  status,
  label,
  description,
  icon,
  activeStatus,
  feedback,
  onSelect,
}: StatusMenuButtonProps) {
  const active = activeStatus === status
  const currentFeedback = feedback?.status === status ? feedback : null
  const colorClasses =
    status === 'solved'
      ? 'text-green-700 hover:bg-green-50'
      : status === 'later'
        ? 'text-amber-800 hover:bg-amber-50'
        : 'text-red-700 hover:bg-red-50'
  const activeClasses =
    status === 'solved'
      ? 'bg-green-50 ring-green-200'
      : status === 'later'
        ? 'bg-amber-50 ring-amber-200'
        : 'bg-red-50 ring-red-200'

  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={active}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${colorClasses} ${
        active ? `ring-1 ${activeClasses}` : ''
      }`}
      onClick={() => onSelect(status)}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-current/10">
        <FaIcon
          icon={currentFeedback ? faCheckCircle : icon}
          className={currentFeedback ? 'animate-bounce' : undefined}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">
          {currentFeedback
            ? currentFeedback.active
              ? 'Markiert'
              : 'Markierung entfernt'
            : label}
        </span>
        <span className="block text-xs font-normal text-slate-500">
          {currentFeedback ? label : description}
        </span>
      </span>
      {active && !currentFeedback && (
        <FaIcon icon={faCheckCircle} className="shrink-0" />
      )}
    </button>
  )
}
