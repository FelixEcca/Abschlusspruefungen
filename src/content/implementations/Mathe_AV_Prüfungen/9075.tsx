import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  colors: string[]
  parts: number[]
  totalLiter: number
  partsTotal: number
  liters: number[]
}

export const exercise9075: Exercise<DATA> = {
  title: 'Teil 2: Farben mischen',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const colors = ['weiß', 'gelb', 'blau', 'rot']
    const parts = rng.randomItemFromArray([
      [16, 6, 1, 5],
      [12, 4, 1, 3],
      [10, 5, 1, 4],
    ])
    const totalLiter = rng.randomItemFromArray([30, 40, 42, 56])
    const partsTotal = parts.reduce((a, b) => a + b, 0)
    const liters = parts.map(part => (part * totalLiter) / partsTotal)
    return { colors, parts, totalLiter, partsTotal, liters }
  },

  originalData: {
    colors: ['weiß', 'gelb', 'blau', 'rot'],
    parts: [16, 6, 1, 5],
    totalLiter: 42,
    partsTotal: 28,
    liters: [24, 9, 1.5, 7.5],
  },

  constraint({ data }) {
    return data.partsTotal > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Sie sollen die Farben {data.colors.join(', ')} im Verhältnis{' '}
          {data.parts.join(' : ')} mischen. Sie brauchen {data.totalLiter}{' '}
          Liter.
        </p>
        <p>
          Berechnen Sie, wie viel Liter der verschiedenen Farben Sie brauchen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Ein Teil sind {pp(data.totalLiter / data.partsTotal)} l.{' '}
        {data.colors
          .map((color, index) => `${color}: ${pp(data.liters[index])} l`)
          .join(', ')}
        .
      </p>
    )
  },
}
