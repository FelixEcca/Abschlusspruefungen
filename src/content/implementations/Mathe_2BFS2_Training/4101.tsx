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
  title: 'Geradengleichung aus Punkt',
  source: 'Training',
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
        {mode === 'solve_b' ? (
          <>
            <p>
              Gegeben ist eine Gerade in der Form<br></br>{' '}
              <InlineMath math={`y = ${pp(m)} x + b`} /> und der Punkt{' '}
              <InlineMath math={`P(${x0}\\mid ${y0})`} /> auf dieser Geraden.
            </p>
            <p>
              Bestimme <InlineMath math="b" /> und gib den vollständigen
              Funktionsterm an.
            </p>
          </>
        ) : (
          <>
            <p>
              <p>
                Gegeben ist eine Gerade in der Form<br></br>{' '}
                <InlineMath math={`y = mx ${pp(b, 'merge_op')}`} /> und der
                Punkt <InlineMath math={`P(${x0}\\mid ${y0})`} /> auf dieser
                Geraden.
              </p>
              <p>
                Bestimme <InlineMath math="m" /> und gib den vollständigen
                Funktionsterm an.
              </p>
            </p>
          </>
        )}
      </>
    )
  },

  solution({ data }) {
    const { mode, m, b, x0, y0 } = data
    if (mode === 'solve_b') {
      // m gegeben, b unbekannt
      return (
        <>
          <p>
            Geradengleichung: <InlineMath math={`y = ${pp(m)}x + b`} />
          </p>
          <p>
            Punkt einsetzen:{' '}
            <InlineMath math={`${y0} = ${pp(m)} \\cdot ${x0} + b`} />
          </p>
          <p>
            Nach <InlineMath math="b" /> umstellen:
            <br />
            <InlineMath
              math={`b = ${y0} - (${pp(m)} \\cdot ${x0}) = ${pp(y0 - m * x0)}`}
            />
          </p>
          <p>
            Funktionsterm:{' '}
            <InlineMath
              math={`\\boxed{y = ${pp(m)}x ${pp(y0 - m * x0, 'merge_op')}}`}
            />
          </p>
        </>
      )
    }
    // b gegeben, m unbekannt
    return (
      <>
        <p>
          Geradengleichung: <InlineMath math={`y = m x ${pp(b, 'merge_op')}`} />
        </p>
        <p>
          Punkt einsetzen:{' '}
          <InlineMath math={`${y0} = m \\cdot ${x0} ${pp(b, 'merge_op')}`} />
        </p>
        <p>
          Nach <InlineMath math="m" /> umstellen:
          <br />
          <InlineMath
            math={`m = \\frac{${pp(y0)} ${b < 0 ? '+' : '-'} ${pp(Math.abs(b))}}{${pp(x0)}} = ${pp((y0 - b) / x0)}`}
          />
        </p>
        <p>
          Funktionsterm:{' '}
          <InlineMath
            math={`\\boxed{y = ${pp((y0 - b) / x0)}x ${pp(b, 'merge_op')}}`}
          />
        </p>
      </>
    )
  },
}
