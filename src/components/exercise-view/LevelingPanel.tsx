import * as React from 'react'
import { computeLevelProgress } from './leveling'
import { exercisesData } from '@/content/exercises'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { useProgress } from '../../../store/progress-store'

// gleiche Filter-Logik wie im Rest der App
function passExamFilter(exam: number, idNum: number): boolean {
  if (exam == 1 && idNum > 99) return false
  if (exam == 2 && (idNum < 100 || idNum >= 199)) return false
  if (exam == 3 && (idNum < 200 || idNum >= 299)) return false
  if (exam == 4 && (idNum < 3000 || idNum >= 3999)) return false
  if (exam == 5 && (idNum < 400 || idNum >= 499)) return false
  return true
}

export default function LevelingPanel() {
  // aktuelles Exam
  const exam = PlayerProfileStore.useState(s => s.currentExam)

  // alle IDs für das aktuelle Exam (stabil via memo)
  const ids = React.useMemo(
    () =>
      Object.keys(exercisesData)
        .map(k => parseInt(k, 10))
        .filter(id => passExamFilter(exam, id)),
    [exam],
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const statuses = ids.map(id => useProgress(id))
  const solvedCount = statuses.filter(s => s?.solved).length

  const { level, pctWithin, remainingToNext, nextLevel } =
    computeLevelProgress(solvedCount)

  return (
    <div className="w-full rounded-xl border bg-white shadow-xl p-5">
      <div className="text-base font-semibold mb-2">Level {level} ✨</div>

      <div
        className="h-3 w-full rounded border border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round((pctWithin ?? 0) * 100)}
      >
        <div
          className="h-full rounded bg-gradient-to-r from-sky-500 to-blue-500 transition-[width] duration-700 ease-out"
          style={{ width: `${Math.round((pctWithin ?? 0) * 100)}%` }}
        />
      </div>

      <div className="text-xs text-gray-700 mt-2 tabular-nums">
        {level < 6 ? (
          <>
            Löse <b>{remainingToNext}</b>{' '}
            {remainingToNext === 1 ? 'Aufgabe' : 'Aufgaben'}, um in Level{' '}
            <b>{nextLevel}</b> zu kommen.
          </>
        ) : (
          <>Maximallevel erreicht 🎉</>
        )}
      </div>
    </div>
  )
}
