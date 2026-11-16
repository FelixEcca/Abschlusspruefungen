import type { Navigation } from '@/data/types'
import type { ExerciseProgress } from '../../../store/progress-store'

type CatalogEntry = { title: string; duration?: number; tasks?: unknown[] }
export type CoachReason =
  | 'retry'
  | 'later'
  | 'continue'
  | 'start'
  | 'repeat'
  | 'exam'
export type CoachExercise = {
  id: number
  title: string
  topic: string
  topicIndex: number
  duration: number
  subtasks: number
}
export type CoachRecommendation = CoachExercise & {
  reason: CoachReason
  alternatives: number
}

export function getCoachExercises(
  navigation: Pick<Navigation, 'topics'> | undefined,
  catalog: Record<number, CatalogEntry>,
  examIds: number[],
): CoachExercise[] {
  const entries: CoachExercise[] = []
  const seen = new Set<number>()
  const add = (id: number, topic: string, topicIndex: number) => {
    const exercise = catalog[id]
    if (!exercise || seen.has(id)) return
    seen.add(id)
    entries.push({
      id,
      topic,
      topicIndex,
      title: exercise.title,
      duration:
        exercise.duration && exercise.duration > 0
          ? exercise.duration
          : Infinity,
      subtasks: exercise.tasks?.length ?? 1,
    })
  }
  navigation?.topics.forEach((topic, index) => {
    topic.skillGroups.forEach(group => {
      group.skillExercises.forEach(exercise =>
        add(exercise.id, topic.title, index),
      )
    })
  })
  examIds.forEach(id => add(id, 'Prüfungsaufgaben', -1))
  return entries
}

export function recommendCoachExercise(
  entries: CoachExercise[],
  progress: Record<
    number,
    Pick<ExerciseProgress, 'solved' | 'flagged' | 'reviewLater' | 'solvedAt'>
  >,
  topicIndex: number | null = null,
  variation = 0,
): CoachRecommendation | null {
  const pool =
    topicIndex === null
      ? entries
      : entries.filter(entry => entry.topicIndex === topicIndex)
  if (!pool.length) return null
  let reason: CoachReason = 'start'
  let candidates = pool.filter(
    entry => !progress[entry.id]?.solved && progress[entry.id]?.reviewLater,
  )
  if (candidates.length) reason = 'retry'
  else {
    candidates = pool.filter(
      entry => !progress[entry.id]?.solved && progress[entry.id]?.flagged,
    )
    if (candidates.length) reason = 'later'
    else {
      candidates = pool.filter(entry => !progress[entry.id]?.solved)
      if (!candidates.length) {
        candidates = pool
        reason = 'repeat'
      } else {
        const started = pool
          .filter(
            entry =>
              progress[entry.id]?.solved &&
              candidates.some(
                candidate => candidate.topicIndex === entry.topicIndex,
              ),
          )
          .sort(
            (a, b) =>
              (progress[b.id]?.solvedAt ?? 0) - (progress[a.id]?.solvedAt ?? 0),
          )
        if (started.length) {
          candidates = candidates.filter(
            entry => entry.topicIndex === started[0].topicIndex,
          )
          reason = 'continue'
        } else {
          // A new learner gets a short training exercise, not a full exam by default.
          const training = candidates.filter(entry => entry.topicIndex !== -1)
          if (training.length) candidates = training
          else reason = 'exam'
        }
      }
    }
  }
  const preferredTopic = candidates[0].topicIndex
  candidates = candidates
    .filter(entry => entry.topicIndex === preferredTopic)
    .sort((a, b) => a.subtasks - b.subtasks || a.duration - b.duration)
  const index = Math.max(0, Math.floor(variation || 0)) % candidates.length
  return { ...candidates[index], reason, alternatives: candidates.length }
}
