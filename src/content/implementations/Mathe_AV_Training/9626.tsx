import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'baseValue'

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

const kind: Kind = 'baseValue'

function makeData(rng: any): DATA {
  const result = rng.randomItemFromArray([80, 100, 120, 160, 200, 240])
  const b = rng.randomItemFromArray([10, 20, 25, 40, 50, 75])
  return {
    kind,
    a: round2((result * b) / 100),
    b,
    c: 0,
    d: 0,
    result,
    result2: 0,
    label: pick(rng, [
      'ursprünglichen Preis',
      'gesamten Betrag',
      'vollen Warenwert',
      'Grundpreis',
    ]),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9626: Exercise<DATA> = {
  title: 'Ursprünglichen Preis berechnen',
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
        <b>{pp(data.a)} €</b> sind <b>{data.b} %</b> vom gesuchten Wert (
        {data.label}). Berechne den gesuchten Wert.
      </p>
    )
  },
  solution({ data }) {
    const onePercent = round2(data.a / data.b)

    return (
      <>
        <p>Berechne den gesuchten Wert mit dem Dreisatz:</p>
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
            €
          </text>
          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {pp(data.b)}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.a)} €
          </text>
          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(onePercent)} €
          </text>
          <text x="120" y="142" fontSize="15" textAnchor="middle">
            100
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.result)} €
          </text>
          <text x="24" y="72" fontSize="14">
            : {pp(data.b)}
          </text>
          <text x="22" y="123" fontSize="14">
            · 100
          </text>
          <text x="286" y="72" fontSize="14">
            : {pp(data.b)}
          </text>
          <text x="284" y="123" fontSize="14">
            · 100
          </text>
        </svg>
        <p>
          Der gesuchte Wert beträgt <b>{pp(data.result)} €</b>.
        </p>
      </>
    )
  },
}
