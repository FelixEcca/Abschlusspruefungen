import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2 } from './_avTrainingShared'

type Kind = 'shoppingChange'

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

const kind: Kind = 'shoppingChange'

function makeData(rng: any): DATA {
  const price = rng.randomItemFromArray([7.35, 12.8, 18.45, 23.6, 31.75])
  const paid = rng.randomItemFromArray([20, 30, 50])
  return {
    kind,
    a: price,
    b: paid,
    c: 0,
    d: 0,
    result: round2(paid - price),
    result2: 0,
    label: 'Kasse',
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9609: Exercise<DATA> = {
  title: 'Rückgeld an der Kasse',
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
    return (
      <p>
        Ein Einkauf kostet <b>{pp(data.a)} €</b>. Bezahlt wird mit{' '}
        <b>{pp(data.b)} €</b>. Berechne das Rückgeld.
      </p>
    )
  },
  solution({ data }) {
    return (
      <>
        <InlineMath math={`${pp(data.b)}-${pp(data.a)}=${pp(data.result)}`} />
        <p>
          Das Rückgeld beträgt <b>{pp(data.result)} €</b>.
        </p>
      </>
    )
  },
}
