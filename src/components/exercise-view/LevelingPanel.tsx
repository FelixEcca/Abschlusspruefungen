import * as React from 'react'
import { computeLevelProgress } from './leveling'
import { exercisesData } from '@/content/exercises'
import { isExerciseForNavigation } from '@/content/navigation-exercises'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { getStatus, subscribeProgress } from '../../../store/progress-store'

export default function LevelingPanel() {
  // aktuelles Exam
  const exam = PlayerProfileStore.useState(s => s.currentExam)

  // alle IDs für das aktuelle Exam (stabil via memo)
  const ids = React.useMemo(
    () =>
      Object.keys(exercisesData)
        .map(k => parseInt(k, 10))
        .filter(id => isExerciseForNavigation(exam, id)),
    [exam],
  )

  const solvedCount = React.useSyncExternalStore(
    subscribeProgress,
    () => ids.filter(id => getStatus(id)?.solved).length,
    () => 0,
  )

  if (ids.length === 0) {
    return (
      <div className="w-full rounded-xl border bg-white shadow-xl p-5">
        <div className="text-base font-semibold">Kurs wird vorbereitet</div>
        <div className="mt-1 text-sm text-gray-600">
          Für diesen Kurs sind noch keine Aufgaben hinterlegt.
        </div>
      </div>
    )
  }

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
