// exercise3064.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  angleDeg: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise3064: Exercise<DATA> = {
  title: 'Abbildungen 1 bis 5',
  source: 'Prüfung 2022 / Aufgabe 5A',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const a = rng.randomItemFromArray([4, 5, 6, 7, 8])
    const height = rng.randomItemFromArray([2, 3, 4])
    const angleDeg = round2((Math.atan(height / 1) * 180) / Math.PI)
    return { a, angleDeg }
  },

  originalData: {
    a: 5,
    angleDeg: round2((Math.atan(2 / 1) * 180) / Math.PI),
  },

  constraint({ data }) {
    return data.a > 0
  },

  intro() {
    return (
      <>
        <p>Gegeben sind die Abbildungen 1 bis 5.</p>
        <svg viewBox="0 0 328 220">
          <image href="/content/BW_2BFS/3064.png" height="220" width="328" />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Geben Sie an, welche Abbildungen kongruent und welche ähnlich
              zueinander sind.
            </p>
          </>
        )
      },
      solution() {
        return (
          <>
            <p>
              Kongruent sind die Figuren mit gleicher Form und gleicher Größe.
              Ähnlich sind Figuren mit gleicher Form, aber eventuell anderer
              Größe.
            </p>
            <p>Dies liest man direkt am Gitternetz ab.</p>
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Berechnen Sie die Seitenlänge a in Abbildung 2.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Ein Kästchen entspricht <InlineMath math={'1\\,\\mathrm{cm}'} />.
            </p>
            <p>
              Die gesuchte Strecke umfasst <InlineMath math={`${pp(data.a)}`} />{' '}
              Kästchen.
            </p>
            <InlineMath math={`a = ${pp(data.a)}\\,\\mathrm{cm}`} />
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Berechnen Sie den Winkel α in Abbildung 3.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Aus dem Gitternetz kann ein rechtwinkliges Dreieck abgelesen
              werden.
            </p>
            <InlineMath math={`\\tan(\\alpha) = \\frac{\\text{Gegenkathete}}{\\text{Ankathete}}`} />
            <br />
            <InlineMath math={`\\alpha \\approx ${pp(data.angleDeg)}^{\\circ}`} />
          </>
        )
      },
    },
  ],
}