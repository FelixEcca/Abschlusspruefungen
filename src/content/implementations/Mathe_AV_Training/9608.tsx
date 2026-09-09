import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type Kind = 'roundMoney'

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

const kind: Kind = 'roundMoney'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([12.49, 18.95, 27.51, 43.89, 68.12])
  return {
    kind,
    a,
    b: Math.round(a),
    c: 0,
    d: 0,
    result: Math.round(a),
    result2: 0,
    label: 'Einkauf',
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein Einkauf kostet <b>{pp(data.a)} €</b>. Runde den Betrag auf ganze €.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      Gerundet auf ganze € sind es <b>{pp(data.result)} €</b>.
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9608: Exercise<DATA> = {
  title: 'Beträge sinnvoll runden',
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
