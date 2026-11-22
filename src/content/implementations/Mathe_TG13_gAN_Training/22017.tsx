import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  k: number
  variant: number
}

export const exercise22017: Exercise<DATA> = {
  title: 'Sinus und Cosinus mit Vorzeichen ableiten',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomItemFromArray([-3, -2, -1, 1, 2, 3]),
      k: rng.randomIntBetween(1, 4),
      variant: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { a: 2, k: 3, variant: 1 },
  task({ data }) {
    return (
      <>
        <p>Leiten Sie ab. Denken Sie an die innere Ableitung.</p>
        <p>
          <InlineMath
            math={String.raw`f(x)=${data.a}${data.variant === 0 ? '\\sin' : '\\cos'}(${data.k}x)`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die Ableitung von sin ist cos, die Ableitung von cos ist −sin. Die
          innere Ableitung liefert den Faktor {data.k}.
        </p>
        <p>
          <InlineMath
            math={String.raw`f'(x)=${data.a * data.k * (data.variant === 0 ? 1 : -1)}${data.variant === 0 ? '\\cos' : '\\sin'}(${data.k}x)`}
          />
        </p>
      </>
    )
  },
}
