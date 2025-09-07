import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4401 {
  form: '(a+b)^2' | '(a-b)^2'
  t: 'x' | 'a' | 'y'
  k: number
}

export const exercise4401: Exercise<D4401> = {
  title: 'Binomische Formeln',
  source: 'Training',
  useCalculator: false,
  duration: 7,
  points: 3,
  generator(rng) {
    const form = rng.randomItemFromArray(['(a+b)^2', '(a-b)^2'] as const)
    const t = rng.randomItemFromArray(['x', 'a', 'y'] as const)
    const k = rng.randomIntBetween(2, 6) * (rng.randomBoolean() ? 1 : -1)
    return { form, t, k }
  },
  originalData: { form: '(a+b)^2', t: 'x', k: 3 },
  constraint() {
    return true
  },
  task({ data }) {
    const { form, t, k } = data
    const inner =
      form === '(a+b)^2'
        ? `${t} ${pp(k, 'merge_op')}`
        : `${t} ${pp(-k, 'merge_op')}`
    return (
      <>
        <p>Wende die binomische Formel an.</p>
        <BlockMath math={`(${inner})^2`} />
      </>
    )
  },
  solution({ data }) {
    const { form, t, k } = data
    const s = form === '(a+b)^2' ? +1 : -1
    // (t + s*k)^2 = t^2 + 2 s k t + k^2
    const mid = 2 * s * k
    const k2 = k * k
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',

          `\\Rightarrow (${t} ${pp(s * k, 'merge_op')})^2 &= ${t}^2 ${pp(mid, 'merge_op')}${t} ${pp(k2, 'merge_op')}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
