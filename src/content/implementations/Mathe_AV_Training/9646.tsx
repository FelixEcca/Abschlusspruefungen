import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'litersFromCuboid'

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

const kind: Kind = 'litersFromCuboid'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([20, 25, 30, 40])
  const b = rng.randomItemFromArray([10, 20, 25])
  const c = rng.randomItemFromArray([10, 12, 15, 20])
  const volume = a * b * c
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: volume,
    result2: round2(volume / 1000),
    label: pick(rng, ['Behälter', 'Aquarium', 'Wassertank', 'Kunststoffbox']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein {data.label} ist <b>{data.a} cm</b> lang, <b>{data.b} cm</b> breit und{' '}
      <b>{data.c} cm</b> hoch. Berechne das Volumen in{' '}
      <InlineMath math={`\\mathrm{cm^3}`} /> und Litern.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`V=${data.a}\\cdot${data.b}\\cdot${data.c}=${data.result}\\,\\mathrm{cm^3}`}
      />
      <br />
      <InlineMath
        math={`${data.result}\\,\\mathrm{cm^3}=${pp(data.result2)}\\,\\mathrm l`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9646: Exercise<DATA> = {
  title: 'Behältervolumen in Litern',
  source: 'Körper und Volumen',
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
