// =======================================================
// 5000 — Punkte skizzieren und ablesen (3D → 2D-Skizze)
// =======================================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // Teil (1): gegebener 3D-Punkt einzeichnen
  x1a: number
  x2a: number
  x3a: number

  // Teil (2): Punkt ist im KS eingezeichnet; eine Koordinate ist gegeben,
  // die beiden anderen sollen abgelesen werden
  x1b: number
  x2b: number
  x3b: number
  given: 'x_1' | 'x_2' | 'x_3'
}

/** Grund-Mapping (wie bisher) */
function toX(n: number) {
  return 163 + n * (289 / 16)
}
function toY(n: number) {
  return 183 - n * (289 / 16)
}
/** 3D→2D-Anpassung:
 * Für jede Einheit x1 wird der Punkt eine Einheit nach links UND nach unten verschoben.
 * (isometrische Skizze: x2 nach rechts, x3 nach oben, x1 schräg links-unten)
 */
const STEP = 289 / 16
function mapX(x1: number, x2: number) {
  return toX(x2) - x1 * STEP
}
function mapY(x1: number, x3: number) {
  return toY(x3) + x1 * STEP
}

export const exercise5000: Exercise<DATA> = {
  title: 'Punkte skizzieren und Ablesen',
  source: 'Vektoren',
  useCalculator: false,
  duration: 8,

  generator(rng) {
    const r = () => rng.randomIntBetween(-7, 7)
    const x1a = r(),
      x2a = r(),
      x3a = r()

    const x1b = r(),
      x2b = r(),
      x3b = r()
    const given = rng.randomItemFromArray(['x_1', 'x_2', 'x_3'] as const)

    return { x1a, x2a, x3a, x1b, x2b, x3b, given }
  },

  // Beispiel-/Originaldaten für Vorschau/Tests
  originalData: {
    x1a: 2,
    x2a: -1,
    x3a: 3,
    x1b: -2,
    x2b: 3,
    x3b: 1,
    given: 'x_2',
  },

  constraint({ data }) {
    const länge = Math.sqrt(data.x1a ** 2 + data.x2a ** 2 + data.x3a ** 2)
    const länge_b = Math.sqrt(data.x1b ** 2 + data.x2b ** 2 + data.x3b ** 2)
    return länge <= 7 && länge_b <= 7
  },

  intro() {
    return null
  },

  tasks: [
    // (1) Punkt mit drei gegebenen Koordinaten einzeichnen
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Zeichnen Sie den Punkt{' '}
              <InlineMath
                math={`P\\big(${pp(data.x1a)}\\,\\mid\\,${pp(data.x2a)}\\,\\mid\\,${pp(
                  data.x3a,
                )}\\big)`}
              />{' '}
              in ein 3-dimensionales Koordinatensystem auf Papier ein.
            </p>
            <svg
              viewBox="0 0 328 328"
              width="328"
              height="328"
              className="border rounded"
            >
              <image
                href="/content/Mathe_2BFS2/3dksgroßmitachsen.png"
                width="328"
                height="328"
              />
            </svg>
          </>
        )
      },
      solution({ data }) {
        const px = mapX(data.x1a, data.x2a)
        const py = mapY(data.x1a, data.x3a)
        return (
          <>
            <svg
              viewBox="0 0 328 328"
              width="328"
              height="328"
              className="border rounded"
            >
              <image
                href="/content/Mathe_2BFS2/3dksgroßmitachsen.png"
                width="328"
                height="328"
              />
              {/* Hilfs-Projektionen (optional dezent) */}
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(-data.x1a)}
                y2={toY(-data.x1a)}
                stroke="blue"
                strokeDasharray="4 3"
                strokeWidth="4"
              />
              <line
                x2={toX(-data.x1a + data.x2a)}
                y2={toY(-data.x1a)}
                x1={toX(-data.x1a)}
                y1={toY(-data.x1a)}
                stroke="green"
                strokeDasharray="4 3"
                strokeWidth="4"
              />
              <line
                x1={toX(-data.x1a + data.x2a)}
                y1={toY(-data.x1a)}
                x2={px}
                y2={py}
                stroke="orange"
                strokeDasharray="4 3"
                strokeWidth="4"
              />

              {/* Punkt */}
              <circle cx={px} cy={py} r="4" fill="black" />
              <text x={px + 6} y={py - 6} fontSize="12">
                {`P(${data.x1a}|${data.x2a}|${data.x3a})`}
              </text>
            </svg>
          </>
        )
      },
    },

    // (2) Punkt ist gezeichnet; eine Koordinate vorgegeben, die anderen ablesen
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const givenVal =
          data.given === 'x_1'
            ? data.x1b
            : data.given === 'x_2'
              ? data.x2b
              : data.x3b
        const px = mapX(data.x1b, data.x2b)
        const py = mapY(data.x1b, data.x3b)
        return (
          <p>
            <svg
              viewBox="0 0 328 328"
              width="328"
              height="328"
              className="border rounded"
            >
              <image
                href="/content/Mathe_2BFS2/3dksgroßmitachsen.png"
                width="328"
                height="328"
              />
              <circle cx={px} cy={py} r="4" fill="black" />
              <text x={px + 6} y={py - 6} fontSize="12">
                Q
              </text>
            </svg>
            Gegeben ist die Koordinate{' '}
            <InlineMath math={`${data.given}=${pp(givenVal)}`} />. Lesen Sie die
            fehlenden Koordinaten von <InlineMath math="Q" /> ab und geben Sie{' '}
            <InlineMath math="Q" /> vollständig an.
          </p>
        )
      },
      solution({ data }) {
        const show = (label: string, val: number) => (
          <span style={{ marginRight: 12 }}>
            <InlineMath math={`${label}=${pp(val)}`} />
          </span>
        )
        return (
          <>
            <p>
              <InlineMath
                math={`Q\\big(${pp(data.x1b)}\\,|\\,${pp(data.x2b)}\\,|\\,${pp(
                  data.x3b,
                )}\\big)`}
              />
            </p>
            <p>
              Hinweis: Die gegebene Koordinate muss im Koordinatensystem
              zurückgegangen werden. Dann kann der mithilfe der anderen
              Koordinaten ein möglicher Weg beschrieben werden.
            </p>
          </>
        )
      },
    },
  ],
}
