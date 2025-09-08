// ======================================
// 5B — Scheitel S(1|-5), Gerade y = -5x
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA3115 {
  h: number
  k: number
  m: number
}

export const exercise3115: Exercise<DATA3115> = {
  title: 'Parabeln',
  source: '2023 Wahlteil Aufgabe 5B',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    const h = rng.randomIntBetween(-1, 2)
    const k = rng.randomIntBetween(-6, -3)
    const m = rng.randomItemFromArray([-5, -4, -3])
    return { h, k, m }
  },

  originalData: { h: 1, k: -5, m: -5 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        Scheitelpunkt{' '}
        <InlineMath math={`S(${pp(data.h)}\\mid ${pp(data.k)})`} />.
      </p>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Zeigen Sie, dass{' '}
            <InlineMath math={`y=x^{2}${pp(-2)}x${pp(1 + -5, 'merge_op')}`} />{' '}
            im Originalfall gilt und allgemein{' '}
            <InlineMath
              math={`y=x^{2}${pp(-2 * 1, 'merge_op')}x${pp(1 * 1 + -5, 'merge_op')}`}
            />{' '}
            (hier nur Schema) aus der Scheitelform entsteht.
          </p>
        )
      },
      solution({ data }) {
        const B = -2 * data.h,
          C = data.h * data.h + data.k
        return (
          <>
            <InlineMath
              math={`y=(x-${pp(data.h)})^{2}${pp(data.k, 'merge_op')}=x^{2}${pp(B, 'merge_op')}x${pp(C, 'merge_op')}`}
            />
          </>
        )
      },
    },
    {
      points: 4,
      intro({ data }) {
        return (
          <p>
            Gerade <InlineMath math={`g: y=${pp(data.m)}x`} />.
          </p>
        )
      },
      task() {
        return (
          <p>
            Berechnen Sie die Schnittpunkte von <InlineMath math="p" /> und{' '}
            <InlineMath math="g" />.
          </p>
        )
      },
      solution({ data }) {
        const B = -2 * data.h,
          C = data.h * data.h + data.k
        const b = B - data.m,
          c = C
        const D = b * b - 4 * c
        const x1 = (-b + Math.sqrt(D)) / 2,
          x2 = (-b - Math.sqrt(D)) / 2
        return buildEquation([
          ['Ansatz', '', 'x^{2}+Bx+C=mx'],
          [
            'Einsetzen',
            '\\Rightarrow',
            `x^{2}${pp(B, 'merge_op')}x${pp(C, 'merge_op')}=${pp(data.m)}x`,
          ],
          [
            'Lösen',
            '\\Rightarrow',
            `x_{1,2}=\\tfrac{-${pp(b)}\\pm\\sqrt{${pp(D)}}}{2}`,
          ],
          [
            '',
            '\\Rightarrow',
            `P_{1}(${pp(x1)}\\mid ${pp(data.m * x1)}),\\ P_{2}(${pp(x2)}\\mid ${pp(data.m * x2)})`,
          ],
        ])
      },
    },
  ],
}
