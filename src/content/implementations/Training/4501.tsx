import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4501 {
  base: number
  rate: number
  up: boolean
}

export const exercise4501: Exercise<D4501> = {
  title: 'Prozentuale Zu-/Abnahme',
  source: 'Training',
  useCalculator: false,
  duration: 7,
  points: 3,
  generator(rng) {
    const base = rng.randomIntBetween(50, 500)
    const rate = rng.randomIntBetween(5, 30)
    const up = rng.randomBoolean()
    return { base, rate, up }
  },
  originalData: { base: 120, rate: 10, up: true },
  constraint() {
    return true
  },
  task({ data }) {
    const { base, rate, up } = data
    return (
      <p>
        Der Preis beträgt zunächst {base} €. Danach {up ? 'steigt' : 'fällt'} er
        um {rate}%. Gib den neuen Preis an.
      </p>
    )
  },
  solution({ data }) {
    const { base, rate, up } = data
    const factor = up ? 1 + rate / 100 : 1 - rate / 100
    const result = base * factor
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          `\\text{neuer Preis} &= \\text{alt} \\cdot (1 ${up ? '+' : '-'} \\tfrac{p}{100})\\\\`,
          `&= ${base}\\cdot\\Big(1 ${pp(up ? +rate / 100 : -rate / 100, 'merge_op')}\\Big) = ${pp(result)}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
