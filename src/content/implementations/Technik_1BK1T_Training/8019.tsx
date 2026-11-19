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

interface DATA {
  a: number
  b: number
  angle: number
  scale: number
  context: number
}
const contexts = [
  'Ein Boot wird von der Strömung versetzt.',
  'Eine Drohne fliegt bei Seitenwind.',
  'Eine Schwimmerin bewegt sich in einer Strömung.',
  'Ein Modellfahrzeug fährt auf einer bewegten Plattform.',
]
function arrows(data: DATA) {
  const phi = (data.angle * Math.PI) / 180
  return [
    { x: data.a, y: 0, label: 'v₁', color: '#2563eb' },
    {
      x: data.b * Math.cos(phi),
      y: data.b * Math.sin(phi),
      label: 'v₂',
      color: '#13765d',
    },
  ]
}
export const exercise8019: Exercise<DATA> = {
  title: 'Geschwindigkeiten grafisch überlagern',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 9,
  points: 8,
  generator(rng) {
    const context = rng.randomIntBetween(0, contexts.length - 1)
    return {
      context,
      a: rng.randomItemFromArray([3, 4, 5]),
      b: rng.randomItemFromArray([2, 3, 4]),
      angle: rng.randomItemFromArray([-90, -45, 45, 60, 90, 120]),
      scale: context === 1 ? 2 : 0.5,
    }
  },
  originalData: { context: 0, a: 4, b: 3, angle: 60, scale: 0.5 },
  constraint: ({ data }) =>
    !!contexts[data.context] &&
    [3, 4, 5].includes(data.a) &&
    [2, 3, 4].includes(data.b) &&
    [-90, -45, 45, 60, 90, 120].includes(data.angle) &&
    [0.5, 2].includes(data.scale),
  task({ data }) {
    return (
      <>
        <p>
          {contexts[data.context]} Die beiden Teilgeschwindigkeiten sind als
          Pfeile dargestellt. Ein Kästchen entspricht {m(n(data.scale, 'm/s'))}.
        </p>
        <p>
          Ergänzen Sie das Geschwindigkeitsparallelogramm. Lesen Sie Betrag und
          Richtung der Resultierenden näherungsweise ab. Geben Sie die Richtung
          als Winkel oberhalb oder unterhalb der positiven x-Achse an.
        </p>
        <VectorDiagram vectors={arrows(data)} />
      </>
    )
  },
  solution({ data }) {
    const vectors = arrows(data),
      x = vectors[0].x + vectors[1].x,
      y = vectors[1].y
    const angle = Math.abs((Math.atan2(y, x) * 180) / Math.PI)
    return (
      <>
        <p>
          Verschieben Sie beide Pfeile parallel an die Spitze des jeweils
          anderen Pfeils. Die Diagonale vom gemeinsamen Anfangspunkt ist die
          Resultierende.
        </p>
        <VectorDiagram
          vectors={vectors}
          resultVector={{ x, y, label: 'vᵣ', color: '#be123c' }}
        />
        <p>
          Die Diagonale misst etwa {pp(round2(Math.hypot(x, y)))} Kästchen.
          Multipliziert mit dem Maßstab ergibt das:
        </p>
        {result('v_{\\mathrm{res}}', Math.hypot(x, y) * data.scale, 'm/s')}
        <p>
          Der Pfeil zeigt etwa {m(`${pp(Math.round(angle))}^{\\circ}`)}{' '}
          {y < 0 ? 'unterhalb' : 'oberhalb'} der positiven x-Achse. Beim Ablesen
          sind kleine Abweichungen möglich.
        </p>
      </>
    )
  },
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
