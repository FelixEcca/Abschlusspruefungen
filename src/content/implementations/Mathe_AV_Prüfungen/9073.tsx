import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  diameterCm: number
  heightCm: number
  radiusCm: number
  volumeCm3: number
  volumeLiter: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

export const exercise9073: Exercise<DATA> = {
  title: 'Teil 2: Farbeimer',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const diameterCm = rng.randomItemFromArray([30, 36, 40])
    const heightCm = rng.randomItemFromArray([35, 45, 50])
    const radiusCm = diameterCm / 2
    const volumeCm3 = round2(Math.PI * radiusCm * radiusCm * heightCm)
    const volumeLiter = round2(volumeCm3 / 1000)
    return { diameterCm, heightCm, radiusCm, volumeCm3, volumeLiter }
  },

  originalData: {
    diameterCm: 36,
    heightCm: 45,
    radiusCm: 18,
    volumeCm3: 45804.42,
    volumeLiter: 45.8,
  },

  constraint({ data }) {
    return data.volumeLiter > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein zylindrischer Eimer mit Farbe hat einen Durchmesser von{' '}
          {data.diameterCm} cm und ist {data.heightCm} cm hoch. Der Eimer ist bis
          zum Rand gefüllt.
        </p>
        <p>Berechnen Sie, wie viel Liter Farbe in dem Eimer sind.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`V=\\pi\\cdot ${data.radiusCm}^2\\cdot ${data.heightCm}=${pp(data.volumeCm3)}\\,cm^3`} />
        <p>Das sind etwa {pp(data.volumeLiter)} Liter.</p>
      </>
    )
  },
}
