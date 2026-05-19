// exercise9589.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  n1: number
  d1: number
  n2: number
  d2: number
  left: number
  right: number
  sign: '<' | '>' | '='
}

export const exercise9589: Exercise<DATA> = {
  title: 'Brüche vergleichen',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const d1 = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
    const d2 = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
    const n1 = rng.randomIntBetween(1, d1 - 1)
    const n2 = rng.randomIntBetween(1, d2 - 1)
    const left = n1 * d2
    const right = n2 * d1
    const sign = left < right ? '<' : left > right ? '>' : '='
    return { n1, d1, n2, d2, left, right, sign }
  },

  originalData: {
    n1: 3,
    d1: 4,
    n2: 2,
    d2: 3,
    left: 9,
    right: 8,
    sign: '>',
  },

  constraint({ data }) {
    return data.sign !== '='
  },

  task({ data }) {
    return (
      <>
        <p>Vergleichen Sie die Brüche. Setzen Sie &lt;, &gt; oder = ein.</p>
        <InlineMath
          math={`\\frac{${data.n1}}{${data.d1}}\\;\\square\\;\\frac{${data.n2}}{${data.d2}}`}
        />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Vergleiche durch Kreuzmultiplikation.</p>
        <InlineMath math={`${data.n1}\\cdot ${data.d2}=${data.left}`} />
        <br />
        <InlineMath math={`${data.n2}\\cdot ${data.d1}=${data.right}`} />
        <p>Jetzt werden die Ergebnisse verglichen.</p>
        <InlineMath
          math={`\\frac{${data.n1}}{${data.d1}}\\;${data.sign}\\;\\frac{${data.n2}}{${data.d2}}`}
        />
      </>
    )
  },
}