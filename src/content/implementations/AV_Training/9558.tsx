// exercise9558.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type FigureType = 'dreieck' | 'rechteck' | 'kreis' | 'halbkreis' | 'trapez'

interface DATA {
  figure: FigureType
  a: number
  b: number
  c: number
  d: number
  r: number
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function figureName(type: FigureType) {
  if (type === 'dreieck') return 'Dreieck'
  if (type === 'rechteck') return 'Rechteck'
  if (type === 'kreis') return 'Kreis'
  if (type === 'halbkreis') return 'Halbkreis'
  return 'Trapez'
}

export const exercise9558: Exercise<DATA> = {
  title: 'Umfang berechnen',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const figure: FigureType = rng.randomItemFromArray([
      'dreieck',
      'rechteck',
      'kreis',
      'halbkreis',
      'trapez',
    ])

    if (figure === 'dreieck') {
      const a = rng.randomItemFromArray([4, 5, 6, 7, 8, 9, 10, 12])
      const b = rng.randomItemFromArray([4, 5, 6, 7, 8, 9, 10, 12])
      const c = rng.randomItemFromArray([4, 5, 6, 7, 8, 9, 10, 12])
      const result = a + b + c
      return { figure, a, b, c, d: 0, r: 0, result }
    }

    if (figure === 'rechteck') {
      const a = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12, 15])
      const b = rng.randomItemFromArray([2, 3, 4, 5, 6, 7, 8])
      const result = 2 * a + 2 * b
      return { figure, a, b, c: 0, d: 0, r: 0, result }
    }

    if (figure === 'kreis') {
      const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 7, 8, 10])
      const result = round2(2 * Math.PI * r)
      return { figure, a: 0, b: 0, c: 0, d: 0, r, result }
    }

    if (figure === 'halbkreis') {
      const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 7, 8, 10])
      const result = round2(Math.PI * r + 2 * r)
      return { figure, a: 0, b: 0, c: 0, d: 0, r, result }
    }

    const a = rng.randomItemFromArray([6, 8, 10, 12, 14])
    const b = rng.randomItemFromArray([3, 4, 5, 6, 7])
    const c = rng.randomItemFromArray([4, 5, 6, 7, 8])
    const d = rng.randomItemFromArray([4, 5, 6, 7, 8])
    const result = a + b + c + d

    return { figure, a, b, c, d, r: 0, result }
  },

  originalData: {
    figure: 'rechteck',
    a: 8,
    b: 5,
    c: 0,
    d: 0,
    r: 0,
    result: 26,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Umfang der Figur.</p>

        {data.figure === 'dreieck' && (
          <>
            <svg viewBox="0 0 328 170">
              <polygon
                points="65,130 260,130 155,35"
                fill="#eee"
                stroke="black"
                strokeWidth="2"
              />
              <text x="155" y="150" fontSize="15" textAnchor="middle">
                {data.a} cm
              </text>
              <text x="95" y="80" fontSize="15" textAnchor="middle">
                {data.b} cm
              </text>
              <text x="220" y="80" fontSize="15" textAnchor="middle">
                {data.c} cm
              </text>
            </svg>
          </>
        )}

        {data.figure === 'rechteck' && (
          <>
            <svg viewBox="0 0 328 170">
              <rect
                x="70"
                y="45"
                width="190"
                height="85"
                fill="#eee"
                stroke="black"
                strokeWidth="2"
              />
              <text x="165" y="150" fontSize="15" textAnchor="middle">
                {data.a} cm
              </text>
              <text x="45" y="92" fontSize="15" textAnchor="middle">
                {data.b} cm
              </text>
            </svg>
          </>
        )}

        {data.figure === 'kreis' && (
          <>
            <svg viewBox="0 0 328 170">
              <circle
                cx="164"
                cy="85"
                r="55"
                fill="#eee"
                stroke="black"
                strokeWidth="2"
              />
              <line x1="164" y1="85" x2="219" y2="85" stroke="black" />
              <text x="195" y="78" fontSize="15">
                r = {data.r} cm
              </text>
            </svg>
          </>
        )}

        {data.figure === 'halbkreis' && (
          <>
            <svg viewBox="0 0 328 170">
              <path
                d="M 85 120 A 79 79 0 0 1 243 120 L 85 120"
                fill="#eee"
                stroke="black"
                strokeWidth="2"
              />
              <line x1="164" y1="120" x2="243" y2="120" stroke="black" />
              <text x="192" y="112" fontSize="15">
                r = {data.r} cm
              </text>
            </svg>
          </>
        )}

        {data.figure === 'trapez' && (
          <>
            <svg viewBox="0 0 328 170">
              <polygon
                points="85,130 245,130 215,45 115,45"
                fill="#eee"
                stroke="black"
                strokeWidth="2"
              />
              <text x="165" y="150" fontSize="15" textAnchor="middle">
                {data.a} cm
              </text>
              <text x="165" y="38" fontSize="15" textAnchor="middle">
                {data.b} cm
              </text>
              <text x="88" y="88" fontSize="15" textAnchor="middle">
                {data.c} cm
              </text>
              <text x="240" y="88" fontSize="15" textAnchor="middle">
                {data.d} cm
              </text>
            </svg>
          </>
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Umfang werden alle Außenkanten addiert.</p>

        {data.figure === 'dreieck' && (
          <>
            <p>Das Dreieck hat drei Seiten.</p>
            <InlineMath
              math={`U=${data.a}+${data.b}+${data.c}=${pp(data.result)}\\,\\mathrm{cm}`}
            />
          </>
        )}

        {data.figure === 'rechteck' && (
          <>
            <p>Beim Rechteck gibt es jede Seitenlänge zweimal.</p>
            <InlineMath
              math={`U=2\\cdot ${data.a}+2\\cdot ${data.b}=${pp(data.result)}\\,\\mathrm{cm}`}
            />
          </>
        )}

        {data.figure === 'kreis' && (
          <>
            <p>Beim Kreis gilt:</p>
            <InlineMath math={`U=2\\cdot \\pi \\cdot r`} />
            <br />
            <InlineMath
              math={`U=2\\cdot \\pi \\cdot ${data.r}\\approx ${pp(data.result)}\\,\\mathrm{cm}`}
            />
          </>
        )}

        {data.figure === 'halbkreis' && (
          <>
            <p>Beim Halbkreis gehört auch die gerade Seite zum Umfang.</p>
            <p>Die gerade Seite ist der Durchmesser: $d=2\\cdot r$.</p>
            <InlineMath math={`U=\\pi\\cdot r+2\\cdot r`} />
            <br />
            <InlineMath
              math={`U=\\pi\\cdot ${data.r}+2\\cdot ${data.r}\\approx ${pp(data.result)}\\,\\mathrm{cm}`}
            />
          </>
        )}

        {data.figure === 'trapez' && (
          <>
            <p>Beim Trapez werden alle vier Seiten addiert.</p>
            <InlineMath
              math={`U=${data.a}+${data.b}+${data.c}+${data.d}=${pp(data.result)}\\,\\mathrm{cm}`}
            />
          </>
        )}
      </>
    )
  },
}
