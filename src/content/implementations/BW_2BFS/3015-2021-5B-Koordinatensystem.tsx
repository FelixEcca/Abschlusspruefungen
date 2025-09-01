import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  offset: number
  m1: number
  m2: number
  b1: number
  b2: number
  px: number
  qx: number
}

export const exercise3015: Exercise<DATA> = {
  title: 'Koordinatensystem',
  source: '2021 Wahlteil Aufgabe 5B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      offset: rng.randomIntBetween(-2, 2),
      m1: rng.randomIntBetween(-5, -1) / 2,
      m2: rng.randomIntBetween(1, 5) / 2,
      b1: rng.randomIntBetween(1, 4),
      b2: rng.randomIntBetween(-3, -1),
      px: rng.randomIntBetween(-1, 3),
      qx: rng.randomIntBetween(-1, 3),
    }
  },
  originalData: { offset: 0, m1: 2, m2: -2 / 3, b1: 1, b2: 3, px: -1, qx: 3 },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    function toX(n: number) {
      return 101 + n * ((304 - 25) / 11)
    }
    function toY(n: number) {
      return 166 - n * ((304 - 25) / 11)
    }
    function f(n: number) {
      return data.m1 * n + data.b1
    }
    function h(n: number) {
      return data.m2 * n + data.b2
    }
    return (
      <>
        <p>Gegeben sind die Geraden f und h.</p>
        <svg viewBox="0 0 328 328">
          <image href="/content/BW_2BFS/3015.png" height="328" width="328" />

          <line
            x1={toX(-3)}
            y1={toY(f(-3))}
            x2={toX(8)}
            y2={toY(f(8))}
            stroke="blue"
            strokeWidth={2}
          />
          <line
            x1={toX(-3)}
            y1={toY(h(-3))}
            x2={toX(8)}
            y2={toY(h(8))}
            stroke="green"
            strokeWidth={2}
          />
        </svg>
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
        function f(n: number) {
          return data.m1 * n + data.b1
        }
        function h(n: number) {
          return data.m2 * n + data.b2
        }
        return (
          <>
            <p>
              Zeichnen Sie die fehlende Koordinatenachse so ein, dass die Gerade
              f durch den Punkte P({data.px}|{pp(f(data.px) - data.offset)}) und
              die Gerade h durch den Punkt Q({data.qx}|
              {pp(h(data.qx) - data.offset)}) verläuft und skalieren Sie beide
              Achsen.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 101 + n * ((304 - 25) / 11)
        }
        function toY(n: number) {
          return 166 - n * ((304 - 25) / 11)
        }
        function f(n: number) {
          return data.m1 * n + data.b1
        }
        function h(n: number) {
          return data.m2 * n + data.b2
        }
        return (
          <>
            <svg viewBox="0 0 328 328">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                </marker>
              </defs>
              <image
                href="/content/BW_2BFS/3015.png"
                height="328"
                width="328"
              />

              <line
                x1={toX(-4)}
                y1={toY(f(-4))}
                x2={toX(9)}
                y2={toY(f(9))}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(-4)}
                y1={toY(h(-4))}
                x2={toX(9)}
                y2={toY(h(9))}
                stroke="green"
                strokeWidth={2}
              />
              <line
                x1={toX(-4)}
                y1={toY(data.offset)}
                x2={toX(9)}
                y2={toY(data.offset)}
                stroke="black"
                strokeWidth={1}
                markerEnd="url(#arrowhead)"
              />
              <text
                x={320}
                y={toY(data.offset + 0.5)}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                x
              </text>
              {[-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <line
                  key={n}
                  x1={toX(n)}
                  y1={toY(data.offset + 0.2)}
                  x2={toX(n)}
                  y2={toY(data.offset - 0.2)}
                  stroke="black"
                  strokeWidth={1}
                />
              ))}
              {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <>
                  <line
                    key={n}
                    x1={toX(-0.2)}
                    y1={toY(n)}
                    x2={toX(0.2)}
                    y2={toY(n)}
                    stroke="black"
                    strokeWidth={1}
                  />
                  <text
                    x={toX(-0.5)}
                    y={toY(n + data.offset) + 5}
                    fontSize={10}
                    textAnchor="middle"
                    stroke="black"
                  >
                    {n}
                  </text>
                  <text
                    x={toX(n)}
                    y={toY(data.offset - 0.75)}
                    fontSize={10}
                    textAnchor="middle"
                    stroke="black"
                  >
                    {n}
                  </text>
                </>
              ))}
              <text
                x={toX(data.px) + 1}
                y={toY(f(data.px)) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                ×
              </text>
              <text
                x={toX(data.px) + 20}
                y={toY(f(data.px)) + 10}
                fontSize={20}
                textAnchor="left"
                stroke="black"
              >
                P({data.px}|{pp(f(data.px) - data.offset)})
              </text>
              <text
                x={toX(data.qx) + 1}
                y={toY(h(data.qx)) + 5}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                ×
              </text>
              <text
                x={toX(data.qx) + 20}
                y={toY(h(data.qx)) - 7}
                fontSize={20}
                textAnchor="left"
                stroke="black"
              >
                Q({data.qx}|{pp(h(data.qx) - data.offset)})
              </text>
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
            <p>Geben Sie die Gleichungen der beiden Geraden an.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Lies jeweils den y-Achsenabschnitt und die Steigungen aus dem
              Koordinatensystem ab.
            </p>
            <p>
              f: y ={' '}
              {ppPolynom([
                [data.m1, 'x', 1],
                [data.b1 + data.offset, 'x', 0],
              ])}{' '}
            </p>
            <p>
              h: y ={' '}
              {data.m2 == -2 / 3 ? (
                <>
                  {ppFrac(data.m2)}
                  {ppPolynom([
                    [1, 'x', 1],
                    [data.b2 + data.offset, 'x', 0],
                  ])}{' '}
                </>
              ) : (
                <>
                  {ppPolynom([
                    [data.m2, 'x', 1],
                    [data.b2 + data.offset, 'x', 0],
                  ])}{' '}
                </>
              )}
            </p>
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
              Bestimmen Sie näherungsweise den Flächeninhalt des Dreicks, das
              von der y-Achse und den beiden Geraden begrenz wird.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 101 + n * ((304 - 25) / 11)
        }
        function toY(n: number) {
          return 166 - n * ((304 - 25) / 11)
        }
        function f(n: number) {
          return data.m1 * n + data.b1
        }
        function h(n: number) {
          return data.m2 * n + data.b2
        }
        const y1 = f(0)
        const y2 = h(0)

        // Calculate intersection point of f and h
        const xIntersect = (data.b2 - data.b1) / (data.m1 - data.m2)
        const yIntersect = f(xIntersect)
        return (
          <>
            <p>
              Berechne den Flächeninhalt des Dreiecks aus der Länge der
              Grundseite und der Höhe.
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/3015.png"
                height="328"
                width="328"
              />

              <line
                x1={toX(-3)}
                y1={toY(f(-3))}
                x2={toX(8)}
                y2={toY(f(8))}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(-3)}
                y1={toY(h(-3))}
                x2={toX(8)}
                y2={toY(h(8))}
                stroke="green"
                strokeWidth={2}
              />
              <polygon
                points={`${toX(0)},${toY(y1)} ${toX(0)},${toY(y2)} ${toX(xIntersect)},${toY(yIntersect)}`}
                fill="orange"
                opacity={0.4}
                stroke="red"
                strokeWidth={2}
              />
              {/* Base length text (left of triangle) */}

              {/* Dashed base line */}
              <line
                x1={toX(0)}
                y1={toY(y1)}
                x2={toX(0)}
                y2={toY(y2)}
                stroke="red"
                strokeWidth={3}
                strokeDasharray="6,4"
              />
              {/* Dashed height line */}
              <line
                x1={toX(0)}
                y1={toY((y1 + y2) / 2)}
                x2={toX(xIntersect)}
                y2={toY((y1 + y2) / 2)}
                stroke="red"
                strokeWidth={3}
                strokeDasharray="6,4"
              />
              <text
                x={toX(0) - 15}
                y={(toY(y1) + toY(y2)) / 2}
                fontSize={14}
                textAnchor="end"
                stroke="black"
              >
                g = {pp(Math.abs(y2 - y1))}
              </text>
              {/* Height text (middle of triangle) */}
              {/* Height text (middle of triangle) */}
              <text
                x={(toX(0) + toX(xIntersect)) / 2 - 5}
                y={15 + (toY((y1 + y2) / 2) + toY(yIntersect)) / 2}
                fontSize={14}
                textAnchor="middle"
                stroke="black"
              >
                h = {pp(Math.abs(xIntersect))}
              </text>
            </svg>
            <p>
              A = {buildInlineFrac(1, 2)} g · h<br></br>A ={' '}
              {buildInlineFrac(1, 2)} {pp(Math.abs(y2 - y1))} ·{' '}
              {pp(Math.abs(xIntersect))}
              <br></br>{' '}
              <b>
                A = {pp((Math.abs(y2 - y1) * Math.abs(xIntersect)) / 2)} cm²
              </b>
            </p>
          </>
        )
      },
    },
  ],
}
