import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './diagrams'

interface DATA {
  zero: number
  peak: number
  minimum: number
}

export const exercise21405: Exercise<DATA> = {
  title: 'Analysis: Aus dem Ableitungsgraphen auf f und F schließen',
  source: '2026 Teil A Aufgabe 5 – Auswahl I',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    zero: -rng.randomIntBetween(1, 4),
    peak: rng.randomIntBetween(1, 4),
    minimum: rng.randomIntBetween(1, 6),
  }),
  originalData: { zero: -3, peak: 4, minimum: 2 },
  intro: ({ data: d }) => (
    <>
      <p>
        Die Abbildung zeigt den Graphen der ersten Ableitungsfunktion f′ einer
        in <InlineMath math={String.raw`\mathbb R`} /> definierten Funktion f.
        Die einzige Nullstelle von f′ ist {d.zero}.
      </p>
      <FunctionGraph
        fn={x => d.peak * (x - d.zero) * Math.exp(1 - (x - d.zero))}
        xMin={d.zero - 2}
        xMax={d.zero + 7}
        yMin={-d.peak}
        yMax={d.peak + 1}
      />
    </>
  ),
  tasks: [
    {
      points: 2,
      task: ({ data: d }) => (
        <p>
          Begründen Sie, dass f für{' '}
          <InlineMath math={String.raw`x\le${d.zero}`} /> monoton fallend und
          für <InlineMath math={String.raw`x\ge${d.zero}`} /> monoton steigend
          ist.
        </p>
      ),
      solution: ({ data: d }) => (
        <p>
          Links von {d.zero} liegt der Graph von f′ unter der x-Achse: Dort ist{' '}
          <InlineMath math="f'(x)<0" />, also f fallend. Rechts davon liegt er
          oberhalb: Dort ist <InlineMath math="f'(x)>0" />, also f steigend. An
          der Übergangsstelle ist <InlineMath math={`f'(${d.zero})=0`} />. Damit
          gelten die angegebenen Monotonieaussagen einschließlich des
          Randpunkts.
        </p>
      ),
    },
    {
      points: 3,
      task: ({ data: d }) => (
        <>
          <p>
            Es gilt <InlineMath math={`f(${d.zero})=${d.minimum}`} />.
            Beurteilen Sie die Aussage:
          </p>
          <p>
            „Ist F eine Stammfunktion von f, dann besitzt der Graph von F keinen
            Extrempunkt.“
          </p>
        </>
      ),
      solution: ({ data: d }) => (
        <p>
          Die Aussage ist wahr. Aus dem Wechsel von fallend zu steigend folgt,
          dass f bei {d.zero} sein globales Minimum besitzt. Daher gilt überall{' '}
          <InlineMath math={String.raw`f(x)\ge f(${d.zero})=${d.minimum}>0`} />.
          Für jede Stammfunktion ist <InlineMath math="F'(x)=f(x)>0" />. F ist
          somit überall streng steigend und hat keinen Extrempunkt.
        </p>
      ),
    },
  ],
}
