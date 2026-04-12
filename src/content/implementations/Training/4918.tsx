import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface Point {
  x: number
  y: number
}

interface DATA {
  variant: 'bottom_left' | 'bottom_right' | 'top_left' | 'top_right'
  givenAngle: 'alpha' | 'beta'
  mode: 'sin' | 'cos' | 'tan'
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

function sideMidpoint(p1: Point, p2: Point) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  }
}

function buildVariant(variant: DATA['variant']) {
  if (variant === 'bottom_left') {
    const A = { x: 70, y: 130 } // rechter Winkel
    const B = { x: 70, y: 45 }
    const C = { x: 220, y: 130 }
    return { A, B, C }
  }
  if (variant === 'bottom_right') {
    const A = { x: 240, y: 130 } // rechter Winkel
    const B = { x: 90, y: 130 }
    const C = { x: 240, y: 45 }
    return { A, B, C }
  }
  if (variant === 'top_left') {
    const A = { x: 80, y: 45 } // rechter Winkel
    const B = { x: 80, y: 130 }
    const C = { x: 230, y: 45 }
    return { A, B, C }
  }
  const A = { x: 230, y: 45 } // rechter Winkel
  const B = { x: 80, y: 45 }
  const C = { x: 230, y: 130 }
  return { A, B, C }
}

function highlightedSides(angleVertex: 'B' | 'C', mode: 'sin' | 'cos' | 'tan') {
  if (angleVertex === 'B') {
    if (mode === 'sin') return ['AC', 'BC'] as const
    if (mode === 'cos') return ['AB', 'BC'] as const
    return ['AC', 'AB'] as const
  }

  if (mode === 'sin') return ['AB', 'BC'] as const
  if (mode === 'cos') return ['AC', 'BC'] as const
  return ['AB', 'AC'] as const
}

function segmentProps(name: 'AB' | 'AC' | 'BC', A: Point, B: Point, C: Point) {
  if (name === 'AB') return { p1: A, p2: B }
  if (name === 'AC') return { p1: A, p2: C }
  return { p1: B, p2: C }
}

