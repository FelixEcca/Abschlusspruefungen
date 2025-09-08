// ====================================
// 3A (3059) – Würfel & Kegel
// ====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  cubeV: number // cm^3
}

export const exercise3058: Exercise<DATA> = {
  title: 'Kegel im Würfel – Radius & Oberfläche',
  source: '2022 Aufgabe 3A',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    const edge = rng.randomItemFromArray([6, 7, 8, 9, 10]) // Kantenlänge (cm)
    const cubeV = edge ** 3
    return { cubeV }
  },

  originalData: { cubeV: 512 }, // a=8 cm

  constraint() {
    return true
  },

  intro() {
    return (
      <img src="/content/BW_2BFS/3059.png" width={320} alt="Kegel im Würfel" />
    )
  },

  tasks: [
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            <b>1.</b> Zeigen Sie, dass der Kegelradius 4 cm beträgt (im
            Originalfall).
          </p>
        )
      },
      solution({ data }) {
        const a = Math.cbrt(data.cubeV) // Kantenlänge
        const r = a / 2
        return buildEquation([
          ['Würfelkante', '', `a=\\sqrt[3]{${pp(data.cubeV)}}=${pp(a)}`],
          ['Kegeldurchmesser', '', 'entspricht a'],
          ['Radius', '\\Rightarrow', `r=\\tfrac{a}{2}=${pp(r)}\\,\\text{cm}`],
        ])
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
            <b>2.</b> Berechnen Sie die Oberfläche des Kegels (Mantel +
            Grundfläche).
          </p>
        )
      },
      solution({ data }) {
        const a = Math.cbrt(data.cubeV)
        const r = a / 2
        const h = a // Spitze berührt Deckfläche, Höhe = a
        const s = Math.hypot(r, h) // Mantellinie
        const A = Math.PI * r * s + Math.PI * r * r
        return buildEquation([
          [
            'Daten',
            '',
            `r=${pp(r)},\\; h=${pp(h)},\\; s=\\sqrt{r^{2}+h^{2}}=${pp(s)}`,
          ],
          ['Formel', '', 'A=\\pi r s + \\pi r^{2}'],
          ['Ergebnis', '\\Rightarrow', `${pp(A)}\\,\\text{cm}^{2}`],
        ])
      },
    },
  ],
}
