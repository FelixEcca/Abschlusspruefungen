import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  height: number
  speed: number
  potential: number
  kinetic: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6060: Exercise<DATA> = {
  title: 'Mechanische Energieformen vergleichen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([1, 2, 5, 10, 20])
    const height = rng.randomItemFromArray([0.5, 1, 1.5, 2, 3])
    const speed = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const potential = round2(mass * 9.81 * height)
    const kinetic = round2(0.5 * mass * speed * speed)

    return { mass, height, speed, potential, kinetic }
  },

  originalData: {
    mass: 2,
    height: 3,
    speed: 5,
    potential: 58.86,
    kinetic: 25,
  },

  constraint({ data }) {
    return data.potential > 0 && data.kinetic > 0
  },

  task({ data }) {
    return (
      <p>
        Ein Körper mit <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> befindet
        sich in <InlineMath math={`h=${pp(data.height)}\\,\\mathrm m`} /> Höhe und bewegt sich
        mit <InlineMath math={`v=${pp(data.speed)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />.
        Berechne Lageenergie und Bewegungsenergie und vergleiche beide Werte.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`E_\\mathrm{pot}=mgh=${pp(data.mass)}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot${pp(data.height)}\\,\\mathrm m\\approx${pp(data.potential)}\\,\\mathrm J`}
        />
        <br />
        <InlineMath
          math={`E_\\mathrm{kin}=\\tfrac12mv^2=\\tfrac12\\cdot${pp(data.mass)}\\,\\mathrm{kg}\\cdot(${pp(data.speed)}\\,\\tfrac{\\mathrm m}{\\mathrm s})^2=${pp(data.kinetic)}\\,\\mathrm J`}
        />
        <p>
          {data.potential > data.kinetic
            ? 'Die Lageenergie ist größer als die Bewegungsenergie.'
            : 'Die Bewegungsenergie ist größer als die Lageenergie.'}
        </p>
      </>
    )
  },
}
