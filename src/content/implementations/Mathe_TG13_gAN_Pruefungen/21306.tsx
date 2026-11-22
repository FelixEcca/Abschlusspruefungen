import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  count: number
  excess: number
  unit: number
}

export const exercise21306: Exercise<DATA> = {
  title: 'Lineare Algebra: Ein Gleichungssystem in natürlichen Zahlen',
  source: '2025 Teil A Aufgabe 5 – Auswahl II',
  useCalculator: false,
  duration: 12,
  points: 5,
  generator(rng) {
    const count = rng.randomIntBetween(10, 18)
    return {
      count,
      excess: count + rng.randomIntBetween(3, 8),
      unit: rng.randomIntBetween(2, 5),
    }
  },
  originalData: { count: 12, excess: 18, unit: 5 },
  task: ({ data: d }) => (
    <>
      <p>Gegeben ist das lineare Gleichungssystem</p>
      <p>
        <InlineMath
          math={String.raw`\begin{aligned}x+y+z&=${d.count}\\${d.unit}x+${2 * d.unit}y+${4 * d.unit}z&=${d.unit * (d.count + d.excess)}\end{aligned}`}
        />
        .
      </p>
      <p>Berechnen Sie die Lösungen, wenn x, y und z natürliche Zahlen sind.</p>
    </>
  ),
  solution: ({ data: d }) => {
    const solutions = []
    for (let z = 0; z <= d.count; z++) {
      const y = d.excess - 3 * z,
        x = d.count - d.excess + 2 * z
      if (x >= 0 && y >= 0) solutions.push([x, y, z])
    }
    return (
      <>
        <p>
          Teilen Sie die zweite Gleichung durch {d.unit} und ziehen Sie die
          erste ab:
        </p>
        <p>
          <InlineMath
            math={String.raw`y+3z=${d.excess},\quad y=${d.excess}-3z,\quad x=${d.count - d.excess}+2z`}
          />
          .
        </p>
        <p>
          Aus <InlineMath math={String.raw`x,y,z\ge0`} /> folgt{' '}
          <InlineMath
            math={String.raw`\left\lceil\frac{${d.excess - d.count}}2\right\rceil\le z\le\left\lfloor\frac{${d.excess}}3\right\rfloor`}
          />
          . Damit erhält man bei Einschluss der Null:
        </p>
        <p>
          <InlineMath
            math={String.raw`L_0=\left\{${solutions.map(v => `(${v.join(';')})`).join(', ')}\right\}`}
          />
          .
        </p>
        <p>
          Falls die natürlichen Zahlen in der verwendeten Konvention erst bei 1
          beginnen, bleiben nur die Tripel mit drei positiven Einträgen:
        </p>
        <p>
          <InlineMath
            math={String.raw`L=\left\{${solutions
              .filter(v => v.every(x => x > 0))
              .map(v => `(${v.join(';')})`)
              .join(', ')}\right\}`}
          />
          .
        </p>
        <p>
          Durch Einsetzen in beide Ausgangsgleichungen lassen sich alle Tripel
          überprüfen.
        </p>
      </>
    )
  },
}
