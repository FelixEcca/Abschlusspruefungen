import { Exercise } from '@/data/types'
import { BlockMath, InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Variable = 'x' | 'a' | 'm'

interface DATA {
  variable: Variable
  quadraticCoefficient: number
  linearCoefficient: number
  constant: number
  factor: number
  innerCoefficient: number
  innerConstant: number
}

function coefficient(value: number) {
  if (value === 1) return ''
  if (value === -1) return '-'
  return pp(value)
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a)
  let y = Math.abs(b)

  while (y !== 0) {
    ;[x, y] = [y, x % y]
  }

  return x
}

export const exercise13007: Exercise<DATA> = {
  title: 'Terme lesen und Faktoren ausklammern',
  source: 'Vorbereitungskurs Meister · Terme und Rechengesetze',
  useCalculator: false,
  duration: 8,
  generator(rng) {
    return {
      variable: rng.randomItemFromArray<Variable>(['x', 'a', 'm']),
      quadraticCoefficient: rng.randomIntBetween(2, 8),
      linearCoefficient:
        rng.randomIntBetween(2, 9) * (rng.randomBoolean() ? 1 : -1),
      constant: rng.randomIntBetween(2, 12) * (rng.randomBoolean() ? 1 : -1),
      factor: rng.randomIntBetween(2, 9),
      innerCoefficient: rng.randomIntBetween(2, 7),
      innerConstant:
        rng.randomIntBetween(2, 8) * (rng.randomBoolean() ? 1 : -1),
    }
  },
  originalData: {
    variable: 'x',
    quadraticCoefficient: 4,
    linearCoefficient: -7,
    constant: 5,
    factor: 3,
    innerCoefficient: 2,
    innerConstant: -5,
  },
  constraint({ data }) {
    return (
      data.factor > 1 &&
      data.innerCoefficient > 0 &&
      data.constant !== 0 &&
      gcd(data.innerCoefficient, data.innerConstant) === 1
    )
  },
  intro() {
    return <p>Lesen Sie die Struktur eines Terms, bevor Sie ihn verändern.</p>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        const v = data.variable
        return (
          <>
            <BlockMath
              math={`${data.quadraticCoefficient}${v}^2 ${pp(data.linearCoefficient, 'merge_op')}${v} ${pp(data.constant, 'merge_op')}`}
            />
            <p>
              Geben Sie den Koeffizienten von <InlineMath math={`${v}^2`} />,
              den Exponenten des ersten Summanden und das konstante Glied an.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <ul className="list-disc pl-6">
            <li>
              Koeffizient des quadratischen Terms: {data.quadraticCoefficient}
            </li>
            <li>Exponent: 2</li>
            <li>Konstantes Glied: {pp(data.constant)}</li>
          </ul>
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        const v = data.variable
        const first = data.factor * data.innerCoefficient
        const second = data.factor * data.innerConstant
        return (
          <>
            <p>Klammern Sie den größtmöglichen gemeinsamen Faktor aus.</p>
            <BlockMath
              math={`${coefficient(first)}${v} ${pp(second, 'merge_op')}`}
            />
          </>
        )
      },
      solution({ data }) {
        const v = data.variable
        const first = data.factor * data.innerCoefficient
        const second = data.factor * data.innerConstant
        return (
          <BlockMath
            math={`${coefficient(first)}${v} ${pp(second, 'merge_op')}=${data.factor}\\left(${data.innerCoefficient}${v} ${pp(data.innerConstant, 'merge_op')}\\right)`}
          />
        )
      },
    },
  ],
}
