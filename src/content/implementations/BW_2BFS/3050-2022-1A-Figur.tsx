// =============================
// 1A (3050) – Terme zum Umfang
// =============================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // für (1): Reihenfolge der Antwortvorschläge
  opts1: string[]
  // für (2): Reihenfolge der Antwortvorschläge
  opts2: string[]
}

export const exercise3050: Exercise<DATA> = {
  title: 'Umfangsterme & Pyramidenkanten',
  source: '2022 Aufgabe 1A',
  useCalculator: false,
  duration: 10,

  generator(rng) {
    // gleiche vier Vorschläge wie im Original, aber in zufälliger Reihenfolge
    const pool1 = [
      '2(2x + 4 + 2x + x)', // korrekt
      '(2x + 4) · 2x · x', // falsch
      '10x + 8', // korrekt
      '2(2x + 4) + 6x', // korrekt
    ]
    const order1: string[] = []
    while (pool1.length)
      order1.push(pool1.splice(rng.randomIntBetween(0, pool1.length - 1), 1)[0])

    const pool2 = [
      '4a + 4s', // korrekt
      '4(a+s)', // korrekt (äquivalent)
      'a + a + a + a + 4s', // korrekt (äquivalent)
      '4a + s', // falsch (nur eine Seitenkante)
    ]
    const order2: string[] = []
    while (pool2.length)
      order2.push(pool2.splice(rng.randomIntBetween(0, pool2.length - 1), 1)[0])

    return { opts1: order1, opts2: order2 }
  },

  // Original: feste Figur/Termvorschläge
  originalData: {
    opts1: [
      '2(2x + 4 + 2x + x)',
      '(2x + 4) · 2x · x',
      '10x + 8',
      '2(2x + 4) + 6x',
    ],
    opts2: ['4a + 4s', '4(a+s)', 'a + a + a + a + 4s', '4a + s'],
  },

  constraint() {
    return true
  },

  intro() {
    // Statische Skizze (vereinfacht) – ändert sich NICHT mit den Daten
    return (
      <div className="space-y-2">
        <p>
          Rechts sehen Sie eine punkt­symmetrische Figur. Unten steht{' '}
          <InlineMath math="2x+4" />, rechts die Kanten <InlineMath math="x" />{' '}
          und <InlineMath math="2x" />.
        </p>
        <svg
          viewBox="0 0 320 140"
          width="320"
          height="140"
          className="border rounded"
        >
          {/* Sechseck-ähnliche, punktsymmetrische Kontur */}
          <polyline
            points="40,30 260,30 290,55 260,80 60,80 40,60 40,30"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          <text x="150" y="95" fontSize="14">
            2x + 4
          </text>
          <text x="280" y="40" fontSize="14">
            2x
          </text>
          <text x="280" y="75" fontSize="14">
            x
          </text>
        </svg>
      </div>
    )
  },

  tasks: [
    // (1) Umfangsterme beurteilen
    {
      points: 6,
      intro() {
        return (
          <p>
            <b>1.</b> Entscheiden Sie jeweils, ob die Formel den <b>Umfang</b>{' '}
            der Figur beschreibt.
          </p>
        )
      },
      task({ data }) {
        return (
          <ul className="list-disc ml-6">
            {data.opts1.map((t, i) => (
              <li key={i}>
                <InlineMath math={t.replaceAll('·', '\\cdot')} /> – passt /
                passt nicht
              </li>
            ))}
          </ul>
        )
      },
      solution() {
        // Korrekt: 2(2x+4+2x+x), 10x+8, 2(2x+4)+6x ; Falsch: (2x+4)·2x·x
        return (
          <ul className="list-disc ml-6">
            <li>
              <InlineMath math={'2(2x+4+2x+x)'} /> ✅
            </li>
            <li>
              <InlineMath math={'(2x+4)\\cdot2x\\cdot x'} /> ❌
            </li>
            <li>
              <InlineMath math={'10x+8'} /> ✅
            </li>
            <li>
              <InlineMath math={'2(2x+4)+6x'} /> ✅
            </li>
          </ul>
        )
      },
    },
    // (2) Pyramidenkanten
    {
      points: 6,
      intro() {
        return (
          <p>
            <b>2.</b> Eine Pyramide hat quadratische Grundfläche (Grundkante{' '}
            <InlineMath math="a" />) und 4 Seitenkanten der Länge{' '}
            <InlineMath math="s" />. Entscheiden Sie: Welcher Term ist die{' '}
            <b>Gesamtlänge aller Kanten</b>?
          </p>
        )
      },
      task({ data }) {
        return (
          <ul className="list-disc ml-6">
            {data.opts2.map((t, i) => (
              <li key={i}>
                <InlineMath math={t.replaceAll('·', '\\cdot')} /> – passt /
                passt nicht
              </li>
            ))}
          </ul>
        )
      },
      solution() {
        return (
          <ul className="list-disc ml-6">
            <li>
              <InlineMath math={'4a+4s'} /> ✅
            </li>
            <li>
              <InlineMath math={'4(a+s)'} /> ✅
            </li>
            <li>
              <InlineMath math={'a+a+a+a+4s'} /> ✅
            </li>
            <li>
              <InlineMath math={'4a+s'} /> ❌
            </li>
          </ul>
        )
      },
    },
  ],
}
