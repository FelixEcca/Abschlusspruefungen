// exercise9569.tsx
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

export const exercise9569: Exercise<DATA> = {
  title: 'Fläche Dreieck mit Höhe',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const g =
      unit === 'cm'
        ? rng.randomItemFromArray([6, 8, 10, 12, 14, 16, 18])
        : unit === 'dm'
          ? rng.randomItemFromArray([4, 5, 6, 8, 10])
          : rng.randomItemFromArray([3, 4, 5, 6, 8])

    const h =
      unit === 'cm'
        ? rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
        : unit === 'dm'
          ? rng.randomItemFromArray([2, 3, 4, 5, 6])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const area = (g * h) / 2

    return { g, h, unit, area }
  },

  originalData: {
    g: 12,
    h: 5,
    unit: 'cm',
    area: 30,
  },

  constraint({ data }) {
    return data.area > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt des Dreiecks.</p>

        <svg viewBox="0 0 328 180">
          <polygon
            points="65,135 265,135 185,45"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="185"
            y1="45"
            x2="185"
            y2="135"
            stroke="black"
            strokeDasharray="5 4"
          />
          <path d="M 185 118 L 202 118 L 202 135" fill="none" stroke="black" />

          <text x="165" y="158" fontSize="15" textAnchor="middle">
            g = {pp(data.g)} {data.unit}
          </text>
          <text x="196" y="92" fontSize="15">
            h = {pp(data.h)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Dreieck gilt:</p>
        <InlineMath math={`A=\\frac{g\\cdot h}{2}`} />

        <p>Einsetzen:</p>
        <InlineMath math={`A=\\frac{${pp(data.g)}\\cdot ${pp(data.h)}}{2}`} />
        <br />
        <InlineMath math={`A=${pp(data.area)}\\,${unitLatex(data.unit)}^2`} />

        <p>
          Der Flächeninhalt beträgt{' '}
          <b>
            {pp(data.area)} {data.unit}²
          </b>
          .
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/VKkRc8O8_R8"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
