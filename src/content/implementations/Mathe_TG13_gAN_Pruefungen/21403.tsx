import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  a: number
  root: number
}

export const exercise21403: Exercise<DATA> = {
  title: 'Analysis: Nullstelle und Flächeninhalt einer Exponentialfunktion',
  source: '2026 Teil A Aufgabe 4 – Auswahl I',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    a: rng.randomIntBetween(1, 6),
    root: rng.randomIntBetween(1, 4),
  }),
  originalData: { a: 1, root: 1 },
  intro: ({ data: d }) => (
    <p>
      Gegeben ist die in <InlineMath math={String.raw`\mathbb R`} /> definierte
      Funktion{' '}
      <InlineMath
        math={String.raw`f(x)=${d.a === 1 ? '' : d.a}e^{-${d.root === 1 ? '' : frac(1, d.root)}x+1}-${d.a}`}
      />
      . Ihr Graph heißt K.
    </p>
  ),
  tasks: [
    {
      points: 2,
      task: () => <p>Berechnen Sie die Nullstelle von f.</p>,
      solution: ({ data: d }) => (
        <p>
          <InlineMath
            math={String.raw`${d.a}e^{-${frac(1, d.root)}x+1}-${d.a}=0\iff e^{-${frac(1, d.root)}x+1}=1\iff -${frac(1, d.root)}x+1=0\iff x=${d.root}`}
          />
          . Der Exponentialterm ist genau dann 1, wenn sein Exponent 0 ist.
        </p>
      ),
    },
    {
      points: 3,
      task: ({ data: d }) => (
        <p>
          K schließt mit der x- und y-Achse im Intervall{' '}
          <InlineMath math={`[0;${d.root}]`} /> eine Fläche ein. Zeigen Sie,
          dass ihr Inhalt zwischen 0 und {d.a * d.root} liegt.
        </p>
      ),
      solution: ({ data: d }) => (
        <>
          <p>
            Im Inneren dieses Intervalls ist der Exponent positiv und damit{' '}
            <InlineMath math="f(x)>0" />. Das Integral liefert daher den
            Flächeninhalt:
          </p>
          <p>
            <InlineMath
              math={String.raw`A=\int_0^{${d.root}}f(x)\,dx=\left[-${d.a * d.root}e^{-${frac(1, d.root)}x+1}-${d.a}x\right]_0^{${d.root}}=${d.a * d.root}(e-2)`}
            />
            .
          </p>
          <p>
            Mit <InlineMath math="2<e<3" /> folgt{' '}
            <InlineMath
              math={String.raw`0<e-2<1\quad\Rightarrow\quad0<A<${d.a * d.root}`}
            />
            .
          </p>
        </>
      ),
    },
  ],
}
