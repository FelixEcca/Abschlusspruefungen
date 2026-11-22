import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, vec, add, mul, Vec } from './math'

interface DATA {
  a: Vec
  v: Vec
  t: number
  error: number
}
export const exercise22065: Exercise<DATA> = {
  title:
    'Eine Gerade durch zwei Punkte aufstellen und eine Punktprobe durchführen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: [
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
      ],
      v: [
        rng.randomIntBetween(1, 3),
        rng.randomIntBetween(1, 3),
        rng.randomIntBetween(-3, -1),
      ],
      t: rng.randomIntBetween(-2, 3),
      error: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { a: [1, 0, -2], v: [2, 1, -1], t: 2, error: 0 },
  task({ data }) {
    const p = add(add(data.a, mul(data.v, data.t)), [0, 0, data.error])
    return (
      <>
        <p>
          Stellen Sie eine Gleichung der Geraden durch{' '}
          <InlineMath
            math={String.raw`A(${coord(data.a)}),\ B(${coord(add(data.a, data.v))})`}
          />{' '}
          auf. Prüfen Sie anschließend, ob{' '}
          <InlineMath math={String.raw`P(${coord(p)})`} /> auf ihr liegt.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Als Stützvektor eignet sich A, als Richtungsvektor{' '}
          <InlineMath math={String.raw`\overrightarrow{AB}=${vec(data.v)}`} />.
        </p>
        <p>
          <InlineMath
            math={String.raw`g:\vec x=${vec(data.a)}+t${vec(data.v)},\ t\in\mathbb R`}
          />
          .
        </p>
        <p>
          Die erste Koordinate der Punktprobe liefert t = {data.t}. Die zweite
          stimmt damit ebenfalls. Für die dritte erhält man{' '}
          {data.a[2] + data.t * data.v[2]}; der Punkt hat dort{' '}
          {data.a[2] + data.t * data.v[2] + data.error}.{' '}
          {data.error === 0 ? 'P liegt auf g.' : 'P liegt daher nicht auf g.'}
        </p>
      </>
    )
  },
}
