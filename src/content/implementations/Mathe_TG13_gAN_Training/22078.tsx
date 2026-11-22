import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  x: number
  y: number
  z: number
  k: number
}
export const exercise22078: Exercise<DATA> = {
  title: 'Ein eindeutig lösbares Gleichungssystem zu einer Wunschlösung bauen',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return {
      x: rng.randomIntBetween(-3, 5),
      y: rng.randomIntBetween(-3, 5),
      z: rng.randomIntBetween(-3, 5),
      k: rng.randomIntBetween(1, 3),
    }
  },
  originalData: { x: 2, y: 3, z: 1, k: 1 },
  task({ data }) {
    return (
      <>
        <p>
          Konstruieren Sie ein lineares Gleichungssystem mit drei Gleichungen
          und der eindeutigen Lösung{' '}
          <InlineMath
            math={String.raw`(x_1;x_2;x_3)=(${data.x};${data.y};${data.z})`}
          />
          . Alle Variablenkoeffizienten müssen ungleich null sein.
        </p>
        <p>
          Begründen Sie nicht nur, dass das Tripel passt, sondern auch, warum
          keine andere Lösung möglich ist.
        </p>
      </>
    )
  },
  solution({ data }) {
    const sum = data.k * data.x + data.y + data.z
    return (
      <>
        <p>Eine mögliche Konstruktion ist:</p>
        <p>
          <InlineMath
            math={String.raw`\begin{aligned}${data.k}x_1+x_2+x_3&=${sum}\\${data.k}x_1+2x_2+x_3&=${sum + data.y}\\${data.k}x_1+x_2+2x_3&=${sum + data.z}\end{aligned}`}
          />
        </p>
        <p>
          Die zweite minus die erste Gleichung liefert{' '}
          <InlineMath math={String.raw`x_2=${data.y}`} />, die dritte minus die
          erste <InlineMath math={String.raw`x_3=${data.z}`} />. Die erste
          bestimmt danach eindeutig{' '}
          <InlineMath math={String.raw`x_1=${data.x}`} />.
        </p>
        <p>
          Alle Variablenkoeffizienten sind ungleich null. Andere Konstruktionen
          sind genauso richtig, wenn Lösung und Eindeutigkeit nachgewiesen
          werden.
        </p>
      </>
    )
  },
}
