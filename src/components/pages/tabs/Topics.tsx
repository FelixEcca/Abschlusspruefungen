// src/components/pages/tabs/Topics.tsx
import * as React from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { useHistory } from 'react-router'
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

function topicRouteIndex(exam: number, i: number) {
  return exam == 1 ? i + 1 : exam == 2 ? i + 101 : i + 201
}

export function Topics() {
  const history = useHistory()
  const exam = PlayerProfileStore.useState(s => s.currentExam)

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Themen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="mx-3 mt-4">
          <div className="space-y-2">
            {navigationData[exam]?.topics?.map((topic, i) => (
              <div
                key={i}
                className="rounded-lg border p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  history.push('/topic/' + topicRouteIndex(exam, i))
                }
              >
                <div className="font-medium">{topic.name}</div>
                {topic.skillGroups?.length ? (
                  <div className="text-sm text-gray-600">
                    {topic.skillGroups.length} Unterthemen
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
