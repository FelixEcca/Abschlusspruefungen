import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, choose, BinomialChart } from './math'

interface DATA {
  n: number
  mean: number
}
export const exercise22047: Exercise<DATA> = {
  title: 'Eine Binomialverteilung aus einem Säulendiagramm erschließen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    const n = rng.randomItemFromArray([10, 12, 16, 20])
    return { n, mean: rng.randomIntBetween(2, 7) }
  },
  originalData: { n: 20, mean: 4 },
  task({ data }) {
    const p = data.mean / data.n,
      values = Array.from(
        { length: data.n + 1 },
        (_, k) => choose(data.n, k) * p ** k * (1 - p) ** (data.n - k),
      )
    return (
      <>
        <p>
          X ist binomialverteilt mit n = {data.n} und unbekanntem p. Der
          Erwartungswert ist ganzzahlig. Bestimmen Sie ihn mithilfe der höchsten
          Säule und berechnen Sie p.
        </p>
        <BinomialChart probabilities={values} />
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die höchste Säule liegt bei{' '}
          <InlineMath math={String.raw`k=${data.mean}`} />. Bei einer
          Binomialverteilung mit ganzzahligem Erwartungswert und{' '}
          <InlineMath math="0<p<1" /> liegt das eindeutige Maximum genau dort.
        </p>
        <p>
          <InlineMath
            math={String.raw`E(X)=np=${data.mean}\quad\Rightarrow\quad p=\frac{${data.mean}}{${data.n}}=${frac(data.mean, data.n)}`}
          />
          .
        </p>
        <p>
          Die Höhe der Säule ist eine Wahrscheinlichkeit, nicht der
          Erwartungswert.
        </p>
      </>
    )
  },
}
