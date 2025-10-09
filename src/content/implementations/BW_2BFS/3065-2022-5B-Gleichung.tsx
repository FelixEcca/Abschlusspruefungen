// ============================
// 5B (3065) – Gemischte Fragen
// ============================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA {
  // Gleichung aus dem Bild
  // -2x + 1 = x^2 - 2x + 1  →  x^2 = 0
  // wir randomisieren leicht: -2x + c = x^2 - 2x + c
  c: number
}

export const exercise3065: Exercise<DATA> = {
  title: 'Gleichung',
  source: '2022 Wahlteil Aufgabe 5B',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    const c = rng.randomIntBetween(-1, 3)
    return { c }
  },

  // Original: c = 1
  originalData: { c: 1 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <div className="space-y-1">
        <p>Gegeben ist die Gleichung</p>
        <InlineMath math={`-2x+${pp(data.c)}=x^{2}-2x+${pp(data.c)}`} />
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
        return (
          <p>
            <b>1.</b> Lösen Sie die Gleichung.
          </p>
        )
      },
      solution({ data }) {
        return buildEquation([
          ['Umformen', '', `-2x+${pp(data.c)}=x^{2}-2x+${pp(data.c)}`],
          ['', '\\Rightarrow', 'x^{2}=0'],
          ['Lösung', '\\Rightarrow', 'x=0'],
        ])
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
            <b>2.</b> Eine passende Fragestellung zu Gerade und Parabel, die mit
            der obigen Gleichung gelöst werden könnte?
          </p>
        )
      },
      solution() {
        return (
          <p>
            „Bestimme die Schnittpunkte der Parabel{' '}
            <InlineMath math="y=x^{2}-2x+1" /> mit der Geraden{' '}
            <InlineMath math="y=-2x+1" />
            .“ (Antwort: ein gemeinsamer Punkt bei <InlineMath math="x=0" /> →
            Tangential-Berührung.)
          </p>
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
            <b>3.</b> Gegeben ist die Parabel <InlineMath math="y=x^{2}-2x+1" />
            . Geben Sie die Scheitelform an.
          </p>
        )
      },
      solution() {
        return <InlineMath math={'y=(x-1)^{2}+0'} />
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
            <b>4.</b> Beschreiben Sie den Verlauf der Geraden{' '}
            <InlineMath math="y=-2x+1" />.
          </p>
        )
      },
      solution() {
        return (
          <p>
            Fallende Gerade mit Steigung −2; y-Achsenabschnitt 1. Pro 1 nach
            rechts geht es 2 nach unten.
          </p>
        )
      },
    },
  ],
}
