import { exercisesData } from '@/content/exercises'
import { PlayerProfileStore } from '../../../store/player-profile-store'

/** Prozentziele je Level: 0→1 (0%), 1→2 (+5%), 2→3 (+10%), 3→4 (+15%), 4→5 (+20%), 5→6 (+25%) */
const STEPS = [0, 0.05, 0.10, 0.15, 0.20, 0.25] // relative Anteile je Stufe (inkrementell)

/** Filter wie in Participate/Superskills – nur Übungen des aktuellen Exams zählen */
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
  return Object.keys(exercisesData)
    .map(id => parseInt(id, 10))
    .filter(id => passExamFilter(exam, id)).length
}

/**
 * Ermittelt Level (1..6), Prozentbalken (0..1) innerhalb der aktuellen Stufe
 * und wie viele Aufgaben bis zur nächsten Stufe fehlen.
 */
export function computeLevelProgress(solvedCount: number) {
  const total = Math.max(1, getTotalExercisesForCurrentExam())

  // kumulative Ziele in Aufgaben-Anzahl
  const thresholdsAbs: number[] = [0]
  let cum = 0
  for (const step of STEPS) {
    cum += Math.round(step * total)
    thresholdsAbs.push(cum) // Index: Level -> benötigte Gesamtzahl bis Level erreicht
  }
  // thresholdsAbs: [0, 0%, 5%, 15%, 30%, 50%, 75%] in Aufgaben

  // bestimme aktuelles Level
  let level = 1
  for (let L = 2; L <= 6; L++) {
    if (solvedCount >= thresholdsAbs[L]) level = L
  }

  const currGoal = thresholdsAbs[level]
  const nextLevel = Math.min(6, level + 1)
  const nextGoal = thresholdsAbs[nextLevel]

  // Fortschritt innerhalb der aktuellen Stufe (gegen das nächste Ziel)
  const span = Math.max(1, nextGoal - currGoal)
  const within = Math.max(0, Math.min(1, (solvedCount - currGoal) / span))

  const remaining = Math.max(0, nextGoal - solvedCount)

  return {
    level,                              // 1..6
    pctWithin: within,                  // 0..1 (für die Progress-Bar)
    remainingToNext: level === 6 ? 0 : remaining,
    nextLevel,                          // (level==6) -> 6
    solvedCount,
    total,
  }
}
