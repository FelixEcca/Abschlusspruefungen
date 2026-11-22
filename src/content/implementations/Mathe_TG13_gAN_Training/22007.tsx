import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  a: number
  b: number
  variant: number
}

export const exercise22007: Exercise<DATA> = {
  title: 'Einfache Gleichungen mit e lösen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 4),
      b: rng.randomIntBetween(2, 6),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { a: 2, b: 3, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          Lösen Sie die Gleichung exakt. Eine Dezimalnäherung ist nicht nötig.
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`e^{${data.a}x}=1`
                : data.variant === 1
                  ? String.raw`e^{${data.a}x}=e^{${data.b}}`
                  : String.raw`e^{${data.a}x}=${data.b}`
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
          {data.variant < 2
            ? 'Die Exponentialfunktion ist eindeutig: Gleiche Funktionswerte bedeuten gleiche Exponenten. Dabei gilt e⁰ = 1.'
            : 'Wenden Sie auf beiden Seiten den natürlichen Logarithmus an. Es gilt ln(eᵘ) = u.'}
        </p>
        <p>
          <InlineMath
            math={
              data.variant === 0
                ? String.raw`${data.a}x=0\Rightarrow x=0`
                : data.variant === 1
                  ? String.raw`${data.a}x=${data.b}\Rightarrow x=${frac(data.b, data.a)}`
                  : String.raw`${data.a}x=\ln(${data.b})\Rightarrow x=\frac{\ln(${data.b})}{${data.a}}`
            }
          />
        </p>
      </>
    )
  },
}
