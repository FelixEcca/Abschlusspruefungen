import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { kmhToMps, mpsToKmh, unit } from './motion-helpers'

type Direction = 'kmhToMps' | 'mpsToKmh'

interface DATA {
  direction: Direction
  value: number
}

export const exercise8004: Exercise<DATA> = {
  title: 'Geschwindigkeitseinheiten umrechnen',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 7,
  points: 7,
  generator(rng) {
    const direction: Direction = rng.randomItemFromArray(['kmhToMps', 'mpsToKmh'])
    const value =
      direction === 'kmhToMps'
        ? rng.randomItemFromArray([18, 36, 54, 72, 90, 108])
        : rng.randomItemFromArray([5, 10, 12.5, 15, 20, 25])
    return { direction, value }
  },
  originalData: { direction: 'kmhToMps', value: 72 },
  task({ data }) {
    return (
      <p>
        Wandle <InlineMath math={`${pp(data.value)}\\,${data.direction === 'kmhToMps' ? unit('km/h') : unit('m/s')}`} /> in{' '}
        <InlineMath math={data.direction === 'kmhToMps' ? unit('m/s') : unit('km/h')} /> um.
      </p>
    )
  },
  solution({ data }) {
    if (data.direction === 'kmhToMps') {
      return (
        <p>
          Von <InlineMath math={unit('km/h')} /> nach <InlineMath math={unit('m/s')} /> teilt man durch 3,6:{' '}
          <InlineMath math={`${pp(data.value)}:3{,}6=${pp(kmhToMps(data.value))}\\,${unit('m/s')}`} />.
        </p>
      )
    }
    return (
      <p>
        Von <InlineMath math={unit('m/s')} /> nach <InlineMath math={unit('km/h')} /> multipliziert man mit 3,6:{' '}
        <InlineMath math={`${pp(data.value)}\\cdot 3{,}6=${pp(mpsToKmh(data.value))}\\,${unit('km/h')}`} />.
      </p>
    )
  },
}
