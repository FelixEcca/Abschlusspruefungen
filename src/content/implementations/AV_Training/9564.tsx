// exercise9564.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  g: number
  h: number
  unit: Unit
  area: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9564: Exercise<DATA> = {
  title: 'Fläche Parallelogramm',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const g =
      unit === 'cm'
        ? rng.randomItemFromArray([6, 8, 10, 12, 15, 18])
        : unit === 'dm'
          ? rng.randomItemFromArray([4, 5, 6, 8, 10])
          : rng.randomItemFromArray([3, 4, 5, 6, 8])

    const h =
      unit === 'cm'
        ? rng.randomItemFromArray([3, 4, 5, 6, 8, 10])
        : unit === 'dm'
          ? rng.randomItemFromArray([2, 3, 4, 5, 6])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const area = g * h

    return { g, h, unit, area }
  },

  originalData: {
    g: 12,
    h: 5,
    unit: 'cm',
    area: 60,
  },

  constraint({ data }) {
    return data.g > 0 && data.h > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt des Parallelogramms.</p>

        <svg viewBox="0 0 328 180">
          <polygon
            points="80,130 245,130 210,55 45,55"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />

          <line
            x1="210"
            y1="55"
            x2="210"
            y2="130"
            stroke="black"
            strokeDasharray="5 4"
          />

          <text x="162" y="153" fontSize="15" textAnchor="middle">
            g = {pp(data.g)} {data.unit}
          </text>
          <text x="220" y="95" fontSize="15">
            h = {pp(data.h)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Parallelogramm gilt:</p>
        <InlineMath math={`A=g\\cdot h`} />

        <p>Einsetzen:</p>
        <InlineMath
          math={`A=${pp(data.g)}\\cdot ${pp(data.h)}=${pp(
            data.area,
          )}\\,${unitLatex(data.unit)}^2`}
        />

        <p>
          Der Flächeninhalt beträgt{' '}
          <b>
            {pp(data.area)} {data.unit}²
          </b>
          .
        </p>
      </>
    )
  },
}
