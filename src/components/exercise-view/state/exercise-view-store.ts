import { SkillExercisePage } from '@/data/types'
import { Store } from 'pullstate'

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
  chatOverlay: null | 'solution' | 'type-n-check' | 'foto' | 'chat'
  pages: SkillExercisePage[]
  toHome: boolean
  needReset: boolean
  needReset2: boolean
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
})
