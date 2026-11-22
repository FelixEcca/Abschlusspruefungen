import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  count: number
  excess: number
}
export const exercise22077: Exercise<DATA> = {
  title: 'Alle natürlichen Lösungen eines Gleichungssystems finden',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    const count = rng.randomIntBetween(8, 14)
    return { count, excess: count + rng.randomIntBetween(3, 5) }
  },
  originalData: { count: 10, excess: 14 },
  task({ data }) {
    return (
      <>
        <p>
          Bestimmen Sie alle Lösungen mit{' '}
          <InlineMath math={String.raw`x,y,z\in\mathbb N_0`} />, also
          einschließlich der Null.
        </p>
        <p>
          <InlineMath
            math={String.raw`\begin{aligned}x+y+z&=${data.count}\\x+2y+4z&=${data.count + data.excess}\end{aligned}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const solutions = []
    for (let z = 0; z <= data.count; z++) {
      const y = data.excess - 3 * z,
        x = data.count - data.excess + 2 * z
      if (x >= 0 && y >= 0) solutions.push([x, y, z])
    }
    return (
      <>
        <p>
          Die zweite minus die erste Gleichung ergibt{' '}
          <InlineMath math={String.raw`y+3z=${data.excess}`} />. Daher gilt
        </p>
        <p>
          <InlineMath
            math={String.raw`y=${data.excess}-3z,\quad x=${data.count - data.excess}+2z`}
          />
          .
        </p>
        <p>
          Beide Werte müssen nicht negativ sein. Für die ganze Zahl z bleiben
          deshalb nur die Werte {solutions.map(v => v[2]).join(', ')}.
        </p>
        <p>
          <InlineMath
            math={String.raw`L=\{${solutions.map(v => String.raw`(${v.join(';')})`).join(', ')}\}`}
          />
          .
        </p>
        <p>
          Weitere Lösungen sind ausgeschlossen, weil kleinere z negative x und
          größere z negative y ergeben. Einsetzen bestätigt beide
          Ausgangsgleichungen.
        </p>
      </>
    )
  },
}
