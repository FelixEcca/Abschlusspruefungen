import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './diagrams'
import { frac } from './math'

interface DATA {
  a: number
  k: number
}

export const exercise21205: Exercise<DATA> = {
  title: 'Analysis: Exponentialfunktion und Aussagen zum Graphen',
  source: '2024 Teil A Aufgabe 5 – Auswahl I',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    a: rng.randomIntBetween(1, 6),
    k: rng.randomIntBetween(1, 4),
  }),
  originalData: { a: 1, k: 1 },
  intro: ({ data: d }) => (
    <>
      <p>
        Die Abbildung zeigt den Graphen G der in{' '}
        <InlineMath math={String.raw`\mathbb R`} /> definierten Funktion{' '}
        <InlineMath
          math={`f(x)=${d.a === 1 ? '' : d.a}e^{-${d.k === 1 ? '' : d.k}x}-${d.a === 1 ? '' : d.a}e^{-${2 * d.k}x}`}
        />
        . Er schneidet die x-Achse bei <InlineMath math="x_1=0" /> und hat einen
        Hochpunkt an der Stelle <InlineMath math="x_H" />.
      </p>
      <FunctionGraph
        fn={x => d.a * (Math.exp(-d.k * x) - Math.exp(-2 * d.k * x))}
        xMin={-0.5 / d.k}
        xMax={6 / d.k}
        yMin={-d.a / 10}
        yMax={0.3 * d.a}
        xStep={0.5 / d.k}
        yStep={d.a / 10}
      />
    </>
  ),
  tasks: [
    {
      points: 2,
      task: () => (
        <p>
          Weisen Sie rechnerisch nach, dass <InlineMath math="x_1" /> die
          einzige Nullstelle von f ist.
        </p>
      ),
      solution: ({ data: d }) => (
        <p>
          <InlineMath
            math={String.raw`f(x)=${d.a}e^{-${d.k}x}(1-e^{-${d.k}x})=0`}
          />
          . Der erste Faktor ist für alle x positiv. Somit gilt{' '}
          <InlineMath
            math={String.raw`e^{-${d.k}x}=1\iff -${d.k}x=0\iff x=0`}
          />
          .
        </p>
      ),
    },
    {
      points: 3,
      task: ({ data: d }) => (
        <>
          <p>
            Entscheiden Sie mithilfe der Abbildung, ob die Aussagen wahr oder
            falsch sind. Begründen Sie jeweils.
          </p>
          <p>
            (1){' '}
            <InlineMath
              math={String.raw`f''\left(${frac(1, 2 * d.k)}\right)>0`}
            />
          </p>
          <p>
            (2){' '}
            <InlineMath
              math={String.raw`\int_0^{${frac(2, d.k)}} f(x)\,dx<${frac(2, d.k)}\cdot f(x_H)`}
            />
          </p>
        </>
      ),
      solution: ({ data: d }) => (
        <>
          <p>
            (1) Falsch: Bei <InlineMath math={`x=${frac(1, 2 * d.k)}`} /> nimmt
            die Steigung ab; der Graph ist dort rechtsgekrümmt. Daher ist die
            zweite Ableitung negativ.
          </p>
          <p>
            (2) Wahr: Auf dem gesamten betrachteten Intervall liegt der Graph
            auf oder über der x-Achse und höchstens auf der Höhe des Hochpunkts.
            Das Integral ist der Flächeninhalt unter dem Graphen. Das Rechteck
            mit Breite <InlineMath math={frac(2, d.k)} /> und Höhe{' '}
            <InlineMath math="f(x_H)" /> ist echt größer, da der Graph nicht
            konstant auf dieser Höhe verläuft.
          </p>
        </>
      ),
    },
  ],
}
