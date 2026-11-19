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
const objects = [
  'Ein Stein',
  'Eine Metallkugel',
  'Ein Werkzeug',
  'Ein Sandsäckchen',
]
type Given = 'height' | 'time' | 'speed'
interface DATA {
  object: number
  given: Given
  t: number
}

export const exercise8015: Exercise<DATA> = {
  title: 'Freien Fall berechnen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 9,
  generator: rng => ({
    object: rng.randomIntBetween(0, objects.length - 1),
    given: rng.randomItemFromArray(['height', 'time', 'speed']),
    t: rng.randomItemFromArray([0.6, 0.8, 1, 1.2, 1.5, 2]),
  }),
  originalData: { object: 0, given: 'height', t: 1.2 },
  constraint: ({ data }) =>
    !!objects[data.object] &&
    ['height', 'time', 'speed'].includes(data.given) &&
    Number.isFinite(data.t) &&
    data.t > 0,
  intro({ data }) {
    const y = (g * data.t ** 2) / 2,
      v = g * data.t
    return (
      <>
        <p>
          {objects[data.object]} wird aus der Ruhe fallen gelassen.
          Vernachlässigen Sie den Luftwiderstand. Es gilt{' '}
          {m(`g=${n(g, 'm/s^2')}`)}. Die Fallstrecke {m('y')} wird vom
          Startpunkt aus nach unten gemessen.
        </p>
        <p>
          {data.given === 'height' ? (
            <>Bis zum Boden beträgt die Fallstrecke {m(`y=${n(y, 'm')}`)}.</>
          ) : data.given === 'time' ? (
            <>Der Körper trifft nach {m(n(data.t, 's'))} auf dem Boden auf.</>
          ) : (
            <>
              Beim Aufprall beträgt seine Geschwindigkeit{' '}
              {m(`v=${n(v, 'm/s')}`)}.
            </>
          )}
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 5,
      task: ({ data }) => (
        <p>
          {data.given === 'height'
            ? 'Berechnen Sie die Fallzeit und die Aufprallgeschwindigkeit.'
            : data.given === 'time'
              ? 'Berechnen Sie die Fallstrecke und die Aufprallgeschwindigkeit.'
              : 'Berechnen Sie die Fallzeit und die Fallstrecke.'}
        </p>
      ),
      solution({ data }) {
        const t = data.t,
          y = (g * t * t) / 2,
          v = g * t
        return (
          <>
            {data.given === 'height' && (
              <>
                <p>
                  {m(
                    `t=\\sqrt{\\frac{2y}{g}}=\\sqrt{\\frac{2\\cdot${n(y, 'm')}}{${n(g, 'm/s^2')}}}`,
                  )}
                </p>
                {result('t', t, 's')}
                <p>
                  {m(
                    `v=\\sqrt{2gy}=\\sqrt{2\\cdot${n(g, 'm/s^2')}\\cdot${n(y, 'm')}}`,
                  )}
                </p>
                {result('v', v, 'm/s')}
              </>
            )}
            {data.given !== 'height' && (
              <>
                {data.given === 'speed' ? (
                  <>
                    <p>
                      {m(
                        `t=\\frac{v}{g}=\\frac{${n(v, 'm/s')}}{${n(g, 'm/s^2')}}`,
                      )}
                    </p>
                    {result('t', t, 's')}
                  </>
                ) : (
                  <>
                    <p>
                      {m(`v(t)=g\\cdot t=${n(g, 'm/s^2')}\\cdot${n(t, 's')}`)}
                    </p>
                    {result('v', v, 'm/s')}
                  </>
                )}
                <p>
                  {m(
                    `y(t)=\\frac12gt^2=\\frac12\\cdot${n(g, 'm/s^2')}\\cdot(${n(t, 's')})^2`,
                  )}
                </p>
                {result('y', y, 'm')}
              </>
            )}
          </>
        )
      },
    },
    {
      points: 3,
      task: () => (
        <p>
          Wie weit ist der Körper nach der halben Fallzeit gefallen? Wie hoch
          ist er dann noch über dem Boden?
        </p>
      ),
      solution({ data }) {
        const y = (g * data.t ** 2) / 2
        return (
          <>
            <p>
              {m('y(t/2)=\\frac12g(t/2)^2=y(t)/4')}. Nach halber Zeit ist erst
              ein Viertel der gesamten Fallstrecke zurückgelegt.
            </p>
            {result('y(t/2)', y / 4, 'm')}
            <p>
              Die verbleibende Höhe ist die gesamte Fallstrecke minus dieser
              Teilstrecke.
            </p>
            {result('h', (3 * y) / 4, 'm')}
          </>
        )
      },
    },
  ],
}
