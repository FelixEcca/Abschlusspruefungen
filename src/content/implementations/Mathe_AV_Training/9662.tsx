import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'examPackage'

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

const kind: Kind = 'examPackage'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([30, 40, 50])
  const b = rng.randomItemFromArray([20, 25, 30])
  const c = rng.randomItemFromArray([10, 15, 20])
  const d = rng.randomItemFromArray([4, 5, 8])
  const volume = a * b * c
  return {
    kind,
    a,
    b,
    c,
    d,
    result: volume,
    result2: round2((volume * d) / 1000),
    label: pick(rng, ['Pakete', 'Kisten', 'Boxen', 'Behälter']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein einzelnes Packstück hat die Maße <b>{data.a} cm</b>,{' '}
      <b>{data.b} cm</b> und <b>{data.c} cm</b>. Es werden <b>{data.d}</b>{' '}
      {data.label} gepackt. Berechne das Gesamtvolumen in Litern.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`${data.a}\\cdot${data.b}\\cdot${data.c}=${data.result}\\,\\mathrm{cm^3}`}
      />
      <br />
      <InlineMath
        math={`${data.result}\\cdot${data.d}:1000=${pp(data.result2)}\\,\\mathrm l`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9662: Exercise<DATA> = {
  title: 'Mehrere Pakete und Volumen',
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
