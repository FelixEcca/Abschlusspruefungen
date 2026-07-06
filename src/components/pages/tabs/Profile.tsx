import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
} from '@ionic/react'
import React from 'react'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'
import {
  useProfile,
  formatMs,
  resetProfile,
} from '../../../../store/progress-store'

function useClientReady() {
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => setReady(true), [])
  return ready
}

interface SubjectOption {
  label: string
  examId: number
}

interface SchoolformOption {
  name: string
  subjects: SubjectOption[]
}

const schoolformConfig: SchoolformOption[] = [
  {
    name: 'Ausbildungsvorbereitung (AV)',
    subjects: [
      { label: 'Mathematik', examId: 6 },
      { label: 'BFK Metall', examId: 7 },
      { label: 'BFK Elektrotechnik', examId: 8 },
    ],
  },
  {
    name: '2-jährige Berufsfachschule (2BFS2)',
    subjects: [
      { label: 'Mathematik', examId: 1 },
      { label: 'Physik', examId: 5 },
    ],
  },
  {
    name: 'Technisches Gymnasium 11 (TG11)',
    subjects: [
      { label: 'Mathematik', examId: 3 },
      { label: 'Physik', examId: 4 },
    ],
  },
  {
    name: 'Technisches Gymnasium 12 (TG12)',
    subjects: [
      { label: 'Mathematik gAN', examId: 13 },
      { label: 'Mathematik eAN', examId: 14 },
    ],
  },
  {
    name: 'Technisches Gymnasium 13 (TG13)',
    subjects: [
      { label: 'Mathematik gAN', examId: 15 },
      { label: 'Mathematik eAN', examId: 16 },
    ],
  },
  {
    name: 'Berufskolleg 1BK1T',
    subjects: [
      { label: 'Mathematik', examId: 10 },
      { label: 'Grundlagen der Technik', examId: 11 },
    ],
  },
  {
    name: 'Berufskolleg 1BK2T',
    subjects: [
      { label: 'Mathematik', examId: 12 },
      { label: 'Physik', examId: 2 },
    ],
  },
  {
    name: 'FTM',
    subjects: [{ label: 'Technische Mathematik', examId: 17 }],
  },
  {
    name: 'Berufskolleg Grafik-Design (3BKGD1)',
    subjects: [{ label: 'Mathematik', examId: 18 }],
  },
  {
    name: 'Berufskolleg Grafik-Design (3BKGD2)',
    subjects: [{ label: 'Mathematik', examId: 19 }],
  },
  {
    name: 'Berufskolleg Grafik-Design (3BKGD3)',
    subjects: [{ label: 'Mathematik', examId: 20 }],
  },
]

// nur Einträge anbieten, die in navigationData tatsächlich existieren
const schoolforms = schoolformConfig
  .map(form => ({
    ...form,
    subjects: form.subjects.filter(s => navigationData[s.examId]),
  }))
  .filter(form => form.subjects.length > 0)

const selectClassName =
  'w-full appearance-none font-sans rounded-xl border border-gray-300 bg-white p-2.5 pr-8 text-sm shadow-sm ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400'

function SelectChevron() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
      ▾
    </span>
  )
}

