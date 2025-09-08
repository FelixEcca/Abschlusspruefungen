// =====================================
// 3B — Parabel y = x^2 + 4x + 1
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA3109 {
  a: number
  b: number
  c: number
  m: number
}

export const exercise3109: Exercise<DATA3109> = {
  title: 'Parabel',
  source: '2023 Wahlteil Aufgabe 3B',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    // erzwinge Tangente: b = 2m
    const m = rng.randomItemFromArray([1, 2, 3, -1, -2])
    const b = 2 * m
    const c = rng.randomIntBetween(-2, 2)
    return { a: 1, b, c, m }
  },

  originalData: { a: 1, b: 4, c: 1, m: 2 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        Gegeben:{' '}
        <InlineMath
          math={`p: y=x^2${pp(data.b, 'merge_op')}x${pp(data.c, 'merge_op')}`}
        />
        .
      </p>
    )
  },

  tasks: [
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return <p>Bestimmen Sie den Scheitelpunkt.</p>
      },
      solution({ data }) {
        const h = -data.b / (2 * data.a)
        const k = data.a * h * h + data.b * h + data.c
        return buildEquation([
          ['Formel', '', 'h=-\\tfrac{b}{2a},\\; k=f(h)'],
          ['Einsetzen', '\\Rightarrow', `S=(${pp(h)}\\mid ${pp(k)})`],
        ])
      },
    },
    {
      points: 5,
      intro({ data }) {
        return (
          <p>
            Die Ursprungsgerade hat Steigung{' '}
            <InlineMath math={`${pp(data.m)}`} />.
          </p>
        )
      },
      task() {
        return <p>Bestimmen Sie den gemeinsamen Punkt.</p>
      },
      solution({ data }) {
        // bei Tangente: x = -m, y = m*x
        const x = -data.m,
          y = data.m * x
        return buildEquation([
          ['Schnitt', '', 'x^2+bx+c=mx'],
          [
            'Einsetzen',
            '\\Rightarrow',
            `x^2+${pp(data.b)}x${pp(data.c, 'merge_op')}=${pp(data.m)}x`,
          ],
          ['Berührpunkt', '\\Rightarrow', `P(${pp(x)}\\mid ${pp(y)})`],
        ])
      },
    },
  ],
}
