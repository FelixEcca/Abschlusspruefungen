// src/components/pages/tabs/Participate.tsx
import * as React from 'react'
import { useProfile } from '../../../../store/progress-store'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/react'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { exercisesData } from '@/content/exercises'
import { navigationData } from '@/content/navigations'
import { useHistory } from 'react-router'
import { setupExercise } from '@/components/exercise-view/state/actions'
import { useProgress, getStatus } from '../../../../store/progress-store'
import { shuffleOutline } from 'ionicons/icons'

function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && idNum > 99) return false
  if (exam == 2 && (idNum < 100 || idNum >= 199)) return false
  if (exam == 3 && (idNum < 200 || idNum >= 299)) return false
  if (exam == 4 && (idNum < 3000 || idNum >= 3999)) return false
  if (exam == 5 && (idNum < 400 || idNum >= 499)) return false
  return true
}

function topicRouteIndex(exam: number, i: number) {
  return exam == 1 ? i + 1 : exam == 2 ? i + 101 : i + 201
}

export function Start() {
  const history = useHistory()
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const name = PlayerProfileStore.useState(s => s.name)

  // Begrüßung / Name
  const [editingName, setEditingName] = React.useState(!name)
  const [inputName, setInputName] = React.useState(name ?? '')
  React.useEffect(() => {
    setInputName(name ?? '')
    if (name && name.trim().length > 0) setEditingName(false)
  }, [name])

  // Zufällige Aufgabe: immer "ungelöst" (Fallback: alle, falls alles gelöst)
  const [lastId, setLastId] = React.useState<number | null>(null)
  const [nonce, setNonce] = React.useState(0)
  const { currentStreak = 0 } = useProfile()
  const suggestion = React.useMemo(() => {
    const allForExam = Object.keys(exercisesData)
      .map(id => parseInt(id, 10))
      .filter(idNum => passExamFilter(exam, idNum))

    if (allForExam.length === 0) return null

    const onlyUnsolved = allForExam.filter(idNum => !getStatus(idNum)?.solved)
    const pool = onlyUnsolved.length > 0 ? onlyUnsolved : allForExam

    // pick != lastId (sofern möglich)
    let pick = pool[Math.floor(Math.random() * pool.length)]
    if (pool.length > 1 && lastId !== null && pick === lastId) {
      // einmal neu würfeln, um Varianz zu erhöhen
      pick = pool[Math.floor(Math.random() * pool.length)]
    }
    return { id: pick, content: exercisesData[pick] }
    // lastId absichtlich NICHT als Dependency – wir triggern Neuwahl über nonce
  }, [exam, lastId])

  // Fortschritts-Färbung für die vorgeschlagene Aufgabe (flagged > solved > default)
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

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 mt-4 space-y-6">
          {/* Begrüßung */}
          <div className="shadow-md rounded-xl border p-3 bg-white">
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
                      setEditingName(!trimmed)
                    }}
                  >
                    Speichern
                  </IonButton>
                  {name ? (
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
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg">
                    👋 Hallo{name ? `, ${name}` : ''}!
                  </div>
                  <div className="text-sm text-gray-600">
                    Schön dich wieder zu sehen. Viel Erfolg beim Üben!
                  </div>
                </div>
                <IonButton fill="clear" onClick={() => setEditingName(true)}>
                  Bearbeiten
                </IonButton>
              </div>
            )}
          </div>

          <div className="shadow-md text-sm text-gray-600 rounded-xl border p-3 bg-white">
            🔥 Aktuelle Streak: <b>{currentStreak}</b> Tag
            {currentStreak === 1 ? '' : 'e'}
            <br></br>
            <br></br>
            <p>Sieh in deinem Profil nach, um deinen Fortschritt zu sehen.</p>
          </div>
          {/* Zufällige Aufgabe (immer ungelöst; Fallback: alle) */}

          <div className="shadow-md rounded-xl border p-3 bg-white">
            <p>Starte direkt rein mit einer Aufgabe:</p>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Zufällige Aufgabe</div>
              <IonButton
                fill="clear"
                onClick={() => {
                  if (suggestion) setLastId(suggestion.id)
                  setNonce(n => n + 1) // triggert Neuwahl
                }}
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
