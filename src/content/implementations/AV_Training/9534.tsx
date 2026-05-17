// exercise9534.tsx
import { Exercise } from '@/data/types'

interface DATA {
  labels: string[]
  values: number[]
  mode: 'min' | 'max'
  answer: number
}

export const exercise9534: Exercise<DATA> = {
  title: 'Balkendiagramm ablesen',
  source: 'Diagramme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const labels = ['A', 'B', 'C', 'D']
    const values = [
      rng.randomIntBetween(10, 40),
      rng.randomIntBetween(30, 80),
      rng.randomIntBetween(20, 70),
      rng.randomIntBetween(5, 60),
    ]
    const mode = rng.randomItemFromArray(['min', 'max']) as 'min' | 'max'
    const answer =
      mode === 'min'
        ? values.indexOf(Math.min(...values))
        : values.indexOf(Math.max(...values))

    return { labels, values, mode, answer }
  },

  originalData: {
    labels: ['A', 'B', 'C', 'D'],
    values: [21, 86, 95, 96],
    mode: 'max',
    answer: 3,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <svg viewBox="0 0 328 220">
          <line x1="45" y1="190" x2="305" y2="190" stroke="black" />
          <line x1="45" y1="30" x2="45" y2="190" stroke="black" />

          {data.values.map((v, i) => (
            <g key={i}>
              <rect
                x={70 + i * 55}
                y={190 - v * 1.5}
                width="28"
                height={v * 1.5}
                fill="#999"
              />
              <text x={72 + i * 55} y={185 - v * 1.5} fontSize="11">
                {v}
              </text>
              <text x={78 + i * 55} y="210" fontSize="12">
                {data.labels[i]}
              </text>
            </g>
          ))}
        </svg>

        <p>
          Bestimmen Sie, welcher Wert am{' '}
          {data.mode === 'min' ? 'kleinsten' : 'größten'} ist.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Der {data.mode === 'min' ? 'kleinste' : 'größte'} Wert gehört zu{' '}
        <b>{data.labels[data.answer]}</b>: {data.values[data.answer]}.
      </p>
    )
  },
}