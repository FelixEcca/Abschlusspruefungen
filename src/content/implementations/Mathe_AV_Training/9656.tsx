import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'pieAngle'

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

const kind: Kind = 'pieAngle'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([10, 20, 25, 30, 40])
  return {
    kind,
    a,
    b: 0,
    c: 0,
    d: 0,
    result: round2((360 * a) / 100),
    result2: 0,
    label: pick(rng, [
      'Lieblingssport',
      'Schulweg',
      'Projektwahl',
      'Pausenverkauf',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      In einem Kreisdiagramm zum Thema {data.label} entspricht ein Anteil von{' '}
      <b>{data.a} %</b> einem Winkel. Berechne den Winkel.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`360^\\circ\\cdot\\frac{${data.a}}{100}=${pp(data.result)}^\\circ`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9656: Exercise<DATA> = {
  title: 'Winkel im Kreisdiagramm',
  source: 'Diagramme und Daten',
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
