// =====================================
// 1C (3052) – Urne & Baumdiagramm
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  total: number
  red: number
  withReplacement: boolean
}

export const exercise3052: Exercise<DATA> = {
  title: 'Zufallsexperiment',
  source: '2022 Pflichtteil Aufgabe 1C',
  useCalculator: false,
  duration: 12,

  generator(rng) {
    // wähle Gesamtzahl und Anzahl roter Kugeln
    const total = rng.randomIntBetween(8, 14)
    const red = rng.randomIntBetween(3, total - 3)
    const withReplacement = rng.randomItemFromArray([true, false])
    return { total, red, withReplacement }
  },

  // Original: 11 Kugeln gesamt, 4 rot, ohne Zurücklegen (siehe Brüche 4/11 und 3/10)
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
        {/* eslint-disable-next-line jsx-a11y/alt-text */}

        <svg viewBox="0 0 328 160">
          <image
            href="/content/BW_2BFS/3052_Baum.png"
            height="160"
            width="328"
          />
          <foreignObject x={85} y={0} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac(data.red / data.total)}
            </div>
          </foreignObject>
          <foreignObject x={20} y={75} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {data.withReplacement
                ? ppFrac(data.red / data.total)
                : ppFrac((data.red - 1) / (data.total - 1))}
            </div>
          </foreignObject>
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
      task({ data }) {
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
        const pR1 = data.red / data.total
        const pB1 = 1 - pR1
        const pR2r = data.withReplacement
          ? pR1
          : (data.red - 1) / (data.total - 1)
        const pB2r = 1 - pR2r
        const pR2b = data.withReplacement ? pR1 : data.red / (data.total - 1)
        const pB2b = 1 - pR2b
        // Darstellung mit foreignObject
        return (
          <svg viewBox="0 0 328 160">
            <image
              href="/content/BW_2BFS/3052_Baum.png"
              height="160"
              width="328"
            />
            <foreignObject x={85} y={0} width={20} height={45}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'black',
                  transform: 'scale(1)',
                }}
              >
                {ppFrac(data.red / data.total)}
              </div>
            </foreignObject>
            <foreignObject x={230} y={0} width={20} height={45}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'black',
                  transform: 'scale(1)',
                }}
              >
                {ppFrac((data.total - data.red) / data.total)}
              </div>
            </foreignObject>
            <foreignObject x={20} y={75} width={20} height={45}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'black',
                  transform: 'scale(1)',
                }}
              >
                {data.withReplacement
                  ? ppFrac(data.red / data.total)
                  : ppFrac((data.red - 1) / (data.total - 1))}
              </div>
            </foreignObject>

            <foreignObject x={100} y={75} width={20} height={45}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'black',
                  transform: 'scale(1)',
                }}
              >
                {data.withReplacement
                  ? ppFrac((data.total - data.red) / data.total)
                  : ppFrac((data.total - data.red) / (data.total - 1))}
              </div>
            </foreignObject>
            <foreignObject x={210} y={75} width={20} height={45}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'black',
                  transform: 'scale(1)',
                }}
              >
                {data.withReplacement
                  ? ppFrac(data.red / data.total)
                  : ppFrac(data.red / (data.total - 1))}
              </div>
            </foreignObject>
            <foreignObject x={290} y={75} width={20} height={45}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'black',
                  transform: 'scale(1)',
                }}
              >
                {data.withReplacement
                  ? ppFrac((data.total - data.red) / data.total)
                  : ppFrac((data.total - data.red - 1) / (data.total - 1))}
              </div>
            </foreignObject>
          </svg>
        )
      },
    },
  ],
}
