// src/components/exercise-view/ExerciseViewHeader.tsx
import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import {
  faArrowLeft,
  faMedal,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@/components/ui/FaIcon'
import { useHistory } from 'react-router'
import { reseed } from './state/actions'
import { useProgress } from '../../../store/progress-store'
import { ExerciseMarkMenu } from './ExerciseMarkMenu'

export function ExerciseViewHeader() {
  const id = ExerciseViewStore.useState(s => s.id)
  const skill = ExerciseViewStore.useState(s => s.skill)
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const pages = ExerciseViewStore.useState(s => s.pages)
  const exerciseIds = ExerciseViewStore.useState(s => s._exerciseIDs)
  const context = pages[navIndicatorPosition]?.context
  const contextPosition = context ? Number.parseInt(context, 10) - 1 : -1
  const contextExerciseId =
    contextPosition >= 0 ? exerciseIds[contextPosition] : undefined
  const activeExerciseId = contextExerciseId ?? id
  const content = exercisesData[activeExerciseId] ?? exercisesData[id]

  const history = useHistory()

  const handleBack = () => {
    if (window.history.length > 1) {
      history.goBack()
      return
    }

    window.location.href = 'https://abschlusspruefungen.vercel.app/app/start'
  }

  const progress = useProgress(activeExerciseId)
  const flagged = !!progress?.flagged
  const reviewLater = !!progress?.reviewLater
  const solved = !!progress?.solved

  if (!content) return null

  // Die Kartenfarbe macht den aktuellen Lernstatus auch bei geschlossenem Menü sichtbar.
  const headerBoxCls = reviewLater
    ? 'mt-3 mb-1 mx-3 border border-red-500 bg-red-50 shadow-md px-4 py-2 rounded-lg'
    : flagged
      ? 'mt-3 mb-1 mx-3 border border-amber-400 bg-amber-50 shadow-md px-4 py-2 rounded-lg'
      : solved
        ? 'mt-3 mb-1 mx-3 border border-green-500 bg-green-50 shadow-md px-4 py-2 rounded-lg'
        : 'mt-3 mb-1 mx-3 border shadow-md px-4 py-2 rounded-lg bg-white'

  return (
    <>
      <div className={headerBoxCls} onClick={handleBack}>
        <div className="flex items-center justify-between">
          <button className="inline-flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
            <FaIcon icon={faArrowLeft} />
            <span className="min-w-0 truncate text-left">
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

        </div>
      </div>

      <div className="text-left mt-2">
        <button
          className="group ml-3 rounded-xl bg-gray-200 px-3 py-1 transition-transform duration-150 hover:bg-gray-300 active:scale-95 motion-reduce:transform-none"
          onClick={() => {
            ExerciseViewStore.update(s => {
              if (content.originalData) s.data = content.originalData
              s.chatOverlay = null
            })
          }}
        >
          <FaIcon
            icon={faMedal}
            className="transition-transform duration-150 group-active:scale-125 motion-reduce:transform-none"
          />{' '}
          Original
        </button>

        <button
          className="group ml-3 rounded-xl bg-gray-200 px-3 py-1 transition-transform duration-150 hover:bg-gray-300 active:scale-95 motion-reduce:transform-none"
          onClick={() => {
            reseed()
            ExerciseViewStore.update(s => {
              s.chatOverlay = null
            })
          }}
        >
          <FaIcon
            icon={faWandMagicSparkles}
            className="transition-transform duration-150 group-active:rotate-12 group-active:scale-110 motion-reduce:transform-none"
          />{' '}
          Nochmal
        </button>

        <div className="ml-3 inline-block align-top">
          <ExerciseMarkMenu exerciseId={activeExerciseId} />
        </div>
      </div>
    </>
  )
}
