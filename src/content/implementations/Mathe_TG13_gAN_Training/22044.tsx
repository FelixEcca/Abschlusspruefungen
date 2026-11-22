import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  ranks: number
  rank: number
  suit: number
}
export const exercise22044: Exercise<DATA> = {
  title: 'Oder-Ereignisse mit Überschneidung berechnen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    const ranks = rng.randomIntBetween(4, 9)
    return {
      ranks,
      rank: rng.randomIntBetween(1, ranks),
      suit: rng.randomIntBetween(0, 3),
    }
  },
  originalData: { ranks: 8, rank: 3, suit: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Ein Kartensatz besteht aus den vier Farben Kreuz, Pik, Herz und Karo.
          In jeder Farbe gibt es die Zahlen 1 bis {data.ranks}. Es wird eine
          Karte gezogen.
        </p>
        <p>
          Wie groß ist die Wahrscheinlichkeit, dass die Karte die Farbe{' '}
          {['Kreuz', 'Pik', 'Herz', 'Karo'][data.suit]} oder die Zahl{' '}
          {data.rank} zeigt?
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Insgesamt gibt es {4 * data.ranks} Karten. Zur gewählten Farbe gehören{' '}
          {data.ranks} Karten, zur gewählten Zahl vier Karten. Eine Karte gehört
          zu beiden Gruppen und wurde dabei doppelt gezählt.
        </p>
        <p>
          <InlineMath
            math={String.raw`P(A\cup B)=\frac{${data.ranks}+4-1}{${4 * data.ranks}}=${frac(data.ranks + 3, 4 * data.ranks)}`}
          />
          .
        </p>
        <p>Das „oder“ schließt die Karte ein, die beide Bedingungen erfüllt.</p>
      </>
    )
  },
}
