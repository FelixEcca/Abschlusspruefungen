import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'percentRate'

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

const kind: Kind = 'percentRate'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([80, 100, 120, 160, 200])
  const b = rng.randomItemFromArray([10, 20, 25, 40, 50, 75])
  return {
    kind,
    a,
    b: round2((a * b) / 100),
    c: b,
    d: 0,
    result: b,
    result2: 0,
    label: pick(rng, [
      'zugestimmt',
      'teilgenommen',
      'bestanden',
      'sich angemeldet',
    ]),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9625: Exercise<DATA> = {
  title: 'Prozentsatz aus Anteil',
  source: 'Prozentrechnung',
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
        Von <b>{data.a}</b> Personen haben <b>{data.b}</b> {data.label}. Wie
        viel Prozent sind das?
      </p>
    )
  },
  solution({ data }) {
    const onePersonPercent = round2(100 / data.a)

    return (
      <>
        <p>Berechne den Prozentsatz mit dem Dreisatz:</p>
        <svg viewBox="0 0 328 185">
          <image
            href="/content/Mathe_AV/Dreisatz.PNG"
            height="185"
            width="328"
          />
          <text x="120" y="12" fontSize="15" textAnchor="middle">
            Personen
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            %
          </text>
          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {pp(data.a)}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            100 %
          </text>
          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(onePersonPercent)} %
          </text>
          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.b)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.result)} %
          </text>
          <text x="24" y="72" fontSize="14">
            : {pp(data.a)}
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.b)}
          </text>
          <text x="286" y="72" fontSize="14">
            : {pp(data.a)}
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.b)}
          </text>
        </svg>
        <p>
          Das sind <b>{pp(data.result)} %</b>.
        </p>
      </>
    )
  },
}
