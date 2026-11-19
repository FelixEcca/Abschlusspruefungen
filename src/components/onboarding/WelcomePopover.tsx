import * as React from 'react'
import { IonButton, IonInput } from '@ionic/react'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../store/player-profile-store'
import { schoolforms } from '@/data/schoolforms'
import { Gisela } from '@/components/gisela/Gisela'
import { getGiselaLook } from '@/components/gisela/gisela-looks'
import styles from './WelcomePopover.module.css'
import { useTutorial } from './TutorialProvider'

/** Erst nach Mount rendern -> verhindert SSR/CSR-Mismatch */
function useClientReady() {
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => setReady(true), [])
  return ready
}

type Props = { forceOpen?: boolean }

export function WelcomePopover({ forceOpen = false }: Props) {
  const { startTutorial } = useTutorial()
  const clientReady = useClientReady()
  const storeName = PlayerProfileStore.useState(s => s.name)
  const storeExam = PlayerProfileStore.useState(s => s.currentExam)

  // Sichtbarkeit lokal steuern
  const [dismissed, setDismissed] = React.useState(false)

  // Controlled Inputs
  const [name, setName] = React.useState(storeName ?? '')
  const [exam, setExam] = React.useState<number | ''>(
    (storeName?.trim().length ?? 0) >= 2 ? storeExam : '',
  )
  const [formIndex, setFormIndex] = React.useState(-1)
  const selectedForm = schoolforms[formIndex]

  // Submitting-Guard (verhindert Doppelklick)
  const [submitting, setSubmitting] = React.useState(false)

  // Store -> lokale Inputs synchronisieren (nach Rehydration)
  React.useEffect(() => {
    if (typeof storeName === 'string') setName(storeName)
  }, [storeName])
  React.useEffect(() => {
    if ((storeName?.trim().length ?? 0) < 2) return
    setExam(storeExam)
    setFormIndex(
      schoolforms.findIndex(form =>
        form.subjects.some(subject => subject.examId === storeExam),
      ),
    )
  }, [storeExam, storeName])

  // Bedingungen
  const missingName = !(storeName && storeName.trim().length >= 2)
  const missingExam = !schoolforms.some(form =>
    form.subjects.some(subject => subject.examId === storeExam),
  )
  const needOnboarding = missingName || missingExam

  const open = clientReady && (forceOpen || needOnboarding) && !dismissed
  const canSubmit =
    name.trim().length >= 2 &&
    selectedForm?.subjects.some(subject => subject.examId === exam) &&
    !submitting

  function onSubmit() {
    if (!canSubmit) return
    setSubmitting(true)
    const trimmed = name.trim()
    updatePlayerProfileStore(s => {
      s.name = trimmed
      s.currentExam = exam as number
    })
    startTutorial(exam as number)
    // Hard reload nach minimaler Verzögerung, um den Store persistieren zu lassen
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.reload()
      }, 0)
    } else {
      // Fallback ohne window (SSR-Sicherheit)
      setDismissed(true)
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/15 flex items-start justify-center pt-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Willkommen"
        className={styles.dialog}
        onMouseDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={`${styles.close} text-gray-400 hover:text-gray-600`}
          onClick={() => setDismissed(true)}
          aria-label="Schließen"
          title="Schließen"
          type="button"
        >
          ✖
        </button>
        <div className={styles.scene}>
          <div className={styles.bubble}>
            <h2 className={styles.greeting}>Hallo, ich bin Gisela!</h2>
            <p>
              Schön, dass du da bist! Wie heißt du und welche Schulform besuchst
              du?
            </p>
          </div>
          <div className={styles.mascot}>
            <Gisela
              className={styles.figure}
              look={getGiselaLook(
                typeof exam === 'number'
                  ? exam
                  : selectedForm?.subjects[0]?.examId ?? -1,
              )}
            />
          </div>
          <div className={styles.fields}>
            <IonInput
              label="Wie heißt du?"
              labelPlacement="stacked"
              placeholder="Dein Name"
              value={name}
              onIonInput={e => setName((e.detail.value as string) ?? '')}
            />

            <div>
              <label
                htmlFor="welcome-schoolform"
                className="block text-sm mb-1"
              >
                Deine Schulform
              </label>
              <select
                id="welcome-schoolform"
                title={selectedForm?.name}
                className="w-full min-w-0 border border-gray-300 rounded-lg bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formIndex >= 0 ? formIndex : ''}
                onChange={e => {
                  const index = Number(e.target.value)
                  setFormIndex(index)
                  const subjects = schoolforms[index]?.subjects
                  setExam(subjects?.length === 1 ? subjects[0].examId : '')
                }}
              >
                <option value="" disabled>
                  Auswählen
                </option>
                {schoolforms.map((form, index) => (
                  <option key={form.name} value={index} title={form.name}>
                    {form.shortName}
                  </option>
                ))}
              </select>
            </div>
            {selectedForm && (
              <div>
                <label htmlFor="welcome-subject" className="block text-sm mb-1">
                  Dein Fach
                </label>
                <select
                  id="welcome-subject"
                  title={
                    selectedForm.subjects.find(
                      subject => subject.examId === exam,
                    )?.label
                  }
                  className="w-full min-w-0 border border-gray-300 rounded-lg bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={exam}
                  onChange={e => setExam(Number(e.target.value))}
                >
                  <option value="" disabled>
                    Auswählen
                  </option>
                  {selectedForm.subjects.map(subject => (
                    <option
                      key={subject.examId}
                      value={subject.examId}
                      title={subject.label}
                    >
                      {subject.shortLabel ?? subject.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <IonButton expand="block" onClick={onSubmit} disabled={!canSubmit}>
            {submitting ? 'Lädt…' : "Los geht's"}
          </IonButton>

          <IonButton
            fill="outline"
            color="medium"
            onClick={() => setDismissed(true)}
            disabled={submitting}
          >
            Später
          </IonButton>
        </div>
      </div>
    </div>
  )
}
