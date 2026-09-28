import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

type ShapeType = 'l' | 'u' | 't' | 'h' | 'e' | 'step'
type LengthUnit = 'mm' | 'cm' | 'dm' | 'm'

interface DATA {
  shape: ShapeType
  unit: LengthUnit
  w: number
  h: number
  a: number
  b: number
  c: number
  perimeter: number
}

interface Point {
  x: number
  y: number
}

const presets: Omit<DATA, 'unit' | 'perimeter'>[] = [
  { shape: 'l', w: 12, h: 9, a: 4, b: 3, c: 0 },
  { shape: 'l', w: 15, h: 10, a: 6, b: 4, c: 0 },
  { shape: 'u', w: 14, h: 10, a: 6, b: 4, c: 0 },
  { shape: 'u', w: 16, h: 12, a: 8, b: 5, c: 0 },
  { shape: 't', w: 14, h: 11, a: 4, b: 3, c: 0 },
  { shape: 't', w: 16, h: 12, a: 6, b: 4, c: 0 },
  { shape: 'h', w: 14, h: 12, a: 3, b: 4, c: 4 },
  { shape: 'h', w: 16, h: 14, a: 4, b: 5, c: 6 },
  { shape: 'e', w: 14, h: 10, a: 5, b: 4, c: 2 },
  { shape: 'e', w: 16, h: 15, a: 6, b: 5, c: 3 },
  { shape: 'step', w: 14, h: 12, a: 4, b: 3, c: 5 },
  { shape: 'step', w: 16, h: 14, a: 5, b: 4, c: 6 },
]

const unitVariants: { unit: LengthUnit; factor: number }[] = [
  { unit: 'mm', factor: 10 },
  { unit: 'cm', factor: 1 },
  { unit: 'dm', factor: 1 },
  { unit: 'm', factor: 0.5 },
]

function round2(value: number) {
  return Math.round(value * 100) / 100
}

function perimeterFor(data: Omit<DATA, 'perimeter'>) {
  if (data.shape === 'u') return 2 * (data.w + data.h) + 2 * data.b
  if (data.shape === 'h' || data.shape === 'e') {
    return 2 * (data.w + data.h) + 2 * (data.a + data.b)
  }
  return 2 * (data.w + data.h)
}

