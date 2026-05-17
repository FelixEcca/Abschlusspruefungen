// exercise9529.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'ct' | '€'

interface DATA {
  value: number
  from: Unit
  to: Unit
  result: number
}

function factor(u: Unit) {
  return u === 'ct' ? 0.01 : 1
}

function unit(u: Unit) {
  return u === '€' ? '€' : '\\mathrm{ct}'
}

export const exercise9529: Exercise<DATA> = {
  title: 'Cent und Euro',
  source: 'Einheiten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pairs: [Unit, Unit][] = [
      ['ct', '€'],
      ['€', 'ct'],
    ]
    const [from, to] = rng.randomItemFromArray(pairs)
    const value =
      from === '€'
        ? rng.randomItemFromArray([1.25, 2.5, 8.75, 12, 24.5])
        : rng.randomItemFromArray([125, 250, 875, 1200, 3500])
    const result = Math.round((value * factor(from) / factor(to)) * 100) / 100

    return { value, from, to, result }
  },

  originalData: {
    value: 875,
    from: 'ct',
    to: '€',
    result: 8.75,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <p>
        Wandeln Sie um:{' '}
        <InlineMath math={`${pp(data.value)}\\,${unit(data.from)}`} /> in{' '}
        <InlineMath math={unit(data.to)} />.
      </p>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`${pp(data.value)}\\,${unit(data.from)}=${pp(
          data.result,
        )}\\,${unit(data.to)}`}
      />
    )
  },
}