import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  height: number
  energy: number
  speed: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6061: Exercise<DATA> = {
  title: 'Energieerhaltung bei Höhenänderung anwenden',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([1, 2, 5, 10, 20])
    const height = rng.randomItemFromArray([0.5, 1, 1.5, 2, 3, 4])
    const energy = round2(mass * 9.81 * height)
    const speed = round2(Math.sqrt(2 * 9.81 * height))

    return { mass, height, energy, speed }
  },

  originalData: {
    mass: 5,
    height: 2,
    energy: 98.1,
    speed: 6.26,
  },

  constraint({ data }) {
    return data.mass > 0 && data.height > 0 && data.energy > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Wagen mit <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> rollt
          reibungsfrei aus einer Höhe von{' '}
          <InlineMath math={`h=${pp(data.height)}\\,\\mathrm m`} /> nach unten.
        </p>
        <p>
          Berechne die verlorene Lageenergie und die Geschwindigkeit unten.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`E_\\mathrm{pot}=mgh=${pp(data.mass)}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot${pp(data.height)}\\,\\mathrm m\\approx${pp(data.energy)}\\,\\mathrm J`}
        />
        <br />
        <InlineMath math={`mgh=\\tfrac12mv^2`} />
        <br />
        <InlineMath
          math={`v=\\sqrt{2gh}=\\sqrt{2\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot${pp(data.height)}\\,\\mathrm m}\\approx${pp(data.speed)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
        />
      </>
    )
  },
}
