import * as React from 'react'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react'
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'

function topicRouteIndex(exam: number, i: number) {
  return exam == 1 ? i + 1 : exam == 2 ? i + 101 : i + 201
}

export function Topics() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const topics = navigationData[exam]?.topics ?? []

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Themen</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Seitenhintergrund hier pro Seite setzen */}
      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 mt-4">
          <IonAccordionGroup expand="inset">
            {topics.map((topic, idx) => {
              const groups = topic?.skillGroups ?? []
              const groupCount = groups.length
              // Fallback-Namen, falls topic.name fehlt
              const topicName =
                (topic as any)?.name ??
                (topic as any)?.title ??
                `Thema ${idx + 1}`

              return (
                <IonAccordion key={idx} value={String(idx)}>
                  {/* Header klappt nur auf/zu – kein Routing */}
                  <IonItem slot="header" className="bg-white">
                    <IonLabel>
                      <div className="font-medium">{topicName}</div>
                      {groupCount > 0 && (
                        <div className="text-sm text-gray-500">
                          {groupCount} Unterthemen
                        </div>
                      )}
                    </IonLabel>
                  </IonItem>

                  {/* Inhalt: Unterthemen als Cards mit Schatten */}
                  <div slot="content" className="p-2 space-y-3">
                    {groupCount === 0 ? (
                      <div className="text-sm text-gray-200 p-2">
                        Keine Unterthemen vorhanden.
                      </div>
                    ) : (
                      groups.map((g: any, gi: number) => {
                        const groupName = g?.name ?? `Unterthema ${gi + 1}`
                        const skills = Array.isArray(g?.skills) ? g.skills : []

                        return (
                          <div
                            key={gi}
                            className="p-3 bg-white rounded-xl shadow-md border border-gray-100"
                          >
                            <div className="font-semibold mb-1">
                              {groupName}
                            </div>

                            {skills.length > 0 ? (
                              <IonList lines="none">
                                {skills.map((skill: any, si: number) => {
                                  const skillName =
                                    typeof skill === 'string'
                                      ? skill
                                      : skill?.name ?? `Skill ${si + 1}`
                                  return (
                                    <div
                                      key={si}
                                      className="text-sm text-gray-100 py-1 px-2 rounded hover:bg-gray-50 cursor-default"
                                    >
                                      {skillName}
                                    </div>
                                  )
                                })}
                              </IonList>
                            ) : (
                              <div className="text-sm text-gray-600">
                                Keine Einzel-Skills gelistet.
                              </div>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>
                </IonAccordion>
              )
            })}
          </IonAccordionGroup>
        </div>
      </IonContent>
    </IonPage>
  )
}
