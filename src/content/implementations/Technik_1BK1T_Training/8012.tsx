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
    text: 'Ein Pkw bremst vor einer Baustelle.',
    speeds: [36, 54, 72],
    av: [-4, -5, -6],
  },
  {
    text: 'Ein Fahrrad bremst vor einer Kreuzung.',
    speeds: [18, 21.6, 25.2],
    av: [-2, -2.5, -3],
  },
  {
    text: 'Eine Straßenbahn bremst vor einer Haltestelle.',
    speeds: [21.6, 28.8, 36],
    av: [-1, -1.2, -1.5],
  },
  {
    text: 'Ein Lieferwagen bremst vor einem Hindernis.',
    speeds: [36, 43.2, 54],
    av: [-3, -4, -5],
  },
]
interface DATA {
  situation: number
  speed: number
  av: number
  reaction: number
}

export const exercise8012: Exercise<DATA> = {
  title: 'Bremsen bis zum Stillstand',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 10,
  generator(rng) {
    const situation = rng.randomIntBetween(0, cases.length - 1)
    const c = cases[situation]
    return {
      situation,
      speed: rng.randomItemFromArray(c.speeds),
      av: rng.randomItemFromArray(c.av),
      reaction: rng.randomItemFromArray([0, 0.6, 0.8, 1]),
    }
  },
  originalData: { situation: 0, speed: 54, av: -5, reaction: 0.8 },
  constraint({ data }) {
    return (
      !!cases[data.situation] &&
      [data.speed, data.av, data.reaction].every(Number.isFinite) &&
      data.speed > 0 &&
      data.av < 0 &&
      data.reaction >= 0
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          {cases[data.situation].text} Die Anfangsgeschwindigkeit beträgt{' '}
          {m(`v_0=${n(data.speed, 'km/h')}`)}. Die Verzögerung beim Bremsen ist
          konstant: {m(`a_v=${n(data.av, 'm/s^2')}`)}.
        </p>
        {data.reaction > 0 && (
          <p>
            Vor dem Bremsen fährt das Fahrzeug noch {m(n(data.reaction, 's'))}{' '}
            mit unveränderter Geschwindigkeit weiter.
          </p>
        )}
      </>
    )
  },
  tasks: [
    {
      points: 4,
      task: () => (
        <p>Berechnen Sie die Bremszeit {m('t_v')} ab Beginn des Bremsens.</p>
      ),
      solution({ data }) {
        const v = data.speed / 3.6
        return (
          <>
            <p>{m(`v_0=${n(data.speed, 'km/h')}=${n(v, 'm/s')}`)}</p>
            <p>
              {m(
                `t_v=-\\frac{v_0}{a_v}=-\\frac{${n(v, 'm/s')}}{${n(data.av, 'm/s^2')}}`,
              )}
            </p>
            {result('t_v', -v / data.av, 's')}
          </>
        )
      },
    },
    {
      points: 6,
      task: ({ data }) => (
        <p>
          Berechnen Sie den Bremsweg {m('s_v')}
          {data.reaction > 0
            ? ', den Reaktionsweg und den gesamten Anhalteweg'
            : ''}
          .
        </p>
      ),
      solution({ data }) {
        const v = data.speed / 3.6,
          sv = (-v * v) / (2 * data.av),
          sr = v * data.reaction
        return (
          <>
            <p>
              {m(
                `s_v=-\\frac{v_0^2}{2a_v}=-\\frac{(${n(v, 'm/s')})^2}{2\\cdot(${n(data.av, 'm/s^2')})}`,
              )}
            </p>
            {result('s_v', sv, 'm')}
            {data.reaction > 0 && (
              <>
                <p>Während der Reaktion ist die Bewegung gleichförmig.</p>
                <p>
                  {m(
                    `s_{\\mathrm R}=v_0\\cdot t_{\\mathrm R}=${n(v, 'm/s')}\\cdot${n(data.reaction, 's')}`,
                  )}
                </p>
                {result('s_{\\mathrm R}', sr, 'm')}
                <p>
                  Der Anhalteweg ist die Summe aus Reaktionsweg und Bremsweg.
                </p>
                <p>{m('s_{\\mathrm A}=s_{\\mathrm R}+s_v')}</p>
                {result('s_{\\mathrm A}', sr + sv, 'm')}
              </>
            )}
          </>
        )
      },
    },
  ],
}
