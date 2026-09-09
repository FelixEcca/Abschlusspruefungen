import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'tilesArea'

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

const kind: Kind = 'tilesArea'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([4, 5, 6, 8])
  const b = rng.randomItemFromArray([3, 4, 5])
  const c = rng.randomItemFromArray([0.25, 0.5, 1])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: a * b,
    result2: round2((a * b) / c),
    label: pick(rng, ['Küchenboden', 'Werkstattboden', 'Flur', 'Lagerraum']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein {data.label} ist <InlineMath math={`${pp(data.a)}\\,\\mathrm m`} />{' '}
      lang und <InlineMath math={`${pp(data.b)}\\,\\mathrm m`} /> breit. Eine
      Fliese bedeckt <InlineMath math={`${pp(data.c)}\\,\\mathrm{m^2}`} />. Wie
      viele Fliesen werden benötigt?
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath
        math={`A=${pp(data.a)}\\cdot${pp(data.b)}=${pp(data.result)}\\,\\mathrm{m^2}`}
      />
      <br />
      <InlineMath
        math={`${pp(data.result)}:${pp(data.c)}=${pp(data.result2)}`}
      />
      <p>
        Es werden <b>{pp(data.result2)}</b> Fliesen benötigt.
      </p>
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9613: Exercise<DATA> = {
  title: 'Fliesen für einen Boden',
  source: 'Figuren und Flächen',
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
