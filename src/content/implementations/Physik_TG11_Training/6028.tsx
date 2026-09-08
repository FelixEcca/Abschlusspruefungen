import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  v0: number
  tUp: number
  hMax: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6028: Exercise<DATA> = {
  title: 'Senkrechter Wurf nach oben',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const v0 = rng.randomItemFromArray([6, 8, 10, 12, 15, 18, 20])
    const tUp = round2(v0 / 9.81)
    const hMax = round2((v0 * v0) / (2 * 9.81))
    return { v0, tUp, hMax }
  },

  originalData: {
    v0: 12,
    tUp: 1.22,
    hMax: 7.34,
  },

  constraint({ data }) {
    return data.v0 > 0 && data.tUp > 0 && data.hMax > 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Ein Ball wird mit{' '}
            <InlineMath
              math={`v_0=${pp(data.v0)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />{' '}
            senkrecht nach oben geworfen. Berechne die Zeit bis zum höchsten
            Punkt.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Durch die Erdbeschleunigung wird der Ball gebremst:</p>
            <InlineMath math={`v=g\\cdot t`} />
            <br />
            <InlineMath math={`t=\\tfrac{v}{g}`} />
            <br />
            <InlineMath
              math={`t=\\tfrac{${pp(
                data.v0,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}\\approx ${pp(
                data.tUp,
              )}\\,\\mathrm s`}
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
            Ein Ball wird mit{' '}
            <InlineMath
              math={`v_0=${pp(data.v0)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />{' '}
            senkrecht nach oben geworfen. Berechne die maximale Höhe über dem
            Abwurfpunkt.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Für die zurückgelegte Strecke in der verzögerten Bewegung gilt:
            </p>
            <InlineMath math={`s(t)=v_0\\cdot t-\\tfrac12\\cdot g\\cdot t^2`} />
            <p>Setze die Zeit bis zum höchsten Punkt ein:</p>
            <InlineMath
              math={`h_{max}=${pp(
                data.v0,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot ${pp(
                data.tUp,
              )}\\,\\mathrm s-\\tfrac12\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot (${pp(
                data.tUp,
              )}\\,\\mathrm s)^2`}
            />
            <br></br>
            <InlineMath
              math={`h_{max}\\approx ${pp(data.hMax)}\\,\\mathrm m`}
            />
          </>
        )
      },
    },
  ],
}
