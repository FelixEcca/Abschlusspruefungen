// exercise9568.tsx
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

export const exercise9568: Exercise<DATA> = {
  title: 'Fläche rechtwinkliges Dreieck',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const a =
      unit === 'cm'
        ? rng.randomItemFromArray([6, 8, 10, 12, 14, 16])
        : unit === 'dm'
          ? rng.randomItemFromArray([4, 5, 6, 8, 10])
          : rng.randomItemFromArray([3, 4, 5, 6, 8])

    const b =
      unit === 'cm'
        ? rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
        : unit === 'dm'
          ? rng.randomItemFromArray([2, 3, 4, 5, 6])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const area = (a * b) / 2

    return { a, b, unit, area }
  },

  originalData: {
    a: 8,
    b: 6,
    unit: 'cm',
    area: 24,
  },

  constraint({ data }) {
    return data.area > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt des rechtwinkligen Dreiecks.</p>

        <svg viewBox="0 0 328 180">
          <polygon
            points="80,135 250,135 80,45"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />
          <path d="M 80 118 L 97 118 L 97 135" fill="none" stroke="black" />
          <text x="165" y="158" fontSize="15" textAnchor="middle">
            a = {pp(data.a)} {data.unit}
          </text>
          <text x="45" y="92" fontSize="15" textAnchor="middle">
            b = {pp(data.b)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Ein rechtwinkliges Dreieck ist die Hälfte eines Rechtecks.</p>
        <p>Deshalb gilt:</p>
        <InlineMath math={`A=\\frac{a\\cdot b}{2}`} />

        <p>Einsetzen:</p>
        <InlineMath math={`A=\\frac{${pp(data.a)}\\cdot ${pp(data.b)}}{2}`} />
        <br />
        <InlineMath math={`A=${pp(data.area)}\\,${unitLatex(data.unit)}^2`} />

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
