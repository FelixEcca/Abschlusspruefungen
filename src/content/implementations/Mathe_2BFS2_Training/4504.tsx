import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Rel = 'prop' | 'antiprop' 
interface DATA {
  rel: Rel
  rows: { x: number; y: number }[]
}

/** erzeugt eine strikte, aufsteigend sortierte Menge ganzer x-Werte */
function uniqueSortedXs(rng: any, len = 4, min = 1, max = 9) {
  const set = new Set<number>()
  while (set.size < len) set.add(rng.randomIntBetween(min, max))
  return Array.from(set).sort((a, b) => a - b)
}

function makeTable(rng: any): DATA {
  const rel = rng.randomItemFromArray(['prop', 'antiprop'])
  const xs = uniqueSortedXs(rng, 4, 1, 9)
  const k = rng.randomIntBetween(1, 6)

  const rows = xs.map(x => {
    if (rel === 'prop') return { x, y: k * x }
    // For antiproportional: x * y = k * 12, so y = (k * 12) / x, but ensure integer result
    return { x, y: Math.round(1000*(k * 12) / x)/1000 }
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
      { x: 2, y: 6 },
      { x: 3, y: 9 },
      { x: 5, y: 15 },
      { x: 8, y: 24 },
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
          In der Tabelle ist ein Zusammenhang zwischen <InlineMath math="x" /> und{' '}
          <InlineMath math="y" /> gegeben. Entscheide, ob er{' '}
          proportional oder antiproportional{' '}
          ist. Begründe kurz.
        </p>
        <div className="overflow-auto">
          <table className="min-w-[260px] border-collapse text-sm">
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
      </>
    )
  },
  solution({ data }) {
    const { rel, rows } = data

    const text =
      rel === 'prop'
        ? 'Die Werte steigen konstant ⇒ proportionaler Zusammenhang.'
        :  'x·y ist konstant ⇒ antiproportionaler Zusammenhang.'
          

    return (
      <>
        <p><b>Lösung:</b> {text}</p>
        
      </>
    )
  },
}

