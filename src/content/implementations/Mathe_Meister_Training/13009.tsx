import { Exercise } from '@/data/types'
import { BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Variable = 'x' | 'a' | 'z'

interface DATA {
  variable: Variable
  k: number
  sign: 1 | -1
  secondValue: number
}

function binomial(data: DATA) {
  return `(${data.variable}${data.sign > 0 ? '+' : '-'}${data.k})^2`
}

function expanded(data: DATA) {
  const middle = 2 * data.sign * data.k
  return `${data.variable}^2 ${pp(middle, 'merge_op')}${data.variable}+${data.k ** 2}`
}

export const exercise13009: Exercise<DATA> = {
  title: 'Binomische Formeln erkennen und anwenden',
  source: 'Vorbereitungskurs Meister · Terme und Rechengesetze',
  useCalculator: false,
  duration: 9,
  generator(rng) {
    return {
      variable: rng.randomItemFromArray<Variable>(['x', 'a', 'z']),
      k: rng.randomIntBetween(2, 9),
      sign: rng.randomBoolean() ? 1 : -1,
      secondValue: rng.randomIntBetween(2, 9),
    }
  },
  originalData: { variable: 'x', k: 4, sign: 1, secondValue: 7 },
  constraint({ data }) {
    return data.k > 0 && data.secondValue > 0 && data.k !== data.secondValue
  },
  intro() {
    return <p>Achten Sie besonders auf den mittleren Term.</p>
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Wenden Sie die passende binomische Formel an.</p>
            <BlockMath math={binomial(data)} />
          </>
        )
      },
      solution({ data }) {
        return <BlockMath math={`${binomial(data)}=${expanded(data)}`} />
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Schreiben Sie den Term als Quadrat eines Binoms.</p>
            <BlockMath math={expanded(data)} />
          </>
        )
      },
      solution({ data }) {
        return <BlockMath math={`${expanded(data)}=${binomial(data)}`} />
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Vereinfachen Sie mithilfe der dritten binomischen Formel.</p>
            <BlockMath
              math={`(${data.variable}+${data.secondValue})(${data.variable}-${data.secondValue})`}
            />
          </>
        )
      },
      solution({ data }) {
        return (
          <BlockMath
            math={`(${data.variable}+${data.secondValue})(${data.variable}-${data.secondValue})=${data.variable}^2-${data.secondValue ** 2}`}
          />
        )
      },
    },
  ],
}
