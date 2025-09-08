// ==========================================
// 1D (3053) – p: (x+3)^2+1 ; g: 6x+2 (Skalieren)
// ==========================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // kleine Variation erlaubt (Skalierungshilfe): Schrittweiten
  step: number
}

export const exercise3053: Exercise<DATA> = {
  title: 'Schaubilder',
  source: '2022 Pflichtteil Aufgabe 1D',
  useCalculator: false,
  duration: 8,

  generator(rng) {
    return { step: rng.randomItemFromArray([0.5, 1]) }
  },

  originalData: { step: 1 },

  constraint() {
    return true
  },

  intro() {
    return (
      <>
        <p>
          Gegeben sind die Funktionen <InlineMath math="p: y=(x+3)^2+1" /> und{' '}
          <InlineMath math="g: y=6x+2" />.
        </p>
        <p>Beschriften und skalieren Sie das Koordinatensystem vollständig.</p>
      </>
    )
  },

  tasks: [
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            Geben Sie drei gut zeichnbare Punkte auf <InlineMath math="p" /> für
            die Schrittweite {pp(data.step)} an.
          </p>
        )
      },
      solution({ data }) {
        const xs = [-5, -3, -1].map(v => v * data.step + (1 - data.step) * -3)
        const pts = xs.map(x => ({ x, y: (x + 3) ** 2 + 1 }))
        return (
          <ul className="list-disc ml-6">
            {pts.map((p, i) => (
              <li key={i}>
                <InlineMath math={`(${pp(p.x)}\\mid ${pp(p.y)})`} />
              </li>
            ))}
          </ul>
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Bestimmen Sie zwei Punkte auf <InlineMath math="g" />.
          </p>
        )
      },
      solution() {
        return (
          <ul className="list-disc ml-6">
            <li>
              <InlineMath math="(0\mid 2)" />
            </li>
            <li>
              <InlineMath math="(1\mid 8)" />
            </li>
          </ul>
        )
      },
    },
  ],
}
