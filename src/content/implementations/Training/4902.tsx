import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface D4902 {
  exp: 'dice' | 'urn'
  success: number
  total: number
}

export const exercise4902: Exercise<D4902> = {
  title: 'Laplace-Wahrscheinlichkeit',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 2,
  generator(rng) {
    if (rng.randomBoolean()) {
      // Würfel: gerade / größer als k / etc.
      const total = 6
      const pick = rng.randomItemFromArray(['gerade', '>3', 'prim'] as const)
      const success = pick === 'gerade' ? 3 : pick === '>3' ? 3 : 3 // 2,4,6 / 4,5,6 / 2,3,5
      return { exp: 'dice', success, total }
    }
    // Urne
    const reds = rng.randomIntBetween(1, 5)
    const blues = rng.randomIntBetween(1, 5)
    const total = reds + blues
    const success = reds
    return { exp: 'urn', success, total }
  },
  originalData: { exp: 'dice', success: 3, total: 6 },
  constraint() {
    return true
  },
  task({ data }) {
    const { exp, success, total } = data
    return (
      <>
        {exp === 'dice' ? (
          <p>
            Gegeben ist ein fairer Würfel. Wie groß ist die Wahrscheinlichkeit
            für ein Ereignis mit <InlineMath math={String(success)} /> günstigen
            Ergebnissen?
          </p>
        ) : (
          <p>
            In einer Urne liegen rote und blaue Kugeln. Wie groß ist{' '}
            <InlineMath math="P(\mathrm{rot})" />, wenn es{' '}
            <InlineMath math={String(success)} /> rote und{' '}
            <InlineMath math={String(total - success)} /> blaue Kugeln gibt?
          </p>
        )}
      </>
    )
  },
  solution({ data }) {
    const { success, total } = data
    const p = success / total
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          'P&=\\frac{günstig}{gesamt}=\\frac{' +
            success +
            '}{' +
            total +
            '}=' +
            pp(p),
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
