// exercise9545.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  min: number
  max: number
  step: number
  value: number
}

const LEFT = 20
const RIGHT = 308
const AXIS_Y = 60

function toX(value: number, min: number, max: number) {
  return LEFT + ((value - min) / (max - min)) * (RIGHT - LEFT)
}

export const exercise9545: Exercise<DATA> = {
  title: 'Zahlenstrahl ablesen',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const variants = [
      { min: 0, max: 20, step: 1 },
      { min: 0, max: 100, step: 5 },
      { min: -10, max: 10, step: 1 },
      { min: -20, max: 20, step: 2 },
    ]
    const variant = rng.randomItemFromArray(variants)
    const possible: number[] = []

    for (let v = variant.min; v <= variant.max; v += variant.step) {
      possible.push(v)
    }

    const value = rng.randomItemFromArray(possible)

    return { ...variant, value }
  },

  originalData: {
    min: 0,
    max: 20,
    step: 1,
    value: 8,
  },

  constraint({ data }) {
    return data.value >= data.min && data.value <= data.max
  },

  task({ data }) {
    return (
      <>
        <p>Lesen Sie den markierten Wert am Zahlenstrahl ab.</p>

        <svg viewBox="0 0 328 110">
          <line x1={LEFT} y1={AXIS_Y} x2={RIGHT} y2={AXIS_Y} stroke="black" />

          {Array.from(
            { length: Math.floor((data.max - data.min) / data.step) + 1 },
            (_, i) => data.min + i * data.step,
          ).map(v => (
            <g key={v}>
              <line
                x1={toX(v, data.min, data.max)}
                y1={AXIS_Y - 8}
                x2={toX(v, data.min, data.max)}
                y2={AXIS_Y + 8}
                stroke="black"
              />
              {(v === data.min ||
                v === data.max ||
                iShouldLabel(v, data.min, data.max, data.step)) && (
                <text
                  x={toX(v, data.min, data.max)}
                  y={AXIS_Y + 28}
                  fontSize="11"
                  textAnchor="middle"
                >
                  {v}
                </text>
              )}
            </g>
          ))}

          <circle
            cx={toX(data.value, data.min, data.max)}
            cy={AXIS_Y}
            r="5"
            fill="black"
          />
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Der markierte Wert ist <b>{pp(data.value)}</b>.
      </p>
    )
  },
}

function iShouldLabel(value: number, min: number, max: number, step: number) {
  const span = max - min
  if (span <= 20) return value % 5 === 0
  return value % 20 === 0 || value === 0
}
