import { Exercise } from '@/data/types'

interface DATA {
  values: number[]
  labels: string[]
}

export const exercise9058: Exercise<DATA> = {
  title: 'Teil 1: Zahlengerade',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const values = rng.shuffleArray([
      rng.randomItemFromArray([80, 120, 150]),
      rng.randomItemFromArray([200, 240, 300]),
      rng.randomItemFromArray([40, 70, 90]),
      -rng.randomItemFromArray([100, 160, 220]),
    ])
    return { values, labels: ['A', 'B', 'C', 'D'] }
  },

  originalData: {
    values: [120, 240, 70, -160],
    labels: ['Klasse A', 'Klasse B', 'Klasse C', 'Klasse D'],
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Tragen Sie die Zahlen auf einem geeigneten Zahlenstrahl ein.</p>
        <ul>
          {data.values.map((value, index) => (
            <li key={index}>
              {data.labels[index]}: {value} €
            </li>
          ))}
        </ul>
      </>
    )
  },

  solution({ data }) {
    const LEFT = 40
    const RIGHT = 320
    const Y = 100

    // Bestimme Bereich
    const min = Math.min(...data.values)
    const max = Math.max(...data.values)
    const range = max - min
    const padding = range * 0.1

    const minValue = Math.floor((min - padding) / 10) * 10
    const maxValue = Math.ceil((max + padding) / 10) * 10

    function toX(value: number) {
      return (
        LEFT + ((value - minValue) / (maxValue - minValue)) * (RIGHT - LEFT)
      )
    }

    return (
      <>
        <p>Zahlenstrahl mit den eingetragenen Werten:</p>

        <svg viewBox="0 0 360 220">
          {/* Zahlenstrahl */}
          <line
            x1={LEFT}
            y1={Y}
            x2={RIGHT}
            y2={Y}
            stroke="black"
            strokeWidth="2"
          />

          {/* Markierungen und Beschriftungen */}
          {Array.from({ length: (maxValue - minValue) / 10 + 1 }, (_, i) => {
            const value = minValue + i * 10
            const x = toX(value)
            const isMajor = value % 50 === 0

            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={Y - (isMajor ? 12 : 8)}
                  x2={x}
                  y2={Y + 8}
                  stroke="black"
                  strokeWidth={isMajor ? 2 : 1}
                />
                {isMajor && (
                  <text x={x} y={Y + 28} fontSize="12" textAnchor="middle">
                    {value}
                  </text>
                )}
              </g>
            )
          })}

          {/* Eingetragene Punkte */}
          {data.values.map((value, i) => {
            const x = toX(value)

            return (
              <g key={data.labels[i]}>
                {/* Punkt */}
                <circle
                  cx={x}
                  cy={Y}
                  r="6"
                  fill="#0066cc"
                  stroke="black"
                  strokeWidth="2"
                />

                {/* Label */}
                <text
                  x={x}
                  y={Y - 20}
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#0066cc"
                >
                  {data.labels[i]}
                </text>

                {/* Verbindungslinie */}
                <line
                  x1={x}
                  y1={Y - 14}
                  x2={x}
                  y2={Y - 6}
                  stroke="#0066cc"
                  strokeWidth="1"
                />

                {/* Wertanzeige */}
                <text
                  x={x}
                  y={Y + 50}
                  fontSize="11"
                  textAnchor="middle"
                  fill="#666"
                >
                  {data.labels[i]}: {value} €
                </text>
              </g>
            )
          })}
        </svg>

        <p style={{ marginTop: '30px', fontSize: '14px' }}>
          Von links nach rechts (sortiert):{' '}
          {data.values
            .map((value, index) => `${data.labels[index]} (${value} €)`)
            .sort((a, b) => Number(a.split('(')[1]) - Number(b.split('(')[1]))
            .join(', ')}
        </p>
      </>
    )
  },
}
