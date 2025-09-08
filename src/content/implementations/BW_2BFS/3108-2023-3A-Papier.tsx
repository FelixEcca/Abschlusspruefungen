// ========================================
// 3A — Papierstapel & geknüllte Kugel
// ========================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA3108 {
  sheets: number
  height: number
  length: number
  width: number
  volSheet: number
  sphereD: number
}

export const exercise3108: Exercise<DATA3108> = {
  title: 'Papier',
  source: '2023 Wahlteil Aufgabe 3A',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    const sheets = 500
    const height = rng.randomItemFromArray([4.8, 5.0, 5.2])
    const length = 29.7,
      width = 21.1
    const volSheet = rng.randomItemFromArray([6.0, 6.2, 6.3])
    const sphereD = rng.randomItemFromArray([3.8, 4.0, 4.2])
    return { sheets, height, length, width, volSheet, sphereD }
  },

  originalData: {
    sheets: 500,
    height: 5,
    length: 29.7,
    width: 21.1,
    volSheet: 6.3,
    sphereD: 4,
  },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        Stapel: {data.sheets} Blätter, L×B×H = {data.length} cm × {data.width}{' '}
        cm × {data.height} cm.
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
        return <p>Berechnen Sie die Dicke eines Blattes.</p>
      },
      solution({ data }) {
        const d = data.height / data.sheets
        return buildEquation([
          ['Formel', '', 'd=\\tfrac{H}{n}'],
          [
            'Einsetzen',
            '\\Rightarrow',
            `d=\\tfrac{${pp(data.height)}}{${data.sheets}}\\,\\text{cm}`,
          ],
          ['Lösen', '\\Rightarrow', `d=${pp(d)}\\,\\text{cm}`],
        ])
      },
    },
    {
      points: 6,
      intro({ data }) {
        return (
          <p>
            Ein Blatt (Volumen {data.volSheet} cm³) wird zu einer Kugel mit
            Durchmesser {data.sphereD} cm geknüllt.
          </p>
        )
      },
      task() {
        return <p>Wie viel Prozent des Kugelvolumens ist Luft?</p>
      },
      solution({ data }) {
        const r = data.sphereD / 2
        const VK = (4 / 3) * Math.PI * r ** 3
        const perc = (1 - data.volSheet / VK) * 100
        return buildEquation([
          ['Formel', '', 'V_K=\\tfrac{4}{3}\\pi r^3'],
          [
            'Einsetzen',
            '\\Rightarrow',
            `V_K=\\tfrac{4}{3}\\pi\\cdot ${pp(r)}^3=${pp(VK)}`,
          ],
          [
            'Anteil',
            '\\Rightarrow',
            `\\left(1-\\tfrac{${pp(data.volSheet)}}{${pp(VK)}}\\right)\\cdot 100\\%\\approx ${pp(Math.round(perc * 100) / 100)}\\%`,
          ],
        ])
      },
    },
  ],
}
