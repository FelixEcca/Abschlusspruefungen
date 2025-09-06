import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mode: 'solve_b' | 'solve_m'
  m: number
  b: number
  x0: number
  y0: number
}

export const exercise4101: Exercise<DATA> = {
  title: 'Geradengleichung aus Punkt (m oder b gegeben)',
  source: '2BFS',
  useCalculator: false,
  duration: 6,
  points: 3,

  generator(rng) {
    const mode = rng.randomItemFromArray(['solve_b', 'solve_m']) as DATA['mode']
    const m = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
    const b = rng.randomIntBetween(-5, 5)
    // Punkt wählen, der hübsche Werte gibt
    const x0 = rng.randomIntBetween(-4, 4) || 2
    const y0 = m * x0 + b

    if (mode === 'solve_b') {
      // m ist gegeben, b unbekannt
      return { mode, m, b, x0, y0 }
    } else {
      // b ist gegeben, m unbekannt -> sorge für ganzzahlig/halbe m
      // wähle mBasis und rechne y0 passend neu
      const mBasis = rng.randomItemFromArray([-2, -1, -0.5, 0.5, 1, 2])
      const y = mBasis * x0 + b
      return { mode, m: mBasis, b, x0, y0: y }
    }
  },

  originalData: { mode: 'solve_b', m: 1, b: -2, x0: 3, y0: 1 },

  constraint() {
    return true
  },

  task({ data }) {
    const { mode, m, b, x0, y0 } = data
    return (
      <>
        <p>
          Gegeben ist eine Gerade in der Form <InlineMath math="y = m x + b" />{' '}
          und der Punkt <InlineMath math={`P(${x0}\\mid ${y0})`} /> auf dieser
          Geraden.
        </p>
        {mode === 'solve_b' ? (
          <p>
            Bestimme <InlineMath math="b" /> für{' '}
            <InlineMath math={`m=${pp(m)}`} />, und gib den vollständigen
            Funktionsterm an.
          </p>
        ) : (
          <p>
            Bestimme <InlineMath math="m" /> für{' '}
            <InlineMath math={`b=${pp(b)}`} />, und gib den vollständigen
            Funktionsterm an.
          </p>
        )}
      </>
    )
  },

  solution({ data }) {
    const { mode, m, b, x0, y0 } = data
    if (mode === 'solve_b') {
      const bVal = y0 - m * x0
      return (
        <p>
          <InlineMath
            math={`b = y - m x = ${y0} - (${pp(m)})\\cdot ${x0} = ${pp(bVal)}`}
          />
          {` `}⇒{' '}
          <InlineMath
            math={`\\boxed{\\;y = ${pp(m)}x ${pp(bVal, 'merge_op')}\\;}`}
          />
        </p>
      )
    }
    const mVal = (y0 - b) / x0
    return (
      <p>
        <InlineMath
          math={`m = \\dfrac{y-b}{x} = \\dfrac{${y0} - (${pp(b)})}{${x0}} = ${pp(mVal)}`}
        />
        {` `}⇒{' '}
        <InlineMath
          math={`\\boxed{\\;y = ${pp(mVal)}x ${pp(b, 'merge_op')}\\;}`}
        />
      </p>
    )
  },
}
