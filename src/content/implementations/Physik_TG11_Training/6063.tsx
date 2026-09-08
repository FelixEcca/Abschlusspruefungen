import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  force: number
  distance: number
  time: number
  work: number
  power: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6063: Exercise<DATA> = {
  title: 'Mechanische Leistung berechnen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const force = rng.randomItemFromArray([50, 80, 100, 150, 200, 300])
    const distance = rng.randomItemFromArray([2, 4, 5, 8, 10, 12])
    const time = rng.randomItemFromArray([2, 4, 5, 8, 10, 20])
    const work = round2(force * distance)
    const power = round2(work / time)

    return { force, distance, time, work, power }
  },

  originalData: {
    force: 150,
    distance: 8,
    time: 10,
    work: 1200,
    power: 120,
  },

  constraint({ data }) {
    return data.force > 0 && data.distance > 0 && data.time > 0
  },

  task({ data }) {
    return (
      <p>
        Eine Maschine zieht eine Last mit{' '}
        <InlineMath math={`F=${pp(data.force)}\\,\\mathrm N`} /> über eine
        Strecke von <InlineMath math={`s=${pp(data.distance)}\\,\\mathrm m`} />.
        Der Vorgang dauert{' '}
        <InlineMath math={`t=${pp(data.time)}\\,\\mathrm s`} />. Berechne die
        Leistung <InlineMath math="P" />.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`\\Delta E=F\\cdot s=${pp(data.force)}\\,\\mathrm N\\cdot${pp(data.distance)}\\,\\mathrm m=${pp(data.work)}\\,\\mathrm J`}
        />
        <br />
        <InlineMath
          math={`P=\\tfrac{W}{t}=\\tfrac{${pp(data.work)}\\,\\mathrm J}{${pp(data.time)}\\,\\mathrm s}=${pp(data.power)}\\,\\mathrm W`}
        />
      </>
    )
  },
}
