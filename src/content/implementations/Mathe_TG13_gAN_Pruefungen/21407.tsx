import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  x1: number
  x2: number
  x3: number
}

export const exercise21407: Exercise<DATA> = {
  title:
    'Lineare Algebra: Ein eindeutig lösbares Gleichungssystem konstruieren (PLA)',
  source: '2026 Teil A Aufgabe 6 – PLA',
  useCalculator: true,
  duration: 25,
  points: 10,
  generator: rng => ({
    x1: rng.randomIntBetween(-3, 7),
    x2: rng.randomIntBetween(1, 9),
    x3: rng.randomIntBetween(2, 12),
  }),
  originalData: { x1: 2, x2: 5, x3: 11 },
  task: ({ data: d }) => (
    <>
      <p>
        Bearbeiten Sie die Aufgabe unter Berücksichtigung der einzelnen
        Problemlöseschritte. Dokumentieren und reflektieren Sie Ihre
        Vorgehensweise.
      </p>
      <p>
        Die Lösung eines linearen Gleichungssystems ist eindeutig. Sie lautet{' '}
        <InlineMath
          math={String.raw`x_1=${d.x1};\quad x_2=${d.x2};\quad x_3=${d.x3}`}
        />
        .
      </p>
      <p>
        Bestimmen Sie ein lineares Gleichungssystem mit dieser eindeutigen
        Lösung. Alle Koeffizienten der Variablen in den Gleichungen müssen
        ungleich null sein.
      </p>
    </>
  ),
  solution: ({ data: d }) => {
    const sum = d.x1 + d.x2 + d.x3
    return (
      <>
        <p>
          <strong>Planen:</strong> Wir verwenden zunächst alle Variablen mit
          Koeffizient 1. In der zweiten Gleichung verdoppeln wir den
          Koeffizienten von x₂, in der dritten den von x₃. Die rechten Seiten
          entstehen durch Einsetzen der vorgegebenen Lösung.
        </p>
        <p>
          <InlineMath
            math={String.raw`\begin{aligned}x_1+x_2+x_3&=${sum}\\x_1+2x_2+x_3&=${sum + d.x2}\\x_1+x_2+2x_3&=${sum + d.x3}\end{aligned}`}
          />
        </p>
        <p>
          <strong>Eindeutigkeit prüfen:</strong> Die zweite minus die erste
          Gleichung liefert <InlineMath math={`x_2=${d.x2}`} />, die dritte
          minus die erste <InlineMath math={`x_3=${d.x3}`} />. Danach bestimmt
          die erste Gleichung <InlineMath math={`x_1=${d.x1}`} /> eindeutig.
        </p>
        <p>
          <strong>Reflektieren:</strong> Alle neun Variablenkoeffizienten sind 1
          oder 2 und damit ungleich null. Die Rechnung zeigt nicht nur, dass das
          gewünschte Tripel eine Lösung ist, sondern auch, dass keine weitere
          Lösung existiert. Andere Systeme sind richtig, wenn sie ebenfalls
          beide Anforderungen erfüllen.
        </p>
      </>
    )
  },
}
