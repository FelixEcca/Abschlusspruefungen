import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

type Unit = 'pt' | 'pc' | 'in'

interface Entry {
  label: string
  value: number
  unit: Unit
}

interface DATA {
  entries: Entry[]
}

const unitShort: Record<Unit, string> = {
  pt: 'pt',
  pc: 'pc',
  in: 'in',
}

function toPt(entry: Entry) {
  if (entry.unit === 'pt') return entry.value
  if (entry.unit === 'pc') return entry.value * 12
  return entry.value * 72
}

export const exercise10001: Exercise<DATA> = {
  title: 'Typografische Maße vergleichen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        entries: [
          { label: 'Bildunterschrift', value: 18, unit: 'pt' },
          { label: 'Zwischenraum', value: 1.5, unit: 'pc' },
          { label: 'Logo-Höhe', value: 0.5, unit: 'in' },
        ],
      },
      {
        entries: [
          { label: 'Fließtext', value: 12, unit: 'pt' },
          { label: 'Spaltenabstand', value: 0.75, unit: 'pc' },
          { label: 'Rand', value: 0.25, unit: 'in' },
        ],
      },
      {
        entries: [
          { label: 'Titel', value: 60, unit: 'pt' },
          { label: 'Rasterfeld', value: 4, unit: 'pc' },
          { label: 'Icon', value: 0.9, unit: 'in' },
        ],
      },
    ])
  },
  originalData: {
    entries: [
      { label: 'Bildunterschrift', value: 18, unit: 'pt' },
      { label: 'Zwischenraum', value: 1.5, unit: 'pc' },
      { label: 'Logo-Höhe', value: 0.5, unit: 'in' },
    ],
  },
  task({ data }) {
    return (
      <>
        <p>
          Drei typografische Angaben sollen verglichen werden. Ordnen Sie die
          Angaben von <b>klein nach groß</b>.
        </p>
        <table className="mb-3 border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-3 py-1 text-left">Angabe</th>
              <th className="border px-3 py-1 text-left">Maß</th>
            </tr>
          </thead>
          <tbody>
            {data.entries.map((entry) => (
              <tr key={entry.label}>
                <td className="border px-3 py-1">{entry.label}</td>
                <td className="border px-3 py-1">
                  {pp(entry.value)} {unitShort[entry.unit]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Hinweis: <InlineMath math="1\,\mathrm{pc}=12\,\mathrm{pt}" /> und{' '}
          <InlineMath math="1\,\mathrm{in}=72\,\mathrm{pt}" />.
        </p>
      </>
    )
  },
  solution({ data }) {
    const sorted = [...data.entries].sort((a, b) => toPt(a) - toPt(b))
    return (
      <>
        <p>
          Zum Vergleichen rechne ich alle Angaben in dieselbe Einheit um:
          Point.
        </p>
        <table className="mb-3 border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-3 py-1 text-left">Angabe</th>
              <th className="border px-3 py-1 text-left">Rechnung</th>
              <th className="border px-3 py-1 text-left">in pt</th>
            </tr>
          </thead>
          <tbody>
            {data.entries.map((entry) => (
              <tr key={entry.label}>
                <td className="border px-3 py-1">{entry.label}</td>
                <td className="border px-3 py-1">
                  {entry.unit === 'pt' && (
                    <InlineMath math={`${pp(entry.value)}\\,\\mathrm{pt}`} />
                  )}
                  {entry.unit === 'pc' && (
                    <InlineMath
                      math={`${pp(entry.value)}\\cdot12=${pp(toPt(entry))}`}
                    />
                  )}
                  {entry.unit === 'in' && (
                    <InlineMath
                      math={`${pp(entry.value)}\\cdot72=${pp(toPt(entry))}`}
                    />
                  )}
                </td>
                <td className="border px-3 py-1">{pp(toPt(entry))} pt</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Reihenfolge:{' '}
          <b>{sorted.map((entry) => entry.label).join(' < ')}</b>.
        </p>
      </>
    )
  },
}
