import * as React from 'react'

const KEY = 'ap-progress-v1'

export type ExerciseId = number

export interface ExerciseProgress {
  attempts: number
  correct: number
  solved: boolean
  solvedAt?: number
  flagged?: boolean
  streak?: number
  mastery?: number
  timeMs?: number           // ⬅️ neu: kumulierte Lernzeit für diese Aufgabe
}

export interface Profile {
  version: 1
  id: string
  createdAt: number
  exercises: Record<ExerciseId, ExerciseProgress>
  totalTimeMs?: number      // ⬅️ neu: gesamte Lernzeit
  // Timer-Session (nicht exportieren, nur intern)
  _activeExerciseId?: number
  _sessionStartTs?: number
}

function emptyProfile(): Profile {
  return {
    version: 1,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    exercises: {},
    totalTimeMs: 0,
  }
}

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyProfile()
    const p = JSON.parse(raw) as Profile
    if (!p || p.version !== 1 || !p.exercises) return emptyProfile()
    if (typeof p.totalTimeMs !== 'number') p.totalTimeMs = 0
    return p
  } catch {
    return emptyProfile()
  }
}

export function saveProfile(p: Profile) {
  localStorage.setItem(KEY, JSON.stringify(p))
}

let cache = loadProfile()

function ensureExercise(id: ExerciseId) {
  if (!cache.exercises[id]) {
    cache.exercises[id] = {
      attempts: 0,
      correct: 0,
      solved: false,
      flagged: false,
      streak: 0,
      mastery: 0,
      timeMs: 0,
    }
  } else if (typeof cache.exercises[id].timeMs !== 'number') {
    cache.exercises[id].timeMs = 0
  }
}

/* ---------- EventEmitter ---------- */
type Listener = () => void
const listeners = new Set<Listener>()
function notify() { listeners.forEach(fn => fn()) }
export function subscribeProgress(fn: Listener) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/* ---------- Mutationen (Status) ---------- */
export function markSolved(id: ExerciseId, solved = true) {
  ensureExercise(id)
  const e = cache.exercises[id]
  e.solved = solved
  e.solvedAt = solved ? Date.now() : undefined
  if (solved) e.streak = (e.streak ?? 0) + 1
  saveProfile(cache); notify()
}

export function toggleFlag(id: ExerciseId) {
  ensureExercise(id)
  cache.exercises[id].flagged = !cache.exercises[id].flagged
  saveProfile(cache); notify()
}

export function recordAttempt(id: ExerciseId, correct: boolean) {
  ensureExercise(id)
  const e = cache.exercises[id]
  e.attempts += 1
  if (correct) e.correct += 1
  saveProfile(cache); notify()
}

/* ---------- Lernzeit: Start/Stop ---------- */
export function startLearningTimer(exerciseId: ExerciseId) {
  // stoppe ggf. laufende Session zuerst
  if (cache._sessionStartTs && typeof cache._activeExerciseId === 'number') {
    stopLearningTimer('auto-switch')
  }
  cache._activeExerciseId = exerciseId
  cache._sessionStartTs = Date.now()
  // kein save/notify nötig – erst beim Stop wird geschrieben
}

export function stopLearningTimer(reason: 'unmount' | 'hidden' | 'auto-switch' | 'manual' = 'manual') {
  const start = cache._sessionStartTs
  const exId = cache._activeExerciseId
  if (!start || typeof exId !== 'number') return
  const delta = Math.max(0, Date.now() - start)

  ensureExercise(exId)
  cache.exercises[exId].timeMs = (cache.exercises[exId].timeMs ?? 0) + delta
  cache.totalTimeMs = (cache.totalTimeMs ?? 0) + delta

  cache._sessionStartTs = undefined
  cache._activeExerciseId = undefined

  saveProfile(cache); notify()
}

/* ---------- Selectors ---------- */
export function getStatus(id: ExerciseId) { return cache.exercises[id] }
export function getProfile(): Profile { return cache }

/* ---------- Export / Import ---------- */
export function exportProfileAsJson(): string {
  // interne Felder nicht mit exportieren
  const { _activeExerciseId, _sessionStartTs, ...rest } = cache
  return JSON.stringify(rest, null, 2)
}

export function mergeProfile(incoming: Profile) {
  if (incoming?.version !== 1 || !incoming.exercises) return
  for (const [k, v] of Object.entries(incoming.exercises)) {
    const id = Number(k) as ExerciseId
    ensureExercise(id)
    const cur = cache.exercises[id]
    cache.exercises[id] = {
      attempts: (cur.attempts ?? 0) + (v.attempts ?? 0),
      correct: (cur.correct ?? 0) + (v.correct ?? 0),
      solved: Boolean(cur.solved || v.solved),
      solvedAt: Math.max(cur.solvedAt ?? 0, v.solvedAt ?? 0) || undefined,
      flagged: Boolean(cur.flagged || v.flagged),
      streak: Math.max(cur.streak ?? 0, v.streak ?? 0),
      mastery: Math.max(cur.mastery ?? 0, v.mastery ?? 0),
      timeMs: (cur.timeMs ?? 0) + (v.timeMs ?? 0),  // ⬅️ Zeit mergen
    }
  }
  cache.totalTimeMs = (cache.totalTimeMs ?? 0) + (incoming.totalTimeMs ?? 0)
  saveProfile(cache); notify()
}

export function importProfileFromJson(json: string) {
  const incoming = JSON.parse(json) as Profile
  mergeProfile(incoming)
}

export function resetProfile() {
  // Timer ggf. schließen, aber ohne Anrechnung
  cache = { ...emptyProfile(), id: cache.id } // id beibehalten
  saveProfile(cache); notify()
}

/* ---------- Hooks ---------- */
export function useProgress(id: ExerciseId) {
  const [state, setState] = React.useState(getStatus(id))
  React.useEffect(() => {
    const unsubscribe = subscribeProgress(() => setState(getStatus(id)))
    return () => { unsubscribe() }
  }, [id])
  return state
}
export function useProfile() {
  const [state, setState] = React.useState(getProfile())
  React.useEffect(() => {
    const unsubscribe = subscribeProgress(() => setState(getProfile()))
    return () => { unsubscribe() }
  }, [])
  return state
}

/* ---------- Utils ---------- */
export function formatMs(ms = 0): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}
