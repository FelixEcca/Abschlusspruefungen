import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { pick } from './_avTrainingShared'

type Kind = 'examContext'

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

const kind: Kind = 'examContext'

function makeData(rng: any): DATA {
  const options = [
    [40, 20, 4],
    [48, 25, 3],
    [60, 30, 3],
    [80, 25, 4],
    [100, 20, 5],
    [120, 15, 3],
  ]
  const [a, b, c] = rng.randomItemFromArray(options)
  const result = (a * b) / 100
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result,
    result2: result / c,
    label: pick(rng, ['AG', 'Projektgruppe', 'Sportgruppe', 'Ausflugsgruppe']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      In einer Klasse mit <b>{data.a}</b> Schülerinnen und Schülern nehmen{' '}
      <b>{data.b} %</b> an einer {data.label} teil. Diese werden gleichmäßig auf{' '}
      <b>{data.c}</b> Gruppen verteilt. Wie viele sind in einer Gruppe?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`${data.a}\\cdot\\frac{${data.b}}{100}=${pp(data.result)}`}
      />
      <br />
      <InlineMath math={`${pp(data.result)}:${data.c}=${pp(data.result2)}`} />
      <p>
        In einer Gruppe sind <b>{pp(data.result2)}</b> Personen.
      </p>
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9635: Exercise<DATA> = {
  title: 'Prozent und Aufteilen verknüpfen',
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
