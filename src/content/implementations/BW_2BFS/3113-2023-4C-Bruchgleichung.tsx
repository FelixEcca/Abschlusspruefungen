// ======================================
// 4C — Bruchgleichung (mit Randomisierung)
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA3113 {
  A: number
  B: number
  C: number
  D: number
  k: number
  xSol: number
}

export const exercise3113: Exercise<DATA3113> = {
  title: 'Bruchgleichung',
  source: '2023 Wahlteil Aufgabe 4C',
  useCalculator: true,
  duration: 8,

  generator(rng) {
    // Erzeuge (A x + B) / (C x + D) = k mit ganzzahliger Lösung
    const xSol = rng.randomIntBetween(-3, 5)
    const C = rng.randomIntBetween(1, 4)
    const D = rng.randomIntBetween(-3, 3)
    const A = rng.randomIntBetween(1, 4)
    const k = rng.randomItemFromArray([2, 3, 4])
    // Wähle B so, dass Gleichung für xSol stimmt: (A xSol + B) = k (C xSol + D)
    const B = k * (C * xSol + D) - A * xSol
    return { A, B, C, D, k, xSol }
  },

  // Original-Aufgabe: (2x+4)/(4x-2)=3  → Lösung x=1, Definitionsmenge x≠1/2
  originalData: { A: 2, B: 4, C: 4, D: -2, k: 3, xSol: 1 },

  constraint({ data }) {
    return data.C !== 0
  },

  intro({ data }) {
    return (
      <InlineMath
        math={`\\dfrac{${pp(data.A)}x${pp(data.B, 'merge_op')}}{${pp(data.C)}x${pp(data.D, 'merge_op')}}=${pp(data.k)}`}
      />
    )
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return <p>Nennen Sie die Definitionsmenge.</p>
      },
      solution({ data }) {
        return (
          <InlineMath
            math={`${pp(data.C)}x${pp(data.D, 'merge_op')}\\ne 0\\;\\Rightarrow\\; x\\ne -\\tfrac{${pp(data.D)}}{${pp(data.C)}}`}
          />
        )
      },
    },
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return <p>Lösen Sie die Gleichung.</p>
      },
      solution({ data }) {
        return buildEquation([
          [
            'Start',
            '',
            `\\dfrac{${pp(data.A)}x${pp(data.B, 'merge_op')}}{${pp(data.C)}x${pp(data.D, 'merge_op')}}=${pp(data.k)}`,
          ],
          [
            'Umformen',
            '\\Rightarrow',
            `${pp(data.A)}x${pp(data.B, 'merge_op')}=${pp(data.k)}(${pp(data.C)}x${pp(data.D, 'merge_op')})`,
          ],
          [
            'Auflösen',
            '\\Rightarrow',
            `${pp(data.A)}x${pp(data.B, 'merge_op')}=${pp(data.k * data.C)}x${pp(data.k * data.D, 'merge_op')}`,
          ],
          [
            'Nach x',
            '\\Rightarrow',
            `${pp(data.A - data.k * data.C)}x=${pp(data.k * data.D - data.B)}`,
          ],
          [
            'Lösung',
            '\\Rightarrow',
            `x=${pp((data.k * data.D - data.B) / (data.A - data.k * data.C))}`,
          ],
        ])
      },
    },
  ],
}
