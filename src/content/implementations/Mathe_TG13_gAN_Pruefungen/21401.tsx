import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { BinomialChart } from './diagrams'
import { binomial, frac } from './math'
interface DATA {
  n: number
  mean?: number
  readAt?: number
  cumulativeAt?: number
  lower?: number
  upper?: number
}
function values(d: DATA) {
  const mean = d.mean ?? 4,
    prob = binomial(d.n, mean / d.n),
    v = d.readAt ?? 5,
    w = d.cumulativeAt ?? 2
  return {
    mean,
    prob,
    v,
    w,
    target: Math.round(prob[v] * 1000) / 1000,
    lower: d.lower ?? 0.15,
    upper: d.upper ?? 0.25,
  }
}
export const exercise21401: Exercise<DATA> = {
  title: 'Stochastik: Binomialverteilung im Diagramm',
  source: '2026 Pflichtteil Aufgabe 2',
  useCalculator: false,
  duration: 12,
  generator(rng) {
    const mean = rng.randomIntBetween(3, 8),
      n = rng.randomItemFromArray([2 * mean + 3, 3 * mean + 2, 4 * mean + 4]),
      prob = binomial(n, mean / n),
      candidates = [mean + 1, mean - 1, mean + 2, mean - 2, mean].filter(
        i =>
          prob.filter(p => Math.round(p * 1000) === Math.round(prob[i] * 1000))
            .length === 1,
      ),
      readAt = rng.randomItemFromArray(candidates),
      w = mean - rng.randomIntBetween(1, 2),
      sum = prob.slice(0, w + 1).reduce((a, b) => a + b, 0)
    return {
      n,
      mean,
      readAt,
      cumulativeAt: w,
      lower: Math.round((sum - prob[w] / 2) * 1000) / 1000,
      upper: Math.round((sum + prob[w + 1] / 2) * 1000) / 1000,
    }
  },
  originalData: { n: 20 },
  intro: ({ data: d }) => (
    <>
      <p>
        Die Abbildung zeigt Werte der Wahrscheinlichkeitsverteilung einer
        binomialverteilten Zufallsgröße X mit den Parametern{' '}
        <InlineMath math={String.raw`n=${d.n}`} /> und p. Der Erwartungswert ist
        ganzzahlig.
      </p>
      <BinomialChart probabilities={values(d).prob} />
    </>
  ),
  tasks: [
    {
      points: 2,
      task: () => <p>Ermitteln Sie den Wert von p.</p>,
      solution: ({ data: d }) => {
        const { mean } = values(d)
        return (
          <>
            <p>
              Der höchste Balken liegt bei k={mean}. Bei ganzzahligem
              Erwartungswert einer Binomialverteilung mit 0&lt;p&lt;1 liegt das
              eindeutige Maximum bei diesem Erwartungswert. Daher{' '}
              <InlineMath math={String.raw`np=${mean}`} />.
            </p>
            <p>
              <InlineMath
                math={String.raw`p=\frac{${mean}}{${d.n}}=${frac(mean, d.n)}`}
              />
              .
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      task: ({ data: d }) => {
        const { target, lower, upper } = values(d)
        return (
          <>
            <p>Geben Sie die natürlichen Zahlen v und w an, für die gilt:</p>
            <p>
              <InlineMath math={String.raw`P(X=v)\approx ${pp(target)}`} />
            </p>
            <p>
              <InlineMath
                math={String.raw`${pp(lower)}<P(X\le w)<${pp(upper)}`}
              />
            </p>
          </>
        )
      },
      solution: ({ data: d }) => {
        const { v, w, prob, target, lower, upper } = values(d),
          cdf = prob.slice(0, w + 1).reduce((a, b) => a + b, 0)
        return (
          <>
            <p>
              Am Balken k={v} liest man{' '}
              <InlineMath math={String.raw`P(X=${v})\approx ${pp(target)}`} />{' '}
              ab. Also v={v}.
            </p>
            <p>
              Die Balken von 0 bis {w} werden addiert:{' '}
              <InlineMath
                math={String.raw`P(X\le${w})\approx ${pp(Math.round(cdf * 1000) / 1000)}`}
              />
              . Dieser Wert liegt zwischen {pp(lower)} und {pp(upper)}, also w=
              {w}.
            </p>
            <p>
              Die Summe bis {w - 1} ist kleiner als die untere Grenze, die Summe
              bis {w + 1} größer als die obere Grenze. Daher ist w eindeutig.
            </p>
          </>
        )
      },
    },
  ],
}
