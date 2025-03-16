import { SkillExercisePage } from '@/data/types'
import { Store } from 'pullstate'

export type IExerciseViewStore = {
  skill: any
  id: number
  _exerciseIDs: number[]
  seed: string
  data: object
  tag: string
  dataPerExercise: { [key: string]: object }
  navIndicatorLength: number
  navIndicatorPosition: number
  navIndicatorExternalUpdate: number
  chatOverlay: null | 'solution' | 'type-n-check' | 'foto' | 'chat'
  pages: SkillExercisePage[]
  toHome: boolean
  needReset: boolean
  needReset2: boolean
  completedExercises: { [key: number]: boolean }
  highlightedExercises: { [key: number]: boolean }
}

// 🟢 Store mit bestehenden Werten + Persistenzmechanik
export const ExerciseViewStore = new Store<IExerciseViewStore>({
  skill: [],
  id: -1,
  _exerciseIDs: [],
  needReset: false,
  needReset2: false,
  seed: '',
  data: {},
  pages: [],
  dataPerExercise: {},
  tag: '',
  navIndicatorLength: 0,
  navIndicatorPosition: 0,
  navIndicatorExternalUpdate: -1,
  chatOverlay: null,
  toHome: false,
  completedExercises: JSON.parse(
    localStorage.getItem('completedExercises') || '{}',
  ),
  highlightedExercises: JSON.parse(
    localStorage.getItem('highlightedExercises') || '{}',
  ),
})

export function restoreExerciseProgress() {
  try {
    const completed = JSON.parse(
      localStorage.getItem('completedExercises') || '{}',
    )
    const highlighted = JSON.parse(
      localStorage.getItem('highlightedExercises') || '{}',
    )

    ExerciseViewStore.update(s => {
      s.completedExercises = completed
      s.highlightedExercises = highlighted
    })

    console.log(
      'restoreExerciseProgress geladen:',
      ExerciseViewStore.getRawState(),
    )
  } catch (e) {
    console.warn('Fehler beim Laden des Fortschritts:', e)
  }
}

// 🟢 Fortschritt speichern
export function markAsCompleted(id: number) {
  ExerciseViewStore.update(s => {
    s.completedExercises[id] = !s.completedExercises[id]
    localStorage.setItem(
      'completedExercises',
      JSON.stringify(s.completedExercises),
    )
  })
}

export function toggleHighlighted(id: number) {
  ExerciseViewStore.update(s => {
    s.highlightedExercises[id] = !s.highlightedExercises[id]
    localStorage.setItem(
      'highlightedExercises',
      JSON.stringify(s.highlightedExercises),
    )
  })
}

// 🟢 Direkt beim Start aufrufen
restoreExerciseProgress()
