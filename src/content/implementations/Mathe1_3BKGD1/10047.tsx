import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
}

const xs = [-2, -1, 0, 1, 2]

export const exercise10047: Exercise<DATA> = {
  title: 'Potenzfunktion f(x)=a·x³ auswerten und skizzieren',
  source: '3BKGD1',
  useCalculator: false,
  duration: 12,
  points: 12,
  generator(rng) {
    return { a: rng.randomItemFromArray([1, 2, -1, -2]) }
  },
  originalData: { a: 1 },
  task({ data }) {
    return (
      <>
        <p>
          Erstellen Sie eine Wertetabelle für die Potenzfunktion{' '}
          <InlineMath math={`f(x)=${data.a}x^3`} /> mit{' '}
          <InlineMath math="x=-2,-1,0,1,2" />.
        </p>
        <p>Skizzieren Sie anschließend den Graphen.</p>
      </>
    )
  },
  solution({ data }) {
    const points = xs.map((x) => ({ x, y: data.a * x ** 3 }))
    return (
      <>
        <p>Ich setze die x-Werte in den Term ein.</p>
        <table className="mb-3 border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border px-4 py-1">x</th>
              {points.map((entry) => (
                <td key={entry.x} className="border px-4 py-1 text-center">{entry.x}</td>
              ))}
            </tr>
            <tr>
              <th className="border px-4 py-1">f(x)</th>
              {points.map((entry) => (
                <td key={entry.x} className="border px-4 py-1 text-center">{entry.y}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <p>
          Beispiel:{' '}
          <InlineMath math={`f(2)=${data.a}\\cdot2^3=${pp(data.a * 8)}`} />
        </p>
        <p>
          Die Punkte werden eingetragen und zu einer typischen S-Kurve
          verbunden.
        </p>
      </>
    )
  },
}
