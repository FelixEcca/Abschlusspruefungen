// exercise9519.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  values: number[]
  labels: string[]
  target: number
  count: number
  result: number
}

export const exercise9519: Exercise<DATA> = {
  title: 'Prozent aus Diagramm',
  source: 'Prozentrechnen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const labels = ['A', 'B', 'C', 'D']
    const values = [
      rng.randomIntBetween(10, 40),
      rng.randomIntBetween(40, 70),
      rng.randomIntBetween(20, 60),
      rng.randomIntBetween(5, 30),
    ]
    const target = rng.randomIntBetween(0, 3)
    const count = rng.randomItemFromArray([40, 60, 80, 100, 120])
    const result = (count * values[target]) / 100

    return { labels, values, target, count, result }
  },

  originalData: {
    labels: ['A', 'B', 'C', 'D'],
    values: [25, 50, 15, 10],
    target: 0,
    count: 80,
    result: 20,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>In einer Gruppe mit {data.count} Personen zeigt das Diagramm die Anteile.</p>
        <svg viewBox="0 0 328 220">
          <line x1="45" y1="190" x2="305" y2="190" stroke="black" />
          <line x1="45" y1="30" x2="45" y2="190" stroke="black" />

          {[0, 20, 40, 60, 80, 100].map(v => (
            <g key={v}>
              <line
                x1="42"
                y1={190 - v * 1.5}
                x2="45"
                y2={190 - v * 1.5}
                stroke="black"
              />
              <text x="15" y={194 - v * 1.5} fontSize="10">
                {v}
              </text>
            </g>
          ))}

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
                {v}%
              </text>
              <text x={78 + i * 55} y="210" fontSize="12">
                {data.labels[i]}
              </text>
            </g>
          ))}
        </svg>

        <p>
          Berechnen Sie, wie viele Personen zur Gruppe {data.labels[data.target]}{' '}
          gehören.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${data.count}\\cdot\\frac{${
            data.values[data.target]
          }}{100}=${data.result}`}
        />
        <p>
          Es sind <b>{data.result} Personen</b>.
        </p>
      </>
    )
  },
}