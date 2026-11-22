import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, vec, dot, Vec } from './math'

interface DATA {
  a: Vec
  normal: Vec
  through: Vec
}
export const exercise22076: Exercise<DATA> = {
  title: 'Eine Ebene orthogonal zu einer Geraden angeben',
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
      normal: [
        rng.randomIntBetween(1, 3),
        rng.randomIntBetween(-3, -1),
        rng.randomIntBetween(1, 3),
      ],
      through: [
        rng.randomIntBetween(-2, 2),
        rng.randomIntBetween(-2, 2),
        rng.randomIntBetween(-2, 2),
      ],
    }
  },
  originalData: { a: [1, 2, 0], normal: [1, -2, 3], through: [0, 0, 0] },
  task({ data }) {
    return (
      <>
        <p>
          Geben Sie eine Koordinatengleichung einer Ebene E an, die durch{' '}
          <InlineMath math={String.raw`P(${coord(data.through)})`} /> geht und
          orthogonal zur Geraden g ist.
        </p>
        <p>
          <InlineMath
            math={String.raw`g:\vec x=${vec(data.a)}+t${vec(data.normal)}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Der Richtungsvektor der Geraden wird als Normalenvektor der Ebene
          verwendet. Mit dem vorgegebenen Punkt gilt
        </p>
        <p>
          <InlineMath
            math={String.raw`E:\ ${data.normal[0]}x_1+(${data.normal[1]})x_2+${data.normal[2]}x_3=${dot(data.normal, data.through)}`}
          />
          .
        </p>
        <p>
          Das Einsetzen von P bestätigt die Lage des Punkts. Der Stützpunkt der
          Geraden muss nicht in dieser Ebene liegen.
        </p>
      </>
    )
  },
}
