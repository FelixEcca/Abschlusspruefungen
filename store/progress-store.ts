import * as React from 'react'

const KEY = 'ap-progress-v1'

export type ExerciseId = number

export interface ExerciseProgress {
  attempts: number
  correct: number
  solved: boolean
  solvedAt?: number
  flagged?: boolean
  streak?: number     // per-Exercise optional (lassen wir unangetastet)
  mastery?: number
  timeMs?: number
}

export interface Profile {
  version: 1
  id: string
  name: string            // <-- NEU
  createdAt: number
  exercises: Record<number, ExerciseProgress>
  totalTimeMs: number
  currentStreak: number
  longestStreak: number
  lastActiveDate?: string
  activityByDate: Record<string, number>
  _activeExerciseId?: number
  _sessionStartTs?: number
}

function localDateKey(d = new Date()): string {
  // lokales Datum → YYYY-MM-DD (keine UTC-Verschiebungen)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(key: string, days: number): string {
  const [y, m, d] = key.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + days)
  return localDateKey(dt)
}

function isConsecutive(prevKey?: string, todayKey?: string): boolean {
  if (!prevKey || !todayKey) return false
  return addDays(prevKey, 1) === todayKey
}

export function emptyProfile(): Profile {
  return {
    version: 1,
    id: crypto.randomUUID(),
    name: '',              // <-- NEU
    createdAt: Date.now(),
    exercises: {},
    totalTimeMs: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: undefined,
    activityByDate: {},
    _activeExerciseId: undefined,
    _sessionStartTs: undefined,
  }
}

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyProfile()
    const p = JSON.parse(raw) as Partial<Profile>
    if (!p || p.version !== 1 || !p.exercises) return emptyProfile()

    const prof: Profile = {
      version: 1,
      id: typeof p.id === 'string' ? p.id : crypto.randomUUID(),
      name: typeof p.name === 'string' ? p.name : '',  // <-- NEU
      createdAt: typeof p.createdAt === 'number' ? p.createdAt : Date.now(),
      exercises: p.exercises,
      totalTimeMs: typeof p.totalTimeMs === 'number' ? p.totalTimeMs : 0,
      currentStreak: typeof p.currentStreak === 'number' ? p.currentStreak : 0,
      longestStreak: typeof p.longestStreak === 'number' ? p.longestStreak : 0,
      lastActiveDate: typeof p.lastActiveDate === 'string' ? p.lastActiveDate : undefined,
      activityByDate: p.activityByDate ?? {},
      _activeExerciseId: undefined,
      _sessionStartTs: undefined,
    }

    for (const k of Object.keys(prof.exercises)) {
      const e = prof.exercises[Number(k)]
      if (typeof e.timeMs !== 'number') e.timeMs = 0
    }

    return prof
  } catch {
    return emptyProfile()
  }
}

