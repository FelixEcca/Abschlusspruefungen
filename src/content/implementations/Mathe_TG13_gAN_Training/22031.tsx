import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, polynomial } from './math'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise22031: Exercise<DATA> = {
  title: 'Eine Parabel aus Punkt und Tangentenbedingungen rekonstruieren',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      a: rng.randomItemFromArray([-2, -1, 1, 2]),
      b: rng.randomItemFromArray([-4, -2, 2, 4]),
      c: rng.randomIntBetween(-3, 4),
    }
  },
  originalData: { a: 1, b: 2, c: 3 },
  task({ data }) {
    return (
      <>
        <p>
          Bestimmen Sie die quadratische Funktion f. Ihr Graph geht durch{' '}
          <InlineMath math={String.raw`P(0\mid${data.c})`} />, hat bei{' '}
          <InlineMath math={String.raw`x=${frac(-data.b, 2 * data.a)}`} /> eine
          Extremstelle und schneidet die Gerade{' '}
          <InlineMath math={String.raw`y=${frac(-1, data.b)}x+(${data.c})`} />{' '}
          in P rechtwinklig.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Mit <InlineMath math="f(x)=Ax^2+Bx+C" /> folgt aus dem Punkt zunächst{' '}
          <InlineMath math={String.raw`C=${data.c}`} />. Senkrechte Tangenten
          erfüllen <InlineMath math="m_1m_2=-1" />. Daher ist
        </p>
        <p>
          <InlineMath
            math={String.raw`B\cdot(${frac(-1, data.b)})=-1\Rightarrow B=${data.b}`}
          />
          .
        </p>
        <p>
          Am Extrempunkt ist die erste Ableitung null:{' '}
          <InlineMath
            math={String.raw`2A\cdot(${frac(-data.b, 2 * data.a)})+${data.b}=0\Rightarrow A=${data.a}`}
          />
          .
        </p>
        <p>
          Damit lautet die Funktion{' '}
          <InlineMath
            math={String.raw`f(x)=${polynomial([
              [data.a, 2],
              [data.b, 1],
              [data.c, 0],
            ])}`}
          />
          . Wegen <InlineMath math={String.raw`f''(x)=${2 * data.a}\ne0`} />{' '}
          liegt tatsächlich ein Extrempunkt vor.
        </p>
      </>
    )
  },
}
