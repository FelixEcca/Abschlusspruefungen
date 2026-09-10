import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'offerCompare'

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

const kind: Kind = 'offerCompare'

function makeData(rng: any): DATA {
  const options = [
    [80, 20, 75, 10],
    [120, 25, 100, 5],
    [60, 10, 55, 5],
    [150, 30, 120, 10],
  ]
  const [a, b, c, d] = rng.randomItemFromArray(options)
  return {
    kind,
    a,
    b,
    c,
    d,
    result: round2(a * (1 - b / 100)),
    result2: round2(c * (1 - d / 100)),
    label: pick(rng, ['Rucksack', 'Werkzeugkoffer', 'Jacke', 'Sportschuhe']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9654: Exercise<DATA> = {
  title: 'Zwei Angebote vergleichen',
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
        Vergleiche zwei Angebote für {data.label}: A kostet <b>{data.a} €</b>{' '}
        mit <b>{data.b} %</b> Rabatt. B kostet <b>{data.c} €</b> mit{' '}
        <b>{data.d} %</b> Rabatt. Welches Angebot ist günstiger?
      </p>
    )
  },
  solution({ data }) {
    const onePercentA = round2(data.a / 100)
    const onePercentB = round2(data.c / 100)
    const discountA = round2(data.a - data.result)
    const discountB = round2(data.c - data.result2)

    return (
      <>
        <p>Berechne zuerst den Rabatt von Angebot A mit dem Dreisatz:</p>
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
            {pp(onePercentA)} €
          </text>
          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.b)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(discountA)} €
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
        <InlineMath
          math={`A: ${pp(data.a)}-${pp(discountA)}=${pp(data.result)}\\,€`}
        />
        <p>Berechne dann den Rabatt von Angebot B mit dem Dreisatz:</p>
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
            {pp(data.c)} €
          </text>
          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(onePercentB)} €
          </text>
          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.d)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(discountB)} €
          </text>
          <text x="24" y="72" fontSize="14">
            : 100
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.d)}
          </text>
          <text x="286" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.d)}
          </text>
        </svg>
        <InlineMath
          math={`B: ${pp(data.c)}-${pp(discountB)}=${pp(data.result2)}\\,€`}
        />
        <p>
          {data.result < data.result2 ? 'Angebot A' : 'Angebot B'} ist
          günstiger.
        </p>
      </>
    )
  },
}
