import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { ProbabilityTree } from './diagrams'
interface DATA {
  r: number
  y: number
  b?: number
  excluded?: number
}
function values(d: DATA) {
  const counts = [d.r, d.y, d.b ?? 1],
    names = ['rot', 'gelb', 'blau'],
    labels = ['R', 'G', 'B'],
    n = counts.reduce((a, b) => a + b, 0),
    i = d.excluded ?? 0,
    j = (i + 1) % 3,
    other = (i + 2) % 3
  return { counts, names, labels, n, i, j, other }
}
export const exercise21301: Exercise<DATA> = {
  title: 'Stochastik: Zweimaliges Ziehen ohne Zurücklegen',
  source: '2025 Pflichtteil Aufgabe 2',
  useCalculator: false,
  duration: 12,
  generator: rng => ({
    r: rng.randomIntBetween(2, 7),
    y: rng.randomIntBetween(2, 6),
    b: rng.randomIntBetween(1, 5),
    excluded: rng.randomIntBetween(0, 2),
  }),
  originalData: { r: 3, y: 2 },
  intro: ({ data: d }) => (
    <p>
      Eine Urne enthält {d.r} rote, {d.y} gelbe und {d.b ?? 1} blaue Kugeln.
      Nacheinander werden zufällig zwei Kugeln ohne Zurücklegen gezogen und ihre
      Farben notiert.
    </p>
  ),
  tasks: [
    {
      points: 3,
      task: () => (
        <p>
          Stellen Sie die Situation durch ein geeignetes beschriftetes
          Baumdiagramm dar.
        </p>
      ),
      solution: ({ data }) => {
        const { counts, labels, n } = values(data)
        return (
          <>
            <p>
              R: rot; G: gelb; B: blau. Im zweiten Zug ist insgesamt eine Kugel
              weniger vorhanden. Bei der zuerst gezogenen Farbe reduziert sich
              auch der Zähler um eins.
            </p>
            <ProbabilityTree
              first={counts.map((c, i) => ({
                label: labels[i],
                probability: `${c}/${n}`,
              }))}
              second={counts.map((_, i) =>
                counts.flatMap((c, j) =>
                  c - (i === j ? 1 : 0) > 0
                    ? [
                        {
                          label: labels[j],
                          probability: `${c - (i === j ? 1 : 0)}/${n - 1}`,
                        },
                      ]
                    : [],
                ),
              )}
            />
          </>
        )
      },
    },
    {
      points: 2,
      task: ({ data }) => {
        const { counts, n, i, j } = values(data)
        return (
          <p>
            Formulieren Sie ein Ereignis, dessen Wahrscheinlichkeit sich mit{' '}
            <InlineMath
              math={String.raw`1-\frac{${counts[i]}}{${n}}\cdot\frac{${counts[i] - 1}}{${n - 1}}-\frac{${counts[j]}}{${n}}\cdot\frac{${counts[j] - 1}}{${n - 1}}`}
            />{' '}
            berechnen lässt.
          </p>
        )
      },
      solution: ({ data }) => {
        const { names, counts, i, j, other } = values(data)
        return (
          <>
            <p>
              Vom sicheren Ereignis werden „zweimal {names[i]}“ und „zweimal{' '}
              {names[j]}“ abgezogen. Ein passendes Ereignis ist: Die Kugeln
              haben verschiedene Farben
              {counts[other] > 1 ? ` oder sind beide ${names[other]}` : '.'}
              {counts[other] > 1 ? '.' : ''}
            </p>
            {counts[other] === 1 && (
              <p>
                Zweimal {names[other]} ist unmöglich, weil es nur eine Kugel
                dieser Farbe gibt.
              </p>
            )}
          </>
        )
      },
    },
  ],
}
