import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'

interface DATA {
  v1: number
  x01: number
  v2: number
  x02: number
  tMeet: number
}

export const exercise8003: Exercise<DATA> = {
  title: 'Treffpunkt zweier Fahrer',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    const tMeet = rng.randomItemFromArray([8, 10, 12, 15, 20])
    const v1 = rng.randomItemFromArray([6, 8, 10, 12, 15])
    const v2 = rng.randomItemFromArray([2, 3, 4, 5])
    const x01 = rng.randomItemFromArray([10, 20, 30, 50])
    const x02 = x01 + (v1 - v2) * tMeet
    return { v1, x01, v2, x02, tMeet }
  },
  originalData: { v1: 10, x01: 20, v2: 4, x02: 80, tMeet: 10 },
  task({ data }) {
    return (
      <>
        <p>Zwei Fahrer bewegen sich auf derselben geraden Strecke.</p>
        <p>
          Fahrer A: <InlineMath math={`x_A(t)=${pp(data.v1)}\\,${unit('m/s')}\\cdot t+${pp(data.x01)}\\,${unit('m')}`} />
          <br />
          Fahrer B: <InlineMath math={`x_B(t)=${pp(data.v2)}\\,${unit('m/s')}\\cdot t+${pp(data.x02)}\\,${unit('m')}`} />
        </p>
        <p><InlineMath math="t" /> wird in Sekunden eingesetzt.</p>
        <p>Bestimme, wann und wo sie sich treffen.</p>
      </>
    )
  },
  solution({ data }) {
    const xMeet = round2(data.x01 + data.v1 * data.tMeet)
    return (
      <>
        <p>Am Treffpunkt sind die Orte gleich:</p>
        <p>
          <InlineMath math={`${pp(data.v1)}\\,${unit('m/s')}\\cdot t+${pp(data.x01)}\\,${unit('m')}=${pp(data.v2)}\\,${unit('m/s')}\\cdot t+${pp(data.x02)}\\,${unit('m')}`} />
        </p>
        <p>
          <InlineMath math={`${pp(data.v1 - data.v2)}\\,${unit('m/s')}\\cdot t=${pp(data.x02 - data.x01)}\\,${unit('m')}`} />, also{' '}
          <InlineMath math={`t=${pp(data.tMeet)}\\,${unit('s')}`} />.
        </p>
        <p>
          <InlineMath math={`x=${pp(data.v1)}\\,${unit('m/s')}\\cdot ${pp(data.tMeet)}\\,${unit('s')}+${pp(data.x01)}\\,${unit('m')}=${pp(xMeet)}\\,${unit('m')}`} />
        </p>
      </>
    )
  },
}
