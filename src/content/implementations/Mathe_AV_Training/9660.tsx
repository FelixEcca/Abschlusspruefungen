import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'examCashDiscount'

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

const kind: Kind = 'examCashDiscount'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([45, 60, 80, 120])
  const b = rng.randomItemFromArray([10, 15, 20, 25])
  const c = rng.randomItemFromArray([50, 100, 150])
  const newPrice = round2(a * (1 - b / 100))
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: newPrice,
    result2: round2(c - newPrice),
    label: pick(rng, ['Werkzeug', 'Rucksack', 'Jacke', 'Lernmaterial']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein Artikel ({data.label}) kostet <b>{data.a} €</b>. Es gibt{' '}
      <b>{data.b} %</b> Rabatt. Bezahlt wird mit <b>{data.c} €</b>. Berechne den
      neuen Preis und das Rückgeld.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`${data.a}\\cdot(1-\\frac{${data.b}}{100})=${pp(data.result)}\\,€`}
      />
      <br />
      <InlineMath
        math={`${data.c}-${pp(data.result)}=${pp(data.result2)}\\,€`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9660: Exercise<DATA> = {
  title: 'Einkauf mit Rabatt und Rückgeld',
  source: 'Prüfungsvorbereitung',
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
