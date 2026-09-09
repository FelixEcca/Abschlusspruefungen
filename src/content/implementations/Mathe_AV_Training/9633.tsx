import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'circleDiameter'

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

const kind: Kind = 'circleDiameter'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([4, 6, 8, 10, 12])
  return {
    kind,
    a,
    b: 0,
    c: 0,
    d: 0,
    result: round2(Math.PI * a),
    result2: round2(a / 2),
    label: pick(rng, [
      'runde Tischplatte',
      'rundes Schild',
      'runder Deckel',
      'kreisförmiges Beet',
    ]),
  }
}

function taskFor(data: DATA) {
  return (
    <>
      Ein Gegenstand ({data.label}) hat den Durchmesser{' '}
      <InlineMath math={`d=${pp(data.a)}\\,\\mathrm{cm}`} />. Berechne Radius
      und Umfang.
    </>
  )
}

function solutionFor(data: DATA) {
  return (
    <>
      <InlineMath math={`r=\\frac d2=${pp(data.result2)}\\,\\mathrm{cm}`} />
      <br />
      <InlineMath
        math={`U=\\pi\\cdot d\\approx${pp(data.result)}\\,\\mathrm{cm}`}
      />
    </>
  )
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9633: Exercise<DATA> = {
  title: 'Durchmesser, Radius und Umfang',
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
