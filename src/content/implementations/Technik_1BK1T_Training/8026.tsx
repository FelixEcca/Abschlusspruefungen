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
const contexts = [
  'Ein Versuch mit einem Schlagball wurde gefilmt.',
  'Eine Ballwurfmaschine wird anhand ihrer Flugbahn ausgewertet.',
  'Bei einem Modellwurf wurden Flugzeit und Wurfweite gemessen.',
  'Ein Prüfkörper wurde von einer erhöhten Startrampe abgeschossen.',
]
interface DATA {
  context: number
  vx: number
  tSteig: number
  tFall: number
}
function observations(data: DATA) {
  const t = data.tSteig + data.tFall,
    w = data.vx * t,
    h = (g * data.tSteig ** 2) / 2
  return { t, w, h }
}
export const exercise8026: Exercise<DATA> = {
  title: 'Schwer: Einen schiefen Wurf rekonstruieren',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 15,
  generator(rng) {
    const tSteig = rng.randomItemFromArray([0.6, 0.8, 1, 1.2])
    return {
      context: rng.randomIntBetween(0, contexts.length - 1),
      vx: rng.randomItemFromArray([6, 8, 10, 12, 14]),
      tSteig,
      tFall: round2(tSteig + rng.randomItemFromArray([0.1, 0.2, 0.3])),
    }
  },
  originalData: { context: 3, vx: 10, tSteig: 0.8, tFall: 1.1 },
  constraint({ data }) {
    if (
      !contexts[data.context] ||
      ![data.vx, data.tSteig, data.tFall].every(Number.isFinite) ||
      data.vx <= 0 ||
      data.tSteig <= 0 ||
      data.tFall <= data.tSteig
    )
      return false
    const { t, w, h } = observations(data)
    return (
      w > 0 &&
      h > 0 &&
      t > 0 &&
      (g * (data.tFall ** 2 - data.tSteig ** 2)) / 2 > 0
    )
  },
  intro({ data }) {
    const { t, w, h } = observations(data)
    return (
      <>
        <p>{contexts[data.context]}</p>
        <ul>
          <li>Gesamte Flugzeit: {m(`t_{\\mathrm{ges}}=${n(t, 's')}`)}</li>
          <li>Wurfweite: {m(`w=${n(w, 'm')}`)}</li>
          <li>
            Steighöhe über dem Abwurfpunkt:{' '}
            {m(`h_{\\mathrm{steig}}=${n(h, 'm')}`)}
          </li>
        </ul>
        <p>
          Die y-Achse zeigt vom Abwurfpunkt nach oben. Rechnen Sie ohne
          Luftwiderstand mit {m(`g=${n(g, 'm/s^2')}`)}.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 5,
      task: () => (
        <p>
          Bestimmen Sie die horizontale und die vertikale Komponente der
          Abwurfgeschwindigkeit.
        </p>
      ),
      solution({ data }) {
        const { t, w, h } = observations(data)
        return (
          <>
            <p>
              Die horizontale Komponente bleibt während der gesamten Flugzeit
              konstant.
            </p>
            <p>
              {m(
                `v_{0x}=\\frac{w}{t_{\\mathrm{ges}}}=\\frac{${n(w, 'm')}}{${n(t, 's')}}`,
              )}
            </p>
            {result('v_{0x}', w / t, 'm/s')}
            <p>
              Stellen Sie die Formel für die Steighöhe nach {m('v_{0y}')} um.
              Der Körper steigt zunächst, deshalb ist die positive Wurzel
              richtig.
            </p>
            <p>
              {m(
                `v_{0y}=\\sqrt{2g h_{\\mathrm{steig}}}=\\sqrt{2\\cdot${n(g, 'm/s^2')}\\cdot${n(h, 'm')}}`,
              )}
            </p>
            {result('v_{0y}', Math.sqrt(2 * g * h), 'm/s')}
          </>
        )
      },
    },
    {
      points: 5,
      task: () => (
        <p>
          Berechnen Sie den Betrag der Abwurfgeschwindigkeit und den
          Abwurfwinkel zur Horizontalen.
        </p>
      ),
      solution({ data }) {
        const vy = g * data.tSteig
        return (
          <>
            <p>Die Komponenten bilden ein rechtwinkliges Dreieck.</p>
            <p>
              {m(
                `v_0=\\sqrt{v_{0x}^2+v_{0y}^2}=\\sqrt{(${n(data.vx, 'm/s')})^2+(${n(vy, 'm/s')})^2}`,
              )}
            </p>
            {result('v_0', Math.hypot(data.vx, vy), 'm/s')}
            <p>
              {m(
                `\\alpha=\\arctan\\left(\\frac{v_{0y}}{v_{0x}}\\right)=\\arctan\\left(\\frac{${pp(vy)}}{${pp(data.vx)}}\\right)`,
              )}
            </p>
            <p>
              <strong>
                {m(
                  `\\alpha\\approx${pp(round2((Math.atan2(vy, data.vx) * 180) / Math.PI))}^\\circ`,
                )}
              </strong>
            </p>
          </>
        )
      },
    },
    {
      points: 5,
      task: () => (
        <p>Bestimmen Sie, wie hoch der Abwurfpunkt über der Landestelle lag.</p>
      ),
      solution({ data }) {
        const { t, h } = observations(data),
          fall = (g * data.tFall ** 2) / 2
        return (
          <>
            <p>{m('t_{\\mathrm{steig}}=v_{0y}/g')}</p>
            {result('t_{\\mathrm{steig}}', data.tSteig, 's')}
            <p>
              {m(
                `t_{\\mathrm{fall}}=t_{\\mathrm{ges}}-t_{\\mathrm{steig}}=${n(t, 's')}-${n(data.tSteig, 's')}`,
              )}
            </p>
            {result('t_{\\mathrm{fall}}', data.tFall, 's')}
            <p>
              {m(
                `h_{\\mathrm{fall}}=\\tfrac12g\\cdot t_{\\mathrm{fall}}^2=\\tfrac12\\cdot${n(g, 'm/s^2')}\\cdot(${n(data.tFall, 's')})^2`,
              )}
            </p>
            {result('h_{\\mathrm{fall}}', fall, 'm')}
            <p>{m('h_0=h_{\\mathrm{fall}}-h_{\\mathrm{steig}}')}</p>
            {result('h_0', fall - h, 'm')}
          </>
        )
      },
    },
  ],
}
