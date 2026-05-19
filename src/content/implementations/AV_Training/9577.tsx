// exercise9577.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'
type Context = 'aquarium' | 'pool' | 'karton'

interface DATA {
  context: Context
  g: number
  h: number
  unit: Unit
  volume: number
}

function getContext(context: Context) {
  if (context === 'aquarium') {
    return 'Ein Aquarium hat eine rechteckige Grundfläche.'
  }

  if (context === 'pool') {
    return 'Ein Pool hat eine rechteckige Grundfläche.'
  }

  return 'Ein Karton hat eine rechteckige Grundfläche.'
}

export const exercise9577: Exercise<DATA> = {
  title: 'Volumen Prisma',
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

    const g =
      unit === 'cm'
        ? rng.randomItemFromArray([80, 100, 120, 150])
        : unit === 'dm'
          ? rng.randomItemFromArray([12, 15, 18, 20])
          : rng.randomItemFromArray([4, 5, 6, 8])

    const h =
      unit === 'cm'
        ? rng.randomItemFromArray([20, 30, 40, 50])
        : unit === 'dm'
          ? rng.randomItemFromArray([4, 5, 6, 8])
          : rng.randomItemFromArray([2, 3, 4])

    const volume = g * h

    return { context, g, h, unit, volume }
  },

  originalData: {
    context: 'aquarium',
    g: 120,
    h: 40,
    unit: 'cm',
    volume: 4800,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>{getContext(data.context)}</p>

        <svg viewBox="0 0 260 180">
          <rect x="50" y="70" width="120" height="60" fill="#eee" stroke="black" />
          <rect x="85" y="45" width="120" height="60" fill="#ddd" stroke="black" />

          <line x1="50" y1="70" x2="85" y2="45" stroke="black" />
          <line x1="170" y1="70" x2="205" y2="45" stroke="black" />
          <line x1="170" y1="130" x2="205" y2="105" stroke="black" />
          <line x1="205" y1="45" x2="205" y2="105" stroke="black" />

          <text x="108" y="150" fontSize="14">
            G = {pp(data.g)} {data.unit}²
          </text>

          <text x="214" y="84" fontSize="14">
            h = {pp(data.h)} {data.unit}
          </text>
        </svg>

        <p>Berechnen Sie das Volumen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Prisma gilt:</p>

        <InlineMath math={`V=G\\cdot h`} />

        <p>Einsetzen:</p>

        <InlineMath
          math={`V=${pp(data.g)}\\cdot ${pp(data.h)}=${pp(
            data.volume,
          )}\\,\\mathrm{${data.unit}}^3`}
        />

        <p>
          Das Volumen beträgt <b>{pp(data.volume)} {data.unit}³</b>.
        </p>
      </>
    )
  },
}