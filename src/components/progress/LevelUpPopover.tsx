import { useEffect, useId, useRef, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { faArrowRight, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@/components/ui/FaIcon'
import { Gisela } from '@/components/gisela/Gisela'
import { getGiselaLook } from '@/components/gisela/gisela-looks'
import {
  computeLevelProgress,
  MAX_LEVEL,
} from '@/components/exercise-view/leveling'
import { navigationData } from '@/content/navigations'
import type { LevelUp } from '../../../store/progress-store'
import styles from './LevelUpPopover.module.css'

type Props = { achievement: LevelUp; name: string; onClose: () => void }

export function LevelUpPopover({ achievement, name, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const continueRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const { level, courseId, solvedCount, totalCount } = achievement
  const { remainingToNext, nextLevel } = computeLevelProgress(
    solvedCount,
    totalCount,
    courseId,
  )
  const finalLevel = level === MAX_LEVEL

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.showModal()
    continueRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={event => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className={styles.confetti} aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <span
            key={index}
            style={
              {
                '--x': `${5 + ((index * 17) % 90)}%`,
                '--delay': `${(index % 6) * 0.12}s`,
                '--turn': `${index % 2 ? 270 : -210}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={styles.content}>
        <p className={styles.course}>{navigationData[courseId]?.shortTitle}</p>
        <div className={styles.badge} aria-hidden="true">
          <FaIcon icon={faTrophy} />
        </div>
        <p className={styles.eyebrow}>Levelaufstieg</p>
        <h2 id={titleId} className={styles.title}>
          Level {level} erreicht!
        </h2>
        <div className={styles.scene}>
          <div className={styles.mascot} aria-hidden="true">
            <Gisela className={styles.figure} look={getGiselaLook(courseId)} />
          </div>
          <div className={styles.bubble} id={descriptionId}>
            <p className={styles.congratulation}>
              {name.trim() ? `Klasse, ${name.trim()}!` : 'Klasse gemacht!'}
            </p>
            <p>
              {finalLevel
                ? 'Du hast das höchste Level erreicht! Ich freue mich mit dir. Bleib neugierig und übe in deinem Tempo weiter.'
                : 'Du bist drangeblieben und hast ein neues Level geschafft. Ich freue mich mit dir!'}
            </p>
          </div>
        </div>
        <div className={styles.progress}>
          <span>Gelöste Aufgaben in deinem Kurs</span>
          <strong>{solvedCount}</strong>
        </div>
        {!finalLevel && (
          <p className={styles.next}>
            Noch <strong>{remainingToNext}</strong>{' '}
            {remainingToNext === 1 ? 'Aufgabe' : 'Aufgaben'} bis Level{' '}
            {nextLevel}.
          </p>
        )}
        <button
          ref={continueRef}
          type="button"
          className={styles.continue}
          onClick={onClose}
        >
          Weiter geht&apos;s <FaIcon icon={faArrowRight} />
        </button>
      </div>
    </dialog>,
    document.body,
  )
}
