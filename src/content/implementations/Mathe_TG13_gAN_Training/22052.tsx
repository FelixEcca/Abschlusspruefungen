import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, ProbabilityTree } from './math'

interface DATA {
  a: number
  lateA: number
  lateB: number
}
export const exercise22052: Exercise<DATA> = {
  title: 'Die Bedingung umkehren: Wer steckt hinter den verspäteten Sendungen?',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2, 8),
      lateA: rng.randomIntBetween(1, 5),
      lateB: rng.randomIntBetween(1, 5),
    }
  },
  originalData: { a: 4, lateA: 2, lateB: 3 },
  task({ data }) {
    return (
      <>
        <p>
          {data.a * 10} % der Sendungen werden mit A, die übrigen mit B
          verschickt. Bei A sind {data.lateA * 10} % verspätet, bei B{' '}
          {data.lateB * 10} %. Eine zufällig ausgewählte Sendung ist verspätet.
          Wie groß ist die Wahrscheinlichkeit, dass sie mit A verschickt wurde?
        </p>
        <ProbabilityTree
          first={[
            { label: 'A', probability: frac(data.a, 10) },
            { label: 'B', probability: frac(10 - data.a, 10) },
          ]}
          second={[
            [
              { label: 'V', probability: frac(data.lateA, 10) },
              { label: 'pünktlich', probability: frac(10 - data.lateA, 10) },
            ],
            [
              { label: 'V', probability: frac(data.lateB, 10) },
              { label: 'pünktlich', probability: frac(10 - data.lateB, 10) },
            ],
          ]}
        />
      </>
    )
  },
  solution({ data }) {
    const jointA = data.a * data.lateA,
      jointB = (10 - data.a) * data.lateB
    return (
      <>
        <p>
          Zuerst berechnet man die gemeinsamen Wahrscheinlichkeiten entlang der
          beiden verspäteten Pfade:
        </p>
        <p>
          <InlineMath
            math={String.raw`P(A\cap V)=${frac(jointA, 100)},\quad P(B\cap V)=${frac(jointB, 100)}`}
          />
          .
        </p>
        <p>Unter allen verspäteten Sendungen ist der Anteil von A:</p>
        <p>
          <InlineMath
            math={String.raw`P(A\mid V)=\frac{P(A\cap V)}{P(A\cap V)+P(B\cap V)}=${frac(jointA, jointA + jointB)}`}
          />
          .
        </p>
        <p>
          Das ist nicht dieselbe Fragestellung wie „Wie viele A-Sendungen sind
          verspätet?“.
        </p>
      </>
    )
  },
}
