import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
interface DATA {
  a: number
  k?: number
}
function peak(d: DATA) {
  return (d.k ?? 1) > 0 ? -d.a : d.a
}
export const exercise21400: Exercise<DATA> = {
  title: 'Analysis: Hochpunkt und Abstand der Extrempunkte',
  source: '2026 Pflichtteil Aufgabe 1',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    a: rng.randomIntBetween(1, 5),
    k: rng.randomItemFromArray([-3, -2, -1, 1, 2, 3, 4]),
  }),
  originalData: { a: 1 },
  intro: ({ data: d }) => (
    <p>
      Der Graph der in <InlineMath math={String.raw`\mathbb R`} /> definierten
      Funktion{' '}
      <InlineMath math={String.raw`f(x)=${d.k ?? 1}(x^3-${3 * d.a ** 2}x)`} />{' '}
      wird mit G bezeichnet.
    </p>
  ),
  tasks: [
    {
      points: 2,
      task: ({ data }) => (
        <p>
          Weisen Sie nach, dass G einen Hochpunkt mit der x-Koordinate{' '}
          <InlineMath math={String.raw`${peak(data)}`} /> hat.
        </p>
      ),
      solution: ({ data: d }) => {
        const k = d.k ?? 1,
          h = peak(d)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`f'(x)=${3 * k}(x^2-${d.a ** 2}),\quad f''(x)=${6 * k}x`}
              />
              .
            </p>
            <p>
              <InlineMath
                math={String.raw`f'(${h})=0,\quad f''(${h})=${6 * k * h}<0`}
              />
              . Beide Hochpunktbedingungen sind erfüllt.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: () => (
        <p>
          G ist symmetrisch zum Koordinatenursprung. Berechnen Sie den Abstand
          zwischen Hoch- und Tiefpunkt.
        </p>
      ),
      solution: ({ data: d }) => {
        const k = d.k ?? 1,
          x = peak(d),
          y = k * (x ** 3 - 3 * d.a ** 2 * x)
        return (
          <>
            <p>
              <InlineMath
                math={String.raw`H(${x}\mid${y}),\quad T(${-x}\mid${-y})`}
              />
              . T folgt durch Punktspiegelung am Ursprung.
            </p>
            <p>
              <InlineMath
                math={String.raw`d(H,T)=\sqrt{(${-2 * x})^2+(${-2 * y})^2}=\sqrt{${4 * x * x + 4 * y * y}}`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
