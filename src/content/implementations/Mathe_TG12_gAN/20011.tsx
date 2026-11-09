import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { useId } from 'react'

type Trend = 'linear' | 'quadratic' | 'growth' | 'decay'
interface DATA {
  operation: 'sum' | 'product'
  trend: Trend
  q: number
  period: number
}
function trendValue(trend: Trend, x: number) {
  return trend === 'linear'
    ? 0.5 * x
    : trend === 'quadratic'
      ? (x * x) / 4
      : Math.pow(trend === 'growth' ? 1.2 : 0.8, x)
}
function trendTerm(trend: Trend) {
  return trend === 'linear'
    ? `${pp(0.5)}x`
    : trend === 'quadratic'
      ? `\\frac{x^2}{4}`
      : `${pp(trend === 'growth' ? 1.2 : 0.8)}^x`
}
function bTerm(period: number) {
  return period === 0.75 ? '\\frac{8\\pi}{3}' : pp(2 / period) + '\\pi{}'
}
function peak(data: DATA, index = 0) {
  const b = (2 * Math.PI) / data.period
  // Damping shifts the maxima away from the maxima of the sine factor.
  const x = Math.atan2(b, -Math.log(data.q)) / b + index * data.period
  return { x, y: data.q ** x * Math.sin(b * x) }
}
function displayedPeak(data: DATA, index = 0) {
  const p = peak(data, index)
  return { x: Math.round(p.x * 1e7) / 1e7, y: Math.round(p.y * 1e7) / 1e7 }
}
function validData(data: DATA) {
  if (
    !['sum', 'product'].includes(data.operation) ||
    !['linear', 'quadratic', 'growth', 'decay'].includes(data.trend) ||
    !Number.isFinite(data.q) ||
    data.q < 0.2 ||
    data.q > 0.8 ||
    ![0.5, 0.75, 1].includes(data.period)
  )
    return false
  const b = (2 * Math.PI) / data.period
  const h1 = peak(data),
    h2 = peak(data, 1),
    shown = displayedPeak(data)
  const recoveredQ = (shown.y / Math.sin(b * shown.x)) ** (1 / shown.x)
  return (
    [h1.x, h1.y, h2.x, h2.y, recoveredQ].every(Number.isFinite) &&
    h1.y > h2.y &&
    h2.y > 0 &&
    Math.abs(h2.x - h1.x - data.period) < 1e-8 &&
    Math.abs(recoveredQ - data.q) < 1e-6 &&
    Math.abs(Math.round(recoveredQ * 1e4) / 1e4 - data.q) < 1e-8 &&
    [h1, h2].every(
      p =>
        Math.abs(Math.log(data.q) * Math.sin(b * p.x) + b * Math.cos(b * p.x)) <
          1e-8 && -(Math.log(data.q) ** 2 + b * b) * p.y < 0,
    )
  )
}
export const exercise20011: Exercise<DATA> = {
  title: 'Funktionen verknüpfen und Funktionsterme bestimmen',
  source: 'TG12 gAN',
  useCalculator: true,
  duration: 20,
  generator(rng) {
    return {
      operation: rng.randomItemFromArray(['sum', 'product']),
      trend: rng.randomItemFromArray([
        'linear',
        'quadratic',
        'growth',
        'decay',
      ]),
      q: rng.randomItemFromArray([0.2, 0.35, 0.5, 0.65, 0.8]),
      period: rng.randomItemFromArray([0.5, 0.75, 1]),
    }
  },
  originalData: { operation: 'product', trend: 'decay', q: 0.5, period: 0.75 },
  constraint: ({ data }) => validData(data),
  intro: () => null,
  tasks: [
    {
      points: 7,
      task: ({ data }) => {
        const u = (x: number) => trendValue(data.trend, x)
        return (
          <>
            <p>
              Gegeben sind <InlineMath math={`u(x)=${trendTerm(data.trend)}`} />{' '}
              und <InlineMath math={'v(x)=\\sin(\\pi x)'} />. Der blaue Graph
              zeigt eine Verknüpfung der beiden Funktionen; grau gestrichelt ist{' '}
              <InlineMath math={'u'} /> eingezeichnet.
            </p>
            <p>
              Entscheiden Sie begründet, ob <InlineMath math={'h=u+v'} /> oder{' '}
              <InlineMath math={'h=u\\cdot v'} /> gilt.
            </p>
            <FunctionGraph
              label="Verknüpfte Funktion und Vergleichsfunktion u"
              xMin={0}
              xMax={8}
              xTicks={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
              yMin={data.trend === 'quadratic' ? -18 : -5}
              yMax={data.trend === 'quadratic' ? 18 : 6}
              yTicks={
                data.trend === 'quadratic'
                  ? [-16, -8, 0, 8, 16]
                  : [-4, -2, 0, 2, 4, 6]
              }
              curves={[
                { value: u, color: '#777', dashed: true },
                {
                  value: x =>
                    data.operation === 'sum'
                      ? u(x) + Math.sin(Math.PI * x)
                      : u(x) * Math.sin(Math.PI * x),
                },
              ]}
            />
          </>
        )
      },
      solution: ({ data }) => (
        <>
          <p>
            <strong>
              <InlineMath
                math={`h(x)=${trendTerm(data.trend)}${data.operation === 'sum' ? '+' : '\\cdot'}\\sin(\\pi x)`}
              />
            </strong>
          </p>
          {data.operation === 'sum' ? (
            <>
              <p>
                Die Sinuswerte werden zu den Werten von{' '}
                <InlineMath math={'u'} /> addiert. Daher verläuft die
                Mittellinie entlang des grauen Graphen. Die vertikale Abweichung
                von dieser Mittellinie liegt zwischen −1 und 1.
              </p>
              <p>
                An ganzzahligen Stellen ist der Sinus null, also{' '}
                <InlineMath math={'h(n)=u(n),\\ n\\in\\mathbb Z'} />. Dort
                schneidet der blaue Graph die Vergleichsfunktion; diese Stellen
                sind im Allgemeinen keine Nullstellen von{' '}
                <InlineMath math={'h'} />.
              </p>
            </>
          ) : (
            <>
              <p>
                Der Sinus wird mit <InlineMath math={'u(x)'} /> multipliziert.
                Die Mittellinie bleibt die x-Achse, während die Schwingungsweite
                durch <InlineMath math={'|u(x)|'} /> bestimmt wird. Die
                Hüllkurven sind <InlineMath math={'y=\\pm|u(x)|'} />.
              </p>
              <p>
                An jeder ganzzahligen Stelle gilt{' '}
                <InlineMath math={'\\sin(\\pi n)=0'} /> und damit{' '}
                <InlineMath math={'h(n)=0'} />. Beim Wachstum nimmt die
                Schwingungsweite zu, beim Zerfall nimmt sie ab. Das passt zur
                Multiplikation.
              </p>
            </>
          )}
        </>
      ),
    },
    {
      points: 8,
      task: ({ data }) => {
        const t = data.period,
          h1 = displayedPeak(data),
          h2 = displayedPeak(data, 1)
        return (
          <>
            <p>
              Das Schaubild zeigt eine gedämpfte Schwingung der Form{' '}
              <InlineMath math={'f(x)=q^x\\cdot\\sin(bx)'} />. Bestimmen Sie aus
              den beiden benachbarten Hochpunkten den Abstand{' '}
              <InlineMath math={'p'} />, anschließend <InlineMath math={'b'} />{' '}
              und durch eine Punktprobe <InlineMath math={'q'} />. Geben Sie den
              Funktionsterm an.
            </p>
            <p>Die Koordinaten der Hochpunkte sind gerundet:</p>
            <p>
              <InlineMath
                math={'H_1(' + pp(h1.x) + '\\mid ' + pp(h1.y) + ')'}
              />
            </p>
            <p>
              <InlineMath
                math={'H_2(' + pp(h2.x) + '\\mid ' + pp(h2.y) + ')'}
              />
            </p>
            <FunctionGraph
              label="Gedämpfte Schwingung mit zwei benachbarten Hochpunkten"
              xMin={0}
              xMax={3 * t}
              yMin={-1}
              yMax={1}
              xTicks={[0, t / 2, t, 1.5 * t, 2 * t, 2.5 * t, 3 * t]}
              yTicks={[-1, -0.5, 0, 0.5, 1]}
              curves={[
                { value: x => data.q ** x * Math.sin(((2 * Math.PI) / t) * x) },
              ]}
              points={[
                { ...peak(data), label: 'H₁' },
                { ...peak(data, 1), label: 'H₂' },
              ]}
            />
          </>
        )
      },
      solution: ({ data }) => {
        const h1 = displayedPeak(data),
          h2 = displayedPeak(data, 1)
        return (
          <>
            <p>
              Der horizontale Abstand der benachbarten Hochpunkte liefert die
              Periodenlänge des Sinusfaktors:
            </p>
            <p>
              <InlineMath
                math={
                  'p=x_{H_2}-x_{H_1}=' +
                  pp(h2.x) +
                  '-' +
                  pp(h1.x) +
                  '=' +
                  pp(data.period)
                }
              />
            </p>
            <p>
              <InlineMath
                math={
                  'b=\\frac{2\\pi}{p}=\\frac{2\\pi}{' +
                  pp(data.period) +
                  '}=' +
                  bTerm(data.period)
                }
              />
            </p>
            <p>Für die Punktprobe wird der erste Hochpunkt eingesetzt:</p>
            <p>
              <InlineMath math={'y_{H_1}=q^{x_{H_1}}\\cdot\\sin(bx_{H_1})'} />
            </p>
            <p>
              <InlineMath
                math={
                  pp(h1.y) +
                  '\\approx q^{' +
                  pp(h1.x) +
                  '}\\cdot\\sin\\left(' +
                  bTerm(data.period) +
                  '\\cdot ' +
                  pp(h1.x) +
                  '\\right)'
                }
              />
            </p>
            <p>Durch den Sinuswert teilen:</p>
            <p>
              <InlineMath
                math={
                  'q^{' +
                  pp(h1.x) +
                  '}\\approx\\frac{' +
                  pp(h1.y) +
                  '}{\\sin\\left(' +
                  bTerm(data.period) +
                  '\\cdot ' +
                  pp(h1.x) +
                  '\\right)}'
                }
              />
            </p>
            <p>Beide Seiten mit dem Kehrwert des Exponenten potenzieren:</p>
            <p>
              <InlineMath
                math={
                  'q=\\left(\\frac{y_{H_1}}{\\sin(bx_{H_1})}\\right)^{\\frac{1}{x_{H_1}}}'
                }
              />
            </p>
            <p>
              <strong>
                <InlineMath math={'q\\approx ' + pp(data.q)} />
              </strong>
            </p>
            <p>Damit ergibt sich:</p>
            <p>
              <strong>
                <InlineMath
                  math={
                    'f(x)\\approx ' +
                    pp(data.q) +
                    '^x\\cdot\\sin\\left(' +
                    bTerm(data.period) +
                    'x\\right)'
                  }
                />
              </strong>
            </p>
            <p>
              Die gesamte Schwingung ist wegen der abnehmenden Schwingungsweite
              nicht periodisch. <InlineMath math={'p'} /> beschreibt den Abstand
              benachbarter Hochpunkte und die Periode des Sinusfaktors.
            </p>
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
