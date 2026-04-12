import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface Point {
  x: number
  y: number
}

interface DATA {
  variant: 'bottom_left' | 'bottom_right' | 'top_left' | 'top_right'
  givenAngle: 'alpha' | 'beta'
  A: Point
  B: Point
  C: Point
  angleVertex: 'B' | 'C'
}

function rightAngleMark(vertex: Point, dir1: Point, dir2: Point, size = 14) {
  const v1x = dir1.x - vertex.x
  const v1y = dir1.y - vertex.y
  const l1 = Math.sqrt(v1x * v1x + v1y * v1y)
  const u1x = v1x / l1
  const u1y = v1y / l1

  const v2x = dir2.x - vertex.x
  const v2y = dir2.y - vertex.y
  const l2 = Math.sqrt(v2x * v2x + v2y * v2y)
  const u2x = v2x / l2
  const u2y = v2y / l2

  const p1 = { x: vertex.x + u1x * size, y: vertex.y + u1y * size }
  const p2 = {
    x: p1.x + u2x * size,
    y: p1.y + u2y * size,
  }
  const p3 = { x: vertex.x + u2x * size, y: vertex.y + u2y * size }

  return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`
}

function angleLabelPos(vertex: Point, p1: Point, p2: Point, dist = 24) {
  const v1x = p1.x - vertex.x
  const v1y = p1.y - vertex.y
  const l1 = Math.sqrt(v1x * v1x + v1y * v1y)

  const v2x = p2.x - vertex.x
  const v2y = p2.y - vertex.y
  const l2 = Math.sqrt(v2x * v2x + v2y * v2y)

  const u1x = v1x / l1
  const u1y = v1y / l1
  const u2x = v2x / l2
  const u2y = v2y / l2

  const bx = u1x + u2x
  const by = u1y + u2y
  const bl = Math.sqrt(bx * bx + by * by)

  return {
    x: vertex.x + (bx / bl) * dist,
    y: vertex.y + (by / bl) * dist,
  }
}

function sideLabelPos(p1: Point, p2: Point, dx = 0, dy = 0) {
  return {
    x: (p1.x + p2.x) / 2 + dx,
    y: (p1.y + p2.y) / 2 + dy,
  }
}

function buildVariant(variant: DATA['variant']) {
  if (variant === 'bottom_left') {
    const A = { x: 70, y: 130 } // rechter Winkel
    const B = { x: 70, y: 45 }
    const C = { x: 210, y: 130 }
    return { A, B, C }
  }
  if (variant === 'bottom_right') {
    const A = { x: 230, y: 130 } // rechter Winkel
    const B = { x: 90, y: 130 }
    const C = { x: 230, y: 45 }
    return { A, B, C }
  }
  if (variant === 'top_left') {
    const A = { x: 80, y: 45 } // rechter Winkel
    const B = { x: 80, y: 130 }
    const C = { x: 220, y: 45 }
    return { A, B, C }
  }
  const A = { x: 220, y: 45 } // rechter Winkel
  const B = { x: 80, y: 45 }
  const C = { x: 220, y: 130 }
  return { A, B, C }
}

export const exercise4917: Exercise<DATA> = {
  title: 'Seiten im rechtwinkligen Dreieck benennen',
  source: 'Trigonometrie',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    const variant = rng.randomItemFromArray([
      'bottom_left',
      'bottom_right',
      'top_left',
      'top_right',
    ]) as DATA['variant']

    const { A, B, C } = buildVariant(variant)

    // A ist immer der rechte Winkel.
    // Die anderen Winkel liegen bei B und C.
    const givenAngle = rng.randomBoolean() ? 'alpha' : 'beta'
    const angleVertex = givenAngle === 'alpha' ? 'B' : 'C'

    return {
      variant,
      givenAngle,
      A,
      B,
      C,
      angleVertex,
    }
  },
  originalData: {
    variant: 'bottom_left',
    givenAngle: 'alpha',
    A: { x: 70, y: 130 },
    B: { x: 70, y: 45 },
    C: { x: 210, y: 130 },
    angleVertex: 'B',
  },
  constraint({ data }) {
    // A muss rechter Winkel sein
    const abx = data.B.x - data.A.x
    const aby = data.B.y - data.A.y
    const acx = data.C.x - data.A.x
    const acy = data.C.y - data.A.y
    const dot = abx * acx + aby * acy

    return dot === 0
  },
  task({ data }) {
    const anglePoint = data.angleVertex === 'B' ? data.B : data.C
    const labelPos =
      data.angleVertex === 'B'
        ? angleLabelPos(data.B, data.A, data.C)
        : angleLabelPos(data.C, data.A, data.B)

    return (
      <>
        <p>
          Ergänzen Sie in der Skizze die Bezeichnungen{' '}
          <InlineMath math={'\\text{Ankathete}'} />,{' '}
          <InlineMath math={'\\text{Gegenkathete}'} /> und{' '}
          <InlineMath math={'\\text{Hypotenuse}'} /> relativ zum markierten
          Winkel.
        </p>

        <svg viewBox="0 0 328 180">
          <line
            x1={data.A.x}
            y1={data.A.y}
            x2={data.B.x}
            y2={data.B.y}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={data.A.x}
            y1={data.A.y}
            x2={data.C.x}
            y2={data.C.y}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={data.B.x}
            y1={data.B.y}
            x2={data.C.x}
            y2={data.C.y}
            stroke="black"
            strokeWidth="2"
          />

          <path
            d={rightAngleMark(data.A, data.B, data.C)}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          <text x={labelPos.x} y={labelPos.y} fontSize="16">
            {data.givenAngle === 'alpha' ? 'α' : 'β'}
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const angleIsAtB = data.angleVertex === 'B'

    const hypPos = sideLabelPos(data.B, data.C, 0, -8)
    const sideABPos = sideLabelPos(data.A, data.B, -28, 0)
    const sideACPos = sideLabelPos(data.A, data.C, 0, 18)

    const labelAB = angleIsAtB ? 'Ankathete' : 'Gegenkathete'
    const labelAC = angleIsAtB ? 'Gegenkathete' : 'Ankathete'

    const labelPos =
      data.angleVertex === 'B'
        ? angleLabelPos(data.B, data.A, data.C)
        : angleLabelPos(data.C, data.A, data.B)

    return (
      <>
        <p>
          Die Hypotenuse liegt immer gegenüber dem rechten Winkel. Von den
          beiden Katheten ist eine die Ankathete und die andere die Gegenkathete
          relativ zum markierten Winkel.
        </p>

        <svg viewBox="0 0 328 220">
          <line
            x1={data.A.x}
            y1={data.A.y}
            x2={data.B.x}
            y2={data.B.y}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={data.A.x}
            y1={data.A.y}
            x2={data.C.x}
            y2={data.C.y}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={data.B.x}
            y1={data.B.y}
            x2={data.C.x}
            y2={data.C.y}
            stroke="black"
            strokeWidth="2"
          />

          <path
            d={rightAngleMark(data.A, data.B, data.C)}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          <text x={labelPos.x} y={labelPos.y} fontSize="16">
            {data.givenAngle === 'alpha' ? 'α' : 'β'}
          </text>

          <text x={hypPos.x} y={hypPos.y} fontSize="14">
            Hypotenuse
          </text>
          <text x={sideABPos.x} y={sideABPos.y} fontSize="14">
            {labelAB}
          </text>
          <text x={sideACPos.x} y={sideACPos.y} fontSize="14">
            {labelAC}
          </text>
        </svg>
      </>
    )
  },
}
