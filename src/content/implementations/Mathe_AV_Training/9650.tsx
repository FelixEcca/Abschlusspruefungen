import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'unitPrice'

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

const kind: Kind = 'unitPrice'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4, 5])
  const b = rng.randomItemFromArray([6, 9, 12, 15, 18])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: round2(b / a),
    result2: 0,
    label: pick(rng, ['Äpfel', 'Birnen', 'Kartoffeln', 'Tomaten']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      {' '}
      <b>{data.a} kg</b> {data.label} kosten <b>{pp(data.b)} €</b>. Berechne den
      Preis für <b>1 kg</b>.
    </>
  )
}

function solutionFor(data: DATA) {
  return <InlineMath math={`${pp(data.b)}:${data.a}=${pp(data.result)}\\,€`} />
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9650: Exercise<DATA> = {
  title: 'Kilopreis berechnen',
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
