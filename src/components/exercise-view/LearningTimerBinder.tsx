// src/components/exercise-view/LearningTimerBinder.tsx
import * as React from 'react'
import { useLocation } from 'react-router'
import { ExerciseViewStore } from './state/exercise-view-store'
import {
  startLearningTimer,
  stopLearningTimer,
} from '../../../store/progress-store'

export default function LearningTimerBinder() {
  const location = useLocation()
  const id = ExerciseViewStore.useState(s => s.id)

  const onExerciseRoute = React.useMemo(() => {
    const p = location.pathname
    // deckt /exercise/123 und /app/exercise/123 ab
    return /^\/(app\/)?exercise\/\d+$/i.test(p)
  }, [location.pathname])

  React.useEffect(() => {
    if (onExerciseRoute && typeof id === 'number' && id !== -1) {
      startLearningTimer(id)
    } else {
      stopLearningTimer()
    }

    const onVisibility = () => {
      if (document.hidden) {
        stopLearningTimer()
      } else if (onExerciseRoute && typeof id === 'number' && id !== -1) {
        startLearningTimer(id)
      }
    }
    const onPageHide = () => stopLearningTimer()
    const onBeforeUnload = () => stopLearningTimer()

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
      window.removeEventListener('beforeunload', onBeforeUnload)
      stopLearningTimer()
    }
  }, [onExerciseRoute, id])

  return null
}
