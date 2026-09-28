import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'

type LengthUnit = 'mm' | 'cm' | 'dm' | 'm' | 'km'

interface DATA {
  value: number
  from: LengthUnit
  to: LengthUnit
  result: number
}

const factors: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  dm: 0.1,
  m: 1,
  km: 1000,
}

export const exercise8005: Exercise<DATA> = {
  title: 'Längeneinheiten umrechnen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 7,
  points: 7,
  generator(rng) {
    const pairs: [LengthUnit, LengthUnit][] = [
      ['mm', 'cm'],
      ['cm', 'm'],
      ['dm', 'm'],
      ['m', 'cm'],
      ['m', 'km'],
      ['km', 'm'],
      ['cm', 'mm'],
      ['m', 'mm'],
    ]
    const [from, to] = rng.randomItemFromArray(pairs)
    const value = from === 'km' ? rng.randomItemFromArray([0.25, 1.2, 3.5]) : rng.randomItemFromArray([12, 45, 80, 125, 360])
    const result = round2((value * factors[from]) / factors[to])
    return { value, from, to, result }
  },
  originalData: { value: 125, from: 'cm', to: 'm', result: 1.25 },
  task({ data }) {
    return (
      <p>
        Wandle <InlineMath math={`${pp(data.value)}\\,${unit(data.from)}`} /> in <InlineMath math={unit(data.to)} /> um.
      </p>
    )
  },
  solution({ data }) {
    return (
      <p>
        Zuerst in Meter denken und dann in die Zieleinheit umrechnen:{' '}
        <InlineMath math={`${pp(data.value)}\\,${unit(data.from)}=${pp(data.result)}\\,${unit(data.to)}`} />.
      </p>
    )
  },
}
