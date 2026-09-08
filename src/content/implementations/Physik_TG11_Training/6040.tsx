import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  height: number
  time: number
  energy: number
  power: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6040: Exercise<DATA> = {
  title: 'Heben und Leistung vergleichen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([5, 8, 10, 12, 15, 20, 25, 30])
    const height = rng.randomItemFromArray([0.8, 1, 1.2, 1.5, 2, 2.5, 3])
    const time = rng.randomItemFromArray([2, 3, 4, 5, 8, 10])
    const energy = round2(mass * 9.81 * height)
    const power = round2(energy / time)
    return { mass, height, time, energy, power }
  },

  originalData: {
    mass: 10,
    height: 2,
    time: 4,
    energy: 196.2,
    power: 49.05,
  },

  constraint({ data }) {
    return data.mass > 0 && data.height > 0 && data.time > 0
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
            <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> wird um{' '}
            <InlineMath math={`h=${pp(data.height)}\\,\\mathrm m`} /> angehoben.
            Berechne die dafür notwendige Energie.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`E_\\mathrm{pot}=m\\cdot g\\cdot h`} />
            <br />
            <InlineMath
              math={`E_\\mathrm{pot}=${pp(
                data.mass,
              )}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot${pp(
                data.height,
              )}\\,\\mathrm m\\approx${pp(data.energy)}\\,\\mathrm J`}
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
            Das Anheben dauert <InlineMath math={`${pp(data.time)}\\,\\mathrm s`} />.
            Berechne die mittlere Leistung.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`P=\\tfrac{E}{t}`} />
            <br />
            <InlineMath
              math={`P=\\tfrac{${pp(data.energy)}\\,\\mathrm J}{${pp(
                data.time,
              )}\\,\\mathrm s}\\approx ${pp(data.power)}\\,\\mathrm W`}
            />
          </>
        )
      },
    },
  ],
}
