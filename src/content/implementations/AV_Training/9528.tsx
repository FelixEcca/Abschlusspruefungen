// exercise9528.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'ml' | 'l'

interface DATA {
  value: number
  from: Unit
  to: Unit
  result: number
}

function factor(u: Unit) {
  return u === 'ml' ? 0.001 : 1
}

function unit(u: Unit) {
  return `\\mathrm{${u}}`
}

export const exercise9528: Exercise<DATA> = {
  title: 'Liter und Milliliter',
  source: 'Einheiten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pairs: [Unit, Unit][] = [
      ['ml', 'l'],
      ['l', 'ml'],
    ]
    const [from, to] = rng.randomItemFromArray(pairs)
    const value =
      from === 'l'
        ? rng.randomItemFromArray([0.25, 0.5, 1.2, 2.5, 7.8])
        : rng.randomItemFromArray([250, 500, 750, 1250, 2750])
    const result = Math.round((value * factor(from) / factor(to)) * 10000) / 10000

    return { value, from, to, result }
  },

  originalData: {
    value: 0.75,
    from: 'l',
    to: 'ml',
    result: 750,
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