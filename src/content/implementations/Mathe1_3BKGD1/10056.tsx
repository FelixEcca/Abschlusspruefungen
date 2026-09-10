import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

type Kind = 'cubic1' | 'cubic2' | 'quartic'

interface DATA {
  kind: Kind
}

const xs = [-2, -1, 0, 1, 2]

function formula(kind: Kind) {
  if (kind === 'cubic1') return 'x^3-3x'
  if (kind === 'cubic2') return '-x^3+4x'
  return 'x^4-4x^2'
}

function value(kind: Kind, x: number) {
  if (kind === 'cubic1') return x ** 3 - 3 * x
  if (kind === 'cubic2') return -(x ** 3) + 4 * x
  return x ** 4 - 4 * x ** 2
}

function point(x: number, y: number) {
  const px = 150 + x * 45
  const py = 115 - y * 22
  return `${px},${py}`
}

export const exercise10056: Exercise<DATA> = {
  title: 'Graphen von Polynomfunktionen skizzieren',
  source: '3BKGD1',
  useCalculator: true,
  duration: 14,
  points: 14,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { kind: 'cubic1' },
      { kind: 'cubic2' },
      { kind: 'quartic' },
    ])
  },
  originalData: { kind: 'cubic1' },
  task({ data }) {
    return (
      <>
        <p>
          Skizzieren Sie den Graphen der Polynomfunktion:<br></br>{' '}
          <InlineMath math={`f(x)=${formula(data.kind)}`} />
        </p>
        <p>
          Erstellen Sie zuerst eine Wertetabelle für{' '}
          <InlineMath math="x=-2,-1,0,1,2" /> und tragen Sie die Punkte danach
          in ein Koordinatensystem ein.
        </p>
      </>
    )
  },
  solution({ data }) {
    const points = xs.map(x => ({ x, y: value(data.kind, x) }))
    return (
      <>
        <p>
          Zuerst werden die x-Werte nacheinander in{' '}
          <InlineMath math={`f(x)=${formula(data.kind)}`} /> eingesetzt.
        </p>
        <table className="mb-3 border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border px-4 py-1">x</th>
              {points.map(entry => (
                <td key={entry.x} className="border px-4 py-1 text-center">
                  {entry.x}
                </td>
              ))}
            </tr>
            <tr>
              <th className="border px-4 py-1">f(x)</th>
              {points.map(entry => (
                <td key={entry.x} className="border px-4 py-1 text-center">
                  {pp(entry.y)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p>Die Punkte werden eingetragen und anschließend glatt verbunden.</p>
        <svg viewBox="0 0 300 230" className="my-3 max-w-md">
          <line x1="20" y1="115" x2="280" y2="115" stroke="#374151" />
          <line x1="150" y1="20" x2="150" y2="210" stroke="#374151" />
          {[-2, -1, 1, 2].map(x => (
            <g key={x}>
              <line
                x1={150 + x * 45}
                y1="111"
                x2={150 + x * 45}
                y2="119"
                stroke="#374151"
              />
              <text x={145 + x * 45} y="135" fontSize="11">
                {x}
              </text>
            </g>
          ))}
          {[-4, -2, 2, 4].map(y => (
            <g key={y}>
              <line
                x1="146"
                y1={115 - y * 22}
                x2="154"
                y2={115 - y * 22}
                stroke="#374151"
              />
              <text x="122" y={119 - y * 22} fontSize="11">
                {y}
              </text>
            </g>
          ))}
          <polyline
            points={points.map(entry => point(entry.x, entry.y)).join(' ')}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
          />
          {points.map(entry => (
            <circle
              key={entry.x}
              cx={150 + entry.x * 45}
              cy={115 - entry.y * 22}
              r="4"
              fill="#dc2626"
            />
          ))}
        </svg>
        <p>
          Die Skizze muss nicht perfekt sein. Wichtig ist, dass die berechneten
          Punkte korrekt liegen und der Verlauf passend verbunden wird.
        </p>
      </>
    )
  },
}
