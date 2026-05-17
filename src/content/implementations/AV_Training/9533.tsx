// exercise9533.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  d: number
  h: number
  r: number
  v: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9533: Exercise<DATA> = {
  title: 'Zylinder Volumen',
  source: 'Geometrie',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const d = rng.randomItemFromArray([6, 8, 10, 20, 30, 40])
    const h = rng.randomItemFromArray([10, 12, 15, 20, 50, 100])
    const r = d / 2
    const v = round2(Math.PI * r * r * h)

    return { d, h, r, v }
  },

  originalData: {
    d: 10,
    h: 20,
    r: 5,
    v: 1570.8,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>
          Ein Zylinder hat einen Durchmesser von {data.d} cm und eine Höhe von{' '}
          {data.h} cm.
        </p>
        <p>Berechnen Sie das Volumen.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Der Radius ist die Hälfte des Durchmessers.</p>
        <InlineMath math={`r=${data.d}:2=${data.r}\\,\\mathrm{cm}`} />
        <p>Einsetzen:</p>
        <InlineMath
          math={`V=\\pi\\cdot ${data.r}^2\\cdot ${data.h}\\approx ${pp(
            data.v,
          )}\\,\\mathrm{cm}^3`}
        />
      </>
    )
  },
}