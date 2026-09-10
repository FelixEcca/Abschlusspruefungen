import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  xs: number[]
}

function value(data: DATA, x: number) {
  return data.a * x ** 3 + data.b * x ** 2 + data.c * x + data.d
}

function formula(data: DATA) {
  const parts = [
    data.a !== 0
      ? `${data.a === 1 ? '' : data.a === -1 ? '-' : data.a}x^3`
      : '',
    data.b !== 0
      ? `${data.b > 0 ? '+' : ''}${data.b === 1 ? '' : data.b === -1 ? '-' : data.b}x^2`
      : '',
    data.c !== 0
      ? `${data.c > 0 ? '+' : ''}${data.c === 1 ? '' : data.c === -1 ? '-' : data.c}x`
      : '',
    data.d !== 0 ? `${data.d > 0 ? '+' : ''}${data.d}` : '',
  ].filter(Boolean)
  return parts.join('') || '0'
}

export const exercise10052: Exercise<DATA> = {
  title: 'Polynomfunktion auswerten',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        a: 1,
        b: -2,
        c: 0,
        d: 3,
        xs: [-2, -1, 0, 2],
      },
      {
        a: -1,
        b: 0,
        c: 4,
        d: 1,
        xs: [-2, 0, 1, 3],
      },
      {
        a: 1,
        b: 1,
        c: -3,
        d: -2,
        xs: [-2, -1, 1, 2],
      },
    ])
  },
  originalData: {
    a: 1,
    b: -2,
    c: 0,
    d: 3,
    xs: [-2, -1, 0, 2],
  },
  task({ data }) {
    return (
      <>
        <p>
          Gegeben ist die Polynomfunktion:<br></br>{' '}
          <InlineMath math={`f(x)=${formula(data)}`} />
        </p>
        <p>Berechnen Sie die Funktionswerte für die angegebenen x-Werte.</p>
        <table className="mb-3 border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border px-4 py-1">x</th>
              {data.xs.map(x => (
                <td key={x} className="border px-4 py-1 text-center">
                  {x}
                </td>
              ))}
            </tr>
            <tr>
              <th className="border px-4 py-1">f(x)</th>
              {data.xs.map(x => (
                <td key={x} className="border px-4 py-1 text-center">
                  ?
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </>
    )
  },
  solution({ data }) {
    const exampleX = data.xs[0]
    return (
      <>
        <p>
          Für jeden x-Wert wird die Zahl in den Term{' '}
          <InlineMath math={`f(x)=${formula(data)}`} /> eingesetzt.
        </p>
        <p>
          Beispiel für <InlineMath math={`x=${exampleX}`} />:
        </p>
        <p>
          <InlineMath
            math={`f(${exampleX})=${data.a}\\cdot(${exampleX})^3+${data.b}\\cdot(${exampleX})^2+${data.c}\\cdot(${exampleX})+${data.d}`}
          />
        </p>
        <p>
          <InlineMath math={`f(${exampleX})=${pp(value(data, exampleX))}`} />
        </p>
        <table className="mb-3 border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border px-4 py-1">x</th>
              {data.xs.map(x => (
                <td key={x} className="border px-4 py-1 text-center">
                  {x}
                </td>
              ))}
            </tr>
            <tr>
              <th className="border px-4 py-1">f(x)</th>
              {data.xs.map(x => (
                <td key={x} className="border px-4 py-1 text-center">
                  {pp(value(data, x))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p>Damit sind die gesuchten Termwerte vollständig berechnet.</p>
      </>
    )
  },
}
