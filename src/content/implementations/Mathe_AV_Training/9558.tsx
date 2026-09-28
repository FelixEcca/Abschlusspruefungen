// exercise9558.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type FigureType = 'dreieck' | 'rechteck' | 'trapez'

interface DATA {
  figure: FigureType
  a: number
  b: number
  c: number
  d: number
  result: number
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
      'trapez',
    ])

    if (figure === 'dreieck') {
      const a = rng.randomItemFromArray([4, 5, 6, 7, 8, 9, 10, 12])
      const b = rng.randomItemFromArray([4, 5, 6, 7, 8, 9, 10, 12])
      const c = rng.randomItemFromArray([4, 5, 6, 7, 8, 9, 10, 12])
      const result = a + b + c
      return { figure, a, b, c, d: 0, result }
    }

    if (figure === 'rechteck') {
      const a = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12, 15])
      const b = rng.randomItemFromArray([2, 3, 4, 5, 6, 7, 8])
      const result = 2 * a + 2 * b
      return { figure, a, b, c: 0, d: 0, result }
    }

    const a = rng.randomItemFromArray([6, 8, 10, 12, 14])
    const b = rng.randomItemFromArray([3, 4, 5, 6, 7])
    const c = rng.randomItemFromArray([4, 5, 6, 7, 8])
    const d = rng.randomItemFromArray([4, 5, 6, 7, 8])
    const result = a + b + c + d

    return { figure, a, b, c, d, result }
  },

  originalData: {
    figure: 'rechteck',
    a: 8,
    b: 5,
    c: 0,
    d: 0,
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
              <text x="68" y="88" fontSize="15" textAnchor="middle">
                {data.c} cm
              </text>
              <text x="260" y="88" fontSize="15" textAnchor="middle">
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
        <p>Beim Umfang werden alle Seitenlängen addiert.</p>

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

        {data.figure === 'trapez' && (
          <>
            <p>Beim Trapez werden alle vier Seiten addiert.</p>
            <InlineMath
              math={`U=${data.a}+${data.b}+${data.c}+${data.d}=${pp(data.result)}\\,\\mathrm{cm}`}
            />
          </>
        )}
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/avzLGPebVBc"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
