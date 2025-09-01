import { Exercise } from '@/data/types'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  /** Rotation des Glücksrads in Grad (nur Darstellung) */
  angle: number
}

export const exercise3202: Exercise<DATA> = {
  title: 'Glücksrad',
  source: '3202-2025-1C-Glücksrad',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    const angle = rng.randomIntBetween(0, 330) // Vielfache von 30° reichen optisch
    const data: DATA = { angle }
    return data
  },
  originalData: {
    angle: 0,
  },
  constraint() {
    return true
  },
  intro({ data }) {
    // Glücksrad mit drei gleich großen Feldern (Beschriftung: 1, 1, 2)
    return (
      <>
        <p>
          Das dargestellte Glücksrad mit drei gleich großen Feldern (beschriftet
          mit 1, 1 und 2) wird zweimal gedreht.
        </p>
        <svg viewBox="-9 -9 18 18" width="180" height="180">
          <g transform={`rotate(${data.angle})`}>
            {/* Außenkreis */}
            <circle
              cx="0"
              cy="0"
              r="8"
              fill="none"
              stroke="black"
              strokeWidth={0.1}
            />
            {/* Sektorlinien (dritteln den Kreis) */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-8"
              stroke="black"
              strokeWidth={0.1}
            />
            <line
              x1="0"
              y1="0"
              x2={(Math.cos((2 * Math.PI) / 3) * 8).toFixed(3)}
              y2={(Math.sin((2 * Math.PI) / 3) * 8).toFixed(3)}
              stroke="black"
              strokeWidth={0.1}
            />
            <line
              x1="0"
              y1="0"
              x2={(Math.cos((4 * Math.PI) / 3) * 8).toFixed(3)}
              y2={(Math.sin((4 * Math.PI) / 3) * 8).toFixed(3)}
              stroke="black"
              strokeWidth={0.1}
            />
            {/* Labels ungefähr mittig in den Sektoren */}
            <text x="0" y="-3.2" fontSize="1.6" textAnchor="middle">
              1
            </text>
            <text
              x={(Math.cos((2 * Math.PI) / 3) * 3.2).toFixed(2)}
              y={(Math.sin((2 * Math.PI) / 3) * 3.2).toFixed(2)}
              fontSize="1.6"
              textAnchor="middle"
            >
              1
            </text>
            <text
              x={(Math.cos((4 * Math.PI) / 3) * 3.2).toFixed(2)}
              y={(Math.sin((4 * Math.PI) / 3) * 3.2).toFixed(2)}
              fontSize="1.6"
              textAnchor="middle"
            >
              2
            </text>
          </g>
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 8,
      task() {
        return (
          <p>
            Erstellen Sie ein vollständig beschriftetes Baumdiagramm für dieses
            Zufallsexperiment (zwei Drehungen).
          </p>
        )
      },
      solution() {
        // Baumdiagramm: 1. Dreh (1 mit 2/3, 2 mit 1/3), 2. Dreh gleich.
        return (
          <>
            <p>
              Beim Drehen gilt: P(1) = {ppFrac([2, 3])}, P(2) = {ppFrac([1, 3])}
              . Das Baumdiagramm (Wahrscheinlichkeiten an den Ästen):
            </p>
            <svg viewBox="-9 -9 18 18" width="180" height="180">
              <g>
                {/* Außenkreis */}
                <circle
                  cx="0"
                  cy="0"
                  r="8"
                  fill="none"
                  stroke="black"
                  strokeWidth={0.1}
                />
                {/* Strahlen im 120°-Abstand: −90°, 30°, 150° */}
                {([-90, 30, 150] as const).map((deg, i) => {
                  const rad = (Math.PI / 180) * deg
                  const x = Math.cos(rad) * 8
                  const y = Math.sin(rad) * 8
                  return (
                    <line
                      key={i}
                      x1="0"
                      y1="0"
                      x2={x.toFixed(3)}
                      y2={y.toFixed(3)}
                      stroke="black"
                      strokeWidth={0.1}
                    />
                  )
                })}

                {/* Labels: Mittelpunkte der Sektoren: −30°, 90°, 210° */}
                {(
                  [
                    { deg: -30, label: '1' },
                    { deg: 90, label: '1' },
                    { deg: 210, label: '2' },
                  ] as const
                ).map(({ deg, label }) => {
                  const rad = (Math.PI / 180) * deg
                  const rText = 3.2
                  const x = +(Math.cos(rad) * rText).toFixed(3)
                  const y = +(Math.sin(rad) * rText).toFixed(3)
                  return (
                    // Gegenrotation um (x,y), damit Text gerade bleibt
                    <g key={deg} transform={`rotate(0 ${x} ${y})`}>
                      <text
                        x={x}
                        y={y + 0.5}
                        fontSize="1.6"
                        textAnchor="middle"
                      >
                        {label}
                      </text>
                    </g>
                  )
                })}
              </g>
            </svg>
          </>
        )
      },
    },
    {
      points: 4,
      task() {
        return (
          <p>
            Berechnen Sie die Wahrscheinlichkeit für das Ereignis A: „Die Summe
            der gedrehten Zahlen ist 2.“
          </p>
        )
      },
      solution() {
        return (
          <>
            <p>
              Die Summe 2 entsteht nur bei (1,1). Daher P(A) = P(1)·P(1) ={' '}
              {ppFrac([2, 3])}·{ppFrac([2, 3])} = {ppFrac([4, 9])}.
            </p>
          </>
        )
      },
    },
    {
      points: 6,
      task() {
        return (
          <p>
            Geben Sie ein Ereignis B in Worten an, dessen Wahrscheinlichkeit
            durch P(B) = 1 − ( {ppFrac([1, 3])} · {ppFrac([1, 3])} ) berechnet
            werden kann.
          </p>
        )
      },
      solution() {
        return (
          <>
            <p>
              {`P(B) = 1 − P(2 und 2).`} Also beschreibt B das Gegenereignis zu
              „beide Drehungen ergeben die 2“, z.&nbsp;B.:
            </p>
            <p>
              <i>„Es wird nicht zweimal die 2 gedreht“</i> <br />
              (gleichwertig: „Mindestens bei einem Dreh ist die Zahl 1“).
            </p>
          </>
        )
      },
    },
  ],
}
