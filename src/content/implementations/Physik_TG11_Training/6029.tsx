import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  vmax: number
  tAccel: number
  tConst: number
  tBrake: number
  aAccel: number
  aBrake: number
  distance: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6029: Exercise<DATA> = {
  title: 'v-t-Diagramm einer Fahrt',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const vmax = rng.randomItemFromArray([6, 8, 10, 12, 15, 18])
    const tAccel = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const tConst = rng.randomItemFromArray([4, 5, 6, 8, 10])
    const tBrake = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const aAccel = round2(vmax / tAccel)
    const aBrake = round2(-vmax / tBrake)
    const distance = round2(
      0.5 * vmax * tAccel + vmax * tConst + 0.5 * vmax * tBrake,
    )

    return { vmax, tAccel, tConst, tBrake, aAccel, aBrake, distance }
  },

  originalData: {
    vmax: 12,
    tAccel: 4,
    tConst: 6,
    tBrake: 3,
    aAccel: 3,
    aBrake: -4,
    distance: 114,
  },

  constraint({ data }) {
    return (
      data.vmax > 0 && data.tAccel > 0 && data.tConst > 0 && data.tBrake > 0
    )
  },

  intro({ data }) {
    const x0 = 40
    const y0 = 170
    const totalTime = data.tAccel + data.tConst + data.tBrake
    const scaleX = 240 / totalTime
    const scaleY = 7
    const x1 = x0 + data.tAccel * scaleX
    const x2 = x1 + data.tConst * scaleX
    const x3 = x2 + data.tBrake * scaleX
    const yTop = y0 - data.vmax * scaleY

    return (
      <>
        <p>
          Ein Fahrzeug fährt zunächst an, fährt dann gleichförmig weiter und
          bremst am Ende ab.
        </p>
        <svg viewBox="0 0 328 200" className="my-2">
          <line x1="40" y1="170" x2="300" y2="170" stroke="black" />
          <polygon points="300,170 294,166 294,174" fill="black" />
          <text x="306" y="174" fontSize="12">
            t
          </text>
          <line x1="40" y1="170" x2="40" y2="25" stroke="black" />
          <polygon points="40,25 36,31 44,31" fill="black" />
          <text x="22" y="31" fontSize="12">
            v
          </text>
          <polyline
            points={`${x0},${y0} ${x1},${yTop} ${x2},${yTop} ${x3},${y0}`}
            fill="none"
            stroke="#007ec1"
            strokeWidth="3"
          />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Die Höchstgeschwindigkeit beträgt{' '}
            <InlineMath
              math={`v=${pp(data.vmax)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />
            . Sie wird nach{' '}
            <InlineMath math={`${pp(data.tAccel)}\\,\\mathrm s`} /> erreicht.
            Berechne die Beschleunigung beim Anfahren.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`a=\\tfrac{\\Delta v}{\\Delta t}`} />
            <br />
            <InlineMath
              math={`a=\\tfrac{${pp(
                data.vmax,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(
                data.tAccel,
              )}\\,\\mathrm s}=${pp(data.aAccel)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Das Fahrzeug bremst in{' '}
            <InlineMath math={`${pp(data.tBrake)}\\,\\mathrm s`} /> bis zum
            Stillstand. Berechne die Beschleunigung beim Bremsen.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`a=\\tfrac{0\\,\\tfrac{\\mathrm m}{\\mathrm s}-${pp(
                data.vmax,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(
                data.tBrake,
              )}\\,\\mathrm s}`}
            />
            <br />
            <InlineMath
              math={`a=${pp(data.aBrake)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
            <p>Das Minuszeichen zeigt: Die Geschwindigkeit nimmt ab.</p>
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Berechne die gesamte Strecke, wenn das Fahrzeug mittendrin{' '}
            <InlineMath math={`${pp(data.tConst)}\\,\\mathrm s`} /> gleichförmig
            fährt.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`s=\\tfrac12\\cdot a_1\\cdot t_1^2 +v\\cdot t_2+v_0\\cdot t_3-\\tfrac12\\cdot a_3\\cdot t_3^2`}
            />
            <br />
            <InlineMath
              math={`s=\\tfrac12\\cdot ${pp(
                data.aAccel,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot (${pp(
                data.tAccel,
              )}\\,\\mathrm s)^2 +${pp(
                data.vmax,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot ${pp(
                data.tConst,
              )}\\,\\mathrm s+${pp(
                data.vmax,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot ${pp(
                data.tBrake,
              )}\\,\\mathrm s-\\tfrac12\\cdot ${pp(
                -data.aBrake,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot (${pp(
                data.tBrake,
              )}\\,\\mathrm s)^2`}
            />
            <br />
            <InlineMath math={`s=${pp(data.distance)}\\,\\mathrm m`} />
          </>
        )
      },
    },
  ],
}
