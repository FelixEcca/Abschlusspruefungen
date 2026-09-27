import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  periodPi: number
  startPi: number
}

const chart = {
  left: 58,
  top: 22,
  width: 430,
  height: 210,
  yMin: -1.25,
  yMax: 1.25,
}

function piLabel(value: number) {
  if (value === 0) return '0'
  if (value === 1) return '\\pi'
  if (value === -1) return '-\\pi'
  return `${value}\\pi`
}

function formatGermanNumber(value: number) {
  return Number.isInteger(value)
    ? `${value}`
    : value.toFixed(1).replace('.', ',')
}

function piText(value: number) {
  if (value === 0) return '0'
  if (value === 1) return 'π'
  if (value === -1) return '-π'
  return `${formatGermanNumber(value)}π`
}

function xToSvg(xPi: number, data: DATA) {
  const xMin = data.startPi
  const xMax = data.startPi + 3 * data.periodPi
  return chart.left + ((xPi - xMin) / (xMax - xMin)) * chart.width
}

function yToSvg(y: number) {
  return chart.top + ((chart.yMax - y) / (chart.yMax - chart.yMin)) * chart.height
}

function sinePoints(data: DATA) {
  const points: string[] = []
  const xMax = data.startPi + 3 * data.periodPi
  for (let xPi = data.startPi; xPi <= xMax; xPi += 0.04) {
    const angle = ((xPi - data.startPi) / data.periodPi) * 2 * Math.PI
    points.push(`${xToSvg(xPi, data)},${yToSvg(Math.sin(angle))}`)
  }
  return points.join(' ')
}

function ticks(data: DATA) {
  const values: number[] = []
  const xMax = data.startPi + 3 * data.periodPi
  for (let x = data.startPi; x <= xMax; x += data.periodPi / 2) {
    values.push(Number(x.toFixed(2)))
  }
  return values
}

function minorTicks(data: DATA) {
  const values: number[] = []
  const xMax = data.startPi + 3 * data.periodPi
  for (let x = data.startPi; x <= xMax; x += data.periodPi / 4) {
    values.push(Number(x.toFixed(2)))
  }
  return values
}

