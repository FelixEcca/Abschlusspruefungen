import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  force: number
  v0: number
  v1: number
  time: number
  acceleration: number
  mass: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6057: Exercise<DATA> = {
  title: 'Masse aus Beschleunigungsmessung bestimmen',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([2, 4, 5, 8, 10, 20])
    const acceleration = rng.randomItemFromArray([0.5, 1, 1.5, 2, 2.5])
    const time = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const v0 = rng.randomItemFromArray([0, 1, 2])
    const v1 = round2(v0 + acceleration * time)
    const force = round2(mass * acceleration)

    return { force, v0, v1, time, acceleration, mass }
  },

  originalData: {
    force: 16,
    v0: 1,
    v1: 5,
    time: 2,
    acceleration: 2,
    mass: 8,
  },

  constraint({ data }) {
    return data.v1 > data.v0 && data.time > 0 && data.force > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Rollwagen wird mit einer konstanten resultierenden Kraft von{' '}
          <InlineMath math={`F_\\mathrm{res}=${pp(data.force)}\\,\\mathrm N`} /> gezogen.
          Die Masse des Rollwagens ist unbekannt.
        </p>
        <p>
          Zu Beginn beträgt die Geschwindigkeit{' '}
          <InlineMath math={`v_0=${pp(data.v0)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />.
          Nach <InlineMath math={`${pp(data.time)}\\,\\mathrm s`} /> beträgt sie{' '}
          <InlineMath math={`v_1=${pp(data.v1)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />.
          Berechne zuerst die Beschleunigung <InlineMath math="a" /> und damit
          anschließend die Masse <InlineMath math="m" />.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`a=\\tfrac{\\Delta v}{\\Delta t}`} />
        <br />
        <InlineMath
          math={`a=\\tfrac{${pp(data.v1)}\\,\\tfrac{\\mathrm m}{\\mathrm s}-${pp(data.v0)}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(data.time)}\\,\\mathrm s}=${pp(data.acceleration)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
        />
        <br />
        <InlineMath math={`F_\\mathrm{res}=m\\cdot a`} />
        <br />
        <InlineMath
          math={`m=\\tfrac{F_\\mathrm{res}}{a}=\\tfrac{${pp(data.force)}\\,\\mathrm N}{${pp(data.acceleration)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}=${pp(data.mass)}\\,\\mathrm{kg}`}
        />
      </>
    )
  },
}
