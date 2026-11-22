import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac } from './math'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}
export const exercise22051: Exercise<DATA> = {
  title: 'Bedingte Wahrscheinlichkeiten aus Häufigkeiten verstehen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 9),
      b: rng.randomIntBetween(1, 5),
      c: rng.randomIntBetween(3, 9),
      d: rng.randomIntBetween(1, 5),
    }
  },
  originalData: { a: 8, b: 2, c: 9, d: 1 },
  task({ data }) {
    return (
      <>
        <p>
          Die Tabelle zeigt, wie Lernende zu einem Kurs kamen. Eine Person wird
          zufällig aus der Busgruppe ausgewählt. Wie groß ist die
          Wahrscheinlichkeit, dass sie verspätet war?
        </p>
        <table className="my-3 text-sm">
          <tbody>
            <tr>
              <th className="border p-2"></th>
              <th className="border p-2">pünktlich</th>
              <th className="border p-2">verspätet</th>
            </tr>
            <tr>
              <th className="border p-2">Bus</th>
              <td className="border p-2">{data.a}</td>
              <td className="border p-2">{data.b}</td>
            </tr>
            <tr>
              <th className="border p-2">Fahrrad</th>
              <td className="border p-2">{data.c}</td>
              <td className="border p-2">{data.d}</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die Bedingung „aus der Busgruppe“ legt die Grundgesamtheit fest. Nur
          die {data.a + data.b} Personen dieser Zeile zählen; davon waren{' '}
          {data.b} verspätet.
        </p>
        <p>
          <InlineMath
            math={String.raw`P(V\mid B)=\frac{${data.b}}{${data.a + data.b}}=${frac(data.b, data.a + data.b)}`}
          />
          .
        </p>
        <p>Die gesamte Kursgröße gehört hier nicht in den Nenner.</p>
      </>
    )
  },
}
