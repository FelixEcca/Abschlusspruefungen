import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

const suits = ['Kreuz', 'Pik', 'Herz', 'Karo']
const ranks = ['Ass', 'König', 'Dame', 'Bube', '10', '9', '8', '7']
interface DATA {
  suit: number
  rank: number
  jokers: number
}

export const exercise21305: Exercise<DATA> = {
  title: 'Stochastik: Kartenspiel und unbekannte Jokerzahl',
  source: '2025 Teil A Aufgabe 5 – Auswahl I',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    suit: rng.randomIntBetween(0, 3),
    rank: rng.randomIntBetween(0, 7),
    jokers: rng.randomIntBetween(1, 5),
  }),
  originalData: { suit: 3, rank: 2, jokers: 2 },
  intro: () => (
    <p>
      Ein Kartenspiel hat 32 Karten. In jeder der vier Farben Kreuz, Pik, Herz
      und Karo gibt es jeweils ein Ass, einen König, eine Dame, einen Buben,
      eine 10, eine 9, eine 8 und eine 7.
    </p>
  ),
  tasks: [
    {
      points: 2,
      task: ({ data: d }) => (
        <p>
          Eine Karte wird gezogen. Bestimmen Sie die Wahrscheinlichkeit, dass
          die Karte die Farbe {suits[d.suit]} oder den Rang {ranks[d.rank]}{' '}
          zeigt.
        </p>
      ),
      solution: ({ data: d }) => (
        <p>
          Es gibt acht Karten der Farbe {suits[d.suit]} und vier Karten des
          Rangs {ranks[d.rank]}. Eine Karte gehört zu beiden Gruppen. Sie darf
          nicht doppelt gezählt werden:{' '}
          <InlineMath math={String.raw`P=\frac{8+4-1}{32}=\frac{11}{32}`} />.
        </p>
      ),
    },
    {
      points: 3,
      task: ({ data: d }) => {
        const fraction = frac(12, (4 + d.jokers) * (3 + d.jokers)),
          den = (4 + d.jokers) * (3 + d.jokers)
        let gcd = 1
        for (let i = 1; i <= 12; i++) if (12 % i === 0 && den % i === 0) gcd = i
        const p = 12 / gcd,
          q = den / gcd
        return (
          <>
            <p>
              Ein anderes Spiel besteht nur aus vier Assen und n Jokern. Es wird
              zweimal ohne Zurücklegen gezogen. Die Wahrscheinlichkeit für zwei
              Asse beträgt <InlineMath math={fraction} />.
            </p>
            <p>
              Zeigen Sie, dass die Berechnung der Jokerzahl auf die Gleichung{' '}
              <InlineMath math={`${p}n^2+${7 * p}n+${12 * p}=${12 * q}`} />{' '}
              führt.
            </p>
          </>
        )
      },
      solution: ({ data: d }) => (
        <>
          <p>
            Im ersten Zug liegen vier Asse unter <InlineMath math="n+4" />{' '}
            Karten. Nach einem gezogenen Ass sind es drei Asse unter{' '}
            <InlineMath math="n+3" /> Karten. Somit gilt
          </p>
          <p>
            <InlineMath
              math={String.raw`\frac4{n+4}\cdot\frac3{n+3}=${frac(12, (4 + d.jokers) * (3 + d.jokers))}`}
            />
            .
          </p>
          <p>
            Man multipliziert mit <InlineMath math="(n+4)(n+3)" /> und dem
            Nenner des gekürzten Wahrscheinlichkeitsbruchs. Anschließend wird{' '}
            <InlineMath math="(n+4)(n+3)=n^2+7n+12" /> ausmultipliziert. So
            ergibt sich genau die angegebene Gleichung.
          </p>
        </>
      ),
    },
  ],
}
