import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  n: number
  k: number
  variant: number
}
export const exercise22042: Exercise<DATA> = {
  title: 'Genau, mindestens und höchstens übersetzen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    const n = rng.randomIntBetween(4, 9)
    return {
      n,
      k: rng.randomIntBetween(1, n - 1),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { n: 6, k: 2, variant: 1 },
  task({ data }) {
    return (
      <>
        <p>
          X zählt die Treffer in {data.n} Versuchen. Schreiben Sie das Ereignis
          „{['genau', 'höchstens', 'mindestens'][data.variant]} {data.k}{' '}
          Treffer“ mit X und einem mathematischen Zeichen. Formulieren Sie
          außerdem das Gegenereignis.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <InlineMath
            math={String.raw`A:\ X${['=', '\\le', '\\ge'][data.variant]}${data.k}`}
          />
          .
        </p>
        <p>
          Das Gegenereignis ist{' '}
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`\overline A:\ X\ne${data.k}`
                : data.variant === 1
                  ? String.raw`\overline A:\ X\ge${data.k + 1}`
                  : String.raw`\overline A:\ X\le${data.k - 1}`
            }
          />
          .
        </p>
        <p>
          {data.variant === 0
            ? 'Nicht genau k bedeutet weniger oder mehr als k.'
            : data.variant === 1
              ? 'Nicht höchstens k bedeutet mindestens k + 1.'
              : 'Nicht mindestens k bedeutet höchstens k − 1.'}
        </p>
      </>
    )
  },
}
