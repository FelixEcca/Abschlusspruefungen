import * as React from 'react'
import { ExerciseViewStore } from './state/exercise-view-store'
import {
  startLearningTimer,
  stopLearningTimer,
} from '../../../store/progress-store'

export default function LearningTimerBinder() {
  const id = ExerciseViewStore.useState(s => s.id)

  React.useEffect(() => {
    if (typeof id === 'number') startLearningTimer(id)

    const onVisibility = () => {
      if (document.hidden) stopLearningTimer('hidden')
      else if (typeof id === 'number') startLearningTimer(id)
    }
    const onBeforeUnload = () => stopLearningTimer('unmount')

    window.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('beforeunload', onBeforeUnload) // ✅ richtiger Name
      stopLearningTimer('unmount')
    }
  }, [id])

  return null
}
