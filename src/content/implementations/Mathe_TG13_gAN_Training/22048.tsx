import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, choose } from './math'

interface DATA {
  n: number
  k: number
  variant: number
}
export const exercise22048: Exercise<DATA> = {
  title: 'Höchstens, mindestens und Bereiche aus einer Tabelle berechnen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    const n = rng.randomIntBetween(4, 7)
    return {
      n,
      k: rng.randomIntBetween(1, n - 2),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { n: 5, k: 2, variant: 1 },
  task({ data }) {
    return (
      <>
        <p>
          X zählt die Treffer bei {data.n} unabhängigen Versuchen mit p = 1/2.
          Berechnen Sie{' '}
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`P(X\le${data.k})`
                : data.variant === 1
                  ? String.raw`P(X\ge${data.k})`
                  : String.raw`P(${data.k}\le X\le${data.k + 1})`
            }
          />{' '}
          aus der Tabelle.
        </p>
        <div className="overflow-x-auto">
          <table className="my-3 border-collapse text-sm">
            <tbody>
              <tr>
                <th className="border p-2">k</th>
                {Array.from({ length: data.n + 1 }, (_, k) => (
                  <td key={k} className="border p-2">
                    {k}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="border p-2">P(X=k)</th>
                {Array.from({ length: data.n + 1 }, (_, k) => (
                  <td key={k} className="border p-2">
                    <InlineMath math={frac(choose(data.n, k), 2 ** data.n)} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  },
  solution({ data }) {
    const from = data.variant === 0 ? 0 : data.k,
      to =
        data.variant === 0 ? data.k : data.variant === 1 ? data.n : data.k + 1,
      indices = Array.from({ length: to - from + 1 }, (_, i) => from + i),
      num = indices.reduce((s, k) => s + choose(data.n, k), 0)
    return (
      <>
        <p>
          Addieren Sie genau die Tabellenwerte für{' '}
          <InlineMath math={String.raw`k\in\{${indices.join(';')}\}`} />. Die
          Grenzen sind eingeschlossen.
        </p>
        <p>
          <InlineMath
            math={String.raw`P=${indices.map(k => String.raw`P(X=${k})`).join('+')}=${frac(num, 2 ** data.n)}`}
          />
          .
        </p>
        {data.variant === 1 && (
          <p>
            Alternativ ist{' '}
            <InlineMath
              math={String.raw`P(X\ge${data.k})=1-P(X\le${data.k - 1})`}
            />
            . Beim Gegenereignis liegt die obere Grenze um 1 niedriger.
          </p>
        )}
      </>
    )
  },
}
