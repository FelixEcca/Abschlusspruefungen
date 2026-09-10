import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { gcd } from './_avTrainingShared'

type Kind = 'fractionCompare'

interface DATA {
  kind: Kind
  a: number
  b: number
  c: number
  d: number
  result: number
  result2: number
  label: string
}

const kind: Kind = 'fractionCompare'
const expandColor = 'text-orange-500'

function makeData(rng: any): DATA {
  const pairs = [
    [1, 2, 3, 5],
    [2, 3, 3, 4],
    [3, 8, 2, 5],
    [4, 6, 5, 8],
  ]
  const [a, b, c, d] = rng.randomItemFromArray(pairs)
  return {
    kind,
    a,
    b,
    c,
    d,
    result: a / b > c / d ? 1 : 2,
    result2: 0,
    label: 'Vergleich',
  }
}

function ExpandedFraction({
  numerator,
  denominator,
  factor,
}: {
  numerator: number
  denominator: number
  factor: number
}) {
  return (
    <span className="mx-1 inline-flex translate-y-1 flex-col text-center align-middle leading-none">
      <span className="border-b border-black px-1 pb-0.5">
        {numerator} · <span className={expandColor}>{factor}</span>
      </span>
      <span className="px-1 pt-0.5">
        {denominator} · <span className={expandColor}>{factor}</span>
      </span>
    </span>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9617: Exercise<DATA> = {
  title: 'Brüche im Vergleich',
  source: 'Bruchrechnen',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return makeData(rng)
  },
  originalData,
  constraint({ data }) {
    return data.kind === kind && Number.isFinite(data.result)
  },
  task({ data }) {
    return (
      <p>
        Vergleiche die Brüche{' '}
        <InlineMath math={`\\frac{${data.a}}{${data.b}}`} /> und{' '}
        <InlineMath math={`\\frac{${data.c}}{${data.d}}`} />. Welcher Bruch ist
        größer?
      </p>
    )
  },
  solution({ data }) {
    const common = (data.b * data.d) / gcd(data.b, data.d)
    const factor1 = common / data.b
    const factor2 = common / data.d
    const expanded1 = data.a * factor1
    const expanded2 = data.c * factor2
    const sign = data.result === 1 ? '>' : '<'

    return (
      <>
        <p>Die Brüche werden zuerst auf den gleichen Nenner erweitert.</p>
        <InlineMath math={`\\text{gemeinsamer Nenner: }${common}`} />
        <p>Erweitere den ersten Bruch mit {factor1}.</p>
        <div className="my-2">
          <InlineMath math={`\\frac{${data.a}}{${data.b}}=`} />
          <ExpandedFraction
            numerator={data.a}
            denominator={data.b}
            factor={factor1}
          />
          <InlineMath math={`=\\frac{${expanded1}}{${common}}`} />
        </div>
        <p>Erweitere den zweiten Bruch mit {factor2}.</p>
        <div className="my-2">
          <InlineMath math={`\\frac{${data.c}}{${data.d}}=`} />
          <ExpandedFraction
            numerator={data.c}
            denominator={data.d}
            factor={factor2}
          />
          <InlineMath math={`=\\frac{${expanded2}}{${common}}`} />
        </div>
        <p>
          Jetzt haben beide Brüche den gleichen Nenner. Vergleiche die Zähler.
        </p>
        <InlineMath
          math={`\\frac{${expanded1}}{${common}}${sign}\\frac{${expanded2}}{${common}}`}
        />
        <br />
        <InlineMath
          math={`\\frac{${data.a}}{${data.b}}${sign}\\frac{${data.c}}{${data.d}}`}
        />
        <p>Der {data.result === 1 ? 'erste' : 'zweite'} Bruch ist größer.</p>
      </>
    )
  },
}
