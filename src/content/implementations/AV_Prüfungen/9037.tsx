// exercise9037.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  sports: string[]
  values: number[]
  targetA: number
  targetB: number
  mostIndex: number
  total: number
  difference: number
}

export const exercise9037: Exercise<DATA> = {
  title: 'Teil 1: Diagramm auswerten',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const sports = [
      'Volleyball',
      'Tischtennis',
      'Fußball',
      'Basketball',
      'Rugby',
      'Handball',
    ]

    const values = [
      rng.randomIntBetween(4, 9),
      rng.randomIntBetween(1, 5),
      rng.randomIntBetween(5, 10),
      rng.randomIntBetween(2, 6),
      rng.randomIntBetween(1, 4),
      rng.randomIntBetween(2, 7),
    ]

    const mostIndex = values.indexOf(Math.max(...values))
    const targetA = 0
    const targetB = 3
    const total = values.reduce((sum, v) => sum + v, 0)
    const difference = Math.abs(values[targetA] - values[targetB])

    return { sports, values, targetA, targetB, mostIndex, total, difference }
  },

  originalData: {
    sports: [
      'Volleyball',
      'Tischtennis',
      'Fußball',
      'Basketball',
      'Rugby',
      'Handball',
    ],
    values: [7, 2, 8, 3, 1, 4],
    targetA: 0,
    targetB: 3,
    mostIndex: 2,
    total: 25,
    difference: 4,
  },

  constraint({ data }) {
    return data.values.length === data.sports.length
  },
  intro({ data }) {
    const maxY = 10
    const chartX = 48
    const chartY = 35
    const chartW = 265
    const chartH = 150
    const barW = 24
    const gap = 20
    return (
      <>
        {' '}
        <p>
          In Ihrer Klasse wurde eine Umfrage zur beliebtesten Sportart gemacht.
        </p>
        <svg viewBox="0 0 360 255">
          <text x="180" y="20" fontSize="13" textAnchor="middle">
            Die beliebteste Sportart in Ihrer Klasse
          </text>

          <line
            x1={chartX}
            y1={chartY}
            x2={chartX}
            y2={chartY + chartH}
            stroke="black"
          />
          <line
            x1={chartX}
            y1={chartY + chartH}
            x2={chartX + chartW}
            y2={chartY + chartH}
            stroke="black"
          />

          {Array.from({ length: maxY + 1 }, (_, i) => (
            <g key={i}>
              <line
                x1={chartX - 4}
                y1={chartY + chartH - i * (chartH / maxY)}
                x2={chartX}
                y2={chartY + chartH - i * (chartH / maxY)}
                stroke="black"
              />
              <text
                x={chartX - 10}
                y={chartY + chartH - i * (chartH / maxY) + 4}
                fontSize="10"
                textAnchor="end"
              >
                {i}
              </text>
            </g>
          ))}

          {data.values.map((value, i) => {
            const x = chartX + 22 + i * (barW + gap)
            const h = value * (chartH / maxY)
            const y = chartY + chartH - h

            return (
              <g key={data.sports[i]}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={h}
                  fill="#999"
                  stroke="black"
                />

                <text
                  x={x + barW / 2}
                  y={chartY + chartH + 18}
                  fontSize="9"
                  textAnchor="middle"
                >
                  {data.sports[i]}
                </text>
              </g>
            )
          })}
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const maxY = 10
        const chartX = 48
        const chartY = 35
        const chartW = 265
        const chartH = 150
        const barW = 24
        const gap = 20

        return (
          <>
            <p>
              Entnehmen Sie aus dem Schaubild die beliebteste Sportart und wie
              oft sie genannt wurde.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die beliebteste Sportart ist:</p>
            <p>
              <b>
                {data.sports[data.mostIndex]} mit {data.values[data.mostIndex]}{' '}
                Nennungen.
              </b>
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            {' '}
            <p>
              Berechnen Sie, wie viele Schüler/innen an der Umfrage teilgenommen
              haben.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {' '}
            <p>Alle Werte werden addiert:</p>
            <InlineMath math={`${data.values.join('+')}=${data.total}`} />
            <p>
              Es haben <b>{data.total} Schüler/innen</b> teilgenommen.
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Berechnen Sie den Unterschied zwischen {data.sports[data.targetA]}{' '}
              und {data.sports[data.targetB]}.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Der Unterschied wird durch Subtraktion berechnet:</p>
            <InlineMath
              math={`${Math.max(
                data.values[data.targetA],
                data.values[data.targetB],
              )}-${Math.min(
                data.values[data.targetA],
                data.values[data.targetB],
              )}=${data.difference}`}
            />
            <p>
              Der Unterschied beträgt <b>{data.difference}</b>.
            </p>
          </>
        )
      },
    },
  ],
}
