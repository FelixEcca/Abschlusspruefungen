import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, vec, add, mul, Vec } from './math'
import { Triangle } from './diagrams'

interface DATA {
  a: Vec
  k: number
  variant: number
}
export const exercise22070: Exercise<DATA> = {
  title: 'Einen rechten Winkel oder ein Rechteck mit Vektoren nachweisen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: [
        rng.randomIntBetween(-2, 2),
        rng.randomIntBetween(-2, 2),
        rng.randomIntBetween(-2, 2),
      ],
      k: rng.randomIntBetween(1, 3),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { a: [1, 0, 2], k: 1, variant: 0 },
  task({ data }) {
    const u = mul([1, 2, 2], data.k),
      v = mul([2, -2, 1], data.k),
      b = add(data.a, u),
      c = add(data.a, v),
      d = add(b, v)
    return (
      <>
        <p>
          {data.variant === 0
            ? 'Zeigen Sie, dass das Dreieck ABC bei A rechtwinklig ist.'
            : 'Zeigen Sie, dass das Viereck ABDC ein Rechteck ist.'}
        </p>
        <p>
          <InlineMath
            math={String.raw`A(${coord(data.a)}),\ B(${coord(b)}),\ C(${coord(c)})${data.variant ? String.raw`,\ D(${coord(d)})` : ''}`}
          />
        </p>
        <Triangle a="A" b="B" c="C" extra={data.variant === 1} fourth="D" />
      </>
    )
  },
  solution({ data }) {
    const u = mul([1, 2, 2], data.k),
      v = mul([2, -2, 1], data.k)
    return (
      <>
        <p>
          <InlineMath
            math={String.raw`\overrightarrow{AB}=${vec(u)},\quad\overrightarrow{AC}=${vec(v)},\quad\overrightarrow{AB}\cdot\overrightarrow{AC}=0`}
          />
          .
        </p>
        <p>
          Beide Vektoren sind ungleich null, der Winkel bei A ist daher ein
          rechter Winkel.
        </p>
        {data.variant === 1 && (
          <p>
            Zusätzlich gilt{' '}
            <InlineMath
              math={String.raw`\overrightarrow{CD}=\overrightarrow{AB},\quad\overrightarrow{BD}=\overrightarrow{AC}`}
            />
            . Gegenüberliegende Seiten sind parallel und gleich lang. Das
            Parallelogramm ABDC mit rechtem Winkel ist ein Rechteck.
          </p>
        )}
      </>
    )
  },
}
