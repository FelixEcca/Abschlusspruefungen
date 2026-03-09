import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  n: number
  c: number
  x0: number
  hasTwoSolutions: boolean
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function functionLatex(a: number, n: number, c: number) {
  const cSign = c >= 0 ? '+' : '−'
  const cAbs = pp(Math.abs(c))
  return `f(x) = ${pp(a)}x^{${n}} ${cSign} ${cAbs}`
}

export const exercise5114: Exercise<DATA> = {
  title: 'Gleichungen lösen durch Wurzel ziehen',
  source: 'Nullstellen / Polynome',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const n = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const a = rng.randomIntBetween(1, 4)
    const x0 = rng.randomItemFromArray([2, 3, 4])

    const hasTwoSolutions = n % 2 === 0
    const c = -a * Math.pow(x0, n)

    return { a, n, c, x0, hasTwoSolutions }
  },

  originalData: {
    a: 2,
    n: 4,
    x0: 3,
    c: -2 * Math.pow(3, 4),
    hasTwoSolutions: true,
  },

  constraint({ data }) {
    return data.a !== 0 && data.n > 0 && data.x0 > 0
  },

  task({ data }) {
    const { a, n, c } = data

    return (
      <>
        <p>Bestimme die Nullstelle(n) der folgenden Funktion.</p>
        <p>
          <InlineMath math={functionLatex(a, n, c)} />
        </p>
      </>
    )
  },

  solution({ data }) {
    const { a, n, c, x0, hasTwoSolutions } = data
    const rhs = round2(-c / a)

    if (hasTwoSolutions) {
      return (
        <>
          <InlineMath math={'f(x) = 0'} />
          <br />
          <InlineMath
            math={`${pp(a)}x^{${n}} ${c >= 0 ? '+' : '−'} ${pp(
              Math.abs(c),
            )} = 0`}
          />
          <br />
          <InlineMath math={`${pp(a)}x^{${n}} = ${pp(-c)}`} />
          <br />
          <InlineMath math={`x^{${n}} = ${pp(rhs)}`} />
          <br />
          <InlineMath math={`x = \\pm \\sqrt[${n}]{${pp(rhs)}}`} />
          <br />
          <InlineMath
            math={`x_1 = ${pp(-x0)}\\quad\\text{und}\\quad x_2 = ${pp(x0)}`}
          />
        </>
      )
    }

    return (
      <>
        <InlineMath math={'f(x) = 0'} />
        <br />
        <InlineMath
          math={`${pp(a)}x^{${n}} ${c >= 0 ? '+' : '−'} ${pp(Math.abs(c))} = 0`}
        />
        <br />
        <InlineMath math={`${pp(a)}x^{${n}} = ${pp(-c)}`} />
        <br />
        <InlineMath math={`x^{${n}} = ${pp(rhs)}`} />
        <br />
        <InlineMath math={`x = \\sqrt[${n}]{${pp(rhs)}}`} />
        <br />
        <InlineMath math={`x = ${pp(x0)}`} />
      </>
    )
  },
}
