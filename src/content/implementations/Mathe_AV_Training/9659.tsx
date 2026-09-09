import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'examAreaPercent'

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

const kind: Kind = 'examAreaPercent'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([8, 10, 12])
  const b = rng.randomItemFromArray([5, 6, 8])
  const c = rng.randomItemFromArray([10, 20, 25])
  const area = a * b
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: area,
    result2: round2((area * c) / 100),
    label: pick(rng, [
      'Raum',
      'Lagerfläche',
      'Gartenstück',
      'Werkstattbereich',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Eine rechteckige Fläche ({data.label}) ist <b>{data.a} m</b> lang und{' '}
      <b>{data.b} m</b> breit. <b>{data.c} %</b> der Fläche sollen frei bleiben.
      Berechne Gesamtfläche und freie Fläche.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`A=${data.a}\\cdot${data.b}=${data.result}\\,\\mathrm{m^2}`}
      />
      <br />
      <InlineMath
        math={`${data.result}\\cdot\\frac{${data.c}}{100}=${pp(data.result2)}\\,\\mathrm{m^2}`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9659: Exercise<DATA> = {
  title: 'Fläche mit Prozentanteil',
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
