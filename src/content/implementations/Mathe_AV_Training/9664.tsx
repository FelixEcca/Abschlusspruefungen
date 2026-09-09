import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'examDataPercent'

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

const kind: Kind = 'examDataPercent'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([20, 24, 30, 40])
  const b = rng.randomItemFromArray([5, 6, 8, 10])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: a - b,
    result2: round2((b / a) * 100),
    label: pick(rng, ['Arbeiten', 'Tests', 'Werkstücke', 'Bestellungen']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Von <b>{data.a}</b> abgegebenen {data.label} sind <b>{data.b}</b> noch
      fehlerhaft. Berechne die Anzahl der fehlerfreien Ergebnisse und den
      Prozentanteil der fehlerhaften Ergebnisse.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}-${data.b}=${data.result}`} />
      <br />
      <InlineMath
        math={`${data.b}:${data.a}\\cdot100=${pp(data.result2)}\\,\\%`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9664: Exercise<DATA> = {
  title: 'Daten mit Prozentanteil',
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
