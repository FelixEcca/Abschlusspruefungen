// ====================================
// 1E (3054) – LGS (Aussage + Lösung)
// ====================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  A: number
  B: number
  C: number
  D: number
  E: number
  F: number
  eva: number
}

export const exercise3054: Exercise<DATA> = {
  title: 'LGS',
  source: '2022 Pflichtteil Aufgabe 1E',
  useCalculator: false,
  duration: 8,

  generator(rng) {
    // „nett“ und näher am Original: A,D positiv; B,E oft negativ
    const A = rng.randomItemFromArray([2, 3, 4, 5])
    const B = rng.randomItemFromArray([-4, -3, -2, -1, 1, 2])
    const C = rng.randomIntBetween(1, 9)
    const D = rng.randomItemFromArray([2, 3, 4, 6, 8])
    const E = rng.randomItemFromArray([-4, -3, -2, -1, 1, 2])
    const F = rng.randomIntBetween(0, 9)
    const eva = rng.randomIntBetween(-9, 9)

    return { A, B, C, D, E, F, eva }
  },

  // Original: 2x − 3y = 5 ; 4x − 2y = 2  (Eva: −2)
  originalData: { A: 2, B: -3, C: 5, D: 4, E: -2, F: 2, eva: -2 },

  constraint({ data }) {
    // eindeutig lösbar: Determinante ≠ 0; außerdem A ≠ 0 (für x-Berechnung)
    const det = data.A * data.E - data.B * data.D
    return det !== 0 && data.B != data.E && data.A !== 0
  },

  intro({ data }) {
    return (
      <div className="space-y-2">
        <p>Gegeben ist das lineare Gleichungssystem</p>
        <BlockMath
          math={`${data.A === 1 ? '' : data.A === -1 ? '-' : pp(data.A)}x${data.B === 1 ? '+' : data.B === -1 ? '-' : pp(data.B, 'merge_op')}y=${pp(data.C)}`}
        />
        <BlockMath
          math={`${data.D === 1 ? '' : data.D === -1 ? '-' : pp(data.D)}x${data.E === 1 ? '+' : data.E === -1 ? '-' : pp(data.E, 'merge_op')}y=${pp(data.F)}`}
        />
      </div>
    )
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Eva behauptet: „Die Lösung ist die Zahl {data.eva}.“ Nehmen Sie
            Stellung.
          </p>
        )
      },
      solution() {
        return (
          <p>
            Falsch. Eine LGS-Lösung ist immer ein <b>Paar</b>{' '}
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
        return <p>Lösen Sie das LGS. </p>
      },
      solution({ data }) {
        // LGS: A x + B y = C ; D x + E y = F
        const { A, B, C, D, E, F } = data
        // Elimination: D·(1) − A·(2) ⇒ (BD−AE)·y = CD − AF
        const den = B * D - A * E
        const num = C * D - A * F
        const y = num / den
        const x = (C - B * y) / A

        return (
          <div className="space-y-2">
            {/* Ausgangssystem */}
            <BlockMath math={`${pp(A)}x${pp(B, 'merge_op')}y=${pp(C)}`} />
            <BlockMath math={`${pp(D)}x${pp(E, 'merge_op')}y=${pp(F)}`} />

            {/* Schritt 1: Elimination (Gleichung I * D, Gleichung II * A) */}
            <div>
              Multipliziere die erste Gleichung mit {pp(D)}, die zweite mit{' '}
              {pp(-A)}:
              <BlockMath
                math={String.raw`
                ${pp(A * D)}x${pp(B * D, 'merge_op')}y = ${pp(C * D)} \\
                ${pp(-D * A)}x${pp(-E * A, 'merge_op')}y = ${pp(-F * A)}
              `}
              />
            </div>

            {/* Schritt 2: Subtrahiere zum Eliminieren von x */}
            <div>
              Addiere die Gleichungen:
              <BlockMath
                math={String.raw`
                \left(${pp(B * D)}  ${pp(-E * A, 'merge_op')}\right)y = ${pp(C * D)} - ${pp(F * A)}
              `}
              />
              <BlockMath
                math={String.raw`
                ${pp(den)}\,y = ${pp(num)}
              `}
              />
              <BlockMath
                math={String.raw`
                y = \dfrac{${pp(num)}}{${pp(den)}} = ${pp(y)}
              `}
              />
            </div>

            {/* Schritt 3: x berechnen */}
            <div>
              Setze <InlineMath math={`y`} /> in eine Gleichung ein:
              <BlockMath
                math={String.raw`
                ${pp(A)}x${pp(B, 'merge_op')}y = ${pp(C)}
              `}
              />
              <BlockMath
                math={String.raw`
                ${pp(A)}x = ${pp(C)} - ${pp(B * y)}
              `}
              />
              <BlockMath
                math={String.raw`
                x = \dfrac{${pp(C - B * y)}}{${pp(A)}} = ${pp(x)}
              `}
              />
            </div>

            {/* Lösung */}
            <div>
              <b>Lösung:</b>
              <BlockMath math={`\\left(${pp(x)}\\mid ${pp(y)}\\right)`} />
            </div>
          </div>
        )
      },
    },
  ],
}
