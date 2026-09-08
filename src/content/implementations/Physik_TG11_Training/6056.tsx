import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  context: string
  mass: number
  force: number
  acceleration: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6056: Exercise<DATA> = {
  title: 'Beschleunigung aus resultierender Kraft berechnen',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const context = rng.randomItemFromArray([
      'Ein Rollwagen wird auf einer Versuchsbahn gezogen.',
      'Ein Modellauto wird durch eine konstante Kraft beschleunigt.',
      'Ein Schlitten wird auf glattem Untergrund angeschoben.',
    ])
    const mass = rng.randomItemFromArray([2, 4, 5, 8, 10, 20])
    const acceleration = rng.randomItemFromArray([0.5, 1, 1.5, 2, 2.5, 3])
    const force = round2(mass * acceleration)

    return { context, mass, force, acceleration }
  },

  originalData: {
    context: 'Ein Rollwagen wird auf einer Versuchsbahn gezogen.',
    mass: 5,
    force: 10,
    acceleration: 2,
  },

  constraint({ data }) {
    return data.mass > 0 && data.force > 0 && data.acceleration > 0
  },

  task({ data }) {
    return (
      <p>
        {data.context} Die Masse beträgt{' '}
        <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} />. Die resultierende Kraft
        beträgt <InlineMath math={`F_\\mathrm{res}=${pp(data.force)}\\,\\mathrm N`} />.
        Berechne die Beschleunigung <InlineMath math="a" />.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`F_\\mathrm{res}=m\\cdot a`} />
        <br />
        <InlineMath math={`a=\\tfrac{F_\\mathrm{res}}{m}`} />
        <br />
        <InlineMath
          math={`a=\\tfrac{${pp(data.force)}\\,\\mathrm N}{${pp(data.mass)}\\,\\mathrm{kg}}=${pp(data.acceleration)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
        />
      </>
    )
  },
}
