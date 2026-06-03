// exercise9038.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  values: number[]
  labels: string[]

  e: number
  f: number
  g: number
  h: number
}

const LEFT = 35
const RIGHT = 325
const Y = 70
const MIN = -5
const MAX = 5

function toX(value: number) {
  return LEFT + ((value - MIN) / (MAX - MIN)) * (RIGHT - LEFT)
}

function numberLatex(value: number) {
  const rounded = Math.round(value * 10) / 10

  if (Number.isInteger(rounded)) return `${rounded}`

  return `${rounded}`.replace('.', ',')
}

function mixedNumber(value: number) {
  const whole = Math.floor(value)
  const decimal = value - whole

  if (decimal === 0.5) {
    return `${whole}\\frac{1}{2}`
  }

  return `${value}`.replace('.', ',')
}

export const exercise9038: Exercise<DATA> = {
  title: 'Teil 1: Zahlenstrahl',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const labels = ['A', 'B', 'C', 'D']

    const pools = [
      [-4.2, -3.8, -3.5, -3.1, -2.6],
      [-1.4, -1.1, -0.8, -0.6, -0.2],
      [1.6, 1.8, 2.1, 2.4, 2.8],
      [3.1, 3.4, 3.5, 3.7, 4.2],
    ]

    const values = pools.map(pool => rng.randomItemFromArray(pool))

    const e = rng.randomItemFromArray([-2.4, -1.8, -1.4, -0.6])
    const f = rng.randomItemFromArray([0.4, 0.8, 1.2, 1.6])
    const g = rng.randomItemFromArray([1.5, 2.5, 3.5])
    const h = rng.randomItemFromArray([2.2, 3.2, 4.1])

    return {
      values,
      labels,
      e,
      f,
      g,
      h,
    }
  },

  originalData: {
    labels: ['A', 'B', 'C', 'D'],
    values: [-3.2, -0.6, 2.1, 3.5],

    e: -1.4,
    f: 0.8,
    g: 2.5,
    h: 3.2,
  },

  constraint({ data }) {
    return data.values.length === 4
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Geben Sie die auf dem Zahlenstrahl dargestellten Zahlen an.</p>

            <svg viewBox="0 0 360 145">
              <line x1={LEFT} y1={Y} x2={RIGHT} y2={Y} stroke="black" />

              {Array.from({ length: 101 }, (_, i) => {
                const value = MIN + i / 10
                const x = toX(value)
                const isWhole = Math.abs(value - Math.round(value)) < 0.001
                const isHalf =
                  Math.abs(value * 2 - Math.round(value * 2)) < 0.001

                return (
                  <g key={i}>
                    <line
                      x1={x}
                      y1={Y - (isWhole ? 22 : isHalf ? 14 : 8)}
                      x2={x}
                      y2={Y + (isWhole ? 22 : isHalf ? 14 : 8)}
                      stroke="black"
                    />

                    {isWhole && value >= -4 && value <= 4 && (
                      <text x={x} y={Y + 42} fontSize="12" textAnchor="middle">
                        {value}
                      </text>
                    )}
                  </g>
                )
              })}

              {data.values.map((value, i) => {
                const x = toX(value)

                return (
                  <g key={data.labels[i]}>
                    <circle
                      cx={x}
                      cy={28}
                      r="15"
                      fill="white"
                      stroke="black"
                      strokeWidth="2"
                    />

                    <text x={x} y={33} fontSize="15" textAnchor="middle">
                      {data.labels[i]}
                    </text>

                    <line x1={x} y1={43} x2={x} y2={Y - 10} stroke="black" />

                    <polygon
                      points={`${x - 4},${Y - 10} ${x + 4},${Y - 10} ${x},${Y}`}
                      fill="black"
                    />
                  </g>
                )
              })}
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Zahlen werden am Zahlenstrahl abgelesen:</p>

            <p>
              {data.labels.map((label, i) => (
                <span key={label}>
                  {label} = <InlineMath math={numberLatex(data.values[i])} />
                  <br />
                </span>
              ))}
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
            <p className="mt-4">
              Zeichnen Sie einen Zahlenstrahl wie in Aufgabe a) und tragen Sie
              folgende Zahlen ein:
            </p>
            <p>
              <InlineMath math={`E=${numberLatex(data.e)}`} />
              {'  '}
              <br></br>
              <InlineMath math={`F=${numberLatex(data.f)}`} />
              {'  '}
              <br></br>
              <InlineMath math={`G=${mixedNumber(data.g)}`} />
              {'  '}
              <br></br>
              <InlineMath math={`H=${numberLatex(data.h)}`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const plotted = [
          { label: 'E', value: data.e },
          { label: 'F', value: data.f },
          { label: 'G', value: data.g },
          { label: 'H', value: data.h },
        ]

        return (
          <>
            {' '}
            <p>Die Zahlen werden an den passenden Stellen eingetragen:</p>
            <svg viewBox="0 0 360 145">
              <line x1={LEFT} y1={Y} x2={RIGHT} y2={Y} stroke="black" />

              {Array.from({ length: 101 }, (_, i) => {
                const value = MIN + i / 10
                const x = toX(value)
                const isWhole = Math.abs(value - Math.round(value)) < 0.001
                const isHalf =
                  Math.abs(value * 2 - Math.round(value * 2)) < 0.001

                return (
                  <g key={i}>
                    <line
                      x1={x}
                      y1={Y - (isWhole ? 22 : isHalf ? 14 : 8)}
                      x2={x}
                      y2={Y + (isWhole ? 22 : isHalf ? 14 : 8)}
                      stroke="black"
                    />

                    {isWhole && value >= -4 && value <= 4 && (
                      <text x={x} y={Y + 42} fontSize="12" textAnchor="middle">
                        {value}
                      </text>
                    )}
                  </g>
                )
              })}

              {plotted.map(point => {
                const x = toX(point.value)

                return (
                  <g key={point.label}>
                    <circle
                      cx={x}
                      cy={28}
                      r="15"
                      fill="white"
                      stroke="black"
                      strokeWidth="2"
                    />

                    <text x={x} y={33} fontSize="15" textAnchor="middle">
                      {point.label}
                    </text>

                    <line x1={x} y1={43} x2={x} y2={Y - 10} stroke="black" />

                    <polygon
                      points={`${x - 4},${Y - 10} ${x + 4},${Y - 10} ${x},${Y}`}
                      fill="black"
                    />
                  </g>
                )
              })}
            </svg>
            <p>
              E = <InlineMath math={numberLatex(data.e)} />
              <br />
              F = <InlineMath math={numberLatex(data.f)} />
              <br />
              G = <InlineMath math={mixedNumber(data.g)} />
              <br />
              H = <InlineMath math={numberLatex(data.h)} />
            </p>
          </>
        )
      },
    },
  ],
}
