import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'areaUnits'

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

const kind: Kind = 'areaUnits'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([12000, 25000, 36000, 48000, 75000])
  return {
    kind,
    a,
    b: 0,
    c: 0,
    d: 0,
    result: round2(a / 10000),
    result2: 0,
    label: pick(rng, ['Plakat', 'Tischplatte', 'Bodenstück', 'Werkstück']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein {data.label} hat eine Fläche von{' '}
      <InlineMath math={`${data.a}\\,\\mathrm{cm^2}`} />. Wandle die Fläche in{' '}
      <InlineMath math={`\\mathrm{m^2}`} /> um.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`${data.a}\\,\\mathrm{cm^2}=${pp(data.result)}\\,\\mathrm{m^2}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9643: Exercise<DATA> = {
  title: 'Quadratzentimeter in Quadratmeter',
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
