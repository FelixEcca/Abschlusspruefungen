// src/components/exercise-view/SolutionOverlay.tsx
import { proseWrapper } from '@/helper/prose-wrapper'
import { ExerciseViewStore } from './state/exercise-view-store'
import { exercisesData } from '@/content/exercises'
import { createGesture } from '@ionic/react'
import { useRef, useEffect, type CSSProperties } from 'react'
import { countLetter } from '@/helper/count-letter'
import { AiWorksheetGenerator } from '@/helper/ai-worksheet-generator'

export function SolutionOverlay({ mobileHeightVh }: { mobileHeightVh: number }) {
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const id = ExerciseViewStore.useState(s => s.id)
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const pages = ExerciseViewStore.useState(s => s.pages)

  const solutionDiv = useRef<HTMLDivElement>(null)

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

  const rawState = ExerciseViewStore.getRawState()
  const currentPage = pages[navIndicatorPosition]

  const currentExerciseId = currentPage.context
    ? rawState._exerciseIDs[parseInt(currentPage.context) - 1]
    : id

  const data = currentPage.context
    ? rawState.dataPerExercise[currentPage.context]
    : rawState.data

  const exercise = exercisesData[currentExerciseId]

  const solutionFn = (() => {
    if (currentPage.index === 'single' && 'solution' in exercise) {
      return exercise.solution!
    }

    if ('tasks' in exercise) {
      return exercise.tasks.find(
        (el, i) => countLetter('a', i) === currentPage.index,
      )!.solution
    }

    // eslint-disable-next-line react/display-name
    return () => <></>
  })()

  return (
    <div
      className="flex h-[var(--mobile-overlay-height)] max-h-[calc(100dvh-7rem)] flex-col overflow-hidden min-[1250px]:h-auto min-[1250px]:max-h-none"
      style={
        {
          '--mobile-overlay-height': `${mobileHeightVh}dvh`,
        } as CSSProperties
      }
    >
      <div
        className="mx-3 mb-6 mt-3 min-h-0 flex-1 overflow-y-auto min-[1250px]:max-h-[50vh]"
        ref={solutionDiv}
      >
        <div className="max-w-[328px] mx-auto">
          {proseWrapper(solutionFn({ data }))}
        </div>

        <div className="mb-4 mt-4 text-right">
          <details className="mt-6">
            <summary
              className="inline-flex h-7 w-7 cursor-pointer list-none items-center justify-center rounded-full border border-gray-200 text-[10px] text-gray-300 opacity-20 transition-opacity hover:opacity-70"
              title="Interne Werkzeuge"
              aria-label="Interne Werkzeuge öffnen"
            >
              ⚙
            </summary>
            <div className="mt-2">
              <AiWorksheetGenerator
                exerciseId={currentExerciseId}
                data={data}
                pageIndex={currentPage.index}
              />
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
