// exercise9593.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  numerator: number
  denominator: number
}

const LEFT = 25
const RIGHT = 305
const Y = 65

function toX(n: number, d: number) {
  return LEFT + (n / d) * (RIGHT - LEFT)
}

export const exercise9593: Exercise<DATA> = {
  title: 'Brüche auf dem Zahlenstrahl',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const denominator = rng.randomItemFromArray([3, 4, 5, 6, 8, 10])
    const numerator = rng.randomIntBetween(1, denominator - 1)
    return { numerator, denominator }
  },

  originalData: {
    numerator: 3,
    denominator: 4,
  },

  constraint({ data }) {
    return data.numerator < data.denominator
  },

  task({ data }) {
    return (
      <>
        <p>Welcher Bruch ist auf dem Zahlenstrahl markiert?</p>
        <svg viewBox="0 0 328 120">
          <line x1={LEFT} y1={Y} x2={RIGHT} y2={Y} stroke="black" />
          {Array.from({ length: data.denominator + 1 }, (_, i) => (
            <g key={i}>
              <line
                x1={toX(i, data.denominator)}
                y1={Y - 10}
                x2={toX(i, data.denominator)}
                y2={Y + 10}
                stroke="black"
              />
              {(i === 0 || i === data.denominator) && (
                <text
                  x={toX(i, data.denominator)}
                  y={Y + 30}
                  fontSize="12"
                  textAnchor="middle"
                >
                  {i === 0 ? '0' : '1'}
                </text>
              )}
            </g>
          ))}
          <circle
            cx={toX(data.numerator, data.denominator)}
            cy={Y}
            r="5"
            fill="black"
          />
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die Strecke von 0 bis 1 ist in {data.denominator} gleiche Teile geteilt.</p>
        <p>Der Punkt liegt beim {data.numerator}. Teil.</p>
        <InlineMath math={`\\frac{${data.numerator}}{${data.denominator}}`} />
      </>
    )
  },
}