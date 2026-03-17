// exercise3060.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Candle = 'A' | 'B' | 'C'

interface DATA {
  startHeight: number
  slopeA: number
  slopeB: number
  slopeC: number
  timeTo7A: number
  bA: number
  label1: Candle
  label2: Candle
  label3: Candle
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise3060: Exercise<DATA> = {
  title: 'Kerzen',
  source: 'Prüfung 2022 / Aufgabe 3C',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const startHeight = 12
    const slopeA = rng.randomItemFromArray([-1, -0.8, -0.75])
    const slopeB = rng.randomItemFromArray([-2, -1.5])
    const slopeC = rng.randomItemFromArray([-1.2, -1])
    const bA = startHeight
    const timeTo7A = round2((7 - bA) / slopeA)

    // Gerade 1 steilste, Gerade 3 flachste
    const slopes = [
      { line: '1', val: slopeB, candle: 'B' as Candle },
      { line: '2', val: slopeC, candle: 'C' as Candle },
      { line: '3', val: slopeA, candle: 'A' as Candle },
    ]

    return {
      startHeight,
      slopeA,
      slopeB,
      slopeC,
      timeTo7A,
      bA,
      label1: slopes[0].candle,
      label2: slopes[1].candle,
      label3: slopes[2].candle,
    }
  },

  originalData: {
    startHeight: 12,
    slopeA: -0.75,
    slopeB: -2,
    slopeC: -1,
    timeTo7A: round2((7 - 12) / -0.75),
    bA: 12,
    label1: 'B',
    label2: 'C',
    label3: 'A',
  },

  constraint({ data }) {
    return data.slopeB < data.slopeC && data.slopeC < data.slopeA
  },

  intro() {
    return (
      <>
        <p>
          Aus Wachs werden drei gleich hohe Kerzen A, B und C hergestellt. Diese
          werden gleichzeitig angezündet. Das Diagramm zeigt, wie im Laufe der
          Zeit (x-Achse in Stunden) die Höhe der Kerze (y-Achse in cm) abnimmt.
        </p>

        <svg viewBox="0 0 328 240">
          <image href="/content/BW_2BFS/3060.png" height="240" width="328" />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Ordnen Sie jeder Kerze eine Gerade zu und begründen Sie Ihre
              Zuordnung.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die dickste Kerze brennt am langsamsten ab, die dünnste am
              schnellsten.
            </p>
            <p>
              Daher gehört Gerade 1 zu Kerze {data.label1}, Gerade 2 zu Kerze{' '}
              {data.label2} und Gerade 3 zu Kerze {data.label3}.
            </p>
          </>
        )
      },
    },
    {
      points: 1,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Veranschaulichen Sie im Diagramm, wie lange es dauert, bis die
              Kerze A nur noch 7 cm hoch ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`t = ${pp(data.timeTo7A)}\\,\\mathrm{h}`} />
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
            <p>Geben Sie die Gleichung der Geraden zu Kerze A an.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Kerze A startet bei <InlineMath math={`${pp(data.startHeight)}`} /> cm.
            </p>
            <InlineMath
              math={`y = ${pp(data.slopeA)}x + ${pp(data.bA)}`}
            />
          </>
        )
      },
    },
  ],
}