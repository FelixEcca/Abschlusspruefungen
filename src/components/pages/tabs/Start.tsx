import * as React from 'react'
import streak from '/assets/10760660.png'
import medal from '/assets/7937682.png'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react'

import { exercisesData } from '@/content/exercises'
import { isExerciseForNavigation } from '@/content/navigation-exercises'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import {
  useProfile,
} from '../../../../store/progress-store'
import { WelcomePopover } from '@/components/onboarding/WelcomePopover'
import { LearningCoach } from '@/components/gisela/LearningCoach'
import { Gisela } from '@/components/gisela/Gisela'
import LevelPanel from '@/components/exercise-view/LevelingPanel'

export function Start() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const name = PlayerProfileStore.useState(s => s.name) ?? ''
  const hasName = name.trim().length > 0

  const [editingName, setEditingName] = React.useState(!hasName)
  const [inputName, setInputName] = React.useState(name)
  React.useEffect(() => {
    setInputName(name)
    setEditingName(!hasName)
  }, [name, hasName])

  const allIds = React.useMemo(
    () =>
      Object.keys(exercisesData)
        .map(k => parseInt(k, 10))
        .filter(id => isExerciseForNavigation(exam, id)),
    [exam],
  )

  const userProfile = useProfile()
  const solvedSet = React.useMemo(() => {
    const set = new Set<number>()
    for (const [k, v] of Object.entries(userProfile.exercises ?? {})) {
      if (v?.solved) set.add(parseInt(k, 10))
    }
    return set
  }, [userProfile.exercises])
  const solved = allIds.filter(id => solvedSet.has(id)).length
  const { currentStreak = 0 } = userProfile

  const needOnboarding =
    !(name && name.trim().length >= 2) || !(typeof exam === 'number')

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gewerbliche Schule Lahr</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Immer montiert; steuert Sichtbarkeit intern */}
      <WelcomePopover forceOpen={needOnboarding} />

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 mt-4 space-y-6">
          {/* Begrüßung */}
          <div
            data-tutorial="dashboard-greeting"
            className="shadow-md rounded-xl border p-3 bg-sky-50"
          >
            {editingName ? (
              <>
                <div className="font-semibold mb-1">Hallo! Wie heißt du?</div>
                <input
                  value={inputName}
                  onChange={e => setInputName(e.target.value)}
                  placeholder="Dein Name"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />

                <div className="flex gap-2">
                  <IonButton
                    onClick={() => {
                      const trimmed = inputName.trim()
                      updatePlayerProfileStore(s => {
                        s.name = trimmed || ''
                      })
                      setEditingName(!(trimmed.length > 0))
                    }}
                  >
                    Speichern
                  </IonButton>
                  {hasName ? (
                    <IonButton
                      fill="clear"
                      onClick={() => setEditingName(false)}
                    >
                      Abbrechen
                    </IonButton>
                  ) : null}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Dein Name wird nur lokal im Browser gespeichert.
                </p>
              </>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-2xl break-words">
                    Hallo{name ? `, ${name}` : ''}!
                  </div>
                  <div className="text-sm text-gray-600">
                    Schön, dich wiederzusehen. <br />
                    Viel Erfolg beim Üben!
                  </div>
                </div>
                <Gisela className="!w-24" />
              </div>
            )}
          </div>

          {/* Fortschritt */}
          <div className="bg-sky-50 shadow-md rounded-xl border p-3 mt-6">
            <div className="font-semibold mb-2">Dein Fortschritt</div>
            <div data-tutorial="dashboard-progress" className="mt-4">
              <LevelPanel />
            </div>

            <div className="rounded-xl border bg-white shadow-xl p-6 mt-3">
              <div className="flex items-center ">
                <img
                  src={medal.src}
                  alt="Medal"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <span className="flex-1 text-center">Gelöste Aufgaben:</span>
                <span className="flex-none text-right font-bold text-lg">
                  {solved}
                </span>
              </div>
            </div>

            <div className="h-3" />

            <div className="rounded-xl border bg-white shadow-xl p-6">
              <div className="flex items-center gap-3">
                <img
                  src={streak.src}
                  alt="Streak"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <span>
                  Aktuelle Streak: <b>{currentStreak}</b> Tag
                  {currentStreak === 1 ? '' : 'e'}
                </span>
              </div>
            </div>
          </div>

          {/* Lernassistent */}
          <div
            data-tutorial="dashboard-suggestion"
            className="shadow-md rounded-xl border p-3 bg-sky-50"
          >
            <LearningCoach
              key={exam}
              courseId={exam}
              name={name}
              progress={userProfile.exercises}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
