import * as React from 'react'
import { useProfile } from '../../../store/progress-store'
import { computeLevelProgress } from './leveling'

export default function LevelingPanel() {
  const profile = useProfile()
  // solvedCount: Anzahl gelöster Aufgaben (nur true-Flags zählen)
  const solvedCount = React.useMemo(() => {
    const entries = Object.values(profile.exercises ?? {})
    return entries.filter((e: any) => !!e?.solved).length
  }, [profile.exercises])

  const { level, pctWithin, remainingToNext, nextLevel } =
    computeLevelProgress(solvedCount)

  return (
    <div className="w-full rounded-xl border bg-sky-100/70 shadow-xl p-5">
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