export const exercise4918: Exercise<DATA> = {
  title: 'Passende Winkelfunktion angeben',
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
    const givenAngle = rng.randomBoolean() ? 'alpha' : 'beta'
    const angleVertex = givenAngle === 'alpha' ? 'B' : 'C'
    const mode = rng.randomItemFromArray(['sin', 'cos', 'tan']) as DATA['mode']

    return {
      variant,
      givenAngle,
      mode,
      A,
      B,
      C,
      angleVertex,
    }
  },
  originalData: {
    variant: 'bottom_left',
    givenAngle: 'alpha',
    mode: 'tan',
    A: { x: 70, y: 130 },
    B: { x: 70, y: 45 },
    C: { x: 220, y: 130 },
    angleVertex: 'B',
  },
  constraint({ data }) {
    const abx = data.B.x - data.A.x
    const aby = data.B.y - data.A.y
    const acx = data.C.x - data.A.x
    const acy = data.C.y - data.A.y
    const dot = abx * acx + aby * acy

    return dot === 0 && data.angleVertex !== 'B'
      ? data.givenAngle === 'beta'
      : true
  },
  task({ data }) {
    const labelPos =
      data.angleVertex === 'B'
        ? angleLabelPos(data.B, data.A, data.C)
        : angleLabelPos(data.C, data.A, data.B)

    const [s1, s2] = highlightedSides(data.angleVertex, data.mode)
    const seg1 = segmentProps(s1, data.A, data.B, data.C)
    const seg2 = segmentProps(s2, data.A, data.B, data.C)
    const m1 = sideMidpoint(seg1.p1, seg1.p2)
    const m2 = sideMidpoint(seg2.p1, seg2.p2)

    return (
      <>
        <p>
          Geben Sie an, ob Sin, Cos oder Tan die fehlenden Seiten von{' '}
          <InlineMath
            math={data.givenAngle === 'alpha' ? '\\alpha' : '\\beta'}
          />{' '}
          aus ins Verhältnis setzt.
        </p>

        <svg viewBox="0 0 328 190">
          {/* Grunddreieck */}
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

          {/* rechter Winkel */}
          <path
            d={rightAngleMark(data.A, data.B, data.C)}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          {/* markierter Winkel */}
          <text x={labelPos.x} y={labelPos.y} fontSize="16">
            {data.givenAngle === 'alpha' ? 'α' : 'β'}
          </text>

          {/* hervorgehobene Seiten */}
          <line
            x1={seg1.p1.x}
            y1={seg1.p1.y}
            x2={seg1.p2.x}
            y2={seg1.p2.y}
            stroke="black"
            strokeWidth="5"
            strokeOpacity="0.18"
          />
          <line
            x1={seg2.p1.x}
            y1={seg2.p1.y}
            x2={seg2.p2.x}
            y2={seg2.p2.y}
            stroke="black"
            strokeWidth="5"
            strokeOpacity="0.18"
          />

          <text x={m1.x - 8} y={m1.y - 6} fontSize="16">
            ?
          </text>
          <text x={m2.x - 8} y={m2.y - 6} fontSize="16">
            ?
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    const angleSymbol = data.givenAngle === 'alpha' ? '\\alpha' : '\\beta'
    const labelPos =
      data.angleVertex === 'B'
        ? angleLabelPos(data.B, data.A, data.C)
        : angleLabelPos(data.C, data.A, data.B)

    const [s1, s2] = highlightedSides(data.angleVertex, data.mode)
    const seg1 = segmentProps(s1, data.A, data.B, data.C)
    const seg2 = segmentProps(s2, data.A, data.B, data.C)
    const m1 = sideMidpoint(seg1.p1, seg1.p2)
    const m2 = sideMidpoint(seg2.p1, seg2.p2)

    let formula = ''
    let text = ''

    if (data.mode === 'sin') {
      formula = `\\sin(${angleSymbol}) = \\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}}`
      text =
        'Die markierten Seiten sind Gegenkathete und Hypotenuse. Deshalb verwendet man den Sinus.'
    } else if (data.mode === 'cos') {
      formula = `\\cos(${angleSymbol}) = \\frac{\\text{Ankathete}}{\\text{Hypotenuse}}`
      text =
        'Die markierten Seiten sind Ankathete und Hypotenuse. Deshalb verwendet man den Kosinus.'
    } else {
      formula = `\\tan(${angleSymbol}) = \\frac{\\text{Gegenkathete}}{\\text{Ankathete}}`
      text =
        'Die markierten Seiten sind Gegenkathete und Ankathete. Deshalb verwendet man den Tangens.'
    }

    return (
      <>
        <p>{text}</p>

        <svg viewBox="0 0 328 190">
          {/* Grunddreieck */}
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

          {/* rechter Winkel */}
          <path
            d={rightAngleMark(data.A, data.B, data.C)}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          {/* markierter Winkel */}
          <text x={labelPos.x} y={labelPos.y} fontSize="16">
            {data.givenAngle === 'alpha' ? 'α' : 'β'}
          </text>

          {/* hervorgehobene Seiten */}
          <line
            x1={seg1.p1.x}
            y1={seg1.p1.y}
            x2={seg1.p2.x}
            y2={seg1.p2.y}
            stroke="black"
            strokeWidth="5"
            strokeOpacity="0.18"
          />
          <line
            x1={seg2.p1.x}
            y1={seg2.p1.y}
            x2={seg2.p2.x}
            y2={seg2.p2.y}
            stroke="black"
            strokeWidth="5"
            strokeOpacity="0.18"
          />

          <text x={m1.x - 8} y={m1.y - 6} fontSize="16">
            ?
          </text>
          <text x={m2.x - 8} y={m2.y - 6} fontSize="16">
            ?
          </text>
        </svg>

        <InlineMath math={formula} />
      </>
    )
  },
}
