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

function toX(n: number) {
  return 36 + n * 16
}

function toY(n: number) {
  return 210 - n * 14
}

function visibleLinePoints(m: number, b: number, xMax = 16, step = 0.05) {
  let pts = ''
  for (let x = 0; x <= xMax; x += step) {
    const y = m * x + b
    if (y >= 0 && y <= 13) {
      pts += `${toX(x)},${toY(y)} `
    }
  }
  return pts.trim()
}

function CandleGraphSvg(props: {
  startHeight: number
  slope1: number
  slope2: number
  slope3: number
  showHelperForA?: boolean
  timeTo7A?: number
}) {
  const { startHeight, slope1, slope2, slope3, showHelperForA, timeTo7A } =
    props

  const points1 = visibleLinePoints(slope1, startHeight)
  const points2 = visibleLinePoints(slope2, startHeight)
  const points3 = visibleLinePoints(slope3, startHeight)

  return (
    <svg viewBox="0 0 328 240">
      {/* Gitter */}
      {Array.from({ length: 17 }, (_, i) => (
        <line
          key={`v-${i}`}
          x1={toX(i)}
          y1={20}
          x2={toX(i)}
          y2={210}
          stroke="#bdbdbd"
          strokeWidth={i % 2 === 0 ? 1 : 0.5}
        />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line
          key={`h-${i}`}
          x1={36}
          y1={toY(i)}
          x2={292}
          y2={toY(i)}
          stroke="#bdbdbd"
          strokeWidth={i % 2 === 0 ? 1 : 0.5}
        />
      ))}

      {/* Achsen */}
      <line
        x1={36}
        y1={210}
        x2={300}
        y2={210}
        stroke="black"
        strokeWidth="1.5"
      />
      <line x1={36} y1={210} x2={36} y2={18} stroke="black" strokeWidth="1.5" />
      <polygon points="300,210 292,206 292,214" fill="black" />
      <polygon points="36,18 32,26 40,26" fill="black" />

      {/* Achsenlabels */}
      <text x={304} y={214} fontSize="14">
        x
      </text>
      <text x={40} y={18} fontSize="14">
        y
      </text>

      {/* Ticklabels */}
      {Array.from({ length: 9 }, (_, i) => i * 2).map(x => (
        <g key={`xt-${x}`}>
          <line
            x1={toX(x)}
            y1={206}
            x2={toX(x)}
            y2={214}
            stroke="black"
            strokeWidth="1"
          />
          <text x={toX(x) - 4} y={226} fontSize="11">
            {x}
          </text>
        </g>
      ))}
      {Array.from({ length: 7 }, (_, i) => i * 2).map(y => (
        <g key={`yt-${y}`}>
          <line
            x1={32}
            y1={toY(y)}
            x2={40}
            y2={toY(y)}
            stroke="black"
            strokeWidth="1"
          />
          <text x={18} y={toY(y) + 4} fontSize="11">
            {y}
          </text>
        </g>
      ))}

      {/* Geraden */}
      <polyline points={points1} stroke="black" strokeWidth="1.8" fill="none" />
      <polyline points={points2} stroke="black" strokeWidth="1.8" fill="none" />
      <polyline points={points3} stroke="black" strokeWidth="1.8" fill="none" />

      {/* Beschriftungen */}
      <text x={58} y={toY(2.2)} fontSize="12">
        Gerade 1
      </text>
      <text x={160} y={toY(1.1)} fontSize="12">
        Gerade 2
      </text>
      <text x={206} y={toY(4.2)} fontSize="12">
        Gerade 3
      </text>

      {/* Hilfslinien für Teil b */}
      {showHelperForA && timeTo7A !== undefined && (
        <>
          <line
            x1={toX(0)}
            y1={toY(7)}
            x2={toX(timeTo7A)}
            y2={toY(7)}
            stroke="red"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <line
            x1={toX(timeTo7A)}
            y1={toY(7)}
            x2={toX(timeTo7A)}
            y2={toY(0)}
            stroke="red"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <circle cx={toX(timeTo7A)} cy={toY(7)} r="3" fill="red" />
        </>
      )}
    </svg>
  )
}

