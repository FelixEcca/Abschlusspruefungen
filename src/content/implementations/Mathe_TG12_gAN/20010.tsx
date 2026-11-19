import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { useId } from 'react'

type Kind = 'square' | 'sin' | 'exp'
interface Transform {
  kind: Kind
  a: number
  b: number
  h: number
  d: number
}
interface DATA {
  graph: Transform
  description: Transform
  notation: Transform
}
const bases = { square: 'x^2', sin: '\\sin(x)', exp: 'e^x' }
function baseValue(kind: Kind, x: number) {
  return kind === 'square' ? x * x : kind === 'sin' ? Math.sin(x) : Math.exp(x)
}
function argument(t: Transform) {
  const x = t.h ? `\\left(x${pp(-t.h, 'merge_op')}\\right)` : 'x'
  return `${t.b === 1 ? '' : t.b === -1 ? '-' : pp(t.b)}${x}`
}
function term(t: Transform) {
  const u = argument(t)
  const f =
    t.kind === 'square'
      ? `\\left(${u}\\right)^2`
      : t.kind === 'sin'
        ? `\\sin\\left(${u}\\right)`
        : `e^{${u}}`
  return `${pp(t.a)}\\cdot ${f}${pp(t.d, 'merge_op')}`
}
function notation(t: Transform) {
  return `g(x)=${pp(t.a)}\\cdot f\\left(${argument(t)}\\right)${pp(t.d, 'merge_op')}`
}
function Description({ t }: { t: Transform }) {
  return (
    <ol className="list-decimal pl-6 space-y-2">
      {t.b < 0 && <li>Spiegelung an der y-Achse.</li>}
      {Math.abs(t.b) !== 1 && (
        <li>
          {Math.abs(t.b) > 1 ? 'Stauchung' : 'Streckung'} in x-Richtung mit dem
          Faktor <InlineMath math={pp(1 / Math.abs(t.b))} />.
        </li>
      )}
      {t.a < 0 && <li>Spiegelung an der x-Achse.</li>}
      <li>
        {Math.abs(t.a) > 1 ? 'Streckung' : 'Stauchung'} in y-Richtung mit dem
        Faktor <InlineMath math={pp(Math.abs(t.a))} />.
      </li>
      <li>
        Verschiebung um <InlineMath math={pp(Math.abs(t.h))} /> nach{' '}
        {t.h > 0 ? 'rechts' : 'links'} und um{' '}
        <InlineMath math={pp(Math.abs(t.d))} /> nach{' '}
        {t.d > 0 ? 'oben' : 'unten'}.
      </li>
    </ol>
  )
}
function Answer({ t }: { t: Transform }) {
  return (
    <>
      <p>
        Eine mögliche Beschreibung: Zuerst Spiegelungen und Streckungen bzw.
        Stauchungen durchführen, anschließend verschieben.
      </p>
      <Description t={t} />
      <p>
        <InlineMath math={notation(t)} />
      </p>
      <p>
        <strong>
          <InlineMath math={`g(x)=${term(t)}`} />
        </strong>
      </p>
    </>
  )
}
export const exercise20010: Exercise<DATA> = {
  title: 'Funktionen transformieren',
  source: 'TG12 gAN',
  useCalculator: true,
  duration: 25,
  generator(rng) {
    const make = (graph = false): Transform => ({
      kind: rng.randomItemFromArray(['square', 'sin', 'exp']),
      a: rng.randomItemFromArray([-2, -0.5, 0.5, 2]),
      b: graph ? 1 : rng.randomItemFromArray([-2, -1, 0.5, 2]),
      h: rng.randomItemFromArray([-2, -1, 1, 2]),
      d: rng.randomItemFromArray([-2, -1, 1, 2]),
    })
    return {
      graph: make(true),
      description: { ...make(), b: rng.randomItemFromArray([-1, 1]) },
      notation: make(),
    }
  },
  originalData: {
    graph: { kind: 'square', a: -2, b: 1, h: 1, d: 2 },
    description: { kind: 'sin', a: 2, b: 1, h: -1, d: 1 },
    notation: { kind: 'exp', a: -0.5, b: -1, h: 2, d: -1 },
  },
  constraint: ({ data }) =>
    data.graph.b === 1 &&
    Math.abs(data.description.b) === 1 &&
    [data.graph, data.description, data.notation].every(
      t =>
        Object.hasOwn(bases, t.kind) &&
        [t.a, t.b, t.h, t.d].every(Number.isFinite) &&
        [0.5, 2].includes(Math.abs(t.a)) &&
        [0.5, 1, 2].includes(Math.abs(t.b)) &&
        [1, 2].includes(Math.abs(t.h)) &&
        [1, 2].includes(Math.abs(t.d)),
    ),
  intro: () => null,
  tasks: [
    {
      points: 7,
      task: ({ data }) => {
        const t = data.graph
        return (
          <>
            <p>
              Der blaue Graph entsteht aus{' '}
              <InlineMath math={`f(x)=${bases[t.kind]}`} /> durch
              Transformationen. Beschreiben Sie diese in einer passenden
              Reihenfolge und geben Sie einen Funktionsterm an. Der graue
              gestrichelte Graph zeigt die Grundfunktion.
            </p>
            <FunctionGraph
              label="Grundfunktion und transformierter Graph"
              yMin={-5}
              yMax={7}
              yTicks={[-4, -2, 0, 2, 4, 6]}
              curves={[
                {
                  value: x => baseValue(t.kind, x),
                  color: '#777',
                  dashed: true,
                },
                { value: x => t.a * baseValue(t.kind, x - t.h) + t.d },
              ]}
            />
          </>
        )
      },
      solution: ({ data }) => <Answer t={data.graph} />,
    },
    {
      points: 6,
      task: ({ data }) => (
        <>
          <p>
            Gegeben ist{' '}
            <InlineMath math={`f(x)=${bases[data.description.kind]}`} />. Führen
            Sie die folgenden Transformationen in der angegebenen Reihenfolge
            durch und bestimmen Sie den neuen Funktionsterm.
          </p>
          <Description t={data.description} />
        </>
      ),
      solution: ({ data }) => <Answer t={data.description} />,
    },
    {
      points: 7,
      task: ({ data }) => (
        <>
          <p>
            Gegeben sind{' '}
            <InlineMath math={`f(x)=${bases[data.notation.kind]}`} /> und
          </p>
          <p>
            <InlineMath math={notation(data.notation)} />.
          </p>
          <p>
            Geben Sie den Funktionsterm ohne die Schreibweise mit{' '}
            <InlineMath math={'f'} /> an und beschreiben Sie die
            Transformationen in passender Reihenfolge.
          </p>
        </>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Den vollständigen Ausdruck im Argument von <InlineMath math={'f'} />{' '}
            für jedes <InlineMath math={'x'} /> der Grundfunktion einsetzen:
          </p>
          <Answer t={data.notation} />
        </>
      ),
    },
  ],
}

