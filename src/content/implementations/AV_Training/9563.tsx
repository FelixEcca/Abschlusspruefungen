// exercise9563.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  r: number
  angle: number
  arc: number
  sectorPerimeter: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9563: Exercise<DATA> = {
  title: 'Umfang eines Kreissektors',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const r = rng.randomItemFromArray([3, 4, 5, 6, 8, 10])
    const angle = rng.randomItemFromArray([45, 60, 90, 120, 180, 270])
    const arc = round2((angle / 360) * 2 * Math.PI * r)
    const sectorPerimeter = round2(arc + 2 * r)
    return { r, angle, arc, sectorPerimeter }
  },

  originalData: { r: 6, angle: 90, arc: 9.42, sectorPerimeter: 21.42 },

  constraint({ data }) {
    return data.r > 0 && data.angle > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Umfang des Kreissektors.</p>
        <p>
          Radius: {pp(data.r)} cm, Winkel: {data.angle}°
        </p>
        <svg viewBox="0 0 328 180">
          <path
            d="M164 90 L244 90 A80 80 0 0 0 164 10 Z"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />
          <text x="198" y="82" fontSize="14">
            r = {pp(data.r)} cm
          </text>
          <text x="170" y="48" fontSize="14">
            {data.angle}°
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird der Kreisbogen berechnet.</p>
        <InlineMath
          math={`b=\\frac{${data.angle}}{360}\\cdot 2\\cdot \\pi \\cdot ${pp(data.r)}\\approx ${pp(data.arc)}\\,\\mathrm{cm}`}
        />
        <p>Zum Umfang gehören der Bogen und zwei Radien.</p>
        <InlineMath
          math={`U=b+2\\cdot r=${pp(data.arc)}+2\\cdot ${pp(data.r)}\\approx ${pp(data.sectorPerimeter)}\\,\\mathrm{cm}`}
        />
      </>
    )
  },
}
