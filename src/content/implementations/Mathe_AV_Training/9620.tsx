import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { pick } from './_avTrainingShared'

type Kind = 'ratioParts'

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

const kind: Kind = 'ratioParts'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4])
  const b = rng.randomItemFromArray([1, 2, 3])
  const c = (a + b) * rng.randomItemFromArray([10, 12, 15, 20])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: (c / (a + b)) * a,
    result2: (c / (a + b)) * b,
    label: pick(rng, [
      'Saft und Wasser',
      'Farbe und Wasser',
      'Sirup und Wasser',
      'Sand und Kies',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Eine Mischung besteht aus {data.label} im Verhältnis{' '}
      <b>
        {data.a}:{data.b}
      </b>
      . Insgesamt sind es <b>{data.c} Liter</b>. Berechne beide Anteile.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}+${data.b}=${data.a + data.b}`} />
      <br />
      <InlineMath
        math={`1.\\ Anteil=${pp(data.result)}\\,\\mathrm l,\\quad 2.\\ Anteil=${pp(data.result2)}\\,\\mathrm l`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9620: Exercise<DATA> = {
  title: 'Mischung im Verhältnis',
  source: 'Dreisatz',
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
