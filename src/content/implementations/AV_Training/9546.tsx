// exercise9546.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  result: number
}

export const exercise9546: Exercise<DATA> = {
  title: 'Schriftliche Addition',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const a = rng.randomIntBetween(120, 9999)
    const b = rng.randomIntBetween(80, 8999)
    return { a, b, result: a + b }
  },

  originalData: {
    a: 3478,
    b: 2569,
    result: 6047,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie schriftlich:</p>
        <InlineMath math={`${data.a}+${data.b}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Rechne stellenweise von rechts nach links.</p>
        <p>
          Einer, Zehner, Hunderter und Tausender werden passend untereinander
          geschrieben.
        </p>
        <InlineMath math={`${data.a}+${data.b}=${data.result}`} />
        <p>
          Ergebnis: <b>{data.result}</b>
        </p>
      </>
    )
  },
}
