import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  factor: number
}

export const exercise22005: Exercise<DATA> = {
  title: 'Den Satz vom Nullprodukt verstehen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    const a = rng.randomIntBetween(-5, 0)
    return {
      a,
      b: rng.randomIntBetween(1, 5),
      factor: rng.randomIntBetween(1, 4),
    }
  },
  originalData: { a: -2, b: 3, factor: 2 },
  task({ data }) {
    return (
      <>
        <p>
          Lösen Sie die Gleichung. Ein Produkt ist genau dann null, wenn
          mindestens ein Faktor null ist.
        </p>
        <p>
          <InlineMath
            math={String.raw`${data.factor}(x-(${data.a}))(x-${data.b})=0`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Der Zahlenfaktor ist nicht null. Betrachten Sie die beiden Klammern
          einzeln.
        </p>
        <p>
          <InlineMath
            math={String.raw`x-(${data.a})=0\quad\text{oder}\quad x-${data.b}=0`}
          />
        </p>
        <p>
          <InlineMath math={String.raw`L=\{${data.a};${data.b}\}`} />
        </p>
        <p>
          Bei jeder dieser Zahlen wird eine Klammer und damit das gesamte
          Produkt null.
        </p>
      </>
    )
  },
}