function SineChart({
  data,
  showPeriod = false,
}: {
  data: DATA
  showPeriod?: boolean
}) {
  const periodStart = data.startPi
  const periodEnd = data.startPi + data.periodPi
  const yArrow = chart.top + chart.height + 50
  const xAxisY = yToSvg(0)
  const yAxisX = xToSvg(0, data)

  return (
    <svg viewBox="0 0 550 335" className="my-4 max-w-2xl">
      <rect
        x={chart.left}
        y={chart.top}
        width={chart.width}
        height={chart.height}
        fill="#ffffff"
        stroke="#cbd5e1"
      />
      {minorTicks(data).map(tick => (
        <line
          key={`minor-${tick}`}
          x1={xToSvg(tick, data)}
          y1={chart.top}
          x2={xToSvg(tick, data)}
          y2={chart.top + chart.height}
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}
      {[-1, -0.5, 0, 0.5, 1].map(y => (
        <line
          key={`minor-y-${y}`}
          x1={chart.left}
          y1={yToSvg(y)}
          x2={chart.left + chart.width}
          y2={yToSvg(y)}
          stroke={y === 0 ? '#475569' : '#e2e8f0'}
          strokeWidth={y === 0 ? '2' : '1'}
        />
      ))}
      {ticks(data).map(tick => (
        <g key={tick}>
          <line
            x1={xToSvg(tick, data)}
            y1={chart.top}
            x2={xToSvg(tick, data)}
            y2={chart.top + chart.height}
            stroke={tick === 0 ? '#475569' : '#94a3b8'}
            strokeWidth={tick === 0 ? '2' : '1.5'}
          />
          <text
            x={xToSvg(tick, data)}
            y="256"
            fontSize="16"
            fontWeight="600"
            textAnchor="middle"
            fill="#172033"
          >
            {piText(tick)}
          </text>
        </g>
      ))}
      {[-1, -0.5, 0, 0.5, 1].map(y => (
        <g key={y}>
          <line
            x1={chart.left}
            y1={yToSvg(y)}
            x2={chart.left + chart.width}
            y2={yToSvg(y)}
            stroke={y === 0 ? '#475569' : '#94a3b8'}
            strokeWidth={y === 0 ? '2' : '1.5'}
          />
          <text
            x="45"
            y={yToSvg(y) + 5}
            fontSize="15"
            fontWeight={y === 0 ? '700' : '500'}
            textAnchor="end"
            fill="#172033"
          >
            {formatGermanNumber(y)}
          </text>
        </g>
      ))}
      <line
        x1={chart.left}
        y1={xAxisY}
        x2={chart.left + chart.width + 12}
        y2={xAxisY}
        stroke="#172033"
        strokeWidth="2"
      />
      <path
        d={`M${chart.left + chart.width + 12} ${xAxisY}l-8 -5v10z`}
        fill="#172033"
      />
      <line
        x1={yAxisX}
        y1={chart.top + chart.height}
        x2={yAxisX}
        y2={chart.top - 10}
        stroke="#172033"
        strokeWidth="2"
      />
      <path d={`M${yAxisX} ${chart.top - 10}l-5 8h10z`} fill="#172033" />
      <text
        x={chart.left + chart.width + 24}
        y={xAxisY + 5}
        fontSize="18"
        fontWeight="700"
        fill="#172033"
      >
        x
      </text>
      <text
        x={yAxisX + 8}
        y={chart.top - 12}
        fontSize="18"
        fontWeight="700"
        fill="#172033"
      >
        y
      </text>
      <polyline
        points={sinePoints(data)}
        fill="none"
        stroke="#2563eb"
        strokeWidth="3.5"
      />
      {showPeriod ? (
        <>
          <line
            x1={xToSvg(periodStart, data)}
            y1={yArrow}
            x2={xToSvg(periodEnd, data)}
            y2={yArrow}
            stroke="#f97316"
            strokeWidth="3"
          />
          <path
            d={`M${xToSvg(periodStart, data)} ${yArrow}l8 -5v10z`}
            fill="#f97316"
          />
          <path
            d={`M${xToSvg(periodEnd, data)} ${yArrow}l-8 -5v10z`}
            fill="#f97316"
          />
          <text
            x={(xToSvg(periodStart, data) + xToSvg(periodEnd, data)) / 2}
            y={yArrow + 18}
            fontSize="12"
            fill="#c2410c"
            textAnchor="middle"
          >
            eine volle Wiederholung
          </text>
        </>
      ) : null}
    </svg>
  )
}

export const exercise20005: Exercise<DATA> = {
  title: 'Periodenlänge im Bogenmaß ablesen',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 10,
  points: 10,
  generator(rng) {
    return {
      periodPi: rng.randomItemFromArray([1, 2, 3, 4]),
      startPi: rng.randomItemFromArray([-2, -1, 0]),
    }
  },
  originalData: {
    periodPi: 2,
    startPi: -1,
  },
  task({ data }) {
    return (
      <>
        <p>
          Lesen Sie an der Sinuskurve ab, welche Periodenlänge sie im Bogenmaß
          hat.
        </p>
        <SineChart data={data} />
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die Periodenlänge ist der Abstand auf der x-Achse, bis sich der Graph
          wieder genauso wiederholt.
        </p>
        <SineChart data={data} showPeriod />
        <p>
          Von <InlineMath math={piLabel(data.startPi)} /> bis{' '}
          <InlineMath math={piLabel(data.startPi + data.periodPi)} /> liegt
          eine volle Wiederholung.
        </p>
        <p>
          Die Periodenlänge beträgt deshalb{' '}
          <b>
            <InlineMath math={piLabel(data.periodPi)} />
          </b>
          .
        </p>
      </>
    )
  },
}
