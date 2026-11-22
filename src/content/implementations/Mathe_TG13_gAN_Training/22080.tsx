import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  gain: number
  denominator: number
  unit: number
  context: number
}
export const exercise22080: Exercise<DATA> = {
  title:
    'Ein mehrstufiges Glücksspiel mit vorgegebenem Veranstaltergewinn entwerfen',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      gain: rng.randomIntBetween(1, 8),
      denominator: rng.randomIntBetween(2, 4),
      unit: rng.randomIntBetween(1, 3),
      context: rng.randomIntBetween(0, 3),
    }
  },
  originalData: { gain: 1, denominator: 2, unit: 1, context: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Für{' '}
          {
            [
              'ein Klassenfest',
              'ein Schulfest',
              'einen Tag der offenen Tür',
              'ein Vereinsfest',
            ][data.context]
          }{' '}
          soll ein mehrstufiges Glücksspiel entwickelt werden. Der Veranstalter
          soll im langfristigen Mittel {data.gain} € pro Spiel gewinnen.
        </p>
        <p>
          Beschreiben Sie Versuch, Einsatz und Auszahlungen. Weisen Sie den
          erwarteten Gewinn nach und erklären Sie, warum das Ergebnis nicht für
          jedes einzelne Spiel garantiert ist.
        </p>
      </>
    )
  },
  solution({ data }) {
    const payout = data.denominator ** 2 * data.unit,
      stake = data.gain + data.unit
    return (
      <>
        <p>
          Ein mögliches Spiel: In einer Urne liegen eine goldene und{' '}
          {data.denominator - 1} weiße Kugeln. Es wird zweimal mit Zurücklegen
          gezogen. Nur bei zweimal Gold gibt es {payout} € ausgezahlt, sonst
          nichts. Der Einsatz beträgt {stake} €.
        </p>
        <p>
          <InlineMath
            math={String.raw`P(GG)=\frac1{${data.denominator}^2},\quad E(A)=\frac{${payout}}{${data.denominator ** 2}}=${data.unit}`}
          />{' '}
          Euro.
        </p>
        <p>
          <InlineMath
            math={String.raw`E(\text{Veranstaltergewinn})=${stake}-${data.unit}=${data.gain}`}
          />{' '}
          Euro.
        </p>
        <p>
          Beide Ziehungen beeinflussen die Auszahlung. Der erwartete Gewinn ist
          ein langfristiger Durchschnitt; einzelne Spiele können Verluste
          bringen. Andere mehrstufige Experimente sind möglich, wenn
          Wahrscheinlichkeiten und Erwartungswert stimmen.
        </p>
      </>
    )
  },
}
