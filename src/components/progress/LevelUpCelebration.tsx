import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { exercisesData } from '@/content/exercises'
import { isExerciseForNavigation } from '@/content/navigation-exercises'
import { computeLevelProgress } from '@/components/exercise-view/leveling'
import { ExerciseViewStore } from '@/components/exercise-view/state/exercise-view-store'
import { useTutorial } from '@/components/onboarding/TutorialProvider'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import {
  dismissLevelUp,
  getPendingLevelUp,
  getStatus,
  queueLevelUp,
  rememberLevelBaseline,
  subscribeExerciseSolved,
  subscribeProgress,
} from '../../../store/progress-store'
import { LevelUpPopover } from './LevelUpPopover'

export function LevelUpCelebration() {
  const history = useHistory()
  const { pathname } = useLocation()
  const { active: tutorialActive } = useTutorial()
  const courseId = PlayerProfileStore.useState(s => s.currentExam)
  const name = PlayerProfileStore.useState(s => s.name)
  const ids = useMemo(
    () =>
      Object.keys(exercisesData)
        .map(Number)
        .filter(id => isExerciseForNavigation(courseId, id)),
    [courseId],
  )
  const pending = useSyncExternalStore(
    subscribeProgress,
    getPendingLevelUp,
    () => null,
  )

  useEffect(() => {
    if (!ids.length) return
    const solvedCount = () => ids.filter(id => getStatus(id)?.solved).length
    const rememberBaseline = () =>
      rememberLevelBaseline(
        courseId,
        computeLevelProgress(solvedCount(), ids.length, courseId).level,
      )
    // Existing progress, imports and course changes are not new achievements.
    rememberBaseline()
    const unsubscribeSolved = subscribeExerciseSolved(id => {
      if (
        !ids.includes(id) ||
        PlayerProfileStore.getRawState().currentExam !== courseId
      )
        return
      const count = solvedCount()
      const previous = computeLevelProgress(
        count - 1,
        ids.length,
        courseId,
      ).level
      const next = computeLevelProgress(count, ids.length, courseId).level
      if (next > previous) {
        queueLevelUp(
          { courseId, level: next, solvedCount: count, totalCount: ids.length },
          previous,
        )
      }
    })
    const unsubscribeProgress = subscribeProgress(rememberBaseline)
    return () => {
      unsubscribeSolved()
      unsubscribeProgress()
    }
  }, [courseId, ids])

  const validPending =
    !pending ||
    computeLevelProgress(
      pending.solvedCount,
      pending.totalCount,
      pending.courseId,
    ).level === pending.level
  useEffect(() => {
    if (!validPending) dismissLevelUp()
  }, [validPending])
  const ready =
    !!pending &&
    validPending &&
    pending.courseId === courseId &&
    !tutorialActive
  useEffect(() => {
    if (!ready) return
    ExerciseViewStore.update(s => {
      s.chatOverlay = null
    })
    if (pathname !== '/app/start') history.replace('/app/start')
  }, [ready, pathname, history])

  if (!ready || pathname !== '/app/start' || !pending) return null
  return (
    <LevelUpPopover
      key={`${pending.courseId}-${pending.level}`}
      achievement={pending}
      name={name}
      onClose={() => {
        dismissLevelUp()
        requestAnimationFrame(() => {
          document
            .querySelector<HTMLElement>(
              '.ion-page:not(.ion-page-hidden) [data-tutorial="dashboard-progress"] [role="progressbar"]',
            )
            ?.focus()
        })
      }}
    />
  )
}
