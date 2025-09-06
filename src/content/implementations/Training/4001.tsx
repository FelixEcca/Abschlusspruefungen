import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  h: number
  k: number
  xs: number[] // x-Werte für die Tabelle (ganzzahlig)
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4001: Exercise<DATA> = {
  title: 'Wertetabelle einer Parabel',
  source: '2BFS',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const aAbs = rng.randomItemFromArray([0.5, 1, 1.5])
    const a = rng.randomItemFromArray([-1, 1]) * aAbs
    const h = rng.randomIntBetween(-9, 9)
    const k = rng.randomIntBetween(-9, 9)

    // symmetrische, gut rechenbare x-Werte um h herum
    const xs = [-2, -1, 0, 1, 2].map(d => h + d)
    return { a, h, k, xs }
  },

  originalData: {
    a: 1,
    h: -1,
    k: 2,
    xs: [-3, -2, -1, 0, 1],
  },

  constraint({ data }) {
    return data.h != 0 && data.k != 0
  },

  task({ data }) {
    const { a, h, k, xs } = data

    // Punkte für den Graphen (fein gerastert um h)
    const denseXs: number[] = []
    for (let x = h - 6; x <= h + 6; x += 0.1) denseXs.push(+x.toFixed(1))
    const path = denseXs
      .map(x => {
        const y = a * (x - h) * (x - h) + k
        return `${toX(x)},${toY(y)}`
      })
      .join(' ')

    return (
      <>
        <p>
          Gegeben ist die Parabel<br></br>{' '}
          <InlineMath
            math={`y = ${a == 1 ? '' : a == -1 ? ' -' : pp(a)} \\,(x${pp(-h, 'merge_op')})^{2} ${pp(k, 'merge_op')}`}
          />
          . <br></br>
          <br></br>Ergänze die Wertetabelle (ohne Taschenrechner).
        </p>
        <div className="my-1 overflow-auto">
          <table className="min-w-[260px] text-sm border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-1">x</th>
                {xs.map((x, i) => (
                  <th key={i} className="border px-2 py-1 text-right">
                    {x}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1 font-medium">y</td>
                {xs.map((_, i) => (
                  <td key={i} className="border px-2 py-1 text-right">
                    {/* Platz für Schülerlösung */}
                    &nbsp;
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
    const { a, h, k, xs } = data
    const ys = xs.map(x => a * (x - h) * (x - h) + k)

    return (
      <>
        <p>Werte:</p>
        <ul className="list-disc ml-5">
          {xs.map((x, i) => (
            <li key={i}>
              <InlineMath math={`x=${x}:\\; y=${pp(ys[i])}`} />
            </li>
          ))}
        </ul>
      </>
    )
  },
}
