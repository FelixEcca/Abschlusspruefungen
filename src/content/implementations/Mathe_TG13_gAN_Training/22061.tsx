import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, vec, add, mul, dot, Vec } from './math'

interface DATA {
  a: Vec
  v: Vec
}
export const exercise22061: Exercise<DATA> = {
  title: 'Vektorlänge und Abstand zweier Punkte berechnen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    const v = rng.randomItemFromArray<Vec>([
      [1, 2, 2],
      [2, 3, 6],
      [4, 4, 7],
      [1, 2, 3],
    ])
    return {
      a: [
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
      ],
      v: mul(v, rng.randomItemFromArray([-2, -1, 1, 2])),
    }
  },
  originalData: { a: [1, -2, 3], v: [1, 2, 2] },
  task({ data }) {
    return (
      <>
        <p>
          Bestimmen Sie den Abstand zwischen{' '}
          <InlineMath math={String.raw`A(${coord(data.a)})`} /> und{' '}
          <InlineMath math={String.raw`B(${coord(add(data.a, data.v))})`} />.
          Lassen Sie nicht ganzzahlige Wurzeln exakt stehen.
        </p>
      </>
    )
  },
  solution({ data }) {
    const squared = dot(data.v, data.v),
      root = Math.sqrt(squared)
    return (
      <>
        <p>
          Zuerst bilden Sie den Verbindungsvektor{' '}
          <InlineMath math={String.raw`\overrightarrow{AB}=${vec(data.v)}`} />.
        </p>
        <p>
          <InlineMath
            math={String.raw`|AB|=\sqrt{(${data.v[0]})^2+(${data.v[1]})^2+(${data.v[2]})^2}=\sqrt{${squared}}${Number.isInteger(root) ? '=' + root : ''}`}
          />
          .
        </p>
        <p>
          Quadriert werden alle drei Komponenten. Ein Abstand ist niemals
          negativ.
        </p>
      </>
    )
  },
}
