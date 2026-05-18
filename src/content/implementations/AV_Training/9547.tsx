// exercise9547.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  result: number
}

export const exercise9547: Exercise<DATA> = {
  title: 'Schriftliche Subtraktion',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const b = rng.randomIntBetween(80, 4999)
    const result = rng.randomIntBetween(50, 5000)
    const a = b + result

    return { a, b, result }
  },

  originalData: {
    a: 6047,
    b: 2569,
    result: 3478,
  },

  constraint({ data }) {
    return data.a > data.b && data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie schriftlich:</p>
        <InlineMath math={`${data.a}-${data.b}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Rechne stellenweise von rechts nach links.</p>
        <p>Wenn oben eine kleinere Ziffer steht, muss geborgt werden.</p>
        <InlineMath math={`${data.a}-${data.b}=${data.result}`} />
        <p>
          Ergebnis: <b>{data.result}</b>
        </p>
      </>
    )
  },
}
