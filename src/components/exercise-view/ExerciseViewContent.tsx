import { exercisesData } from '@/content/exercises'
import { ExerciseViewStore } from './state/exercise-view-store'
import clsx from 'clsx'
import {
  faCalculator,
  faClock,
  faSlash,
} from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '../ui/FaIcon'
import { proseWrapper } from '@/helper/prose-wrapper'
import { countLetter } from '@/helper/count-letter'
import { useEffect, useRef } from 'react'
import { ExerciseWithSubtasks, SingleExercise } from '@/data/types'

export function ExerciseViewContent() {
  const toHome = ExerciseViewStore.useState(s => s.toHome)
  const chatOverlay = ExerciseViewStore.useState(s => s.chatOverlay)
  const pages = ExerciseViewStore.useState(s => s.pages)
  const navIndicatorExternalUpdate = ExerciseViewStore.useState(
    s => s.navIndicatorExternalUpdate,
  )
  const navIndicatorPosition = ExerciseViewStore.useState(
    s => s.navIndicatorPosition,
  )
  const needReset = ExerciseViewStore.useState(s => s.needReset)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      navIndicatorExternalUpdate >= 0 &&
      navIndicatorPosition != navIndicatorExternalUpdate &&
      ref.current
    ) {
      document
        .getElementById(`exercise-${navIndicatorExternalUpdate}`)
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      ExerciseViewStore.update(s => {
        s.navIndicatorExternalUpdate = -1
        s.navIndicatorPosition = navIndicatorExternalUpdate
      })
    }
  }, [navIndicatorExternalUpdate, navIndicatorPosition])

  useEffect(() => {
    if (needReset && ref.current) {
      ref.current.scrollTop = 0
      setTimeout(() => {
        if (ref.current) ref.current.scrollTop = 0
      }, 20)
      setTimeout(() => {
        if (ref.current) ref.current.scrollTop = 0
      }, 100)
      ExerciseViewStore.update(s => {
        s.needReset = false
      })
    }
  }, [needReset])

  const useCalculator =
    exercisesData[
      pages[0].context
        ? ExerciseViewStore.getRawState()._exerciseIDs[
            parseInt(pages[0].context) - 1
          ]
        : ExerciseViewStore.getRawState().id
    ].useCalculator

  // 👉 zentrale Farbe hier einstellen
  const EX_BG = '#f5f7fb' // leichtes graublau

  return (
    <div
      ref={ref}
      // früher: bg-gray-100 – jetzt direkt Farbe (überschreibt zuverlässig)
      className={clsx('w-full h-full overflow-y-auto')}
      style={{ background: EX_BG }}
      onClick={() => {
        if (chatOverlay) {
          ExerciseViewStore.update(s => {
            s.chatOverlay = null
          })
        }
      }}
    >
      <div
        className="bg-blue-100"
        id="exercise-view-content"
        onScroll={e => {
          const [distance, offset] = calculateSnapPoints()
          const scrollLeft = (e.target as HTMLDivElement).scrollLeft
          const base = scrollLeft - offset
          const index = Math.abs(Math.round(base / distance))
          ExerciseViewStore.update(s => {
            if (index != s.navIndicatorPosition && s.chatOverlay) {
              s.chatOverlay = null
            }
            s.navIndicatorPosition = index
            if (s.navIndicatorExternalUpdate == index) {
              s.navIndicatorExternalUpdate = -1
            }
          })
        }}
      >
        <div className="h-2 "></div>

        {pages.map((page, i) => {
          const id = page.context
            ? ExerciseViewStore.getRawState()._exerciseIDs[
                parseInt(page.context) - 1
              ]
            : ExerciseViewStore.getRawState().id

          const exercise = exercisesData[id]
          const data = page.context
            ? ExerciseViewStore.getRawState().dataPerExercise[page.context]
            : ExerciseViewStore.getRawState().data

          if (page.index == 'single') {
            const singleExercise = exercise as SingleExercise<any>
            return (
              <>
                {renderContentCard(
                  i,
                  singleExercise.duration ?? '?',
                  singleExercise.points ?? '?',
                  <>
                    {renderContentElement(
                      singleExercise.task({
                        data: singleExercise.exampleData
                          ? singleExercise.exampleData
                          : data,
                      }),
                    )}
                  </>,
                  page.displayIndex,
                )}
                {singleExercise.example &&
                  renderContentCard(
                    i,
                    singleExercise.duration ?? '?',
                    singleExercise.points ?? '?',
                    <>{renderContentElement(singleExercise.example())}</>,
                    page.displayIndex,
                    `example-${i}`,
                  )}
              </>
            )
          } else {
            const subtasks = exercise as ExerciseWithSubtasks<any>
            const task = subtasks.tasks.find(
              (t, j) => countLetter('a', j) == page.index,
            )!

            const intros = (page.intro ?? []).slice()
            if (page.index == 'a' && !intros.includes('global')) {
              intros.push('global')
            }
            if (!page.disableDefaultLocalIntro) {
              intros.push('local')
            }
            const introComps = intros.map((intro, i) =>
              intro == 'global'
                ? subtasks.intro({ data })
                : intro == 'local' && task.intro
                  ? task.intro({ data })
                  : intro == 'skill' && task.skillIntro
                    ? task.skillIntro({ data })
                    : null,
            )

            return (
              <>
                {introComps.length > 0 && introComps.some(e => e) && (
                  <>
                    {page.context && page.displayIndex?.includes('a') && (
                      <div className="ml-3 font-bold font-xl w-24 h-8 overflow-hidden -mb-3">
                        <div className="text-center inset-0 h-24 w-24 rounded-full bg-gray-50">
                          <span className="mt-2 inline-block">
                            {page.context}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Intro in Card-Optik: weiß + Schatten */}
                    <div className="px-5 bg-white rounded-xl shadow-md mb-6">
                      {renderContentElement(<>{introComps}</>, i.toString())}
                    </div>
                  </>
                )}
                {renderContentCard(
                  i,
                  task.duration ?? '?',
                  task.points ?? '?',
                  <>
                    {renderContentElement(
                      <div>
                        {task.task({
                          data: exercise.exampleData ? exercise.exampleData : data,
                        })}
                      </div>,
                    )}
                  </>,
                  page.displayIndex,
                )}
                {task.example &&
                  renderContentCard(
                    i,
                    task.duration ?? '?',
                    task.points ?? '?',
                    <>{renderContentElement(<div>{task.example()}</div>)}</>,
                    page.displayIndex,
                    `solution-${i}`,
                  )}
              </>
            )
          }
        })}

        <div className="h-12"></div>
      </div>
    </div>
  )

  function renderContentCard(
    i: number,
    duration: number | string,
    points: number | string,
    contentEl: JSX.Element,
    numbering?: string,
    alternativeKey?: string,
  ) {
    const showNumbering = toHome && numbering
    return (
      <div
      
        className={clsx(
          'w-[calc(100%-24px)] flex-shrink-0 mx-auto relative ',
          showNumbering && 'mt-20',
        )}
        style={{ scrollbarWidth: 'thin' }}
        key={alternativeKey ?? i}
        onClick={() => {
          ExerciseViewStore.update(s => {
            s.navIndicatorPosition = i
            s.navIndicatorExternalUpdate = i
          })
        }}
        id={`exercise-${i}`}
      >
        {toHome && numbering && (
          <div className="absolute -top-8 left-7 font-bold font-xl w-24 h-8 overflow-hidden ">
            <div className="text-center inset-0 h-24 w-24 rounded-full ">
              <span className="mt-2 inline-block">{numbering}</span>
            </div>
          </div>
        )}
        <div
        
          className={clsx(
            // 👉 Card klar weiß + Schatten, hebt sich vom EX_BG ab
            'flex flex-col justify-start pt-2 rounded-xl shadow-lg mb-8 mt-2 px-[1px] items-center border-2 bg-white',
            navIndicatorPosition == i
              ? 'border-blue-500 cursor-pointer'
              : 'border-transparent',
          )}
        >
          <div
          
            className={clsx(
              'flex justify-between p-[3px] w-full top-0',
              toHome && 'hidden',
            )}
          >
            <div>
              <div className="px-1 py-0.5  inline-block rounded-md mr-2">
                Aufgabe
                <>
                  {' '}
                  {!pages[i].context && pages[i].index == 'single' ? null : (
                    <>
                      {pages[i].context}
                      {(pages[i].index == 'single' ? '' : pages[i].index) + ')'}
                    </>
                  )}
                </>
              </div>
            </div>
            <div>
              <button className="cursor-default px-2 py-0.5 rounded-md bg-gray-100 inline-block relative h-[25px] w-8 mt-0.5 mr-1 align-top">
                <div className="inset-0 absolute">
                  <FaIcon icon={faCalculator} />
                </div>
                {!useCalculator && (
                  <div className="absolute inset-0 -scale-x-100">
                    <FaIcon icon={faSlash} />
                  </div>
                )}
              </button>
            </div>
          </div>

          {contentEl}
        </div>
      </div>
    )
  }

  function renderContentElement(c: JSX.Element | null, key?: string) {
    if (!c) return null
    return (
      <div className="p-[3px] mt-3 mb-2 ml-2 min-w-[300px] sm:w-[334px]" key={key}>
        {proseWrapper(c)}
      </div>
    )
  }
}

function calculateSnapPoints() {
  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0,
  )
  if (vw > 640) {
    vw = 375
  }
  const distance = vw - 24 + 8
  const offset = (vw - 24) / 2 + 16 + vw * 0.2 - vw / 2
  return [distance, offset]
}
