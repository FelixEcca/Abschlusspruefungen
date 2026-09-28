import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { round2, unit } from './motion-helpers'

interface DATA {
  v: number
  x0: number
  positionTime: number
  targetTime: number
}

export const exercise8002: Exercise<DATA> = {
  title: 'Bewegungsgleichung gleichförmig anwenden',
  source: '1BK1T GT',
  useCalculator: true,
  duration: 14,
  generator(rng) {
    const v = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const x0 = rng.randomItemFromArray([5, 10, 20, 50])
    const positionTime = rng.randomItemFromArray([5, 8, 10, 12])
    const targetTime = rng.randomItemFromArray([6, 10, 12, 15])
    return { v, x0, positionTime, targetTime }
  },
  originalData: { v: 4, x0: 20, positionTime: 8, targetTime: 15 },
  intro({ data }) {
    return (
      <p>
        Ein Fahrzeug startet am Ort <InlineMath math={`x_0=${pp(data.x0)}\\,${unit('m')}`} /> und fährt gleichförmig mit{' '}
        <InlineMath math={`v=${pp(data.v)}\\,${unit('m/s')}`} />.
      </p>
    )
  },
  tasks: [
    {
      points: 4,
      duration: 4,
      intro() {
        return null
      },
      task() {
        return <p>Stelle die Bewegungsgleichung auf.</p>
      },
      solution({ data }) {
        return (
          <>
            <p>Für eine gleichförmige Bewegung gilt <InlineMath math="x(t)=v\\cdot t+x_0" />.</p>
            <p>
              <InlineMath math={`x(t)=${pp(data.v)}\\,${unit('m/s')}\\cdot t+${pp(data.x0)}\\,${unit('m')}`} />, wobei <InlineMath math="t" /> in Sekunden eingesetzt wird.
            </p>
          </>
        )
      },
    },
    {
      points: 4,
      duration: 5,
      intro() {
        return null
      },
      task({ data }) {
        return <p>Berechne den Ort nach <InlineMath math={`${pp(data.positionTime)}\\,${unit('s')}`} />.</p>
      },
      solution({ data }) {
        const positionX = data.x0 + data.v * data.positionTime
        return (
          <p>
            <InlineMath math={`x(${pp(data.positionTime)}\\,${unit('s')})=${pp(data.v)}\\,${unit('m/s')}\\cdot ${pp(data.positionTime)}\\,${unit('s')}+${pp(data.x0)}\\,${unit('m')}=${pp(positionX)}\\,${unit('m')}`} />
          </p>
        )
      },
    },
    {
      points: 4,
      duration: 5,
      intro() {
        return null
      },
      task({ data }) {
        const targetX = data.x0 + data.v * data.targetTime
        return <p>Berechne, nach welcher Zeit das Fahrzeug den Ort <InlineMath math={`x=${pp(targetX)}\\,${unit('m')}`} /> erreicht.</p>
      },
      solution({ data }) {
        const targetX = data.x0 + data.v * data.targetTime
        return (
          <>
            <p>
              <InlineMath math={`${pp(targetX)}\\,${unit('m')}=${pp(data.v)}\\,${unit('m/s')}\\cdot t+${pp(data.x0)}\\,${unit('m')}`} />
            </p>
            <p>
              <InlineMath math={`t=\\frac{${pp(targetX)}\\,${unit('m')}-${pp(data.x0)}\\,${unit('m')}}{${pp(data.v)}\\,${unit('m/s')}}=${pp(round2(data.targetTime))}\\,${unit('s')}`} />
            </p>
          </>
        )
      },
    },
  ],
}
