import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  mu: number
  normalForce: number
  frictionForce: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6032: Exercise<DATA> = {
  title: 'Reibung auf waagerechter Fläche',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const m = rng.randomItemFromArray([5, 8, 10, 12, 20, 25, 40, 50])
    const mu = rng.randomItemFromArray([0.08, 0.1, 0.15, 0.2, 0.25, 0.3])
    const normalForce = round2(m * 9.81)
    const frictionForce = round2(mu * normalForce)
    return { m, mu, normalForce, frictionForce }
  },

  originalData: {
    m: 20,
    mu: 0.2,
    normalForce: 196.2,
    frictionForce: 39.24,
  },

  constraint({ data }) {
    return data.m > 0 && data.mu > 0 && data.normalForce > 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Eine Kiste mit der Masse{' '}
            <InlineMath math={`m=${pp(data.m)}\\,\\mathrm{kg}`} /> liegt auf einer
            waagerechten Fläche. Berechne die Normalkraft.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`F_\\mathrm N=F_\\mathrm G=m\\cdot g`} />
            <br />
            <InlineMath
              math={`F_\\mathrm N=${pp(
                data.m,
              )}\\,\\mathrm{kg}\\cdot 9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\approx ${pp(
                data.normalForce,
              )}\\,\\mathrm N`}
            />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Der Reibungskoeffizient beträgt <InlineMath math={`\\mu=${pp(data.mu)}`} />.
            Berechne die Reibungskraft.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`F_\\mathrm R=\\mu\\cdot F_\\mathrm N`} />
            <br />
            <InlineMath math={`F_\\mathrm R=${pp(data.mu)}\\cdot ${pp(data.normalForce)}\\,\\mathrm N\\approx ${pp(data.frictionForce)}\\,\\mathrm N`} />
          </>
        )
      },
    },
  ],
}
