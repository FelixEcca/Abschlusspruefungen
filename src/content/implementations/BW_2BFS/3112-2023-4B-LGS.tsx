// ======================================
// 4B — LGS:  -2x = 2(y+1)  ;  x + 1/4 y = 1/2
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { buildEquation } from '@/helper/math-builder'

interface DATA3112 {
  // zufällige Vielfache des Originals für Generator-Aufgaben
  k1: number
  k2: number
}

export const exercise3112: Exercise<DATA3112> = {
  title: 'LGS',
  source: '2023 Wahlteil Aufgabe 4B',
  useCalculator: true,
  duration: 8,

  generator(rng) {
    // skaliere beide Originalgleichungen mit netten Faktoren (Übungsteil)
    const k1 = rng.randomItemFromArray([1, 2, 3])
    const k2 = rng.randomItemFromArray([1, 2, 4])
    return { k1, k2 }
  },

  originalData: { k1: 1, k2: 1 },

  constraint() {
    return true
  },

  intro({ data }) {
    const g1 = `-2\\cdot ${data.k1}\\,x=2\\cdot ${data.k1}(y+1)`
    const g2 = `${data.k2}\\,x+\\tfrac{${data.k2}}{4}y=\\tfrac{${data.k2}}{2}`
    return (
      <>
        <p>Gegeben ist das LGS</p>
        <InlineMath math={g1} />
        <span> (1)</span>
        <br />
        <InlineMath math={g2} />
        <span> (2)</span>
      </>
    )
  },

  tasks: [
    {
      points: 5,
      intro() {
        return null
      },
      task() {
        return <p>Lösen Sie das LGS.</p>
      },
      solution() {
        return buildEquation([
          ['Aus (1)', '', 'x=-(y+1)'],
          ['In (2)', '\\Rightarrow', '-(y+1)+\\tfrac{1}{4}y=\\tfrac{1}{2}'],
          ['Lösen', '\\Rightarrow', 'y=-2,\\ x=1'],
        ])
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Geben Sie eine zweite Gleichung an, die mit (1) unendlich viele
            Lösungen besitzt.
          </p>
        )
      },
      solution() {
        return (
          <InlineMath math="x+y+1=0\\quad(\\text{Vielfache/äquivalente Form von (1)})" />
        )
      },
    },
  ],
}
