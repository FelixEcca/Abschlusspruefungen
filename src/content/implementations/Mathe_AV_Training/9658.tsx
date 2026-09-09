import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'textTable'

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

const kind: Kind = 'textTable'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([9, 12, 15])
  const b = rng.randomItemFromArray([7, 10, 13])
  const c = rng.randomItemFromArray([4, 6, 8])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: a + b + c,
    result2: Math.max(a, b, c),
    label: pick(rng, [
      'Fußball, Musik und Technik',
      'Kochen, Sport und Medien',
      'Werkstatt, Garten und Küche',
      'Lesen, Spielen und Basteln',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Aus einem Text: Es melden sich drei Gruppen ({data.label}) mit{' '}
      <b>{data.a}</b>, <b>{data.b}</b> und <b>{data.c}</b> Personen. Berechne
      die Gesamtzahl und die größte Gruppe.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`${data.a}+${data.b}+${data.c}=${data.result}`} />
      <p>
        Die größte Gruppe hat <b>{data.result2}</b> Personen.
      </p>
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9658: Exercise<DATA> = {
  title: 'Daten aus Text ordnen',
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
