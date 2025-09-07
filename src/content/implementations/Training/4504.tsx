import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Rel = 'prop' | 'antiprop' | 'quad'
interface DATA {
  rel: Rel
  rows: { x: number; y: number }[]
}

function makeTable(rng: any): DATA {
  const rel = rng.randomItemFromArray(['prop', 'antiprop', 'quad']) as Rel
  // kleine, positive Ganzzahlen, keine 0
  const xs = [1, 2, 3, 4].map(() => rng.randomIntBetween(1, 6))
  const k = rng.randomIntBetween(1, 5) // Faktor
  const rows = xs.map(x => {
    if (rel === 'prop') return { x, y: k * x }
    if (rel === 'antiprop') return { x, y: Math.round((k * 12) / x) } // einfache Werte
    return { x, y: k * x * x } // quadratisch
  })
  return { rel, rows }
}

export const exercise4504: Exercise<DATA> = {
  title: 'Zusammenhang aus einer Wertetabelle erkennen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 3,

  generator(rng) {
    return makeTable(rng)
  },

  originalData: {
    rel: 'prop',
    rows: [
      { x: 1, y: 3 },
      { x: 2, y: 6 },
      { x: 3, y: 9 },
      { x: 4, y: 12 },
    ],
  },

  constraint() {
    return true
  },

  task({ data }) {
    const { rows } = data
    return (
      <>
        <p>
          In der Tabelle ist ein Zusammenhang zwischen <InlineMath math="x" />{' '}
          und <InlineMath math="y" /> gegeben. Bestimme, ob er{' '}
          <b>proportional</b>, <b>antiproportional</b> oder <b>quadratisch</b>{' '}
          ist.
        </p>
        <div className="overflow-auto">
          <table className="min-w-[240px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">x</th>
                {rows.map((r, i) => (
                  <th key={i} className="border px-2 py-1 text-right">
                    {r.x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1 font-medium">y</td>
                {rows.map((r, i) => (
                  <td key={i} className="border px-2 py-1 text-right">
                    {r.y}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">Begründe kurz.</p>
      </>
    )
  },

  solution({ data }) {
    const { rel, rows } = data
    const ratios = rows.map(r => r.y / r.x)
    const x_y = rows.map(r => r.x * r.y)
    const y_over_x2 = rows.map(r => r.y / (r.x * r.x))

    let text = ''
    if (rel === 'prop') {
      text =
        'Die Quotienten y/x sind (nahezu) konstant ⇒ proportionaler Zusammenhang y = k·x.'
    } else if (rel === 'antiprop') {
      text =
        'Die Produkte x·y sind (nahezu) konstant ⇒ antiproportionaler Zusammenhang y = k/x.'
    } else {
      text =
        'Die Quotienten y/x² sind (nahezu) konstant ⇒ quadratischer Zusammenhang y = k·x².'
    }

    return (
      <>
        <p>
          <b>Lösung:</b> {text}
        </p>
        <ul className="list-disc ml-5 text-sm">
          <li>y/x: {ratios.map(v => v.toFixed(2)).join(', ')}</li>
          <li>x·y: {x_y.join(', ')}</li>
          <li>y/x²: {y_over_x2.map(v => v.toFixed(2)).join(', ')}</li>
        </ul>
      </>
    )
  },
}
