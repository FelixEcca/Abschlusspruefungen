// exercise9527.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'mg' | 'g' | 'kg'

interface DATA {
  value: number
  from: Unit
  to: Unit
  result: number
}

function factor(u: Unit) {
  if (u === 'mg') return 0.001
  if (u === 'g') return 1
  return 1000
}

function unit(u: Unit) {
  return `\\mathrm{${u}}`
}

export const exercise9527: Exercise<DATA> = {
  title: 'Gewicht umwandeln',
  source: 'Einheiten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pairs: [Unit, Unit][] = [
      ['mg', 'g'],
      ['g', 'mg'],
      ['g', 'kg'],
      ['kg', 'g'],
    ]
    const [from, to] = rng.randomItemFromArray(pairs)
    const value =
      from === 'kg'
        ? rng.randomItemFromArray([0.5, 1.2, 2.5, 7.5])
        : rng.randomItemFromArray([125, 250, 725, 1200, 3500])
    const result =
      Math.round((value * factor(from) / factor(to)) * 1000000) / 1000000

    return { value, from, to, result }
  },

  originalData: {
    value: 725,
    from: 'g',
    to: 'kg',
    result: 0.725,
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