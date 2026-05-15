// exercise9021.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  lengthCm: number
  widthCm: number
  heightCm: number
  volumeDm3: number
}

export const exercise9021: Exercise<DATA> = {
  title: 'Teil 2: Raumvolumen',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const lengthCm = rng.randomItemFromArray([240, 300, 360, 420])
    const widthCm = rng.randomItemFromArray([80, 100, 120, 140])
    const heightCm = rng.randomItemFromArray([60, 80, 100, 120])
    const volumeDm3 = (lengthCm * widthCm * heightCm) / 1000

    return { lengthCm, widthCm, heightCm, volumeDm3 }
  },

  originalData: {
    lengthCm: 360,
    widthCm: 120,
    heightCm: 100,
    volumeDm3: 4320,
  },

  constraint({ data }) {
    return data.volumeDm3 > 0
  },

  task({ data }) {
    return (
      <>
        <p>Die Holzbretter wurden in Stapeln geliefert.</p>

        <svg viewBox="0 0 328 190">
          <polygon
            points="60,130 220,130 270,85 110,85"
            fill="#ddd"
            stroke="black"
          />
          <polygon
            points="60,130 110,85 110,40 60,85"
            fill="#bbb"
            stroke="black"
          />
          <polygon
            points="110,40 270,40 270,85 110,85"
            fill="#ccc"
            stroke="black"
          />
          <line x1="60" y1="145" x2="220" y2="145" stroke="black" />
          <line x1="220" y1="145" x2="270" y2="100" stroke="black" />
          <line x1="45" y1="130" x2="45" y2="85" stroke="black" />
          <text x="115" y="165" fontSize="14">
            {data.widthCm} cm
          </text>
          <text x="230" y="135" fontSize="14">
            {data.lengthCm} cm
          </text>
          <text x="10" y="110" fontSize="14">
            {data.heightCm} cm
          </text>
        </svg>

        <p>Berechnen Sie das Raumvolumen des dargestellten Stapels in dm³.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Das Volumen wird zuerst in cm³ berechnet.</p>
        <InlineMath
          math={`${data.lengthCm}\\cdot ${data.widthCm}\\cdot ${data.heightCm}=${data.lengthCm * data.widthCm * data.heightCm}\\,\\mathrm{cm}^3`}
        />
        <p>Umrechnung in dm³:</p>
        <InlineMath
          math={`${data.lengthCm * data.widthCm * data.heightCm}:1000=${pp(
            data.volumeDm3,
          )}\\,\\mathrm{dm}^3`}
        />
      </>
    )
  },
}
