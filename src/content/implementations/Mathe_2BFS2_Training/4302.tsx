import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type Slot = 'p' | 'q' | 'rhs' // was wird als Kästchen gezeigt

interface D4302 {
  p: number
  q: number
  slot: Slot
}

export const exercise4302: Exercise<D4302> = {
  title: 'Quadratische Ergänzung',
  source: 'Training',
  useCalculator: false,
  duration: 7,
  points: 3,
  generator(rng) {
    const p = rng.randomIntBetween(-10, 10)
    const q = rng.randomIntBetween(-10, 10)
    const slot = rng.randomItemFromArray<Slot>(['p', 'q', 'rhs'])
    return { p, q, slot }
  },
  originalData: { p: -6, q: -5, slot: 'rhs' },
  constraint() {
    return true
  },
  task({ data }) {
    const { p, q, slot } = data
    // x^2 + p x + q = (x + p/2)^2  - (p/2)^2 + q
    const h = p / 2
    const rhs = `(x ${pp(h, 'merge_op')})^{2} ${pp(q - h * h, 'merge_op')}`
    return (
      <>
        <p>
          Ergänze {slot === 'rhs' && 'zu einem Binom'}, so dass die Gleichheit
          stimmt.
        </p>
        {slot === 'p' && (
          <BlockMath
            math={`x^2 + \\boxed{\\;\\;\\;}x ${pp(q, 'merge_op')} = (x ${pp(h, 'merge_op')})^{2} ${pp(q - h * h, 'merge_op')}`}
          />
        )}
        {slot === 'q' && (
          <BlockMath
            math={`x^2 ${pp(p, 'merge_op')}x + \\boxed{\\;\\;\\;} = (x ${pp(h, 'merge_op')})^{2} ${pp(q - h * h, 'merge_op')}`}
          />
        )}
        {slot === 'rhs' && (
          <BlockMath
            math={`x^2 ${pp(p, 'merge_op')}x ${pp(q, 'merge_op')} = \\boxed{\\;\\;\\;\\;\\;\\;\\;\\;\\;}`}
          />
        )}
      </>
    )
  },
  solution({ data }) {
    const { p, q, slot } = data
    const h = p / 2
    const rhs = `(x ${pp(h, 'merge_op')})^{2} ${pp(q - h * h, 'merge_op')}`
    if (slot === 'p') {
      return <BlockMath math={`\\boxed{\\;${pp(p)}\\;}`} />
    } else if (slot === 'q') {
      return <BlockMath math={`\\boxed{\\;${pp(q)}\\;}`} />
    } else {
      return <BlockMath math={rhs} />
    }
  },
}
