// exercise9580.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  r: number
  h: number
  unit: Unit
  volume: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9580: Exercise<DATA> = {
  title: 'Volumen Kegel',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const h = rng.randomItemFromArray([6, 8, 10, 12, 15, 20])
    const volume = round2((Math.PI * r * r * h) / 3)

    return { r, h, unit, volume }
  },

  originalData: {
    r: 4,
    h: 12,
    unit: 'cm',
    volume: 201.06,
  },

  constraint({ data }) {
    return data.volume > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie das Volumen des Kegels.</p>

        <svg viewBox="0 0 260 190">
          <ellipse cx="130" cy="145" rx="70" ry="22" fill="#eee" stroke="black" />
          <line x1="60" y1="145" x2="130" y2="35" stroke="black" />
          <line x1="200" y1="145" x2="130" y2="35" stroke="black" />
          <line x1="130" y1="35" x2="130" y2="145" stroke="black" strokeDasharray="5 4" />
          <line x1="130" y1="145" x2="200" y2="145" stroke="black" />

          <text x="142" y="92" fontSize="14">
            h = {pp(data.h)} {data.unit}
          </text>
          <text x="158" y="137" fontSize="14">
            r = {pp(data.r)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Kegel gilt:</p>
        <InlineMath math="V=\frac{\pi\cdot r^2\cdot h}{3}" />

        <p>Einsetzen:</p>
        <InlineMath
          math={`V=\\frac{\\pi\\cdot ${pp(data.r)}^2\\cdot ${pp(
            data.h,
          )}}{3}\\approx ${pp(data.volume)}\\,\\mathrm{${data.unit}}^3`}
        />

        <p>
          Das Volumen beträgt ungefähr <b>{pp(data.volume)} {data.unit}³</b>.
        </p>
      </>
    )
  },
}