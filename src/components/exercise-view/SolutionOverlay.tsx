// src/components/exercise-view/SolutionOverlay.tsx
import { proseWrapper } from '@/helper/prose-wrapper'
import {
  faCaretDown,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { ExerciseViewStore } from './state/exercise-view-store'
import { exercisesData } from '@/content/exercises'
import { createGesture } from '@ionic/react'
import { useRef, useEffect } from 'react'
import { countLetter } from '@/helper/count-letter'
import { reseed } from './state/actions'
import { markSolved, useProgress } from '../../../store/progress-store'

export function SolutionOverlay() {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const id = ExerciseViewStore.useState(s => s.id)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const pages = ExerciseViewStore.useState(s => s.pages)

  const content = exercisesData[id]
  const solutionDiv = useRef<HTMLDivElement>(null)

  // Fortschritt lesen, um Button-Label zu entscheiden
  const solved = !!useProgress(id)?.solved

  // Swipe-Down-Geste, um Overlay zu schließen
  useEffect(() => {
    if (solutionDiv.current) {
      const target = solutionDiv.current
      const gesture = createGesture({
        el: target,
        direction: 'y',
        threshold: 50,
        canStart: () =>
          target.scrollTop < 5 &&
          ExerciseViewStore.getRawState().chatOverlay === 'solution',
        onEnd: e => {
          if (e.deltaY > 80 && Math.abs(e.deltaX) < 30) {
            ExerciseViewStore.update(s => {
              s.chatOverlay = null
            })
          }
        },
        gestureName: 'close-on-down-pull',
      })
      gesture.enable()
      return () => gesture.destroy()
    }
  }, [solutionDiv])

  if (chatOverlay !== 'solution') return null

  const data = pages[navIndicatorPosition].context
    ? ExerciseViewStore.getRawState().dataPerExercise[
        pages[navIndicatorPosition].context!
      ]
    : ExerciseViewStore.getRawState().data

  // Ermittelt die passende Lösung aus dem Exercise
  const solutionFn = (() => {
    const exercise =
      exercisesData[
        pages[navIndicatorPosition].context
          ? ExerciseViewStore.getRawState()._exerciseIDs[
              parseInt(pages[navIndicatorPosition].context!) - 1
            ]
          : id
      ]

    if (
      pages[navIndicatorPosition].index === 'single' &&
      'solution' in exercise
    ) {
      return exercise.solution!
    } else if ('tasks' in exercise) {
      return exercise.tasks.find(
        (el, i) => countLetter('a', i) === pages[navIndicatorPosition].index,
      )!.solution
    }
    // eslint-disable-next-line react/display-name
    return () => <></>
  })()

  return (
    <>
      <div className="flex justify-between mx-3 pt-3">
        <button
          className="px-2 py-0.5 bg-gray-100 rounded"
          onClick={() => {
            ExerciseViewStore.update(s => {
              s.chatOverlay = null
            })
          }}
        >
          <FaIcon icon={faCaretDown} /> Lösung
        </button>
      </div>

      <div
        className="mx-3 mt-3 mb-6 max-h-[50vh] overflow-y-auto"
        ref={solutionDiv}
      >
        <div className="max-w-[328px] mx-auto">
          {proseWrapper(solutionFn({ data }))}
        </div>

        <div className="text-center mt-4 mb-4 space-y-2">
          {/* Nochmal-Button */}
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-xl"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
              reseed()
            }}
          >
            <FaIcon icon={faWandMagicSparkles} /> Nochmal
          </button>

          {/* ✅ / ↩️ Toggle */}
          <div>
            <button
              className={`px-3 py-1 rounded-xl ${
                solved
                  ? 'bg-red-100 hover:bg-red-200'
                  : 'bg-green-100 hover:bg-green-200'
              }`}
              onClick={() => {
                const exId = ExerciseViewStore.getRawState().id
                markSolved(exId, !solved) // ⬅️ Toggle
                // Overlay kurz danach schließen (notify soll zuerst feuern)
                setTimeout(() => {
                  ExerciseViewStore.update(s => {
                    s.chatOverlay = null
                  })
                }, 0)
              }}
            >
              {solved ? '↩️ Als ungelöst markieren' : '✅ Aufgabe gelöst'}
            </button>
          </div>

          {/* Schließen-Link */}
          <button
            className="text-sm text-gray-700 underline"
            onClick={() => {
              ExerciseViewStore.update(s => {
                s.chatOverlay = null
              })
            }}
          >
            Lösung schließen
          </button>
        </div>
      </div>
    </>
  )
}
