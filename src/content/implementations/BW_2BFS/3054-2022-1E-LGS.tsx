// ====================================
// 1E (3054) – LGS (Aussage + Lösung)
// ====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  A: number
  B: number
  C: number
  D: number
  E: number
  F: number
}

export const exercise3054: Exercise<DATA> = {
  title: 'LGS',
  source: '2022 Pflichtteil Aufgabe 1E',
  useCalculator: false,
  duration: 8,

  generator(rng) {
    // baue ein LGS nahe am Original
    const A = rng.randomItemFromArray([2, 3, 4])
    const B = -rng.randomItemFromArray([1, 2, 3])
    const C = rng.randomIntBetween(1, 7)
    const D = rng.randomItemFromArray([4, 6, 8])
    const E = -rng.randomItemFromArray([1, 2, 3])
    const F = rng.randomIntBetween(0, 5)
    return { A, B, C, D, E, F }
  },

  // Original: 2x − 3y = 5 ; 4x − 2y = 2
  originalData: { A: 2, B: -3, C: 5, D: 4, E: -2, F: 2 },

  constraint() {
    return true
  },

  intro() {
    return (
      <div className="space-y-1">
        <p>Gegeben ist das LGS:</p>
        <InlineMath math={'2x-3y=5'} />
        <br />
        <InlineMath math={'4x-2y=2'} />
      </div>
    )
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>1.</b> Eva behauptet: „Die Lösung ist die Zahl −2.“ Nehmen Sie
            Stellung.
          </p>
        )
      },
      solution() {
        return (
          <p>
            Falsch. Eine LGS-Lösung ist ein <b>Paar</b>{' '}
            <InlineMath math="(x\mid y)" />, nicht eine einzelne Zahl.
          </p>
        )
      },
    },
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>2.</b> Lösen Sie das LGS.
          </p>
        )
      },
      solution() {
        return buildEquation([
          ['(1)', '', '2x-3y=5'],
          ['(2)', '', '4x-2y=2'],
          ['·2 auf (1)', '\\Rightarrow', '4x-6y=10'],
          ['Subtrahiere (2)', '\\Rightarrow', '-4y=8 \\Rightarrow y=-2'],
          [
            'In (1)',
            '\\Rightarrow',
            '2x-3(-2)=5 \\Rightarrow 2x+6=5 \\Rightarrow x=-\\tfrac{1}{2}',
          ],
          ['Lösung', '\\Rightarrow', '(-\\tfrac{1}{2}\\mid -2)'],
        ])
      },
    },
  ],
}
