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
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import {
  useProfile,
  useProgress,
  getStatus,
} from '../../../../store/progress-store'
import { setupExercise } from '@/components/exercise-view/state/actions'
import { WelcomePopover } from '@/components/onboarding/WelcomePopover'

function useClientReady() {
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => setReady(true), [])
  return ready
}

function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && idNum > 99) return false
  if (exam == 2 && (idNum < 100 || idNum >= 199)) return false
  if (exam == 3 && (idNum < 200 || idNum >= 299)) return false
  if (exam == 4 && (idNum < 3000 || idNum >= 3999)) return false
  if (exam == 5 && (idNum < 400 || idNum >= 499)) return false
  return true
}

/** Wählt deterministisch eine „mittlere“ Aufgabe (SSR-geeignet, ohne Zufall). */
function pickStableSuggestion(): {
  id: number
  title: string
  source?: string
} | null {
  const allIds = Object.keys(exercisesData)
    .map(k => parseInt(k, 10))
    .filter(Number.isFinite)
    .sort((a, b) => a - b)

  if (allIds.length === 0) return null
  const mid = allIds[Math.floor(allIds.length / 2)]
  const c = exercisesData[mid]
  return { id: mid, title: c?.title ?? 'Aufgabe', source: c?.source }
}

export function Start() {
  const clientReady = useClientReady()
  const history = useHistory()

  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const name = PlayerProfileStore.useState(s => s.name) ?? ''
  const hasName = name.trim().length > 0
  const needOnboarding = !hasName || typeof exam !== 'number'

  const { currentStreak = 0 } = useProfile()

  // SSR-sichere Initialempfehlung (deterministisch, ohne Random/Store)
  const [suggestion, setSuggestion] = React.useState(() =>
    pickStableSuggestion(),
  )
  const [lastId, setLastId] = React.useState<number | null>(null)
  const [nonce, setNonce] = React.useState(0)

  // Nach Mount (Client): Verfeinerung unter Berücksichtigung der Prüfung + „ungelöst bevorzugt“.
  React.useEffect(() => {
    if (!clientReady) return
    const ex = typeof exam === 'number' ? exam : (99999 as number)
    const allForExam = Object.keys(exercisesData)
      .map(id => parseInt(id, 10))
      .filter(idNum => passExamFilter(ex, idNum))

    if (allForExam.length === 0) {
      setSuggestion(null)
      return
    }
    const onlyUnsolved = allForExam.filter(idNum => !getStatus(idNum)?.solved)
    const pool = onlyUnsolved.length > 0 ? onlyUnsolved : allForExam

    // deterministisch, aber „gemischt“: nimm Index aus (exam + nonce) Mod pool.length
    const idx = Math.abs(
      ((typeof exam === 'number' ? exam : 0) + nonce) % pool.length,
    )
    let pick = pool[idx]
    // vermeide sofortige Wiederholung
    if (pool.length > 1 && lastId !== null && pick === lastId) {
      pick = pool[(idx + 1) % pool.length]
    }
    const content = exercisesData[pick]
    setSuggestion({
      id: pick,
      title: content?.title ?? 'Aufgabe',
      source: content?.source,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientReady, exam, nonce]) // lastId absichtlich nicht als Dep, wir prüfen nur innerhalb

  const sugProgress = useProgress(suggestion?.id ?? -1)
  const sugClass = suggestion
    ? sugProgress?.flagged
      ? 'bg-yellow-100 border-yellow-400'
      : sugProgress?.solved
        ? 'bg-green-100 border-green-400'
        : 'bg-white border-gray-200'
    : 'bg-white border-gray-200'

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Abschlussprüfungen</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Popover kontrolliert und nur nach Mount – verhindert SSR/CSR-Differenz */}
      {clientReady && <WelcomePopover forceOpen={needOnboarding} />}

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 mt-4 space-y-6">
          {/* Begrüßung */}
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

          {/* Kleine Streak-Karte (Features erhalten) */}
          <div className="bg-sky-50 shadow-md rounded-xl border p-3 mt-6">
            <div className="rounded-xl border bg-white shadow-xl p-6">
              <div className="flex items-center ">
                <img
                  src={medal.src}
                  alt="Medal"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <span className="flex-1 text-center">Aktuelle Streak:</span>
                <span className="flex-none text-right font-bold text-lg">
                  {currentStreak}
                </span>
              </div>
            </div>
          </div>

          {/* Zufällige (deterministische) Aufgabe */}
          <div className="shadow-md rounded-xl border p-3 bg-sky-50">
            <p>Starte direkt rein mit einer Aufgabe:</p>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Vorgeschlagene Aufgabe</div>
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
                  [{suggestion.source ?? '—'}]
                </div>
                <div className="font-medium">{suggestion.title}</div>
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
