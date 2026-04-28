// exercise4926.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  aNum: number
  aDen: number
  n: number
  cNum: number
  cDen: number

  bNum: number
  bDen: number
  bExp: number
}

function fracLatex(num: number, den: number) {
  if (den === 1) return `${num}`
  if (num < 0) return `-\\frac{${Math.abs(num)}}{${den}}`
  return `\\frac{${num}}{${den}}`
}

function coeffLatex(num: number, den: number, variable: string) {
  if (num === 0) return ''
  const absNum = Math.abs(num)
  const sign = num < 0 ? '-' : ''
  if (den === 1 && absNum === 1) return `${sign}${variable}`
  if (den === 1) return `${num}${variable}`
  return `${sign}\\frac{${absNum}}{${den}}${variable}`
}

function termLatex(num: number, den: number, exp: number) {
  const variable = exp === 1 ? 'x' : `x^{${exp}}`
  return coeffLatex(num, den, variable)
}

function plusConstLatex(num: number, den: number) {
  if (num === 0) return ''
  if (num > 0) return `+${fracLatex(num, den)}`
  return `${fracLatex(num, den)}`
}

export const exercise4926: Exercise<DATA> = {
  title: 'Ableitungen bilden',
  source: 'Ableitung',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const den = rng.randomItemFromArray([1, 2, 3, 4])
    let num = rng.randomIntBetween(-8, 8)
    while (num === 0) num = rng.randomIntBetween(-8, 8)

    const cDen = rng.randomItemFromArray([1, 2, 3, 4])
    const cNum = rng.randomIntBetween(-8, 8)

    const n = rng.randomIntBetween(2, 6)

    const bDen = rng.randomItemFromArray([1, 2, 3, 4])
    let bNum = rng.randomIntBetween(-8, 8)
    while (bNum === 0) bNum = rng.randomIntBetween(-8, 8)

    const bExp = rng.randomIntBetween(1, 5)

    return {
      aNum: num,
      aDen: den,
      n,
      cNum,
      cDen,
      bNum,
      bDen,
      bExp,
    }
  },

  originalData: {
    aNum: 3,
    aDen: 2,
    n: 4,
    cNum: -5,
    cDen: 1,
    bNum: 6,
    bDen: 1,
    bExp: 2,
  },

  constraint({ data }) {
    return data.aNum !== 0 && data.bNum !== 0 && data.n >= 2 && data.bExp >= 1
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Bestimmen Sie die Steigungsfunktion der Funktion <InlineMath
              math={`f`}
            />.</p>
            <InlineMath
              math={`f(x)=${termLatex(data.aNum, data.aDen, data.n)}${plusConstLatex(
                data.cNum,
                data.cDen,
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
            <InlineMath
              math={`f(x)=${termLatex(data.aNum, data.aDen, data.n)}${plusConstLatex(
                data.cNum,
                data.cDen,
              )}`}
            />
            <br />
            <InlineMath
              math={`f'(x)=${fracLatex(data.aNum, data.aDen)}\\cdot ${data.n}\\cdot x^{${data.n - 1}}`}
            />
            <br />
            <InlineMath math={`f'(x)=${termLatex(dNum, dDen, data.n - 1)}`} />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Gegeben ist die Steigungsfunktion. Geben Sie eine mögliche
              ursprüngliche Funktion an.
            </p>
            <InlineMath
              math={`f'(x)=${termLatex(data.bNum, data.bDen, data.bExp)}`}
            />
          </>
        )
      },
      solution({ data }) {
        const newExp = data.bExp + 1
        const fDen = data.bDen * newExp
        return (
          <>
            <InlineMath
              math={`f'(x)=${termLatex(data.bNum, data.bDen, data.bExp)}`}
            />
            <br />
            <p>Eine mögliche Lösung ist: </p>
            <InlineMath
              math={`f(x)=${termLatex(data.bNum, fDen, newExp)}+1`}
            />
           
          </>
        )
      },
    },
  ],
}