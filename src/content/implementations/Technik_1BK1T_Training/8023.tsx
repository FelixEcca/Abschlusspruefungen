import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'
import { HorizontalWurfSkizze } from './wurf-skizzen'

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
  'eine Versuchskugel',
  'ein Modellwagen',
  'ein Prüfkörper',
  'ein kleines Paket',
]
interface DATA {
  object: number
  v0: number
  t: number
  target: 'speed' | 'height'
}
export const exercise8023: Exercise<DATA> = {
  title: 'Horizontalen Wurf rückwärts berechnen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 9,
  generator: rng => ({
    object: rng.randomIntBetween(0, objects.length - 1),
    v0: rng.randomItemFromArray([2, 3, 4, 5]),
    t: rng.randomItemFromArray([0.4, 0.5, 0.6, 0.8]),
    target: rng.randomItemFromArray(['speed', 'height']),
  }),
  originalData: { object: 0, v0: 3, t: 0.5, target: 'speed' },
  constraint: ({ data }) =>
    !!objects[data.object] &&
    [data.v0, data.t].every(Number.isFinite) &&
    data.v0 > 0 &&
    data.t > 0 &&
    ['speed', 'height'].includes(data.target),
  intro({ data }) {
    return (
      <>
        <p>
          Bei einem Versuch wird {objects[data.object]} waagerecht gestartet.
          Die Landestelle soll horizontal {m(`x=${n(data.v0 * data.t, 'm')}`)}{' '}
          vom Startpunkt entfernt sein. Rechnen Sie ohne Luftwiderstand mit{' '}
          {m(`g=${n(g, 'm/s^2')}`)}.
        </p>
        <p>
          Der Ursprung liegt am Abwurfpunkt; die positive y-Achse zeigt nach
          unten.
        </p>
        <HorizontalWurfSkizze
          distance={`x = ${(data.v0 * data.t).toLocaleString('de-DE', { maximumFractionDigits: 5 })} m`}
          height={
            data.target === 'height'
              ? 'y = ?'
              : `y = ${((g * data.t ** 2) / 2).toLocaleString('de-DE', { maximumFractionDigits: 5 })} m`
          }
          speed={data.target === 'speed' ? 'v₀ = ?' : `v₀ = ${data.v0} m/s`}
        />
      </>
    )
  },
  tasks: [
    {
      points: 5,
      task: ({ data }) =>
        data.target === 'speed' ? (
          <p>
            Die Fallstrecke bis zum Boden ist{' '}
            {m(`y=${n((g * data.t ** 2) / 2, 'm')}`)}. Bestimmen Sie die
            notwendige Anfangsgeschwindigkeit {m('v_0')}.
          </p>
        ) : (
          <p>
            Die Anfangsgeschwindigkeit ist {m(`v_0=${n(data.v0, 'm/s')}`)}.
            Bestimmen Sie die benötigte Abwurfhöhe über dem Boden.
          </p>
        ),
      solution({ data }) {
        const y = (g * data.t ** 2) / 2,
          x = data.v0 * data.t
        return data.target === 'speed' ? (
          <>
            <p>
              Aus der Formelsammlung: {m('y(t)=\\frac{1}{2}\\cdot g\\cdot t^2')}
              . Nach der positiven Flugzeit umstellen:
            </p>
            <p>
              {m(
                `t=\\sqrt{\\frac{2y}{g}}=\\sqrt{\\frac{2\\cdot${n(y, 'm')}}{${n(g, 'm/s^2')}}}`,
              )}
            </p>
            {result('t', data.t, 's')}
            <p>
              Aus der Formelsammlung: {m('x(t)=v_0\\cdot t')}. Durch {m('t')}{' '}
              teilen:
            </p>
            <p>
              {m(`v_0=\\frac{x}{t}=\\frac{${n(x, 'm')}}{${n(data.t, 's')}}`)}
            </p>
            {result('v_0', data.v0, 'm/s')}
          </>
        ) : (
          <>
            <p>
              Aus der Formelsammlung: {m('x(t)=v_0\\cdot t')}. Nach {m('t')}{' '}
              umstellen:
            </p>
            <p>
              {m(`t=\\frac{x}{v_0}=\\frac{${n(x, 'm')}}{${n(data.v0, 'm/s')}}`)}
            </p>
            {result('t', data.t, 's')}
            <p>
              Die Abwurfhöhe entspricht der Fallstrecke. Aus der Formelsammlung:
            </p>
            <p>
              {m(
                `y(t)=\\frac12gt^2=\\frac12\\cdot${n(g, 'm/s^2')}\\cdot(${n(data.t, 's')})^2`,
              )}
            </p>
            {result('y', y, 'm')}
          </>
        )
      },
    },
    {
      points: 3,
      task: ({ data }) => (
        <p>
          {data.target === 'speed'
            ? 'Wie verändert sich die horizontale Entfernung bei doppelter Startgeschwindigkeit und gleicher Höhe? Begründen Sie.'
            : 'Wie verändert sich die horizontale Entfernung bei vierfacher Abwurfhöhe und gleicher Startgeschwindigkeit? Begründen Sie.'}
        </p>
      ),
      solution: ({ data }) =>
        data.target === 'speed' ? (
          <p>
            Die Fallzeit bleibt gleich. Nach {m('x(t)=v_0\\cdot t')} verdoppelt
            sich die horizontale Entfernung.
          </p>
        ) : (
          <p>
            Mit {m('t=\\sqrt{2y/g}')} ergibt sich bei vierfacher Fallstrecke die
            doppelte Flugzeit. Bei konstantem {m('v_0')} verdoppelt sich deshalb
            auch {m('x(t)=v_0\\cdot t')}.
          </p>
        ),
    },
  ],
}
