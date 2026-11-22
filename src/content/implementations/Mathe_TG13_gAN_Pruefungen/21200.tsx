import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, polynomial } from './math'
interface DATA {
  k: number
  r?: number
  c?: number
  left?: number
}
export const exercise21200: Exercise<DATA> = {
  title: 'Analysis: Extrempunkte und Nullstelle',
  source: '2024 Pflichtteil Aufgabe 1',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    k: rng.randomIntBetween(1, 3),
    r: rng.randomIntBetween(2, 4),
    c: rng.randomIntBetween(1, 3),
    left: rng.randomIntBetween(2, 4),
  }),
  originalData: { k: 1 },
  intro: ({ data: d }) => (
    <p>
      Gegeben ist die in <InlineMath math={String.raw`\mathbb R`} /> definierte
      Funktion{' '}
      <InlineMath
        math={String.raw`f(x)=${polynomial([
          [frac(-2 * d.k, 3 * (d.r ?? 3)), 3],
          [d.k, 2],
          [-d.k * (d.c ?? 3), 0],
        ])}`}
      />
      . Ihr Graph heißt K.
    </p>
  ),
  tasks: [
    {
      points: 3,
      task: () => (
        <p>Bestimmen Sie die Koordinaten und die Art der Extrempunkte.</p>
      ),
      solution: ({ data: d }) => {
        const r = d.r ?? 3,
          c = d.c ?? 3
        return (
          <>
            <p>
              Mit der Potenzregel erhält man{' '}
              <InlineMath
                math={String.raw`f'(x)=${polynomial([
                  [frac(-2 * d.k, r), 2],
                  [2 * d.k, 1],
                ])},\quad f''(x)=${polynomial([
                  [frac(-4 * d.k, r), 1],
                  [2 * d.k, 0],
                ])}`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`f'(x)=0\iff ${2 * d.k}x\left(1-\frac{x}{${r}}\right)=0\iff x=0\ \text{oder}\ x=${r}`}
              />
              .
            </p>
            <p>
              Bei x=0 ist f″ positiv, bei x={r} negativ. Daher{' '}
              <InlineMath
                math={String.raw`T(0\mid${-d.k * c}),\quad H(${r}\mid${frac(d.k * (r * r - 3 * c), 3)})`}
              />
              .
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      task: ({ data: d }) => (
        <p>
          Begründen Sie, dass K die x-Achse im Intervall [{-(d.left ?? 2)}; 0]
          schneidet.
        </p>
      ),
      solution: ({ data: d }) => {
        const r = d.r ?? 3,
          c = d.c ?? 3,
          l = d.left ?? 2
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`f(${-l})=${frac(d.k * (2 * l ** 3 + 3 * r * (l * l - c)), 3 * r)}>0,\quad f(0)=${-d.k * c}<0`}
              />
              .
            </p>
            <p>
              Die Polynomfunktion ist stetig und wechselt im Intervall ihr
              Vorzeichen. Somit liegt dazwischen mindestens ein Schnitt mit der
              x-Achse.
            </p>
          </>
        )
      },
    },
  ],
}
