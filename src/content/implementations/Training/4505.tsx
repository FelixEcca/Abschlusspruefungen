import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kind = 'lin' | 'quad' | 'sum'
interface DATA {
  kind: Kind
  a: number
  b: number
  c: number
  xs: number[]
}

export const exercise4505: Exercise<DATA> = {
  title: 'Termwerte berechnen (Wertetabelle)',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const kind = rng.randomItemFromArray<Kind>(['lin', 'quad', 'sum'])
    const a = rng.randomIntBetween(-3, 3) || 1
    const b = rng.randomIntBetween(-5, 5)
    const c = rng.randomIntBetween(-4, 4)
    const xs = [-2, -1, 0, 1, 2].map(d => d + rng.randomIntBetween(-1, 1))
    return { kind, a, b, c, xs }
  },

  originalData: { kind: 'lin', a: 2, b: -1, c: 0, xs: [-2, -1, 0, 1, 2] },

  constraint() {
    return true
  },

  task({ data }) {
    const { kind, a, b, c, xs } = data
    const term =
      kind === 'lin'
        ? `y=${pp(a)}x ${pp(b, 'merge_op')}`
        : kind === 'quad'
          ? `y=${pp(a)}x^{2} ${pp(b, 'merge_op')}x ${pp(c, 'merge_op')}`
          : `y=${pp(a)}x^{2} ${pp(b, 'merge_op')}`

    return (
      <>
        <p>
          Gegeben ist der Term <InlineMath math={term} />. Ergänze die
          Wertetabelle ohne Taschenrechner.
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
    const { kind, a, b, c, xs } = data
    const f = (x: number) =>
      kind === 'lin'
        ? a * x + b
        : kind === 'quad'
          ? a * x * x + b * x + c
          : a * x * x + b
    const ys = xs.map(f)

    return (
      <>
        <p>
          <b>Ausgefüllte Tabelle</b>
        </p>
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
