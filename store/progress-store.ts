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
  timeMs?: number
}

export interface Profile {
  version: 1
  id: string
  createdAt: number
  exercises: Record<ExerciseId, ExerciseProgress>
  totalTimeMs?: number

  // Laufende Session (nur in-memory, NIE persistieren)
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
    const p = JSON.parse(raw) as Partial<Profile>
    if (!p || p.version !== 1 || !p.exercises) return emptyProfile()

    // Migrationsschutz / Sanitizing
    const prof: Profile = {
      version: 1,
      id: typeof p.id === 'string' ? p.id : crypto.randomUUID(),
      createdAt: typeof p.createdAt === 'number' ? p.createdAt : Date.now(),
      exercises: p.exercises,
      totalTimeMs: typeof p.totalTimeMs === 'number' ? p.totalTimeMs : 0,
      // interne Felder NIEMALS aus Storage übernehmen
      _activeExerciseId: undefined,
      _sessionStartTs: undefined,
    }

    // timeMs-Feld sicherstellen
    for (const k of Object.keys(prof.exercises)) {
      const e = prof.exercises[Number(k)]
      if (typeof e.timeMs !== 'number') e.timeMs = 0
    }

    return prof
  } catch {
    return emptyProfile()
  }
}

// WICHTIG: interne Felder NICHT persistieren
export function saveProfile(p: Profile) {
  const { _activeExerciseId, _sessionStartTs, ...persistable } = p
  localStorage.setItem(KEY, JSON.stringify(persistable))
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
// ⚠️ immutabel schreiben (neue Referenzen!), damit useProgress sofort rendert

export function markSolved(id: ExerciseId, solved = true) {
  ensureExercise(id)
  const e = cache.exercises[id]
  const next: ExerciseProgress = {
    ...e,
    solved,
    solvedAt: solved ? Date.now() : undefined,
    streak: solved ? (e.streak ?? 0) + 1 : e.streak, // beim Rückgängig nicht erhöhen
    // Regel: Beim Setzen auf "gelöst" fällt die Markierung weg.
    // Beim Rückgängig (solved=false) belassen wir flagged wie es ist.
    flagged: solved ? false : e.flagged,
  }
  cache.exercises[id] = next
  saveProfile(cache)
  notify()
}

export function toggleFlag(id: ExerciseId) {
  ensureExercise(id)
  const e = cache.exercises[id]
  const next: ExerciseProgress = {
    ...e,
    flagged: !e.flagged,
    // wichtig: solved nicht ändern – Flag darf solved "überstimmen"
    // (Header-Logik regelt die Priorität)
  }
  cache.exercises[id] = next
  saveProfile(cache)
  notify()
}


export function recordAttempt(id: ExerciseId, correct: boolean) {
  ensureExercise(id)
  const e = cache.exercises[id]
  cache.exercises[id] = {
    ...e,
    attempts: (e.attempts ?? 0) + 1,
    correct: (e.correct ?? 0) + (correct ? 1 : 0),
  }                                                     // ⬅️ neue Referenz!
  saveProfile(cache); notify()
}


/* ---------- Lernzeit-Logik ---------- */
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

  saveProfile(cache)
  notify()
}

export function startLearningTimer(exerciseId: ExerciseId) {
  // Wenn derselbe Timer bereits läuft → nichts tun
  if (cache._activeExerciseId === exerciseId && cache._sessionStartTs) return

  // ggf. alte Session sauber flushen
  if (cache._sessionStartTs && typeof cache._activeExerciseId === 'number') {
    flushLearningTimer()
  }

  cache._activeExerciseId = exerciseId
  cache._sessionStartTs = Date.now()

  if (flushInterval) clearInterval(flushInterval)
  flushInterval = window.setInterval(flushLearningTimer, 5000) // Live-Update ins Profil
}

export function stopLearningTimer(
  _reason: 'unmount' | 'hidden' | 'switch' | 'manual' | 'route' = 'manual',
) {
  if (cache._sessionStartTs && typeof cache._activeExerciseId === 'number') {
    flushLearningTimer()
  }
  if (flushInterval) {
    clearInterval(flushInterval)
    flushInterval = undefined
  }
  cache._sessionStartTs = undefined
  cache._activeExerciseId = undefined
  // kein save/notify nötig – flushLearningTimer hat gespeichert
}

/* ---------- Selectors ---------- */
export function getStatus(id: ExerciseId) { return cache.exercises[id] }
export function getProfile(): Profile { return cache }

/* ---------- Export / Import ---------- */
export function exportProfileAsJson(): string {
  // interne Felder NICHT exportieren
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
      timeMs: (cur.timeMs ?? 0) + (v.timeMs ?? 0),
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
  if (flushInterval) clearInterval(flushInterval)
  flushInterval = undefined
  cache = { ...emptyProfile(), id: cache.id } // ID beibehalten
  saveProfile(cache); notify()
}

/* ---------- Hooks & Utils ---------- */
export function useProgress(id: ExerciseId) {
  const [state, setState] = React.useState(getStatus(id))

  React.useEffect(() => {
    const unsubscribe = subscribeProgress(() => {
      const s = getStatus(id)
      // neue Referenz erzeugen → State ändert sich sicher
      setState(s ? { ...s } : s)
    })
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
export function formatMs(ms = 0): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}