function CompositeFigure({ data }: { data: DATA }) {
  const scale = Math.min(250 / data.w, 160 / data.h)
  const ox = 85 + (250 - data.w * scale) / 2
  const oy = 55 + (160 - data.h * scale) / 2
  const x = (value: number) => ox + value * scale
  const y = (value: number) => oy + value * scale
  const label = (value: number) => `${pp(value)} ${data.unit}`

  let points: Point[]
  if (data.shape === 'l') {
    points = [
      { x: 0, y: 0 },
      { x: data.w, y: 0 },
      { x: data.w, y: data.h },
      { x: data.a, y: data.h },
      { x: data.a, y: data.h - data.b },
      { x: 0, y: data.h - data.b },
    ]
  } else if (data.shape === 'u') {
    const side = (data.w - data.a) / 2
    points = [
      { x: 0, y: 0 },
      { x: side, y: 0 },
      { x: side, y: data.b },
      { x: side + data.a, y: data.b },
      { x: side + data.a, y: 0 },
      { x: data.w, y: 0 },
      { x: data.w, y: data.h },
      { x: 0, y: data.h },
    ]
  } else if (data.shape === 't') {
    const left = (data.w - data.a) / 2
    points = [
      { x: 0, y: 0 },
      { x: data.w, y: 0 },
      { x: data.w, y: data.b },
      { x: left + data.a, y: data.b },
      { x: left + data.a, y: data.h },
      { x: left, y: data.h },
      { x: left, y: data.b },
      { x: 0, y: data.b },
    ]
  } else if (data.shape === 'h') {
    const gapTop = (data.h - data.c) / 2
    points = [
      { x: 0, y: 0 },
      { x: data.w, y: 0 },
      { x: data.w, y: gapTop },
      { x: data.w - data.b, y: gapTop },
      { x: data.w - data.b, y: gapTop + data.c },
      { x: data.w, y: gapTop + data.c },
      { x: data.w, y: data.h },
      { x: 0, y: data.h },
      { x: 0, y: gapTop + data.c },
      { x: data.a, y: gapTop + data.c },
      { x: data.a, y: gapTop },
      { x: 0, y: gapTop },
    ]
  } else if (data.shape === 'e') {
    const gap = (data.h - 3 * data.c) / 2
    points = [
      { x: 0, y: 0 },
      { x: data.w, y: 0 },
      { x: data.w, y: data.c },
      { x: data.w - data.a, y: data.c },
      { x: data.w - data.a, y: data.c + gap },
      { x: data.w, y: data.c + gap },
      { x: data.w, y: 2 * data.c + gap },
      { x: data.w - data.b, y: 2 * data.c + gap },
      { x: data.w - data.b, y: 2 * data.c + 2 * gap },
      { x: data.w, y: 2 * data.c + 2 * gap },
      { x: data.w, y: data.h },
      { x: 0, y: data.h },
    ]
  } else {
    points = [
      { x: 0, y: 0 },
      { x: data.w, y: 0 },
      { x: data.w, y: data.b },
      { x: data.a + data.c, y: data.b },
      { x: data.a + data.c, y: data.h - data.b },
      { x: data.a, y: data.h - data.b },
      { x: data.a, y: data.h },
      { x: 0, y: data.h },
    ]
  }

  const polygonPoints = points.map(point => `${x(point.x)},${y(point.y)}`).join(' ')
  const widthY = oy - 24
  const heightX = ox + data.w * scale + 28

  const horizontalDimension = (
    key: string,
    x1: number,
    x2: number,
    lineY: number,
    text: string,
  ) => (
    <g key={key}>
      <line x1={x1} y1={lineY} x2={x2} y2={lineY} stroke="#334155" strokeWidth="1.3" markerStart="url(#arrow-9659)" markerEnd="url(#arrow-9659)" />
      <text x={(x1 + x2) / 2} y={lineY - 6} textAnchor="middle" fontSize="14" fill="#0f172a">{text}</text>
    </g>
  )

  const verticalDimension = (
    key: string,
    lineX: number,
    y1: number,
    y2: number,
    text: string,
  ) => (
    <g key={key}>
      <line x1={lineX} y1={y1} x2={lineX} y2={y2} stroke="#334155" strokeWidth="1.3" markerStart="url(#arrow-9659)" markerEnd="url(#arrow-9659)" />
      <text x={lineX - 7} y={(y1 + y2) / 2} textAnchor="middle" fontSize="14" fill="#0f172a" transform={`rotate(-90 ${lineX - 7} ${(y1 + y2) / 2})`}>{text}</text>
    </g>
  )

  const extraDimensions = []
  if (data.shape === 'l') {
    extraDimensions.push(horizontalDimension('a', x(0), x(data.a), y(data.h) + 24, label(data.a)))
    extraDimensions.push(verticalDimension('b', x(data.a) + 22, y(data.h - data.b), y(data.h), label(data.b)))
  } else if (data.shape === 'u') {
    const side = (data.w - data.a) / 2
    extraDimensions.push(horizontalDimension('a', x(side), x(side + data.a), y(data.b) - 7, label(data.a)))
    extraDimensions.push(verticalDimension('b', x(side) + 18, y(0), y(data.b), label(data.b)))
  } else if (data.shape === 't') {
    const left = (data.w - data.a) / 2
    extraDimensions.push(horizontalDimension('a', x(left), x(left + data.a), y(data.h) + 24, label(data.a)))
    extraDimensions.push(verticalDimension('b', x(data.w) - 16, y(0), y(data.b), label(data.b)))
  } else if (data.shape === 'h') {
    const gapTop = (data.h - data.c) / 2
    extraDimensions.push(horizontalDimension('a', x(0), x(data.a), y(gapTop) + 18, label(data.a)))
    extraDimensions.push(horizontalDimension('b', x(data.w - data.b), x(data.w), y(gapTop) + 18, label(data.b)))
    extraDimensions.push(verticalDimension('c', x(data.w / 2), y(gapTop), y(gapTop + data.c), label(data.c)))
  } else if (data.shape === 'e') {
    const gap = (data.h - 3 * data.c) / 2
    extraDimensions.push(horizontalDimension('a', x(data.w - data.a), x(data.w), y(data.c) + 16, label(data.a)))
    extraDimensions.push(horizontalDimension('b', x(data.w - data.b), x(data.w), y(2 * data.c + gap) + 16, label(data.b)))
    extraDimensions.push(verticalDimension('c', x(data.w) - 16, y(0), y(data.c), label(data.c)))
  } else {
    extraDimensions.push(horizontalDimension('a', x(0), x(data.a), y(data.h) + 24, label(data.a)))
    extraDimensions.push(verticalDimension('b', x(data.w) - 16, y(0), y(data.b), label(data.b)))
    extraDimensions.push(horizontalDimension('c', x(data.a), x(data.a + data.c), y(data.h - data.b) - 7, label(data.c)))
  }

  return (
    <svg viewBox="0 0 430 285" className="my-4 w-full max-w-xl" role="img" aria-label="Zusammengesetzte rechtwinklige Figur mit Maßangaben">
      <defs>
        <marker id="arrow-9659" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto-start-reverse">
          <path d="M 0 1 L 7 3.5 L 0 6" fill="none" stroke="#334155" strokeWidth="1.2" />
        </marker>
      </defs>
      <polygon points={polygonPoints} fill="#e0f2fe" stroke="#0f172a" strokeWidth="3" strokeLinejoin="round" />
      {horizontalDimension('width', x(0), x(data.w), widthY, label(data.w))}
      {verticalDimension('height', heightX, y(0), y(data.h), label(data.h))}
      {extraDimensions}
    </svg>
  )
}

