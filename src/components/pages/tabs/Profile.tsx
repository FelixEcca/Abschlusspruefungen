import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'
import { useProfile, formatMs } from '../../../../store/progress-store'

export function Profile() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const profile = useProfile()

  type ExerciseEntry = {
    solved?: boolean
    flagged?: boolean
    attempts?: number
    correct?: number
    timeMs?: number
  }
  const entries: ExerciseEntry[] = Object.values(profile.exercises ?? {})
  const total = entries.length
  const solved = entries.filter(e => e.solved).length
  const flagged = entries.filter(e => e.flagged).length
  const attempts = entries.reduce((sum, e) => sum + (e.attempts ?? 0), 0)
  const correct = entries.reduce((sum, e) => sum + (e.correct ?? 0), 0)
  const totalTimeMs = profile.totalTimeMs ?? 0

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="mx-3 space-y-6 mt-4">
          {/* Prüfungsauswahl */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold" htmlFor="exam-select">
              Prüfung
            </label>
            <select
              id="exam-select"
              value={exam}
              onChange={e => {
                updatePlayerProfileStore(s => {
                  s.currentExam = parseInt(e.target.value)
                })
              }}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[3, 4, 5].map(n => (
                <option value={n} key={n}>
                  {navigationData[n].shortTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Statistik */}
          <div className="rounded-xl border p-3">
            <div className="font-semibold mb-2">Dein Lernfortschritt</div>
            <IonList lines="none">
              <IonItem>
                <IonLabel>
                  Bearbeitete Aufgaben: <b>{total}</b>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Gelöst (grün): <b>{solved}</b>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Markiert (Blitz, gelb): <b>{flagged}</b>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>
                  ⏱️ Lernzeit gesamt: <b>{formatMs(totalTimeMs)}</b>
                </IonLabel>
              </IonItem>
            </IonList>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
