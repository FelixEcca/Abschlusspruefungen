import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { pick } from './_avTrainingShared'

type Kind = 'packageSurface'

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

const kind: Kind = 'packageSurface'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([20, 30, 40])
  const b = rng.randomItemFromArray([10, 15, 20])
  const c = rng.randomItemFromArray([8, 12, 16])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: 2 * (a * b + a * c + b * c),
    result2: 0,
    label: pick(rng, ['Paket', 'Geschenkbox', 'Karton', 'kleine Holzkiste']),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein quaderförmiger Gegenstand ({data.label}) hat die Maße{' '}
      <InlineMath math={`${pp(data.a)}\\,\\mathrm{cm}`} />,{' '}
      <InlineMath math={`${pp(data.b)}\\,\\mathrm{cm}`} /> und{' '}
      <InlineMath math={`${pp(data.c)}\\,\\mathrm{cm}`} />. Berechne die
      Oberfläche.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <InlineMath
      math={`O=2\\cdot(${pp(data.a)}\\cdot${pp(data.b)}+${pp(data.a)}\\cdot${pp(data.c)}+${pp(data.b)}\\cdot${pp(data.c)})=${pp(data.result)}\\,\\mathrm{cm^2}`}
    />
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9615: Exercise<DATA> = {
  title: 'Oberfläche eines Pakets',
  source: 'Körper und Volumen',
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
