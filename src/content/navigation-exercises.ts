import { navigationData } from './navigations'

const exerciseIdsByNavigation = new Map<number, Set<number>>()

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
