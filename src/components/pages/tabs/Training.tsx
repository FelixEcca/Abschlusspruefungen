import * as React from 'react'
import trainingPng from '/assets/2307827.png'
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
import { useHistory } from 'react-router'
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import { navigationData } from '@/content/navigations'
import { setupExercise } from '@/components/exercise-view/state/actions'
import { useProgress } from '../../../../store/progress-store'

type PageRef = { index: string; intro?: string[] }
type SkillExercise =
  | number
  | {
      id: number
      pages?: PageRef[]
    }

type FlatExercise = { id: number; group?: string }

function flattenExercises(topic: any): FlatExercise[] {
  const groups = Array.isArray(topic?.skillGroups) ? topic.skillGroups : []
  const out: FlatExercise[] = []
  groups.forEach((g: any) => {
    const skills = Array.isArray(g?.skillExercises) ? g.skillExercises : []
    skills.forEach((sx: SkillExercise) => {
      if (typeof sx === 'number') {
        out.push({ id: sx, group: g?.name })
      } else if (
        sx &&
        typeof sx === 'object' &&
        typeof (sx as any).id === 'number'
      ) {
        out.push({ id: (sx as any).id, group: g?.name })
      }
    })
  })
  return out
}

function flattenAllExercises(topics: any[]): FlatExercise[] {
  const acc: FlatExercise[] = []
  topics.forEach(t => acc.push(...flattenExercises(t)))
  return acc
}

/** Zählt gelöste Aufgaben über useProgress (deterministisches Mapping -> Hooks ok). */
function TrainingSummary({ ids }: { ids: number[] }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const states = ids.map(id => useProgress(id))
  const solved = states.filter(s => s?.solved).length
  return (
    <div className="text-lg font-semibold">
      {solved}/{ids.length} Aufgaben gelöst
    </div>
  )
}

/** Einzelne Aufgabenzeile mit Statusfarbe wie in List.tsx via useProgress */
function ExerciseRow({
  ex,
  onOpen,
}: {
  ex: FlatExercise
  onOpen: (idNum: number) => void
}) {
  const st = useProgress(ex.id)
  const cls = st?.flagged
    ? 'bg-yellow-100 border-yellow-400'
    : st?.solved
      ? 'bg-green-100 border-green-400'
      : 'bg-white border-gray-200'

  return (
    <div
      className={`my-2 cursor-pointer rounded-lg p-2 border hover:bg-gray-50 transition-colors ${cls}`}
      onClick={() => onOpen(ex.id)}
    >
      <div className="text-md text-gray-800">{ex.group ?? 'Aufgabe'}</div>
    </div>
  )
}

export function Training() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const topics = navigationData[exam]?.topics ?? []
  const history = useHistory()

  const allExercises = React.useMemo(
    () => flattenAllExercises(topics),
    [topics],
  )
  const allIds = React.useMemo(
    () => allExercises.map(e => e.id),
    [allExercises],
  )

  const openExercise = (idNum: number) => {
    setupExercise(idNum)
    history.push('/exercise/' + idNum)
  }

  return (
    <IonPage className="sm:max-w-[375px] mx-auto">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Training</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        style={{ '--background': '#d7e6f8ff' } as React.CSSProperties}
      >
        {/* Fortschrittspanel */}
        <div className="mx-3 mt-4">
          <div className="rounded-2xl bg-sky-50 shadow-md border border-gray-100 p-4 flex items-center gap-3">
            {/* WICHTIG: Lege die Datei unter public/assets/2307827.png ab */}
            <img
              src={trainingPng.src}
              alt="Training"
              className="w-12 h-12 rounded-xl object-contain"
            />
            <div className="flex-1">
              <div className="text-sm text-gray-500">
                Deine Trainingsaufgaben
              </div>
              <TrainingSummary ids={allIds} />
            </div>
          </div>
        </div>

        {/* Themen & direkte Aufgabenliste je Thema */}
        <div className="mx-3 mt-4 mb-6 bg-sky-50 rounded-md pt-2 px-2 pb-2">
          <h2 className="font-bold">Übungsaufgaben nach Thema</h2>

          <IonAccordionGroup expand="inset">
            {topics.map((topic, idx) => {
              const exercises = flattenExercises(topic)
              const topicName =
                (topic as any)?.title ??
                (topic as any)?.name ??
                `Thema ${idx + 1}`

              return (
                <IonAccordion key={idx} value={String(idx)}>
                  <IonItem slot="header">
                    <IonLabel>
                      {topicName}{' '}
                      <span className="text-sm text-gray-500">
                        ({exercises.length} Aufgaben)
                      </span>
                    </IonLabel>
                  </IonItem>

                  <div slot="content" className="p-2">
                    {exercises.length === 0 ? (
                      <div className="text-sm text-gray-500 p-2">
                        Für dieses Thema sind noch keine Aufgaben hinterlegt.
                      </div>
                    ) : (
                      exercises.map(ex => (
                        <ExerciseRow
                          key={`${ex.id}`}
                          ex={ex}
                          onOpen={openExercise}
                        />
                      ))
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
