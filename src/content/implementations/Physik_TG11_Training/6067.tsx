import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  deltaV: number
  time: number
  impulseChange: number
  force: number
  acceleration: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6067: Exercise<DATA> = {
  title: 'Impuls, Kraft und Newton verknüpfen',
  source: 'Vernetzung',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([0.5, 1, 2, 5, 10])
    const deltaV = rng.randomItemFromArray([2, 4, 5, 8, 10])
    const time = rng.randomItemFromArray([0.1, 0.2, 0.4, 0.5, 1])
    const impulseChange = round2(mass * deltaV)
    const force = round2(impulseChange / time)
    const acceleration = round2(deltaV / time)

    return { mass, deltaV, time, impulseChange, force, acceleration }
  },

  originalData: {
    mass: 2,
    deltaV: 6,
    time: 0.5,
    impulseChange: 12,
    force: 24,
    acceleration: 12,
  },

  constraint({ data }) {
    return data.mass > 0 && data.time > 0 && data.force > 0
  },

  task({ data }) {
    return (
      <p>
        Ein Körper mit <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> ändert seine
        Geschwindigkeit um{' '}
        <InlineMath math={`\\Delta v=${pp(data.deltaV)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />.
        Der Vorgang dauert <InlineMath math={`\\Delta t=${pp(data.time)}\\,\\mathrm s`} />.
        Berechne die Impulsänderung, die mittlere Kraft und die Beschleunigung.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`\\Delta p=m\\cdot\\Delta v=${pp(data.mass)}\\,\\mathrm{kg}\\cdot${pp(data.deltaV)}\\,\\tfrac{\\mathrm m}{\\mathrm s}=${pp(data.impulseChange)}\\,\\mathrm{kg}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
        />
        <br />
        <InlineMath
          math={`F=\\tfrac{\\Delta p}{\\Delta t}=\\tfrac{${pp(data.impulseChange)}\\,\\mathrm{kg}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(data.time)}\\,\\mathrm s}=${pp(data.force)}\\,\\mathrm N`}
        />
        <br />
        <InlineMath
          math={`a=\\tfrac{\\Delta v}{\\Delta t}=\\tfrac{${pp(data.deltaV)}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(data.time)}\\,\\mathrm s}=${pp(data.acceleration)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
        />
      </>
    )
  },
}
