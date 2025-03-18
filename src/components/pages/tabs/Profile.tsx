import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react'
import {
  PlayerProfileStore,
  storageKey,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

export function Profile() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const name = PlayerProfileStore.useState(s => s.name)
  const key = PlayerProfileStore.useState(s => s.key)
  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profil </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="mx-3">
          <div className="flex flex-col space-y-2 mt-4">
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
              {[3, 4,5].map(n => (
                <option value={n} key={n}>
                  {navigationData[n].shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
