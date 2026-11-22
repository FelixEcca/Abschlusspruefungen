import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'
import { StoppingTree } from './diagrams'

interface DATA {
  limit: number
  denominator: number
}
export const exercise22041: Exercise<DATA> = {
  title: 'Eine Abbruchregel vollständig beschreiben',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      limit: rng.randomIntBetween(2, 4),
      denominator: rng.randomItemFromArray([2, 3]),
    }
  },
  originalData: { limit: 3, denominator: 2 },
  task({ data }) {
    return (
      <>
        <p>
          Ein Versuch hat die Ergebnisse Treffer (T) mit Wahrscheinlichkeit{' '}
          <InlineMath math={frac(1, data.denominator)} /> und Niete (N). Die
          Versuche sind unabhängig. Beim ersten Treffer wird gestoppt,
          spätestens nach {data.limit} Versuchen.
        </p>
        <p>
          Geben Sie alle möglichen Ergebnisfolgen an und zeichnen Sie das
          vollständige Baumdiagramm.
        </p>
      </>
    )
  },
  solution({ data }) {
    const outcomes = Array.from(
      { length: data.limit },
      (_, i) => 'N'.repeat(i) + 'T',
    ).concat('N'.repeat(data.limit))
    return (
      <>
        <p>
          Nach einem Treffer darf kein weiterer Versuch mehr folgen. Nur nach
          einer Niete wird fortgesetzt.
        </p>
        <p>
          <InlineMath
            math={String.raw`\Omega=\{\text{${outcomes.join('},\\text{')}}\}`}
          />
        </p>
        <StoppingTree
          limit={data.limit}
          success={frac(1, data.denominator)}
          failure={frac(data.denominator - 1, data.denominator)}
        />
        <p>
          Auf der letzten Stufe endet der Ablauf sowohl bei T als auch bei N.
          Auch die Folge nur aus Nieten gehört zur Ergebnismenge.
        </p>
      </>
    )
  },
}
