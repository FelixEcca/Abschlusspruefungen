import { ReactNode } from 'react'

export function FunctionGraph({
  fn,
  xMin,
  xMax,
  yMin,
  yMax,
  xStep = 1,
  yStep = 1,
  xTickLabel,
}: {
  fn: (x: number) => number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  xStep?: number
  yStep?: number
  xTickLabel?: (x: number) => string
}) {
  const sx = (x: number) => 38 + (300 * (x - xMin)) / (xMax - xMin)
  const sy = (y: number) => 18 + (220 * (yMax - y)) / (yMax - yMin)
  const yAxisX = sx(Math.max(xMin, Math.min(xMax, 0)))
  const points = Array.from({ length: 601 }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / 600
    return `${sx(x)},${sy(fn(x))}`
  }).join(' ')
  return (
    <svg
      viewBox="0 0 370 275"
      className="my-4 w-full"
      role="img"
      aria-label="Funktionsgraph mit Koordinatengitter"
    >
      <rect
        x="38"
        y="18"
        width="300"
        height="220"
        fill="white"
        stroke="#94a3b8"
      />
      {Array.from(
        { length: Math.floor((xMax - xMin) / xStep) + 1 },
        (_, i) => xMin + i * xStep,
      ).map(x => (
        <g key={x}>
          <line x1={sx(x)} x2={sx(x)} y1="18" y2="238" stroke="#cbd5e1" />
          <text x={sx(x)} y={sy(0) + 16} fontSize="11" textAnchor="middle">
            {xTickLabel ? xTickLabel(x) : Number(x.toFixed(2))}
          </text>
        </g>
      ))}
      {Array.from(
        { length: Math.floor((yMax - yMin) / yStep) + 1 },
        (_, i) => yMin + i * yStep,
      ).map(y => (
        <g key={y}>
          <line x1="38" x2="338" y1={sy(y)} y2={sy(y)} stroke="#cbd5e1" />
          <text x={yAxisX - 7} y={sy(y) + 4} fontSize="11" textAnchor="end">
            {Number(y.toFixed(2))}
          </text>
        </g>
      ))}
      <path
        d={`M38 ${sy(0)}H350m-5 -4l5 4-5 4 M${yAxisX} 238V8m-4 5l4-5 4 5`}
        stroke="#172033"
        fill="none"
      />
      <text x="353" y={sy(0) + 4} fontSize="13">
        x
      </text>
      <text x={yAxisX + 8} y="14" fontSize="13">
        y
      </text>
      <svg
        x="38"
        y="18"
        width="300"
        height="220"
        viewBox="38 18 300 220"
        overflow="hidden"
      >
        <polyline
          points={points}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
        />
      </svg>
    </svg>
  )
}

