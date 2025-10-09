// ====================================
// 2B (3056) – Eckregal & Musikbox
// ====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  legA: number // cm
  legB: number // cm
  boxA: number // cm
  boxB: number // cm
}

export const exercise3056: Exercise<DATA> = {
  title: 'Wandregal',
  source: '2022 Wahlteil Aufgabe 2B',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    const legA = 40 // an Bild angelehnt
    const legB = rng.randomItemFromArray([90, 100, 110]) // ~1 m
    const boxA = 20
    const boxB = 30
    return { legA, legB, boxA, boxB }
  },

  originalData: { legA: 40, legB: 100, boxA: 20, boxB: 30 },

  constraint() {
    return true
  },

  intro() {
    return (
      <img src="/content/BW_2BFS/3056.png" width={320} alt="Skizze Regal" />
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
            <b>1.</b> Berechnen Sie den Winkel <InlineMath math="\\alpha" /> (in
            Grad) am Eckpunkt.
          </p>
        )
      },
      solution({ data }) {
        // Modell: rechtes Dreieck mit Katheten legA (links) und legB (rechts)
        const alpha = (Math.atan(data.legA / data.legB) * 180) / Math.PI
        return (
          <InlineMath
            math={`\\alpha=\\tan^{-1}\\!\\left(\\tfrac{${pp(data.legA)}}{${pp(data.legB)}}\\right)\\approx ${pp(Math.round(alpha * 100) / 100)}^{\\circ}`}
          />
        )
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
            <b>2.</b> Maßstab: 10 cm in Realität ↔ 1 cm in Zeichnung. Prüfen
            Sie, ob eine Musikbox mit {` ${20}×${30} `}cm auf das Regal passt
            (Draufsicht).
          </p>
        )
      },
      solution({ data }) {
        const scale = 10 // 10:1
        const A = data.legA / scale,
          B = data.legB / scale
        const bx = data.boxA / scale,
          by = data.boxB / scale
        // Dreieck (rechtwinklig) mit Katheten A (links), B (rechts)
        return (
          <svg
            viewBox="0 0 220 140"
            width="320"
            height="200"
            className="border rounded"
          >
            <polygon points="20,120 200,120 20,120-{A}" fill="none" />
            {/* Koordinaten berechnen */}
            <polyline
              points={`20,120 20,${120 - A} ${20 + B},120 20,120`}
              stroke="black"
              fill="none"
              strokeWidth="2"
            />
            {/* Box als Rechteck oben auf dem Dreieck – in die Ecke geschoben */}
            <rect
              x={20}
              y={120 - A - by}
              width={bx}
              height={by}
              fill="rgba(0,0,0,0.1)"
              stroke="black"
            />
            <text x="25" y={120 - A - by - 6} fontSize="10">
              Box
            </text>
            <text x="30" y="135" fontSize="10">{`Maßstab 10 cm : 1 cm`}</text>
          </svg>
        )
      },
    },
  ],
}
