import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  powerA: number
  efficiencyA: number
  powerB: number
  efficiencyB: number
  usefulA: number
  usefulB: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6066: Exercise<DATA> = {
  title: 'Systemleistung bewerten und begründen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const powerA = rng.randomItemFromArray([400, 600, 800, 1000])
    const efficiencyA = rng.randomItemFromArray([30, 40, 50])
    const powerB = rng.randomItemFromArray([300, 500, 700])
    const efficiencyB = rng.randomItemFromArray([70, 80, 90])
    const usefulA = round2(powerA * efficiencyA / 100)
    const usefulB = round2(powerB * efficiencyB / 100)

    return { powerA, efficiencyA, powerB, efficiencyB, usefulA, usefulB }
  },

  originalData: {
    powerA: 800,
    efficiencyA: 40,
    powerB: 500,
    efficiencyB: 80,
    usefulA: 320,
    usefulB: 400,
  },

  constraint({ data }) {
    return data.usefulA > 0 && data.usefulB > 0 && data.usefulA !== data.usefulB
  },

  task({ data }) {
    return (
      <p>
        Zwei Maschinen sollen verglichen werden. Maschine A nimmt{' '}
        <InlineMath math={`P_\\mathrm{zu,A}=${pp(data.powerA)}\\,\\mathrm W`} /> auf und hat
        einen Wirkungsgrad von <InlineMath math={`${pp(data.efficiencyA)}\\,\\%`} />.
        Maschine B nimmt <InlineMath math={`P_\\mathrm{zu,B}=${pp(data.powerB)}\\,\\mathrm W`} /> auf
        und hat einen Wirkungsgrad von <InlineMath math={`${pp(data.efficiencyB)}\\,\\%`} />.
        Berechne die Nutzleistung und bewerte, welche Maschine für nutzbare
        Arbeit besser geeignet ist.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`P_\\mathrm{nutz,A}=P_\\mathrm{zu,A}\\cdot\\tfrac{\\eta_A}{100}=${pp(data.powerA)}\\,\\mathrm W\\cdot\\tfrac{${pp(data.efficiencyA)}}{100}=${pp(data.usefulA)}\\,\\mathrm W`}
        />
        <br />
        <InlineMath
          math={`P_\\mathrm{nutz,B}=P_\\mathrm{zu,B}\\cdot\\tfrac{\\eta_B}{100}=${pp(data.powerB)}\\,\\mathrm W\\cdot\\tfrac{${pp(data.efficiencyB)}}{100}=${pp(data.usefulB)}\\,\\mathrm W`}
        />
        <p>
          {data.usefulA > data.usefulB
            ? 'Maschine A liefert die größere Nutzleistung.'
            : 'Maschine B liefert die größere Nutzleistung.'}
        </p>
      </>
    )
  },
}
