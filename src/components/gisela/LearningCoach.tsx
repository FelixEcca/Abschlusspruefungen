import { useState } from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@/components/ui/FaIcon'
import type { Profile } from '../../../store/progress-store'
import { Gisela } from './Gisela'
import { getGiselaLook } from './gisela-looks'
import { LearningCoachChat } from './LearningCoachChat'
import styles from './LearningCoach.module.css'

export function LearningCoach({
  courseId,
  name,
  progress,
}: {
  courseId: number
  name: string
  progress: Profile['exercises']
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <section className={styles.entry} aria-label="Lernassistent">
        <div aria-hidden="true" className={styles.mascot}>
          <Gisela className={styles.figure} look={getGiselaLook(courseId)} />
        </div>
        <div className={styles.invitation}>
          <h2 className={styles.title}>Dein Lernassistent</h2>
          <p>Was brauchst du gerade?</p>
          <button
            type="button"
            className={styles.open}
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            Lernassistent öffnen <FaIcon icon={faArrowRight} />
          </button>
        </div>
      </section>
      <LearningCoachChat
        courseId={courseId}
        name={name}
        progress={progress}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
