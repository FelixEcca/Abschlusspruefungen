import { pp } from '@/helper/pretty-print'

export type Point = { x: number; y: number }

export function round1(x: number) {
  return Math.round(x * 10) / 10
}

export function round2(x: number) {
  return Math.round(x * 100) / 100
}

export function mpsToKmh(v: number) {
  return round1(v * 3.6)
}

export function kmhToMps(v: number) {
  return round2(v / 3.6)
}

function unitPart(part: string) {
  const match = part.match(/^([A-Za-z]+)\^(\d+)$/)
  if (match) return `\\mathrm{${match[1]}}^{${match[2]}}`
  return `\\mathrm{${part}}`
}

export function unit(unitText: string) {
  const [numerator, denominator] = unitText.split('/')
  if (denominator) {
    return `\\frac{${unitPart(numerator)}}{${unitPart(denominator)}}`
  }
  return unitPart(numerator)
}

export function ValueTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | number)[][]
}) {
  return (
    <table className="my-4 border-collapse text-sm">
      <thead>
        <tr>
          {headers.map(header => (
            <th
              key={header}
              className="border border-slate-300 bg-slate-100 px-3 py-2 text-left"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-slate-300 px-3 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function SimpleLineChart({
  points,
  xLabel,
  yLabel,
  xUnit,
  yUnit,
  xMax,
  yMax,
  xStep,
  yStep,
  showArea = false,
}: {
  points: Point[]
  xLabel: string
  yLabel: string
  xUnit: string
  yUnit: string
  xMax: number
  yMax: number
  xStep: number
  yStep: number
  showArea?: boolean
}) {
  const left = 48
  const top = 18
  const width = 330
  const height = 190
  const xToSvg = (x: number) => left + (x / xMax) * width
  const yToSvg = (y: number) => top + height - (y / yMax) * height
  const linePoints = points.map(p => `${xToSvg(p.x)},${yToSvg(p.y)}`).join(' ')
  const areaPoints = [
    `${xToSvg(points[0].x)},${yToSvg(0)}`,
    ...points.map(p => `${xToSvg(p.x)},${yToSvg(p.y)}`),
    `${xToSvg(points[points.length - 1].x)},${yToSvg(0)}`,
  ].join(' ')

  const xTicks = Array.from(
    { length: Math.floor(xMax / xStep) + 1 },
    (_v, i) => round2(i * xStep),
  )
  const yTicks = Array.from(
    { length: Math.floor(yMax / yStep) + 1 },
    (_v, i) => round2(i * yStep),
  )

  return (
    <svg viewBox="0 0 430 260" className="my-4 w-full max-w-xl" role="img">
      <rect x={left} y={top} width={width} height={height} fill="#fff" stroke="#cbd5e1" />
      {xTicks.map(tick => (
        <g key={`x-${tick}`}>
          <line
            x1={xToSvg(tick)}
            y1={top}
            x2={xToSvg(tick)}
            y2={top + height}
            stroke={tick === 0 ? '#475569' : '#e2e8f0'}
            strokeWidth={tick === 0 ? 2 : 1}
          />
          <text x={xToSvg(tick)} y={top + height + 22} fontSize="13" textAnchor="middle">
            {pp(tick)}
          </text>
        </g>
      ))}
      {yTicks.map(tick => (
        <g key={`y-${tick}`}>
          <line
            x1={left}
            y1={yToSvg(tick)}
            x2={left + width}
            y2={yToSvg(tick)}
            stroke={tick === 0 ? '#475569' : '#e2e8f0'}
            strokeWidth={tick === 0 ? 2 : 1}
          />
          <text x={left - 8} y={yToSvg(tick) + 4} fontSize="13" textAnchor="end">
            {pp(tick)}
          </text>
        </g>
      ))}
      {showArea ? <polygon points={areaPoints} fill="#f97316" opacity="0.18" /> : null}
      <polyline points={linePoints} fill="none" stroke="#2563eb" strokeWidth="3" />
      {points.map(point => (
        <circle key={`${point.x}-${point.y}`} cx={xToSvg(point.x)} cy={yToSvg(point.y)} r="4" fill="#2563eb" />
      ))}
      <text x={left + width + 10} y={top + height + 5} fontSize="14" fontWeight="700">
        {xLabel} in {xUnit}
      </text>
      <text x={left - 35} y={top - 6} fontSize="14" fontWeight="700">
        {yLabel} in {yUnit}
      </text>
    </svg>
  )
}

export function AnswerLine() {
  return <span className="inline-block w-32 border-b border-slate-500" />
}
