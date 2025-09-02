// src/components/exercise-view/ExerciseViewHeader.tsx
import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import {
  faArrowLeft,
  faMedal,
  faWandMagicSparkles,
  faBolt,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@/components/ui/FaIcon'
import { useHistory } from 'react-router'
import { navigationData } from '@/content/navigations'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { reseed } from './state/actions'
import { useProgress, toggleFlag } from '../../../store/progress-store'

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

  // reaktiver Fortschritt
  const progress = useProgress(id)
  const flagged = !!progress?.flagged
  const solved = !!progress?.solved

  // ⚠️ Priorität: flagged > solved > default
  const headerBoxCls = flagged
    ? 'mt-3 mb-1 mx-3 border border-yellow-500 bg-yellow-50 shadow-md px-4 py-2 rounded-lg'
    : solved
      ? 'mt-3 mb-1 mx-3 border border-green-500 bg-green-50 shadow-md px-4 py-2 rounded-lg'
      : 'mt-3 mb-1 mx-3 border shadow-md px-4 py-2 rounded-lg bg-white'

  return (
    <>
      <div
        className={headerBoxCls}
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
        <div className="flex items-center justify-between">
          <button className="whitespace-nowrap text-ellipsis overflow-hidden max-w-full inline-flex items-center gap-2">
            <FaIcon icon={faArrowLeft} />
            <span>
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
            </span>
          </button>

          {/* Badge rechts */}
          {flagged ? (
            <span className="ml-3 inline-flex items-center gap-1 text-yellow-700 text-sm font-medium">
              <FaIcon icon={faBolt} /> Markiert
            </span>
          ) : solved ? (
            <span className="ml-3 inline-flex items-center gap-1 text-green-700 text-sm font-medium">
              <FaIcon icon={faCheckCircle} /> Gelöst
            </span>
          ) : null}
        </div>
      </div>

      <div className="text-left mt-2">
        <button
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-xl ml-3"
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.chatOverlay = 'solution'
            })
            ExerciseViewStore.update(s => {
              if (content.originalData) s.data = content.originalData
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
          className={`px-3 py-1 rounded-xl ml-3 ${
            flagged
              ? 'bg-yellow-200 hover:bg-yellow-300'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => {
            toggleFlag(id) // Header reagiert sofort über useProgress
          }}
          title="Als herausfordernd markieren"
        >
          <FaIcon icon={faBolt} /> {flagged ? 'Markiert' : 'Blitz'}
        </button>
      </div>
    </>
  )
}
