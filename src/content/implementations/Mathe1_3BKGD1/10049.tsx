import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  n: number
}

const xs = [-2, -1, 1, 2]

export const exercise10049: Exercise<DATA> = {
  title: 'Potenzfunktion mit negativen Exponenten auswerten',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { a: 1, n: -1 },
      { a: 2, n: -1 },
      { a: 1, n: -2 },
      { a: -3, n: -2 },
    ])
  },
  originalData: { a: 1, n: -1 },
  task({ data }) {
    return (
      <>
        <p>
          Erstellen Sie eine Wertetabelle für{' '}
          <InlineMath math={`f(x)=${data.a}x^{${data.n}}`} /> mit{' '}
          <InlineMath math="x=-2,-1,1,2" />.
        </p>
        <p>Warum darf x nicht 0 sein?</p>
      </>
    )
  },
  solution({ data }) {
    const positiveExponent = Math.abs(data.n)
    const values = xs.map((x) => ({ x, y: data.a / x ** positiveExponent }))
    return (
      <>
        <p>
          Der negative Exponent wird als Bruch geschrieben:{' '}
          <InlineMath
            math={`${data.a}x^{${data.n}}=\\frac{${data.a}}{x^{${positiveExponent}}}`}
          />
        </p>
        <table className="mb-3 border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border px-4 py-1">x</th>
              {values.map((entry) => (
                <td key={entry.x} className="border px-4 py-1 text-center">{entry.x}</td>
              ))}
            </tr>
            <tr>
              <th className="border px-4 py-1">f(x)</th>
              {values.map((entry) => (
                <td key={entry.x} className="border px-4 py-1 text-center">{pp(entry.y)}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <p>
          Für <InlineMath math="x=0" /> wäre der Nenner 0. Durch 0 darf man
          nicht teilen. Deshalb gehört 0 nicht zum Definitionsbereich.
        </p>
      </>
    )
  },
}
