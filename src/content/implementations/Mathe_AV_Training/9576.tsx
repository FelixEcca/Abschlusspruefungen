// exercise9576.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  a: number
  unit: Unit
  volume: number
}

export const exercise9576: Exercise<DATA> = {
  title: 'Volumen Würfel',
  source: 'Körper und Volumen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const a =
      unit === 'cm'
        ? rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
        : unit === 'dm'
          ? rng.randomItemFromArray([2, 3, 4, 5])
          : rng.randomItemFromArray([2, 3, 4])

    const volume = a * a * a

    return { a, unit, volume }
  },

  originalData: {
    a: 4,
    unit: 'cm',
    volume: 64,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie das Volumen des Würfels.</p>

        <svg viewBox="0 0 240 180">
          <rect
            x="60"
            y="55"
            width="80"
            height="80"
            fill="#eee"
            stroke="black"
          />
          <polygon
            points="140,55 140,135  170,115 170,35"
            fill="#ddd"
            stroke="black"
          />
          <polygon
            points="90,35 60,55  140,55 170,35"
            fill="#ddd"
            stroke="black"
          />

          <text x="100" y="155" fontSize="14">
            {data.a} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Würfel gilt:</p>
        <InlineMath math={`V=a^3`} />

        <p>Einsetzen:</p>

        <InlineMath
          math={`V=${data.a}^3=${data.volume}\\,\\mathrm{${data.unit}}^3`}
        />

        <p>
          Das Volumen beträgt{' '}
          <b>
            {data.volume} {data.unit}³
          </b>
          .
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/OT0a3HJ71vU"
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
