// exercise9532.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Unit = 'mm' | 'cm' | 'dm' | 'm'

interface DATA {
  l: number
  w: number
  h: number
  unit: Unit
  volume: number
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9532: Exercise<DATA> = {
  title: 'Quader Volumen',
  source: 'Geometrie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['mm', 'cm', 'dm', 'm'])

    const l =
      unit === 'mm'
        ? rng.randomItemFromArray([80, 100, 120, 150, 200])
        : unit === 'cm'
          ? rng.randomItemFromArray([40, 60, 80, 100, 120])
          : unit === 'dm'
            ? rng.randomItemFromArray([4, 5, 6, 8, 10])
            : rng.randomItemFromArray([2, 3, 4, 5, 6])

    const w =
      unit === 'mm'
        ? rng.randomItemFromArray([30, 40, 50, 60, 80])
        : unit === 'cm'
          ? rng.randomItemFromArray([20, 30, 40, 50, 60])
          : unit === 'dm'
            ? rng.randomItemFromArray([2, 3, 4, 5])
            : rng.randomItemFromArray([1, 2, 3, 4])

    const h =
      unit === 'mm'
        ? rng.randomItemFromArray([20, 30, 40, 50])
        : unit === 'cm'
          ? rng.randomItemFromArray([10, 20, 30, 40, 50])
          : unit === 'dm'
            ? rng.randomItemFromArray([2, 3, 4, 5])
            : rng.randomItemFromArray([1, 2, 3])

    const volume = l * w * h

    return { l, w, h, unit, volume }
  },

  originalData: {
    l: 120,
    w: 80,
    h: 50,
    unit: 'cm',
    volume: 480000,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Quader ist {data.l} {data.unit} lang, {data.w} {data.unit} breit
          und {data.h} {data.unit} hoch.
        </p>
        <p>
          Berechnen Sie das Volumen in {data.unit}
          ³.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`V=${data.l}\\cdot ${data.w}\\cdot ${data.h}=${data.volume}\\,${unitLatex(
          data.unit,
        )}^3`}
      />
    )
  },
}