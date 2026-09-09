import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'decimalPrice'

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

const kind: Kind = 'decimalPrice'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([1.5, 2.5, 3.2, 4.5])
  const b = rng.randomItemFromArray([1.8, 2.4, 3.6, 4.2])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: round2(a * b),
    result2: 0,
    label: pick(rng, ['Äpfel', 'Bananen', 'Tomaten', 'Kartoffeln']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein Kilogramm {data.label} kostet <b>{pp(data.b)} €</b>. Gekauft werden{' '}
      <b>{pp(data.a)} kg</b>. Berechne den Preis.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`${pp(data.a)}\\cdot${pp(data.b)}=${pp(data.result)}\\,€`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9640: Exercise<DATA> = {
  title: 'Preis mit Kommazahlen',
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
