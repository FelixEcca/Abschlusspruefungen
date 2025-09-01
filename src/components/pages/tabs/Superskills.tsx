import { setupExercise } from '@/components/exercise-view/state/actions'
import { exercisesData } from '@/content/exercises'
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
import { useHistory } from 'react-router'
import * as React from 'react'

type Entry = [string, (typeof exercisesData)[number]]

function getYearFromSource(src?: string): number {
  if (!src) return 0 // 0 = Sonstige
  const m = src.match(/\b(20\d{2})\b/)
  return m ? parseInt(m[1], 10) : 0
}

function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && idNum > 99) return false
  if (exam == 2 && (idNum < 100 || idNum >= 199)) return false
  if (exam == 3 && (idNum < 200 || idNum >= 299)) return false
  if (exam == 4 && (idNum < 3000 || idNum >= 3999)) return false
  if (exam == 5 && (idNum < 400 || idNum >= 499)) return false
  return true
}

export function Superskills() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const history = useHistory()

  // 1) Filtern wie bisher
  const filtered: Entry[] = React.useMemo(() => {
    return Object.entries(exercisesData).filter(([id]) => {
      const idNum = parseInt(id, 10)
      return passExamFilter(exam, idNum)
    }) as unknown as Entry[]
  }, [exam])

  // 2) Gruppieren nach Jahr (aus source)
  const grouped = React.useMemo(() => {
    const map = new Map<number, Entry[]>()
    for (const e of filtered) {
      const year = getYearFromSource(e[1]?.source)
      if (!map.has(year)) map.set(year, [])
      map.get(year)!.push(e)
    }
    // innerhalb jedes Jahres nach ID sortieren (aufsteigend)
    for (const [year, arr] of map) {
      arr.sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10))
      map.set(year, arr)
    }
    // Jahre absteigend sortierte Liste
    const years = Array.from(map.keys()).sort((a, b) => b - a)
    return { map, years }
  }, [filtered])

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste aller Aufgaben</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="mx-3">
          <div className="mt-8">
            <h2 className="font-bold">Liste aller Aufgaben nach Jahren</h2>

            <IonAccordionGroup expand="inset">
              {grouped.years.map(year => {
                const items = grouped.map.get(year)!
                const label = year === 0 ? 'Sonstige' : String(year)
                return (
                  <IonAccordion key={year} value={String(year)}>
                    <IonItem slot="header">
                      <IonLabel>
                        {label}{' '}
                        <span className="text-sm text-gray-500">
                          ({items.length})
                        </span>
                      </IonLabel>
                    </IonItem>
                    <div slot="content" className="p-2">
                      {items.map(([id, content]) => (
                        <div
                          key={id}
                          className="my-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
                          onClick={() => {
                            setupExercise(parseInt(id, 10))
                            history.push('/exercise/' + id)
                          }}
                        >
                          <div>
                            {content.source && (
                              <span className="text-fuchsia-900">
                                [{content.source}]{' '}
                              </span>
                            )}
                            {content.title}{' '}
                          </div>
                        </div>
                      ))}
                    </div>
                  </IonAccordion>
                )
              })}
            </IonAccordionGroup>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
