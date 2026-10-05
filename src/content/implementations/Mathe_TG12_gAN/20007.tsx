import { Exercise } from '@/data/types'

type FunctionType = 'sin' | 'negativeSin' | 'cos' | 'negativeCos'

interface DATA {
  functionType: FunctionType
}

const functionTypes: FunctionType[] = [
  'sin',
  'negativeSin',
  'cos',
  'negativeCos',
]

export const exercise20007: Exercise<DATA> = {
  title: 'Sin, -Sin, Cos, -Cos?',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      functionType: rng.randomItemFromArray(functionTypes),
    }
  },
  originalData: {
    functionType: 'sin',
  },
  task({ data }) {
    return (
      <>
        <p>Welche Winkelfunktion ist im Schaubild dargestellt?</p>
        <TrigGraph functionType={data.functionType} />
      </>
    )
  },
  solution({ data }) {
    return <p>{functionName(data.functionType)}</p>
  },
}

const chart = {
  left: 48,
  top: 20,
  width: 300,
  height: 180,
  xMin: -2 * Math.PI,
  xMax: 2 * Math.PI,
  yMin: -1.25,
  yMax: 1.25,
}

function functionName(functionType: FunctionType) {
  if (functionType === 'sin') return 'sin(x)'
  if (functionType === 'negativeSin') return '-sin(x)'
  if (functionType === 'cos') return 'cos(x)'
  return '-cos(x)'
}

function functionValue(functionType: FunctionType, x: number) {
  if (functionType === 'sin') return Math.sin(x)
  if (functionType === 'negativeSin') return -Math.sin(x)
  if (functionType === 'cos') return Math.cos(x)
  return -Math.cos(x)
}

function xToSvg(x: number) {
  return (
    chart.left + ((x - chart.xMin) / (chart.xMax - chart.xMin)) * chart.width
  )
}

function yToSvg(y: number) {
  return (
    chart.top + ((chart.yMax - y) / (chart.yMax - chart.yMin)) * chart.height
  )
}

function graphPoints(functionType: FunctionType) {
  const points: string[] = []
  for (let x = chart.xMin; x <= chart.xMax; x += 0.04) {
    points.push(`${xToSvg(x)},${yToSvg(functionValue(functionType, x))}`)
  }
  return points.join(' ')
}

function piLabel(halfPi: number) {
  if (halfPi === 0) return '0'

  const sign = halfPi < 0 ? '-' : ''
  const absolute = Math.abs(halfPi)
  if (absolute === 1) return `${sign}π/2`
  if (absolute === 2) return `${sign}π`
  if (absolute === 3) return `${sign}3π/2`
  return `${sign}2π`
}

function TrigGraph({ functionType }: { functionType: FunctionType }) {
  const xAxisY = yToSvg(0)
  const yAxisX = xToSvg(0)

  return (
    <svg
      viewBox="0 0 390 245"
      className="my-4 w-full max-w-xl"
      role="img"
      aria-label="Schaubild einer Winkelfunktion"
    >
      <rect
        x={chart.left}
        y={chart.top}
        width={chart.width}
        height={chart.height}
        fill="#ffffff"
        stroke="#cbd5e1"
      />

      {Array.from({ length: 9 }, (_, index) => index - 4).map(halfPi => {
        const x = (halfPi * Math.PI) / 2
        return (
          <g key={halfPi}>
            <line
              x1={xToSvg(x)}
              y1={chart.top}
              x2={xToSvg(x)}
              y2={chart.top + chart.height}
              stroke={halfPi === 0 ? '#475569' : '#e2e8f0'}
              strokeWidth={halfPi === 0 ? '1.7' : '1'}
            />
            <text
              x={xToSvg(x)}
              y={chart.top + chart.height + 17}
              fontSize="10"
              textAnchor="middle"
              fill="#334155"
            >
              {piLabel(halfPi)}
            </text>
          </g>
        )
      })}

      {[-1, 0, 1].map(y => (
        <g key={y}>
          <line
            x1={chart.left}
            y1={yToSvg(y)}
            x2={chart.left + chart.width}
            y2={yToSvg(y)}
            stroke={y === 0 ? '#475569' : '#cbd5e1'}
            strokeWidth={y === 0 ? '1.7' : '1'}
          />
          <text
            x={chart.left - 9}
            y={yToSvg(y) + 4}
            fontSize="11"
            textAnchor="end"
            fill="#334155"
          >
            {y}
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
        x={chart.left + chart.width + 22}
        y={xAxisY + 5}
        fontSize="15"
        fontWeight="700"
      >
        x
      </text>
      <text x={yAxisX + 7} y={chart.top - 8} fontSize="15" fontWeight="700">
        y
      </text>

      <polyline
        points={graphPoints(functionType)}
        fill="none"
        stroke="#2563eb"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
