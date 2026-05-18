// exercise9567.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  a: number
  c: number
  h: number
  unit: Unit
  area: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9567: Exercise<DATA> = {
  title: 'Fläche Trapez',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const a =
      unit === 'cm'
        ? rng.randomItemFromArray([10, 12, 14, 16, 18, 20])
        : unit === 'dm'
          ? rng.randomItemFromArray([6, 8, 10, 12])
          : rng.randomItemFromArray([4, 5, 6, 8])

    const c =
      unit === 'cm'
        ? rng.randomItemFromArray([4, 6, 8, 10, 12])
        : unit === 'dm'
          ? rng.randomItemFromArray([3, 4, 5, 6])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const h =
      unit === 'cm'
        ? rng.randomItemFromArray([4, 5, 6, 8, 10])
        : unit === 'dm'
          ? rng.randomItemFromArray([2, 3, 4, 5])
          : rng.randomItemFromArray([2, 3, 4])

    const area = ((a + c) * h) / 2

    return { a, c, h, unit, area }
  },

  originalData: {
    a: 14,
    c: 8,
    h: 5,
    unit: 'cm',
    area: 55,
  },

  constraint({ data }) {
    return data.a > data.c && data.area > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt des Trapezes.</p>

        <svg viewBox="0 0 328 180">
          <polygon
            points="70,135 260,135 215,55 115,55"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="215"
            y1="55"
            x2="215"
            y2="135"
            stroke="black"
            strokeDasharray="5 4"
          />
          <text x="165" y="158" fontSize="15" textAnchor="middle">
            a = {pp(data.a)} {data.unit}
          </text>
          <text x="165" y="48" fontSize="15" textAnchor="middle">
            c = {pp(data.c)} {data.unit}
          </text>
          <text x="224" y="98" fontSize="15">
            h = {pp(data.h)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Trapez gilt:</p>
        <InlineMath math={`A=\\frac{a+c}{2}\\cdot h`} />

        <p>Einsetzen:</p>
        <InlineMath
          math={`A=\\frac{${pp(data.a)}+${pp(data.c)}}{2}\\cdot ${pp(data.h)}`}
        />
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
