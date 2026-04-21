// =====================================
// exercise4921.tsx
// Scheitelpunkt aus Hauptform
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { kürzeBruch } from '@/helper/kuerze-bruch'

/** Gibt eine Zahl als gekürzten LaTeX-Bruch zurück, falls sie kein Integer ist. */
function ppFrac(x: number): string {
  if (Number.isInteger(x)) return pp(x)
  const sign = x < 0 ? -1 : 1
  const abs = Math.abs(x)
  for (let denom = 2; denom <= 1000; denom++) {
    const numer = Math.round(abs * denom)
    if (Math.abs(numer / denom - abs) < 1e-9) {
      const { zähler, nenner } = kürzeBruch(numer, denom)
      return sign < 0
        ? `{-\\frac{${zähler}}{${nenner}}}`
        : `\\frac{${zähler}}{${nenner}}`
    }
  }
  return pp(x)
}

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise4921: Exercise<DATA> = {
  title: 'Parabel',
  source: 'Training',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    return {
      a: rng.randomItemFromArray([-3, -2, -1, 1, 2, 3]),
      b: rng.randomIntBetween(-8, 8),
      c: rng.randomIntBetween(-6, 6),
    }
  },

  originalData: { a: 1, b: 4, c: 1 },

  constraint({ data }) {
    const xs = -data.b / (2 * data.a)
    const ys = data.a * xs * xs + data.b * xs + data.c
    return data.a !== 0 && data.b != 0 && data.c != 0 && ys % 1 === 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Berechnen Sie den Scheitelpunkt <InlineMath math={`S(x|y)`} /> der
          Parabel.
        </p>
        <InlineMath
          math={`y=${pp(data.a)}x^2${pp(data.b, 'merge_op')}x${pp(
            data.c,
            'merge_op',
          )}`}
        />
      </>
    )
  },

  solution({ data }) {
    const xs = -data.b / (2 * data.a)
    const ys = data.a * xs * xs + data.b * xs + data.c

    return (
      <>
        <p>Mit der Formel für die x-Koordinate des Scheitels:</p>
        <InlineMath
          math={`x_S=\\frac{-b}{2a}=\\frac{${pp(-data.b)}}{2\\cdot${pp(
            data.a,
            'embrace_neg',
          )}}=${ppFrac(xs)}`}
        />
        <p>Einsetzen in die Gleichung:</p>
        <InlineMath
          math={`y_S=${pp(data.a)}\\cdot${pp(xs, 'embrace_neg')}^2${pp(
            data.b * xs,
            'merge_op',
          )}${pp(data.c, 'merge_op')}=${ppFrac(ys)}`}
        />
        <p>
          <b>
            <InlineMath math={`S(${ppFrac(xs)}\\mid${ppFrac(ys)})`} />
          </b>
        </p>
      </>
    )
  },
}
