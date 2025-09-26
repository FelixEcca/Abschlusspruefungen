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
    const C = rng.randomIntBetween(2, 6)
    const D = rng.randomIntBetween(-6, 6)
    const A = rng.randomIntBetween(2, 6)
    const k = rng.randomItemFromArray([2, 3, 4])
    // Wähle B so, dass Gleichung für xSol stimmt: (A xSol + B) = k (C xSol + D)
    const B = k * (C * xSol + D) - A * xSol
    return { A, B, C, D, k, xSol }
  },

  // Original-Aufgabe: (2x+4)/(4x-2)=3  → Lösung x=1, Definitionsmenge x≠1/2
  originalData: { A: 2, B: 4, C: 4, D: -2, k: 3, xSol: 1 },

  constraint({ data }) {
    return (
      data.C !== 0 && data.B !== 0 && data.D !== 0 && data.A !== data.k * data.C
    )
  },

  intro({ data }) {
    return (
      <>
        <p>Gegeben ist die Bruchgleichung.</p>
        <InlineMath
          math={`\\dfrac{${pp(data.A)}x${pp(data.B, 'merge_op')}}{${pp(data.C)}x${pp(data.D, 'merge_op')}}=${pp(data.k)}`}
        />
      </>
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
          <>
            <p>Der Nenner darf nicht null sein:</p>
            <InlineMath
              math={`${pp(data.C)}x${pp(data.D, 'merge_op')}\\ne 0\\\\\\Rightarrow\\; x\\ne -${pp(data.D / data.C)}`}
            />
            <p>
              <InlineMath math={`x`} /> darf nicht den Wert{' '}
              <InlineMath math={`-${pp(data.D / data.C)}`} /> annehmen.
            </p>
            <p>Die Definitionsmenge lautet dann:</p>
            <InlineMath
              math={`\\mathbb{D}=\\mathbb{R}\\setminus \\left\\{ -${pp(data.D / data.C)} \\right\\}`}
            />
          </>
        )
      },
    },
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return <p>Berechnen Sie die Lösung der Bruchgleichung.</p>
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`\\dfrac{${pp(data.A)}x${pp(data.B, 'merge_op')}}{${pp(data.C)}x${pp(data.D, 'merge_op')}}=${pp(data.k)}\\quad\\big| \\cdot (${pp(data.C)}x${pp(data.D, 'merge_op')})`}
            />
            <br />
            <br />
            <InlineMath
              math={`${pp(data.A)}x${pp(data.B, 'merge_op')}=${pp(data.k)}(${pp(data.C)}x${pp(data.D, 'merge_op')})`}
            />
            <br />
            <p>Löse die Klammer auf und löse die Gleichung.</p>
            <InlineMath
              math={`${pp(data.A)}x${pp(data.B, 'merge_op')}=${pp(data.k * data.C)}x${pp(data.k * data.D, 'merge_op')}`}
            />
            <br />
            <br />
            <InlineMath
              math={`${pp(data.A - data.k * data.C)}x=${pp(data.k * data.D - data.B)}`}
            />
            <br />
            <br />
            <InlineMath
              math={`x=${pp((data.k * data.D - data.B) / (data.A - data.k * data.C))}`}
            />
            {(data.k * data.D - data.B) / (data.A - data.k * data.C) ===
              -data.D / data.C && (
              <p>
                Der Wert <InlineMath math={`-${pp(data.D / data.C)}`} /> ist
                jedoch nicht in der Definitionsmenge enthalten. Somit hat die
                Gleichung keine Lösung.
              </p>
            )}
          </>
        )
      },
    },
  ],
}
