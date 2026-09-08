import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  voltage: number
  current: number
  power: number
  time: number
  energy: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6064: Exercise<DATA> = {
  title: 'Elektrische Leistung berechnen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const voltage = rng.randomItemFromArray([6, 12, 24, 48, 230])
    const current = rng.randomItemFromArray([0.5, 1, 1.5, 2, 3, 5])
    const time = rng.randomItemFromArray([10, 20, 30, 60, 120])
    const power = round2(voltage * current)
    const energy = round2(power * time)

    return { voltage, current, power, time, energy }
  },

  originalData: {
    voltage: 12,
    current: 2,
    power: 24,
    time: 60,
    energy: 1440,
  },

  constraint({ data }) {
    return data.voltage > 0 && data.current > 0 && data.power > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          An einem elektrischen Gerät liegen{' '}
          <InlineMath math={`U=${pp(data.voltage)}\\,\\mathrm V`} /> an. Es fließt ein Strom
          von <InlineMath math={`I=${pp(data.current)}\\,\\mathrm A`} />.
        </p>
        <p>
          Berechne die elektrische Leistung <InlineMath math="P" />. Berechne
          anschließend die umgesetzte Energie, wenn das Gerät{' '}
          <InlineMath math={`${pp(data.time)}\\,\\mathrm s`} /> betrieben wird.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`P=U\\cdot I=${pp(data.voltage)}\\,\\mathrm V\\cdot${pp(data.current)}\\,\\mathrm A=${pp(data.power)}\\,\\mathrm W`}
        />
        <br />
        <InlineMath
          math={`E=P\\cdot t=${pp(data.power)}\\,\\mathrm W\\cdot${pp(data.time)}\\,\\mathrm s=${pp(data.energy)}\\,\\mathrm J`}
        />
      </>
    )
  },
}
