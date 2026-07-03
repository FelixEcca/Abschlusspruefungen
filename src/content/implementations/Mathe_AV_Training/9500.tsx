// exercise9500.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'klassenkasse' | 'schulfest' | 'ausflug' | 'einkauf'

interface DATA {
  kontext: Kontext
  start: number
  plus: number
  minus: number
  result: number
}

function getContext(data: DATA) {
  if (data.kontext === 'schulfest') {
    return {
      text1: `Beim Schulfest sind zuerst ${pp(data.start)} € in der Kasse.`,
      text2: `Später kommen ${pp(data.plus)} € dazu. Für Material werden ${pp(
        data.minus,
      )} € ausgegeben.`,
      frage: 'Berechnen Sie, wie viel Geld danach in der Kasse ist.',
    }
  }

  if (data.kontext === 'ausflug') {
    return {
      text1: `Für einen Ausflug wurden bereits ${pp(data.start)} € gesammelt.`,
      text2: `Es kommen noch ${pp(data.plus)} € dazu. Für Fahrkarten werden ${pp(
        data.minus,
      )} € bezahlt.`,
      frage: 'Berechnen Sie, wie viel Geld übrig bleibt.',
    }
  }

  if (data.kontext === 'einkauf') {
    return {
      text1: `Sie haben ${pp(data.start)} € zur Verfügung.`,
      text2: `Sie bekommen noch ${pp(data.plus)} € dazu und geben ${pp(
        data.minus,
      )} € aus.`,
      frage: 'Berechnen Sie, wie viel Geld übrig bleibt.',
    }
  }

  return {
    text1: `In der Klassenkasse sind ${pp(data.start)} €.`,
    text2: `Es kommen ${pp(data.plus)} € dazu. Danach werden ${pp(
      data.minus,
    )} € ausgegeben.`,
    frage: 'Berechnen Sie, wie viel Geld danach in der Klassenkasse ist.',
  }
}

export const exercise9500: Exercise<DATA> = {
  title: 'Geld addieren und subtrahieren',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'klassenkasse',
      'schulfest',
      'ausflug',
      'einkauf',
    ])

    const start = rng.randomIntBetween(40, 250)
    const plus = rng.randomIntBetween(20, 180)
    const minus = rng.randomIntBetween(10, Math.min(150, start + plus - 10))
    const result = start + plus - minus

    return { kontext, start, plus, minus, result }
  },

  originalData: {
    kontext: 'klassenkasse',
    start: 120,
    plus: 75,
    minus: 40,
    result: 155,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text1}</p>
        <p>{context.text2}</p>
        <p>{context.frage}</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird addiert. Danach wird subtrahiert.</p>
        <InlineMath
          math={`${pp(data.start)}+${pp(data.plus)}-${pp(data.minus)}=${pp(
            data.result,
          )}`}
        />
        <p>
          Das Ergebnis ist <b>{pp(data.result)} €</b>.
        </p>
      </>
    )
  },
}