// exercise9584.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  r: number
  h: number
  unit: Unit
  surface: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9584: Exercise<DATA> = {
  title: 'Oberfläche Zylinder',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const h = rng.randomItemFromArray([5, 6, 8, 10, 12, 15])
    const surface = round2(2 * Math.PI * r * r + 2 * Math.PI * r * h)

    return { r, h, unit, surface }
  },

  originalData: {
    r: 4,
    h: 10,
    unit: 'cm',
    surface: 351.86,
  },

  constraint({ data }) {
    return data.surface > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Oberfläche des Zylinders.</p>

        <svg viewBox="0 0 260 210">
          <ellipse cx="130" cy="55" rx="60" ry="20" fill="#ddd" stroke="black" />
          <rect x="70" y="55" width="120" height="100" fill="#eee" stroke="black" />
          <ellipse cx="130" cy="155" rx="60" ry="20" fill="#eee" stroke="black" />
          <line x1="130" y1="55" x2="190" y2="55" stroke="black" />
          <text x="150" y="48" fontSize="14">
            r = {pp(data.r)} {data.unit}
          </text>
          <text x="198" y="110" fontSize="14">
            h = {pp(data.h)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die Oberfläche besteht aus zwei Kreisflächen und dem Mantel.</p>
        <InlineMath math={`O=2\\cdot \\pi\\cdot r^2+2\\cdot \\pi\\cdot r\\cdot h`} />
        <p>Einsetzen:</p>
        <InlineMath
          math={`O=2\\cdot \\pi\\cdot ${pp(data.r)}^2+2\\cdot \\pi\\cdot ${pp(data.r)}\\cdot ${pp(data.h)}`}
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