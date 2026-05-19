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
          <rect x="60" y="55" width="80" height="80" fill="#eee" stroke="black" />
          <rect x="90" y="35" width="80" height="80" fill="#ddd" stroke="black" />
          <line x1="60" y1="55" x2="90" y2="35" stroke="black" />
          <line x1="140" y1="55" x2="170" y2="35" stroke="black" />
          <line x1="140" y1="135" x2="170" y2="115" stroke="black" />
          <line x1="170" y1="35" x2="170" y2="115" stroke="black" />

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
          Das Volumen beträgt <b>{data.volume} {data.unit}³</b>.
        </p>
      </>
    )
  },
}