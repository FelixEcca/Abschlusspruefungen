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

export function Profile() {
  const clientReady = useClientReady()
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const profile = useProfile()

  const examKeys = React.useMemo(
    () =>
      Object.keys(navigationData)
        .map(n => Number(n))
        .filter(n => !Number.isNaN(n))
        .sort((a, b) => a - b),
    [],
  )

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
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-semibold" htmlFor="exam-select">
              Prüfung
            </label>
            {/* Controlled erst nach Mount → verhindert SSR/CSR-Mismatch */}
            {clientReady ? (
              <select
                id="exam-select"
                value={typeof exam === 'number' ? exam : ''}
                onChange={e => {
                  const v = Number(e.target.value)
                  if (!Number.isNaN(v)) {
                    updatePlayerProfileStore(s => {
                      s.currentExam = v
                    })
                  }
                }}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Bitte auswählen …
                </option>
                {examKeys.map(n => (
                  <option value={n} key={n}>
                    {navigationData[n]?.shortTitle ?? `Prüfung ${n}`}
                  </option>
                ))}
              </select>
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
