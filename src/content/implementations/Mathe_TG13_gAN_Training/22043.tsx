import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  red: number
  blue: number
  variant: number
}
export const exercise22043: Exercise<DATA> = {
  title: 'Zu einem Wahrscheinlichkeitsterm ein Ereignis formulieren',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      red: rng.randomIntBetween(2, 5),
      blue: rng.randomIntBetween(2, 5),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { red: 3, blue: 2, variant: 1 },
  task({ data }) {
    const n = data.red + data.blue
    return (
      <>
        <p>
          Eine Urne enthält {data.red} rote und {data.blue} blaue Kugeln. Es
          wird zweimal mit Zurücklegen gezogen. Formulieren Sie ein Ereignis,
          dessen Wahrscheinlichkeit mit folgendem Term berechnet wird.
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`\frac{${data.red}}{${n}}\cdot\frac{${data.blue}}{${n}}`
                : data.variant === 1
                  ? String.raw`1-\left(\frac{${data.blue}}{${n}}\right)^2`
                  : String.raw`\left(\frac{${data.red}}{${n}}\right)^2+\left(\frac{${data.blue}}{${n}}\right)^2`
            }
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Ein passendes Ereignis ist: „
          {
            [
              'Die erste Kugel ist rot und die zweite blau.',
              'Es wird mindestens eine rote Kugel gezogen.',
              'Beide gezogenen Kugeln haben dieselbe Farbe.',
            ][data.variant]
          }
          “
        </p>
        <p>
          {
            [
              'Das Produkt gehört zu einem einzelnen Pfad in der vorgegebenen Reihenfolge.',
              'Abgezogen wird die Wahrscheinlichkeit für zweimal blau. Das ist das Gegenereignis zu mindestens einmal rot.',
              'Addiert werden die beiden unvereinbaren Pfade rot–rot und blau–blau.',
            ][data.variant]
          }
        </p>
        <p>Andere gleichbedeutende Formulierungen sind ebenfalls richtig.</p>
      </>
    )
  },
}
