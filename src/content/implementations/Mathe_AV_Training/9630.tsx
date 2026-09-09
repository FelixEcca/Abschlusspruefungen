import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'tableRead'

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

const kind: Kind = 'tableRead'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([12, 15, 18, 20])
  const b = rng.randomItemFromArray([8, 10, 14, 16])
  const c = rng.randomItemFromArray([5, 7, 9, 11])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: a + b + c,
    result2: Math.max(a, b, c),
    label: pick(rng, [
      'verkaufte Brötchen',
      'ausgeliehene Bücher',
      'Besucherinnen und Besucher',
      'gebaute Werkstücke',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      In einer Tabelle stehen {data.label}: Montag <b>{data.a}</b>, Dienstag{' '}
      <b>{data.b}</b>, Mittwoch <b>{data.c}</b>. Berechne die Summe und den
      größten Wert.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`Summe=${data.a}+${data.b}+${data.c}=${data.result}`} />
      <p>
        Der größte Wert ist <b>{data.result2}</b>.
      </p>
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9630: Exercise<DATA> = {
  title: 'Tabelle auswerten',
  source: 'Diagramme und Daten',
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
