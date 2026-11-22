import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'

interface DATA {
  x: number
  a: number
  b: number
  c: number
}

export const exercise22004: Exercise<DATA> = {
  title: 'Lineare Gleichungen in kleinen Schritten lösen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      x: rng.randomIntBetween(-5, 6),
      a: rng.randomIntBetween(2, 6),
      b: rng.randomIntBetween(-6, 6),
      c: rng.randomIntBetween(0, 3),
    }
  },
  originalData: { x: 3, a: 2, b: 4, c: 1 },
  task({ data }) {
    const right = (data.a - data.c) * data.x + data.b
    return (
      <>
        <p>
          Lösen Sie die Gleichung. Kontrollieren Sie Ihr Ergebnis durch
          Einsetzen.
        </p>
        <p>
          <InlineMath
            math={String.raw`${polynomial([
              [data.a, 1],
              [data.b, 0],
            ])}=${polynomial([
              [data.c, 1],
              [right, 0],
            ])}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const right = (data.a - data.c) * data.x + data.b,
      coefficient = data.a - data.c
    return coefficient === 0 ? (
      <p>
        Beide Seiten sind identisch. Die Gleichung ist für jede reelle Zahl
        erfüllt: <InlineMath math={String.raw`L=\mathbb R`} />.
      </p>
    ) : (
      <>
        <p>
          Bringen Sie die x-Terme auf eine Seite und die Zahlen auf die andere
          Seite.
        </p>
        <p>
          <InlineMath
            math={String.raw`${coefficient}x=${right - data.b}\quad\Rightarrow\quad x=${data.x}`}
          />
        </p>
        <p>
          Probe: Beide Seiten haben nach Einsetzen den Wert{' '}
          {data.a * data.x + data.b}.
        </p>
      </>
    )
  },
}
