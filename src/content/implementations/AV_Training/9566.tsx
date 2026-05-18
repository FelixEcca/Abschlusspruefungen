// exercise9566.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  a: number
  b: number
  unit: Unit
  area: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9566: Exercise<DATA> = {
  title: 'Fläche Rechteck',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const a =
      unit === 'cm'
        ? rng.randomItemFromArray([8, 10, 12, 15, 18, 20, 25])
        : unit === 'dm'
          ? rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
          : rng.randomItemFromArray([3, 4, 5, 6, 8, 10])

    const b =
      unit === 'cm'
        ? rng.randomItemFromArray([3, 4, 5, 6, 8, 10])
        : unit === 'dm'
          ? rng.randomItemFromArray([2, 3, 4, 5, 6])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const area = a * b

    return { a, b, unit, area }
  },

  originalData: {
    a: 8,
    b: 5,
    unit: 'm',
    area: 40,
  },

  constraint({ data }) {
    return data.a > 0 && data.b > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt des Rechtecks.</p>

        <svg viewBox="0 0 328 180">
          <rect
            x="65"
            y="50"
            width="200"
            height="90"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />

          <text x="165" y="165" fontSize="15" textAnchor="middle">
            a = {pp(data.a)} {data.unit}
          </text>
          <text x="38" y="100" fontSize="15" textAnchor="middle">
            b = {pp(data.b)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Rechteck gilt:</p>
        <InlineMath math={`A=a\\cdot b`} />

        <p>Einsetzen:</p>
        <InlineMath
          math={`A=${pp(data.a)}\\cdot ${pp(data.b)}=${pp(
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
