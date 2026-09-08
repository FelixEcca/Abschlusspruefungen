import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  alpha: number
  mu: number
  height: number
  weight: number
  normal: number
  friction: number
  potential: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6068: Exercise<DATA> = {
  title: 'Kraftzerlegung, Reibung und Energie verknüpfen',
  source: 'Vernetzung',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([5, 8, 10, 12, 20])
    const alpha = rng.randomItemFromArray([10, 15, 20, 25, 30])
    const mu = rng.randomItemFromArray([0.08, 0.1, 0.15, 0.2])
    const height = rng.randomItemFromArray([1, 1.5, 2, 3])
    const weight = round2(mass * 9.81)
    const normal = round2(weight * Math.cos((alpha * Math.PI) / 180))
    const friction = round2(mu * normal)
    const potential = round2(mass * 9.81 * height)

    return { mass, alpha, mu, height, weight, normal, friction, potential }
  },

  originalData: {
    mass: 10,
    alpha: 20,
    mu: 0.15,
    height: 2,
    weight: 98.1,
    normal: 92.19,
    friction: 13.83,
    potential: 196.2,
  },

  constraint({ data }) {
    return data.normal > 0 && data.friction > 0 && data.potential > 0
  },

  task({ data }) {
    return (
      <p>
        Eine Kiste mit <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> rutscht
        eine Rampe mit <InlineMath math={`\\alpha=${pp(data.alpha)}^\\circ`} /> hinunter.
        Der Reibungskoeffizient beträgt <InlineMath math={`\\mu=${pp(data.mu)}`} /> und der
        Höhenunterschied ist <InlineMath math={`h=${pp(data.height)}\\,\\mathrm m`} />.
        Berechne Normalkraft, Reibungskraft und verlorene Lageenergie.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`F_\\mathrm G=${pp(data.mass)}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\approx${pp(data.weight)}\\,\\mathrm N`}
        />
        <br />
        <InlineMath
          math={`F_\\mathrm N=F_\\mathrm G\\cdot\\cos\\alpha=${pp(data.weight)}\\,\\mathrm N\\cdot\\cos(${pp(data.alpha)}^\\circ)\\approx${pp(data.normal)}\\,\\mathrm N`}
        />
        <br />
        <InlineMath
          math={`F_\\mathrm R=\\mu\\cdot F_\\mathrm N=${pp(data.mu)}\\cdot${pp(data.normal)}\\,\\mathrm N\\approx${pp(data.friction)}\\,\\mathrm N`}
        />
        <br />
        <InlineMath
          math={`E_\\mathrm{pot}=mgh=${pp(data.mass)}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot${pp(data.height)}\\,\\mathrm m\\approx${pp(data.potential)}\\,\\mathrm J`}
        />
      </>
    )
  },
}
