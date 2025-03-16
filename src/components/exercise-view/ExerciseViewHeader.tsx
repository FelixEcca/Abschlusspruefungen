import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import {
  faArrowLeft,
  faBoltLightning,
  faCheck,
  faMedal,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { markCurrentExerciseAsComplete, reseed } from './state/actions'
import { ExerciseViewLayout } from './ExerciseViewLayout'

export function ExerciseViewHeader() {
  const id = ExerciseViewStore.useState(s => s.id)
  const skill = ExerciseViewStore.useState(s => s.skill)
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const exam = PlayerProfileStore.useState(s => s.currentExam)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const pages = ExerciseViewStore.useState(s => s.pages)
  const content =
    pages && pages[navIndicatorPosition].context
      ? exercisesData[
          ExerciseViewStore.getRawState()._exerciseIDs[
            parseInt(pages[navIndicatorPosition].context!) - 1
          ]
        ]
      : exercisesData[id]
  const history = useHistory()

  // Abfrage der Zustände für completed und highlighted
  const isCompleted = ExerciseViewStore.useState(s => s.completedExercises[id])
  const isHighlighted = ExerciseViewStore.useState(
    s => s.highlightedExercises[id],
  )

  // Funktion zum Umschalten der Zustände für "Erledigt" und "Blitz"
  const toggleCompletedAndHighlighted = () => {
    ExerciseViewStore.update(s => {
      s.completedExercises[id] = !isCompleted
      // Wenn "Erledigt" aktiviert wird, Blitz deaktivieren
      if (!isCompleted) {
        s.highlightedExercises[id] = false
      }
    })
  }

  const toggleHighlightedAndCompleted = () => {
    ExerciseViewStore.update(s => {
      s.highlightedExercises[id] = !isHighlighted
      // Wenn Blitz aktiviert wird, "Erledigt" deaktivieren
      if (!isHighlighted) {
        s.completedExercises[id] = false
      }
    })
  }

  return (
    <>
      <div
        className={`mt-3 mb-1 mx-3 border shadow-md px-4 py-2 rounded-lg transition-colors duration-200 ${
          isCompleted ? 'bg-green-500 text-white' : 'bg-white'
        }`}
        onClick={() => {
          if (toHome) {
            history.push('/app/participate')
            return
          }
          const i1 = navigationData[1].topics.findIndex(t =>
            t.skillGroups.some(g => g.name == skill),
          )
          const i2 = navigationData[2].topics.findIndex(t =>
            t.skillGroups.some(g => g.name == skill),
          )
          const i3 = navigationData[3].topics.findIndex(t =>
            t.skillGroups.some(g => g.name == skill),
          )
          history.push(
            skill && (i1 >= 0 || i2 >= 0 || i3 >= 0)
              ? '/topic/' +
                  (exam == 1
                    ? i1 + 1
                    : exam == 2
                      ? i2 + 101
                      : i3 + 201
                  ).toString()
              : '/app/superskills',
          )
        }}
      >
        <button className="whitespace-nowrap text-ellipsis overflow-hidden max-w-full inline-block">
          <FaIcon icon={faArrowLeft} />{' '}
          {skill ? (
            <>
              <b>{skill}</b>{' '}
              {toHome ? null : (
                <>
                  {content.source}: {content.title}
                </>
              )}
            </>
          ) : (
            <>
              {content.source}: {content.title}
            </>
          )}
        </button>
      </div>
      <div className="text-left mt-2">
        <button
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-xl ml-3"
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.chatOverlay = 'solution'
            })
            ExerciseViewStore.update(s => {
              if (content.originalData) {
                s.data = content.originalData
              }

              s.chatOverlay = null
            })
          }}
        >
          <FaIcon icon={faMedal} /> Original
        </button>

        <button
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-xl ml-3"
          onClick={() => {
            reseed()
            ExerciseViewStore.update(s => {
              s.chatOverlay = 'solution'
            })
            ExerciseViewStore.update(s => {
              s.chatOverlay = null
            })
          }}
        >
          <FaIcon icon={faWandMagicSparkles} /> Nochmal
        </button>
        <button
          className={`px-3 py-1 rounded-xl ml-3 transition-colors duration-200 ${
            isCompleted
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={toggleCompletedAndHighlighted}
        >
          <FaIcon icon={faCheck} /> Erledigt
        </button>
        <button
          className={`px-3 py-1 rounded-xl ml-3 transition-colors duration-200 ${
            isHighlighted
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={toggleHighlightedAndCompleted}
        >
          <FaIcon icon={faBoltLightning} />
        </button>
      </div>
    </>
  )
}
