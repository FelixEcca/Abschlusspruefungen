// =====================================
// exercise4922.tsx
// Schnittpunkt mit der y-Achse
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'hauptform' | 'scheitelform'

interface DATA {
  mode: Mode
  a: number
  b: number
  c: number
  xs: number
  ys: number
}

export const exercise4922: Exercise<DATA> = {
  title: 'Schnittpunkt mit der y-Achse berechnen',
  source: 'Training',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomBoolean() ? 'hauptform' : 'scheitelform'
    const a = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])
    const b = rng.randomIntBetween(-6, 6)
    const c = rng.randomIntBetween(-6, 6)
    const xs = rng.randomIntBetween(-3, 3)
    const ys = rng.randomIntBetween(-5, 5)
    return { mode, a, b, c, xs, ys }
  },

  originalData: {
    mode: 'hauptform',
    a: 2,
    b: -3,
    c: 4,
    xs: -1,
    ys: 2,
  },

  constraint({ data }) {
    return data.a !== 0 && data.b !== 0 && data.c !== 0 && data.ys !== 0 && data.xs !== 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Schnittpunkt der Parabel mit der y-Achse.</p>
        {data.mode === 'hauptform' ? (
          <InlineMath
            math={`y=${pp(data.a)}x^2${pp(data.b, 'merge_op')}x${pp(
              data.c,
              'merge_op',
            )}`}
          />
        ) : (
          <InlineMath
            math={`y=${pp(data.a)}(x${pp(-data.xs, 'merge_op')})^2${pp(
              data.ys,
              'merge_op',
            )}`}
          />
        )}
      </>
    )
  },

  solution({ data }) {
    if (data.mode === 'hauptform') {
      return (
        <>
          <p>Für den Schnittpunkt mit der y-Achse gilt <InlineMath
            math={`x = 0.`} /></p>
          <InlineMath
            math={`y=${pp(data.a)}\\cdot 0^2${pp(0, 'merge_op')}x${pp(
              data.c,
              'merge_op',
            )}`}
          />
          <br />
          <InlineMath math={`y=${pp(data.c)}`} />
          <p>
            <b>
              <InlineMath math={`S_y(0\\mid${pp(data.c)})`} />
            </b>
          </p>
        </>
      )
    }

    const y0 = data.a * (0 - data.xs) * (0 - data.xs) + data.ys
    return (
      <>
        <p>Für den Schnittpunkt mit der y-Achse gilt <InlineMath
            math={`x = 0`} />.</p>
        <InlineMath
          math={`y=${pp(data.a)}(0${pp(-data.xs, 'merge_op')})^2${pp(
            data.ys,
            'merge_op',
          )}`}
        />
        <br />
        <InlineMath math={`y=${pp(y0)}`} />
        <p>
          <b>
            <InlineMath math={`S_y(0\\mid${pp(y0)})`} />
          </b>
        </p>
      </>
    )
  },
}