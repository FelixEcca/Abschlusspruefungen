import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'mapScale'

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

const kind: Kind = 'mapScale'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([2, 3, 4, 5, 6])
  const b = rng.randomItemFromArray([100, 200, 250, 500])
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result: round2(a * b),
    result2: round2((a * b) / 100),
    label: pick(rng, ['Stadtplan', 'Schulplan', 'Werkstattplan', 'Lageplan']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9631: Exercise<DATA> = {
  title: 'Maßstab im Plan',
  source: 'Einheiten',
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
    return (
      <p>
        Auf einem {data.label} entsprechen <b>1 cm</b> in Wirklichkeit{' '}
        <b>{data.b} cm</b>. Eine Strecke ist auf dem Plan <b>{data.a} cm</b>{' '}
        lang. Berechne die echte Länge in cm und m.
      </p>
    )
  },
  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${data.a}\\cdot${data.b}=${pp(data.result)}\\,\\mathrm{cm}`}
        />
        <br />
        <InlineMath
          math={`${pp(data.result)}\\,\\mathrm{cm}=${pp(data.result2)}\\,\\mathrm m`}
        />
      </>
    )
  },
}
