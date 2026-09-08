import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  v1: number
  v2: number
  dt: number
  a: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6025: Exercise<DATA> = {
  title: 'Beschleunigung aus Messwerten',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const v1 = rng.randomItemFromArray([0, 2, 4, 6, 8, 10])
    const dt = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const a = rng.randomItemFromArray([0.5, 1, 1.5, 2, 2.5, 3])
    const v2 = round2(v1 + a * dt)
    return { v1, v2, dt, a }
  },

  originalData: {
    v1: 4,
    v2: 13,
    dt: 6,
    a: 1.5,
  },

  constraint({ data }) {
    return data.v2 > data.v1 && data.dt > 0 && data.a > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Wagen wird gleichmäßig beschleunigt. Zu Beginn des betrachteten
          Zeitabschnitts beträgt seine Geschwindigkeit{' '}
          <InlineMath math={`v_1=${pp(data.v1)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />
          . Nach <InlineMath math={`${pp(data.dt)}\\,\\mathrm s`} /> beträgt sie{' '}
          <InlineMath math={`v_2=${pp(data.v2)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />
          .
        </p>
        <p>
          Berechne die Beschleunigung <InlineMath math="a" />.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die Beschleunigung beschreibt die Änderung der Geschwindigkeit pro Zeit:</p>
        <InlineMath math={`a = \\tfrac{\\Delta v}{\\Delta t}`} />
        <br />
        <InlineMath
          math={`a = \\tfrac{${pp(
            data.v2,
          )}\\,\\tfrac{\\mathrm m}{\\mathrm s}-${pp(
            data.v1,
          )}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(
            data.dt,
          )}\\,\\mathrm s}`}
        />
        <br />
        <InlineMath math={`a = ${pp(data.a)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`} />
      </>
    )
  },
}
