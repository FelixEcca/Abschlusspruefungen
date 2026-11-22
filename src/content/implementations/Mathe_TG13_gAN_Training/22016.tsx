import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'

interface DATA {
  a: number
  k: number
  c: number
}

export const exercise22016: Exercise<DATA> = {
  title: 'Exponentialfunktionen mit einfacher Kettenregel ableiten',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 4),
      k: rng.randomItemFromArray([-3, -2, -1, 1, 2, 3]),
      c: rng.randomIntBetween(-3, 3),
    }
  },
  originalData: { a: 2, k: -3, c: 1 },
  task({ data }) {
    return (
      <>
        <p>Bestimmen Sie die erste Ableitung.</p>
        <p>
          <InlineMath
            math={String.raw`f(x)=${data.a}e^{${polynomial([
              [data.k, 1],
              [data.c, 0],
            ])}}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die äußere Ableitung von eᵘ ist wieder eᵘ. Multiplizieren Sie mit der
          inneren Ableitung {data.k}.
        </p>
        <p>
          <InlineMath
            math={String.raw`f'(x)=${data.a}\cdot(${data.k})e^{${polynomial([
              [data.k, 1],
              [data.c, 0],
            ])}}=${data.a * data.k}e^{${polynomial([
              [data.k, 1],
              [data.c, 0],
            ])}}`}
          />
        </p>
      </>
    )
  },
}