interface FunctionGraphProps {
  curves: { value: (x: number) => number; color?: string; dashed?: boolean }[]
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  xTicks?: number[]
  yTicks?: number[]
  label: string
  points?: { x: number; y: number; label: string }[]
}

function FunctionGraph({
  curves,
  xMin = -4,
  xMax = 4,
  yMin = -4,
  yMax = 5,
  xTicks = [-4, -2, 0, 2, 4],
  yTicks = [-4, -2, 0, 2, 4],
  label,
  points = [],
}: FunctionGraphProps) {
  const id = useId().replace(/:/g, '')
  const left = 48,
    top = 24,
    width = 460,
    height = 270
  const sx = (x: number) => left + ((x - xMin) / (xMax - xMin)) * width
  const sy = (y: number) => top + ((yMax - y) / (yMax - yMin)) * height
  const axisX = sx(Math.max(xMin, Math.min(0, xMax)))
  const axisY = sy(Math.max(yMin, Math.min(0, yMax)))
  function path(value: (x: number) => number) {
    let result = '',
      connected = false
    for (let i = 0; i <= 1000; i++) {
      const x = xMin + (i / 1000) * (xMax - xMin),
        y = value(x)
      // Restart beyond the visible range, including at poles and domain boundaries.
      if (!Number.isFinite(y) || y < yMin - 1 || y > yMax + 1) {
        connected = false
        continue
      }
      result += `${connected ? 'L' : 'M'}${sx(x).toFixed(2)},${sy(y).toFixed(2)} `
      connected = true
    }
    return result
  }
  return (
    <svg
      viewBox="0 0 555 335"
      className="my-4 w-full max-w-2xl"
      role="img"
      aria-label={label}
    >
      <defs>
        <clipPath id={id}>
          <rect x={left} y={top} width={width} height={height} />
        </clipPath>
      </defs>
      <rect
        x={left}
        y={top}
        width={width}
        height={height}
        fill="white"
        stroke="#aaa"
      />
      {xTicks
        .filter(x => x >= xMin && x <= xMax)
        .map(x => (
          <g key={x}>
            <line
              x1={sx(x)}
              x2={sx(x)}
              y1={top}
              y2={top + height}
              stroke="#ddd"
            />
            <text
              x={sx(x)}
              y={top + height + 21}
              textAnchor="middle"
              fontSize={13}
            >
              {pp(x)}
            </text>
          </g>
        ))}
      {yTicks
        .filter(y => y >= yMin && y <= yMax)
        .map(y => (
          <g key={y}>
            <line
              x1={left}
              x2={left + width}
              y1={sy(y)}
              y2={sy(y)}
              stroke="#ddd"
            />
            <text x={left - 9} y={sy(y) + 4} textAnchor="end" fontSize={13}>
              {pp(y)}
            </text>
          </g>
        ))}
      <line
        x1={left}
        x2={left + width + 13}
        y1={axisY}
        y2={axisY}
        stroke="#222"
        strokeWidth={1.5}
      />
      <path d={`M${left + width + 13},${axisY}l-8,-4v8z`} fill="#222" />
      <line
        x1={axisX}
        x2={axisX}
        y1={top + height}
        y2={top - 12}
        stroke="#222"
        strokeWidth={1.5}
      />
      <path d={`M${axisX},${top - 12}l-4,8h8z`} fill="#222" />
      <text x={left + width + 23} y={axisY + 5} fontSize={15}>
        x
      </text>
      <text x={axisX + 9} y={top - 8} fontSize={15}>
        y
      </text>
      <g clipPath={`url(#${id})`}>
        {curves.map((curve, i) => (
          <path
            key={i}
            d={path(curve.value)}
            fill="none"
            stroke={curve.color ?? '#2563eb'}
            strokeWidth={2.5}
            strokeDasharray={curve.dashed ? '7 5' : undefined}
          />
        ))}
        {points.map((p, i) => (
          <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={4} fill="#b91c1c" />
        ))}
      </g>
      {points.map((p, i) => (
        <text
          key={i}
          x={sx(p.x) + 7}
          y={sy(p.y) - 10}
          fontSize={13}
          fill="#991b1b"
        >
          {p.label}
        </text>
      ))}
    </svg>
  )
}
