import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { matrix } from './math'

interface DATA {
  a: number[][]
  v: number[]
}
export const exercise22082: Exercise<DATA> = {
  title: 'Matrizenformate, Matrix-Vektor-Produkt und Linearität',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    const rows = rng.randomIntBetween(2, 3),
      cols = rng.randomIntBetween(2, 3)
    return {
      a: Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => rng.randomIntBetween(-3, 3)),
      ),
      v: Array.from({ length: cols }, () => rng.randomIntBetween(-2, 3)),
    }
  },
  originalData: {
    a: [
      [1, 2, 0],
      [-1, 1, 3],
    ],
    v: [1, 2, -1],
  },
  task({ data }) {
    return (
      <>
        <p>
          Geben Sie das Format von A und Av an und berechnen Sie Av. Ist A²
          definiert? Begründen Sie außerdem, warum für passende Vektoren u und v
          stets <InlineMath math="A(u+v)=Au+Av" /> gilt.
        </p>
        <p>
          <InlineMath
            math={String.raw`A=${matrix(data.a)},\quad v=${matrix(data.v.map(n => [n]))}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const rows = data.a.length,
      cols = data.a[0].length,
      result = data.a.map(row => row.reduce((s, n, i) => s + n * data.v[i], 0))
    return (
      <>
        <p>
          A hat {rows} Zeilen und {cols} Spalten. v ist ein {cols}×1-Vektor;
          damit hat Av das Format {rows}×1.
        </p>
        <p>
          <InlineMath math={String.raw`Av=${matrix(result.map(n => [n]))}`} />.
          Jede Ergebniszeile ist das Skalarprodukt der entsprechenden
          Matrixzeile mit v.
        </p>
        <p>
          {rows === cols ? (
            <>
              A² ist definiert und hat das Format {rows}×{rows}.
            </>
          ) : (
            'A² ist nicht definiert: Die innere Spaltenzahl der ersten Matrix stimmt nicht mit der Zeilenzahl der zweiten überein.'
          )}
        </p>
        <p>
          Die Linearitätsaussage stimmt, weil das Distributivgesetz in jeder
          Zeile{' '}
          <InlineMath
            math={String.raw`\sum_i a_i(u_i+v_i)=\sum_i a_iu_i+\sum_i a_iv_i`}
          />{' '}
          liefert.
        </p>
      </>
    )
  },
}
