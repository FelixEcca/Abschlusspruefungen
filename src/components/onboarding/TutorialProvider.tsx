import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { exercisesData } from '@/content/exercises'
import { navigationData } from '@/content/navigations'
import { isExamExerciseInNavigation } from '@/content/navigation-exercises'
import { PlayerProfileStore } from '../../../store/player-profile-store'
import { TutorialOverlay } from './TutorialOverlay'
import {
  advanceTutorial,
  buildTutorialPlan,
  readTutorialRecord,
  resumeTutorial,
  tutorialStorageKey,
  type TutorialEvent,
  type TutorialRecord,
} from './tutorial-model'

type TutorialContextValue = {
  startTutorial: (courseId: number, replay?: boolean) => void
  notifyTutorial: (event: TutorialEvent) => void
  active: boolean
}

const TutorialContext = createContext<TutorialContextValue | null>(null)

export function useTutorial() {
  const context = useContext(TutorialContext)
  if (!context) throw new Error('TutorialProvider is required')
  return context
}

function persist(record: TutorialRecord) {
  try {
    localStorage.setItem(tutorialStorageKey, JSON.stringify(record))
  } catch {
    /* Keep the tour usable when browser storage is blocked. */
  }
}

export function TutorialProvider({ children }: { children: ReactNode }) {
  const history = useHistory()
  const { pathname } = useLocation()
  const [record, setRecord] = useState<TutorialRecord | null>(null)
  const name = PlayerProfileStore.useState(s => s.name)
  const selectedCourse = PlayerProfileStore.useState(s => s.currentExam)
  const courseId = record?.courseId
  const plan = useMemo(
    () =>
      courseId
        ? buildTutorialPlan(
            courseId,
            navigationData,
            exercisesData,
            isExamExerciseInNavigation,
          )
        : null,
    [courseId],
  )
  const step = plan?.steps.find(item => item.id === record?.step)

  useEffect(() => {
    try {
      const saved = readTutorialRecord(localStorage.getItem(tutorialStorageKey))
      if (saved && navigationData[saved.courseId]) {
        const savedPlan = buildTutorialPlan(
          saved.courseId,
          navigationData,
          exercisesData,
          isExamExerciseInNavigation,
        )
        setRecord(resumeTutorial(saved, savedPlan))
      }
    } catch {
      /* A first run without storage starts from the welcome screen. */
    }
  }, [])

  useEffect(() => {
    if (record) persist(record)
  }, [record])

  useEffect(() => {
    if (record?.status === 'active' && record.courseId !== selectedCourse)
      setRecord(current =>
        current ? { ...current, status: 'skipped' } : current,
      )
  }, [selectedCourse, record?.courseId, record?.status])

  const startTutorial = useCallback(
    (courseId: number, replay = false) => {
      if (!navigationData[courseId]) return
      if (!replay && record && record.status !== 'active') return
      const next: TutorialRecord = {
        version: 1,
        courseId,
        step: 'dashboard',
        status: 'active',
      }
      // Write before onboarding reloads the app so the first step cannot be lost.
      persist(next)
      setRecord(next)
      if (replay) history.push('/app/start')
    },
    [record, history],
  )

  const notifyTutorial = useCallback(
    (event: TutorialEvent) => {
      setRecord(current =>
        current && plan ? advanceTutorial(current, plan, event) : current,
      )
    },
    [plan],
  )

  useEffect(() => {
    if (record?.status !== 'active' || !step || !plan) return
    if (step.event === 'training-arrived' && pathname === '/app/training')
      notifyTutorial('training-arrived')
    if (
      step.event === 'exercise-arrived' &&
      pathname === `/exercise/${plan.exerciseId}`
    )
      notifyTutorial('exercise-arrived')
    if (step.event === 'training-returned' && pathname === '/app/training')
      notifyTutorial('training-returned')
    if (step.event === 'list-arrived' && pathname === '/app/list')
      notifyTutorial('list-arrived')
  }, [pathname, record?.status, step, plan, notifyTutorial])

  const active = record?.status === 'active' && !!plan && !!step
  const context = useMemo(
    () => ({ startTutorial, notifyTutorial, active }),
    [startTutorial, notifyTutorial, active],
  )
  return (
    <TutorialContext.Provider value={context}>
      {children}
      {active && step && plan && record && (
        <TutorialOverlay
          step={step}
          plan={plan}
          name={name}
          wrongRoute={pathname !== step.route}
          onNext={() => {
            notifyTutorial('next')
            if (step.id === 'finish') history.push('/app/start')
          }}
          onSkip={() => setRecord({ ...record, status: 'skipped' })}
          onRecover={() => {
            if (pathname !== step.route) history.push(step.route)
            else {
              const recovered = resumeTutorial(record, plan)
              setRecord(
                recovered.step !== record.step
                  ? recovered
                  : { ...record, step: 'dashboard' },
              )
            }
          }}
        />
      )}
    </TutorialContext.Provider>
  )
}
