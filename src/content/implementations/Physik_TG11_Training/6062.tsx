import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mass: number
  height: number
  lossPercent: number
  potential: number
  loss: number
  useful: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6062: Exercise<DATA> = {
  title: 'Energiebilanz mit Reibungsverlusten aufstellen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mass = rng.randomItemFromArray([2, 5, 10, 15, 20])
    const height = rng.randomItemFromArray([1, 1.5, 2, 3, 4])
    const lossPercent = rng.randomItemFromArray([10, 15, 20, 25, 30])
    const potential = round2(mass * 9.81 * height)
    const loss = round2((lossPercent / 100) * potential)
    const useful = round2(potential - loss)

    return { mass, height, lossPercent, potential, loss, useful }
  },

  originalData: {
    mass: 10,
    height: 3,
    lossPercent: 20,
    potential: 294.3,
    loss: 58.86,
    useful: 235.44,
  },

  constraint({ data }) {
    return data.potential > data.loss && data.useful > 0
  },

  task({ data }) {
    return (
      <p>
        Ein Wagen mit <InlineMath math={`m=${pp(data.mass)}\\,\\mathrm{kg}`} /> rollt
        eine Rampe mit dem Höhenunterschied{' '}
        <InlineMath math={`h=${pp(data.height)}\\,\\mathrm m`} /> hinunter. Durch Reibung
        gehen <InlineMath math={`${pp(data.lossPercent)}\\,\\%`} /> der Lageenergie
        verloren. Stelle eine Energiebilanz auf und berechne die nutzbare
        Bewegungsenergie unten.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`E_\\mathrm{pot}=mgh=${pp(data.mass)}\\,\\mathrm{kg}\\cdot9{,}81\\,\\tfrac{\\mathrm m}{\\mathrm s^2}\\cdot${pp(data.height)}\\,\\mathrm m\\approx${pp(data.potential)}\\,\\mathrm J`}
        />
        <br />
        <InlineMath
          math={`E_\\mathrm{Verlust}=${pp(data.potential)}\\,\\mathrm J\\cdot\\tfrac{${pp(data.lossPercent)}}{100}\\approx${pp(data.loss)}\\,\\mathrm J`}
        />
        <br />
        <InlineMath
          math={`E_\\mathrm{kin}=E_\\mathrm{pot}-E_\\mathrm{Verlust}=${pp(data.potential)}\\,\\mathrm J-${pp(data.loss)}\\,\\mathrm J\\approx${pp(data.useful)}\\,\\mathrm J`}
        />
      </>
    )
  },
}
