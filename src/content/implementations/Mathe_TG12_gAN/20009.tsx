import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { useId } from 'react'
import { pp } from '@/helper/pretty-print'

type Kind =
  | 'line'
  | 'square'
  | 'cube'
  | 'root'
  | 'reciprocal'
  | 'reciprocalSquare'
  | 'exp'
  | 'sin'
  | 'cos'
interface DATA {
  graphs: Kind[]
  choices: Kind[]
  properties: Kind
}
const functions: Record<
  Kind,
  {
    term: string
    name: string
    value: (x: number) => number
    domain: string
    range: string
    symmetry: string
    limits: string
    extra: string
  }
> = {
  line: {
    term: 'x',
    name: 'Lineare Grundfunktion',
    value: x => x,
    domain: '\\mathbb R',
    range: '\\mathbb R',
    symmetry: 'Punktsymmetrisch zum Ursprung, da f(−x)=−f(x).',
    limits:
      '\\lim_{x\\to-\\infty}f(x)=-\\infty,\\quad\\lim_{x\\to\\infty}f(x)=\\infty',
    extra: 'Streng monoton steigend; Nullstelle bei x=0.',
  },
  square: {
    term: 'x^2',
    name: 'Quadratische Grundfunktion',
    value: x => x * x,
    domain: '\\mathbb R',
    range: '[0;\\infty)',
    symmetry: 'Achsensymmetrisch zur y-Achse, da f(−x)=f(x).',
    limits: '\\lim_{x\\to\\pm\\infty}f(x)=\\infty',
    extra:
      'Fallend bis x=0, danach steigend; Tiefpunkt und Nullstelle im Ursprung.',
  },
  cube: {
    term: 'x^3',
    name: 'Kubische Grundfunktion',
    value: x => x ** 3,
    domain: '\\mathbb R',
    range: '\\mathbb R',
    symmetry: 'Punktsymmetrisch zum Ursprung, da f(−x)=−f(x).',
    limits:
      '\\lim_{x\\to-\\infty}f(x)=-\\infty,\\quad\\lim_{x\\to\\infty}f(x)=\\infty',
    extra: 'Streng monoton steigend; Nullstelle und Wendepunkt im Ursprung.',
  },
  root: {
    term: '\\sqrt{x}',
    name: 'Wurzelfunktion',
    value: x => (x >= 0 ? Math.sqrt(x) : NaN),
    domain: '[0;\\infty)',
    range: '[0;\\infty)',
    symmetry:
      'Weder achsen- noch punktsymmetrisch bezüglich y-Achse bzw. Ursprung.',
    limits: '\\lim_{x\\to\\infty}f(x)=\\infty,\\quad\\lim_{x\\to0^+}f(x)=0',
    extra:
      'Streng monoton steigend; Nullstelle bei x=0. Für negative x nicht definiert.',
  },
  reciprocal: {
    term: '\\frac{1}{x}',
    name: 'Kehrwertfunktion',
    value: x => 1 / x,
    domain: '\\mathbb R\\setminus\\{0\\}',
    range: '\\mathbb R\\setminus\\{0\\}',
    symmetry: 'Punktsymmetrisch zum Ursprung, da f(−x)=−f(x).',
    limits:
      '\\lim_{x\\to\\pm\\infty}f(x)=0,\\quad\\lim_{x\\to0^+}f(x)=\\infty,\\quad\\lim_{x\\to0^-}f(x)=-\\infty',
    extra:
      'Auf jedem der Intervalle x<0 und x>0 streng fallend. Keine Nullstelle; beide Achsen sind Asymptoten.',
  },
  reciprocalSquare: {
    term: '\\frac{1}{x^2}',
    name: 'Kehrwertquadratfunktion',
    value: x => 1 / (x * x),
    domain: '\\mathbb R\\setminus\\{0\\}',
    range: '(0;\\infty)',
    symmetry: 'Achsensymmetrisch zur y-Achse, da f(−x)=f(x).',
    limits: '\\lim_{x\\to\\pm\\infty}f(x)=0,\\quad\\lim_{x\\to0}f(x)=\\infty',
    extra:
      'Links des Ursprungs streng steigend, rechts streng fallend. Stets positiv; keine Nullstelle. Beide Achsen sind Asymptoten.',
  },
  exp: {
    term: 'e^x',
    name: 'Natürliche Exponentialfunktion',
    value: Math.exp,
    domain: '\\mathbb R',
    range: '(0;\\infty)',
    symmetry:
      'Weder achsen- noch punktsymmetrisch bezüglich y-Achse bzw. Ursprung.',
    limits:
      '\\lim_{x\\to-\\infty}f(x)=0,\\quad\\lim_{x\\to\\infty}f(x)=\\infty',
    extra:
      'Streng monoton steigend, stets positiv; keine Nullstelle. Die x-Achse ist waagrechte Asymptote.',
  },
  sin: {
    term: '\\sin(x)',
    name: 'Sinusfunktion',
    value: Math.sin,
    domain: '\\mathbb R',
    range: '[-1;1]',
    symmetry: 'Punktsymmetrisch zum Ursprung, da f(−x)=−f(x).',
    limits: '\\text{Keine Grenzwerte für }x\\to\\pm\\infty.',
    extra:
      'Periodisch mit Periode 2π; oszilliert zwischen −1 und 1. Nullstellen bei x=kπ, k ganzzahlig.',
  },
  cos: {
    term: '\\cos(x)',
    name: 'Kosinusfunktion',
    value: Math.cos,
    domain: '\\mathbb R',
    range: '[-1;1]',
    symmetry: 'Achsensymmetrisch zur y-Achse, da f(−x)=f(x).',
    limits: '\\text{Keine Grenzwerte für }x\\to\\pm\\infty.',
    extra:
      'Periodisch mit Periode 2π; oszilliert zwischen −1 und 1. Nullstellen bei x=π/2+kπ, k ganzzahlig.',
  },
}
const kinds = Object.keys(functions) as Kind[]
export const exercise20009: Exercise<DATA> = {
  title: 'Grundfunktionen erkennen und Eigenschaften beschreiben',
  source: 'TG12 gAN',
  useCalculator: false,
  duration: 18,
  generator(rng) {
    const graphs = rng.shuffleArray(kinds).slice(0, 3)
    return {
      graphs,
      choices: rng.shuffleArray(graphs),
      properties: rng.randomItemFromArray(kinds),
    }
  },
  originalData: {
    graphs: ['square', 'root', 'exp'],
    choices: ['exp', 'square', 'root'],
    properties: 'sin',
  },
  constraint: ({ data }) =>
    data.graphs.length === 3 &&
    new Set(data.graphs).size === 3 &&
    data.choices.length === 3 &&
    new Set(data.choices).size === 3 &&
    data.choices.every(k => data.graphs.includes(k)) &&
    [...data.graphs, data.properties].every(k => Object.hasOwn(functions, k)),
  intro: () => null,
  tasks: [
    {
      points: 6,
      task: ({ data }) => (
        <>
          <p>
            Ordnen Sie die drei Funktionsterme den Schaubildern I, II und III
            zu. Nennen Sie jeweils die Grundfunktion.
          </p>
          <p>
            {data.choices.map((kind, i) => (
              <span key={kind} className="mr-6">
                <InlineMath math={`f_{${i + 1}}(x)=${functions[kind].term}`} />
              </span>
            ))}
          </p>
          {data.graphs.map((kind, i) => (
            <div key={kind}>
              <p>
                <strong>Schaubild {['I', 'II', 'III'][i]}</strong>
              </p>
              <FunctionGraph
                curves={[{ value: functions[kind].value }]}
                label={`Schaubild ${['I', 'II', 'III'][i]}`}
              />
            </div>
          ))}
        </>
      ),
      solution: ({ data }) => (
        <>
          {data.graphs.map((kind, i) => (
            <p key={kind}>
              <strong>
                {['I', 'II', 'III'][i]}: {functions[kind].name}
              </strong>
              ,{' '}
              <InlineMath
                math={`f_{${data.choices.indexOf(kind) + 1}}(x)=${functions[kind].term}`}
              />
              . Kennzeichen: {functions[kind].extra}
            </p>
          ))}
        </>
      ),
    },
    {
      points: 8,
      task: ({ data }) => (
        <p>
          Beschreiben Sie für{' '}
          <InlineMath math={`f(x)=${functions[data.properties].term}`} />{' '}
          Definitionsmenge, Wertemenge, Symmetrie, Globalverhalten, Monotonie
          und Nullstellen.
        </p>
      ),
      solution: ({ data }) => {
        const f = functions[data.properties]
        return (
          <>
            <p>
              <strong>{f.name}</strong>
            </p>
            <p>
              <InlineMath math={`D=${f.domain},\\qquad W=${f.range}`} />
            </p>
            <p>{f.symmetry}</p>
            {f.limits.split(',\\quad').map(limit => (
              <p key={limit}>
                <InlineMath math={limit} />
              </p>
            ))}
            <p>{f.extra}</p>
            {(data.properties === 'sin' || data.properties === 'cos') && (
              <>
                <p>Streng steigend auf jedem Intervall</p>
                <p>
                  <InlineMath
                    math={
                      data.properties === 'sin'
                        ? '[-\\frac{\\pi}{2}+2k\\pi;\\frac{\\pi}{2}+2k\\pi]'
                        : '[-\\pi+2k\\pi;2k\\pi]'
                    }
                  />
                </p>
                <p>und streng fallend auf jedem Intervall</p>
                <p>
                  <InlineMath
                    math={
                      data.properties === 'sin'
                        ? '[\\frac{\\pi}{2}+2k\\pi;\\frac{3\\pi}{2}+2k\\pi]'
                        : '[2k\\pi;\\pi+2k\\pi]'
                    }
                  />
                  , <InlineMath math={'k\\in\\mathbb Z'} />.
                </p>
              </>
            )}
          </>
        )
      },
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
