import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  guests: number
  fractionBuying: number
  mlPerGlass: number
  safetyPercent: number
  glasses: number
  baseLiter: number
  totalLiter: number
}

export const exercise9065: Exercise<DATA> = {
  title: 'Teil 2: Mischgetränk planen',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const guests = rng.randomItemFromArray([200, 240, 300, 360])
    const fractionBuying = rng.randomItemFromArray([0.5, 2 / 3, 0.75])
    const mlPerGlass = rng.randomItemFromArray([150, 200, 250])
    const safetyPercent = rng.randomItemFromArray([10, 20, 25])
    const glasses = guests * fractionBuying
    const baseLiter = (glasses * mlPerGlass) / 1000
    const totalLiter = baseLiter * (1 + safetyPercent / 100)
    return { guests, fractionBuying, mlPerGlass, safetyPercent, glasses, baseLiter, totalLiter }
  },

  originalData: {
    guests: 300,
    fractionBuying: 0.5,
    mlPerGlass: 200,
    safetyPercent: 20,
    glasses: 150,
    baseLiter: 30,
    totalLiter: 36,
  },

  constraint({ data }) {
    return data.totalLiter > data.baseLiter
  },

  task({ data }) {
    return (
      <>
        <p>
          Es sind {data.guests} Gäste eingeladen. Sie rechnen damit, dass{' '}
          {data.fractionBuying === 0.5 ? 'die Hälfte' : pp(data.fractionBuying)}{' '}
          der Gäste ein Glas kaufen werden. In jedes Glas werden{' '}
          {data.mlPerGlass} ml gefüllt.
        </p>
        <p>
          Berechnen Sie, wie viel Liter Mischgetränk Sie mischen müssen, wenn
          Sie zur Sicherheit {data.safetyPercent} % mehr herstellen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`${data.guests}\\cdot ${pp(data.fractionBuying)}=${pp(data.glasses)}`} />
        <br />
        <InlineMath math={`${pp(data.glasses)}\\cdot ${data.mlPerGlass}\\,ml=${pp(data.baseLiter)}\\,l`} />
        <br />
        <InlineMath math={`${pp(data.baseLiter)}\\cdot 1,${data.safetyPercent}=${pp(data.totalLiter)}\\,l`} />
      </>
    )
  },
}
