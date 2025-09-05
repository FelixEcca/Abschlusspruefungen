// src/components/pages/tabs/Profile.tsx
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
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'
import {
  useProfile,
  formatMs,
  resetProfile, // ⬅️ neu: zum Löschen des Lernfortschritts
} from '../../../../store/progress-store'
import React from 'react'
import { exercisesData } from '@/content/exercises'

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
  function passExamFilter(exam: number, idNum: number): boolean {
    if (exam == 1 && idNum > 99) return false
    if (exam == 2 && (idNum < 100 || idNum >= 199)) return false
    if (exam == 3 && (idNum < 200 || idNum >= 299)) return false
    if (exam == 4 && (idNum < 3000 || idNum >= 3999)) return false
    if (exam == 5 && (idNum < 400 || idNum >= 499)) return false
    return true
  }
  const entries: ExerciseEntry[] = Object.values(profile.exercises ?? {})
  const total = entries.length
  const solved = entries.filter(e => e.solved).length
  const flagged = entries.filter(e => e.flagged).length
  const totalTimeMs = profile.totalTimeMs ?? 0
  const allIds = React.useMemo(
    () =>
      Object.keys(exercisesData)
        .map(k => parseInt(k, 10))
        .filter(id => passExamFilter(exam, id)),
    [exam],
  )
  const total_all = allIds.length
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
          <div className="shadow-md bg-white rounded-xl border p-3">
            <div className="font-semibold mb-2">Dein Lernfortschritt</div>
            <IonList lines="none">
              <IonItem>
                <IonLabel>
                  Aufgaben insgesamt: <b>{total_all}</b>
                </IonLabel>
              </IonItem>
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

          {/* Fortschritt löschen */}
          <div className="shadow-md bg-white rounded-xl border p-3 space-y-3">
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
