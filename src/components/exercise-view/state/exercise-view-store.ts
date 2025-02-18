import { SkillExercisePage } from '@/data/types'
import { Store } from 'pullstate'

interface TextChatMessage {
  type: 'text'
  content: string
  canEdit?: boolean
}

interface ImageChatMeessage {
  type: 'image'
  image: string
  description: string
}

export interface SystemResponse {
  type: 'response'
  content: string
  category:
    | 'not-relevant'
    | 'actionable-feedback'
    | 'success'
    | 'none'
    | 'question'
}

type ChatHistoryEntry = TextChatMessage | ImageChatMeessage | SystemResponse

export type IExerciseViewStore = {
  id: number
  _exerciseIDs: number[]
  seed: string
  data: object
  dataPerExercise: { [key: string]: object }
  navIndicatorLength: number
  navIndicatorPosition: number
  navIndicatorExternalUpdate: number
  chatOverlay: null | 'solution' | 'type-n-check' | 'foto' | 'chat'
  pages: SkillExercisePage[]
  toHome: boolean
  needReset: boolean
  needReset2: boolean
}

export const ExerciseViewStore = new Store<IExerciseViewStore>({
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
})
