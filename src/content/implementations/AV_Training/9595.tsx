// exercise9595.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  rows: number
  cols: number
  marked: number
  total: number
}

export const exercise9595: Exercise<DATA> = {
  title: 'Bruch aus markierten Teilen',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const rows = rng.randomItemFromArray([1, 2, 3])
    const cols = rng.randomItemFromArray([4, 5, 6])
    const total = rows * cols
    const marked = rng.randomIntBetween(1, total - 1)
    return { rows, cols, marked, total }
  },

  originalData: {
    rows: 2,
    cols: 4,
    marked: 3,
    total: 8,
  },

  constraint({ data }) {
    return data.marked > 0 && data.marked < data.total
  },

  task({ data }) {
    return (
      <>
        <p>Geben Sie den markierten Anteil als Bruch an.</p>

        <svg viewBox="0 0 328 150">
          {Array.from({ length: data.total }, (_, i) => {
            const row = Math.floor(i / data.cols)
            const col = i % data.cols
            return (
              <rect
                key={i}
                x={55 + col * 38}
                y={35 + row * 38}
                width="38"
                height="38"
                fill={i < data.marked ? '#999' : '#eee'}
                stroke="black"
              />
            )
          })}
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>{data.marked} Teile sind markiert.</p>
        <p>Insgesamt gibt es {data.total} Teile.</p>
        <InlineMath math={`\\frac{${data.marked}}{${data.total}}`} />
      </>
    )
  },
}