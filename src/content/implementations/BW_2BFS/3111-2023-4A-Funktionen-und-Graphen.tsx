// ======================================
// 4A — Gerade g: y = -x + 2, Parabel p: y = 2x^2 - 1
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA3111 {
  a: number
  b: number
  c: number
  m: number
  d: number
}

export const exercise3111: Exercise<DATA3111> = {
  title: 'Gerade & Parabel – Scheitel und Schnitt',
  source: '2023 Pflichtteil 4A',
  useCalculator: false,
  duration: 10,

  generator(rng) {
    // zufällige, aber „nette“ Varianten
    const a = rng.randomItemFromArray([1, 2])
    const b = rng.randomItemFromArray([-2, 0, 2])
    const c = rng.randomIntBetween(-2, 2)
    const m = rng.randomItemFromArray([-2, -1])
    const d = rng.randomIntBetween(0, 3)
    return { a, b, c, m, d }
  },

  originalData: { a: 2, b: 0, c: -1, m: -1, d: 2 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        <InlineMath math={`g: y=${pp(data.m)}x${pp(data.d, 'merge_op')}`} />,{' '}
        <InlineMath
          math={`p: y=${pp(data.a)}x^{2}${pp(data.b, 'merge_op')}x${pp(data.c, 'merge_op')}`}
        />
        .
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
        return <p>Bestimmen Sie den Scheitel der Parabel.</p>
      },
      solution({ data }) {
        const h = -data.b / (2 * data.a),
          k = data.a * h * h + data.b * h + data.c
        return <InlineMath math={`S(${pp(h)}\\mid ${pp(k)})`} />
      },
    },
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie die Schnittpunkte von <InlineMath math="g" /> und{' '}
            <InlineMath math="p" />.
          </p>
        )
      },
      solution({ data }) {
        const A = data.a,
          B = data.b - data.m,
          C = data.c - data.d
        const D = B * B - 4 * A * C
        const x1 = (-B + Math.sqrt(D)) / (2 * A),
          x2 = (-B - Math.sqrt(D)) / (2 * A)
        const y1 = data.m * x1 + data.d,
          y2 = data.m * x2 + data.d
        return buildEquation([
          ['Gleichung', '', `${pp(A)}x^2+${pp(B)}x${pp(C, 'merge_op')}=0`],
          [
            'Lösung',
            '\\Rightarrow',
            `S_1(${pp(x1)}\\mid ${pp(y1)}),\\ S_2(${pp(x2)}\\mid ${pp(y2)})`,
          ],
        ])
      },
    },
  ],
}
