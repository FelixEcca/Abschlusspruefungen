import { useEffect } from 'react'
import {
  ExerciseViewStore,
  restoreExerciseProgress,
} from './state/exercise-view-store'
import { ExerciseViewLayout } from './ExerciseViewLayout'
import { setupExercise } from './state/actions'

interface ExerciseViewProps {
  id: number
}

export function ExerciseView({ id }: ExerciseViewProps) {
  console.log('ExerciseView geladen mit ID:', id)

  useEffect(() => {
    console.log('Starte restoreExerciseProgress()...')
    restoreExerciseProgress()

    console.log('Aktueller Store-Zustand:', ExerciseViewStore.getRawState())

    if (ExerciseViewStore.getRawState().id !== id) {
      console.log('Setup Exercise wird ausgeführt für ID:', id)
      setupExercise(id)
    }
  }, [id])

  const exId = ExerciseViewStore.useState(s => s.id)
  console.log('Aktuelle ExerciseViewStore ID:', exId)

  if (exId === -1) {
    console.warn('ExerciseView wurde mit -1 ID geladen! Rückgabe: null')
    return null
  }

  return <ExerciseViewLayout />
}
