import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'discount'

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

const kind: Kind = 'discount'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([40, 60, 80, 120, 150, 200])
  const b = rng.randomItemFromArray([10, 15, 20, 25, 30])
  const result = round2(a * (1 - b / 100))
  return {
    kind,
    a,
    b,
    c: 0,
    d: 0,
    result,
    result2: round2(a - result),
    label: pick(rng, ['Jacke', 'Werkzeugkoffer', 'Rucksack', 'Sportschuhe']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9623: Exercise<DATA> = {
  title: 'Rabatt berechnen',
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
        Ein Artikel ({data.label}) kostet <b>{pp(data.a)} €</b>. Der Preis wird
        um <b>{data.b} %</b> reduziert. Berechne Rabatt und neuen Preis.
      </p>
    )
  },
  solution({ data }) {
    const onePercent = round2(data.a / 100)

    return (
      <>
        <p>Berechne den Rabatt mit dem Dreisatz:</p>
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
            100
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
            {pp(data.b)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.result2)} €
          </text>
          <text x="24" y="72" fontSize="14">
            : 100
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.b)}
          </text>
          <text x="286" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.b)}
          </text>
        </svg>
        <p>
          Der Rabatt beträgt <b>{pp(data.result2)} €</b>.
        </p>
        <InlineMath
          math={`${pp(data.a)}-${pp(data.result2)}=${pp(data.result)}\\,€`}
        />
        <p>
          Der neue Preis beträgt <b>{pp(data.result)} €</b>.
        </p>
      </>
    )
  },
}
