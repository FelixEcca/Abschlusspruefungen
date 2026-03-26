import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type FigureKind = 'trapezoid' | 'triangle'
type GroupId = 1 | 2 | 0

interface GridPoint {
  x: number
  y: number
}

interface Figure {
  kind: FigureKind
  points: GridPoint[]
  group: GroupId
  label: number
}

interface DATA {
  figures: Figure[]
  aDx: number
  aDy: number
  aLength: number
  alphaDx: number
  alphaDy: number
  alphaDeg: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function toX(n: number) {
  return 164 + n * 12
}

function toY(n: number) {
  return 164 - n * 12
}

function polygonPoints(points: GridPoint[]) {
  return points.map(p => `${toX(p.x)},${toY(p.y)}`).join(' ')
}

function centerOf(points: GridPoint[]) {
  const sx = points.reduce((sum, p) => sum + p.x, 0)
  const sy = points.reduce((sum, p) => sum + p.y, 0)
  return { x: sx / points.length, y: sy / points.length }
}

function translate(points: GridPoint[], dx: number, dy: number): GridPoint[] {
  return points.map(p => ({ x: p.x + dx, y: p.y + dy }))
}

function rotate90(points: GridPoint[]): GridPoint[] {
  return points.map(p => ({ x: -p.y, y: p.x }))
}

function rotate180(points: GridPoint[]): GridPoint[] {
  return points.map(p => ({ x: -p.x, y: -p.y }))
}

function rotate270(points: GridPoint[]): GridPoint[] {
  return points.map(p => ({ x: p.y, y: -p.x }))
}

function normalize(points: GridPoint[]) {
  const minX = Math.min(...points.map(p => p.x))
  const minY = Math.min(...points.map(p => p.y))
  return points.map(p => ({ x: p.x - minX, y: p.y - minY }))
}

function transformPoints(
  base: GridPoint[],
  variant: number,
  dx: number,
  dy: number,
): GridPoint[] {
  let pts = base
  if (variant === 1) pts = rotate90(base)
  if (variant === 2) pts = rotate180(base)
  if (variant === 3) pts = rotate270(base)
  pts = normalize(pts)
  return translate(pts, dx, dy)
}

export const exercise3064: Exercise<DATA> = {
  title: 'Figuren',
  source: 'Geometrie',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const aDx = rng.randomItemFromArray([3, 4, 5])
    const aDy = rng.randomItemFromArray([2, 3, 4])
    const aLength = round2(Math.sqrt(aDx * aDx + aDy * aDy))

    const alphaDx = rng.randomItemFromArray([2, 3, 4])
    const alphaDy = rng.randomItemFromArray([2, 3, 4])
    const alphaDeg = round2((Math.atan(alphaDy / alphaDx) * 180) / Math.PI)

    const baseTrapezoid: GridPoint[] = [
      { x: 0, y: 0 },
      { x: 6, y: 0 },
      { x: 5, y: 3 },
      { x: 1, y: 3 },
    ]

    const baseTriangleA: GridPoint[] = [
      { x: 0, y: 0 },
      { x: aDx, y: aDy },
      { x: aDx + 3, y: 0 },
    ]

    const baseTriangleB: GridPoint[] = [
      { x: 0, y: 0 },
      { x: alphaDx + 2, y: 0 },
      { x: alphaDx, y: -alphaDy },
    ]

    const trap1 = transformPoints(
      baseTrapezoid,
      rng.randomIntBetween(0, 3),
      -10,
      6,
    )
    const trap2 = transformPoints(
      baseTrapezoid,
      rng.randomIntBetween(0, 3),
      3,
      4,
    )

    const tri1 = translate(baseTriangleA, -10, -1)
    const tri2 = transformPoints(
      baseTriangleA,
      rng.randomIntBetween(1, 3),
      4,
      -1,
    )

    const angleFigure = translate(baseTriangleB, -3, -6)

    const figures: Figure[] = [
      { kind: 'trapezoid', points: trap1, group: 1, label: 1 },
      { kind: 'triangle', points: tri1, group: 2, label: 2 },
      { kind: 'triangle', points: angleFigure, group: 0, label: 3 },
      { kind: 'trapezoid', points: trap2, group: 1, label: 4 },
      { kind: 'triangle', points: tri2, group: 2, label: 5 },
    ]

    return {
      figures,
      aDx,
      aDy,
      aLength,
      alphaDx,
      alphaDy,
      alphaDeg,
    }
  },

