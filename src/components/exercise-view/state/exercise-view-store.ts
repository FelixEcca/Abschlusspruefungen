// exercise-view-store.ts
import { SkillExercisePage } from '@/data/types'
import { Store } from 'pullstate'

export type ChatLearningMode =
  | 'leicht'
  | 'schwer'
  | 'schritt'
  | 'tipp'
  | 'humor'
  | 'pruefen'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: number
  attachment?: {
    kind: 'image'
    src: string
    name?: string
    review?: {
      confidence: number
      label: string
      targetText: string
    }
  }
}

export type IExerciseViewStore = {
  skill: any
  id: number
  _exerciseIDs: number[]
  seed: string
  data: object
  dataPerExercise: { [key: string]: object }
  navIndicatorLength: number
  navIndicatorPosition: number
  navIndicatorExternalUpdate: number
  chatOverlay: null | 'solution' | 'type-n-check' | 'foto' | 'chat' | 'scribble'
  pages: SkillExercisePage[]
  toHome: boolean
  needReset: boolean
  needReset2: boolean

  // Chat
  chatMessages: ChatMessage[]
  chatPending: boolean
  chatMode: ChatLearningMode | null
  queuedChatSubmission: {
    id: string
    content: string
    attachment: {
      kind: 'image'
      src: string
      name?: string
    }
  } | null
}

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
  navIndicatorLength: 0,
  navIndicatorPosition: 0,
  navIndicatorExternalUpdate: -1,
  chatOverlay: null,
  toHome: false,

  chatMessages: [],
  chatPending: false,
  chatMode: null,
  queuedChatSubmission: null,
})
