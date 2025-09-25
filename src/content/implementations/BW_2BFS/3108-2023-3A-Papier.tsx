// ========================================
// 3A — Papierstapel & geknüllte Kugel
// ========================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

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
    const sheets = rng.randomIntBetween(30, 70) * 10 // Blätter
    const height = rng.randomIntBetween(30, 70) / 10 // cm
    const length = 29.7
    const width = 21.1
    const volSheet = rng.randomItemFromArray([5, 5.6, 5.8, 6.0, 6.2, 6.3, 6.5]) // cm³
    const sphereD = rng.randomItemFromArray([3.8, 4.0, 4.2, 4.4, 3.6, 3.4]) // cm
    return { sheets, height, length, width, volSheet, sphereD }
  },

  // Originalwerte aus dem Scan
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
      <div className="space-y-1">
        <p>Ein Stapel Papier mit {data.sheets} Blatt hat die Maße:</p>
        <p>
          Länge: {pp(data.length)} cm &nbsp;&nbsp; Breite: {pp(data.width)} cm
          &nbsp;&nbsp; <br></br>Höhe: {pp(data.height)} cm
        </p>
      </div>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return <p>Berechnen Sie die Dicke eines Papierblattes.</p>
      },
      solution({ data }) {
        const d = data.height / data.sheets
        return (
          <>
            <p>Teile die Dicke des Stapels durch die Anzahl der Blätter.</p>
            <div className="space-y-2">
              <BlockMath
                math={`d=\\dfrac{${pp(data.height)}}{${data.sheets}}\\,\\text{cm}`}
              />
              <BlockMath math={`d=${pp(d)}\\,\\text{cm}`} />
            </div>
          </>
        )
      },
    },
    {
      points: 6,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <div className="space-y-1">
            <p>
              Ein Blatt Papier hat das Volumen {pp(data.volSheet)} cm³. Dieses
              wird zusammengeknüllt. Dabei entsteht näherungsweise eine Kugel
              mit dem Durchmesser {pp(data.sphereD)} cm.
            </p>
            <p>
              Ermitteln Sie, wie viel Prozent des Gesamtvolumens der Kugel aus
              Luft besteht.
            </p>
          </div>
        )
      },
      solution({ data }) {
        const r = data.sphereD / 2
        const VK = (4 / 3) * Math.PI * r ** 3
        const perc = (1 - data.volSheet / VK) * 100
        const VKr = Math.round(VK * 100) / 100
        const percr = Math.round(perc * 100) / 100
        return (
          <div className="space-y-2">
            <p>Volumen der Kugel und Anteil Luft:</p>
            <BlockMath math={`V_{\\text{Kugel}}=\\dfrac{4}{3}\\,\\pi r^{3}`} />
            <BlockMath
              math={`V_{\\text{Kugel}}=\\dfrac{4}{3}\\,\\pi\\cdot ${pp(r)}^{3}=\\;${pp(VKr)}\\,\\text{cm}^3`}
            />
            <BlockMath
              math={`\\dfrac{V_{\\text{Papier}}}{V_{\\text{Kugel}}}=\\dfrac{${pp(data.volSheet)}}{${pp(VKr)}}=\\;${pp(data.volSheet / VKr)}`}
            />
            <p>
              Der Anteil des Papiers in der Kugel beträgt etwa:{' '}
              <InlineMath
                math={`${pp(100 * roundToDigits(data.volSheet / VKr, 4))}\\,\\%`}
              />
            </p>
            <p>
              Damit ist der Anteil der Luft in der Kugel etwa:{' '}
              <InlineMath
                math={`${pp(100 - 100 * roundToDigits(data.volSheet / VKr, 4))}\\,\\%`}
              />
            </p>
          </div>
        )
      },
    },
  ],
}
