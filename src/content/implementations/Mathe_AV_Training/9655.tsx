import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kind = 'percentForms'
type Given = 'percent' | 'decimal' | 'fraction'

interface Row {
  percent: number
  numerator: number
  denominator: number
  decimal: number
  given: Given
}

interface DATA {
  kind: Kind
  a: number
  b: number
  c: number
  d: number
  result: number
  result2: number
  label: string
  rows: Row[]
}

const kind: Kind = 'percentForms'

function makeData(rng: any): DATA {
  const tables: Row[][] = [
    [
      {
        percent: 25,
        numerator: 1,
        denominator: 4,
        decimal: 0.25,
        given: 'percent',
      },
      {
        percent: 50,
        numerator: 1,
        denominator: 2,
        decimal: 0.5,
        given: 'decimal',
      },
      {
        percent: 75,
        numerator: 3,
        denominator: 4,
        decimal: 0.75,
        given: 'fraction',
      },
    ],
    [
      {
        percent: 10,
        numerator: 1,
        denominator: 10,
        decimal: 0.1,
        given: 'percent',
      },
      {
        percent: 20,
        numerator: 1,
        denominator: 5,
        decimal: 0.2,
        given: 'fraction',
      },
      {
        percent: 40,
        numerator: 2,
        denominator: 5,
        decimal: 0.4,
        given: 'decimal',
      },
      {
        percent: 80,
        numerator: 4,
        denominator: 5,
        decimal: 0.8,
        given: 'percent',
      },
    ],
    [
      {
        percent: 5,
        numerator: 1,
        denominator: 20,
        decimal: 0.05,
        given: 'decimal',
      },
      {
        percent: 12.5,
        numerator: 1,
        denominator: 8,
        decimal: 0.125,
        given: 'fraction',
      },
      {
        percent: 30,
        numerator: 3,
        denominator: 10,
        decimal: 0.3,
        given: 'percent',
      },
      {
        percent: 60,
        numerator: 3,
        denominator: 5,
        decimal: 0.6,
        given: 'decimal',
      },
    ],
    [
      {
        percent: 1,
        numerator: 1,
        denominator: 100,
        decimal: 0.01,
        given: 'fraction',
      },
      {
        percent: 15,
        numerator: 3,
        denominator: 20,
        decimal: 0.15,
        given: 'percent',
      },
      {
        percent: 35,
        numerator: 7,
        denominator: 20,
        decimal: 0.35,
        given: 'decimal',
      },
    ],
  ]
  const rows = rng.randomItemFromArray(tables)
  const first = rows[0]
  return {
    kind,
    a: first.percent,
    b: first.numerator,
    c: first.denominator,
    d: 0,
    result: first.decimal,
    result2: 0,
    label: 'Umwandlung',
    rows,
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9655: Exercise<DATA> = {
  title: 'Prozent, Dezimalzahl und Bruch',
  source: 'Prozentrechnung',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return makeData(rng)
  },
  originalData,
  constraint({ data }) {
    return data.kind === kind && data.rows.length >= 3 && data.rows.length <= 4
  },
  task({ data }) {
    return (
      <>
        <p>Fülle die Tabelle aus.</p>
        <table className="my-3 border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-2">Prozent</th>
              <th className="border px-3 py-2">Dezimalzahl</th>
              <th className="border px-3 py-2">Bruch</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                <td className="border px-3 py-2 text-center">
                  {row.given === 'percent' ? `${pp(row.percent)} %` : ''}
                </td>
                <td className="border px-3 py-2 text-center">
                  {row.given === 'decimal' ? pp(row.decimal) : ''}
                </td>
                <td className="border px-3 py-2 text-center">
                  {row.given === 'fraction' ? (
                    <InlineMath
                      math={`\\frac{${row.numerator}}{${row.denominator}}`}
                    />
                  ) : (
                    ''
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <table className="my-3 border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-2">Prozent</th>
              <th className="border px-3 py-2">Dezimalzahl</th>
              <th className="border px-3 py-2">Bruch</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                <td className="border px-3 py-2 text-center">
                  {pp(row.percent)} %
                </td>
                <td className="border px-3 py-2 text-center">
                  {pp(row.decimal)}
                </td>
                <td className="border px-3 py-2 text-center">
                  <InlineMath
                    math={`\\frac{${row.numerator}}{${row.denominator}}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  },
}
