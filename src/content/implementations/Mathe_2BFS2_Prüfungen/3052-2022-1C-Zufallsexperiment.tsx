// =====================================
// 1C (3052) – Urne & Baumdiagramm
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  total: number
  red: number
  withReplacement: boolean
}

function fracLatex(n: number, d: number) {
  return `\\dfrac{${n}}{${d}}`
}

function FractionInSvg(props: { x: number; y: number; n: number; d: number }) {
  return (
    <foreignObject x={props.x} y={props.y} width={34} height={35}>
      <div
        style={{
          fontSize: '12px',
          color: 'black',
          width: '34px',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <InlineMath math={fracLatex(props.n, props.d)} />
      </div>
    </foreignObject>
  )
}

export const exercise3052: Exercise<DATA> = {
  title: 'Zufallsexperiment',
  source: '2022 Pflichtteil Aufgabe 1C',
  useCalculator: false,
  duration: 12,

  generator(rng) {
    const total = rng.randomIntBetween(8, 14)
    const red = rng.randomIntBetween(3, total - 3)
    const withReplacement = rng.randomItemFromArray([true, false])
    return { total, red, withReplacement }
  },

  originalData: { total: 11, red: 4, withReplacement: false },

  constraint({ data }) {
    return data.red > 0 && data.red < data.total && data.red != data.total / 2
  },

  intro({ data }) {
    return (
      <div className="space-y-2">
        <p>
          In einer Urne sind rote und blaue Kugeln. Es werden zwei Kugeln
          gezogen. Das Experiment ist durch das Baumdiagramm dargestellt.
        </p>

        <svg viewBox="0 0 328 160">
          <image
            href="/content/Mathe_2BFS2/3052_Baum.png"
            height="160"
            width="328"
          />

          <FractionInSvg x={85} y={0} n={data.red} d={data.total} />

          <FractionInSvg
            x={20}
            y={75}
            n={data.withReplacement ? data.red : data.red - 1}
            d={data.withReplacement ? data.total : data.total - 1}
          />
        </svg>
      </div>
    )
  },

  tasks: [
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Begründen Sie anhand des Baumdiagramms:</p>
            <ul className="list-disc ml-6">
              <li>
                Wie viele rote und blaue Kugeln sind zu Beginn in der Urne?
              </li>
              <li>Werden die Kugeln mit oder ohne Zurücklegen gezogen?</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Zu Beginn: {data.red} rote und {data.total - data.red} blaue
              Kugeln.
            </p>
            <p>
              Es wird {data.withReplacement ? 'mit' : 'ohne'} Zurücklegen
              gezogen.
            </p>
          </>
        )
      },
    },
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Ergänzen Sie die fehlenden Wahrscheinlichkeiten im Baumdiagramm.
          </p>
        )
      },
      solution({ data }) {
        return (
          <svg viewBox="0 0 328 160">
            <image
              href="/content/Mathe_2BFS2/3052_Baum.png"
              height="160"
              width="328"
            />

            <FractionInSvg x={85} y={0} n={data.red} d={data.total} />
            <FractionInSvg
              x={230}
              y={0}
              n={data.total - data.red}
              d={data.total}
            />

            <FractionInSvg
              x={20}
              y={75}
              n={data.withReplacement ? data.red : data.red - 1}
              d={data.withReplacement ? data.total : data.total - 1}
            />

            <FractionInSvg
              x={100}
              y={75}
              n={
                data.withReplacement
                  ? data.total - data.red
                  : data.total - data.red
              }
              d={data.withReplacement ? data.total : data.total - 1}
            />

            <FractionInSvg
              x={210}
              y={75}
              n={data.withReplacement ? data.red : data.red}
              d={data.withReplacement ? data.total : data.total - 1}
            />

            <FractionInSvg
              x={290}
              y={75}
              n={
                data.withReplacement
                  ? data.total - data.red
                  : data.total - data.red - 1
              }
              d={data.withReplacement ? data.total : data.total - 1}
            />
          </svg>
        )
      },
    },
  ],
}
