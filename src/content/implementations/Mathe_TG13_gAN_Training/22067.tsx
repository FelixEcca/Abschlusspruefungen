import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { vec, add, mul, Vec } from './math'

interface DATA {
  a: Vec
  scale: number
  t: number
  different: number
}
export const exercise22067: Exercise<DATA> = {
  title: 'Parallele und identische Geraden unterscheiden',
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
      scale: rng.randomItemFromArray([-3, -2, 2, 3]),
      t: rng.randomIntBetween(-2, 3),
      different: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { a: [1, 2, 0], scale: 2, t: 1, different: 1 },
  task({ data }) {
    const u: Vec = [1, 2, -1],
      b = add(add(data.a, mul(u, data.t)), [0, data.different, 0])
    return (
      <>
        <p>Untersuchen Sie, ob g und h identisch oder echt parallel sind.</p>
        <p>
          <InlineMath math={String.raw`g:\vec x=${vec(data.a)}+r${vec(u)}`} />
        </p>
        <p>
          <InlineMath
            math={String.raw`h:\vec x=${vec(b)}+s${vec(mul(u, data.scale))}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const u: Vec = [1, 2, -1],
      b = add(add(data.a, mul(u, data.t)), [0, data.different, 0])
    return (
      <>
        <p>
          Die Richtungsvektoren sind Vielfache:{' '}
          <InlineMath math={String.raw`\vec v=${data.scale}\vec u`} />. Die
          Geraden sind daher parallel oder identisch.
        </p>
        <p>
          Prüfen Sie den Stützpunkt von h auf g. Aus der ersten Koordinate folgt{' '}
          <InlineMath math={String.raw`r=${data.t}`} />. In der zweiten müsste
          dann {data.a[1] + 2 * data.t} stehen, tatsächlich steht dort {b[1]}.
        </p>
        <p>
          {data.different
            ? 'Der Stützpunkt liegt nicht auf g. Die Geraden sind echt parallel.'
            : 'Auch die dritte Koordinate stimmt. Der Stützpunkt liegt auf g und die Geraden sind identisch.'}
        </p>
      </>
    )
  },
}
