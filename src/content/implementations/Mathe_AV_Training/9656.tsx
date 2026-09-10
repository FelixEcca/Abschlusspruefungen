import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'pieAngle'

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

const kind: Kind = 'pieAngle'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([10, 20, 25, 30, 40])
  return {
    kind,
    a,
    b: 0,
    c: 0,
    d: 0,
    result: round2((360 * a) / 100),
    result2: 0,
    label: pick(rng, [
      'Lieblingssport',
      'Schulweg',
      'Projektwahl',
      'Pausenverkauf',
    ]),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9656: Exercise<DATA> = {
  title: 'Winkel im Kreisdiagramm',
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
    return (
      <p>
        In einem Kreisdiagramm zum Thema {data.label} entspricht ein Anteil von{' '}
        <b>{data.a} %</b> einem Winkel. Berechne den Winkel, dem das im Kreis
        entspricht.
      </p>
    )
  },
  solution({ data }) {
    const onePercent = 3.6

    return (
      <>
        <p>Berechne den Winkel mit dem Dreisatz:</p>
        <svg viewBox="0 0 328 185">
          <image
            href="/content/Mathe_AV/Dreisatz.PNG"
            height="185"
            width="328"
          />
          <text x="120" y="12" fontSize="15" textAnchor="middle">
            %
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            Winkel
          </text>
          <text x="120" y="42" fontSize="15" textAnchor="middle">
            100
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            360°
          </text>
          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(onePercent)}°
          </text>
          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.a)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.result)}°
          </text>
          <text x="24" y="72" fontSize="14">
            : 100
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.a)}
          </text>
          <text x="286" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.a)}
          </text>
        </svg>
        <p>
          Der Winkel beträgt <b>{pp(data.result)}°</b>.
        </p>
      </>
    )
  },
}
