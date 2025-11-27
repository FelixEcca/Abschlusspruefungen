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

function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && (idNum < 4000 || idNum >= 4999)) return false
  if (exam == 2 && (idNum < 300 || idNum >= 399)) return false
  if (exam == 3 && (idNum < 5000 || idNum >= 5999)) return false
  if (exam == 4 && (idNum < 6000 || idNum >= 6999)) return false
  if (exam == 5 && (idNum < 6000 || idNum >= 6999)) return false
  return true
}

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

function pickUnsolvedRandom(
  pool: number[],
  fallbackPool: number[],
  lastId: number | null,
) {
  const base = pool.length > 0 ? pool : fallbackPool
  if (base.length === 0) return null
  let idx = Math.floor(Math.random() * base.length)
  if (base.length > 1 && lastId !== null && base[idx] === lastId) {
    idx = (idx + 1) % base.length
  }
  const id = base[idx]
  const c = exercisesData[id]
  return { id, content: c }
}

/** eigene Karte, damit useProgress nur gerufen wird, wenn suggestion existiert */
function SuggestionCard({
  suggestion,
  onPick,
}: {
  suggestion: { id: number; content: { title?: string; source?: string } }
  onPick: (id: number) => void
}) {
  const prog = useProgress(suggestion.id)
  const cls = prog?.flagged
    ? 'bg-yellow-100 border-yellow-400'
    : prog?.solved
      ? 'bg-green-100 border-green-400'
      : 'bg-white border-gray-200'

  return (
    <div
      className={`mt-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 ${cls}`}
      onClick={() => onPick(suggestion.id)}
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
            onPick(suggestion.id)
          }}
        >
          Jetzt üben
        </IonButton>
      </div>
    </div>
  )
}

export function Start() {
  const history = useHistory()

  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const name = PlayerProfileStore.useState(s => s.name) ?? ''
  const hasName = name.trim().length > 0

  const [editingName, setEditingName] = React.useState(!hasName)
  const [inputName, setInputName] = React.useState(name)
  React.useEffect(() => {
    setInputName(name)
    setEditingName(!hasName)
  }, [name, hasName])

  const [lastId, setLastId] = React.useState<number | null>(null)
  const [nonce, setNonce] = React.useState(0)

  const [suggestion, setSuggestion] = React.useState<{
    id: number
    content: { title?: string; source?: string }
  } | null>(() => {
    const s = pickStableSuggestion()
    return s
      ? { id: s.id, content: { title: s.title, source: s.source } }
      : null
  })

  React.useEffect(() => {
    if (typeof exam !== 'number') {
      setSuggestion(null)
      return
    }
    const allForExam = Object.keys(exercisesData)
      .map(id => parseInt(id, 10))
      .filter(idNum => passExamFilter(exam, idNum))
    const unsolved = allForExam.filter(idNum => !getStatus(idNum)?.solved)
    const pick = pickUnsolvedRandom(unsolved, allForExam, lastId)
    setSuggestion(pick)
  }, [exam, lastId, nonce])

  const userProfile = useProfile()
  const allIds = React.useMemo(
    () =>
      Object.keys(exercisesData)
        .map(k => parseInt(k, 10))
        .filter(id => passExamFilter(exam, id)),
    [exam],
  )
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
          <IonTitle>Abschlussprüfungen</IonTitle>
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
          <div className="shadow-md rounded-xl border p-3 bg-sky-50">
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
            )}
          </div>

          {/* Fortschritt */}
          <div className="bg-sky-50 shadow-md rounded-xl border p-3 mt-6">
            <div className="font-semibold mb-2">Dein Fortschritt</div>
            <div className="mt-4">
              <LevelPanel />
            </div>

            <div className="rounded-xl border bg-white shadow-xl p-6 mt-3">
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
              <SuggestionCard
                suggestion={suggestion}
                onPick={id => {
                  setLastId(id)
                  setupExercise(id)
                  history.push('/exercise/' + id)
                }}
              />
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
