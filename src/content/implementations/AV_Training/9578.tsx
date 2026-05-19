// exercise9578.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  g: number
  h: number
  unit: Unit
  volume: number
}

export const exercise9578: Exercise<DATA> = {
  title: 'Volumen schiefer Körper',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const g =
      unit === 'cm'
        ? rng.randomItemFromArray([40, 60, 80, 100, 120])
        : unit === 'dm'
          ? rng.randomItemFromArray([8, 10, 12, 15, 20])
          : rng.randomItemFromArray([3, 4, 5, 6, 8])

    const h =
      unit === 'cm'
        ? rng.randomItemFromArray([10, 20, 30, 40, 50])
        : unit === 'dm'
          ? rng.randomItemFromArray([3, 4, 5, 6, 8])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const volume = g * h

    return { g, h, unit, volume }
  },

  originalData: {
    g: 60,
    h: 30,
    unit: 'cm',
    volume: 1800,
  },

  constraint({ data }) {
    return data.g > 0 && data.h > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie das Volumen des schiefen Körpers.</p>

        <svg viewBox="0 0 300 190">
          <polygon points="65,130 190,130 230,85 105,85" fill="#eee" stroke="black" />
          <polygon points="105,85 230,85 210,45 85,45" fill="#ddd" stroke="black" />
          <line x1="65" y1="130" x2="85" y2="45" stroke="black" />
          <line x1="190" y1="130" x2="210" y2="45" stroke="black" />
          <line x1="230" y1="85" x2="210" y2="45" stroke="black" />
          <line x1="210" y1="45" x2="210" y2="130" stroke="black" strokeDasharray="5 4" />

          <text x="125" y="158" fontSize="14">
            G = {pp(data.g)} {data.unit}²
          </text>
          <text x="218" y="92" fontSize="14">
            h = {pp(data.h)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Auch bei einem schiefen Körper gilt:</p>
        <InlineMath math="V=G\cdot h" />

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