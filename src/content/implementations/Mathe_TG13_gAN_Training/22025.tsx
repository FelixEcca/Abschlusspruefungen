import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'

interface DATA {
  a: number
  x: number
  y: number
}

export const exercise22025: Exercise<DATA> = {
  title: 'Eine Stammfunktion durch einen Punkt bestimmen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 4),
      x: rng.randomIntBetween(-2, 3),
      y: rng.randomIntBetween(-5, 6),
    }
  },
  originalData: { a: 2, x: 1, y: 5 },
  task({ data }) {
    return (
      <>
        <p>
          Bestimmen Sie die Stammfunktion F von{' '}
          <InlineMath math={String.raw`f(x)=${2 * data.a}x`} />, deren Graph
          durch <InlineMath math={String.raw`P(${data.x}\mid${data.y})`} />{' '}
          geht.
        </p>
      </>
    )
  },
  solution({ data }) {
    const c = data.y - data.a * data.x ** 2
    return (
      <>
        <p>
          Zunächst gilt <InlineMath math={String.raw`F(x)=${data.a}x^2+C`} />.
          Der Punkt liefert die Bedingung
        </p>
        <p>
          <InlineMath
            math={String.raw`F(${data.x})=${data.a}\cdot(${data.x})^2+C=${data.y}\quad\Rightarrow\quad C=${c}`}
          />
          .
        </p>
        <p>
          Also{' '}
          <InlineMath
            math={String.raw`F(x)=${polynomial([
              [data.a, 2],
              [c, 0],
            ])}`}
          />
          . Ableiten und Einsetzen des Punkts bestätigen beide Bedingungen.
        </p>
      </>
    )
  },
}
