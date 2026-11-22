import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, ProbabilityTree } from './math'

interface DATA {
  red: number
  blue: number
}
export const exercise22039: Exercise<DATA> = {
  title: 'Ein Baumdiagramm mit Zurücklegen ergänzen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return { red: rng.randomIntBetween(1, 5), blue: rng.randomIntBetween(1, 5) }
  },
  originalData: { red: 2, blue: 3 },
  task({ data }) {
    return (
      <>
        <p>
          Es liegen {data.red} rote (R) und {data.blue} blaue (B) Kugeln in
          einer Urne. Es wird zweimal mit Zurücklegen gezogen. Ergänzen Sie die
          sechs Zweigwahrscheinlichkeiten.
        </p>
        <ProbabilityTree
          first={[
            { label: 'R', probability: '?' },
            { label: 'B', probability: '?' },
          ]}
          second={[
            [
              { label: 'R', probability: '?' },
              { label: 'B', probability: '?' },
            ],
            [
              { label: 'R', probability: '?' },
              { label: 'B', probability: '?' },
            ],
          ]}
        />
      </>
    )
  },
  solution({ data }) {
    const r = frac(data.red, data.red + data.blue),
      b = frac(data.blue, data.red + data.blue)
    return (
      <>
        <p>
          Nach dem Zurücklegen ist die Zusammensetzung unverändert. Auf jeder
          Stufe gilt <InlineMath math={String.raw`P(R)=${r},\quad P(B)=${b}`} />
          .
        </p>
        <ProbabilityTree
          first={[
            { label: 'R', probability: r },
            { label: 'B', probability: b },
          ]}
          second={[
            [
              { label: 'R', probability: r },
              { label: 'B', probability: b },
            ],
            [
              { label: 'R', probability: r },
              { label: 'B', probability: b },
            ],
          ]}
        />
        <p>
          An jeder Verzweigung addieren sich die beiden Wahrscheinlichkeiten zu
          1.
        </p>
      </>
    )
  },
}
