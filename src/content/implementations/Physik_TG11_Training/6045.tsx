import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  height: number
  speed: number
  energy: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6045: Exercise<DATA> = {
  title: 'Energieumwandlung auf einer Rampe',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([0.5, 1, 2, 5, 10, 20])
    const height = rng.randomItemFromArray([0.5, 1, 1.5, 2, 3, 4, 5])
    const energy = round2(mass * 9.81 * height)
    const speed = round2(Math.sqrt(2 * 9.81 * height))
    return { mass, height, speed, energy }
  },

  originalData: {
    mass: 2,
    height: 3,
    speed: 7.67,
    energy: 58.86,
  },

  constraint({ data }) {
    return data.mass > 0 && data.height > 0 && data.speed > 0
  },

  intro() {
    return null
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
            Ein Wagen mit <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> rollt
            reibungsfrei eine Rampe hinab. Der Höhenunterschied beträgt{' '}
            <InlineMath math={`h=${pp(data.height)}\\,\\mathrm m`} />. Berechne die
            verlorene Lageenergie.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`E_\\mathrm{pot}=mgh`} />
            <br />
            <InlineMath
              math={`E_\\mathrm{pot}=${pp(
                data.mass,
              )}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot${pp(
                data.height,
              )}\\,\\mathrm m\\approx${pp(data.energy)}\\,\\mathrm J`}
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
            Ein Wagen rollt reibungsfrei eine Rampe mit dem Höhenunterschied{' '}
            <InlineMath math={`h=${pp(data.height)}\\,\\mathrm m`} /> hinab.
            Berechne die Geschwindigkeit unten an der Rampe.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Lageenergie wird in Bewegungsenergie umgewandelt.</p>
            <InlineMath math={`mgh=\\tfrac12mv^2`} />
            <br />
            <InlineMath math={`v=\\sqrt{2gh}`} />
            <br />
            <InlineMath
              math={`v=\\sqrt{2\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot${pp(
                data.height,
              )}\\,\\mathrm m}\\approx${pp(data.speed)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
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
      task() {
        return (
          <p>
            Beschreibe, warum die Masse bei der Geschwindigkeit unten an einer
            reibungsfreien Rampe keine Rolle spielt.
          </p>
        )
      },
      solution() {
        return (
          <p>
            In der Gleichung <InlineMath math={`mgh=\\tfrac12mv^2`} /> steht die
            Masse auf beiden Seiten und kürzt sich heraus.
          </p>
        )
      },
    },
  ],
}
