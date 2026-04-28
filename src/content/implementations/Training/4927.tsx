// exercise4927.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  aNum: number
  aDen: number
  n: number
  c: number
  x0: number
  slope: number
}

function fracLatex(num: number, den: number) {
  if (den === 1) return `${num}`
  if (num < 0) return `-\\frac{${Math.abs(num)}}{${den}}`
  return `\\frac{${num}}{${den}}`
}

function termLatex(num: number, den: number, exp: number) {
  const variable = exp === 1 ? 'x' : `x^{${exp}}`
  if (den === 1) return `${num}${variable}`
  return `${fracLatex(num, den)}${variable}`
}

export const exercise4927: Exercise<DATA> = {
  title: 'Steigung an einer Stelle',
  source: 'Ableitung',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const aDen = rng.randomItemFromArray([1, 2, 3, 4])
    let aNum = rng.randomIntBetween(-6, 6)
    while (aNum === 0) aNum = rng.randomIntBetween(-6, 6)

    const n = rng.randomIntBetween(2, 5)
    const c = rng.randomIntBetween(-5, 5)
    const x0 = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])
    const slope = (aNum / aDen) * n * Math.pow(x0, n - 1)

    return { aNum, aDen, n, c, x0, slope }
  },

  originalData: {
    aNum: 2,
    aDen: 1,
    n: 3,
    c: -4,
    x0: 2,
    slope: 24,
  },

  constraint({ data }) {
    return data.aNum !== 0 && Number.isFinite(data.slope)
  },

  task({ data }) {
    return (
      <>
        <p>
          Berechnen Sie die Steigung der Funktion an der Stelle{' '}
          <InlineMath math={`x_0=${pp(data.x0)}`} />.
        </p>
        <InlineMath
          math={`f(x)=${termLatex(data.aNum, data.aDen, data.n)}${data.c >= 0 ? '+' : ''}${pp(
            data.c,
          )}`}
        />
      </>
    )
  },

  solution({ data }) {
    const dNum = data.aNum * data.n
    const dDen = data.aDen

    return (
      <>
      <p>Bestimmen Sie erst die Steigungsfunktion <InlineMath
              math={`f'`}
            /></p>
        <InlineMath
          math={`f'(x)=${fracLatex(data.aNum, data.aDen)}\\cdot ${data.n}\\cdot x^{${data.n - 1}}`}
        />
        <br />
        <InlineMath
          math={`f'(x)=${termLatex(dNum, dDen, data.n - 1)}`}
        />
        <br /><p>Setze <InlineMath
          math={`x_0=${pp(data.x0)}`}
        /> ein:</p>
        <InlineMath
          math={`f'(${pp(data.x0)})=${fracLatex(dNum, dDen)}\\cdot ${pp(
            data.x0,
            'embrace_neg',
          )}^{${data.n - 1}}`}
        />
        <br />
        <InlineMath math={`f'(${pp(data.x0)})=${pp(data.slope)}`} />
      </>
    )
  },
}