export function Profile() {
  const clientReady = useClientReady()
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const profile = useProfile()

  // Schulform, zu der die aktuell gewählte Prüfung gehört
  const examFormIndex = schoolforms.findIndex(form =>
    form.subjects.some(s => s.examId === exam),
  )
  const [formIndex, setFormIndex] = React.useState(examFormIndex)
  React.useEffect(() => setFormIndex(examFormIndex), [examFormIndex])

  const selectedForm = formIndex >= 0 ? schoolforms[formIndex] : undefined
  const selectedSubject = selectedForm?.subjects.find(s => s.examId === exam)

  function applyExam(examId: number) {
    updatePlayerProfileStore(s => {
      s.currentExam = examId
    })
    window.location.reload()
  }

  const entries = Object.values(profile.exercises ?? {}) as Array<{
    solved?: boolean
    flagged?: boolean
    timeMs?: number
  }>
  const workedOn = entries.length
  const solved = entries.filter(e => e.solved).length
  const flagged = entries.filter(e => e.flagged).length
  const totalTimeMs = profile.totalTimeMs ?? 0

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 space-y-6 mt-4">
          {/* Prüfungsauswahl */}
          <div className="shadow-md bg-sky-50 rounded-xl border p-3 space-y-3">
            <div className="font-semibold">Deine Prüfung</div>
            {/* Controlled erst nach Mount → verhindert SSR/CSR-Mismatch */}
            {clientReady ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col space-y-1">
                    <label
                      className="text-xs font-medium text-gray-600"
                      htmlFor="schoolform-select"
                    >
                      Schulform
                    </label>
                    <div className="relative">
                      <select
                        id="schoolform-select"
                        value={formIndex >= 0 ? formIndex : ''}
                        onChange={e => {
                          const idx = Number(e.target.value)
                          setFormIndex(idx)
                          // nur ein Fach → direkt übernehmen
                          const subjects = schoolforms[idx]?.subjects
                          if (
                            subjects?.length === 1 &&
                            subjects[0].examId !== exam
                          ) {
                            applyExam(subjects[0].examId)
                          }
                        }}
                        className={selectClassName}
                      >
                        <option value="" disabled>
                          Bitte auswählen …
                        </option>
                        {schoolforms.map((form, idx) => (
                          <option value={idx} key={form.name}>
                            {form.name}
                          </option>
                        ))}
                      </select>
                      <SelectChevron />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label
                      className="text-xs font-medium text-gray-600"
                      htmlFor="subject-select"
                    >
                      Fach
                    </label>
                    <div className="relative">
                      <select
                        id="subject-select"
                        value={selectedSubject?.examId ?? ''}
                        disabled={!selectedForm}
                        onChange={e => {
                          const v = Number(e.target.value)
                          if (!Number.isNaN(v)) {
                            applyExam(v)
                          }
                        }}
                        className={selectClassName}
                      >
                        <option value="" disabled>
                          {selectedForm
                            ? 'Bitte auswählen …'
                            : 'Erst Schulform wählen'}
                        </option>
                        {selectedForm?.subjects.map(s => (
                          <option value={s.examId} key={s.examId}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <SelectChevron />
                    </div>
                  </div>
                </div>
                {selectedSubject && selectedForm && (
                  <p className="text-xs text-gray-500">
                    Aktuell: {selectedForm.name} – {selectedSubject.label}
                  </p>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-400">Lade …</div>
            )}
          </div>

          {/* Statistik */}
          <div className="shadow-md bg-sky-50 rounded-xl border p-3">
            <div className="font-semibold mb-2">Dein Lernfortschritt</div>
            <IonList lines="none">
              <IonItem>
                <IonLabel>
                  Bearbeitete Aufgaben: <b>{workedOn}</b>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Gelöst (grün): <b>{solved}</b>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Markiert (gelb): <b>{flagged}</b>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  ⏱️ Lernzeit gesamt: <b>{formatMs(totalTimeMs)}</b>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>

          {/* Fortschritt löschen */}
          <div className="shadow-md bg-sky-50 rounded-xl border p-3 space-y-3">
            <div className="font-semibold">Fortschritt löschen</div>
            <IonText color="medium" className="text-sm block">
              Löscht alle lokal gespeicherten Lernstände auf diesem Gerät.
            </IonText>
            <IonButton
              color="danger"
              onClick={() => {
                if (
                  confirm(
                    'Wirklich den gesamten Lernfortschritt löschen? Dieser Vorgang kann nicht rückgängig gemacht werden.',
                  )
                ) {
                  resetProfile()
                  alert('Fortschritt gelöscht.')
                }
              }}
            >
              Löschen
            </IonButton>
          </div>

          <p className="text-xs text-gray-500">
            Hinweis: Alle Daten werden lokal in deinem Browser gespeichert.
          </p>
        </div>
      </IonContent>
    </IonPage>
  )
}
