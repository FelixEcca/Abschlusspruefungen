import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mode: 'solve_c' | 'solve_a'
  a: number
  c: number
  x0: number
  y0: number
}

export const exercise4003: Exercise<DATA> = {
  title: 'a und c aus Punkten berechnen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 3,

  generator(rng) {
    // saubere, kleine Zahlen
    const a = rng.randomItemFromArray([1, 2, 3, -1])
    const c = rng.randomIntBetween(-4, 4)
    const x0 = rng.randomIntBetween(-3, 3) || 2 // nicht 0 bevorzugen
    const y0 = a * x0 * x0 + c
    const mode = rng.randomItemFromArray(['solve_c', 'solve_a']) as DATA['mode']

    // falls 'solve_a', wählen wir lieber a aus {1,2,3} und erlauben negatives via Punkt:
    const chosen =
      mode === 'solve_a'
        ? {
            mode,
            a: 1, // Platzhalter, wird über Punkt bestimmt
            c,
            x0,
            y0,
          }
        : { mode, a, c, x0, y0 }

    // Für 'solve_a' bestimmen wir a aus c und Punkt, Ergebnis ganzzahlig:
    if (chosen.mode === 'solve_a') {
      // wähle a so, dass y0 - c ein Vielfaches von x0^2 ist
      const baseA = rng.randomItemFromArray([1, 2, 3, 4])
      const newY0 = baseA * x0 * x0 + c
      chosen.y0 = newY0
      chosen.a = baseA
    }

    return chosen
  },

  originalData: {
    mode: 'solve_c',
    a: 2,
    c: -1,
    x0: 2,
    y0: 7, // 2*4-1 = 7
  },

  constraint() {
    return true
  },

  task({ data }) {
    const { mode, a, c, x0, y0 } = data
    return (
      <>
        {mode === 'solve_c' ? (
          <p>
            Gegeben ist die Parabel mit der Gleichung<br></br>
            <InlineMath
              math={`y = ${a === 1 ? '' : a === -1 ? '-' : pp(a)}\\,x^{2} + c`}
            />{' '}
            und der Punkt <InlineMath math={`P(${x0}\\mid ${y0})`} />, der auf
            der Parabel liegt.
          </p>
        ) : (
          <p>
            Gegeben ist die Parabel mit der Gleichung<br></br>
            <InlineMath math={`y = a\\,x^{2} ${pp(c, 'merge_op')}`} /> und der
            Punkt <InlineMath math={`P(${x0}\\mid ${y0})`} />, der auf der
            Parabel liegt.
          </p>
        )}
        <p>
          Bestimme{' '}
          {mode === 'solve_c' ? (
            <>
              <InlineMath math={`c`} />
            </>
          ) : (
            <>
              <InlineMath math={`a`} />
            </>
          )}{' '}
          und gib die Gleichung der Parabel an.
        </p>
      </>
    )
  },

  solution({ data }) {
    const { mode, a, c, x0, y0 } = data
    if (mode === 'solve_c') {
      const cVal = y0 - a * x0 * x0
      return (
        <>
          <p>
            <InlineMath
              math={`y = ${a === 1 ? '' : a === -1 ? '-' : pp(a)}x^2 + c`}
            />
          </p>

          <p>
            <InlineMath
              math={`${y0} = ${a === 1 ? '1' : a === -1 ? '(-1)' : pp(a)} \\cdot ${pp(x0, 'embrace_neg')}^2 + c`}
            />
          </p>
          <p>
            <InlineMath math={`${y0} = ${pp(a * x0 * x0)} + c`} />
          </p>
          <p>
            <InlineMath math={`c = ${y0} - ${pp(a * x0 * x0)} = ${cVal}`} />
          </p>
        </>
      )
    }
    const aVal = (y0 - c) / (x0 * x0)
    return (
      <>
        <p>
          <InlineMath math={`y = a x^2 ${pp(c, 'merge_op')}`} />
        </p>

        <p>
          <InlineMath
            math={`${y0} = a \\cdot ${pp(x0, 'embrace_neg')}^2 ${pp(c, 'merge_op')}`}
          />
        </p>
        <p>
          <InlineMath math={`${y0} - (${pp(c)}) = a \\cdot ${x0 * x0}`} />
        </p>
        <p>
          <InlineMath
            math={`a = \\dfrac{${y0 - c}}{${x0 * x0}} = ${pp(aVal)}`}
          />
        </p>
      </>
    )
  },
}
