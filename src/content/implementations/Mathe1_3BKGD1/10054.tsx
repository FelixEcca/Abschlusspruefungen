import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  expression: string
  degree: number
  leading: number
}

export const exercise10054: Exercise<DATA> = {
  title: 'Globalverhalten einer Polynomfunktion beschreiben',
  source: '3BKGD1',
  useCalculator: false,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { expression: '2x^4-3x^2+1', degree: 4, leading: 2 },
      { expression: '-3x^4+x^3-5', degree: 4, leading: -3 },
      { expression: 'x^5-4x+2', degree: 5, leading: 1 },
      { expression: '-2x^3+6x^2-1', degree: 3, leading: -2 },
    ])
  },
  originalData: { expression: '2x^4-3x^2+1', degree: 4, leading: 2 },
  task({ data }) {
    return (
      <p>
        Beschreiben Sie das Globalverhalten der Polynomfunktion{' '}
        <InlineMath math={`f(x)=${data.expression}`} />.
      </p>
    )
  },
  solution({ data }) {
    const even = data.degree % 2 === 0
    const positive = data.leading > 0
    return (
      <>
        <p>
          Für das Globalverhalten betrachtet man nur den führenden Term:{' '}
          <InlineMath math={`${data.leading}x^${data.degree}`} />.
        </p>
        <p>
          Der Grad ist {even ? 'gerade' : 'ungerade'} und der Leitkoeffizient
          ist {positive ? 'positiv' : 'negativ'}.
        </p>
        {even && positive && (
          <p>
            Für <InlineMath math="x\\to -\\infty" /> gilt{' '}
            <InlineMath math="f(x)\\to +\\infty" /> und für{' '}
            <InlineMath math="x\\to +\\infty" /> gilt{' '}
            <InlineMath math="f(x)\\to +\\infty" />.
          </p>
        )}
        {even && !positive && (
          <p>
            Für <InlineMath math="x\\to -\\infty" /> gilt{' '}
            <InlineMath math="f(x)\\to -\\infty" /> und für{' '}
            <InlineMath math="x\\to +\\infty" /> gilt{' '}
            <InlineMath math="f(x)\\to -\\infty" />.
          </p>
        )}
        {!even && positive && (
          <p>
            Für <InlineMath math="x\\to -\\infty" /> gilt{' '}
            <InlineMath math="f(x)\\to -\\infty" /> und für{' '}
            <InlineMath math="x\\to +\\infty" /> gilt{' '}
            <InlineMath math="f(x)\\to +\\infty" />.
          </p>
        )}
        {!even && !positive && (
          <p>
            Für <InlineMath math="x\\to -\\infty" /> gilt{' '}
            <InlineMath math="f(x)\\to +\\infty" /> und für{' '}
            <InlineMath math="x\\to +\\infty" /> gilt{' '}
            <InlineMath math="f(x)\\to -\\infty" />.
          </p>
        )}
      </>
    )
  },
}
