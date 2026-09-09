import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'percentValueContext'

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

const kind: Kind = 'percentValueContext'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([60, 80, 120, 160, 200])
  const b = rng.randomItemFromArray([10, 15, 20, 25, 40])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: round2((a * b) / 100),
    result2: 0,
    label: pick(rng, ['beschädigt', 'verspätet', 'belegt', 'richtig gelöst']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Insgesamt gibt es <b>{data.a}</b> Fälle. Davon sind <b>{data.b} %</b>{' '}
      {data.label}. Wie viele Fälle sind das?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`${data.a}\\cdot\\frac{${data.b}}{100}=${pp(data.result)}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9653: Exercise<DATA> = {
  title: 'Beschädigte Teile berechnen',
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
