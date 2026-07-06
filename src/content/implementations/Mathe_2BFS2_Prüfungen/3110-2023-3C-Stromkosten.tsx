// =====================================
// 3C — Stromtarife linear
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA3110 {
  base1: number
  rate1: number
  base2: number
  rate2: number
  xUse: number
}

function toX(n: number) {
  // KS-Mapping wie üblich (10er-Raster)
  return 23 + n * ((301 - 23) / 11)
}
function toY(n: number) {
  return 304 - n * ((301 - 23) / 110)
}

export const exercise3110: Exercise<DATA3110> = {
  title: 'Stromkosten',
  source: '2023 Wahlteil Aufgabe 3C',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    // Sicherstellen: Tarif I hat kleineren Grundpreis, aber höhere kWh-Rate
    const base1 = rng.randomItemFromArray([4, 6, 8, 10, 12])
    const rate1 = rng.randomItemFromArray([0.32, 0.34, 0.36, 0.38, 0.4])
    const base2 = rng.randomItemFromArray([18, 20, 22, 24, 26, 28])
    const rate2 = rng.randomItemFromArray([0.14, 0.16, 0.18, 0.2])
    const xUse = rng.randomItemFromArray([50, 80, 100, 150, 200, 250])

    // Falls die gewünschte Ordnung nicht eingehalten wird, tauschen
    let B1 = base1,
      R1 = rate1,
      B2 = base2,
      R2 = rate2
    if (!(B1 < B2 && R1 > R2)) {
      B1 = Math.min(base1, base2)
      B2 = Math.max(base1, base2)
      R1 = Math.max(rate1, rate2)
      R2 = Math.min(rate1, rate2)
    }
    return { base1: B1, rate1: R1, base2: B2, rate2: R2, xUse }
  },

  // Originalwerte (entsprechen dem Scan)
  originalData: { base1: 10, rate1: 0.4, base2: 20, rate2: 0.3, xUse: 200 },

  constraint({ data }) {
    return data.rate1 > data.rate2 && data.base1 < data.base2
  },

  intro({ data }) {
    return (
      <>
        <div className="space-y-2">
          <p>Die Stadtwerke bieten zwei Tarife an:</p>
          <ul className="list-disc ml-5">
            <li>
              Tarif I: monatlicher Grundpreis {pp(data.base1)} € und{' '}
              {pp(data.rate1)} € je kWh
            </li>
            <li>
              Tarif II: monatlicher Grundpreis {pp(data.base2)} € und{' '}
              {pp(data.rate2)} € je kWh
            </li>
          </ul>

          {/* Skizze der beiden Geraden im KS */}
          {(() => {
            const xs: number[] = []
            for (let x = 0; x <= 120; x += 0.1) xs.push(+x.toFixed(1)) // „x“ als 10er-kWh
            const line1 = xs
              .map(x => `${toX(x)},${toY(data.base1 + data.rate1 * (10 * x))}`)
              .join(' ')
            const line2 = xs
              .map(x => `${toX(x)},${toY(data.base2 + data.rate2 * (10 * x))}`)
              .join(' ')
            return (
              <svg viewBox="0 0 328 328" width="328" height="328">
                <image
                  href="/content/Mathe_2BFS2/Blanko.png"
                  width="328"
                  height="328"
                />

                <polyline
                  points={line1}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <polyline
                  points={line2}
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                />
                {/* Y-axis */}
                <line
                  x1={toX(0)}
                  y1={toY(0)}
                  x2={toX(0)}
                  y2={toY(115)}
                  stroke="black"
                  markerEnd="url(#arrow)"
                />
                {/* X-axis */}
                <line
                  x1={toX(0)}
                  y1={toY(0)}
                  x2={toX(11.5)}
                  y2={toY(0)}
                  stroke="black"
                  markerEnd="url(#arrow)"
                />
                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="5"
                    refY="5"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 L 3 5 Z" fill="black" />
                  </marker>
                </defs>
                <text x={225} y={290} fontSize="12">
                  Verbrauch in kWh
                </text>
                <text x={30} y={25} fontSize="12">
                  Kosten in €
                </text>
              </svg>
            )
          })()}
        </div>
        <p>Die Grafik zeigt die Schaubilder zu den Tarifen.</p>
        <p>
          Hinweise: Der Stromverbrauch wird in Kilowattstunden (kWh) gemessen.
        </p>
      </>
    )
  },

  tasks: [
    // (1) Geradengleichungen & Schnittpunkt
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <ul>
            <li>Bestimmen Sie, welchen Tarif jede Gerade darstellt.</li>
            <li>Ergänzen Sie die Achseneinteilung im Koordinatensystem.</li>
            <li>Geben Sie jeweils eine Geradengleichung an.</li>
          </ul>
        )
      },
      solution({ data }) {
        const xs = (data.base2 - data.base1) / (data.rate1 - data.rate2)
        const ys = data.base1 + data.rate1 * xs
        return (
          <>
            {(() => {
              const xs: number[] = []
              for (let x = 0; x <= 120; x += 0.1) xs.push(+x.toFixed(1)) // „x“ als 10er-kWh
              const line1 = xs
                .map(
                  x => `${toX(x)},${toY(data.base1 + data.rate1 * (10 * x))}`,
                )
                .join(' ')
              const line2 = xs
                .map(
                  x => `${toX(x)},${toY(data.base2 + data.rate2 * (10 * x))}`,
                )
                .join(' ')
              return (
                <svg viewBox="0 0 328 328" width="328" height="328">
                  <image
                    href="/content/Mathe_2BFS2/Blanko.png"
                    width="328"
                    height="328"
                  />
                  {/* X-Axis scale: steps of 1 (10 kWh) */}
                  {Array.from({ length: 12 }, (_, i) => {
                    const x = toX(i + 0.1)
                    return (
                      <g key={i}>
                        <line
                          x1={x}
                          y1={304}
                          x2={x}
                          y2={310}
                          stroke="black"
                          strokeWidth="1"
                        />
                        <text x={x} y={320} fontSize="10" textAnchor="middle">
                          {i * 10}
                        </text>
                      </g>
                    )
                  })}
                  {/* Y-Axis scale: steps of 10 */}
                  {Array.from({ length: 12 }, (_, i) => {
                    const y = toY(i * 10)
                    return (
                      <g key={i}>
                        <line
                          x1={23}
                          y1={y}
                          x2={17}
                          y2={y}
                          stroke="black"
                          strokeWidth="1"
                        />
                        <text
                          x={10}
                          y={y + 4}
                          fontSize="10"
                          textAnchor="middle"
                        >
                          {i * 10}
                        </text>
                      </g>
                    )
                  })}
                  <polyline
                    points={line1}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <polyline
                    points={line2}
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                  />
                  {/* Y-axis */}
                  <line
                    x1={toX(0)}
                    y1={toY(0)}
                    x2={toX(0)}
                    y2={toY(115)}
                    stroke="black"
                    markerEnd="url(#arrow)"
                  />
                  {/* X-axis */}
                  <line
                    x1={toX(0)}
                    y1={toY(0)}
                    x2={toX(11.5)}
                    y2={toY(0)}
                    stroke="black"
                    markerEnd="url(#arrow)"
                  />
                  {/* Arrow marker definition */}
                  <defs>
                    <marker
                      id="arrow"
                      markerWidth="10"
                      markerHeight="10"
                      refX="5"
                      refY="5"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 L 3 5 Z" fill="black" />
                    </marker>
                  </defs>
                  <text x={225} y={290} fontSize="12">
                    Verbrauch in kWh
                  </text>
                  <text x={30} y={25} fontSize="12">
                    Kosten in €
                  </text>
                </svg>
              )
            })()}
            <p>
              Die schwarze Gerade ist das Schaubild von Tarif I. Die Gleichung
              ist:
            </p>
            <BlockMath math={`y = ${pp(data.base1)} + ${pp(data.rate1)}x`} />
            <p>
              Die blue Gerade ist das Schaubild von Tarif II. Die Gleichung ist:
            </p>
            <BlockMath math={`y = ${pp(data.base2)} + ${pp(data.rate2)}x`} />
          </>
        )
      },
    },

    // (2) Bedeutung des Schnittpunkts
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Erläutern Sie die Bedeutung der Koordinaten des Schnittpunkts der
            beiden Geraden.
          </p>
        )
      },
      solution({ data }) {
        const xs = (data.base2 - data.base1) / (data.rate1 - data.rate2)
        const ys = data.base1 + data.rate1 * xs
        return (
          <p>
            Bei einem Verbrauch von etwa{' '}
            <InlineMath math={`${pp(roundToDigits(xs, 1))}\\,\\text{kWh}`} />{' '}
            sind die Kosten beider Tarife gleich groß und betragen ungefähr{' '}
            <InlineMath math={`${pp(roundToDigits(ys, 1))}\\,\\text{€}`} />.
          </p>
        )
      },
    },

    // (3) Ersparnis bei gegebenem Verbrauch
    {
      points: 5,
      intro({ data }) {
        return (
          <p>
            Egon verbraucht im Monat{' '}
            <InlineMath math={`${data.xUse}\\,\\text{kWh}`} />.
          </p>
        )
      },
      task() {
        return (
          <p>
            Bestimmen Sie, welchen Geldbetrag Egon mit dem günstigeren Tarif pro
            Monat sparen kann.
          </p>
        )
      },
      solution({ data }) {
        const K1 = data.base1 + data.rate1 * data.xUse
        const K2 = data.base2 + data.rate2 * data.xUse
        const save = Math.abs(K1 - K2)
        const cheaper = K1 < K2 ? 'Tarif I' : 'Tarif II'
        return (
          <>
            <p>Berechne die Kosten mit beiden Tarifen und vergleiche:</p>
            <div className="space-y-1">
              <BlockMath
                math={`y_I=${pp(data.base1)}+${pp(data.rate1)}\\cdot ${data.xUse}=${pp(K1)}\\,\\text{€}`}
              />
              <BlockMath
                math={`y_{II}=${pp(data.base2)}+${pp(data.rate2)}\\cdot ${data.xUse}=${pp(K2)}\\,\\text{€}`}
              />
              <p>
                Günstiger ist {cheaper}. Ersparnis:{' '}
                <InlineMath math={`${pp(save)}\\,\\text{€}`} />
              </p>
            </div>
          </>
        )
      },
    },
  ],
}
