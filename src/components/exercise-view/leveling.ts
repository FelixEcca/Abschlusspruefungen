// leveling.ts
import { exercisesData } from '@/content/exercises'
import { PlayerProfileStore } from '../../../store/player-profile-store'


const CUM_TARGETS = [0, 0.02,0.04,0.06,0.08, 0.10, 0.10, 0.20, 0.20, 0.25] // entspricht Level 1..6

function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && idNum > 99) return false
  if (exam == 2 && (idNum < 100 || idNum >= 199)) return false
  if (exam == 3 && (idNum < 200 || idNum >= 299)) return false
  if (exam == 4 && (idNum < 3000 || idNum >= 3999)) return false
  if (exam == 5 && (idNum < 400 || idNum >= 499)) return false
  return true
}

export function getTotalExercisesForCurrentExam(): number {
  const exam = PlayerProfileStore.getRawState().currentExam
  const ids = Object.keys(exercisesData).map(k => parseInt(k, 10))
  return ids.filter(id => passExamFilter(exam, id)).length
}

/** Immer definierte, NaN-freie Rückgabe */
export function computeLevelProgress(solvedCount: number) {
  const total = getTotalExercisesForCurrentExam()+39
  // Falls es (noch) keine Aufgaben im Exam filter gibt, so tun, als gäbe es 1 – verhindert NaN.
  const safeTotal = Math.max(1, total)

  // absolute Schwellen in Aufgaben
  const thresholdsAbs = CUM_TARGETS.map(p => Math.round(p * safeTotal))

  // aktuelles Level bestimmen (1..6)
  let level = 1
  for (let L = 2; L <= 6; L++) {
    if (solvedCount >= thresholdsAbs[L - 1]) level = L
  }

  const currGoal = thresholdsAbs[level - 1]
  const nextLevel = Math.min(6, level + 1)
  const nextGoal = thresholdsAbs[nextLevel - 1] 

  const span = Math.max(1, nextGoal - currGoal) // niemals 0
  const within = Math.max(0, Math.min(1, (solvedCount - currGoal) / span))
  const remaining = level === 6 ? 0 : Math.max(0, nextGoal - solvedCount)

  return {
    level,                // 1..6
    pctWithin: within,    // 0..1
    remainingToNext: remaining,
    nextLevel,
  }
}
