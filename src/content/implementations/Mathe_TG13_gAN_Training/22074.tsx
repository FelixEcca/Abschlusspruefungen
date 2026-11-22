import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, vec, add, sub, mul, dot, Vec } from './math'

interface DATA {
  foot: Vec
  t: number
  k: number
  correct: number
}
export const exercise22074: Exercise<DATA> = {
  title: 'Einen vorgegebenen Lotfußpunkt überprüfen',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      foot: [
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
      ],
      t: rng.randomIntBetween(-2, 3),
      k: rng.randomIntBetween(1, 3),
      correct: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { foot: [1, 0, 2], t: 2, k: 1, correct: 1 },
  task({ data }) {
    const u: Vec = [2, -1, 2],
      normal = mul([2, 2, -1], data.k),
      a = add(data.foot, normal),
      support = sub(data.foot, mul(u, data.t)),
      proposed = add(data.foot, mul(u, data.correct ? 0 : 1))
    return (
      <>
        <p>
          Prüfen Sie die Behauptung: „F ist der Lotfußpunkt von A auf g.“ Falls
          sie stimmt, berechnen Sie den Abstand. Falls sie nicht stimmt,
          erklären Sie den Fehler.
        </p>
        <p>
          <InlineMath
            math={String.raw`A(${coord(a)}),\quad F(${coord(proposed)})`}
          />
        </p>
        <p>
          <InlineMath math={String.raw`g:\vec x=${vec(support)}+r${vec(u)}`} />
        </p>
      </>
    )
  },
  solution({ data }) {
    const u: Vec = [2, -1, 2],
      normal = mul([2, 2, -1], data.k),
      difference = data.correct ? normal : sub(normal, u)
    return (
      <>
        <p>
          Der vorgeschlagene Punkt liegt auf g, und zwar für r ={' '}
          {data.t + (data.correct ? 0 : 1)}. Für einen Lotfußpunkt muss
          zusätzlich der Verbindungsvektor zu A senkrecht auf g stehen.
        </p>
        <p>
          <InlineMath
            math={String.raw`\overrightarrow{FA}\cdot\vec u=${vec(difference)}\cdot${vec(u)}=${dot(difference, u)}`}
          />
          .
        </p>
        <p>
          {data.correct ? (
            <>
              Die Behauptung stimmt. Der Abstand ist{' '}
              <InlineMath
                math={String.raw`d(A,g)=|FA|=\sqrt{${9 * data.k ** 2}}=${3 * data.k}`}
              />
              .
            </>
          ) : (
            <>
              Das Skalarprodukt ist nicht null. F liegt zwar auf g, ist aber
              nicht der Lotfußpunkt. Seine Entfernung zu A ist deshalb nicht der
              Punkt-Geraden-Abstand.
            </>
          )}
        </p>
      </>
    )
  },
}
