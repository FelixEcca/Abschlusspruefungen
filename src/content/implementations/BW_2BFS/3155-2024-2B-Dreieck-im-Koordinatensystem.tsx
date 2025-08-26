import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  ax: number
  ay: number
  cx: number
  cy: number
  zx: number
  zy: number
}

export const exercise3155: Exercise<DATA> = {
  title: 'Dreieck im Koordinatensystem',
  source: '2024 Wahlteil Aufgabe 2B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      ax: rng.randomIntBetween(2, 6),
      ay: rng.randomIntBetween(2, 6),
      cx: rng.randomIntBetween(2, 6),
      cy: rng.randomIntBetween(-5, -1),
      zx: rng.randomIntBetween(-1, 1),
      zy: rng.randomIntBetween(-2, 2),
    }
  },
  originalData: { ax: 5, ay: 4, cx: 4, cy: -2, zx: 1, zy: 2 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Ein Dreieck ABC hat die Eckpunkte <br></br>A({data.ax}|{data.ay}),
          B(0|0) und C({data.cx}|{pp(data.cy)}).
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Zeichnen Sie das Dreieck ABC in ein Koordinatensystem und spiegeln
              Sie das Dreieck ABC am Punkt Z({data.zx}|{data.zy}).
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        return (
          <>
            <p>Zeichne die Punkte ein und verbinde sie zu einem Dreieck.</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <line
                x1={toX(data.cx)}
                y1={toY(data.cy)}
                x2={toX(data.ax)}
                y2={toY(data.ay)}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(data.ax)}
                y2={toY(data.ay)}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={toX(data.cx)}
                y1={toY(data.cy)}
                x2={toX(0)}
                y2={toY(0)}
                stroke="green"
                strokeWidth={2}
              />
              <text
                x={toX(data.ax) + 9}
                y={toY(data.ay) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × A
              </text>
              <text
                x={toX(0) + 9}
                y={toY(0) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × B
              </text>
              <text
                x={toX(data.cx) + 9}
                y={toY(data.cy) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × C
              </text>
              <text
                x={toX(data.zx) - 9}
                y={toY(data.zy) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="blue"
              >
                Z ×
              </text>
            </svg>
            <p>
              Spiegle jeden Punkt durch den Punkt Z und verbinde sie zu einem
              neuen Dreieck:
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <line
                x1={toX(data.cx)}
                y1={toY(data.cy)}
                x2={toX(data.ax)}
                y2={toY(data.ay)}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(data.ax)}
                y2={toY(data.ay)}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={toX(data.cx)}
                y1={toY(data.cy)}
                x2={toX(0)}
                y2={toY(0)}
                stroke="green"
                strokeWidth={2}
              />
              <text
                x={toX(data.ax) + 9}
                y={toY(data.ay) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × A
              </text>
              <text
                x={toX(0) + 9}
                y={toY(0) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × B
              </text>
              <text
                x={toX(data.cx) + 9}
                y={toY(data.cy) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × C
              </text>
              <text
                x={toX(data.zx) - 9}
                y={toY(data.zy) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="blue"
              >
                Z ×
              </text>
              <line
                x1={toX(data.cx)}
                y1={toY(data.cy)}
                x2={toX(0)}
                y2={toY(0)}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={toX(data.cx)}
                y1={toY(data.cy)}
                x2={toX(data.cx - (data.cx - data.zx) * 2)}
                y2={toY(data.cy - (data.cy - data.zy) * 2)}
                stroke="orange"
                strokeWidth={2}
                strokeDasharray="5,5" // Fügt gestrichelte Linie hinzu
              />
              <line
                x1={toX(data.ax)}
                y1={toY(data.ay)}
                x2={toX(data.ax - (data.ax - data.zx) * 2)}
                y2={toY(data.ay - (data.ay - data.zy) * 2)}
                stroke="orange"
                strokeWidth={2}
                strokeDasharray="5,5" // Fügt gestrichelte Linie hinzu
              />
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(data.zx * 2)}
                y2={toY(data.zy * 2)}
                stroke="orange"
                strokeWidth={2}
                strokeDasharray="5,5" // Fügt gestrichelte Linie hinzu
              />
              <text
                x={toX(data.ax - (data.ax - data.zx) * 2) - 9}
                y={toY(data.ay - (data.ay - data.zy) * 2) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                A&apos;×
              </text>
              <text
                x={toX(data.zx * 2) - 9}
                y={toY(data.zy * 2) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                B&apos;×
              </text>
              <text
                x={toX(data.cx - (data.cx - data.zx) * 2) - 10}
                y={toY(data.cy - (data.cy - data.zy) * 2) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                C&apos;×
              </text>
              <line
                x1={toX(data.zx * 2)}
                y1={toY(data.zy * 2)}
                x2={toX(data.cx - (data.cx - data.zx) * 2)}
                y2={toY(data.cy - (data.cy - data.zy) * 2)}
                stroke="blue"
                strokeWidth={2}
                strokeDasharray="5,5" // Fügt gestrichelte Linie hinzu
              />
              <line
                x1={toX(data.zx * 2)}
                y1={toY(data.zy * 2)}
                x2={toX(data.ax - (data.ax - data.zx) * 2)}
                y2={toY(data.ay - (data.ay - data.zy) * 2)}
                stroke="blue"
                strokeWidth={2}
                strokeDasharray="5,5" // Fügt gestrichelte Linie hinzu
              />
              <line
                x1={toX(data.ax - (data.ax - data.zx) * 2)}
                y1={toY(data.ay - (data.ay - data.zy) * 2)}
                x2={toX(data.cx - (data.cx - data.zx) * 2)}
                y2={toY(data.cy - (data.cy - data.zy) * 2)}
                stroke="blue"
                strokeWidth={2}
                strokeDasharray="5,5" // Fügt gestrichelte Linie hinzu
              />
            </svg>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Ermitteln Sie eine Gleichung der Geraden durch die Punkte A und B.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        return (
          <>
            <p>
              Die Geradengleichung hat die Form <br></br>y = mx, weil sie durch
              den Ursprung verläuft.
            </p>
            <p>
              Um vom Punkt B zum Punkt A zu gelangen, verläuft die Gerade in
              diesem Steigungsdreieck:
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <line
                x1={toX(data.ax)}
                y1={toY(0)}
                x2={toX(data.ax)}
                y2={toY(data.ay)}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(0)}
                y1={toY(0)}
                x2={toX(data.ax)}
                y2={toY(data.ay)}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(data.ax)}
                y1={toY(0)}
                x2={toX(0)}
                y2={toY(0)}
                stroke="blue"
                strokeWidth={2}
              />
              <text
                x={toX(data.ax) + 9}
                y={toY(data.ay) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × A
              </text>
              <text
                x={toX(0) + 9}
                y={toY(0) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × B
              </text>
              <text
                x={(toX(0) + toX(data.ax)) / 2}
                y={toY(0) + 20}
                fontSize={25}
                textAnchor="middle"
                stroke="blue"
              >
                {data.ax}
              </text>
              <text
                x={toX(data.ax) + 15}
                y={(toY(0) + toY(data.ay)) / 2}
                fontSize={25}
                textAnchor="middle"
                stroke="blue"
              >
                {data.ay}
              </text>
            </svg>
            <p>
              Die Steigung beträgt m = {ppFrac([data.ay, data.ax])}{' '}
              {getGcd(data.ay, data.ax) != 1 && (
                <>= {ppFrac(data.ay / data.ax)}</>
              )}
            </p>
            <p>Damit ist die Gleichung: y = {ppFrac(data.ay / data.ax)}x</p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Eine parallele zur x-Achse verläuft durch den Punkt C. Geben Sie
              die Gleichung dieser Geraden an.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        return (
          <>
            <p>
              Die Gerade verläuft waagerecht durch C({data.cx}|{pp(data.cy)}):
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <line
                x1={toX(-9)}
                y1={toY(data.cy)}
                x2={toX(9)}
                y2={toY(data.cy)}
                stroke="blue"
                strokeWidth={2}
              />
              <text
                x={toX(data.cx) + 9}
                y={toY(data.cy) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                × C
              </text>
            </svg>
            <p>Die Funktionsgleichung ist: y = {pp(data.cy)}</p>
          </>
        )
      },
    },
  ],
}
