// src/components/pages/tabs/Participate.tsx
import * as React from 'react'
import { useHistory } from 'react-router'
import streak from '/assets/10760660.png'
import medal from '/assets/7937682.png'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/react'
import { shuffleOutline } from 'ionicons/icons'

import { exercisesData } from '@/content/exercises'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import {
  useProfile,
  useProgress,
  getStatus,
} from '../../../../store/progress-store'
import { setupExercise } from '@/components/exercise-view/state/actions'
import { WelcomePopover } from '@/components/onboarding/WelcomePopover'
import LevelPanel from '@/components/exercise-view/LevelingPanel'

// Entfernt: import { setNonce } ...  (verursachte Namenskollision/Unsinn)

function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && idNum > 99) return false
  if (exam == 2 && (idNum < 100 || idNum >= 199)) return false
  if (exam == 3 && (idNum < 200 || idNum >= 299)) return false
  if (exam == 4 && (idNum < 3000 || idNum >= 3999)) return false
  if (exam == 5 && (idNum < 400 || idNum >= 499)) return false
  return true
}

export function Start() {
  const history = useHistory()
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const name = PlayerProfileStore.useState(s => s.name) ?? ''
  const hasName = name.trim().length > 0

  // Popover explizit steuern (nur anzeigen, wenn Name/Exam fehlen)
  const needOnboarding = !hasName || typeof exam !== 'number'
  const [nonce, setNonce] = React.useState(0)
  const { currentStreak = 0 } = useProfile()

  // Zufällige Aufgabe (ungelöst bevorzugt)
  const [lastId, setLastId] = React.useState<number | null>(null)
  const suggestion = React.useMemo(() => {
    const ex = typeof exam === 'number' ? exam : (99999 as number) // Fallback zeigt alle
    const allForExam = Object.keys(exercisesData)
      .map(id => parseInt(id, 10))
      .filter(idNum => passExamFilter(ex, idNum))

    if (allForExam.length === 0) return null

    const onlyUnsolved = allForExam.filter(idNum => !getStatus(idNum)?.solved)
    const pool = onlyUnsolved.length > 0 ? onlyUnsolved : allForExam

    let pick = pool[Math.floor(Math.random() * pool.length)]
    if (pool.length > 1 && lastId !== null && pick === lastId) {
      pick = pool[Math.floor(Math.random() * pool.length)]
    }
    return { id: pick, content: exercisesData[pick] }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, lastId, nonce])

  const sugProgress = useProgress(suggestion?.id ?? -1)
  const sugClass = suggestion
    ? sugProgress?.flagged
      ? 'bg-yellow-100 border-yellow-400'
      : sugProgress?.solved
        ? 'bg-green-100 border-green-400'
        : 'bg-white border-gray-200'
    : 'bg-white border-gray-200'

  const allIds = React.useMemo(
    () =>
      Object.keys(exercisesData)
        .map(k => parseInt(k, 10))
        .filter(id =>
          passExamFilter(typeof exam === 'number' ? exam : 99999, id),
        ),
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

  const total = allIds.length
  const solved = allIds.filter(id => solvedSet.has(id)).length

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Abschlussprüfungen</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Popover nur wenn nötig */}
      <WelcomePopover forceOpen={needOnboarding} />

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 mt-4 space-y-6">
          {/* Begrüßungskarte (Name ändern) */}
          <div className="shadow-md rounded-xl border p-3 bg-sky-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl">
                  👋 Hallo{name ? `, ${name}` : ''}!
                </div>
                <div className="text-sm text-gray-600">
                  Schön, dich wiederzusehen. <br />
                  Viel Erfolg beim Üben!
                </div>
              </div>
            </div>
          </div>

          {/* Fortschritt */}
          <div className="bg-sky-50 shadow-md rounded-xl border p-3 mt-6">
            <div className="font-semibold mb-2">Dein Fortschritt</div>
            <div className="mt-4">
              <LevelPanel />
            </div>
            <div className="rounded-xl border bg-white shadow-xl p-6">
              <div className="flex items-center ">
                <img
                  src={medal.src}
                  alt="Medal"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <span className="flex-1 text-center">
                  Gelöste Prüfungsaufgaben:
                </span>
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

          {/* Zufällige Aufgabe */}
          <div className="shadow-md rounded-xl border p-3 bg-sky-50">
            <p>Starte direkt rein mit einer Aufgabe:</p>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Zufällige Aufgabe</div>
              <IonButton
                fill="clear"
                onClick={() => setNonce(n => n + 1)}
                title="Neue Aufgabe vorschlagen"
              >
                <IonIcon icon={shuffleOutline} />
              </IonButton>
            </div>

            {suggestion ? (
              <div
                className={`mt-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${sugClass}`}
                onClick={() => {
                  setLastId(suggestion.id)
                  setupExercise(suggestion.id)
                  history.push('/exercise/' + suggestion.id)
                }}
              >
                <div className="text-sm text-fuchsia-900">
                  [{suggestion.content.source ?? '—'}]
                </div>
                <div className="font-medium">{suggestion.content.title}</div>
                <div className="mt-2">
                  <IonButton
                    size="small"
                    onClick={e => {
                      e.stopPropagation()
                      setLastId(suggestion.id)
                      setupExercise(suggestion.id)
                      history.push('/exercise/' + suggestion.id)
                    }}
                  >
                    Jetzt üben
                  </IonButton>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                Für die eingestellte Prüfung wurden keine Aufgaben gefunden.
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
