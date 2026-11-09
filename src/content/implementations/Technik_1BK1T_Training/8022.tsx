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
    text: 'Eine Kugel rollt horizontal über eine Tischkante.',
    heights: [0.8, 1, 1.2],
    speeds: [2, 3, 4],
  },
  {
    text: 'Ein Modellauto verlässt eine waagerechte Startbahn.',
    heights: [0.6, 0.9, 1.5],
    speeds: [2, 3, 5],
  },
  {
    text: 'Ein Prüfkörper wird auf einem Podest waagerecht abgeschossen.',
    heights: [1.5, 2, 2.5],
    speeds: [4, 6, 8],
  },
  {
    text: 'Ein Paket rutscht waagerecht vom Ende eines Förderbands.',
    heights: [0.5, 0.75, 1],
    speeds: [1, 1.5, 2],
  },
]
interface DATA {
  context: number
  h: number
  v0: number
  kmh: boolean
}
export const exercise8022: Exercise<DATA> = {
  title: 'Horizontalen Wurf berechnen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 13,
  generator(rng) {
    const context = rng.randomIntBetween(0, cases.length - 1),
      c = cases[context]
    return {
      context,
      h: rng.randomItemFromArray(c.heights),
      v0: rng.randomItemFromArray(c.speeds),
      kmh: rng.randomBoolean(),
    }
  },
  originalData: { context: 0, h: 1.2, v0: 3, kmh: false },
  constraint: ({ data }) =>
    !!cases[data.context] &&
    [data.h, data.v0].every(Number.isFinite) &&
    data.h > 0 &&
    data.v0 > 0,
  intro({ data }) {
    return (
      <>
        <p>
          {cases[data.context].text} Die Fallstrecke bis zum Boden beträgt{' '}
          {m(`y=${n(data.h, 'm')}`)}, die horizontale Anfangsgeschwindigkeit{' '}
          {m(`v_0=${data.kmh ? n(data.v0 * 3.6, 'km/h') : n(data.v0, 'm/s')}`)}.
        </p>
        <p>
          Die y-Achse zeigt vom Startpunkt nach unten. Verwenden Sie{' '}
          {m(`g=${n(g, 'm/s^2')}`)}; Luftwiderstand wird vernachlässigt.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 4,
      task: () => <p>Berechnen Sie die Flugzeit bis zum Aufprall.</p>,
      solution({ data }) {
        return (
          <>
            <p>
              Die Flugzeit ergibt sich aus der Fallbewegung. Nach {m('t')}{' '}
              aufgelöst:
            </p>
            <p>
              {m(
                `t=\\sqrt{\\frac{2y}{g}}=\\sqrt{\\frac{2\\cdot${n(data.h, 'm')}}{${n(g, 'm/s^2')}}}`,
              )}
            </p>
            {result('t', Math.sqrt((2 * data.h) / g), 's')}
          </>
        )
      },
    },
    {
      points: 4,
      task: () => (
        <p>
          Bestimmen Sie die horizontale Entfernung vom Startpunkt bis zur
          Landestelle.
        </p>
      ),
      solution({ data }) {
        const t = Math.sqrt((2 * data.h) / g)
        return (
          <>
            {data.kmh && (
              <p>{m(`v_0=${n(data.v0 * 3.6, 'km/h')}=${n(data.v0, 'm/s')}`)}</p>
            )}
            <p>Horizontal bleibt die Geschwindigkeit konstant.</p>
            <p>
              {m(
                `x(t)=v_0\\cdot t=${n(data.v0, 'm/s')}\\cdot\\sqrt{\\frac{2y}{g}}`,
              )}
            </p>
            {result('x(t)', data.v0 * t, 'm')}
          </>
        )
      },
    },
    {
      points: 5,
      task: () => (
        <p>
          Berechnen Sie den Betrag der Aufprallgeschwindigkeit und den
          Aufprallwinkel unterhalb der Horizontalen.
        </p>
      ),
      solution({ data }) {
        const vy = Math.sqrt(2 * g * data.h),
          v = Math.hypot(data.v0, vy)
        return (
          <>
            <p>
              {m(`v_x=v_0=${n(data.v0, 'm/s')}`)}; vertikal gilt{' '}
              {m('v_y(t)=g\\cdot t=\\sqrt{2gy}')}.
            </p>
            <p>
              {m(
                `v_y(t)=\\sqrt{2\\cdot${n(g, 'm/s^2')}\\cdot${n(data.h, 'm')}}`,
              )}
            </p>
            {result('v_y(t)', vy, 'm/s')}
            <p>{m('v=\\sqrt{v_x^2+v_y^2}')}</p>
            {result('v', v, 'm/s')}
            <p>
              {m(
                `\\alpha=\\arctan\\left(\\frac{v_y}{v_x}\\right)\\approx ${pp(round2((Math.atan2(vy, data.v0) * 180) / Math.PI))}^{\\circ}`,
              )}{' '}
              unterhalb der Horizontalen. Verwenden Sie die ungerundeten
              Zwischenwerte.
            </p>
          </>
        )
      },
    },
  ],
}
