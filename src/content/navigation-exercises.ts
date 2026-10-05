import { navigationData } from './navigations'

const exerciseIdsByNavigation = new Map<number, Set<number>>()

const examExerciseRanges: Record<number, { from: number; to: number }[]> = {
  1: [{ from: 3000, to: 3999 }],
  2: [{ from: 400, to: 401 }],
  6: [{ from: 9000, to: 9075 }],
}

export function isExamExerciseInNavigation(
  navigationId: number,
  exerciseId: number,
): boolean {
  if (!navigationData[navigationId]) return false
  return (examExerciseRanges[navigationId] ?? []).some(
    range => exerciseId >= range.from && exerciseId <= range.to,
  )
}

export function isExerciseForNavigation(
  navigationId: number,
  exerciseId: number,
): boolean {
  return (
    isExerciseInNavigation(navigationId, exerciseId) ||
    isExamExerciseInNavigation(navigationId, exerciseId)
  )
}

export function isExerciseInNavigation(
  navigationId: number,
  exerciseId: number,
): boolean {
  let exerciseIds = exerciseIdsByNavigation.get(navigationId)

  if (!exerciseIds) {
    const navigation = navigationData[navigationId]
    exerciseIds = new Set(
      navigation?.topics.flatMap(topic =>
        topic.skillGroups.flatMap(group =>
          group.skillExercises.map(exercise => exercise.id),
        ),
      ) ?? [],
    )
    exerciseIdsByNavigation.set(navigationId, exerciseIds)
  }

  return exerciseIds.has(exerciseId)
}
