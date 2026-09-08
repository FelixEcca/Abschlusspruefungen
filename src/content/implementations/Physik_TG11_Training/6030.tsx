import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  vx: number
  vy: number
  width: number
  time: number
  drift: number
  speed: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6030: Exercise<DATA> = {
  title: 'Bewegungen quer und längs überlagern',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const vx = rng.randomItemFromArray([1.2, 1.5, 2, 2.5, 3])
    const vy = rng.randomItemFromArray([0.4, 0.6, 0.8, 1, 1.2])
    const width = rng.randomItemFromArray([12, 15, 18, 20, 24, 30])
    const time = round2(width / vx)
    const drift = round2(vy * time)
    const speed = round2(Math.sqrt(vx * vx + vy * vy))
    return { vx, vy, width, time, drift, speed }
  },

  originalData: {
    vx: 2,
    vy: 0.8,
    width: 20,
    time: 10,
    drift: 8,
    speed: 2.15,
  },

  constraint({ data }) {
    return data.vx > 0 && data.vy > 0 && data.width > 0 && data.time > 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Ein Boot fährt mit{' '}
            <InlineMath math={`v_x=${pp(data.vx)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />{' '}
            quer über einen Fluss. Der Fluss ist{' '}
            <InlineMath math={`${pp(data.width)}\\,\\mathrm m`} /> breit. Berechne die
            Überquerungszeit.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`t=\\tfrac{s_x}{v_x}`} />
            <br />
            <InlineMath
              math={`t=\\tfrac{${pp(data.width)}\\,\\mathrm m}{${pp(
                data.vx,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}}=${pp(
                data.time,
              )}\\,\\mathrm s`}
            />
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Die Strömung treibt das Boot mit{' '}
            <InlineMath math={`v_y=${pp(data.vy)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`} />{' '}
            flussabwärts. Berechne die Abdrift während der Überquerung.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`s_y=v_y\\cdot t`} />
            <br />
            <InlineMath
              math={`s_y=${pp(
                data.vy,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}\\cdot ${pp(
                data.time,
              )}\\,\\mathrm s=${pp(data.drift)}\\,\\mathrm m`}
            />
          </>
        )
      },
    },
    {
      points: 14,
      intro() {
        return null
      },
      task() {
        return <p>Berechne den Betrag der tatsächlichen Geschwindigkeit des Boots.</p>
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`v=\\sqrt{v_x^2+v_y^2}`} />
            <br />
            <InlineMath
              math={`v=\\sqrt{(${pp(
                data.vx,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s})^2+(${pp(
                data.vy,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s})^2}\\approx ${pp(
                data.speed,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />
          </>
        )
      },
    },
  ],
}
