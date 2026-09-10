import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, pick } from './_avTrainingShared'

type Kind = 'monthlyInterest'

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

const kind: Kind = 'monthlyInterest'

function makeData(rng: any): DATA {
  const a = rng.randomItemFromArray([600, 900, 1200, 1500, 2000])
  const b = rng.randomItemFromArray([2, 3, 4, 5, 6])
  const c = rng.randomItemFromArray([3, 4, 6, 9])
  return {
    kind,
    a,
    b,
    c,
    d: 0,
    result: round2((a * b * c) / 1200),
    result2: 0,
    label: pick(rng, ['Sparguthaben', 'Konto', 'Festgeld', 'Kreditbetrag']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9627: Exercise<DATA> = {
  title: 'Zinsen für einige Monate',
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
        Ein {data.label} von <b>{pp(data.a)} €</b> wird mit <b>{data.b} %</b>{' '}
        pro Jahr verzinst. Berechne die Zinsen für <b>{data.c}</b> Monate.
      </p>
    )
  },
  solution({ data }) {
    const onePercent = round2(data.a / 100)
    const yearlyInterest = round2(onePercent * data.b)

    return (
      <>
        <p>Berechne zuerst die Zinsen für ein ganzes Jahr mit dem Dreisatz:</p>
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
            {pp(yearlyInterest)} €
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
        <p>Jetzt werden die Jahreszinsen auf die Monate umgerechnet.</p>
        <InlineMath
          math={`${pp(yearlyInterest)}:12\\cdot${data.c}=${pp(data.result)}\\,€`}
        />
        <p>
          Die Zinsen für {data.c} Monate betragen <b>{pp(data.result)} €</b>.
        </p>
      </>
    )
  },
}
