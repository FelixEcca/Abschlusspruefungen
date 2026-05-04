// exercise5118.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'quadratic' | 'cubic'

interface DATA {
  mode: Mode
  a: number
  b: number
  c: number
  d: number
  x0: number
  h: number
  fx0: number
  fx1: number
  slopeApprox: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function round5(x: number) {
  return Math.round(x * 100000) / 100000
}

function fValue(
  mode: Mode,
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
) {
  if (mode === 'quadratic') return a * x * x + b * x + d
  return a * x * x * x + b * x * x + c * x + d
}

function termLatex(mode: Mode, a: number, b: number, c: number, d: number) {
  if (mode === 'quadratic') {
    return `${pp(a)}x^2${pp(b, 'merge_op')}x${pp(d, 'merge_op')}`
  }

  return `${pp(a)}x^3${pp(b, 'merge_op')}x^2${pp(c, 'merge_op')}x${pp(
    d,
    'merge_op',
  )}`
}

export const exercise5118: Exercise<DATA> = {
  title: 'Steigung näherungsweise bestimmen',
  source: 'Ableitung',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray(['quadratic', 'cubic'])
    let a = rng.randomIntBetween(-3, 3)
    while (a === 0) a = rng.randomIntBetween(-3, 3)

    const b = rng.randomIntBetween(-3, 3)
    const c = rng.randomIntBetween(-3, 3)
    const d = rng.randomIntBetween(-5, 5)

    const x0 = rng.randomItemFromArray([-3, -2, -1, 0, 1, 2, 3])
    const h = 0.001

    const fx0 = round5(fValue(mode, a, b, c, d, x0))
    const fx1 = round5(fValue(mode, a, b, c, d, x0 + h))
    const slopeApprox = round2((fx0 - fx1) / (x0 - (x0 + h)))

    return { mode, a, b, c, d, x0, h, fx0, fx1, slopeApprox }
  },

  originalData: {
    mode: 'quadratic',
    a: 2,
    b: -3,
    c: 1,
    d: 1,
    x0: 2,
    h: 0.001,
    fx0: round5(fValue('quadratic', 2, -3, 0, 1, 2)),
    fx1: round5(fValue('quadratic', 2, -3, 0, 1, 2.001)),
    slopeApprox: round2(
      (round5(fValue('quadratic', 2, -3, 0, 1, 2)) -
        round5(fValue('quadratic', 2, -3, 0, 1, 2.001))) /
        (2 - 2.001),
    ),
  },

  constraint({ data }) {
    return (
      data.h === 0.001 &&
      Number.isFinite(data.slopeApprox) &&
      data.a !== 0 &&
      data.b !== 0 &&
      data.c !== 0 &&
      data.d !== 0
    )
  },

  task({ data }) {
    return (
      <>
        <p>
          Bestimmen Sie die Steigung der Funktion näherungsweise an der Stelle{' '}
          <InlineMath math={`x_0=${pp(data.x0)}`} />.
        </p>
        <p>
          Verwenden Sie <InlineMath math={`\\Delta x = 0{,}001`} />.
        </p>
        <p>
          <InlineMath
            math={`f(x)=${termLatex(data.mode, data.a, data.b, data.c, data.d)}`}
          />
        </p>
      </>
    )
  },

  solution({ data }) {
    const x1 = data.x0 + data.h

    return (
      <>
        <p>Zuerst werden die beiden Funktionswerte berechnet.</p>
        <InlineMath math={`f(${pp(data.x0)})=${pp(data.fx0)}`} />
        <br />
        <InlineMath math={`f(${pp(x1)})=${pp(data.fx1)}`} />

        <p>Dann wird die Steigung näherungsweise berechnet.</p>
        <InlineMath
          math={`m \\approx \\frac{f(x_0)-f(x_0+0{,}001)}{x_0-(x_0+0{,}001)}`}
        />
        <br />
        <InlineMath
          math={`m \\approx \\frac{${pp(data.fx0)}-${pp(data.fx1)}}{${pp(
            data.x0,
          )}-${pp(x1)}}`}
        />
        <br />
        <InlineMath math={`m \\approx ${pp(data.slopeApprox)}`} />
      </>
    )
  },
}
