import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m1: number
  b1: number
  m2: number
  b2: number
}

export const exercise4102: Exercise<DATA> = {
  title: 'Lage zweier Geraden aus den Termen',
  source: '2BFS',
  useCalculator: false,
  duration: 5,
  points: 3,

  generator(rng) {
    // drei Fälle ungefähr gleich oft:
    const caseId = rng.randomIntBetween(1, 3) // 1: parallel, 2: identisch, 3: schneidend
    const m = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
    const b = rng.randomIntBetween(-4, 4)

    if (caseId === 1) {
      const b2 = b + rng.randomItemFromArray([-3, -2, 2, 3])
      return { m1: m, b1: b, m2: m, b2 }
    }
    if (caseId === 2) {
      return { m1: m, b1: b, m2: m, b2: b }
    }
    // schneidend
    let m2 = m
    while (m2 === m) m2 = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
    const b2 = rng.randomIntBetween(-4, 4)
    return { m1: m, b1: b, m2, b2 }
  },

  originalData: { m1: 1, b1: 2, m2: 1, b2: -3 },

  constraint() {
    return true
  },

  task({ data }) {
    const { m1, b1, m2, b2 } = data
    return (
      <>
        <p>
          Gegeben sind die Geraden{' '}
          <InlineMath math={`g_1: y = ${pp(m1)}x ${pp(b1, 'merge_op')}`} /> und{' '}
          <InlineMath math={`g_2: y = ${pp(m2)}x ${pp(b2, 'merge_op')}`} />.
        </p>
        <p>Gib ihre Lagebeziehung an (parallel, identisch oder schneidend).</p>
      </>
    )
  },

  solution({ data }) {
    const { m1, b1, m2, b2 } = data
    let text = ''
    if (m1 === m2 && b1 === b2) text = 'identisch'
    else if (m1 === m2) text = 'parallel (verschieden)'
    else text = 'schneidend'
    return <p>{text}</p>
  },
}
