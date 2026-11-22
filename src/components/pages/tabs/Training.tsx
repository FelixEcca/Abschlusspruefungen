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
import { exercisesData } from '@/content/exercises'
import { setupExercise } from '@/components/exercise-view/state/actions'
import { useProgress } from '../../../../store/progress-store'
import { useTutorial } from '@/components/onboarding/TutorialProvider'
import { SkillExercisePage } from '@/data/types'
type SkillExercise =
  | number
  | {
      id: number
      pages?: SkillExercisePage[]
    }

type FlatExercise = { id: number; group?: string; pages?: SkillExercisePage[] }

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
        out.push({ id: sx.id, group: g?.name, pages: sx.pages })
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
  onOpen: (idNum: number, pages?: SkillExercisePage[]) => void
}) {
  const st = useProgress(ex.id)
  const trainerLabel = ex.group?.match(/^(\d{2}) · (Basis|Aufbau|Transfer): /)
  const cls = st?.reviewLater
    ? 'bg-red-100 border-red-400'
    : st?.flagged
      ? 'bg-amber-100 border-amber-400'
      : st?.solved
        ? 'bg-green-100 border-green-400'
        : 'bg-white border-gray-200'

  return (
    <button
      type="button"
      data-tutorial={`training-exercise-${ex.id}`}
      className={`my-2 w-full text-left cursor-pointer rounded-lg p-2 border hover:bg-gray-50 transition-colors ${cls}`}
      onClick={() => onOpen(ex.id, ex.pages)}
    >
      {trainerLabel && (
        <div className="mb-1 text-xs font-medium text-sky-700">
          {trainerLabel[1]} · {trainerLabel[2]}
        </div>
      )}
      <div className="text-md text-gray-800">
        {exercisesData[ex.id]?.title ?? ex.group ?? 'Aufgabe'}
      </div>
    </button>
  )
}

export function Training() {
  const { notifyTutorial } = useTutorial()
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

  const openExercise = (idNum: number, pages?: SkillExercisePage[]) => {
    setupExercise(idNum, undefined, pages)
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
        <div data-tutorial="training-overview" className="mx-3 mt-4">
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

        {exam === 15 && (
          <aside
            aria-labelledby="training-stages-title"
            className="mx-3 mt-4 rounded-xl border border-gray-100 bg-sky-50 p-3 shadow-md text-sm text-gray-700"
          >
            <h2
              id="training-stages-title"
              className="mb-2 font-semibold text-gray-800"
            >
              Dein Weg zum Pflichtteil: drei Lernstufen
            </h2>
            <dl className="space-y-2">
              <div>
                <dt className="inline font-semibold">Basis: </dt>
                <dd className="inline">
                  Frische wichtige Grundlagen auf. Die Aufgaben bieten einen
                  einfachen Einstieg, auch wenn das Thema länger zurückliegt.
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold">Aufbau: </dt>
                <dd className="inline">
                  Vertiefe einzelne Kompetenzen und verbinde mehrere
                  Rechenschritte miteinander.
                </dd>
              </div>
              <div>
                <dt className="inline font-semibold">Prüfungstransfer: </dt>
                <dd className="inline">
                  Wende dein Wissen auf prüfungsnahe Aufgaben an und wähle
                  deinen Lösungsweg selbst. In der Liste sind sie mit „Transfer“
                  gekennzeichnet.
                </dd>
              </div>
            </dl>
          </aside>
        )}

        {/* Themen & direkte Aufgabenliste je Thema */}
        <div className="mx-3 mt-4 mb-6 bg-sky-50 rounded-md pt-2 px-2 pb-2">
          <h2 className="font-bold">Übungsaufgaben nach Thema</h2>

          <IonAccordionGroup
            expand="inset"
            onIonChange={event => {
              if (event.target !== event.currentTarget) return
              const value = event.detail.value
              const values = Array.isArray(value) ? value : [value]
              values.forEach(index => {
                if (index !== undefined && index !== '')
                  notifyTutorial(`topic-open:${Number(index)}`)
              })
            }}
          >
            {topics.map((topic, idx) => {
              const exercises = flattenExercises(topic)
              const topicName =
                (topic as any)?.title ??
                (topic as any)?.name ??
                `Thema ${idx + 1}`

              return (
                <IonAccordion key={idx} value={String(idx)}>
                  <IonItem
                    data-tutorial={`training-topic-${idx}`}
                    slot="header"
                  >
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
