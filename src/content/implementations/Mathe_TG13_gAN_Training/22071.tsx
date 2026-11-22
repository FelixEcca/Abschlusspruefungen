import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, vec, add, sub, mul, Vec } from './math'
import { Triangle } from './diagrams'

interface DATA {
  a: Vec
  k: number
}
export const exercise22071: Exercise<DATA> = {
  title: 'Ein Parallelogramm ergänzen, das kein Rechteck ist',
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
      k: rng.randomIntBetween(1, 3),
    }
  },
  originalData: { a: [1, 0, 0], k: 1 },
  task({ data }) {
    const b = add(data.a, mul([3, 0, 0], data.k)),
      c = add(data.a, mul([0, 2, 0], data.k))
    return (
      <>
        <p>
          Die Punkte{' '}
          <InlineMath
            math={String.raw`A(${coord(data.a)}),\ B(${coord(b)}),\ C(${coord(c)})`}
          />{' '}
          bilden ein rechtwinkliges Dreieck. Finden Sie einen vierten Punkt P,
          sodass die vier Punkte ein Parallelogramm, aber kein Rechteck bilden.
          Geben Sie die Reihenfolge der Eckpunkte an.
        </p>
        <Triangle a="A" b="B" c="C" />
      </>
    )
  },
  solution({ data }) {
    const b = add(data.a, mul([3, 0, 0], data.k)),
      c = add(data.a, mul([0, 2, 0], data.k)),
      p = sub(add(data.a, b), c)
    return (
      <>
        <p>
          Wählen Sie beispielsweise{' '}
          <InlineMath math={String.raw`P=A+B-C=${vec(p)}`} />. Die Reihenfolge
          lautet A–C–B–P.
        </p>
        <p>
          Die Diagonalen AB und CP haben denselben Mittelpunkt, weil{' '}
          <InlineMath math="A+B=C+P" /> gilt. Daher ist ACBP ein Parallelogramm.
        </p>
        <p>
          Die benachbarten Seiten bei A sind{' '}
          <InlineMath
            math={String.raw`\overrightarrow{AC}=${vec(sub(c, data.a))},\quad\overrightarrow{AP}=${vec(sub(p, data.a))}`}
          />
          . Ihr Skalarprodukt ist{' '}
          <InlineMath math={String.raw`${-4 * data.k ** 2}\ne0`} />. Das
          Parallelogramm ist also kein Rechteck.
        </p>
        <p>
          Die naheliegende Wahl B + C − A ergäbe dagegen gerade ein Rechteck und
          erfüllt die Zusatzbedingung nicht.
        </p>
      </>
    )
  },
}
