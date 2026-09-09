import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'offerCompare'

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

const kind: Kind = 'offerCompare'

function makeData(rng: any): DATA {
  const options = [
    [80, 20, 75, 10],
    [120, 25, 100, 5],
    [60, 10, 55, 5],
    [150, 30, 120, 10],
  ]
  const [a, b, c, d] = rng.randomItemFromArray(options)
  return {
    kind,
    a,
    b,
    c,
    d,
    result: round2(a * (1 - b / 100)),
    result2: round2(c * (1 - d / 100)),
    label: pick(rng, ['Rucksack', 'Werkzeugkoffer', 'Jacke', 'Sportschuhe']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Vergleiche zwei Angebote für {data.label}: A kostet <b>{data.a} €</b> mit{' '}
      <b>{data.b} %</b> Rabatt. B kostet <b>{data.c} €</b> mit <b>{data.d} %</b>{' '}
      Rabatt. Welches Angebot ist günstiger?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`A=${data.a}\\cdot(1-\\frac{${data.b}}{100})=${pp(data.result)}\\,€`}
      />
      <br />
      <InlineMath
        math={`B=${data.c}\\cdot(1-\\frac{${data.d}}{100})=${pp(data.result2)}\\,€`}
      />
      <p>
        {data.result < data.result2 ? 'Angebot A' : 'Angebot B'} ist günstiger.
      </p>
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9654: Exercise<DATA> = {
  title: 'Zwei Angebote vergleichen',
  source: 'Prozentrechnung',
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
    return <p>{taskFor(data)}</p>
  },
  solution({ data }) {
    return <>{solutionFor(data)}</>
  },
}
