'use client'
import { Exercise } from '@/data/types'
import { renderToStaticMarkup } from 'react-dom/server'
import { ExtractorStore } from './extractor-store'
import { countLetter } from '@/helper/count-letter'

export type ExtractorOptions = {
  includeSolution?: boolean
  includeCorrectionHints?: boolean
  includeIntroLabel?: boolean
}

// returning html string
export function extractor(
  exercise: Exercise<any>,
  data: object,
  options?: ExtractorOptions,
) {
  const {
    includeSolution = true,
    includeCorrectionHints = true,
    includeIntroLabel = true,
  } = options ?? {}

  ExtractorStore.active = true
  let output = ''

  if ('tasks' in exercise) {
    if (includeIntroLabel) {
      output += 'Hier beginnt das Intro der Aufgabe:\n\n'
    }
    output += renderToStaticMarkup(exercise.intro({ data }))

    exercise.tasks.forEach((t, i) => {
      output += '\n\nTeilaufgabe ' + countLetter('a', i) + ')\n\n'
      output += renderToStaticMarkup(t.task({ data }))

      if (includeSolution) {
        output +=
          '\n\nLösung:\n\n' + renderToStaticMarkup(t.solution({ data }))
      }

      if (includeCorrectionHints && t.correctionHints) {
        output +=
          '\n\nKorrekturhinweise:\n\n' +
          renderToStaticMarkup(t.correctionHints({ data }))
      }
    })
  } else {
    output = renderToStaticMarkup(exercise.task({ data }))

    if (includeSolution) {
      output +=
        '\n\nLösung:\n\n' + renderToStaticMarkup(exercise.solution({ data }))
    }

    if (includeCorrectionHints && exercise.correctionHints) {
      output +=
        '\n\nKorrekturhinweise:\n\n' +
        renderToStaticMarkup(exercise.correctionHints({ data }))
    }
  }

  console.log(output)
  ExtractorStore.active = false
  return output
}
