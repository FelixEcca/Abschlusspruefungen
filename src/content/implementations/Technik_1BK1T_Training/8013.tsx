import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'

const m = (math: string) => <InlineMath math={math} />
const n = (value: number, u: string) => `${pp(value)}\\,${unit(u)}`
const result = (symbol: string, value: number, u: string) => (
  <p>
    <strong>
      {m(
        `${symbol}${Math.abs(round2(value) - value) < 1e-9 ? '=' : '\\approx'}${n(round2(value), u)}`,
      )}
    </strong>
  </p>
)

const contexts = [
  'Ein Förderwagen fährt durch eine Werkhalle.',
  'Ein Bus nähert sich einer Haltestelle.',
  'Ein Radfahrer nähert sich einer Ampel.',
  'Ein Lieferwagen fährt auf einen Parkplatz.',
]
interface DATA {
  context: number
  fast: number
  slow: number
  times: [number, number, number, number, number]
}
function points(data: DATA) {
  let t = 0
  return [data.fast, data.fast, data.slow, data.slow, 0, 0].map((v, i) => ({
    x: i === 0 ? 0 : (t += data.times[i - 1]),
    y: v,
  }))
}
function Chart({
  data,
  solved = false,
  area = false,
}: {
  data: DATA
  solved?: boolean
  area?: boolean
}) {
  const p = points(data),
    end = p[p.length - 1].x
  return (
    <Diagram
      xTicks={Array.from({ length: end / 2 + 1 }, (_, i) => 2 * i)}
      yTicks={Array.from({ length: data.fast / 2 + 2 }, (_, i) => 2 * i)}
      xLabel="t in s"
      yLabel="v in m/s"
      curves={solved ? [{ points: p, color: '#2563eb', dots: true }] : []}
      area={area}
    />
  )
}

