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
  source: 'Training',
  useCalculator: false,
  duration: 5,
  points: 3,

  generator(rng) {
    // vier Fälle ungefähr gleich oft:
    const caseId = rng.randomIntBetween(1, 4) // 1: parallel, 2: identisch, 3: schneidend, 4: rechtwinklig
    const m = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
    const b = rng.randomIntBetween(-4, 4)

    if (caseId === 1) {
      const b2 = b + rng.randomItemFromArray([-3, -2, 2, 3])
      return { m1: m, b1: b, m2: m, b2 }
    }
    if (caseId === 2) {
      return { m1: m, b1: b, m2: m, b2: b }
    }
    if (caseId === 4) {
      // rechtwinklig: m2 = -1/m1, m1 != 0
      let m1 = m
      while (m1 === 0) m1 = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
      const m2 = -1 / m1
      const b2 = rng.randomIntBetween(-4, 4)
      return { m1, b1: b, m2, b2 }
    }
    // schneidend (nicht rechtwinklig)
    let m2 = m
    while (m2 === m || (m !== 0 && m2 === -1 / m))
      m2 = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
    const b2 = rng.randomIntBetween(-4, 4)
    return { m1: m, b1: b, m2, b2 }
  },

  originalData: { m1: 1, b1: 2, m2: -1, b2: -3 },

  constraint() {
    return true
  },

  task({ data }) {
    const { m1, b1, m2, b2 } = data
    return (
      <>
        <p>
          Gegeben sind die Geraden<br></br>{' '}
          <InlineMath
            math={`g_1: y = ${m1 === 1 ? '' : m1 === -1 ? '-' : pp(m1)}x ${pp(b1, 'merge_op')}`}
          />{' '}
          und<br></br>{' '}
          <InlineMath
            math={`g_2: y = ${m2 === 1 ? '' : m2 === -1 ? '-' : pp(m2)}x ${pp(b2, 'merge_op')}`}
          />
          .
        </p>
        <p>Gib ihre Lagebeziehung an.</p>
      </>
    )
  },

  solution({ data }) {
    const { m1, b1, m2, b2 } = data
    let text = ''
    if (m1 === m2 && b1 === b2) text = 'Sie sind identisch.'
    else if (m1 === m2) text = 'Sie sind parallel.'
    else if (m1 * m2 === -1) text = 'Sie stehen senkrecht zueinander.'
    else text = 'Sie schneiden sich.'
    return <p>{text}</p>
  },
}
