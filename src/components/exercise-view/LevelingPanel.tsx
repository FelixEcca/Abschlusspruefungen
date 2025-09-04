import * as React from 'react'
import { useProfile } from '../../../store/progress-store'
import { computeLevelProgress } from './leveling'

export default function LevelPanel() {
  const profile = useProfile()
  // solvedCount: Anzahl gelöster Aufgaben (nur true-Flags zählen)
  const solvedCount = React.useMemo(() => {
    const entries = Object.values(profile.exercises ?? {})
    return entries.filter((e: any) => !!e?.solved).length
  }, [profile.exercises])

  const { level, pctWithin, remainingToNext, nextLevel } =
    computeLevelProgress(solvedCount)

  return (
    <div className="w-full  max-w-md mx-auto rounded-xl border bg-sky-100 shadow-xl p-6">
      <div className="text-m font-semibold mb-1">Level {level} ✨</div>
      <div className="h-3 w-full bg-gray-200 rounded">
        <div
          className="h-3 bg-blue-500 rounded"
          style={{ width: `${Math.round(pctWithin * 100)}%` }}
        />
      </div>
      <div className="text-xs text-gray-600 mt-2">
        {level < 6 ? (
          <>
            Löse <b>{remainingToNext}</b> Aufgaben, um in Level{' '}
            <b>{nextLevel}</b> zu kommen.
          </>
        ) : (
          <>Maximallevel erreicht 🎉</>
        )}
      </div>
    </div>
  )
}
