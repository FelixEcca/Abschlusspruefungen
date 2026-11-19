import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'
interface DATA {
  k: number
  r?: number
  h?: number
  c?: number
  left?: number
}
export const exercise21200: Exercise<DATA> = {
  title: 'Analysis: Extrempunkte und Nullstelle',
  source: '2024 Pflichtteil Aufgabe 1',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    k: rng.randomIntBetween(1, 5),
    r: rng.randomIntBetween(2, 6),
    h: rng.randomIntBetween(-4, 4),
    c: rng.randomIntBetween(1, 3),
    left: rng.randomIntBetween(2, 5),
  }),
  originalData: { k: 1 },
  intro: ({ data: d }) => (
    <p>
      Gegeben ist die in <InlineMath math={String.raw`\mathbb R`} /> definierte
      Funktion{' '}
      <InlineMath
        math={String.raw`f(x)=${d.k}\left[-\frac{2}{${3 * (d.r ?? 3)}}(x-(${d.h ?? 0}))^3+(x-(${d.h ?? 0}))^2-${d.c ?? 3}\right]`}
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
          h = d.h ?? 0,
          c = d.c ?? 3
        return (
          <>
            <p>
              Mit <InlineMath math={String.raw`u=x-(${h})`} /> erhält man{' '}
              <InlineMath
                math={String.raw`f'(x)=${d.k}\left[-\frac2{${r}}u^2+2u\right],\quad f''(x)=${d.k}\left[-\frac4{${r}}u+2\right]`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`f'(x)=0\iff u(2-\tfrac2{${r}}u)=0\iff u=0\ \text{oder}\ u=${r}`}
              />
              .
            </p>
            <p>
              Bei u=0 ist f″ positiv, bei u={r} negativ. Daher{' '}
              <InlineMath
                math={String.raw`T(${h}\mid${-d.k * c}),\quad H(${h + r}\mid${frac(d.k * (r * r - 3 * c), 3)})`}
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
          Begründen Sie, dass K die x-Achse im Intervall [
          {(d.h ?? 0) - (d.left ?? 2)}; {d.h ?? 0}] schneidet.
        </p>
      ),
      solution: ({ data: d }) => {
        const r = d.r ?? 3,
          h = d.h ?? 0,
          c = d.c ?? 3,
          l = d.left ?? 2
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`f(${h - l})=${frac(d.k * (2 * l ** 3 + 3 * r * (l * l - c)), 3 * r)}>0,\quad f(${h})=${-d.k * c}<0`}
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
