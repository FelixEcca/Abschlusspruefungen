import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'prismVolume'

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

const kind: Kind = 'prismVolume'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([12, 18, 24, 30])
  const b = rng.randomItemFromArray([5, 8, 10, 12])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: a * b,
    result2: 0,
    label: pick(rng, ['Prisma', 'Bauteil', 'Verpackungsteil', 'Glaskörper']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein {data.label} hat eine Grundfläche von{' '}
      <InlineMath math={`${data.a}\\,\\mathrm{cm^2}`} /> und eine Höhe von{' '}
      <InlineMath math={`${data.b}\\,\\mathrm{cm}`} />. Berechne das Volumen.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`V=G\\cdot h=${data.a}\\cdot${data.b}=${data.result}\\,\\mathrm{cm^3}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9645: Exercise<DATA> = {
  title: 'Volumen eines Prismas mit Grundfläche',
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
