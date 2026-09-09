import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'examRecipe'

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

const kind: Kind = 'examRecipe'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4])
  const b = rng.randomItemFromArray([250, 300, 400])
  const c = rng.randomItemFromArray([6, 8, 10])
  const d = rng.randomItemFromArray([2, 4, 5])
  return {
    kind,
    a,
    b,
    c,
    d,
    result: round2((b / a) * c),
    result2: round2(((b / a) * c) / d),
    label: pick(rng, ['Nudeln', 'Reis', 'Kartoffeln', 'Mehl']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Für <b>{data.a}</b> Personen werden <b>{data.b} g</b> {data.label}{' '}
      benötigt. Berechne die Menge für <b>{data.c}</b> Personen und teile sie
      anschließend gleichmäßig auf <b>{data.d}</b> Portionen auf.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`${data.b}:${data.a}\\cdot${data.c}=${pp(data.result)}\\,\\mathrm g`}
      />
      <br />
      <InlineMath
        math={`${pp(data.result)}:${data.d}=${pp(data.result2)}\\,\\mathrm g`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9661: Exercise<DATA> = {
  title: 'Rezept und Portionen',
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
