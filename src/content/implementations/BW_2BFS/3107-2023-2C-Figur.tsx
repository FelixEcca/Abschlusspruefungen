// ======================================
// 2C — Viertelkreis – Kreis (Flächen R)
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA3107 {
  r: number
  A: number
}

export const exercise3107: Exercise<DATA3107> = {
  title: 'Figur',
  source: '2023 Wahlteil Aufgabe 2C',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    const r = rng.randomIntBetween(10, 25)
    // wähle R und setze A nach Formel, aber A bleibt in Generator; in Aufgabe rechnen SuS zurück
    const R = rng.randomIntBetween(r + 5, r + 25)
    const A = Math.round((0.25 * Math.PI * R * R - Math.PI * r * r) * 10) / 10
    // wir geben nur r und A aus
    return { r, A }
  },

  originalData: { r: 20, A: 574.4 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        Gegeben: <InlineMath math={`r=${pp(data.r)}\\,\\text{cm}`} />,
        Flächeninhalt der grauen Teile{' '}
        <InlineMath math={`A=${pp(data.A)}\\,\\text{cm}^{2}`} /> und
        <InlineMath math="A=\\tfrac14\\pi R^2-\\pi r^2" />.
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
        return (
          <p>
            Bestimmen Sie den Radius <InlineMath math="R" /> (auf 1 Dez.).
          </p>
        )
      },
      solution({ data }) {
        const R = Math.sqrt(
          (4 * (data.A + Math.PI * data.r * data.r)) / Math.PI,
        )
        return buildEquation([
          ['Formel', '', 'A=\\tfrac14\\pi R^2-\\pi r^2'],
          [
            'Einsetzen',
            '\\Rightarrow',
            `${pp(data.A)}=\\tfrac14\\pi R^2-\\pi\\cdot${pp(data.r)}^2`,
          ],
          [
            'Lösen',
            '\\Rightarrow',
            `R=\\sqrt{\\tfrac{4(A+\\pi r^2)}{\\pi}}\\approx ${pp(Math.round(R * 10) / 10)}\\,\\text{cm}`,
          ],
        ])
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
            Erläutern Sie, warum <InlineMath math="(R-r)^2=r^2+r^2" /> gilt.
          </p>
        )
      },
      solution() {
        return (
          <p>
            Verbindet man die Mittelpunkte, entsteht ein rechtwinkliges Dreieck
            mit Katheten <InlineMath math="r,r" /> und Hypotenuse{' '}
            <InlineMath math="R-r" /> ⇒ Satz des Pythagoras.
          </p>
        )
      },
    },
  ],
}
