import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { vec, dot, matrix, Vec } from './math'

interface DATA {
  s: number
  point: Vec
}
export const exercise22084: Exercise<DATA> = {
  title: 'Mehrere LGS-Lösungen und eine nicht invertierbare Matrix erklären',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      s: rng.randomIntBetween(2, 4),
      point: [
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
        rng.randomIntBetween(-3, 3),
      ],
    }
  },
  originalData: { s: 2, point: [1, 1, 1] },
  task({ data }) {
    const rows: Vec[] = [
        [1, 1, 1],
        [1, data.s, data.s + 1],
        [2, data.s + 1, data.s + 2],
      ],
      b = rows.map(row => dot(row, data.point))
    return (
      <>
        <p>
          Prüfen Sie die angegebene Lösung x₀ von Ax = b. Bestimmen Sie die
          gesamte Lösungsmenge und begründen Sie, warum A keine Inverse hat.
        </p>
        <p>
          <InlineMath
            math={String.raw`A=${matrix(rows)},\quad b=${matrix(b.map(n => [n]))},\quad x_0=${vec(data.point)}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const rows: Vec[] = [
        [1, 1, 1],
        [1, data.s, data.s + 1],
        [2, data.s + 1, data.s + 2],
      ],
      b = rows.map(row => dot(row, data.point)),
      n: Vec = [1, -data.s, data.s - 1]
    return (
      <>
        <p>
          Einsetzen liefert{' '}
          <InlineMath math={String.raw`Ax_0=${vec(b as Vec)}=b`} />. Die dritte
          Zeile ist die Summe der ersten beiden und bringt keine neue Bedingung.
        </p>
        <p>
          Die ersten beiden Zeilen sind unabhängig, denn die linke
          2×2-Unterdeterminante ist{' '}
          <InlineMath math={String.raw`${data.s}-1=${data.s - 1}\ne0`} />. Es
          bleibt genau ein freier Parameter.
        </p>
        <p>
          Für <InlineMath math={String.raw`n=${vec(n)}`} /> ist{' '}
          <InlineMath math="An=0" />. Daher lautet die ganze Lösungsmenge
        </p>
        <p>
          <InlineMath
            math={String.raw`L=\left\{${vec(data.point)}+t${vec(n)}\mid t\in\mathbb R\right\}`}
          />
          .
        </p>
        <p>
          Es gibt unendlich viele Lösungen. Eine invertierbare Matrix würde für
          jedes b genau eine Lösung liefern; A ist daher nicht invertierbar.
        </p>
      </>
    )
  },
}
