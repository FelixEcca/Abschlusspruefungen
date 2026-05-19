// exercise9531.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Unit = 'mm' | 'cm' | 'dm' | 'm'

interface DATA {
  length: number
  width: number
  unit: Unit
  area: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9531: Exercise<DATA> = {
  title: 'Rechteck Fläche',
  source: 'Geometrie',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['mm', 'cm', 'dm', 'm'])

    const length =
      unit === 'mm'
        ? rng.randomItemFromArray([40, 50, 60, 80, 100, 120])
        : unit === 'cm'
          ? rng.randomItemFromArray([12, 15, 20, 25, 30, 40])
          : unit === 'dm'
            ? rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
            : rng.randomItemFromArray([3, 4, 5, 6, 8, 10])

    const width =
      unit === 'mm'
        ? rng.randomItemFromArray([20, 30, 40, 50, 60])
        : unit === 'cm'
          ? rng.randomItemFromArray([5, 8, 10, 12, 15])
          : unit === 'dm'
            ? rng.randomItemFromArray([2, 3, 4, 5, 6])
            : rng.randomItemFromArray([2, 3, 4, 5])

    const area = length * width

    return { length, width, unit, area }
  },

  originalData: {
    length: 8,
    width: 5,
    unit: 'm',
    area: 40,
  },

  constraint({ data }) {
    return data.length != data.width
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Rechteck ist {data.length} {data.unit} lang und {data.width}{' '}
          {data.unit} breit.
        </p>
        <svg viewBox="0 0 360 220" className="my-2 w-full max-w-md">
          <rect
            x="80"
            y="50"
            width="200"
            height="120"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          <line
            x1="80"
            y1="185"
            x2="280"
            y2="185"
            stroke="black"
            strokeWidth="1.5"
          />
          <line
            x1="80"
            y1="179"
            x2="80"
            y2="191"
            stroke="black"
            strokeWidth="1.5"
          />
          <line
            x1="280"
            y1="179"
            x2="280"
            y2="191"
            stroke="black"
            strokeWidth="1.5"
          />
          <text x="180" y="203" textAnchor="middle" fontSize="14">
            a = {data.length} {data.unit}
          </text>

          <line
            x1="300"
            y1="50"
            x2="300"
            y2="170"
            stroke="black"
            strokeWidth="1.5"
          />
          <line
            x1="294"
            y1="50"
            x2="306"
            y2="50"
            stroke="black"
            strokeWidth="1.5"
          />
          <line
            x1="294"
            y1="170"
            x2="306"
            y2="170"
            stroke="black"
            strokeWidth="1.5"
          />
          <text x="314" y="114" fontSize="14">
            b = {data.width} {data.unit}
          </text>
        </svg>
        <p>Berechnen Sie die Fläche.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`A=a\\cdot b=${data.length}\\cdot ${data.width}=${data.area}\\,${unitLatex(
            data.unit,
          )}^2`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/aswX68-pzz4"
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
