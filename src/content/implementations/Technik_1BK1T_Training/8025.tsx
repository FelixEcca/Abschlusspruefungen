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

const g = 9.81
const cases = [
  {
    text: 'Ein Speer wird schräg nach oben geworfen.',
    speeds: [22, 26, 30],
    heights: [1.6, 1.8, 2],
  },
  {
    text: 'Ein Schlagball wird von einem niedrigen Podest geworfen.',
    speeds: [10, 12, 14],
    heights: [1, 1.5, 2],
  },
  {
    text: 'Eine Ballwurfmaschine wirft einen Ball über eine freie Fläche.',
    speeds: [12, 16, 20],
    heights: [0.8, 1.2, 1.6],
  },
  {
    text: 'Ein Versuchskörper verlässt die Startschiene eines Prüfstands.',
    speeds: [6, 8, 10],
    heights: [0.5, 0.75, 1],
  },
]
interface DATA {
  context: number
  v0: number
  alpha: number
  h0: number
}
function flight(data: DATA) {
  const a = (data.alpha * Math.PI) / 180,
    vx = data.v0 * Math.cos(a),
    vy = data.v0 * Math.sin(a)
  const tSteig = vy / g,
    hSteig = vy ** 2 / (2 * g),
    hFall = data.h0 + hSteig,
    tFall = Math.sqrt((2 * hFall) / g)
  return { vx, vy, tSteig, hSteig, hFall, tFall, w: vx * (tSteig + tFall) }
}
function FlightChart({ data }: { data: DATA }) {
  const f = flight(data),
    total = f.tSteig + f.tFall,
    dx =
      [1, 2, 5, 10, 20, 50].find(step => f.w <= 10 * step) ??
      Math.ceil(f.w / 10),
    dy =
      [1, 2, 5, 10, 20].find(step => f.hFall <= 8 * step) ??
      Math.ceil(f.hFall / 8)
  const xMax = (Math.ceil(f.w / dx) + 1) * dx,
    yMin = Math.floor(-data.h0 / dy) * dy,
    yMax = Math.ceil(f.hSteig / dy) * dy + dy
  const trajectory = Array.from({ length: 101 }, (_, i) => {
    const t = (total * i) / 100
    return { x: f.vx * t, y: i === 100 ? -data.h0 : f.vy * t - (g * t * t) / 2 }
  })
  return (
    <Diagram
      xLabel="x in m"
      yLabel="y in m"
      xTicks={Array.from({ length: xMax / dx + 1 }, (_, i) => i * dx)}
      yTicks={Array.from(
        { length: (yMax - yMin) / dy + 1 },
        (_, i) => yMin + i * dy,
      )}
      curves={[
        {
          points: [
            { x: 0, y: -data.h0 },
            { x: xMax, y: -data.h0 },
          ],
          color: '#64748b',
        },
        { points: trajectory, color: '#2563eb' },
      ]}
    />
  )
}
export const exercise8025: Exercise<DATA> = {
  title: 'Schiefen Wurf vollständig berechnen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 17,
  generator(rng) {
    const context = rng.randomIntBetween(0, cases.length - 1),
      c = cases[context]
    return {
      context,
      v0: rng.randomItemFromArray(c.speeds),
      alpha: rng.randomItemFromArray([30, 35, 40, 45, 55]),
      h0: rng.randomItemFromArray(c.heights),
    }
  },
  originalData: { context: 0, v0: 30, alpha: 45, h0: 2 },
  constraint({ data }) {
    if (
      !cases[data.context] ||
      ![data.v0, data.alpha, data.h0].every(Number.isFinite) ||
      data.v0 <= 0 ||
      data.h0 <= 0 ||
      data.alpha <= 0 ||
      data.alpha >= 90
    )
      return false
    const f = flight(data),
      t = f.tSteig + f.tFall
    return (
      f.w > 0 &&
      f.hFall > data.h0 &&
      Math.abs(f.vy * t - (g * t * t) / 2 + data.h0) < 1e-7
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          {cases[data.context].text} Es gelten {m(`v_0=${n(data.v0, 'm/s')}`)},{' '}
          {m(`\\alpha=${pp(data.alpha)}^\\circ`)} und die Abwurfhöhe{' '}
          {m(`h_0=${n(data.h0, 'm')}`)}.
        </p>
        <p>
          Der Abwurfpunkt ist der Ursprung, die y-Achse zeigt nach oben. Die
          graue Linie markiert den Boden. Rechnen Sie ohne Luftwiderstand mit{' '}
          {m(`g=${n(g, 'm/s^2')}`)}.
        </p>
        <FlightChart data={data} />
      </>
    )
  },
  tasks: [
    {
      points: 3,
      task: () => (
        <p>Lesen Sie Steighöhe und Wurfweite näherungsweise am Schaubild ab.</p>
      ),
      solution({ data }) {
        const f = flight(data)
        return (
          <>
            <p>
              Die Steighöhe ist der y-Wert am höchsten Punkt. Die Wurfweite ist
              der x-Wert dort, wo die Flugbahn den Boden erreicht. Die
              rechnerischen Vergleichswerte sind:
            </p>
            {result('h_{\\mathrm{steig}}', f.hSteig, 'm')}
            {result('w', f.w, 'm')}
            <p>Beim Ablesen sind kleine Abweichungen möglich.</p>
          </>
        )
      },
    },
    {
      points: 6,
      task: () => (
        <p>
          Berechnen Sie die Abwurfkomponenten, die Steigzeit und die Steighöhe.
        </p>
      ),
      solution({ data }) {
        const f = flight(data)
        return (
          <>
            <p>
              {m(
                `v_{0x}=v_0\\cos\\alpha=${n(data.v0, 'm/s')}\\cos(${pp(data.alpha)}^\\circ)`,
              )}
            </p>
            {result('v_{0x}', f.vx, 'm/s')}
            <p>
              {m(
                `v_{0y}=v_0\\sin\\alpha=${n(data.v0, 'm/s')}\\sin(${pp(data.alpha)}^\\circ)`,
              )}
            </p>
            {result('v_{0y}', f.vy, 'm/s')}
            <p>
              {m(
                `t_{\\mathrm{steig}}=\\frac{v_{0y}}{g}\\approx\\frac{${n(round2(f.vy), 'm/s')}}{${n(g, 'm/s^2')}}`,
              )}
            </p>
            {result('t_{\\mathrm{steig}}', f.tSteig, 's')}
            <p>
              {m(
                `h_{\\mathrm{steig}}=\\frac{v_{0y}^2}{2g}\\approx\\frac{(${n(round2(f.vy), 'm/s')})^2}{2\\cdot${n(g, 'm/s^2')}}`,
              )}
            </p>
            {result('h_{\\mathrm{steig}}', f.hSteig, 'm')}
          </>
        )
      },
    },
    {
      points: 6,
      task: () => (
        <p>
          Berechnen Sie die Fallzeit ab dem höchsten Punkt und die Wurfweite.
          Vergleichen Sie die Wurfweite mit Ihrem abgelesenen Wert.
        </p>
      ),
      solution({ data }) {
        const f = flight(data)
        return (
          <>
            <p>
              Vom höchsten Punkt bis zum Boden kommt zur Steighöhe die
              Abwurfhöhe hinzu.
            </p>
            <p>
              {m(
                `h_{\\mathrm{fall}}=h_0+h_{\\mathrm{steig}}=${n(data.h0, 'm')}+h_{\\mathrm{steig}}`,
              )}
            </p>
            {result('h_{\\mathrm{fall}}', f.hFall, 'm')}
            <p>
              {m(
                `t_{\\mathrm{fall}}=\\sqrt{\\frac{2h_{\\mathrm{fall}}}{g}}\\approx\\sqrt{\\frac{2\\cdot${n(round2(f.hFall), 'm')}}{${n(g, 'm/s^2')}}}`,
              )}
            </p>
            {result('t_{\\mathrm{fall}}', f.tFall, 's')}
            <p>{m('w=v_{0x}(t_{\\mathrm{steig}}+t_{\\mathrm{fall}})')}</p>
            <p>
              {m(
                `w\\approx ${n(round2(f.vx), 'm/s')}\\cdot(${n(round2(f.tSteig), 's')}+${n(round2(f.tFall), 's')})`,
              )}
            </p>
            {result('w', f.w, 'm')}
            <p>
              Mit ungerundeten Zwischenwerten berechnet. Im Schaubild liegt der
              Landepunkt bei ungefähr derselben horizontalen Entfernung.
            </p>
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
