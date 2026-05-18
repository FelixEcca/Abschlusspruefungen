// exercise9548.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  numbers: number[]
  result: number
}

export const exercise9548: Exercise<DATA> = {
  title: 'Mehrgliedrige Summen',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const count = rng.randomItemFromArray([3, 4, 5])
    const numbers = Array.from({ length: count }, () =>
      rng.randomIntBetween(10, 250),
    )
    const result = numbers.reduce((sum, n) => sum + n, 0)

    return { numbers, result }
  },

  originalData: {
    numbers: [120, 75, 48, 32],
    result: 275,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Summe.</p>
        <InlineMath math={data.numbers.join('+')} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Addiere Schritt für Schritt.</p>
        <InlineMath math={`${data.numbers.join('+')}=${data.result}`} />
        <p>
          Ergebnis: <b>{data.result}</b>
        </p>
      </>
    )
  },
}
