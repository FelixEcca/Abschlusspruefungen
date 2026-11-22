import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  red: number
  blue: number
}
export const exercise22040: Exercise<DATA> = {
  title: 'Ziehen ohne Zurücklegen Schritt für Schritt',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return { red: rng.randomIntBetween(2, 5), blue: rng.randomIntBetween(2, 5) }
  },
  originalData: { red: 3, blue: 2 },
  task({ data }) {
    return (
      <>
        <p>
          Eine Urne enthält {data.red} rote und {data.blue} blaue Kugeln.
          Zweimal wird ohne Zurücklegen gezogen.
        </p>
        <p>
          Die erste Kugel ist rot. Wie viele Kugeln jeder Farbe bleiben?
          Berechnen Sie anschließend die Wahrscheinlichkeit für den
          vollständigen Pfad „zuerst rot, dann blau“.
        </p>
      </>
    )
  },
  solution({ data }) {
    const total = data.red + data.blue
    return (
      <>
        <p>
          Nach der roten Kugel bleiben {data.red - 1} rote und {data.blue}{' '}
          blaue, insgesamt {total - 1} Kugeln. Die Zahl der blauen Kugeln ändert
          sich nicht.
        </p>
        <p>
          Für den vollständigen Pfad werden die beiden Wahrscheinlichkeiten
          multipliziert:
        </p>
        <p>
          <InlineMath
            math={String.raw`P(RB)=\frac{${data.red}}{${total}}\cdot\frac{${data.blue}}{${total - 1}}=${frac(data.red * data.blue, total * (total - 1))}`}
          />
          .
        </p>
      </>
    )
  },
}
