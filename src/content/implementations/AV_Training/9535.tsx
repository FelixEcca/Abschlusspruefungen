// exercise9535.tsx
import { Exercise } from '@/data/types'

interface DATA {
  labels: string[]
  values: number[]
}

export const exercise9535: Exercise<DATA> = {
  title: 'Säulendiagramm zeichnen',
  source: 'Diagramme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    return {
      labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
      values: [
        rng.randomIntBetween(3, 9),
        rng.randomIntBetween(3, 9),
        rng.randomIntBetween(3, 9),
        rng.randomIntBetween(3, 9),
        rng.randomIntBetween(3, 9),
      ],
    }
  },

  originalData: {
    labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr'],
    values: [8, 6, 7, 5, 4],
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Zeichnen Sie ein Säulendiagramm zu den Werten:</p>
        <p>
          {data.labels.map((label, i) => (
            <span key={label}>
              {label}: {data.values[i]}
              <br />
            </span>
          ))}
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <svg viewBox="0 0 328 230">
        <line x1="45" y1="190" x2="305" y2="190" stroke="black" />
        <line x1="45" y1="30" x2="45" y2="190" stroke="black" />

        {[0, 2, 4, 6, 8, 10].map(v => (
          <g key={v}>
            <line
              x1="42"
              y1={190 - v * 16}
              x2="45"
              y2={190 - v * 16}
              stroke="black"
            />
            <text x="25" y={194 - v * 16} fontSize="10">
              {v}
            </text>
          </g>
        ))}

        {data.values.map((v, i) => (
          <g key={i}>
            <rect
              x={65 + i * 48}
              y={190 - v * 16}
              width="28"
              height={v * 16}
              fill="#888"
            />
            <text x={67 + i * 48} y={185 - v * 16} fontSize="10">
              {v}
            </text>
            <text x={68 + i * 48} y="208" fontSize="9">
              {data.labels[i]}
            </text>
          </g>
        ))}
      </svg>
    )
  },
}