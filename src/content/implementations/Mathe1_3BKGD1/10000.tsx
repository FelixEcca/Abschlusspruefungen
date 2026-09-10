import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

type Unit = 'pt' | 'pc' | 'in'

interface DATA {
  value: number
  from: Unit
  to: Unit
  context: string
}

const unitLabel: Record<Unit, string> = {
  pt: 'Point',
  pc: 'Pica',
  in: 'Inch',
}

const unitShort: Record<Unit, string> = {
  pt: 'pt',
  pc: 'pc',
  in: 'in',
}

function toPt(value: number, unit: Unit) {
  if (unit === 'pt') return value
  if (unit === 'pc') return value * 12
  return value * 72
}

function fromPt(value: number, unit: Unit) {
  if (unit === 'pt') return value
  if (unit === 'pc') return value / 12
  return value / 72
}

export const exercise10000: Exercise<DATA> = {
  title: 'Point, Pica und Inch umrechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { value: 36, from: 'pt', to: 'pc', context: 'eine Überschrift' },
      { value: 9, from: 'pc', to: 'in', context: 'eine Spaltenbreite' },
      { value: 2, from: 'in', to: 'pt', context: 'ein Randabstand' },
      { value: 144, from: 'pt', to: 'in', context: 'eine Bildhöhe' },
      { value: 4.5, from: 'pc', to: 'pt', context: 'einen Zeilenblock' },
      { value: 1.25, from: 'in', to: 'pc', context: 'ein Logo' },
    ])
  },
  originalData: { value: 36, from: 'pt', to: 'pc', context: 'eine Überschrift' },
  task({ data }) {
    return (
      <>
        <p>
          In einem Layoutprogramm wird {data.context} mit{' '}
          <b>
            {pp(data.value)} {unitShort[data.from]}
          </b>{' '}
          angegeben.
        </p>
        <p>
          Rechnen Sie diese Angabe in <b>{unitLabel[data.to]}</b> um.
        </p>
        <p>
          Es gilt: <InlineMath math="12\,\mathrm{pt}=1\,\mathrm{pc}" /> und{' '}
          <InlineMath math="6\,\mathrm{pc}=1\,\mathrm{in}" />.
        </p>
      </>
    )
  },
  solution({ data }) {
    const ptValue = toPt(data.value, data.from)
    const result = fromPt(ptValue, data.to)
    return (
      <>
        <p>Ich rechne zuerst über die Grundeinheit Point.</p>
        <table className="mb-3 border-collapse text-sm">
          <tbody>
            <tr>
              <td className="border px-3 py-1">1 Pica</td>
              <td className="border px-3 py-1">12 Point</td>
            </tr>
            <tr>
              <td className="border px-3 py-1">1 Inch</td>
              <td className="border px-3 py-1">6 Pica = 72 Point</td>
            </tr>
          </tbody>
        </table>
        <p>
          Ausgangswert in Point:{' '}
          <InlineMath
            math={`${pp(data.value)}\\,\\mathrm{${unitShort[data.from]}}=${pp(ptValue)}\\,\\mathrm{pt}`}
          />
        </p>
        <p>
          Umrechnung in die Zieleinheit:{' '}
          <InlineMath
            math={`${pp(ptValue)}\\,\\mathrm{pt}=${pp(result)}\\,\\mathrm{${unitShort[data.to]}}`}
          />
        </p>
        <p>
          Ergebnis: {pp(data.value)} {unitShort[data.from]} sind{' '}
          <b>
            {pp(result)} {unitShort[data.to]}
          </b>
          .
        </p>
      </>
    )
  },
}
