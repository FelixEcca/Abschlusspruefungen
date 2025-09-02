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
import { useProgress } from '../../../../store/progress-store'
import * as React from 'react'

type Entry = [string, (typeof exercisesData)[number]]

function getYearFromSource(src?: string): number {
  if (!src) return 0
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

  const filtered: Entry[] = React.useMemo(() => {
    return Object.entries(exercisesData).filter(([id]) => {
      const idNum = parseInt(id, 10)
      return passExamFilter(exam, idNum)
    }) as unknown as Entry[]
  }, [exam])

  const grouped = React.useMemo(() => {
    const map = new Map<number, Entry[]>()
    for (const e of filtered) {
      const year = getYearFromSource(e[1]?.source)
      if (!map.has(year)) map.set(year, [])
      map.get(year)!.push(e)
    }
    for (const [year, arr] of map) {
      arr.sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10))
      map.set(year, arr)
    }
    const years = Array.from(map.keys()).sort((a, b) => b - a)
    return { map, years }
  }, [filtered])

  // Alle IDs für alle Jahre einsammeln
  const allIds = React.useMemo(() => {
    return grouped.years.flatMap(year => {
      const items = grouped.map.get(year)!
      return items.map(([id]) => parseInt(id, 10))
    })
  }, [grouped])

  // Reaktiver Fortschritt – einmal oben ermitteln
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allProgresses = allIds.map(idNum => useProgress(idNum))

  const getProgress = (idNum: number) => {
    const idx = allIds.indexOf(idNum)
    return allProgresses[idx]
  }

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Aufgaben nach Jahren</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}>
        <div className="mx-3 mt-8">

          <IonAccordionGroup expand="inset" >
            {grouped.years.map(year => {
              const items = grouped.map.get(year)!
              const label = year === 0 ? 'Sonstige' : String(year)

              return (
                <IonAccordion key={year} value={String(year)} >
                  <IonItem slot="header" >
                    <IonLabel >
                      {label}{' '}
                      <span className="text-sm text-gray-500">
                        ({items.length})
                      </span>
                    </IonLabel>
                  </IonItem>

                  <div slot="content" className="p-2">
                    {items.map(([id, content]) => {
                      const idNum = parseInt(id, 10)
                      const st = getProgress(idNum)

                      // ⚠️ Priorität: flagged > solved > default
                      const cls = st?.flagged
                        ? 'bg-yellow-100 border-yellow-400'
                        : st?.solved
                          ? 'bg-green-100 border-green-400'
                          : 'bg-white border-gray-200'

                      return (
                        <div
                          key={id}
                          className={`my-2 cursor-pointer rounded-lg p-2 border hover:bg-gray-50 ${cls}`}
                          onClick={() => {
                            setupExercise(idNum)
                            history.push('/exercise/' + id)
                          }}
                        >
                          <div>
                            {content.source && (
                              <span className="text-fuchsia-900">
                                [{content.source}]{' '}
                              </span>
                            )}
                            {content.title}
                          </div>
                        </div>
                      )
                    })}
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
