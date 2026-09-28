import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'

interface DATA {
  a: number
  v0: number
  x0: number
  t: number
}

export const exercise8009: Exercise<DATA> = {
  title: 'Orts-Zeit-Gleichung beschleunigt anwenden',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return {
      a: rng.randomItemFromArray([0.5, 1, 1.5, 2]),
      v0: rng.randomItemFromArray([0, 2, 4, 5]),
      x0: rng.randomItemFromArray([0, 5, 10]),
      t: rng.randomItemFromArray([4, 5, 6, 8, 10]),
    }
  },
  originalData: { a: 1.5, v0: 2, x0: 5, t: 6 },
  task({ data }) {
    return (
      <p>
        Berechne den Ort nach <InlineMath math={`${pp(data.t)}\\,${unit('s')}`} /> mit{' '}
        <InlineMath math={`x=\\frac12 a t^2+v_0t+x_0`} /> für{' '}
        <InlineMath math={`a=${pp(data.a)}\\,${unit('m/s^2')}`} />,{' '}
        <InlineMath math={`v_0=${pp(data.v0)}\\,${unit('m/s')}`} /> und{' '}
        <InlineMath math={`x_0=${pp(data.x0)}\\,${unit('m')}`} />.
      </p>
    )
  },
  solution({ data }) {
    const x = round2(0.5 * data.a * data.t * data.t + data.v0 * data.t + data.x0)
    return (
      <p>
        <InlineMath math={`x=\\frac12\\cdot ${pp(data.a)}\\,${unit('m/s^2')}\\cdot (${pp(data.t)}\\,${unit('s')})^2+${pp(data.v0)}\\,${unit('m/s')}\\cdot ${pp(data.t)}\\,${unit('s')}+${pp(data.x0)}\\,${unit('m')}=${pp(x)}\\,${unit('m')}`} />
      </p>
    )
  },
}
