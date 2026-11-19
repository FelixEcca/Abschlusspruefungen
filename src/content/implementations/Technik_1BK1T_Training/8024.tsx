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
    text: 'Eine Schülerin wirft einen Schlagball schräg nach oben.',
    speeds: [10, 12, 14],
  },
  {
    text: 'Ein Spieler wirft einen Basketball schräg nach oben.',
    speeds: [6, 7, 8],
  },
  {
    text: 'Eine Ballwurfmaschine startet einen Tennisball schräg nach oben.',
    speeds: [12, 15, 18],
  },
  {
    text: 'Ein Modellkörper verlässt eine schräge Abschussrampe.',
    speeds: [5, 7, 9],
  },
]
interface DATA {
  context: number
  v0: number
  alpha: number
}
function components(data: DATA) {
  const angle = (data.alpha * Math.PI) / 180
  return { x: data.v0 * Math.cos(angle), y: data.v0 * Math.sin(angle) }
}
export const exercise8024: Exercise<DATA> = {
  title: 'Schiefen Wurf bis zum höchsten Punkt berechnen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 11,
  generator(rng) {
    const context = rng.randomIntBetween(0, cases.length - 1)
    return {
      context,
      v0: rng.randomItemFromArray(cases[context].speeds),
      alpha: rng.randomItemFromArray([25, 30, 40, 45, 55, 60]),
    }
  },
  originalData: { context: 0, v0: 12, alpha: 30 },
  constraint: ({ data }) =>
    !!cases[data.context] &&
    [data.v0, data.alpha].every(Number.isFinite) &&
    data.v0 > 0 &&
    data.alpha > 0 &&
    data.alpha < 90,
  intro({ data }) {
    return (
      <p>
        {cases[data.context].text} Die Abwurfgeschwindigkeit beträgt{' '}
        {m(`v_0=${n(data.v0, 'm/s')}`)}, der Abwurfwinkel zur Horizontalen{' '}
        {m(`\\alpha=${pp(data.alpha)}^\\circ`)}. Die y-Achse zeigt vom
        Abwurfpunkt nach oben. Es gilt {m(`g=${n(g, 'm/s^2')}`)}; der
        Luftwiderstand wird vernachlässigt.
      </p>
    )
  },
  tasks: [
    {
      points: 4,
      task: () => (
        <p>
          Berechnen Sie die horizontale und die vertikale Komponente der
          Abwurfgeschwindigkeit.
        </p>
      ),
      solution({ data }) {
        const v = components(data)
        return (
          <>
            <p>
              {m(
                `v_{0x}=v_0\\cos\\alpha=${n(data.v0, 'm/s')}\\cdot\\cos(${pp(data.alpha)}^\\circ)`,
              )}
            </p>
            {result('v_{0x}', v.x, 'm/s')}
            <p>
              {m(
                `v_{0y}=v_0\\sin\\alpha=${n(data.v0, 'm/s')}\\cdot\\sin(${pp(data.alpha)}^\\circ)`,
              )}
            </p>
            {result('v_{0y}', v.y, 'm/s')}
          </>
        )
      },
    },
    {
      points: 4,
      task: () => (
        <p>
          Bestimmen Sie Steigzeit {m('t_{\\mathrm{steig}}')} und Steighöhe{' '}
          {m('h_{\\mathrm{steig}}')}.
        </p>
      ),
      solution({ data }) {
        const vy = components(data).y
        return (
          <>
            <p>Setzen Sie die vertikale Abwurfkomponente ungerundet ein.</p>
            <p>
              {m(
                `t_{\\mathrm{steig}}=\\frac{v_{0y}}{g}\\approx\\frac{${n(round2(vy), 'm/s')}}{${n(g, 'm/s^2')}}`,
              )}
            </p>
            {result('t_{\\mathrm{steig}}', vy / g, 's')}
            <p>
              {m(
                `h_{\\mathrm{steig}}=\\frac{v_{0y}^2}{2g}\\approx\\frac{(${n(round2(vy), 'm/s')})^2}{2\\cdot${n(g, 'm/s^2')}}`,
              )}
            </p>
            {result('h_{\\mathrm{steig}}', (vy * vy) / (2 * g), 'm')}
          </>
        )
      },
    },
    {
      points: 3,
      task: () => (
        <p>
          Beurteilen Sie die Aussage: „Am höchsten Punkt steht der Körper kurz
          still.“
        </p>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Nur die vertikale Komponente ist am höchsten Punkt null. Die
            horizontale Komponente bleibt konstant, weil es keine horizontale
            Beschleunigung gibt.
          </p>
          {result('v_x=v_{0x}', components(data).x, 'm/s')}
        </>
      ),
    },
  ],
}