export function ProbabilityTree({
  first,
  second,
}: {
  first: { label: string; probability: string }[]
  second: { label: string; probability: string }[][]
}) {
  const leaves = second.reduce((s, row) => s + row.length, 0)
  let offset = 0
  return (
    <svg
      viewBox={`0 0 460 ${leaves * 42 + 30}`}
      className="my-4 w-full"
      role="img"
      aria-label="Vollständig beschriftetes Baumdiagramm"
    >
      <text x="2" y={leaves * 21 + 8} fontSize="13">
        Start
      </text>
      {first.map((branch, i) => {
        const row = second[i],
          start = offset
        offset += row.length
        const mid = (start + row.length / 2) * 42 + 10
        return (
          <g key={i}>
            <line
              x1="40"
              y1={leaves * 21 + 5}
              x2="190"
              y2={mid}
              stroke="#475569"
            />
            <text
              x="100"
              y={(leaves * 21 + 5 + mid) / 2 - 5}
              fontSize="12"
              fill="#1d4ed8"
            >
              {branch.probability}
            </text>
            <text x="193" y={mid + 4} fontSize="13">
              {branch.label}
            </text>
            {row.map((leaf, j) => {
              const y = (start + j) * 42 + 31
              return (
                <g key={j}>
                  <line x1="224" y1={mid} x2="384" y2={y} stroke="#475569" />
                  <text
                    x="287"
                    y={(mid + y) / 2 - 5}
                    fontSize="12"
                    fill="#1d4ed8"
                  >
                    {leaf.probability}
                  </text>
                  <text x="389" y={y + 4} fontSize="13">
                    {leaf.label}
                  </text>
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

export function TriangleSketch({
  parallelogram = false,
}: {
  parallelogram?: boolean
}) {
  return (
    <svg
      viewBox="0 0 340 210"
      className="my-4 w-full"
      role="img"
      aria-label={
        parallelogram
          ? 'Dreieck ABC mit ergänztem Parallelogramm ABPC'
          : 'Skizze des Dreiecks ABC'
      }
    >
      <path
        d="M45 170L155 170L155 55Z"
        fill="#eff6ff"
        stroke="#334155"
        strokeWidth="2"
      />
      <text x="26" y="190">
        A
      </text>
      <text x="159" y="190">
        C
      </text>
      <text x="147" y="44">
        B
      </text>
      {parallelogram && (
        <>
          <path
            d="M155 55L265 55L155 170"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="5 4"
            fill="none"
          />
          <text x="272" y="57">
            P
          </text>
        </>
      )}
    </svg>
  )
}

export function PrismSketch() {
  return (
    <svg
      viewBox="0 0 340 245"
      className="my-4 w-full"
      role="img"
      aria-label="Dreiecksprisma ABCDEF, mit senkrechten Kanten AD, BE und CF"
    >
      <path
        d="M60 190L230 190L130 230Z M60 55L230 55L130 95Z M60 55V190 M230 55V190 M130 95V230"
        fill="none"
        stroke="#334155"
        strokeWidth="2"
      />
      {[
        [45, 197, 'A'],
        [239, 197, 'B'],
        [125, 244, 'C'],
        [45, 52, 'D'],
        [239, 52, 'E'],
        [125, 89, 'F'],
      ].map(([x, y, label]) => (
        <text key={label} x={x} y={y}>
          {label}
        </text>
      ))}
    </svg>
  )
}

export function BinomialChart({ probabilities }: { probabilities: number[] }) {
  const peak = Math.max(...probabilities),
    top = Math.max(0.25, Math.ceil(peak / 0.05) * 0.05)
  const mean = probabilities.reduce((s, p, k) => s + p * k, 0)
  const variance = probabilities.reduce((s, p, k) => s + p * (k - mean) ** 2, 0)
  const last = Math.min(
    probabilities.length - 1,
    Math.ceil(mean + 4 * Math.sqrt(variance)),
  )
  const width = 325 / (last + 1),
    scale = 200 / top
  const minor = top > 0.35 ? 0.02 : 0.01
  return (
    <svg
      viewBox="0 0 390 260"
      className="my-4 w-full"
      role="img"
      aria-label="Säulendiagramm der Binomialverteilung"
    >
      <rect x="43" y="15" width="325" height="200" fill="white" />
      {Array.from(
        { length: Math.round(top / minor) + 1 },
        (_, i) => i * minor,
      ).map((p, i) => (
        <g key={i}>
          <line
            x1="43"
            x2="368"
            y1={215 - p * scale}
            y2={215 - p * scale}
            stroke={i % 5 === 0 ? '#94a3b8' : '#e2e8f0'}
          />
          {i % 5 === 0 && (
            <text x="39" y={219 - p * scale} textAnchor="end" fontSize="11">
              {p.toLocaleString('de-DE', { maximumFractionDigits: 2 })}
            </text>
          )}
        </g>
      ))}
      {probabilities.slice(0, last + 1).map((p, k) => (
        <g key={k}>
          <rect
            x={43 + k * width}
            y={215 - p * scale}
            width={width - 0.6}
            height={p * scale}
            fill="#cbd5e1"
            stroke="#475569"
          />
          <text
            x={43 + (k + 0.5) * width}
            y="232"
            fontSize={last > 17 ? 9 : 11}
            textAnchor="middle"
          >
            {k}
          </text>
        </g>
      ))}
      <path d="M43 10V215H375" stroke="#172033" fill="none" />
      <text x="49" y="12" fontSize="12">
        P(X=k)
      </text>
      <text x="377" y="232" fontSize="13">
        k
      </text>
    </svg>
  )
}

export function ProbabilityTable({ values }: { values: number[] }) {
  return (
    <div className="my-3 overflow-x-auto">
      <table className="border-collapse text-sm">
        <tbody>
          {[
            <>
              <th className="border p-2">k</th>
              {values.map((_, i) => (
                <td key={i} className="border p-2">
                  {i}
                </td>
              ))}
              <td className="border p-2">…</td>
            </>,
            <>
              <th className="border p-2">P(X=k)</th>
              {values.map((p, i) => (
                <td key={i} className="border p-2">
                  {p.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                </td>
              ))}
              <td className="border p-2">…</td>
            </>,
          ].map((row: ReactNode, i) => (
            <tr key={i}>{row}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ReflectionSketch({
  x,
  y,
  z,
}: {
  x: number
  y: number
  z: number
}) {
  const scale = 95 / Math.max(Math.abs(x), Math.abs(y), Math.abs(z), 1)
  const project = (a: number, b: number, c: number) => [
    155 + scale * (b - 0.55 * a),
    195 + scale * (0.4 * a - c),
  ]
  const a = project(x, y, z),
    b = project(-x, y, z),
    foot = project(0, y, z)
  return (
    <svg
      viewBox="0 0 350 280"
      className="my-4 w-full"
      role="img"
      aria-label="Spiegelung von A an der x2-x3-Ebene, schematisches räumliches Koordinatensystem"
    >
      <path
        d="M45 215L155 195L310 195L200 215Z M155 195V20H310V195Z"
        fill="#eff6ff"
        stroke="#cbd5e1"
      />
      <path
        d="M245 130L65 260 M25 195H330 M155 265V10"
        stroke="#334155"
        fill="none"
      />
      <text x="48" y="273" fontSize="13">
        x₁
      </text>
      <text x="329" y="190" fontSize="13">
        x₂
      </text>
      <text x="165" y="18" fontSize="13">
        x₃
      </text>
      <text x="140" y="211" fontSize="12">
        O
      </text>
      <line
        x1={a[0]}
        y1={a[1]}
        x2={b[0]}
        y2={b[1]}
        stroke="#2563eb"
        strokeDasharray="5 4"
      />
      <line
        x1={foot[0]}
        y1={foot[1]}
        x2={foot[0]}
        y2="195"
        stroke="#94a3b8"
        strokeDasharray="3 3"
      />
      {[
        { p: a, label: 'A', dx: -15 },
        { p: b, label: 'A′', dx: 8 },
      ].map(({ p, label, dx }) => (
        <g key={label}>
          <circle cx={p[0]} cy={p[1]} r="4" fill="#2563eb" />
          <text x={p[0] + dx} y={p[1] - 10} fontSize="14">
            {label}
          </text>
        </g>
      ))}
      <text x="12" y="21" fontSize="11" fill="#64748b">
        Schematische Darstellung
      </text>
    </svg>
  )
}

export function Dartboard({ radii }: { radii: [number, number, number] }) {
  const scale = 105 / radii[2]
  return (
    <svg
      viewBox="0 0 320 255"
      className="mx-auto my-4 w-full max-w-sm"
      role="img"
      aria-label={`Zielscheibe mit Radien ${radii.join(', ')} Längeneinheiten`}
    >
      {[2, 1, 0].map(i => (
        <circle
          key={i}
          cx="145"
          cy="120"
          r={radii[i] * scale}
          fill={['#fecaca', '#bfdbfe', '#bbf7d0'][i]}
          stroke="#334155"
        />
      ))}
      <path d="M145 120H270" stroke="#334155" />
      <text x="140" y="139" fontSize="12">
        0
      </text>
      {radii.map(r => (
        <g key={r}>
          <path d={`M${145 + r * scale} 116v8`} stroke="#334155" />
          <text x={145 + r * scale} y="139" textAnchor="middle" fontSize="12">
            {r}
          </text>
        </g>
      ))}
      <text x="143" y="112" fontSize="12" textAnchor="middle">
        rot
      </text>
      <text
        x="143"
        y={120 - ((radii[0] + radii[1]) * scale) / 2}
        fontSize="12"
        textAnchor="middle"
      >
        blau
      </text>
      <text
        x="143"
        y={120 - ((radii[1] + radii[2]) * scale) / 2}
        fontSize="12"
        textAnchor="middle"
      >
        grün
      </text>
      <text x="145" y="249" textAnchor="middle" fontSize="12">
        Radien in Längeneinheiten
      </text>
    </svg>
  )
}
