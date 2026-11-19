import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'

const m = (math: string) => <InlineMath math={math} />
const n = (value: number, u: string) => `${pp(value)}\\,${unit(u)}`
const result = (symbol: string, value: number, u: string) => (
  <p>
    <strong>
      {m(
        `${symbol}${Math.abs(round2(value) - value) < 1e-9 ? '=' : '\\approx'}${n(round2(value), u)}`,
      )}
    </strong>
  </p>
)

const cases = [
  [
    'Eine Person geht auf einem Laufband.',
    'Laufband relativ zum Boden',
    'Person relativ zum Laufband',
  ],
  [
    'Eine Person geht auf einer Rolltreppe.',
    'Rolltreppe relativ zum Gebäude',
    'Person relativ zur Rolltreppe',
  ],
  [
    'Ein Boot fährt in einem Fluss längs zur Strömung.',
    'Wasser relativ zum Ufer',
    'Boot relativ zum Wasser',
  ],
  [
    'Ein Roboter fährt auf einer bewegten Plattform.',
    'Plattform relativ zur Halle',
    'Roboter relativ zur Plattform',
  ],
]
interface DATA {
  context: number
  a: number
  b: number
  scale: number
}
function arrows(data: DATA) {
  return [
    { x: data.a, y: 0, label: 'v₁', color: '#2563eb' },
    { x: data.b, y: 0, label: 'v₂', color: '#13765d' },
  ]
}
export const exercise8018: Exercise<DATA> = {
  title: 'Geschwindigkeitspfeile und Maßstab',
  source: '1BK1T GT',
  useCalculator: false,
  duration: 8,
  generator(rng) {
    return {
      context: rng.randomIntBetween(0, cases.length - 1),
      a: rng.randomItemFromArray([3, 4, 5]),
      b: rng.randomItemFromArray([-3, -2, -1, 1, 2]),
      scale: rng.randomItemFromArray([0.2, 0.25, 0.5]),
    }
  },
  originalData: { context: 0, a: 4, b: -2, scale: 0.25 },
  constraint: ({ data }) =>
    !!cases[data.context] &&
    [3, 4, 5].includes(data.a) &&
    [-3, -2, -1, 1, 2].includes(data.b) &&
    [0.2, 0.25, 0.5].includes(data.scale),
  intro({ data }) {
    const [text, a, b] = cases[data.context]
    return (
      <>
        <p>
          {text} {m('\\vec v_1')}: {a}. {m('\\vec v_2')}: {b}. Die positive
          Richtung ist entlang der Bahn nach rechts.
        </p>
        <p>Ein Kästchen entspricht {m(n(data.scale, 'm/s'))}.</p>
        <VectorDiagram vectors={arrows(data)} />
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task: () => (
        <p>
          Lesen Sie die Längen der beiden Pfeile in Kästchen ab. Geben Sie beide
          Geschwindigkeiten mit Vorzeichen an.
        </p>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Ein Pfeil nach rechts zählt positiv, ein Pfeil nach links negativ.
            Multiplizieren Sie die vorzeichenbehaftete Kästchenzahl mit dem
            Maßstab.
          </p>
          {result('v_1', data.a * data.scale, 'm/s')}
          {result('v_2', data.b * data.scale, 'm/s')}
        </>
      ),
    },
    {
      points: 4,
      task: () => (
        <p>
          Bestimmen Sie die resultierende Geschwindigkeit gegenüber dem Boden.
          Skizzieren Sie den resultierenden Pfeil und geben Sie die Richtung an.
        </p>
      ),
      solution({ data }) {
        const sum = data.a + data.b
        return (
          <>
            <p>
              Da beide Geschwindigkeiten entlang derselben Linie wirken, werden
              die vorzeichenbehafteten Werte addiert.
            </p>
            <p>
              {m(
                `v_{\\mathrm{res}}=v_1+v_2=${n(data.a * data.scale, 'm/s')}+\\left(${n(data.b * data.scale, 'm/s')}\\right)`,
              )}
            </p>
            {result('v_{\\mathrm{res}}', sum * data.scale, 'm/s')}
            <p>
              {sum === 0
                ? 'Die Geschwindigkeiten heben sich auf. Der Körper ruht relativ zum Boden.'
                : `Der resultierende Pfeil ist ${pp(sum)} Kästchen lang und zeigt nach rechts.`}
            </p>
            <VectorDiagram
              vectors={arrows(data)}
              resultVector={{ x: sum, y: 0, label: 'vᵣ', color: '#be123c' }}
            />
          </>
        )
      },
    },
  ],
}

type Vector = { x: number; y: number; label: string; color: string }
function VectorDiagram({
  vectors,
  resultVector,
}: {
  vectors: Vector[]
  resultVector?: Vector
}) {
  const step = 20,
    ox = 82,
    oy = 126
  const xy = (x: number, y: number) => [ox + x * step, oy - y * step]
  function arrow(v: Vector) {
    const [x, y] = xy(v.x, v.y),
      len = Math.hypot(x - ox, y - oy)
    if (len < 1e-8) return null
    const ux = (x - ox) / len,
      uy = (y - oy) / len,
      bx = x - 8 * ux,
      by = y - 8 * uy
    return (
      <g key={v.label}>
        <line
          x1={ox}
          y1={oy}
          x2={x}
          y2={y}
          stroke={v.color}
          strokeWidth={2.5}
        />
        <path
          d={`M${x},${y}L${bx - 4 * uy},${by + 4 * ux}L${bx + 4 * uy},${by - 4 * ux}Z`}
          fill={v.color}
        />
        <text
          x={x + (v.x < 0 ? -6 : 6)}
          y={y - 8}
          textAnchor={v.x < 0 ? 'end' : 'start'}
          fontSize={15}
          fill={v.color}
        >
          {v.label}
        </text>
      </g>
    )
  }
  return (
    <svg
      viewBox="0 0 330 252"
      className="my-4 block w-full max-w-md"
      role="img"
      aria-label="Geschwindigkeitspfeile auf einem quadratischen Raster"
    >
      <rect
        x={22}
        y={6}
        width={280}
        height={240}
        fill="white"
        stroke="#cbd5e1"
      />
      {Array.from({ length: 15 }, (_, i) => (
        <path key={`x${i}`} d={`M${22 + i * step},6v240`} stroke="#e2e8f0" />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <path key={`y${i}`} d={`M22,${6 + i * step}h280`} stroke="#e2e8f0" />
      ))}
      <path
        d={`M22,${oy}H313m-7,-4l7,4l-7,4 M${ox},246V9m-4,7l4,-7l4,7`}
        fill="none"
        stroke="#475569"
      />
      <text x={318} y={oy + 4} fontSize={12}>
        x
      </text>
      <text x={ox + 8} y={17} fontSize={12}>
        y
      </text>
      {resultVector &&
        vectors.length === 2 &&
        vectors.map(v => {
          const [x, y] = xy(v.x, v.y),
            [rx, ry] = xy(resultVector.x, resultVector.y)
          return (
            <line
              key={v.label}
              x1={x}
              y1={y}
              x2={rx}
              y2={ry}
              stroke="#64748b"
              strokeDasharray="4 3"
            />
          )
        })}
      {vectors.map(arrow)}
      {resultVector && arrow(resultVector)}
      <circle cx={ox} cy={oy} r={3} fill="#172033" />
    </svg>
  )
}
