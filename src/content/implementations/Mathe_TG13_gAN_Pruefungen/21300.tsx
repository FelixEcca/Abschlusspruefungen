import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'
interface DATA {
  a: number
  k?: number
  offset?: number
}
export const exercise21300: Exercise<DATA> = {
  title: 'Analysis: Extrempunkte und Steigung im Wendepunkt',
  source: '2025 Pflichtteil Aufgabe 1',
  useCalculator: false,
  duration: 12,
  points: 5,
  generator: rng => ({
    a: rng.randomIntBetween(1, 3),
    k: rng.randomItemFromArray([-2, -1, 1, 2]),
    offset: rng.randomIntBetween(-3, 3),
  }),
  originalData: { a: 1 },
  task: ({ data: d }) => (
    <>
      <p>
        Gegeben ist die Funktion{' '}
        <InlineMath
          math={String.raw`f(x)=${polynomial([
            [d.k ?? 1, 3],
            [3 * (d.k ?? 1) * d.a, 2],
            [d.offset ?? 0, 0],
          ])},\quad x\in\mathbb R`}
        />
        . K ist ihr Graph.
      </p>
      <p>Berechnen Sie Hoch- und Tiefpunkt sowie die Steigung im Wendepunkt.</p>
    </>
  ),
  solution: ({ data: d }) => {
    const k = d.k ?? 1,
      c = d.offset ?? 0,
      p = [-2 * d.a, c + 4 * k * d.a ** 3],
      q = [0, c],
      high = k > 0 ? p : q,
      low = k > 0 ? q : p
    return (
      <>
        <p>
          Mit der Potenzregel erhält man{' '}
          <InlineMath
            math={String.raw`f'(x)=${polynomial([
              [3 * k, 2],
              [6 * k * d.a, 1],
            ])},\quad f''(x)=${polynomial([
              [6 * k, 1],
              [6 * k * d.a, 0],
            ])}`}
          />
          .
        </p>
        <p>
          Ausklammern in <InlineMath math="f'(x)=0" /> liefert{' '}
          <InlineMath math={String.raw`${3 * k}x(x+${2 * d.a})=0`} />. Nach dem
          Satz vom Nullprodukt sind die stationären Stellen{' '}
          <InlineMath math={String.raw`x=${-2 * d.a},\quad x=0`} />. Die zweite
          Ableitung hat dort die Werte{' '}
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
          <InlineMath math={String.raw`x_W=${-d.a}`} />; die dritte Ableitung{' '}
          <InlineMath math={String.raw`f'''(x)=${6 * k}\ne0`} /> bestätigt den
          Wendepunkt. Die Steigung ist{' '}
          <InlineMath math={String.raw`m=f'(${-d.a})=${-3 * k * d.a ** 2}`} />.
        </p>
      </>
    )
  },
}
