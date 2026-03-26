import pen from '/assets/simple-document-icon-paper-sheet-and-pencil-png.png'
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
import { useProgress } from '../../../../store/progress-store'

type Entry = [string, (typeof exercisesData)[number]]

function getYearFromSource(src?: string): number {
  if (!src) return 0
  const m = src.match(/\b(20\d{2})\b/)
  return m ? parseInt(m[1], 10) : 0
}

function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && (idNum < 3000 || idNum >= 3999)) return false
  if (exam == 2 && (idNum < 300 || idNum >= 399)) return false
  if (exam == 3) return false
  if (exam == 4) return false
  if (exam == 5) return false
  if (exam == 6) return false
  return true
}

/** Child-Komponente — hier ist der Hook-Aufruf sicher */
function ExerciseRow({
  idNum,
  id,
  content,
  onOpen,
}: {
  idNum: number
  id: string
  content: (typeof exercisesData)[number]
  onOpen: (idNum: number, id: string) => void
}) {
  const st = useProgress(idNum)
  // gelb hat Vorrang (flagged überschreibt solved)
  const cls = st?.flagged
    ? 'bg-yellow-100 border-yellow-400'
    : st?.solved
      ? 'bg-green-100 border-green-400'
      : 'bg-white border-gray-200'

  return (
    <div
      className={`my-2 cursor-pointer rounded-lg p-2 border hover:bg-gray-50 ${cls}`}
      onClick={() => onOpen(idNum, id)}
    >
      <div>
        {content.source && (
          <span className="text-fuchsia-900">[{content.source}] </span>
        )}
        {content.title}
      </div>
    </div>
  )
}

export function List() {
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

  const openExercise = (idNum: number, id: string) => {
    setupExercise(idNum)
    history.push('/exercise/' + id)
  }

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste aller Aufgaben</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        <div className="flex justify-between mb-4"></div>
        <div className="mx-3 rounded-xl border bg-sky-50 shadow-xl p-3">
          <div className="flex items-center ">
            <img src={pen.src} alt="Pen" className="w-10 h-10 rounded-xl " />
            <span className="flex-1 text-xs">
              Lege dir Stift, Papier, Taschenrechner und Geodreieck bereit.
              Lasse dir Zeit und bereite dich mit diesen originalen
              Prüfungsaufgaben vor.
            </span>
          </div>
        </div>
        <div className="mx-3 mt-4 bg-sky-50 rounded-md pt-2 px-2 pb-2">
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
                    {items.map(([id, content]) => {
                      const idNum = parseInt(id, 10)
                      return (
                        <ExerciseRow
                          key={id}
                          idNum={idNum}
                          id={id}
                          content={content}
                          onOpen={openExercise}
                        />
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
