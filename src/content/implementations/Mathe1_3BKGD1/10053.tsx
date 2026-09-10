import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  expression: string
  degree: number
  leading: number
  constant: number
}

export const exercise10053: Exercise<DATA> = {
  title: 'Grad, Koeffizienten und konstantes Glied angeben',
  source: '3BKGD1',
  useCalculator: false,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { expression: '3x^4-2x^3+5x-7', degree: 4, leading: 3, constant: -7 },
      { expression: '-2x^5+4x^2-9', degree: 5, leading: -2, constant: -9 },
      { expression: 'x^3-6x^2+8', degree: 3, leading: 1, constant: 8 },
      { expression: '-x^6+3x^4-x+2', degree: 6, leading: -1, constant: 2 },
    ])
  },
  originalData: {
    expression: '3x^4-2x^3+5x-7',
    degree: 4,
    leading: 3,
    constant: -7,
  },
  task({ data }) {
    return (
      <p>
        Gegeben ist die Polynomfunktion{' '}
        <InlineMath math={`f(x)=${data.expression}`} />. Geben Sie den Grad,
        den Leitkoeffizienten und das konstante Glied an.
      </p>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Der Grad ist der höchste Exponent, der im Polynom vorkommt. Hier ist
          der höchste Exponent <InlineMath math={`${data.degree}`} />.
        </p>
        <p>
          Der Leitkoeffizient ist die Zahl vor der höchsten Potenz:{' '}
          <InlineMath math={`${data.leading}`} />.
        </p>
        <p>
          Das konstante Glied ist der Term ohne x:{' '}
          <InlineMath math={`${data.constant}`} />.
        </p>
      </>
    )
  },
}
