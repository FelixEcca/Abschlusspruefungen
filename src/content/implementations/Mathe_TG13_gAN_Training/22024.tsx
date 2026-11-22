import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, polynomial } from './math'

interface DATA {
  a: number
  n: number
  b: number
  variant: number
}

export const exercise22024: Exercise<DATA> = {
  title: 'Einfache Stammfunktionen finden',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 5),
      n: rng.randomIntBetween(1, 4),
      b: rng.randomIntBetween(-4, 4),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { a: 2, n: 2, b: 3, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Geben Sie eine Stammfunktion F an. Kontrollieren Sie durch Ableiten.
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`f(x)=${polynomial([
                    [data.a, data.n],
                    [data.b, 0],
                  ])}`
                : String.raw`f(x)=${data.a}e^x+(${data.b})`
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
          {data.variant === 0
            ? 'Erhöhen Sie beim Potenzterm den Exponenten um 1 und teilen Sie durch den neuen Exponenten. Eine Konstante wird zu einem linearen Term.'
            : 'Eine Stammfunktion von eˣ ist eˣ. Die Konstante wird zu einem linearen Term.'}
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`F(x)=${polynomial([
                    [frac(data.a, data.n + 1), data.n + 1],
                    [data.b, 1],
                  ])}+C`
                : String.raw`F(x)=${data.a}e^x+(${data.b})x+C`
            }
          />
          .
        </p>
        <p>
          Beim Ableiten fällt C weg; es entsteht wieder genau f(x). Jede Wahl
          von C ergibt eine Stammfunktion.
        </p>
      </>
    )
  },
}
