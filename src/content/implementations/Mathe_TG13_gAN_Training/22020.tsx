import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'

interface DATA {
  a: number
  k: number
}

export const exercise22020: Exercise<DATA> = {
  title: 'Stationäre Stellen durch Ausklammern bestimmen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 4),
      k: rng.randomItemFromArray([-2, -1, 1, 2]),
    }
  },
  originalData: { a: 2, k: 1 },
  task({ data }) {
    return (
      <>
        <p>
          Gegeben ist bereits die erste Ableitung. Bestimmen Sie nur die
          stationären Stellen, also die Lösungen von{' '}
          <InlineMath math="f'(x)=0" />.
        </p>
        <p>
          <InlineMath
            math={String.raw`f'(x)=${polynomial([
              [3 * data.k, 2],
              [-3 * data.k * data.a, 1],
            ])}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Klammern Sie den gemeinsamen Faktor aus.</p>
        <p>
          <InlineMath
            math={String.raw`${3 * data.k}x(x-${data.a})=0\quad\Rightarrow\quad x=0\ \text{oder}\ x=${data.a}`}
          />
        </p>
        <p>
          Das sind zunächst nur Kandidaten. Die Art der stationären Stellen ist
          damit noch nicht entschieden.
        </p>
      </>
    )
  },
}
