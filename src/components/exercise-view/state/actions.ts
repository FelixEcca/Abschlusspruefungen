import { exercisesData } from '@/content/exercises'
import { generateData } from '@/data/generate-data'
import { generateSeed } from '@/data/generate-seed'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { isDeepEqual } from '@/helper/is-deep-equal'
import { ExerciseViewStore, SystemResponse } from './exercise-view-store'
import { extractor } from '../extractor/extractor'
import { IMessage, SkillExercise, SkillExercisePage } from '@/data/types'
import { makePost } from '@/helper/make-post'
import { countLetter } from '@/helper/count-letter'
import {
  PlayerProfileStore,
  updatePlayerProfileStore,
} from '../../../../store/player-profile-store'

export function setupExercise(
  id: number,
  skill?: string,
  pages?: SkillExercisePage[],
  toHome?: boolean,
  useStartData?: boolean,
) {
  const content = exercisesData[id]
  if (!pages && 'tasks' in content) {
    // ensure that pages are populated
    pages = content.tasks.map((task, index) => {
      return {
        index: countLetter('a', index),
      }
    })
  }
  if (!pages) {
    pages = [{ index: 'single' }]
  }
  ExerciseViewStore.update(s => {
    s.id = id
    s.seed = generateSeed()
    s.data = generateData(id, s.seed, content, true) as object
    if (PlayerProfileStore.getRawState().original && !skill && !toHome) {
      if (content.originalData) {
        s.data = content.originalData
      }
    }
    if (useStartData && content.learningPathData) {
      s.data = content.learningPathData
    }
    s.pages = pages
    s.navIndicatorLength = pages
      ? pages.length
      : 'tasks' in content
        ? content.tasks.length
        : 0
    s.navIndicatorPosition = 0
    s.navIndicatorExternalUpdate = 0
    s.checks = Array.from({ length: Math.max(1, s.navIndicatorLength) }).map(
      _ => {
        return {
          answerInput: '',
          result: '',
          resultPending: false,
          fotoFeedback: '',
          croppedImage: '',
          uploadedImage: '',
        }
      },
    )
    s.chatHistory = Array.from({
      length: Math.max(1, s.navIndicatorLength),
    }).map(_ => {
      return { entries: [], resultPending: false, answerInput: '' }
    })
    s.chatOverlay = null
    s.skill = skill
    s.cropImage = false
    s.completed = s.checks.map(() => false)
    s.showEndScreen = false
    s.toHome = !!toHome
    s.tag = ''
    s.hasExamplePrescreen = false
    s.examplePrescreen = false
    s.isChallenge = false
    s.introText = ''
  })
}

export function setDisplayIndices() {
  ExerciseViewStore.update(s => {
    if (s.pages.length > 1) {
      let counter = 0
      let context = ''
      s.pages.forEach(page => {
        const currentContext = page.context ?? ''
        if (currentContext != context) {
          counter = 0
          context = currentContext
        }
        page.displayIndex =
          currentContext +
          (page.index == 'single' ? '' : countLetter('a', counter))
        counter++
      })
    }
  })
}

export function reseed() {
  const s = ExerciseViewStore.getRawState()
  const context = s.pages[s.navIndicatorPosition].context
  const id = context ? s._exerciseIDs[parseInt(context) - 1] : s.id
  const currentData = context ? s.dataPerExercise[context] : s.data
  const newSeed = constrainedGeneration(
    () => generateSeed(),
    seed => {
      const newData = generateData(id, seed, exercisesData[id])
      return !isDeepEqual(currentData, newData)
    },
  )
  ExerciseViewStore.update(s => {
    s.seed = newSeed
    if (context) {
      s.dataPerExercise[context] = generateData(
        id,
        newSeed,
        exercisesData[id],
      ) as object
    } else {
      s.data = generateData(id, newSeed, exercisesData[id]) as object
    }
  })
}
