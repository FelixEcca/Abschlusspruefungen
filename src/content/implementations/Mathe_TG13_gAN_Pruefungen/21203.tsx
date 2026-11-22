import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './diagrams'
import { frac } from './math'

interface DATA {
  length: number
  height: number
}

export const exercise21203: Exercise<DATA> = {
  title: 'Analysis: Polynomgraph skizzieren und trigonometrische Nullstellen',
  source: '2024 Teil A Aufgabe 4 – Auswahl I',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    length: rng.randomIntBetween(2, 6),
    height: rng.randomIntBetween(1, 5),
  }),
  originalData: { length: 4, height: 2 },
  intro: ({ data }) => (
    <p>
      Gegeben ist eine im Intervall{' '}
      <InlineMath math={`[-${data.length};${data.length}]`} /> definierte
      Polynomfunktion f vom Grad 3. Ihr Graph ist punktsymmetrisch zum Ursprung
      und schneidet die x-Achse im Punkt{' '}
      <InlineMath math={String.raw`N(${data.length}\mid0)`} />. Der Wertebereich
      ist <InlineMath math={`W_f=[-${data.height};${data.height}]`} />.
    </p>
  ),
  tasks: [
    {
      points: 3,
      task: () => (
        <p>
          Skizzieren Sie den Graphen von f, wenn bekannt ist, dass{' '}
          <InlineMath math="f'(0)<0" /> gilt.
        </p>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Die Punktsymmetrie liefert die weiteren Nullstellen{' '}
            <InlineMath math={`x=-${data.length}`} /> und{' '}
            <InlineMath math="x=0" />. Am Ursprung fällt der Graph. Links davon
            liegt ein Hochpunkt mit der Höhe {data.height}, rechts davon ein
            Tiefpunkt mit der Höhe −{data.height}. Die folgende Skizze erfüllt
            alle Vorgaben.
          </p>
          <FunctionGraph
            fn={x =>
              1.5 *
              Math.sqrt(3) *
              data.height *
              ((x / data.length) ** 3 - x / data.length)
            }
            xMin={-data.length}
            xMax={data.length}
            yMin={-data.height - 1}
            yMax={data.height + 1}
          />
        </>
      ),
    },
    {
      points: 2,
      task: ({ data }) => (
        <p>
          Bestimmen Sie eine Funktionsgleichung einer trigonometrischen Funktion
          g, sodass f und g im Intervall{' '}
          <InlineMath math={`[-${data.length};${data.length}]`} /> dieselben
          Nullstellen haben.
        </p>
      ),
      solution: ({ data }) => (
        <p>
          Zum Beispiel{' '}
          <InlineMath
            math={String.raw`g(x)=\sin\left(${frac(1, data.length)}\pi x\right)`}
          />
          . Die Nullstellen erfüllen{' '}
          <InlineMath
            math={String.raw`\frac{\pi x}{${data.length}}=k\pi,\quad k\in\mathbb Z`}
          />
          , also <InlineMath math={`x=${data.length}k`} />. Im gegebenen
          Intervall sind das genau{' '}
          <InlineMath math={String.raw`-${data.length},\ 0,\ ${data.length}`} />
          . Eine Übereinstimmung der Funktionswerte außerhalb der Nullstellen
          ist nicht verlangt.
        </p>
      ),
    },
  ],
}