export const exercise9659: Exercise<DATA> = {
  title: 'Umfang zusammengesetzter Figuren',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 12,
  points: 12,
  generator(rng) {
    const preset = rng.randomItemFromArray(presets)
    const variant = rng.randomItemFromArray(unitVariants)
    const dataWithoutPerimeter = {
      shape: preset.shape,
      unit: variant.unit,
      w: preset.w * variant.factor,
      h: preset.h * variant.factor,
      a: preset.a * variant.factor,
      b: preset.b * variant.factor,
      c: preset.c * variant.factor,
    }
    return {
      ...dataWithoutPerimeter,
      perimeter: round2(perimeterFor(dataWithoutPerimeter)),
    }
  },
  originalData: {
    shape: 'u',
    unit: 'cm',
    w: 14,
    h: 10,
    a: 6,
    b: 4,
    c: 0,
    perimeter: 56,
  },
  constraint({ data }) {
    return data.w > 0 && data.h > 0 && data.perimeter > 0
  },
  task({ data }) {
    return (
      <>
        <p>Berechne den Umfang der zusammengesetzten Figur.</p>
        <CompositeFigure data={data} />
      </>
    )
  },
  solution({ data }) {
    const mathUnit = `\\mathrm{${data.unit}}`
    if (data.shape === 'l') {
      const missingHorizontal = data.w - data.a
      const missingVertical = data.h - data.b
      return (
        <>
          <p>Zuerst bestimmen wir die beiden fehlenden Randlängen:</p>
          <p><InlineMath math={`${pp(data.w)}-${pp(data.a)}=${pp(missingHorizontal)}\\,${mathUnit}`} /> und <InlineMath math={`${pp(data.h)}-${pp(data.b)}=${pp(missingVertical)}\\,${mathUnit}`} /></p>
          <p>Nun addieren wir alle sechs Seiten des Randes:</p>
          <p><InlineMath math={`U=${pp(data.w)}+${pp(data.h)}+${pp(missingHorizontal)}+${pp(data.b)}+${pp(data.a)}+${pp(missingVertical)}=${pp(data.perimeter)}\\,${mathUnit}`} /></p>
        </>
      )
    }
    if (data.shape === 'u') {
      const side = (data.w - data.a) / 2
      return (
        <>
          <p>Die beiden kurzen Stücke oben sind gleich lang:</p>
          <p><InlineMath math={`(${pp(data.w)}-${pp(data.a)}):2=${pp(side)}\\,${mathUnit}`} /></p>
          <p>Wir gehen einmal vollständig am Rand entlang:</p>
          <p><InlineMath math={`U=${pp(side)}+${pp(data.b)}+${pp(data.a)}+${pp(data.b)}+${pp(side)}+${pp(data.h)}+${pp(data.w)}+${pp(data.h)}=${pp(data.perimeter)}\\,${mathUnit}`} /></p>
        </>
      )
    }
    if (data.shape === 't') {
      const side = (data.w - data.a) / 2
      const stemHeight = data.h - data.b
      return (
        <>
          <p>Die beiden Stücke unter dem Querbalken und die Höhe des Stamms fehlen:</p>
          <p><InlineMath math={`(${pp(data.w)}-${pp(data.a)}):2=${pp(side)}\\,${mathUnit}`} /> und <InlineMath math={`${pp(data.h)}-${pp(data.b)}=${pp(stemHeight)}\\,${mathUnit}`} /></p>
          <p><InlineMath math={`U=${pp(data.w)}+2\\cdot ${pp(data.b)}+2\\cdot ${pp(side)}+2\\cdot ${pp(stemHeight)}+${pp(data.a)}=${pp(data.perimeter)}\\,${mathUnit}`} /></p>
        </>
      )
    }
    if (data.shape === 'h') {
      const outerPart = (data.h - data.c) / 2
      return (
        <>
          <p>Die vier äußeren senkrechten Stücke sind jeweils gleich lang:</p>
          <p><InlineMath math={`(${pp(data.h)}-${pp(data.c)}):2=${pp(outerPart)}\\,${mathUnit}`} /></p>
          <p>Zum äußeren Rechteck kommen die vier waagerechten Kanten der Einbuchtungen hinzu:</p>
          <p><InlineMath math={`U=2\\cdot(${pp(data.w)}+${pp(data.h)})+2\\cdot ${pp(data.a)}+2\\cdot ${pp(data.b)}=${pp(data.perimeter)}\\,${mathUnit}`} /></p>
        </>
      )
    }
    if (data.shape === 'e') {
      const gap = (data.h - 3 * data.c) / 2
      return (
        <>
          <p>Zwischen den drei Balken liegen zwei gleich hohe Lücken:</p>
          <p><InlineMath math={`(${pp(data.h)}-3\\cdot ${pp(data.c)}):2=${pp(gap)}\\,${mathUnit}`} /></p>
          <p>Jede Einbuchtung fügt zwei waagerechte Randstücke hinzu:</p>
          <p><InlineMath math={`U=2\\cdot(${pp(data.w)}+${pp(data.h)})+2\\cdot ${pp(data.a)}+2\\cdot ${pp(data.b)}=${pp(data.perimeter)}\\,${mathUnit}`} /></p>
        </>
      )
    }
    const upperHorizontal = data.w - data.a - data.c
    const middleVertical = data.h - 2 * data.b
    return (
      <>
        <p>Zuerst bestimmen wir die beiden fehlenden Stufenlängen:</p>
        <p><InlineMath math={`${pp(data.w)}-${pp(data.a)}-${pp(data.c)}=${pp(upperHorizontal)}\\,${mathUnit}`} /> und <InlineMath math={`${pp(data.h)}-2\\cdot ${pp(data.b)}=${pp(middleVertical)}\\,${mathUnit}`} /></p>
        <p>Dann addieren wir alle acht Randstücke:</p>
        <p><InlineMath math={`U=${pp(data.w)}+${pp(data.b)}+${pp(upperHorizontal)}+${pp(middleVertical)}+${pp(data.c)}+${pp(data.b)}+${pp(data.a)}+${pp(data.h)}=${pp(data.perimeter)}\\,${mathUnit}`} /></p>
      </>
    )
  },
}
