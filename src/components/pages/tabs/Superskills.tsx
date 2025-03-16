import { setupExercise } from '@/components/exercise-view/state/actions'
import { exercisesData } from '@/content/exercises'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react'
import { PlayerProfileStore } from '../../../../store/player-profile-store'
import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { useHistory } from 'react-router'
import clsx from 'clsx'

import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@/components/ui/FaIcon'

export function Superskills() {
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const exercises = Object.entries(exercisesData)
  const history = useHistory()
  const completedExercises = ExerciseViewStore.useState(
    s => (s.completedExercises ?? {}) as Record<string, boolean>,
  )
  const highlightedExercises = ExerciseViewStore.useState(
    s => (s.highlightedExercises ?? {}) as Record<string, boolean>,
  )
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

            {exercises.map(([id, content]) => {
              if (exam == 1 && parseInt(id) > 99) return null
              if (exam == 2 && (parseInt(id) < 100 || parseInt(id) >= 199))
                return null
              if (exam == 3 && (parseInt(id) < 200 || parseInt(id) >= 299))
                return null
              if (exam == 4 && (parseInt(id) < 300 || parseInt(id) >= 399))
                return null

              return (
                <div
                  key={id}
                  className={clsx(
                    'my-3 cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition-colors duration-200',
                    completedExercises[id] && 'bg-green-500 text-white',
                    highlightedExercises[id] && 'bg-yellow-500 text-white',
                  )}
                  onClick={() => {
                    setupExercise(parseInt(id))
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
                    {highlightedExercises[id] && (
                      <FaIcon
                        icon={faBoltLightning}
                        className="text-white ml-2"
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
