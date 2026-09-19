import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  amplitude: number
  midline: number
  period: number
  phase: number
}

const axis = {
  left: 44,
  top: 18,
  width: 300,
  height: 210,
  xMax: 12,
  yMin: -4,
  yMax: 6,
}

function xToSvg(x: number) {
  return axis.left + (x / axis.xMax) * axis.width
}

function yToSvg(y: number) {
  return axis.top + ((axis.yMax - y) / (axis.yMax - axis.yMin)) * axis.height
}

function points(data: DATA) {
  const result: string[] = []
  for (let x = 0; x <= axis.xMax; x += 0.08) {
    const y =
      data.midline +
      data.amplitude * Math.sin((2 * Math.PI * (x - data.phase)) / data.period)
    result.push(`${xToSvg(x)},${yToSvg(y)}`)
  }
  return result.join(' ')
}

function CoordinateSystem({
  data,
  showHints = false,
}: {
  data: DATA
  showHints?: boolean
}) {
  const maximum = data.midline + data.amplitude
  const minimum = data.midline - data.amplitude
  const firstMax = data.phase + data.period / 4
  const nextMax = firstMax + data.period
  return (
    <svg viewBox="0 0 390 275" className="my-4 max-w-xl">
      <rect
        x={axis.left}
        y={axis.top}
        width={axis.width}
        height={axis.height}
        fill="#ffffff"
        stroke="#cbd5e1"
      />
      {Array.from({ length: 7 }, (_, index) => index * 2).map(x => (
        <g key={x}>
          <line
            x1={xToSvg(x)}
            y1={axis.top}
            x2={xToSvg(x)}
            y2={axis.top + axis.height}
            stroke="#898989"
          />
          <text x={xToSvg(x)} y="248" fontSize="11" textAnchor="middle">
            {x}
          </text>
        </g>
      ))}
      {Array.from({ length: 11 }, (_, index) => axis.yMin + index).map(y => (
        <g key={y}>
          <line
            x1={axis.left}
            y1={yToSvg(y)}
            x2={axis.left + axis.width}
            y2={yToSvg(y)}
            stroke={y === 0 ? '#94a3b8' : '#898989'}
          />
          <text x="34" y={yToSvg(y) + 4} fontSize="11" textAnchor="end">
            {y}
          </text>
        </g>
      ))}
      <line
        x1={axis.left}
        y1={yToSvg(0)}
        x2={axis.left + axis.width + 16}
        y2={yToSvg(0)}
        stroke="#334155"
      />
      <line
        x1={axis.left}
        y1={axis.top + axis.height}
        x2={axis.left}
        y2={axis.top - 10}
        stroke="#334155"
      />
      <text x="354" y={yToSvg(0) - 5} fontSize="12">
        x
      </text>
      <text x="18" y="24" fontSize="12">
        y
      </text>
      <polyline
        points={points(data)}
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
      />
      {showHints ? (
        <>
          <line
            x1={axis.left}
            y1={yToSvg(data.midline)}
            x2={axis.left + axis.width}
            y2={yToSvg(data.midline)}
            stroke="#f97316"
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <line
            x1={xToSvg(firstMax)}
            y1={yToSvg(maximum)}
            x2={xToSvg(firstMax)}
            y2={yToSvg(data.midline)}
            stroke="#16a34a"
            strokeWidth="3"
          />
          <line
            x1={xToSvg(firstMax)}
            y1={yToSvg(maximum) - 12}
            x2={xToSvg(nextMax)}
            y2={yToSvg(maximum) - 12}
            stroke="#dc2626"
            strokeWidth="3"
          />
          <text
            x={(xToSvg(firstMax) + xToSvg(nextMax)) / 2}
            y={yToSvg(maximum) - 18}
            fontSize="12"
            textAnchor="middle"
            fill="#991b1b"
          >
            Periodenlänge
          </text>
          <text
            x={xToSvg(firstMax) + 8}
            y={(yToSvg(maximum) + yToSvg(data.midline)) / 2}
            fontSize="12"
            fill="#166534"
          >
            Amplitude
          </text>
          <text
            x="250"
            y={yToSvg(data.midline) - 6}
            fontSize="12"
            fill="#c2410c"
          >
            Mittellinie
          </text>
          <circle
            cx={xToSvg(firstMax)}
            cy={yToSvg(maximum)}
            r="4"
            fill="#2563eb"
          />
          <circle
            cx={xToSvg(nextMax)}
            cy={yToSvg(maximum)}
            r="4"
            fill="#2563eb"
          />
          <circle
            cx={xToSvg(firstMax + data.period / 2)}
            cy={yToSvg(minimum)}
            r="4"
            fill="#2563eb"
          />
        </>
      ) : null}
    </svg>
  )
}

export const exercise20001: Exercise<DATA> = {
  title: 'Periodenlänge, Mittellinie und Amplitude ablesen',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { amplitude: 2, midline: 1, period: 4, phase: 0 },
      { amplitude: 3, midline: 0, period: 6, phase: 0 },
      { amplitude: 1.5, midline: 2, period: 4, phase: 1 },
      { amplitude: 2.5, midline: 1, period: 8, phase: 0 },
    ])
  },
  originalData: { amplitude: 2, midline: 1, period: 4, phase: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Lesen Sie aus dem Schaubild die Periodenlänge, die Mittellinie und die
          Amplitude der Kurve ab.
        </p>
        <CoordinateSystem data={data} />
      </>
    )
  },
  solution({ data }) {
    const maximum = data.midline + data.amplitude
    const minimum = data.midline - data.amplitude
    return (
      <>
        <p>
          Die Mittellinie liegt genau in der Mitte zwischen dem größten und dem
          kleinsten Funktionswert.
        </p>
        <CoordinateSystem data={data} showHints />
        <p>
          Größter Wert: {pp(maximum)}, kleinster Wert: {pp(minimum)}.
        </p>
        <p>
          Mittellinie: <b>y = {pp(data.midline)}</b>.
        </p>
        <p>
          Amplitude: Abstand von der Mittellinie bis zum Maximum. Also{' '}
          <b>{pp(data.amplitude)}</b>.
        </p>
        <p>
          Periodenlänge: Abstand zweier benachbarter Hochpunkte. Also{' '}
          <b>{pp(data.period)}</b>.
        </p>
      </>
    )
  },
}
