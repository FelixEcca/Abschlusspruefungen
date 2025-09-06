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
  IonButton,
  IonBadge,
} from '@ionic/react'
import { useHistory } from 'react-router'
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'
import { setupExercise } from '../../exercise-view/state/actions'

type PageRef = { index: string; intro?: string[] }
type SkillEx =
  | number
  | {
      id: number
      pages?: PageRef[]
    }

/** Alle Aufgaben eines Themas „flachziehen“. Nimmt skillGroups UND optional topic.exercises. */
function collectExercises(topic: any) {
  const out: { id: number; pages?: PageRef[]; group?: string }[] = []

  // 1) Aus skillGroups[].skillExercises
  const groups = Array.isArray(topic?.skillGroups) ? topic.skillGroups : []
  groups.forEach((g: any) => {
    const sx = Array.isArray(g?.skillExercises) ? g.skillExercises : []
    sx.forEach((it: SkillEx) => {
      if (typeof it === 'number') out.push({ id: it, group: g?.name })
      else if (it && typeof it.id === 'number')
        out.push({ id: it.id, pages: it.pages, group: g?.name })
    })
  })

  // 2) Optional: top-level topic.exercises (Zahlen oder {id,pages})
  const top = Array.isArray(topic?.exercises) ? topic.exercises : []
  top.forEach((it: any) => {
    if (typeof it === 'number') out.push({ id: it })
    else if (it && typeof it.id === 'number')
      out.push({ id: it.id, pages: it.pages })
  })

  return out
}

export function Topics() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const topics = navigationData[exam]?.topics ?? []
  const history = useHistory()

  const startExercise = (
    id: number,
    topicTitle: string,
    group?: string,
    pages?: PageRef[],
  ) => {
    const name = group ?? topicTitle
    setupExercise(
      id,
      name,
      pages?.map(p => ({
        ...p,
        intro: p.intro as ('global' | 'local' | 'skill')[] | undefined,
      })),
    )
    history.push(
      '/exercise/' +
        id +
        (pages
          ? '#' +
            encodeURIComponent(
              JSON.stringify({
                name,
                pages,
              }),
            )
          : ''),
    )
  }

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Themen</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="mx-3 mt-4">
          <IonAccordionGroup expand="inset">
            {topics.map((topic: any, idx: number) => {
              const title = topic?.title ?? topic?.name ?? `Thema ${idx + 1}`
              const exercises = collectExercises(topic)

              return (
                <IonAccordion key={idx} value={String(idx)}>
                  {/* Header */}
                  <IonItem slot="header" className="bg-white">
                    <IonLabel>
                      <div className="font-medium">{title}</div>
                      <div className="text-sm text-gray-500">
                        {exercises.length > 0
                          ? `${exercises.length} Aufgaben`
                          : 'Keine Aufgaben hinterlegt'}
                      </div>
                    </IonLabel>
                  </IonItem>

                  {/* Inhalt: direkt Aufgaben-Liste */}
                  <div slot="content" className="p-2">
                    {exercises.length === 0 ? (
                      <div className="text-sm text-gray-600 p-2">
                        Für dieses Thema sind noch keine Aufgaben vorhanden.
                      </div>
                    ) : (
                      <IonList lines="none">
                        {exercises.map((ex, i) => {
                          const hasPages = ex.pages && ex.pages.length
                          return (
                            <IonItem
                              key={`${ex.id}-${i}`}
                              className="bg-white rounded-xl shadow-md mb-1"
                            >
                              <IonLabel>
                                <div className="flex items-center justify-between">
                                  <div className="font-medium">{ex.group}</div>
                                </div>

                                {hasPages ? (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {ex.pages!.map((p, pi) => (
                                      <IonButton
                                        key={pi}
                                        size="small"
                                        color="primary"
                                        fill="outline"
                                        onClick={() =>
                                          startExercise(
                                            ex.id,
                                            title,
                                            ex.group,
                                            [p],
                                          )
                                        }
                                      >
                                        Teil&nbsp;{p.index.toUpperCase()}
                                      </IonButton>
                                    ))}
                                  </div>
                                ) : (
                                  <div>
                                    <IonButton
                                      size="small"
                                      color="primary"
                                      onClick={() =>
                                        startExercise(ex.id, title, ex.group)
                                      }
                                    >
                                      Starten
                                    </IonButton>
                                  </div>
                                )}
                              </IonLabel>
                            </IonItem>
                          )
                        })}
                      </IonList>
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
