import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise22022: Exercise<DATA> = {
  title: 'Wendestelle und Wendepunktsteigung schrittweise berechnen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomItemFromArray([-2, -1, 1, 2]),
      b: rng.randomIntBetween(-3, 3),
      c: rng.randomIntBetween(-4, 4),
    }
  },
  originalData: { a: 1, b: 2, c: -3 },
  task({ data }) {
    return (
      <>
        <p>
          Bestimmen Sie zuerst die Wendestelle. Berechnen Sie anschließend die
          Steigung des Graphen an dieser Stelle.
        </p>
        <p>
          <InlineMath
            math={String.raw`f(x)=${polynomial([
              [data.a, 3],
              [-3 * data.a * data.b, 2],
              [data.c, 1],
            ])}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <InlineMath
            math={String.raw`f'(x)=${polynomial([
              [3 * data.a, 2],
              [-6 * data.a * data.b, 1],
              [data.c, 0],
            ])},\quad f''(x)=${polynomial([
              [6 * data.a, 1],
              [-6 * data.a * data.b, 0],
            ])}`}
          />
          .
        </p>
        <p>
          Aus <InlineMath math={String.raw`f''(x)=0`} /> folgt{' '}
          <InlineMath math={String.raw`x_W=${data.b}`} />. Wegen{' '}
          <InlineMath math={String.raw`f'''(x)=${6 * data.a}\ne0`} /> ist dies
          tatsächlich eine Wendestelle.
        </p>
        <p>
          Die Steigung erhalten Sie durch Einsetzen in die erste, nicht die
          zweite Ableitung:{' '}
          <InlineMath
            math={String.raw`m=f'(${data.b})=${data.c - 3 * data.a * data.b ** 2}`}
          />
          .
        </p>
      </>
    )
  },
}
