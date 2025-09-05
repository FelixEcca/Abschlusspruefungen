import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type DATA = {
  // Angebot 1: C1(t) = e1 + m1 * t
  m1: number // €/Monat
  e1: number // einmalig €

  // Angebot 2: C2(t) = e2 + m2 * t
  m2: number // €/Monat
  e2: number // einmalig €

  // abgeleitet
  tStar: number // Monate bis Kosten gleich (Schnittpunkt)
  years: number // Teil (2): Vertragsdauer in Jahren
  months: number // years*12
  cost1AtMonths: number
  cost2AtMonths: number
}

export const exercise3212: Exercise<DATA> = {
  title: 'Autokauf',
  source: '2025 Wahlteil Aufgabe 4C',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // Wir erzwingen die typische Situation:
    // Angebot 2 hat höhere Monatskosten, aber geringere Einmalzahlung -> "kurzfristig günstiger"
    // => m2 > m1 und e2 < e1  -> Schnittpunkt t* = (e1 - e2)/(m2 - m1) > 0
    let m1 = 0,
      m2 = 0,
      e1 = 0,
      e2 = 0,
      tStar = 0
    for (let k = 0; k < 50; k++) {
      m1 = rng.randomIntBetween(120, 260, 10)
      m2 = m1 + rng.randomIntBetween(40, 140, 10) // m2 deutlich größer
      e1 = rng.randomIntBetween(500, 2000, 50)
      e2 = e1 - rng.randomIntBetween(150, 700, 50) // e2 kleiner
      tStar = (e1 - e2) / (m2 - m1) // Monate
      if (tStar > 0.5 && tStar < 24.5) break // sinnvoller Zeitraum
    }

    const years = rng.randomIntBetween(2, 5)
    const months = years * 12
    const cost1AtMonths = e1 + m1 * months
    const cost2AtMonths = e2 + m2 * months

    return {
      m1,
      e1,
      m2,
      e2,
      tStar,
      years,
      months,
      cost1AtMonths,
      cost2AtMonths,
    }
  },

  // Originaldaten aus der Abbildung
  originalData: {
    m1: 200,
    e1: 500,
    m2: 300,
    e2: 150,
    tStar: (500 - 150) / (300 - 200), // 3.5 Monate
    years: 3,
    months: 36,
    cost1AtMonths: 500 + 200 * 36, // 7700
    cost2AtMonths: 150 + 300 * 36, // 10950
  } as DATA,

  constraint({ data }) {
    return (
      data.m2 > data.m1 &&
      data.e1 > data.e2 &&
      data.tStar > 0 &&
      isFinite(data.tStar)
    )
  },

  intro({ data }) {
    return (
      <div className="space-y-3">
        <p>
          Eine Firma möchte für ihren neuen Mitarbeiter ein Auto zur Verfügung
          stellen. Dargestellt sind zwei Angebote mit folgenden Kosten.
        </p>

        {/* Angebotsboxen als SVG (max 328 px) */}
        <svg viewBox="0 0 328 120" width="328" height="120">
          {/* Rahmen */}
          <rect
            x="10"
            y="10"
            width="308"
            height="100"
            fill="white"
            stroke="black"
          />
          {/* Box 1 */}
          <rect
            x="18"
            y="18"
            width="146"
            height="84"
            fill="#f8fafc"
            stroke="black"
          />
          <text x="28" y="38" fontSize="14" fontWeight="bold">
            Angebot 1
          </text>
          <text x="28" y="62" fontSize="13">
            pro Monat: {pp(data.m1)} EUR
          </text>
          <text x="28" y="82" fontSize="13">
            einmalig: {pp(data.e1)} EUR
          </text>

          {/* Box 2 */}
          <rect
            x="164"
            y="18"
            width="146"
            height="84"
            fill="#f8fafc"
            stroke="black"
          />
          <text x="174" y="38" fontSize="14" fontWeight="bold">
            Angebot 2
          </text>
          <text x="174" y="62" fontSize="13">
            pro Monat: {pp(data.m2)} EUR
          </text>
          <text x="174" y="82" fontSize="13">
            einmalig: {pp(data.e2)} EUR
          </text>
        </svg>
      </div>
    )
  },

  tasks: [
    // (1) Zeitraum, in dem Angebot 2 günstiger ist – Text + Zeichnung
    {
      points: 20,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Untersuchen Sie, in welchem Zeitraum das Angebot 2 günstiger als
            Angebot 1 ist.
          </p>
        )
      },
      solution({ data }) {
        const tS = data.tStar
        const tSround = Math.round(tS * 10) / 10

        // Zeichnung wie vorher (leicht beschriftet)
        const W = 328,
          H = 200
        const padL = 34,
          padR = 12,
          padT = 12,
          padB = 24
        const xMax = 60
        const yMaxData = Math.max(
          data.e1 + data.m1 * xMax,
          data.e2 + data.m2 * xMax,
        )
        const yMax = Math.ceil(yMaxData / 500) * 500
        const toX = (t: number) => padL + (t / xMax) * (W - padL - padR)
        const toY = (c: number) => H - padB - (c / yMax) * (H - padT - padB)
        const linePts = (m: number, e: number) => {
          const pts: string[] = []
          for (let t = 0; t <= xMax; t += 0.5)
            pts.push(`${toX(t)},${toY(e + m * t)}`)
          return pts.join(' ')
        }
        const pts1 = linePts(data.m1, data.e1)
        const pts2 = linePts(data.m2, data.e2)

        return (
          <div className="space-y-3">
            <p>
              Wir vergleichen die <i>Gesamtkosten nach t Monaten</i>.
            </p>
            <ul className="list-disc pl-5">
              <li>
                Angebot&nbsp;1: <b>{data.e1} €</b> einmalig + <b>{data.m1} €</b>{' '}
                je Monat
              </li>
              <li>
                Angebot&nbsp;2: <b>{data.e2} €</b> einmalig + <b>{data.m2} €</b>{' '}
                je Monat
              </li>
            </ul>
            <p>
              Wir suchen den Zeitpunkt, an dem beide Angebote <b>gleich</b>{' '}
              teuer sind. Dazu setzen wir die Gesamtkosten <b>gleich</b> und
              lösen nach t:
            </p>
            <BlockMath
              math={`\\begin{aligned}
              ${data.e1} + ${data.m1} \\cdot t &= ${data.e2} + ${data.m2} \\cdot t\\\\
              ${data.e1} - ${data.e2} &= ${data.m2}\\cdot t - ${data.m1} \\cdot t\\\\
              ${data.e1 - data.e2} &= ${data.m2 - data.m1}\\cdot t \\\\
              t &= \\frac{${data.e1 - data.e2}}{${data.m2 - data.m1}} \\approx ${pp(tSround)}
              \\end{aligned}
              `}
            />

            <p>
              Da Angebot&nbsp;2 höhere Monatskosten hat, ist es nur vor diesem
              Zeitpunkt günstiger:
              <br />
              Angebot&nbsp;2 ist günstiger für<br></br>{' '}
              <InlineMath math={`t < ${pp(tSround)} ~\\text{Monate}`} />.
            </p>
            {/* Kosten-Graph */}
            <svg
              viewBox={`0 0 ${W} ${H}`}
              width={W}
              height={H}
              className="border rounded"
            >
              {/* Achsen */}
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(xMax)}
                y2={toY(0)}
                stroke="black"
              />
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(0)}
                y2={toY(yMax)}
                stroke="black"
              />

              {/* X-Skala */}
              {[0, 12, 24, 36, 48, 60].map(t => (
                <g key={t}>
                  <line
                    x1={toX(t)}
                    y1={toY(0)}
                    x2={toX(t)}
                    y2={toY(0) + 4}
                    stroke="black"
                  />
                  <text
                    x={toX(t)}
                    y={toY(0) + 16}
                    fontSize={10}
                    textAnchor="middle"
                  >
                    {t}
                  </text>
                </g>
              ))}
              <text
                x={toX(xMax)}
                y={toY(0) + 18}
                fontSize={11}
                textAnchor="end"
              >
                Monate
              </text>

              {/* Y-Skala (in €) */}
              {Array.from({ length: 6 }).map((_, i) => {
                const v = (i * yMax) / 5
                return (
                  <g key={i}>
                    <line
                      x1={toX(0)}
                      y1={toY(v)}
                      x2={toX(0) - 4}
                      y2={toY(v)}
                      stroke="black"
                    />
                    <text
                      x={toX(0) - 6}
                      y={toY(v) + 3}
                      fontSize={10}
                      textAnchor="end"
                    >
                      {v}
                    </text>
                  </g>
                )
              })}
              <text x={toX(0) - 8} y={toY(yMax)} fontSize={11} textAnchor="end">
                €
              </text>

              {/* Linien */}
              <polyline
                points={pts1}
                fill="none"
                stroke="black"
                strokeWidth={2}
              />
              <polyline
                points={pts2}
                fill="none"
                stroke="black"
                strokeWidth={2}
                strokeDasharray="5 3"
              />

              {/* Schnittpunkt */}
              {tS > 0 && tS < xMax ? (
                <>
                  <line
                    x1={toX(tS)}
                    y1={toY(0)}
                    x2={toX(tS)}
                    y2={toY(yMax)}
                    stroke="gray"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={toX(tS)}
                    cy={toY(data.e1 + data.m1 * tS)}
                    r={3}
                    fill="black"
                  />
                  <text
                    x={toX(tS) + 4}
                    y={toY(data.e1 + data.m1 * tS) - 6}
                    fontSize={10}
                  >
                    t* ≈ {tSround} M
                  </text>
                </>
              ) : null}

              {/* Legende */}
              <rect
                x={W - 138}
                y={12}
                width={126}
                height={32}
                fill="white"
                stroke="black"
              />
              <line
                x1={W - 130}
                y1={24}
                x2={W - 110}
                y2={24}
                stroke="black"
                strokeWidth={2}
              />
              <text x={W - 104} y={27} fontSize={10}>
                Angebot 1
              </text>
              <line
                x1={W - 130}
                y1={36}
                x2={W - 110}
                y2={36}
                stroke="black"
                strokeWidth={2}
                strokeDasharray="5 3"
              />
              <text x={W - 104} y={39} fontSize={10}>
                Angebot 2
              </text>
            </svg>
          </div>
        )
      },
    },

    // (2) Dauer in Jahren – Kosten des günstigeren Angebots
    {
      points: 22,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Das Auto soll für{' '}
              <InlineMath math={`${data.years}\\,\\text{Jahre}`} /> zur
              Verfügung gestellt werden. Berechnen Sie die Kosten, wenn man das
              günstigere Angebot wählt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const n = data.months
        const c1 = data.e1 + data.m1 * n
        const c2 = data.e2 + data.m2 * n
        const cheaper = c1 <= c2 ? 1 : 2
        const cost = Math.min(c1, c2)

        return (
          <div className="space-y-2">
            <p>
              Wir berechnen die Gesamtkosten für{' '}
              <InlineMath
                math={`${data.years}\\,\\text{Jahre} = ${n}\\,\\text{Monate}`}
              />
              :
            </p>
            <ol>
              <li>
                <BlockMath
                  math={`${data.e1} ~€~+ ${data.m1} \\cdot ${n} ~€  ~= ${c1.toLocaleString('de-DE')}~€`}
                />{' '}
              </li>
              <li>
                <BlockMath
                  math={`${data.e2} ~€~+ ${data.m2} \\cdot ${n} ~€~= ${c2.toLocaleString('de-DE')}~€`}
                />{' '}
              </li>
            </ol>
            <p>Angebot {cheaper} ist günstiger.</p>
          </div>
        )
      },
    },
  ],
}
