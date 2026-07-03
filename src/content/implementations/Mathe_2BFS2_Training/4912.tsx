import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'simpleFrac' | 'oneSideFrac' | 'variableInDenom'

interface DATA {
  mode: Mode

  // Parameter
  a: number
  b: number
  c: number

  solution: number
}

export const exercise4912: Exercise<DATA> = {
  title: 'Einfache Bruchgleichungen',
  source: 'Gleichungen',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray([
      'simpleFrac',
      'oneSideFrac',
      'variableInDenom',
    ])

    let a = rng.randomIntBetween(1, 6)
    let b = rng.randomIntBetween(1, 6)
    let c = rng.randomIntBetween(1, 6)

    let solution = 0

    if (mode === 'simpleFrac') {
      // 1/x = a
      solution = 1 / a
    }

    if (mode === 'oneSideFrac') {
      // b = 1/x - c  → 1/x = b + c
      solution = 1 / (b + c)
    }

    if (mode === 'variableInDenom') {
      // c = a/(b*x) → c*b*x = a → x = a/(b*c)
      solution = a / (b * c)
    }

    return { mode, a, b, c, solution }
  },

  originalData: {
    mode: 'oneSideFrac',
    a: 1,
    b: 3,
    c: 2,
    solution: 1 / 5,
  },

  constraint({ data }) {
    return data.solution !== 0
  },

  task({ data }) {
    const { mode, a, b, c } = data

    return (
      <>
        <p>Lösen Sie die Gleichung:</p>

        {mode === 'simpleFrac' && (
          <InlineMath math={`\\frac{1}{x} = ${pp(a)}`} />
        )}

        {mode === 'oneSideFrac' && (
          <InlineMath math={`${pp(b)} = \\frac{1}{x} - ${pp(c)}`} />
        )}

        {mode === 'variableInDenom' && (
          <InlineMath math={`${pp(c)} = \\frac{${pp(a)}}{${pp(b)}x}`} />
        )}
      </>
    )
  },

  solution({ data }) {
    const { mode, a, b, c, solution } = data

    if (mode === 'simpleFrac') {
      return (
        <>
          <InlineMath math={`\\frac{1}{x} = ${pp(a)}`} />
          <br />
          <InlineMath math={`1 = ${pp(a)}x`} />
          <br />
          <InlineMath math={`x = \\frac{1}{${pp(a)}}`} />
        </>
      )
    }

    if (mode === 'oneSideFrac') {
      return (
        <>
          <InlineMath math={`${pp(b)} = \\frac{1}{x} - ${pp(c)}`} />
          <br />
          <InlineMath math={`${pp(b + c)} = \\frac{1}{x}`} />
          <br />
          <InlineMath math={`1 = ${pp(b + c)}x`} />
          <br />
          <InlineMath math={`x = \\frac{1}{${pp(b + c)}}`} />
        </>
      )
    }

    return (
      <>
        <InlineMath math={`${pp(c)} = \\frac{${pp(a)}}{${pp(b)}x}`} />
        <br />
        <InlineMath math={`${pp(c)}\\cdot ${pp(b)}x = ${pp(a)}`} />
        <br />
        <InlineMath math={`${pp(b * c)}x = ${pp(a)}`} />
        <br />
        <InlineMath math={`x = \\frac{${pp(a)}}{${pp(b * c)}}`} />
      </>
    )
  },
}
