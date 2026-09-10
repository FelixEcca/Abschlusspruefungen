import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Case = 'two' | 'touch' | 'none'

interface DATA {
  variant: Case
}

function secondFunction(variant: Case) {
  if (variant === 'two') return '-x^2+4'
  if (variant === 'touch') return 'x^2'
  return 'x^2+3'
}

export const exercise10051: Exercise<DATA> = {
  title: 'Lagebeziehung zweier Kurven beschreiben',
  source: '3BKGD1',
  useCalculator: false,
  duration: 12,
  points: 12,
  generator(rng) {
    return { variant: rng.randomItemFromArray<Case>(['two', 'touch', 'none']) }
  },
  originalData: { variant: 'two' },
  task({ data }) {
    return (
      <p>
        Beschreiben Sie die Lagebeziehung der beiden Kurven{' '}
        <InlineMath math="f(x)=x^2" /> und{' '}
        <InlineMath math={`g(x)=${secondFunction(data.variant)}`} />.
      </p>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Schnittpunkte findet man, indem man die Funktionsterme gleichsetzt.
        </p>
        {data.variant === 'two' && (
          <>
            <p>
              <InlineMath math={`x^2=-x^2+4`} />
            </p>
            <p>
              <InlineMath math={`2x^2=4\\quad\\Rightarrow\\quad x^2=2`} />
            </p>
            <p>
              Es gibt zwei Lösungen. Die Kurven schneiden sich in zwei Punkten.
            </p>
          </>
        )}
        {data.variant === 'touch' && (
          <>
            <p>
              <InlineMath math={`x^2=x^2`} />
            </p>
            <p>
              Die Gleichung ist für alle x-Werte wahr. Die Kurven sind
              identisch.
            </p>
          </>
        )}
        {data.variant === 'none' && (
          <>
            <p>
              <InlineMath math={`x^2=x^2+3`} />
            </p>
            <p>
              <InlineMath math={`0=3`} /> ist ein Widerspruch. Die Kurven haben
              keinen Schnittpunkt.
            </p>
          </>
        )}
      </>
    )
  },
}
