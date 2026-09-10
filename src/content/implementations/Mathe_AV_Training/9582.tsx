// exercise9582.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  a: number
  unit: Unit
  surface: number
}

export const exercise9582: Exercise<DATA> = {
  title: 'Oberfläche Würfel',
  source: 'Körper und Volumen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const a = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 10])
    const surface = 6 * a * a
    return { a, unit, surface }
  },

  originalData: {
    a: 5,
    unit: 'cm',
    surface: 150,
  },

  constraint({ data }) {
    return data.a > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Oberfläche des Würfels.</p>

        <svg viewBox="0 0 260 190">
          <rect
            x="50"
            y="50"
            width="80"
            height="80"
            fill="#eee"
            stroke="black"
          />
          <polygon
            points="130,50 130,130  160,110 160,30"
            fill="#ddd"
            stroke="black"
          />
          <polygon
            points="80,30 50,50  130,50 160,30"
            fill="#ddd"
            stroke="black"
          />
          <text x="110" y="170" fontSize="14">
            a = {pp(data.a)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Ein Würfel hat 6 gleich große Quadrate.</p>
        <p>Eine Fläche:</p>
        <InlineMath
          math={`A=${pp(data.a)}\\cdot ${pp(data.a)}=${pp(data.a * data.a)}\\,\\mathrm{${data.unit}}^2`}
        />
        <p>Alle 6 Flächen zusammen:</p>
        <InlineMath
          math={`O=6\\cdot ${pp(data.a * data.a)}=${pp(data.surface)}\\,\\mathrm{${data.unit}}^2`}
        />
        <p>
          Die Oberfläche beträgt{' '}
          <b>
            {pp(data.surface)} {data.unit}²
          </b>
          .
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/t2CwW27O1lw"
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
