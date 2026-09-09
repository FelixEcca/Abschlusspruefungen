import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'areaUnits'
type AreaUnit = 'mm^2' | 'cm^2' | 'dm^2' | 'm^2' | 'a'

interface Context {
  label: string
  fromUnit: AreaUnit
  toUnit: AreaUnit
  values: number[]
  factor: number
}

interface DATA {
  kind: Kind
  a: number
  b: number
  c: number
  d: number
  result: number
  result2: number
  label: string
  fromUnit: AreaUnit
  toUnit: AreaUnit
  factor: number
}

const kind: Kind = 'areaUnits'

function makeData(rng: any): DATA {
  const context = pick<Context>(rng, [
    {
      label: 'Ein Plakat',
      fromUnit: 'cm^2',
      toUnit: 'm^2',
      values: [12000, 25000, 36000, 48000, 75000],
      factor: 1 / 10000,
    },
    {
      label: 'Eine Tischplatte',
      fromUnit: 'dm^2',
      toUnit: 'cm^2',
      values: [12, 18, 25, 36, 48],
      factor: 100,
    },
    {
      label: 'Ein Bodenstück',
      fromUnit: 'm^2',
      toUnit: 'dm^2',
      values: [1.2, 1.5, 2.4, 3.6, 4.8],
      factor: 100,
    },
    {
      label: 'Ein Werkstück',
      fromUnit: 'mm^2',
      toUnit: 'cm^2',
      values: [1200, 2500, 3600, 4800, 7500],
      factor: 1 / 100,
    },
    {
      label: 'Eine Fensterscheibe',
      fromUnit: 'cm^2',
      toUnit: 'dm^2',
      values: [120, 250, 360, 480, 750],
      factor: 1 / 100,
    },
    {
      label: 'Eine Wandfläche',
      fromUnit: 'm^2',
      toUnit: 'cm^2',
      values: [1.2, 1.5, 2, 2.4, 3],
      factor: 10000,
    },
    {
      label: 'Ein Gartenbeet',
      fromUnit: 'a',
      toUnit: 'm^2',
      values: [0.5, 1.2, 1.5, 2, 2.4],
      factor: 100,
    },
    {
      label: 'Ein Schulhof',
      fromUnit: 'm^2',
      toUnit: 'a',
      values: [120, 250, 360, 480, 750],
      factor: 1 / 100,
    },
  ])
  const a = pick(rng, context.values)
  return {
    kind,
    a,
    b: 0,
    c: 0,
    d: 0,
    result: round2(a * context.factor),
    result2: 0,
    label: context.label,
    fromUnit: context.fromUnit,
    toUnit: context.toUnit,
    factor: context.factor,
  }
}

function taskFor(data: DATA) {
  return (
    <>
      {data.label} hat eine Fläche von{' '}
      <InlineMath math={`${pp(data.a)}\\,\\mathrm{${data.fromUnit}}`} />.
      Wandle die Fläche in{' '}
      <InlineMath math={`\\mathrm{${data.toUnit}}`} /> um.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`${pp(data.a)}\\,\\mathrm{${data.fromUnit}}\\cdot ${pp(data.factor)}=${pp(data.result)}\\,\\mathrm{${data.toUnit}}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9643: Exercise<DATA> = {
  title: 'Flächeneinheiten umwandeln',
  source: 'Einheiten',
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
