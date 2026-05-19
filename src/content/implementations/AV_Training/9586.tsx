// exercise9586.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  r: number
  s: number
  unit: Unit
  surface: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9586: Exercise<DATA> = {
  title: 'Oberfläche Kegel',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const s = rng.randomItemFromArray([5, 6, 8, 10, 12, 15])
    const surface = round2(Math.PI * r * r + Math.PI * r * s)

    return { r, s, unit, surface }
  },

  originalData: {
    r: 4,
    s: 10,
    unit: 'cm',
    surface: 175.93,
  },

  constraint({ data }) {
    return data.s > data.r
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Oberfläche des Kegels.</p>

        <svg viewBox="0 0 260 210">
          <ellipse cx="130" cy="160" rx="70" ry="22" fill="#eee" stroke="black" />
          <line x1="60" y1="160" x2="130" y2="35" stroke="black" />
          <line x1="200" y1="160" x2="130" y2="35" stroke="black" />
          <line x1="130" y1="160" x2="200" y2="160" stroke="black" />
          <text x="158" y="152" fontSize="14">
            r = {pp(data.r)} {data.unit}
          </text>
          <text x="75" y="90" fontSize="14">
            s = {pp(data.s)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die Oberfläche besteht aus Grundfläche und Mantel.</p>
        <InlineMath math={`O=\\pi\\cdot r^2+\\pi\\cdot r\\cdot s`} />

        <p>Einsetzen:</p>
        <InlineMath
          math={`O=\\pi\\cdot ${pp(data.r)}^2+\\pi\\cdot ${pp(data.r)}\\cdot ${pp(data.s)}`}
        />
        <br />
        <InlineMath
          math={`O\\approx ${pp(data.surface)}\\,\\mathrm{${data.unit}}^2`}
        />

        <p>
          Die Oberfläche beträgt ungefähr <b>{pp(data.surface)} {data.unit}²</b>.
        </p>
      </>
    )
  },
}