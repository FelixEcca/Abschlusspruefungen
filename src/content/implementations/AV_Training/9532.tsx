// exercise9532.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  l: number
  w: number
  h: number
  volume: number
}

export const exercise9532: Exercise<DATA> = {
  title: 'Quader Volumen',
  source: 'Geometrie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const l = rng.randomItemFromArray([80, 100, 120, 150, 200])
    const w = rng.randomItemFromArray([40, 60, 80, 100])
    const h = rng.randomItemFromArray([30, 40, 50, 60])
    const volume = l * w * h

    return { l, w, h, volume }
  },

  originalData: {
    l: 120,
    w: 80,
    h: 50,
    volume: 480000,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Quader ist {data.l} cm lang, {data.w} cm breit und {data.h} cm
          hoch.
        </p>
        <p>Berechnen Sie das Volumen in cm³.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`V=${data.l}\\cdot ${data.w}\\cdot ${data.h}=${data.volume}\\,\\mathrm{cm}^3`}
      />
    )
  },
}