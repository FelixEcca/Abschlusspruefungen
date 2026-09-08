import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  force: number
  time: number
  impulse: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6034: Exercise<DATA> = {
  title: 'Kraftstoß aus einem Zeitintervall',
  source: 'Impuls',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const force = rng.randomItemFromArray([20, 40, 50, 80, 100, 150, 200, 300])
    const time = rng.randomItemFromArray([0.05, 0.08, 0.1, 0.2, 0.3, 0.5, 0.8])
    const impulse = round2(force * time)
    return { force, time, impulse }
  },

  originalData: {
    force: 100,
    time: 0.2,
    impulse: 20,
  },

  constraint({ data }) {
    return data.force > 0 && data.time > 0 && data.impulse > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Auf einen Körper wirkt während kurzer Zeit eine annähernd konstante
          Kraft.
        </p>
        <ul className="list-disc ml-6">
          <li>
            <InlineMath math={`F=${pp(data.force)}\\,\\mathrm N`} />
          </li>
          <li>
            <InlineMath math={`\\Delta t=${pp(data.time)}\\,\\mathrm s`} />
          </li>
        </ul>
        <p>
          Berechne den Impuls <InlineMath math="p" />.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`p=F\\cdot\\Delta t`} />
        <br />
        <InlineMath
          math={`p=${pp(data.force)}\\,\\mathrm N\\cdot ${pp(data.time)}\\,\\mathrm s`}
        />
        <br />
        <InlineMath math={`p=${pp(data.impulse)}\\,\\mathrm{Ns}`} />
      </>
    )
  },
}
