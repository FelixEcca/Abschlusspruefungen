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
} from '@ionic/react'
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'
import { setupExercise } from '@/components/exercise-view/state/actions'
import { useHistory } from 'react-router'

export function Topics() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const topics = navigationData[exam]?.topics ?? []
  const history = useHistory()

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Themen</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Seitenhintergrund für diese Seite */}
      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 mt-4">
          <IonAccordionGroup expand="inset">
            {topics.map((topic, idx) => {
              const groups = topic?.skillGroups ?? []
              const groupCount = groups.length
              const topicTitle = topic?.title ?? `Thema ${idx + 1}`

              // Gesamtanzahl Aufgaben im Topic
              const totalExercises = groups.reduce((acc, g) => {
                const arr = Array.isArray(g?.skillExercises)
                  ? g.skillExercises
                  : []
                return acc + arr.length
              }, 0)

              return (
                <IonAccordion key={idx} value={String(idx)}>
                  {/* Header: klappt nur auf/zu */}
                  <IonItem slot="header" className="bg-white">
                    <IonLabel>
                      <div className="font-medium">{topicTitle}</div>
                      <div className="text-sm text-gray-500">
                        {groupCount} Unterthemen · {totalExercises} Aufgaben
                      </div>
                    </IonLabel>
                  </IonItem>

                  {/* Inhalt: Unterthemen (SkillGroups) als Cards mit Schatten */}
                  <div slot="content" className="p-2 space-y-3">
                    {groupCount === 0 ? (
                      <div className="text-sm text-gray-500 p-2">
                        Keine Unterthemen vorhanden.
                      </div>
                    ) : (
                      groups.map((g, gi) => {
                        const groupName = g?.name ?? `Unterthema ${gi + 1}`
                        const exRefs = Array.isArray(g?.skillExercises)
                          ? g.skillExercises
                          : []

                        return (
                          <div
                            key={gi}
                            className="p-3 bg-white rounded-xl shadow-md border border-gray-100"
                          >
                            <div className="font-semibold mb-1">
                              {groupName}
                            </div>

                            {exRefs.length > 0 ? (
                              <div className="space-y-2">
                                {exRefs.map((ref, ri) => {
                                  const id = ref?.id
                                  if (typeof id !== 'number') return null

                                  // optional: Seiten/Teile anzeigen (a), (b), ...
                                  const pagesLabel = Array.isArray(ref.pages)
                                    ? ref.pages
                                        .map(p => p?.index)
                                        .filter(Boolean)
                                        .join(', ')
                                    : null

                                  return (
                                    <div
                                      key={`${id}-${ri}`}
                                      className="text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-2 py-2 cursor-pointer"
                                      onClick={() => {
                                        // wie bei der Liste: Übung öffnen
                                        setupExercise(id, undefined, ref.pages)
                                        history.push('/exercise/' + id)
                                      }}
                                      title={
                                        pagesLabel
                                          ? `Seiten: ${pagesLabel}`
                                          : undefined
                                      }
                                    >
                                      Aufgabe #{id}
                                      {pagesLabel ? ` — (${pagesLabel})` : ''}
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (
                              <div className="text-sm text-gray-600">
                                Keine Aufgaben verknüpft.
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
