// ======================================
// 5002 — Punkte projizieren (auf Ebenen)
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x1: number
  x2: number
  x3: number
  // Zielkoordinatenebene
  plane: 'x1=0' | 'x2=0' | 'x3=0'
}

export const exercise5002: Exercise<DATA> = {
  title: 'Punkte projizieren',
  source: 'Vektoren',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const nonzero = () =>
      rng.randomIntBetween(-20,20)
    const x1 = nonzero()
    const x2 = nonzero()
    const x3 = nonzero()
    const plane = rng.randomItemFromArray(['x1=0', 'x2=0', 'x3=0'] as const)
    return { x1, x2, x3, plane }
  },

  // Beispielwerte (alle Koordinaten ≠ 0)
  originalData: { x1: 3, x2: -2, x3: 5, plane: 'x2=0' } as DATA,

  constraint({ data }) {
    // alle drei Koordinaten ungleich 0
    return data.x1 !== 0 && data.x2 !== 0 && data.x3 !== 0
  },

  task({ data }) {
    return (
      <p>
        Gegeben ist der Punkt{' '}
        <InlineMath
          math={`P\\,(${pp(data.x1)}\\mid ${pp(data.x2)}\\mid ${pp(data.x3)})`}
        />
        . Projizieren Sie <InlineMath math="P" /> auf die{' '}
        {data.plane === 'x1=0'
          ? 'x₂x₃-Ebene '
          : data.plane === 'x2=0'
            ? 'x₁x₃-Ebene '
            : 'x₁x₂-Ebene '}{' '}
        und geben Sie die Koordinaten des projizierten Punktes{' '}
        <InlineMath math="P'" /> an.
      </p>
    )
  },

  solution({ data }) {
    // Projektion: zugehörige Koordinate = 0, die beiden anderen bleiben erhalten
    let px = data.x1,
      py = data.x2,
      pz = data.x3
    if (data.plane === 'x1=0') px = 0
    if (data.plane === 'x2=0') py = 0
    if (data.plane === 'x3=0') pz = 0

    const rule =
      data.plane === 'x1=0'
        ? '\\text{Setze }x_1=0,\\; x_2, x_3 \\text{ bleiben unverändert.}'
        : data.plane === 'x2=0'
          ? '\\text{Setze }x_2=0,\\; x_1, x_3 \\text{ bleiben unverändert.}'
          : '\\text{Setze }x_3=0,\\; x_1, x_2 \\text{ bleiben unverändert.}'

    return (
      <>
        <BlockMath math={rule} />
        <BlockMath
          math={`P'\\,=\\,(${pp(px)}\\mid ${pp(py)}\\mid ${pp(pz)})`}
        />
      </>
    )
  },
}
