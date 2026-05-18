// exercise9565.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  a: number
  unit: Unit
  area: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9565: Exercise<DATA> = {
  title: 'Fläche Quadrat',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const a =
      unit === 'cm'
        ? rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
        : unit === 'dm'
          ? rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const area = a * a

    return { a, unit, area }
  },

  originalData: {
    a: 6,
    unit: 'cm',
    area: 36,
  },

  constraint({ data }) {
    return data.a > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt des Quadrats.</p>

        <svg viewBox="0 0 328 180">
          <rect
            x="105"
            y="35"
            width="120"
            height="120"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />

          <text x="165" y="175" fontSize="15" textAnchor="middle">
            a = {pp(data.a)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Quadrat sind alle Seiten gleich lang.</p>
        <p>Für den Flächeninhalt gilt:</p>
        <InlineMath math={`A=a\\cdot a`} />

        <p>Einsetzen:</p>
        <InlineMath
          math={`A=${pp(data.a)}\\cdot ${pp(data.a)}=${pp(
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