// interne Felder NIE persistieren
export function saveProfile(p: Profile) {
  const { _activeExerciseId, _sessionStartTs, ...persistable } = p
  localStorage.setItem(KEY, JSON.stringify(persistable))
}
export function setName(name: string) {
  cache.name = name.trim()
  saveProfile(cache)
  notify()
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

// 🔥 globalen Streak & Aktivität beim ersten Solve des Tages pflegen
function updateDailyStreakOnSolved() {
  const today = localDateKey()
  const prev = cache.lastActiveDate
  const alreadyToday = (cache.activityByDate?.[today] ?? 0) > 0

  // Aktivität hochzählen
  cache.activityByDate = { ...(cache.activityByDate ?? {}) }
  cache.activityByDate[today] = (cache.activityByDate[today] ?? 0) + 1

  // Streak nur erhöhen/setzen, wenn es der erste Solve des Tages ist
  if (!alreadyToday) {
    if (!prev) {
      cache.currentStreak = 1
    } else if (isConsecutive(prev, today)) {
      cache.currentStreak = (cache.currentStreak ?? 0) + 1
    } else if (prev !== today) {
      cache.currentStreak = 1
    }
    cache.longestStreak = Math.max(cache.longestStreak ?? 0, cache.currentStreak ?? 0)
    cache.lastActiveDate = today
  }
}

export function markSolved(id: ExerciseId, solved = true) {
  ensureExercise(id)
  const e = cache.exercises[id]
  const next: ExerciseProgress = {
    ...e,
    solved,
    solvedAt: solved ? Date.now() : undefined,
    streak: solved ? (e.streak ?? 0) + 1 : e.streak,
    // Regel: sobald gelöst → Markierung weg; beim Rückgängig bleibt flagged wie es war
    flagged: solved ? false : e.flagged,
  }
  cache.exercises[id] = next

  if (solved) {
    updateDailyStreakOnSolved()
  }

  saveProfile(cache)
  notify()
}

export function toggleFlag(id: ExerciseId) {
  ensureExercise(id)
  const e = cache.exercises[id]
  const next: ExerciseProgress = { ...e, flagged: !e.flagged }
  cache.exercises[id] = next
  saveProfile(cache); notify()
}

export function recordAttempt(id: ExerciseId, correct: boolean) {
  ensureExercise(id)
  const e = cache.exercises[id]
  cache.exercises[id] = {
    ...e,
    attempts: (e.attempts ?? 0) + 1,
    correct: (e.correct ?? 0) + (correct ? 1 : 0),
  }
  saveProfile(cache); notify()
}

/* ---------- Lernzeit-Logik (wie zuvor) ---------- */
let flushInterval: number | undefined

function flushLearningTimer() {
  const start = cache._sessionStartTs
  const exId = cache._activeExerciseId
  if (!start || typeof exId !== 'number') return
  const now = Date.now()
  const delta = Math.max(0, now - start)
  cache._sessionStartTs = now

  ensureExercise(exId)
  cache.exercises[exId].timeMs = (cache.exercises[exId].timeMs ?? 0) + delta
  cache.totalTimeMs = (cache.totalTimeMs ?? 0) + delta

  saveProfile(cache); notify()
}

export function startLearningTimer(exerciseId: ExerciseId) {
  if (cache._activeExerciseId === exerciseId && cache._sessionStartTs) return
  if (cache._sessionStartTs && typeof cache._activeExerciseId === 'number') {
    flushLearningTimer()
  }
  cache._activeExerciseId = exerciseId
  cache._sessionStartTs = Date.now()
  if (flushInterval) clearInterval(flushInterval)
  flushInterval = window.setInterval(flushLearningTimer, 5000)
}

export function stopLearningTimer() {
  if (cache._sessionStartTs && typeof cache._activeExerciseId === 'number') {
    flushLearningTimer()
  }
  if (flushInterval) {
    clearInterval(flushInterval)
    flushInterval = undefined
  }
  cache._sessionStartTs = undefined
  cache._activeExerciseId = undefined
}

/* ---------- Selectors ---------- */
export function getStatus(id: ExerciseId) { return cache.exercises[id] }
export function getProfile(): Profile { return cache }

/* ---------- Export / Import ---------- */
export function exportProfileAsJson(): string {
  const { _activeExerciseId, _sessionStartTs, ...rest } = cache
  return JSON.stringify(rest, null, 2)
}

export function mergeProfile(incoming: Profile) {
  if (incoming?.version !== 1 || !incoming.exercises) return

  // Aufgaben mergen
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
      timeMs: (cur.timeMs ?? 0) + (v.timeMs ?? 0),
    }
  }

  // Zeiten
  cache.totalTimeMs = (cache.totalTimeMs ?? 0) + (incoming.totalTimeMs ?? 0)

  // 🔥 Streak & Aktivität – sinnvoll mergen
  cache.activityByDate = { ...(cache.activityByDate ?? {}) }
  if (incoming.activityByDate) {
    for (const [day, count] of Object.entries(incoming.activityByDate)) {
      cache.activityByDate[day] = (cache.activityByDate[day] ?? 0) + (count ?? 0)
    }
  }
  cache.longestStreak = Math.max(cache.longestStreak ?? 0, incoming.longestStreak ?? 0)

  // currentStreak/lastActiveDate sind zeitpunktbezogen und schwer zu mergen → wir lassen unsere Werte bestehen

  saveProfile(cache); notify()
}

export function importProfileFromJson(json: string) {
  const incoming = JSON.parse(json) as Profile
  mergeProfile(incoming)
}

export function resetProfile() {
  if (flushInterval) clearInterval(flushInterval)
  flushInterval = undefined
  cache = { ...emptyProfile(), id: cache.id } // ID behalten
  saveProfile(cache)
  notify()
}

/* ---------- Hooks & Utils ---------- */
export function useProgress(id: ExerciseId) {
  const [state, setState] = React.useState(getStatus(id))
  React.useEffect(() => {
    const unsubscribe = subscribeProgress(() => {
      const s = getStatus(id)
      setState(s ? { ...s } : s) // neue Referenz → garantiertes Re-Render
    })
    return () => { unsubscribe(); }
  }, [id])
  return state
}

export function useProfile() {
  const [state, setState] = React.useState(getProfile())
  React.useEffect(() => {
    const unsubscribe = subscribeProgress(() => setState(getProfile()))
    return () => { unsubscribe(); }
  }, [])
  return state
}

export function formatMs(ms = 0): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}
