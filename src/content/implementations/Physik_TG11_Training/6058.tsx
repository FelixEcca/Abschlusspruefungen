import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  airResistance: number
  weight: number
  netForce: number
  acceleration: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6058: Exercise<DATA> = {
  title: 'Fallschirmspringer mit Kräften untersuchen',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([60, 70, 80, 90])
    const weight = round2(mass * 9.81)
    const airResistance = rng.randomItemFromArray([200, 350, 500, 650])
    const netForce = round2(weight - airResistance)
    const acceleration = round2(netForce / mass)

    return { mass, airResistance, weight, netForce, acceleration }
  },

  originalData: {
    mass: 80,
    airResistance: 500,
    weight: 784.8,
    netForce: 284.8,
    acceleration: 3.56,
  },

  constraint({ data }) {
    return data.weight > data.airResistance && data.acceleration > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Fallschirmspringer mit{' '}
          <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> fällt nach unten.
          Die Luftwiderstandskraft wirkt nach oben und beträgt{' '}
          <InlineMath math={`F_\\mathrm L=${pp(data.airResistance)}\\,\\mathrm N`} />.
        </p>
        <p>
          Berechne die Gewichtskraft, die resultierende Kraft und die
          Beschleunigung nach unten.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`F_\\mathrm G=m\\cdot g=${pp(data.mass)}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\approx${pp(data.weight)}\\,\\mathrm N`}
        />
        <br />
        <InlineMath
          math={`F_\\mathrm{res}=F_\\mathrm G-F_\\mathrm L=${pp(data.weight)}\\,\\mathrm N-${pp(data.airResistance)}\\,\\mathrm N=${pp(data.netForce)}\\,\\mathrm N`}
        />
        <br />
        <InlineMath
          math={`a=\\tfrac{F_\\mathrm{res}}{m}=\\tfrac{${pp(data.netForce)}\\,\\mathrm N}{${pp(data.mass)}\\,\\mathrm{kg}}\\approx${pp(data.acceleration)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
        />
      </>
    )
  },
}
