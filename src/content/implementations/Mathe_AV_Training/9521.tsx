// exercise9521.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  percent: number
  rest: number
  group: string
}

export const exercise9521: Exercise<DATA> = {
  title: 'Restprozent berechnen',
  source: 'Prozentrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const percent = rng.randomIntBetween(35, 95)
    const rest = 100 - percent
    const group = rng.randomItemFromArray([
      'ein Smartphone',
      'ein Fahrrad',
      'einen Ausweis',
      'ein Ticket',
    ])

    return { percent, rest, group }
  },

  originalData: {
    percent: 86,
    rest: 14,
    group: 'ein Smartphone',
  },

  constraint({ data }) {
    return data.rest > 0
  },

  task({ data }) {
    return (
      <p>
        {data.percent} % der Personen besitzen {data.group}. Wie viel Prozent
        besitzen es nicht?
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`100\\%-${data.percent}\\%=${data.rest}\\%`} />
        <p>
          <b>{data.rest} %</b> besitzen es nicht.
        </p>
      </>
    )
  },
}