export const exercise8013: Exercise<DATA> = {
  title: 'Bremsvorgänge im v-t-Diagramm',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 14,
  generator(rng) {
    const context = rng.randomIntBetween(0, contexts.length - 1)
    const fast = rng.randomItemFromArray(
      context === 0 ? [4, 6, 8] : [8, 10, 12],
    )
    return {
      context,
      fast,
      slow: rng.randomItemFromArray([2, 4].filter(v => v < fast)),
      times: [
        2,
        rng.randomItemFromArray([2, 4]),
        rng.randomItemFromArray([2, 4]),
        2,
        2,
      ],
    }
  },
  originalData: { context: 1, fast: 10, slow: 4, times: [2, 4, 2, 2, 2] },
  constraint: ({ data }) =>
    !!contexts[data.context] &&
    [4, 6, 8, 10, 12].includes(data.fast) &&
    [2, 4].includes(data.slow) &&
    data.slow < data.fast &&
    data.times.length === 5 &&
    data.times.every(t => [2, 4].includes(t)),
  intro({ data }) {
    const [a, b, c, d, e] = data.times
    return (
      <>
        <p>
          {contexts[data.context]} Die Fahrt besteht aus fünf
          aufeinanderfolgenden Abschnitten:
        </p>
        <ol className="list-decimal pl-6">
          <li>
            {m(n(a, 's'))} gleichförmig mit {m(n(data.fast, 'm/s'))} fahren.
          </li>
          <li>
            In {m(n(b, 's'))} gleichmäßig auf {m(n(data.slow, 'm/s'))}{' '}
            abbremsen.
          </li>
          <li>{m(n(c, 's'))} mit dieser Geschwindigkeit weiterfahren.</li>
          <li>In {m(n(d, 's'))} gleichmäßig bis zum Stillstand bremsen.</li>
          <li>{m(n(e, 's'))} stehen bleiben.</li>
        </ol>
      </>
    )
  },
  tasks: [
    {
      points: 4,
      task: ({ data }) => (
        <>
          <p>Zeichnen Sie das v-t-Diagramm der Fahrt.</p>
          <Chart data={data} />
        </>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Konstantes Tempo ergibt waagerechte Abschnitte. Beim gleichmäßigen
            Bremsen fällt der Graph geradlinig.
          </p>
          <Chart data={data} solved />
        </>
      ),
    },
    {
      points: 4,
      task: () => (
        <p>
          Bestimmen Sie die Beschleunigung in beiden Bremsabschnitten. Begründen
          Sie anhand der Steigungen, in welchem Abschnitt stärker gebremst wird
          oder ob beide gleich stark sind.
        </p>
      ),
      solution({ data }) {
        const a2 = (data.slow - data.fast) / data.times[1],
          a4 = -data.slow / data.times[3]
        return (
          <>
            <p>
              Die Steigung entspricht der Beschleunigung{' '}
              {m('a=\\Delta v/\\Delta t')}.
            </p>
            <p>
              {m(
                `a_2=\\frac{${n(data.slow, 'm/s')}-${n(data.fast, 'm/s')}}{${n(data.times[1], 's')}}`,
              )}
            </p>
            {result('a_2', a2, 'm/s^2')}
            <p>
              {m(
                `a_4=\\frac{0\\,\\mathrm{m/s}-${n(data.slow, 'm/s')}}{${n(data.times[3], 's')}}`,
              )}
            </p>
            {result('a_4', a4, 'm/s^2')}
            <p>
              {a2 === a4
                ? 'Beide Steigungen sind gleich.'
                : `In Abschnitt ${a2 < a4 ? 2 : 4} fällt die Gerade steiler. Dort ist der Betrag der Verzögerung größer.`}
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      task: () => (
        <p>
          Berechnen Sie die gesamte zurückgelegte Strecke als Fläche unter dem
          Graphen.
        </p>
      ),
      solution({ data }) {
        const [a, b, c, d] = data.times
        const pieces = [
          data.fast * a,
          ((data.fast + data.slow) * b) / 2,
          data.slow * c,
          (data.slow * d) / 2,
        ]
        return (
          <>
            <Chart data={data} solved area />
            <p>
              Die Flächen sind Rechteck, Trapez, Rechteck und Dreieck. Beim
              Stillstand kommt keine Fläche hinzu.
            </p>
            <p>
              {m('A_1=v_1\\Delta t_1,\\quad A_2=\\tfrac12(v_1+v_3)\\Delta t_2')}
            </p>
            <p>{m('A_3=v_3\\Delta t_3,\\quad A_4=\\tfrac12 v_3\\Delta t_4')}</p>
            <p>{m(`\\Delta s=${pieces.map(s => n(s, 'm')).join('+')}`)}</p>
            {result(
              '\\Delta s',
              pieces.reduce((sum, s) => sum + s, 0),
              'm',
            )}
          </>
        )
      },
    },
  ],
}

function Diagram({
  xTicks,
  yTicks,
  curves,
  xLabel,
  yLabel,
  area,
}: {
  xTicks: number[]
  yTicks: number[]
  curves: {
    points: { x: number; y: number }[]
    color: string
    dots?: boolean
  }[]
  xLabel: string
  yLabel: string
  area?: boolean
}) {
  const left = 44,
    right = 382,
    top = 28,
    bottom = 214
  const xMax = xTicks[xTicks.length - 1],
    yMin = yTicks[0],
    yMax = yTicks[yTicks.length - 1]
  const sx = (x: number) => left + (x / xMax) * (right - left)
  const sy = (y: number) =>
    bottom - ((y - yMin) / (yMax - yMin)) * (bottom - top)
  const axis = sy(0)
  return (
    <svg
      viewBox="0 0 420 250"
      className="my-4 block w-full max-w-lg"
      role="img"
      aria-label={xLabel + ' und ' + yLabel}
    >
      <rect
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
        fill="white"
        stroke="#94a3b8"
      />
      {xTicks.map(x => (
        <g key={x}>
          <path d={`M${sx(x)},${top}V${bottom}`} stroke="#dbe2ea" />
          <text x={sx(x)} y={bottom + 16} textAnchor="middle" fontSize={12}>
            {pp(x)}
          </text>
        </g>
      ))}
      {yTicks.map(y => (
        <g key={y}>
          <path d={`M${left},${sy(y)}H${right}`} stroke="#dbe2ea" />
          <text x={left - 7} y={sy(y) + 4} textAnchor="end" fontSize={12}>
            {pp(y)}
          </text>
        </g>
      ))}
      {area &&
        curves.map(c => (
          <polygon
            key={c.color}
            points={[
              `${sx(c.points[0].x)},${axis}`,
              ...c.points.map(p => `${sx(p.x)},${sy(p.y)}`),
              `${sx(c.points[c.points.length - 1].x)},${axis}`,
            ].join(' ')}
            fill="#dbeafe"
          />
        ))}
      <path
        d={`M${left},${bottom}V${top - 10}m-4,7l4,-7l4,7 M${left},${axis}H${right + 12}m-7,-4l7,4l-7,4`}
        fill="none"
        stroke="#172033"
        strokeWidth={1.5}
      />
      <text x={left} y={12} fontSize={13}>
        {yLabel}
      </text>
      <text x={right} y={247} textAnchor="end" fontSize={13}>
        {xLabel}
      </text>
      {curves.map(c => (
        <g key={c.color}>
          <polyline
            points={c.points.map(p => `${sx(p.x)},${sy(p.y)}`).join(' ')}
            fill="none"
            stroke={c.color}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          {c.dots &&
            c.points.map((p, i) => (
              <circle
                key={i}
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={3.5}
                fill={c.color}
              />
            ))}
        </g>
      ))}
    </svg>
  )
}
