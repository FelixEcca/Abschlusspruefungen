export const MAX_LEVEL = 6
const CUM_TARGETS = [0, 0.02, 0.04, 0.06, 0.08, 0.1]
const QUICK_START_COURSES = new Set([1, 5, 6, 7, 8])
const QUICK_START_TARGETS = [0, 1, 2, 3, 5, 8]

export function getLevelThresholds(
  totalCount: number,
  courseId?: number,
): number[] {
  const total = Math.max(0, Math.floor(totalCount || 0))
  const thresholds = [0]
  for (let index = 1; index < MAX_LEVEL; index++) {
    // Small courses still require a new solved exercise for each level.
    thresholds.push(
      Math.max(
        thresholds[index - 1] + 1,
        courseId !== undefined && QUICK_START_COURSES.has(courseId)
          ? Math.min(QUICK_START_TARGETS[index], Math.max(MAX_LEVEL - 1, total))
          : Math.round(CUM_TARGETS[index] * total),
      ),
    )
  }
  return thresholds
}

export function computeLevelProgress(
  solvedCount: number,
  totalCount: number,
  courseId?: number,
) {
  const thresholds = getLevelThresholds(totalCount, courseId)
  const solved = Math.max(0, Math.floor(solvedCount || 0))
  let level = 1
  for (let next = 2; next <= MAX_LEVEL; next++) {
    if (solved >= thresholds[next - 1]) level = next
  }

  const currentGoal = thresholds[level - 1]
  const nextLevel = Math.min(MAX_LEVEL, level + 1)
  const nextGoal = thresholds[nextLevel - 1]
  return {
    level,
    pctWithin:
      level === MAX_LEVEL
        ? 1
        : Math.max(
            0,
            Math.min(1, (solved - currentGoal) / (nextGoal - currentGoal)),
          ),
    remainingToNext: level === MAX_LEVEL ? 0 : Math.max(0, nextGoal - solved),
    nextLevel,
  }
}
