import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  alpha: number
  mu: number
  weight: number
  normal: number
  friction: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6051: Exercise<DATA> = {
  title: 'Reibungskraft auf schiefer Ebene berechnen',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([5, 8, 10, 12, 15, 20, 25])
    const alpha = rng.randomItemFromArray([10, 15, 20, 25, 30])
    const mu = rng.randomItemFromArray([0.08, 0.1, 0.15, 0.2, 0.25])
    const weight = round2(mass * 9.81)
    const normal = round2(weight * Math.cos((alpha * Math.PI) / 180))
    const friction = round2(mu * normal)

    return { mass, alpha, mu, weight, normal, friction }
  },

  originalData: {
    mass: 12,
    alpha: 20,
    mu: 0.15,
    weight: 117.72,
    normal: 110.62,
    friction: 16.59,
  },

  constraint({ data }) {
    return data.normal > 0 && data.friction > 0 && data.weight > data.normal
  },

  task({ data }) {
    return (
      <p>
        Eine Kiste mit <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} />{' '}
        liegt auf einer Rampe mit{' '}
        <InlineMath math={`\\alpha=${pp(data.alpha)}^\\circ`} />. Der
        Reibungskoeffizient beträgt <InlineMath math={`\\mu=${pp(data.mu)}`} />.
        Berechne die Reibungskraft <InlineMath math="F_\mathrm R" />.
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
      </>
    )
  },
}
