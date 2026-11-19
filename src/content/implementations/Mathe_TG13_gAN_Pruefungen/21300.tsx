import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
interface DATA {
  a: number
  k?: number
  shift?: number
  offset?: number
}
export const exercise21300: Exercise<DATA> = {
  title: 'Analysis: Extrempunkte und Steigung im Wendepunkt',
  source: '2025 Pflichtteil Aufgabe 1',
  useCalculator: false,
  duration: 12,
  points: 5,
  generator: rng => ({
    a: rng.randomIntBetween(1, 4),
    k: rng.randomItemFromArray([-2, -1, 1, 2, 3]),
    shift: rng.randomIntBetween(-4, 4),
    offset: rng.randomIntBetween(-6, 6),
  }),
  originalData: { a: 1 },
  task: ({ data: d }) => (
    <>
      <p>
        Gegeben ist die Funktion{' '}
        <InlineMath
          math={String.raw`f(x)=${d.k ?? 1}\left[(x-(${d.shift ?? 0}))^3+${3 * d.a}(x-(${d.shift ?? 0}))^2\right]+(${d.offset ?? 0}),\quad x\in\mathbb R`}
        />
        . K ist ihr Graph.
      </p>
      <p>Berechnen Sie Hoch- und Tiefpunkt sowie die Steigung im Wendepunkt.</p>
    </>
  ),
  solution: ({ data: d }) => {
    const k = d.k ?? 1,
      h = d.shift ?? 0,
      c = d.offset ?? 0,
      p = [h - 2 * d.a, c + 4 * k * d.a ** 3],
      q = [h, c],
      high = k > 0 ? p : q,
      low = k > 0 ? q : p
    return (
      <>
        <p>
          Mit <InlineMath math={String.raw`u=x-(${h})`} /> gilt{' '}
          <InlineMath
            math={String.raw`f'(x)=${3 * k}u(u+${2 * d.a}),\quad f''(x)=${6 * k}(u+${d.a})`}
          />
          .
        </p>
        <p>
          Die stationären Stellen sind{' '}
          <InlineMath math={String.raw`x=${h - 2 * d.a},\quad x=${h}`} />. Die
          zweite Ableitung hat dort die Werte{' '}
          <InlineMath math={String.raw`${-6 * k * d.a},\quad ${6 * k * d.a}`} />
          : Ein negativer Wert kennzeichnet den Hochpunkt, ein positiver den
          Tiefpunkt.
        </p>
        <p>
          <InlineMath
            math={String.raw`H(${high[0]}\mid${high[1]}),\quad T(${low[0]}\mid${low[1]})`}
          />
          .
        </p>
        <p>
          Die zweite Ableitung ist null für{' '}
          <InlineMath math={String.raw`x_W=${h - d.a}`} />; die dritte Ableitung{' '}
          <InlineMath math={String.raw`f'''(x)=${6 * k}\ne0`} /> bestätigt den
          Wendepunkt. Die Steigung ist{' '}
          <InlineMath
            math={String.raw`m=f'(${h - d.a})=${-3 * k * d.a ** 2}`}
          />
          .
        </p>
      </>
    )
  },
}
