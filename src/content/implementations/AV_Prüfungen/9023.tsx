// exercise9023.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  lengthM: number
  diameterCm: number
  volumeM3: number
  trailerVolume: number
  density: number
  weight: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9023: Exercise<DATA> = {
  title: 'Teil 2: Holzstamm',
  source: '2025',
  useCalculator: true,
  duration: 42,

  intro() {
    return null
  },

  generator(rng) {
    const lengthM = rng.randomItemFromArray([8, 10, 12, 15, 18])
    const diameterCm = rng.randomItemFromArray([50, 60, 74, 80, 90])
    const r = diameterCm / 100 / 2
    const volumeM3 = round2(Math.PI * r * r * lengthM)

    const trailerVolume = rng.randomItemFromArray([8.5, 12.4, 18.7, 22.5])
    const density = rng.randomItemFromArray([650, 700, 720, 760])
    const weight = round2(trailerVolume * density)

    return { lengthM, diameterCm, volumeM3, trailerVolume, density, weight }
  },

  originalData: {
    lengthM: 15,
    diameterCm: 74,
    volumeM3: 6.45,
    trailerVolume: 18.7,
    density: 720,
    weight: 13464,
  },

  constraint({ data }) {
    return data.volumeM3 > 0 && data.weight > 0
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Sie haben einen {data.lengthM} m langen Baumstamm. Der Stamm ist
              zylinderförmig und hat einen Durchmesser von {data.diameterCm} cm.
            </p>

            <svg viewBox="0 0 328 180">
              <ellipse
                cx="85"
                cy="95"
                rx="35"
                ry="45"
                fill="#ddd"
                stroke="black"
              />
              <path
                d="M85 50 L225 25 Q270 55 225 105 L85 140"
                fill="#ccc"
                stroke="black"
              />
              <ellipse
                cx="225"
                cy="65"
                rx="35"
                ry="45"
                fill="#ddd"
                stroke="black"
              />
              <text x="150" y="150" fontSize="14">
                {data.lengthM} m
              </text>
              <text x="20" y="105" fontSize="14">
                {data.diameterCm} cm
              </text>
            </svg>

            <p>Berechnen Sie das Volumen des Stamms in m³.</p>
          </>
        )
      },
      solution({ data }) {
        const r = data.diameterCm / 100 / 2
        return (
          <>
            <p>Der Radius ist die Hälfte des Durchmessers.</p>
            <InlineMath
              math={`r=\\frac{${data.diameterCm}\\,\\mathrm{cm}}{2}=${pp(
                r,
              )}\\,\\mathrm{m}`}
            />
            <br />
            <InlineMath
              math={`V=\\pi\\cdot r^2\\cdot h=\\pi\\cdot ${pp(
                r,
              )}^2\\cdot ${data.lengthM}\\approx ${pp(data.volumeM3)}\\,\\mathrm{m}^3`}
            />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Am Ende liegen auf einem Anhänger {pp(data.trailerVolume)} m³ Holz.
            1 m³ Holz wiegt {data.density} kg. Berechnen Sie, wie viel das Holz
            auf dem Anhänger wiegt.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`${pp(data.trailerVolume)}\\cdot ${data.density}=${pp(
                data.weight,
              )}\\,\\mathrm{kg}`}
            />
            <p>
              Das Holz wiegt <b>{pp(data.weight)} kg</b>.
            </p>
          </>
        )
      },
    },
  ],
}
