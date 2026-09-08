import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  input: number
  useful: number
  efficiency: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6065: Exercise<DATA> = {
  title: 'Wirkungsgrad aus Energie berechnen',
  source: 'Energie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const input = rng.randomItemFromArray([200, 400, 500, 800, 1000, 1500])
    const efficiency = rng.randomItemFromArray([25, 40, 50, 60, 75, 80, 90])
    const useful = round2((efficiency / 100) * input)

    return { input, useful, efficiency }
  },

  originalData: {
    input: 800,
    useful: 600,
    efficiency: 75,
  },

  constraint({ data }) {
    return data.input > data.useful && data.efficiency > 0 && data.efficiency <= 100
  },

  task({ data }) {
    return (
      <p>
        Einer Maschine werden <InlineMath math={`E_\\mathrm{zu}=${pp(data.input)}\\,\\mathrm J`} /> zugeführt.
        Davon werden <InlineMath math={`E_\\mathrm{nutz}=${pp(data.useful)}\\,\\mathrm J`} /> nutzbar umgesetzt.
        Berechne den Wirkungsgrad <InlineMath math="\\eta" />.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`\\eta=\\tfrac{E_\\mathrm{nutz}}{E_\\mathrm{zu}}\\cdot100\\,\\%`} />
        <br />
        <InlineMath
          math={`\\eta=\\tfrac{${pp(data.useful)}\\,\\mathrm J}{${pp(data.input)}\\,\\mathrm J}\\cdot100\\,\\%=${pp(data.efficiency)}\\,\\%`}
        />
      </>
    )
  },
}
