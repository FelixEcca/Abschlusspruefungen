import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  red: number
  blue: number
  green: number
  variant: number
}
export const exercise22038: Exercise<DATA> = {
  title: 'Ergebnisse, Ereignisse und Laplace-Wahrscheinlichkeiten',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      red: rng.randomIntBetween(1, 5),
      blue: rng.randomIntBetween(1, 5),
      green: rng.randomIntBetween(1, 5),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { red: 3, blue: 2, green: 1, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          In einer Urne liegen {data.red} rote, {data.blue} blaue und{' '}
          {data.green} grüne Kugeln. Jede einzelne Kugel wird gleich
          wahrscheinlich gezogen.
        </p>
        <p>
          Bestimmen Sie die Wahrscheinlichkeit für „
          {['rot', 'nicht rot', 'rot oder blau'][data.variant]}“. Sind die drei
          Farben automatisch gleich wahrscheinlich?
        </p>
      </>
    )
  },
  solution({ data }) {
    const total = data.red + data.blue + data.green,
      favorable = [data.red, data.blue + data.green, data.red + data.blue][
        data.variant
      ]
    return (
      <>
        <p>
          Es gibt {total} gleich wahrscheinliche Kugeln, davon {favorable}{' '}
          günstige.
        </p>
        <p>
          <InlineMath
            math={String.raw`P=\frac{${favorable}}{${total}}=${frac(favorable, total)}`}
          />
          .
        </p>
        <p>
          Die Kugeln sind gleich wahrscheinlich, die Farben nur dann, wenn
          gleich viele Kugeln jeder Farbe vorliegen.{' '}
          {data.red === data.blue && data.blue === data.green
            ? 'Das ist hier der Fall.'
            : 'Das ist hier nicht der Fall.'}
        </p>
      </>
    )
  },
}
