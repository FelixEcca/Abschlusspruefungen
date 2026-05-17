// exercise9531.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  length: number
  width: number
  area: number
}

export const exercise9531: Exercise<DATA> = {
  title: 'Rechteck Fläche',
  source: 'Geometrie',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const length = rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
    const width = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const area = length * width

    return { length, width, area }
  },

  originalData: {
    length: 8,
    width: 5,
    area: 40,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Rechteck ist {data.length} m lang und {data.width} m breit.
        </p>
        <p>Berechnen Sie die Fläche.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`A=a\\cdot b=${data.length}\\cdot ${data.width}=${data.area}\\,\\mathrm{m}^2`}
      />
    )
  },
}