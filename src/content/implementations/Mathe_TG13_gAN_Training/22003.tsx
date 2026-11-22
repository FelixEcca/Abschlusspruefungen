import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'

interface DATA {
  a: number
  b: number
  c: number
  variant: number
}

export const exercise22003: Exercise<DATA> = {
  title: 'Terme vereinfachen und typische Fehler korrigieren',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2, 6),
      b: rng.randomIntBetween(1, 5),
      c: rng.randomIntBetween(1, 5),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { a: 3, b: 2, c: 4, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          {data.variant === 2
            ? 'In der folgenden Rechnung steckt ein Fehler. Erklären und korrigieren Sie ihn.'
            : 'Vereinfachen Sie den Term.'}
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`${data.a}x+${data.b}x-${data.c}`
                : data.variant === 1
                  ? String.raw`${data.a}(x-${data.b})+${data.c}x`
                  : String.raw`-${data.a}(x-${data.b})=-${data.a}x-${data.a * data.b}`
            }
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          {data.variant === 0
            ? 'Nur die gleichartigen Terme mit x werden zusammengefasst.'
            : data.variant === 1
              ? 'Multiplizieren Sie jeden Summanden in der Klammer mit dem Faktor und fassen Sie danach zusammen.'
              : 'Minus mal Minus ergibt Plus. Der konstante Summand muss positiv sein.'}
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? polynomial([
                    [data.a + data.b, 1],
                    [-data.c, 0],
                  ])
                : data.variant === 1
                  ? polynomial([
                      [data.a + data.c, 1],
                      [-data.a * data.b, 0],
                    ])
                  : polynomial([
                      [-data.a, 1],
                      [data.a * data.b, 0],
                    ])
            }
          />
        </p>
      </>
    )
  },
}
