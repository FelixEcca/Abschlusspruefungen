import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick, gcd } from './_avTrainingShared'

type Kind = 'reduceContext'

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

const kind: Kind = 'reduceContext'

function makeData(rng: any): DATA {
  const options = [
    [6, 18],
    [8, 20],
    [12, 30],
    [15, 35],
    [18, 42],
  ]
  const [a, b] = rng.randomItemFromArray(options)
  const g = gcd(a, b)
  return {
    kind,
    a,
    b,
    c: a / g,
    d: b / g,
    result: 0,
    result2: 0,
    label: pick(rng, [
      'Sportschuhe dabei',
      'Hausaufgaben abgegeben',
      'Werkzeug mitgebracht',
      'sich angemeldet',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      In einer Klasse haben <b>{data.a}</b> von <b>{data.b}</b> Personen{' '}
      {data.label}. Gib den Anteil als gekürzten Bruch an.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`\\frac{${data.a}}{${data.b}}=\\frac{${data.c}}{${data.d}}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9647: Exercise<DATA> = {
  title: 'Anteil als gekürzter Bruch',
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
    return <p>{taskFor(data)}</p>
  },
  solution({ data }) {
    return <>{solutionFor(data)}</>
  },
}
