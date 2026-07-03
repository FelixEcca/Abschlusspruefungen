// ======================================
// 1B (3051) – Sätze zuordnen & Skizze
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  starts: string[]
  ends: string[]
  // richtige Zuordnung als Index-Paare (startIndex -> endIndex)
  mapping: Array<[number, number]>
}

export const exercise3051: Exercise<DATA> = {
  title: 'Aussagen',
  source: '2022 Pflichtteil Aufgabe 1B',
  useCalculator: false,
  duration: 10,

  generator(rng) {
    // Starttexte (mit zwei zusätzlichen)
    const starts = [
      'Verschiebungen, Drehungen und Spiegelungen sind', // -> E
      'Dreiecke sind', // -> A
      'Mit Hilfe des Satzes des Thales kann man', // -> D
      'Deckungsgleich und', // -> B
      'Nach dem ersten Strahlensatz lassen sich', // -> C
      'Mit dem Satz des Pythagoras kann man', // -> F
      'Parallelen besitzen', // -> G (Zusatzaussage)
      'Die Mittelsenkrechte einer Strecke', // -> H (Zusatzaussage)
    ]
    const ends = [
      'ähnlich, wenn Winkel, die sich entsprechen, gleich groß sind.', // A
      'kongruent bedeuten das Gleiche.', // B
      'verschiedene Verhältnissgleichungen aufstellen.', // C
      'rechtwinklige Dreiecke konstruieren.', // D
      'Kongruenzabbildungen.', // E
      'prüfen, ob ein Dreieck rechtwinklig ist.', // F
      'überall den gleichen Abstand.', // G
      'liefert deren Mittelpunkt (Konstruktion).', // H
    ]
    // korrekte Paare (als Indizes) in Grundreihenfolge
    const baseMap: Array<[number, number]> = [
      [0, 4],
      [1, 0],
      [2, 3],
      [3, 1],
      [4, 2],
      [5, 5],
      [6, 6],
      [7, 7],
    ]
    // permutiere Reihenfolge der Anzeigen
    const permute = <T,>(arr: T[]) => {
      const a = [...arr]
      const out: T[] = []
      while (a.length)
        out.push(a.splice(rng.randomIntBetween(0, a.length - 1), 1)[0])
      return out
    }
    const startsP = permute(starts)
    const endsP = permute(ends)

    // Mapping an neue Indizes anpassen
    const mapping = baseMap.map(([si, ei]) => [
      startsP.indexOf(starts[si]),
      endsP.indexOf(ends[ei]),
    ]) as Array<[number, number]>

    return { starts: startsP, ends: endsP, mapping }
  },

  originalData: {
    starts: [
      'Verschiebungen, Drehungen und Spiegelungen sind',
      'Dreiecke sind',
      'Mit Hilfe des Satzes des Thales kann man',
      'Deckungsgleich und',
      'Nach dem ersten Strahlensatz lassen sich',
      'Mit dem Satz des Pythagoras kann man',
    ],
    ends: [
      'ähnlich, wenn Winkel, die sich entsprechen, gleich groß sind.',
      'kongruent bedeuten das Gleiche.',
      'verschiedene Verhältnissgleichungen aufstellen.',
      'rechtwinklige Dreiecke konstruieren.',
      'Kongruenzabbildungen.',
      'prüfen, ob ein Dreieck rechtwinklig ist.',
    ],
    mapping: [
      [0, 4],
      [1, 0],
      [2, 3],
      [3, 1],
      [4, 2],
      [5, 5],
    ],
  },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <>
        <p>Gegeben sind folgende Satzanfänge und Satzenden</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p>
              <b>Satzanfänge</b>
            </p>
            <ol className="list-decimal ml-5 text-xs">
              {data.starts.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
          <div>
            <p>
              <b>Satzenden</b>
            </p>
            <ol className="list-[upper-alpha] ml-5 text-xs">
              {data.ends.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </>
    )
  },

  tasks: [
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return <p>Ordnen Sie jedem Satzanfang ein passendes Satzende zu.</p>
      },
      solution({ data }) {
        // zeige Lösung als Tabelle Startindex -> Endbuchstabe
        const letter = (j: number) => String.fromCharCode('A'.charCodeAt(0) + j)
        return (
          <ul className="list-decimal ml-5">
            {data.mapping.map(([i, j], k) => (
              <li key={k}>
                Start {i + 1} → Ende {letter(j)}
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
            Zeichnen Sie zwei Figuren, die ähnlich, aber nicht kongruent sind.
          </p>
        )
      },
      solution() {
        // zwei ähnliche Dreiecke (Skizze)
        return (
          <>
            <svg
              viewBox="0 0 320 160"
              width="320"
              height="160"
              className="border rounded"
            >
              <polyline
                points="40,120 140,120 60,40 40,120"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />

              <text x="80" y="135">
                Dreieck 1
              </text>
            </svg>
            <svg
              viewBox="0 0 320 160"
              width="320"
              height="160"
              className="border rounded"
            >
              <polyline
                points="50,90 100,90 60,50 50,90"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              <text x="70" y="135">
                Dreieck 2 (ähnlich, kleiner)
              </text>
            </svg>
          </>
        )
      },
    },
  ],
}
