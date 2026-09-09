import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'decimalLengths'

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

const kind: Kind = 'decimalLengths'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([1.25, 1.8, 2.35, 2.6])
  const b = rng.randomItemFromArray([0.75, 1.15, 1.4, 2.05])
  const c = rng.randomItemFromArray([0.3, 0.45, 0.6, 0.9])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: round2(a + b - c),
    result2: round2(a + b),
    label: pick(rng, ['Leiste', 'Kabelstück', 'Stoffband', 'Rohr']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein {data.label} ist <InlineMath math={`${pp(data.a)}\\,\\mathrm m`} />{' '}
      lang. Ein zweites Stück ist{' '}
      <InlineMath math={`${pp(data.b)}\\,\\mathrm m`} /> lang. Davon werden{' '}
      <InlineMath math={`${pp(data.c)}\\,\\mathrm m`} /> abgesägt. Wie viel
      bleibt übrig?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${pp(data.a)}+${pp(data.b)}=${pp(data.result2)}`} />
      <br />
      <InlineMath
        math={`${pp(data.result2)}-${pp(data.c)}=${pp(data.result)}\\,\\mathrm m`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9639: Exercise<DATA> = {
  title: 'Kommazahlen mit Längen',
  source: 'Grundlagen',
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
