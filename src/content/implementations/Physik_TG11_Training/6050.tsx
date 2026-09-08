import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  context: string
  mass: number
  mu: number
  normal: number
  friction: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6050: Exercise<DATA> = {
  title: 'Reibungskraft auf horizontaler Fläche berechnen',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const context = rng.randomItemFromArray([
      'Eine Kiste wird über den Werkstattboden gezogen.',
      'Ein Schlitten gleitet über eine ebene Fläche.',
      'Ein Werkzeugkasten wird über eine Arbeitsplatte geschoben.',
    ])
    const mass = rng.randomItemFromArray([5, 8, 10, 15, 20, 25, 40])
    const mu = rng.randomItemFromArray([0.08, 0.1, 0.15, 0.2, 0.25, 0.3])
    const normal = round2(mass * 9.81)
    const friction = round2(mu * normal)

    return { context, mass, mu, normal, friction }
  },

  originalData: {
    context: 'Eine Kiste wird über den Werkstattboden gezogen.',
    mass: 20,
    mu: 0.2,
    normal: 196.2,
    friction: 39.24,
  },

  constraint({ data }) {
    return data.mass > 0 && data.mu > 0 && data.friction > 0
  },

  task({ data }) {
    return (
      <p>
        {data.context} Die Masse beträgt{' '}
        <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} />. Der
        Reibungskoeffizient beträgt <InlineMath math={`\\mu=${pp(data.mu)}`} />.
        Berechne die Reibungskraft <InlineMath math="F_\mathrm R" />.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`F_\\mathrm N=m\\cdot g=${pp(data.mass)}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\approx${pp(data.normal)}\\,\\mathrm N`}
        />
        <br />
        <InlineMath
          math={`F_\\mathrm R=\\mu\\cdot F_\\mathrm N=${pp(data.mu)}\\cdot${pp(data.normal)}\\,\\mathrm N\\approx${pp(data.friction)}\\,\\mathrm N`}
        />
      </>
    )
  },
}
