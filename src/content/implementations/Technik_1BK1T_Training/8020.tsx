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

const cases = [
  {
    actor: 'Ein Boot fährt relativ zum Wasser nach rechts.',
    motion: 'Die Strömung bewegt das Wasser relativ zum Ufer.',
    frame: 'Ufer',
    a: [3, 4, 5],
    b: [1, 1.5, 2],
  },
  {
    actor: 'Eine Drohne fliegt relativ zur Luft nach rechts.',
    motion: 'Der Wind bewegt die Luft relativ zum Boden.',
    frame: 'Boden',
    a: [8, 10, 12],
    b: [2, 3, 4],
  },
  {
    actor: 'Eine Schwimmerin schwimmt relativ zum Wasser nach rechts.',
    motion: 'Die Strömung bewegt das Wasser relativ zum Ufer.',
    frame: 'Ufer',
    a: [1, 1.25, 1.5],
    b: [0.4, 0.5, 0.6],
  },
  {
    actor: 'Ein Roboter fährt relativ zu einer Plattform nach rechts.',
    motion: 'Die Plattform bewegt sich relativ zur Halle.',
    frame: 'Hallenboden',
    a: [0.8, 1, 1.2],
    b: [0.3, 0.4, 0.5],
  },
]
interface DATA {
  situation: number
  v1: number
  v2: number
  phi: number
}
function components(data: DATA) {
  const a = (data.phi * Math.PI) / 180
  const clean = (x: number) => (Math.abs(x) < 1e-10 ? 0 : x)
  return {
    x: clean(data.v1 + data.v2 * Math.cos(a)),
    y: clean(data.v2 * Math.sin(a)),
  }
}
export const exercise8020: Exercise<DATA> = {
  title: 'Geschwindigkeiten rechnerisch überlagern',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 10,
  generator(rng) {
    const situation = rng.randomIntBetween(0, cases.length - 1),
      c = cases[situation]
    return {
      situation,
      v1: rng.randomItemFromArray(c.a),
      v2: rng.randomItemFromArray(c.b),
      phi: rng.randomItemFromArray([-60, -30, 30, 60, 90, 120]),
    }
  },
  originalData: { situation: 0, v1: 4, v2: 2, phi: 60 },
  constraint: ({ data }) =>
    !!cases[data.situation] &&
    [data.v1, data.v2, data.phi].every(Number.isFinite) &&
    data.v1 > data.v2 &&
    data.v2 > 0 &&
    Math.abs(data.phi) <= 180,
  intro({ data }) {
    const c = cases[data.situation]
    return (
      <p>
        {c.actor} Der Betrag dieser Geschwindigkeit ist{' '}
        {m(`v_1=${n(data.v1, 'm/s')}`)}. {c.motion} Der Betrag beträgt{' '}
        {m(`v_2=${n(data.v2, 'm/s')}`)}. Ihr Pfeil bildet mit der Richtung nach
        rechts einen Winkel von {m(`${pp(Math.abs(data.phi))}^{\\circ}`)} nach{' '}
        {data.phi < 0 ? 'unten' : 'oben'} in der Draufsicht. Die x-Achse zeigt
        nach rechts, die y-Achse nach oben in der Zeichnung.
      </p>
    )
  },
  tasks: [
    {
      points: 5,
      task: ({ data }) => (
        <p>
          Berechnen Sie die beiden Komponenten der Geschwindigkeit relativ zum{' '}
          {cases[data.situation].frame}.
        </p>
      ),
      solution({ data }) {
        const { x, y } = components(data)
        return (
          <>
            <p>
              Die erste Geschwindigkeit wirkt nur in x-Richtung. Die zweite wird
              in x- und y-Richtung zerlegt und komponentenweise addiert.
            </p>
            <p>
              {m(
                `v_x=v_1+v_2\\cos\\varphi=${n(data.v1, 'm/s')}+${n(data.v2, 'm/s')}\\cos(${pp(data.phi)}^\\circ)`,
              )}
            </p>
            {result('v_x', x, 'm/s')}
            <p>
              {m(
                `v_y=v_2\\sin\\varphi=${n(data.v2, 'm/s')}\\sin(${pp(data.phi)}^\\circ)`,
              )}
            </p>
            {result('v_y', y, 'm/s')}
          </>
        )
      },
    },
    {
      points: 4,
      task: () => (
        <p>
          Bestimmen Sie den Betrag der resultierenden Geschwindigkeit und ihren
          Winkel zur positiven x-Richtung.
        </p>
      ),
      solution({ data }) {
        const { x, y } = components(data),
          beta = (Math.atan2(y, x) * 180) / Math.PI
        return (
          <>
            <p>{m('v_{\\mathrm{res}}=\\sqrt{v_x^2+v_y^2}')}</p>
            {result('v_{\\mathrm{res}}', Math.hypot(x, y), 'm/s')}
            <p>
              {m(
                `\\beta=\\arctan\\left(\\frac{v_y}{v_x}\\right)\\approx ${pp(round2(beta))}^{\\circ}`,
              )}
              .
            </p>
            <p>
              Der Pfeil zeigt nach rechts {beta < 0 ? 'unterhalb' : 'oberhalb'}{' '}
              der x-Achse. Gerechnet wird mit den ungerundeten Komponenten.
            </p>
          </>
        )
      },
    },
  ],
}