  originalData: {
    figures: [
      {
        kind: 'trapezoid',
        group: 1,
        label: 1,
        points: [
          { x: -10, y: 8 },
          { x: -4, y: 8 },
          { x: -5, y: 11 },
          { x: -9, y: 11 },
        ],
      },
      {
        kind: 'triangle',
        group: 2,
        label: 2,
        points: [
          { x: -10, y: -1 },
          { x: -6, y: 2 },
          { x: -3, y: -1 },
        ],
      },
      {
        kind: 'triangle',
        group: 0,
        label: 3,
        points: [
          { x: -3, y: -6 },
          { x: 2, y: -6 },
          { x: 0, y: -8 },
        ],
      },
      {
        kind: 'trapezoid',
        group: 1,
        label: 4,
        points: [
          { x: 3, y: 4 },
          { x: 3, y: 10 },
          { x: 6, y: 9 },
          { x: 6, y: 5 },
        ],
      },
      {
        kind: 'triangle',
        group: 2,
        label: 5,
        points: [
          { x: 6, y: -1 },
          { x: 3, y: 3 },
          { x: 6, y: 6 },
        ],
      },
    ],
    aDx: 4,
    aDy: 3,
    aLength: 5,
    alphaDx: 3,
    alphaDy: 2,
    alphaDeg: round2((Math.atan(2 / 3) * 180) / Math.PI),
  },

  constraint({ data }) {
    return data.aDx > 0 && data.aDy > 0 && data.alphaDx > 0 && data.alphaDy > 0
  },

  intro({ data }) {
    const fig2 = data.figures.find(f => f.label === 2)!
    const fig3 = data.figures.find(f => f.label === 3)!
    const center3 = centerOf(fig3.points)

    return (
      <>
        <p>
          Gegeben sind die Abbildungen 1 bis 5. Ein Kästchen entspricht{' '}
          <InlineMath math={'1\\,\\mathrm{cm}'} />.
        </p>

        <svg viewBox="0 0 328 328">
          {Array.from({ length: 25 }, (_, i) => i - 12).map(n => (
            <line
              key={`v-${n}`}
              x1={toX(n)}
              y1={toY(-13)}
              x2={toX(n)}
              y2={toY(13)}
              stroke="#c8c8c8"
              strokeWidth="0.8"
            />
          ))}
          {Array.from({ length: 27 }, (_, i) => i - 13).map(n => (
            <line
              key={`h-${n}`}
              x1={toX(-12)}
              y1={toY(n)}
              x2={toX(12)}
              y2={toY(n)}
              stroke="#c8c8c8"
              strokeWidth="0.8"
            />
          ))}

          {data.figures.map(fig => {
            const c = centerOf(fig.points)
            return (
              <g key={fig.label}>
                <polygon
                  points={polygonPoints(fig.points)}
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
                <circle
                  cx={toX(c.x)}
                  cy={toY(c.y)}
                  r="10"
                  fill="white"
                  stroke="black"
                />
                <text x={toX(c.x) - 3} y={toY(c.y) + 4} fontSize="10">
                  {fig.label}
                </text>
              </g>
            )
          })}

          <text
            x={toX((fig2.points[0].x + fig2.points[1].x) / 2) - 10}
            y={toY((fig2.points[0].y + fig2.points[1].y) / 2) - 8}
            fontSize="14"
          >
            a
          </text>

          <text x={toX(center3.x) - 22} y={toY(center3.y) - 6} fontSize="14">
            α
          </text>
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Geben Sie an, welche Abbildungen kongruent und welche ähnlich
              zueinander sind.
            </p>
          </>
        )
      },
      solution() {
        return (
          <>
            <p>
              Die Abbildungen 1 und 4 sind kongruent. Die Abbildungen 2 und 5
              sind ebenfalls kongruent.
            </p>
            <p>
              Diese beiden kongruenten Paare sind damit jeweils auch ähnlich.
            </p>
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Berechnen Sie die Seitenlänge a in Abbildung 2.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Seite a ist die Hypotenuse eines rechtwinkligen Dreiecks im
              Gitternetz.
            </p>
            <InlineMath math={`a^2 = ${pp(data.aDx)}^2 + ${pp(data.aDy)}^2`} />
            <br />
            <InlineMath
              math={`a^2 = ${pp(data.aDx * data.aDx)} + ${pp(
                data.aDy * data.aDy,
              )}`}
            />
            <br />
            <InlineMath
              math={`a = \\sqrt{${pp(
                data.aDx * data.aDx + data.aDy * data.aDy,
              )}} = ${pp(data.aLength)}\\,\\mathrm{cm}`}
            />
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Berechnen Sie den Winkel α in Abbildung 3.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Aus dem Gitternetz liest man ein rechtwinkliges Dreieck mit
              Ankathete <InlineMath math={`${pp(data.alphaDx)}`} /> und
              Gegenkathete <InlineMath math={`${pp(data.alphaDy)}`} /> ab.
            </p>
            <InlineMath
              math={`\\tan(\\alpha)=\\frac{${pp(data.alphaDy)}}{${pp(
                data.alphaDx,
              )}}`}
            />
            <br />
            <InlineMath
              math={`\\alpha=\\arctan\\left(\\frac{${pp(
                data.alphaDy,
              )}}{${pp(data.alphaDx)}}\\right)\\approx ${pp(
                data.alphaDeg,
              )}^{\\circ}`}
            />
          </>
        )
      },
    },
  ],
}
