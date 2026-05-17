// exercise9531.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Unit = 'mm' | 'cm' | 'dm' | 'm'

interface DATA {
  length: number
  width: number
  unit: Unit
  area: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9531: Exercise<DATA> = {
  title: 'Rechteck Fläche',
  source: 'Geometrie',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['mm', 'cm', 'dm', 'm'])

    const length =
      unit === 'mm'
        ? rng.randomItemFromArray([40, 50, 60, 80, 100, 120])
        : unit === 'cm'
          ? rng.randomItemFromArray([12, 15, 20, 25, 30, 40])
          : unit === 'dm'
            ? rng.randomItemFromArray([4, 5, 6, 8, 10, 12])
            : rng.randomItemFromArray([3, 4, 5, 6, 8, 10])

    const width =
      unit === 'mm'
        ? rng.randomItemFromArray([20, 30, 40, 50, 60])
        : unit === 'cm'
          ? rng.randomItemFromArray([5, 8, 10, 12, 15])
          : unit === 'dm'
            ? rng.randomItemFromArray([2, 3, 4, 5, 6])
            : rng.randomItemFromArray([2, 3, 4, 5])

    const area = length * width

    return { length, width, unit, area }
  },

  originalData: {
    length: 8,
    width: 5,
    unit: 'm',
    area: 40,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Rechteck ist {data.length} {data.unit} lang und {data.width}{' '}
          {data.unit} breit.
        </p>
        <p>Berechnen Sie die Fläche.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`A=a\\cdot b=${data.length}\\cdot ${data.width}=${data.area}\\,${unitLatex(
          data.unit,
        )}^2`}
      />
    )
  },
}