// ====================================
// 3B (3060) – Parabeln p1, p2, p3
// ====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  // kleine Randomisierung bei p2
  k2: number
  s2: number
}

export const exercise3059: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2022 Wahlteil Aufgabe 3B',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    return {
      k2: rng.randomItemFromArray([3, 4]),
      s2: rng.randomItemFromArray([6, 7]),
    }
  },

  originalData: { k2: 3, s2: 6 },

  constraint() {
    return true
  },

  intro() {
    return (
      <>
        <p>
          <b>p₁:</b> <InlineMath math="y=(x-1)^2+1" />
        </p>
        <p>
          <b>p₂:</b> entsteht aus der Normalparabel durch Streckung mit dem
          Faktor 3 und Verschiebung um 6 Einheiten nach unten.
        </p>
        <p>
          <b>p₃:</b> schneidet die x-Achse in <InlineMath math="x_1=-2" /> und{' '}
          <InlineMath math="x_2=0" />.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            <b>1.</b> Geben Sie den Scheitel von <InlineMath math="p_1" /> an
            und skizzieren Sie sie.
          </p>
        )
      },
      solution() {
        return <InlineMath math={'S(1\\mid 1)'} />
      },
    },
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            <b>2.</b> Geben Sie eine Gleichung von <InlineMath math="p_2" /> an.
          </p>
        )
      },
      solution({ data }) {
        return (
          <InlineMath
            math={`y=${pp(data.k2)}x^{2}${pp(-data.s2, 'merge_op')}`}
          />
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            <b>3.</b> Begründen Sie, warum der Scheitel von{' '}
            <InlineMath math="p_3" /> die x-Koordinate{' '}
            <InlineMath math="x_S=-1" /> hat.
          </p>
        )
      },
      solution() {
        return (
          <>
            <p>
              Die Nullstellen sind bei <InlineMath math="x=-2" /> und{' '}
              <InlineMath math="x=0" />. Die Parabel ist symmetrisch zur
              Senkrechten durch die Mitte zwischen den Nullstellen.
            </p>
            <InlineMath math="x_S=\tfrac{-2+0}{2}=-1" />
          </>
        )
      },
    },
  ],
}
