import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  speed: number
  impulse: number
  stopTime: number
  force: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6036: Exercise<DATA> = {
  title: 'Aufprall mit Impulsänderung',
  source: 'Impuls',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([0.05, 0.1, 0.2, 0.5, 1, 2])
    const speed = rng.randomItemFromArray([5, 8, 10, 12, 15, 20])
    const stopTime = rng.randomItemFromArray([0.02, 0.05, 0.08, 0.1, 0.2])
    const impulse = round2(mass * speed)
    const force = round2(impulse / stopTime)
    return { mass, speed, impulse, stopTime, force }
  },

  originalData: {
    mass: 0.2,
    speed: 10,
    impulse: 2,
    stopTime: 0.05,
    force: 40,
  },

  constraint({ data }) {
    return data.mass > 0 && data.speed > 0 && data.stopTime > 0
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
            Ein Ball mit der Masse{' '}
            <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> trifft mit{' '}
            <InlineMath math={`v=${pp(data.speed)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />{' '}
            auf eine Wand und bleibt kurzzeitig stehen. Berechne die
            Impulsänderung im Betrag.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`\\Delta p=m\\cdot\\Delta v`} />
            <br />
            <InlineMath
              math={`\\Delta p=${pp(data.mass)}\\,\\mathrm{kg}\\cdot ${pp(
                data.speed,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}=${pp(
                data.impulse,
              )}\\,\\mathrm{kg}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
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
            Der Abbremsvorgang dauert{' '}
            <InlineMath math={`${pp(data.stopTime)}\\,\\mathrm s`} />. Berechne die
            mittlere Kraft auf den Ball.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`F=\\tfrac{\\Delta p}{\\Delta t}`} />
            <br />
            <InlineMath
              math={`F=\\tfrac{${pp(
                data.impulse,
              )}\\,\\mathrm{kg}\\,\\tfrac{\\mathrm m}{\\mathrm s}}{${pp(
                data.stopTime,
              )}\\,\\mathrm s}=${pp(data.force)}\\,\\mathrm N`}
            />
          </>
        )
      },
    },
  ],
}
