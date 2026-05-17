// exercise9526.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'mm³' | 'cm³' | 'dm³' | 'm³'

interface DATA {
  value: number
  from: Unit
  to: Unit
  result: number
}

function factor(u: Unit) {
  if (u === 'mm³') return 0.000000001
  if (u === 'cm³') return 0.000001
  if (u === 'dm³') return 0.001
  return 1
}

function unit(u: Unit) {
  if (u === 'mm³') return '\\mathrm{mm}^3'
  if (u === 'cm³') return '\\mathrm{cm}^3'
  if (u === 'dm³') return '\\mathrm{dm}^3'
  return '\\mathrm{m}^3'
}

export const exercise9526: Exercise<DATA> = {
  title: 'Volumen umwandeln',
  source: 'Einheiten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pairs: [Unit, Unit][] = [
      ['mm³', 'cm³'],
      ['cm³', 'mm³'],
      ['cm³', 'dm³'],
      ['dm³', 'cm³'],
      ['dm³', 'm³'],
      ['m³', 'dm³'],
    ]
    const [from, to] = rng.randomItemFromArray(pairs)
    const value =
      from === 'm³'
        ? rng.randomItemFromArray([0.25, 0.5, 1.2, 2.5])
        : rng.randomItemFromArray([12, 25, 125, 500, 1200])
    const result =
      Math.round((value * factor(from) / factor(to)) * 1000000) / 1000000

    return { value, from, to, result }
  },

  originalData: {
    value: 562,
    from: 'cm³',
    to: 'dm³',
    result: 0.562,
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