import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  angle: number
  sine: number
  xMin: number
  xMax: number
}

interface CHART {
  left: number
  top: number
  width: number
  height: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

function getChart(data: Pick<DATA, 'xMin' | 'xMax'>): CHART {
  return {
    left: 46,
    top: 18,
    width: 430,
    height: 190,
    xMin: data.xMin,
    xMax: data.xMax,
    yMin: -1.2,
    yMax: 1.2,
  }
}

function xToSvg(x: number, chart: CHART) {
  return (
    chart.left +
    ((x - chart.xMin) / (chart.xMax - chart.xMin)) * chart.width
  )
}

function yToSvg(y: number, chart: CHART) {
  return (
    chart.top +
    ((chart.yMax - y) / (chart.yMax - chart.yMin)) * chart.height
  )
}

function sinePoints(chart: CHART) {
  const points: string[] = []
  for (let x = chart.xMin; x <= chart.xMax; x += 3) {
    points.push(
      `${xToSvg(x, chart)},${yToSvg(Math.sin((x * Math.PI) / 180), chart)}`,
    )
  }
  return points.join(' ')
}

function sameSineAngles({ angle, xMin, xMax }: DATA) {
  const other = 180 - angle
  const result: number[] = []
  for (let k = -4; k <= 4; k++) {
    const first = angle + 360 * k
    const second = other + 360 * k
    if (first >= xMin && first <= xMax) result.push(first)
    if (second >= xMin && second <= xMax) result.push(second)
  }
  return [...new Set(result)].sort((a, b) => a - b)
}

function axisTicks({ xMin, xMax }: DATA) {
  const first = Math.ceil(xMin / 90) * 90
  const ticks: number[] = []
  for (let tick = first; tick <= xMax; tick += 90) ticks.push(tick)
  return ticks
}

function SineChart({
  data,
  showSolutions = false,
}: {
  data: DATA
  showSolutions?: boolean
}) {
  const chart = getChart(data)
  const angles = sameSineAngles(data)
  return (
    <svg viewBox="0 0 520 250" className="my-4 max-w-2xl">
      <rect
        x={chart.left}
        y={chart.top}
        width={chart.width}
        height={chart.height}
        fill="#ffffff"
        stroke="#cbd5e1"
      />
      {axisTicks(data).map(x => (
        <g key={x}>
          <line
            x1={xToSvg(x, chart)}
            y1={chart.top}
            x2={xToSvg(x, chart)}
            y2={chart.top + chart.height}
            stroke={x === 0 ? '#94a3b8' : '#e2e8f0'}
          />
          <text x={xToSvg(x, chart)} y="230" fontSize="10" textAnchor="middle">
            {x}°
          </text>
        </g>
      ))}
      {[-1, -0.5, 0, 0.5, 1].map(y => (
        <g key={y}>
          <line
            x1={chart.left}
            y1={yToSvg(y, chart)}
            x2={chart.left + chart.width}
            y2={yToSvg(y, chart)}
            stroke={y === 0 ? '#64748b' : '#e2e8f0'}
          />
          <text
            x="38"
            y={yToSvg(y, chart) + 4}
            fontSize="10"
            textAnchor="end"
          >
            {y}
          </text>
        </g>
      ))}
      <polyline
        points={sinePoints(chart)}
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
      />
      <line
        x1={chart.left}
        y1={yToSvg(data.sine, chart)}
        x2={chart.left + chart.width}
        y2={yToSvg(data.sine, chart)}
        stroke="#f97316"
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <text
        x={chart.left + chart.width - 8}
        y={yToSvg(data.sine, chart) - 6}
        fontSize="12"
        fill="#c2410c"
        textAnchor="end"
      >
        sin(x) ≈ {String(data.sine).replace('.', ',')}
      </text>
      {showSolutions
        ? angles.map(angle => (
            <g key={angle}>
              <line
                x1={xToSvg(angle, chart)}
                y1={yToSvg(data.sine, chart)}
                x2={xToSvg(angle, chart)}
                y2={yToSvg(0, chart)}
                stroke="#16a34a"
                strokeWidth="2"
              />
              <circle
                cx={xToSvg(angle, chart)}
                cy={yToSvg(data.sine, chart)}
                r="4"
                fill="#16a34a"
              />
              <text
                x={xToSvg(angle, chart)}
                y={yToSvg(0, chart) + 16}
                fontSize="11"
                textAnchor="middle"
                fill="#166534"
              >
                {angle}°
              </text>
            </g>
          ))
        : null}
    </svg>
  )
}

export const exercise20002: Exercise<DATA> = {
  title: 'Gleiche Sinuswerte im Intervall finden',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 14,
  points: 14,
  generator(rng) {
    const angle = rng.randomItemFromArray([
      20, 30, 40, 50, 60, 70, 110, 120, 130, 140, 150, 160,
    ])
    const interval = rng.randomItemFromArray([
      { xMin: -270, xMax: 810 },
      { xMin: -360, xMax: 720 },
      { xMin: -180, xMax: 900 },
      { xMin: -450, xMax: 630 },
    ])
    return {
      angle,
      sine: Math.round(Math.sin((angle * Math.PI) / 180) * 100) / 100,
      ...interval,
    }
  },
  originalData: { angle: 50, sine: 0.77, xMin: -270, xMax: 810 },
  task({ data }) {
    return (
      <>
        <p>
          Für den Winkel <InlineMath math={`\\alpha=${data.angle}^\\circ`} />{' '}
          gilt ungefähr{' '}
          <InlineMath
            math={`\\sin(${data.angle}^\\circ)\\approx ${String(data.sine).replace('.', '{,}')}`}
          />
          .
        </p>
        <SineChart data={data} />
        <p>
          Ermitteln Sie mithilfe der Sinuskurve alle Winkelweiten im Intervall{' '}
          <InlineMath math={`[${data.xMin}^\\circ;${data.xMax}^\\circ]`} />,
          die denselben Sinuswert haben. Beschreiben Sie Ihr Vorgehen.
        </p>
      </>
    )
  },
  solution({ data }) {
    const secondAngle = 180 - data.angle
    const angles = sameSineAngles(data)
    return (
      <>
        <p>
          Eine waagerechte Linie beim Sinuswert{' '}
          <InlineMath
            math={`${String(data.sine).replace('.', '{,}')}`}
          />{' '}
          schneidet die Sinuskurve mehrfach.
        </p>
        <SineChart data={data} showSolutions />
        <p>
          Im Bereich von <InlineMath math={`0^\\circ`} /> bis{' '}
          <InlineMath math={`360^\\circ`} /> erhält man zwei Winkel:
        </p>
        <p>
          <InlineMath
            math={`${data.angle}^\\circ \\quad\\text{und}\\quad ${secondAngle}^\\circ`}
          />
        </p>
        <p>
          Wegen der Periodenlänge <InlineMath math={`360^\\circ`} /> entstehen
          weitere Lösungen durch Addieren oder Subtrahieren von{' '}
          <InlineMath math={`360^\\circ`} />.
        </p>
        <p>
          Im Intervall{' '}
          <InlineMath math={`[${data.xMin}^\\circ;${data.xMax}^\\circ]`} />{' '}
          liegen:
        </p>
        <p>
          <b>{angles.map(angle => `${angle}°`).join(', ')}</b>
        </p>
      </>
    )
  },
}