export const exercise3060: Exercise<DATA> = {
  title: 'Kerzen',
  source: 'Prüfung 2022 / Aufgabe 3C',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const templates = [
      { startHeight: 12, slopeC: -0.75, slopeB: -2, slopeA: -1 },
      { startHeight: 12, slopeC: -0.6, slopeB: -2.4, slopeA: -1.2 },
      { startHeight: 12, slopeC: -0.8, slopeB: -2, slopeA: -1.4 },
      { startHeight: 10, slopeC: -0.5, slopeB: -2, slopeA: -1 },
      { startHeight: 14, slopeC: -0.7, slopeB: -2.8, slopeA: -1.4 },
      { startHeight: 14, slopeC: -0.5, slopeB: -2.5, slopeA: -1.25 },
    ]

    const choice = rng.randomItemFromArray(templates)
    const startHeight = choice.startHeight
    const slopeA = choice.slopeA
    const slopeB = choice.slopeB
    const slopeC = choice.slopeC
    const bA = startHeight
    const timeTo7A = round2((7 - bA) / slopeA)

    return {
      startHeight,
      slopeA,
      slopeB,
      slopeC,
      timeTo7A,
      bA,
      label1: 'B',
      label2: 'A',
      label3: 'C',
    }
  },

  originalData: {
    startHeight: 12,
    slopeA: -1,
    slopeB: -2,
    slopeC: -12 / 14,
    timeTo7A: round2((7 - 12) / -1),
    bA: 12,
    label1: 'B',
    label2: 'A',
    label3: 'C',
  },

  constraint({ data }) {
    return (
      data.slopeB < data.slopeC &&
      data.slopeC < data.slopeA &&
      data.startHeight > 7 &&
      data.timeTo7A > 0 &&
      data.timeTo7A < 16
    )
  },

  intro({ data }) {
    return (
      <>
        <p>
          Aus Wachs werden drei gleich hohe Kerzen A, B und C hergestellt. Diese
          werden gleichzeitig angezündet. Das Diagramm zeigt, wie im Laufe der
          Zeit (x-Achse in Stunden) die Höhe der Kerze (y-Achse in cm) abnimmt.
        </p>

        <svg viewBox="0 0 328 80">
          <image href="/content/BW_2BFS/3060.png" height="80" width="328" />
        </svg>

        <CandleGraphSvg
          startHeight={data.startHeight}
          slope1={data.slopeB}
          slope2={data.slopeC}
          slope3={data.slopeA}
        />
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
              Die dünnste Kerze brennt am schnellsten ab, die dickste am
              langsamsten. Die mittlere Form liegt dazwischen.
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
            <p>
              Kerze A gehört zu Gerade 3. Im Diagramm wird bei{' '}
              <InlineMath math={`y = 7`} /> waagrecht bis zur Geraden und von
              dort senkrecht zur x-Achse gegangen.
            </p>

            <CandleGraphSvg
              startHeight={data.startHeight}
              slope1={data.slopeB}
              slope2={data.slopeC}
              slope3={data.slopeA}
              showHelperForA
              timeTo7A={data.timeTo7A}
            />

            <p>
              Man liest ab:{' '}
              <InlineMath
                math={`t \\approx ${pp(data.timeTo7A)}\\,\\mathrm{h}`}
              />
              .
            </p>
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
              Kerze A startet bei{' '}
              <InlineMath math={`${pp(data.startHeight)}`} /> cm und hat die
              Steigung <InlineMath math={`${pp(data.slopeA)}`} />.
            </p>
            <InlineMath math={`y = ${pp(data.slopeA)}x + ${pp(data.bA)}`} />
          </>
        )
      },
    },
  ],
}
