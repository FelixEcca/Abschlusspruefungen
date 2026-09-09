import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'compositeArea'

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

const kind: Kind = 'compositeArea'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([8, 10, 12])
  const b = rng.randomItemFromArray([5, 6, 7])
  const c = rng.randomItemFromArray([2, 3, 4])
  const d = rng.randomItemFromArray([1, 2, 3])
  return {
    kind,
    a,
    b,
    c,
    d,
    result: a * b - c * d,
    result2: a * b,
    label: pick(rng, [
      'Werkstück',
      'Gartenfläche',
      'Teppichstück',
      'Holzplatte',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Aus einer rechteckigen {data.label}{' '}
      <InlineMath
        math={`${data.a}\\,\\mathrm m\\times${data.b}\\,\\mathrm m`}
      />{' '}
      wird ein kleineres Rechteck{' '}
      <InlineMath
        math={`${data.c}\\,\\mathrm m\\times${data.d}\\,\\mathrm m`}
      />{' '}
      herausgeschnitten. Berechne die Restfläche.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}\\cdot${data.b}=${data.result2}`} />
      <br />
      <InlineMath
        math={`${data.result2}-${data.c}\\cdot${data.d}=${data.result}\\,\\mathrm{m^2}`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9644: Exercise<DATA> = {
  title: 'Restfläche berechnen',
  source: 'Figuren und Flächen',
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
