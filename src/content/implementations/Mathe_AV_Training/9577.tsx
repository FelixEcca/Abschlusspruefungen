// exercise9577.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'
type Context = 'aquarium' | 'pool' | 'karton'

interface DATA {
  context: Context
  a: number
  b: number
  c: number
  unit: Unit
  volume: number
}

function getContext(context: Context) {
  if (context === 'aquarium') {
    return 'Ein Aquarium hat folgende Maße.'
  }

  if (context === 'pool') {
    return 'Ein Pool hat folgende Maße.'
  }

  return 'Ein Karton hat folgende Maße.'
}

export const exercise9577: Exercise<DATA> = {
  title: 'Volumen Quader',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const context: Context = rng.randomItemFromArray([
      'aquarium',
      'pool',
      'karton',
    ])

    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const a =
      unit === 'cm'
        ? rng.randomItemFromArray([80, 100, 120, 150])
        : unit === 'dm'
          ? rng.randomItemFromArray([12, 15, 18, 20])
          : rng.randomItemFromArray([4, 5, 6, 8])

    const b =
      unit === 'cm'
        ? rng.randomItemFromArray([30, 40, 50, 60])
        : unit === 'dm'
          ? rng.randomItemFromArray([6, 8, 10, 12])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const c =
      unit === 'cm'
        ? rng.randomItemFromArray([20, 30, 40, 50])
        : unit === 'dm'
          ? rng.randomItemFromArray([4, 5, 6, 8])
          : rng.randomItemFromArray([2, 3, 4])

    const volume = a * b * c

    return { context, a, b, c, unit, volume }
  },

  originalData: {
    context: 'aquarium',
    a: 12,
    b: 8,
    c: 5,
    unit: 'cm',
    volume: 480,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>{getContext(data.context)}</p>

        <svg viewBox="0 0 260 180">
          <rect
            x="40"
            y="60"
            width="120"
            height="65"
            fill="#eee"
            stroke="black"
          />

          <polygon
            points="200,100 160,125  160,60 200,35"
            fill="#ddd"
            stroke="black"
          />
          <polygon
            points="80,35 40,60  160,60 200,35"
            fill="#ddd"
            stroke="black"
          />

          <text x="98" y="148" fontSize="14">
            a = {pp(data.a)} {data.unit}
          </text>

          <text x="140" y="55" fontSize="14">
            b = {pp(data.b)} {data.unit}
          </text>

          <text x="208" y="85" fontSize="14">
            c = {pp(data.c)} {data.unit}
          </text>
        </svg>

        <p>Berechnen Sie das Volumen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Quader gilt:</p>

        <InlineMath math={`V=a\\cdot b\\cdot c`} />

        <p>Einsetzen:</p>

        <InlineMath
          math={`V=${pp(data.a)}\\cdot ${pp(data.b)}\\cdot ${pp(data.c)}=${pp(
            data.volume,
          )}\\,\\mathrm{${data.unit}}^3`}
        />

        <p>
          Das Volumen beträgt{' '}
          <b>
            {pp(data.volume)} {data.unit}³
          </b>
          .
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/xFrFZieub44"
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
