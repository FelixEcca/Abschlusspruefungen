// ======================================
// 5C — Praline (Halbkugel) mit Bild 3116.png
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA116 {
  bowlInnerD: number
  nutD: number
  chocR: number
  threshold: number
}

export const exercise3116: Exercise<DATA116> = {
  title: 'Praline',
  source: '2023 Wahlteil Aufgabe 5C',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    const bowlInnerD = rng.randomItemFromArray([3.6, 4.0, 4.4])
    const nutD = rng.randomItemFromArray([1.0, 1.2, 1.4])
    const chocR = rng.randomItemFromArray([1.6, 1.7, 1.8])
    const threshold = rng.randomItemFromArray([60, 65, 70, 75])
    return { bowlInnerD, nutD, chocR, threshold }
  },

  originalData: { bowlInnerD: 4.0, nutD: 1.2, chocR: 1.7, threshold: 70 },

  constraint() {
    return true
  },

  intro() {
    return (
      <img src="/content/BW_2BFS/3116.png" width={320} alt="Pralinen-Skizze" />
    )
  },

  tasks: [
    {
      points: 6,
      intro({ data }) {
        return (
          <p>
            Innen-Ø: {pp(data.bowlInnerD)} cm, Nuss-Ø: {pp(data.nutD)} cm.
          </p>
        )
      },
      task() {
        return <p>Berechnen Sie das Nougatvolumen.</p>
      },
      solution({ data }) {
        const R = data.bowlInnerD / 2,
          r = data.nutD / 2
        const V = (2 / 3) * Math.PI * R ** 3 - (4 / 3) * Math.PI * r ** 3
        return buildEquation([
          [
            'Formel',
            '',
            'V=V_{Halbkugel}-V_{Nuss}=\\tfrac{2}{3}\\pi R^{3}-\\tfrac{4}{3}\\pi r^{3}',
          ],
          [
            'Einsetzen',
            '\\Rightarrow',
            `=\\tfrac{2}{3}\\pi\\cdot${pp(R)}^{3}-\\tfrac{4}{3}\\pi\\cdot${pp(r)}^{3}`,
          ],
          ['Lösen', '\\Rightarrow', `${pp(V)}\\,\\text{cm}^{3}`],
        ])
      },
    },
    {
      points: 6,
      intro({ data }) {
        return (
          <p>
            Oben wird ein Schokokreis mit Radius {pp(data.chocR)} cm
            aufgespritzt. Prüfen Sie die Aussage: „Mehr als {data.threshold}%
            der oberen Nougatfläche sind bedeckt.“
          </p>
        )
      },
      task() {
        return <p>Entscheiden Sie wahr/falsch.</p>
      },
      solution({ data }) {
        const R = data.bowlInnerD / 2
        const perc = ((data.chocR * data.chocR) / (R * R)) * 100
        const ok = perc > data.threshold
        return buildEquation([
          [
            'Anteil',
            '',
            '\\dfrac{A_{schoko}}{A_{oben}}=\\left(\\tfrac{r_s}{R}\\right)^2\\cdot100\\%',
          ],
          [
            'Einsetzen',
            '\\Rightarrow',
            `=\\left(\\tfrac{${pp(data.chocR)}}{${pp(R)}}\\right)^2\\cdot100\\%=${pp(perc)}\\%`,
          ],
          [
            'Beurteilung',
            '\\Rightarrow',
            ok
              ? `\\text{wahr (>${data.threshold}\\%)}`
              : `\\text{falsch (≤${data.threshold}\\%)}`,
          ],
        ])
      },
    },
  ],
}
