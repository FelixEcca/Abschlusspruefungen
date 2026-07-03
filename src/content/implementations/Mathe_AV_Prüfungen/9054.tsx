import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  doughKg: number
  bowls: number
  perBowl: number
}

function getGcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : getGcd(b, a % b)
}

function toFraction(value: number) {
  const denominator = 100
  const numerator = Math.round(value * denominator)
  const gcd = getGcd(numerator, denominator)

  return {
    numerator: numerator / gcd,
    denominator: denominator / gcd,
  }
}

function toMixedLatex(value: number) {
  const { numerator, denominator } = toFraction(value)
  const whole = Math.floor(numerator / denominator)
  const rest = numerator % denominator

  if (rest === 0) return `${whole}`
  if (whole === 0) return `\\frac{${rest}}{${denominator}}`

  return `${whole}\\,\\frac{${rest}}{${denominator}}`
}

export const exercise9054: Exercise<DATA> = {
  title: 'Teil 1: Gleichmässig aufteilen',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const doughKg = rng.randomItemFromArray([
      6, 6.5, 7.5, 8.25, 9.25, 9, 10.5, 12,
    ])
    const bowls = rng.randomItemFromArray([3, 4, 5, 6])
    const perBowl = doughKg / bowls
    return { doughKg, bowls, perBowl }
  },

  originalData: {
    doughKg: 8.25,
    bowls: 3,
    perBowl: 2.75,
  },

  constraint({ data }) {
    const fraction = toFraction(data.doughKg)

    return (
      data.bowls > 0 &&
      fraction.numerator % data.bowls === 0 &&
      data.perBowl === data.doughKg / data.bowls
    )
  },

  task({ data }) {
    return (
      <>
        <p>
          Sie teilen <InlineMath math={toMixedLatex(data.doughKg)} /> kg
          Waffelteig auf {data.bowls} Schüsseln gleichmässig auf.
        </p>
        <p>Berechnen Sie, wie viel Teig danach in jeder Schüssel ist.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${toMixedLatex(data.doughKg)}:${data.bowls}= \\frac{${toFraction(data.doughKg).numerator}}{${toFraction(data.doughKg).denominator}}:${data.bowls}= \\frac{${toFraction(data.doughKg).numerator / data.bowls}}{${toFraction(data.doughKg).denominator}}`}
        />{' '}
        <p>
          Danach sind{' '}
          <InlineMath
            math={`\\frac{${toFraction(data.doughKg).numerator / data.bowls}}{${toFraction(data.doughKg).denominator}}=${pp(data.perBowl)}`}
          />{' '}
          kg Teig in jeder Schüssel.
        </p>
      </>
    )
  },
}
