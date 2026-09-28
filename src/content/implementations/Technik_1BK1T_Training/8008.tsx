import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'

type Target = 'v' | 'a' | 't'

interface DATA {
  target: Target
  a: number
  v0: number
  t: number
  v: number
}

export const exercise8008: Exercise<DATA> = {
  title: 'Geschwindigkeits-Zeit-Gleichung anwenden',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    const a = rng.randomItemFromArray([0.5, 1, 1.5, 2, 2.5])
    const v0 = rng.randomItemFromArray([0, 2, 4, 6])
    const t = rng.randomItemFromArray([4, 6, 8, 10, 12])
    return { target: rng.randomItemFromArray(['v', 'a', 't']), a, v0, t, v: round2(a * t + v0) }
  },
  originalData: { target: 'v', a: 1.5, v0: 2, t: 8, v: 14 },
  task({ data }) {
    if (data.target === 'v') {
      return <p>Berechne mit <InlineMath math="v=a\\cdot t+v_0" /> die Geschwindigkeit für <InlineMath math={`a=${pp(data.a)}\\,${unit('m/s^2')}`} />, <InlineMath math={`t=${pp(data.t)}\\,${unit('s')}`} /> und <InlineMath math={`v_0=${pp(data.v0)}\\,${unit('m/s')}`} />.</p>
    }
    if (data.target === 'a') {
      return <p>Bestimme die Beschleunigung bei <InlineMath math={`v=${pp(data.v)}\\,${unit('m/s')}`} />, <InlineMath math={`v_0=${pp(data.v0)}\\,${unit('m/s')}`} /> und <InlineMath math={`t=${pp(data.t)}\\,${unit('s')}`} />.</p>
    }
    return <p>Bestimme die Zeit bei <InlineMath math={`v=${pp(data.v)}\\,${unit('m/s')}`} />, <InlineMath math={`v_0=${pp(data.v0)}\\,${unit('m/s')}`} /> und <InlineMath math={`a=${pp(data.a)}\\,${unit('m/s^2')}`} />.</p>
  },
  solution({ data }) {
    if (data.target === 'v') {
      return (
        <>
          <p><InlineMath math="v=a\\cdot t+v_0" /></p>
          <p>
            <InlineMath math={`v=${pp(data.a)}\\,${unit('m/s^2')}\\cdot ${pp(data.t)}\\,${unit('s')}+${pp(data.v0)}\\,${unit('m/s')}`} />
          </p>
          <p><InlineMath math={`v=${pp(data.v)}\\,${unit('m/s')}`} /></p>
        </>
      )
    }
    if (data.target === 'a') {
      return (
        <>
          <p><InlineMath math="v=a\\cdot t+v_0" /></p>
          <p>
            <InlineMath math={`\\Delta v=${pp(data.v)}\\,${unit('m/s')}-${pp(data.v0)}\\,${unit('m/s')}=${pp(round2(data.v - data.v0))}\\,${unit('m/s')}`} />
          </p>
          <p><InlineMath math="a=\\frac{v-v_0}{t}" /></p>
          <p>
            <InlineMath math={`a=\\frac{${pp(data.v)}-${pp(data.v0)}}{${pp(data.t)}}\\,${unit('m/s^2')}=${pp(data.a)}\\,${unit('m/s^2')}`} />
          </p>
        </>
      )
    }
    return (
      <>
        <p><InlineMath math="v=a\\cdot t+v_0" /></p>
        <p>
          <InlineMath math={`\\Delta v=${pp(data.v)}\\,${unit('m/s')}-${pp(data.v0)}\\,${unit('m/s')}=${pp(round2(data.v - data.v0))}\\,${unit('m/s')}`} />
        </p>
        <p><InlineMath math="t=\\frac{v-v_0}{a}" /></p>
        <p>
          <InlineMath math={`t=\\frac{${pp(data.v)}-${pp(data.v0)}}{${pp(data.a)}}\\,${unit('s')}=${pp(data.t)}\\,${unit('s')}`} />
        </p>
      </>
    )
  },
}
