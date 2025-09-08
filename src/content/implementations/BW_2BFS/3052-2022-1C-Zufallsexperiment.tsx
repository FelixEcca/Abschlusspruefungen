// =====================================
// 1C (3052) – Urne & Baumdiagramm
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

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
    return data.red > 0 && data.red < data.total
  },

  intro({ data }) {
    return (
      <div className="space-y-2">
        <p>
          In einer Urne sind rote und blaue Kugeln. Es werden zweimal
          nacheinander eine Kugel gezogen.
        </p>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src="/content/BW_2BFS/3052_Baum.png" width={320} />
        <p>
          Ist mit oder ohne Zurücklegen? Ergänzen Sie die Wahrscheinlichkeiten.
        </p>
        {/* Beschriftete Brüche (Platzhalter) */}
        <svg
          viewBox="0 0 320 160"
          width="320"
          height="160"
          className="border rounded"
        >
          {/* Stamm */}
          <line x1="20" y1="140" x2="100" y2="80" stroke="black" />
          <line x1="20" y1="140" x2="100" y2="140" stroke="black" />
          {/* erste Ebene r/b */}
          <line x1="100" y1="80" x2="200" y2="60" stroke="black" />
          <line x1="100" y1="80" x2="200" y2="100" stroke="black" />
          <line x1="100" y1="140" x2="200" y2="120" stroke="black" />
          <line x1="100" y1="140" x2="200" y2="160" stroke="black" />
          {/* Brüche als foreignObject */}
          <foreignObject x="110" y="58" width="60" height="24">
            <div style={{ fontSize: 12 }}>r</div>
          </foreignObject>
          <foreignObject x="110" y="98" width="60" height="24">
            <div style={{ fontSize: 12 }}>b</div>
          </foreignObject>
          {/* zeigt, dass Brüche einzutragen sind */}
        </svg>
      </div>
    )
  },

  tasks: [
    {
      points: 6,
      intro() {
        return (
          <p>
            <b>1.</b> Begründen Sie anhand des Baumdiagramms:
          </p>
        )
      },
      task({ data }) {
        return (
          <ul className="list-disc ml-6">
            <li>Wie viele rote und blaue Kugeln sind zu Beginn in der Urne?</li>
            <li>Werden die Kugeln mit oder ohne Zurücklegen gezogen?</li>
          </ul>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Zu Beginn: <b>{data.red}</b> rote und{' '}
              <b>{data.total - data.red}</b> blaue Kugeln.
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
            <b>2.</b> Ergänzen Sie die fehlenden Wahrscheinlichkeiten im
            Baumdiagramm.
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
          <svg
            viewBox="0 0 320 160"
            width="320"
            height="160"
            className="border rounded"
          >
            {/* Struktur */}
            <line x1="20" y1="140" x2="100" y2="80" stroke="black" />
            <line x1="20" y1="140" x2="100" y2="140" stroke="black" />
            <line x1="100" y1="80" x2="200" y2="60" stroke="black" />
            <line x1="100" y1="80" x2="200" y2="100" stroke="black" />
            <line x1="100" y1="140" x2="200" y2="120" stroke="black" />
            <line x1="100" y1="140" x2="200" y2="160" stroke="black" />
            {/* Labels */}
            <foreignObject x="60" y="78" width="80" height="24">
              <div style={{ fontSize: 12 }}>
                {pp(pR1)} = {data.red}/{data.total}
              </div>
            </foreignObject>
            <foreignObject x="60" y="138" width="80" height="24">
              <div style={{ fontSize: 12 }}>
                {pp(pB1)} = {data.total - data.red}/{data.total}
              </div>
            </foreignObject>

            <foreignObject x="150" y="56" width="120" height="24">
              <div style={{ fontSize: 12 }}>
                r: {pp(pR2r)} ={' '}
                {data.withReplacement
                  ? `${data.red}/${data.total}`
                  : `${data.red - 1}/${data.total - 1}`}
              </div>
            </foreignObject>
            <foreignObject x="150" y="96" width="120" height="24">
              <div style={{ fontSize: 12 }}>
                b: {pp(pB2r)} ={' '}
                {data.withReplacement
                  ? `${data.total - data.red}/${data.total}`
                  : `${data.total - data.red}/${data.total - 1}`}
              </div>
            </foreignObject>

            <foreignObject x="150" y="116" width="120" height="24">
              <div style={{ fontSize: 12 }}>
                r: {pp(pR2b)} ={' '}
                {data.withReplacement
                  ? `${data.red}/${data.total}`
                  : `${data.red}/${data.total - 1}`}
              </div>
            </foreignObject>
            <foreignObject x="150" y="156" width="120" height="24">
              <div style={{ fontSize: 12 }}>
                b: {pp(pB2b)} ={' '}
                {data.withReplacement
                  ? `${data.total - data.red}/${data.total}`
                  : `${data.total - data.red - 1}/${data.total - 1}`}
              </div>
            </foreignObject>
          </svg>
        )
      },
    },
  ],
}
