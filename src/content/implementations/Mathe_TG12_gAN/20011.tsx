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
  return `\\frac{\\pi}{${pp(period / 2)}}`
}
function validData(data: DATA) {
  if (
    !['sum', 'product'].includes(data.operation) ||
    !['linear', 'quadratic', 'growth', 'decay'].includes(data.trend) ||
    !Number.isFinite(data.q) ||
    data.q <= 0 ||
    data.q === 1 ||
    ![4, 8, 12].includes(data.period)
  )
    return false
  const b = (2 * Math.PI) / data.period,
    x = data.period / 4
  const y = data.q ** x
  // The stated point must survive display rounding and recover the same base.
  const displayedY = Math.round(y * 1e7) / 1e7
  return (
    Number.isFinite(y) &&
    y > 0 &&
    Math.abs(displayedY - y) < 1e-10 &&
    Math.abs(displayedY ** (1 / x) - data.q) < 1e-8 &&
    Math.abs(Math.sin(b * x) - 1) < 1e-8 &&
    [0, data.period / 2, data.period].every(
      z => Math.abs(Math.sin(b * z)) < 1e-8,
    ) &&
    Number.isFinite(data.q ** (1.25 * data.period))
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
      q: rng.randomItemFromArray([0.6, 0.8, 0.9, 1.1, 1.2]),
      period: rng.randomItemFromArray([4, 8, 12]),
    }
  },
  originalData: { operation: 'product', trend: 'decay', q: 0.8, period: 4 },
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
              <InlineMath math={'h=u\\cdot v'} /> gilt. Gehen Sie auf
              Mittellinie, Schwingungsweite und Nullstellen ein.
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
          xp = t / 4,
          yp = Math.pow(data.q, xp)
        const ymax = Math.ceil(Math.max(1.5, Math.pow(data.q, 1.25 * t) * 1.15))
        return (
          <>
            <p>
              Das folgende Schaubild gehört zu einer Funktion der Form{' '}
              <InlineMath math={'f(x)=q^x\\cdot\\sin(bx),\\quad q>0,\\ b>0'} />.
              Bestimmen Sie <InlineMath math={'q'} /> und{' '}
              <InlineMath math={'b'} /> und geben Sie den Funktionsterm an. Die
              markierten Nullstellen nach dem Ursprung sind aufeinanderfolgend.
              Der Punkt <InlineMath math={`P(${pp(xp)}\\mid ${pp(yp)})`} />{' '}
              liegt auf dem Graphen.
            </p>
            <FunctionGraph
              label="Exponentiell veränderte Sinusschwingung mit gegebenem Punkt P"
              xMin={0}
              xMax={t * 1.25}
              yMin={-ymax}
              yMax={ymax}
              xTicks={[0, xp, t / 2, t, t * 1.25]}
              yTicks={[-ymax, 0, ymax]}
              curves={[
                {
                  value: x =>
                    Math.pow(data.q, x) * Math.sin(((2 * Math.PI) / t) * x),
                },
              ]}
              points={[
                { x: xp, y: yp, label: 'P' },
                { x: t / 2, y: 0, label: 'N₁' },
                { x: t, y: 0, label: 'N₂' },
              ]}
            />
          </>
        )
      },
      solution: ({ data }) => {
        const t = data.period,
          xp = t / 4,
          yp = Math.pow(data.q, xp)
        return (
          <>
            <p>
              Weil <InlineMath math={'q^x>0'} /> gilt, entstehen alle
              Nullstellen durch den Sinusfaktor. Der Abstand
              aufeinanderfolgender Nullstellen ist{' '}
              <InlineMath math={'\\pi/b'} />:
            </p>
            <p>
              <InlineMath
                math={`\\frac{\\pi}{b}=${pp(t)}-${pp(t / 2)}=${pp(t / 2)}\\quad\\Rightarrow\\quad b=${bTerm(t)}`}
              />
            </p>
            <p>Am gegebenen Punkt ist das Argument des Sinus:</p>
            <p>
              <InlineMath
                math={`b\\cdot ${pp(xp)}=${bTerm(t)}\\cdot ${pp(xp)}=\\frac{\\pi}{2},\\qquad\\sin\\left(\\frac{\\pi}{2}\\right)=1`}
              />
            </p>
            <p>Den Punkt einsetzen:</p>
            <p>
              <InlineMath
                math={`${pp(yp)}=q^{${pp(xp)}}\\cdot 1\\quad\\Rightarrow\\quad q=${xp === 1 ? '' : `\\sqrt[${pp(xp)}]{${pp(yp)}}=`}${pp(data.q)}`}
              />
            </p>
            <p>
              <strong>
                <InlineMath
                  math={`f(x)=${pp(data.q)}^x\\cdot\\sin\\left(${bTerm(t)}x\\right)`}
                />
              </strong>
            </p>
            <p>
              Der Sinusfaktor hat die Periode <InlineMath math={`T=${pp(t)}`} />
              . Die gesamte Funktion ist wegen der veränderlichen
              Schwingungsweite nicht periodisch.
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
