import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  c: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4008: Exercise<DATA> = {
  title: 'a und c aus dem Schaubild ablesen',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 4,

  generator(rng) {
    const a = rng.randomItemFromArray([-0.5, -1, -2, 0.5, 1, 2])
    const c = rng.randomIntBetween(-3, 3)
    return { a, c }
  },

  originalData: { a: 1, c: -1 },

  task({ data }) {
    // Zeichne die Parabel y = a x^2 + c
    const xs: number[] = []
    for (let x = -5; x <= 5; x += 0.2) xs.push(+x.toFixed(1))
    const path = xs
      .map(x => {
        const y = data.a * x * x + data.c
        return `${toX(x)},${toY(y)}`
      })
      .join(' ')

    return (
      <>
        <p>
          Lies aus dem Schaubild <InlineMath math="a" /> und{' '}
          <InlineMath math="c" /> der Parabel <InlineMath math="y=a x^2 + c" />{' '}
          ab.
        </p>
        <svg viewBox="0 0 328 328" className="border rounded">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={path}
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Markierung y-Achsenabschnitt (0,c) */}
          <circle cx={toX(0)} cy={toY(data.c)} r="3" fill="blue" />
        </svg>
      </>
    )
  },

  solution({ data }) {
    // Zeichne die Parabel y = a x^2 + c
    const xs: number[] = []
    for (let x = -5; x <= 5; x += 0.2) xs.push(+x.toFixed(1))
    const path = xs
      .map(x => {
        const y = data.a * x * x + data.c
        return `${toX(x)},${toY(y)}`
      })
      .join(' ')

    // „a“ über Vergleich der Breite: z. B. Punkt (1, a + c) relativ zu c
    const y1 = data.a * 1 * 1 + data.c
    return (
      <>
        <p>
          <b>Antwort:</b>{' '}
          <InlineMath math={`a=${pp(data.a)},\\; c=${pp(data.c)}`} />
        </p>
        <svg viewBox="0 0 328 328" className="border rounded">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={path}
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Markierung y-Achsenabschnitt (0,c) */}
          <circle cx={toX(0)} cy={toY(data.c)} r="3" fill="blue" />
          <line
            x1={toX(0)}
            y1={toY(data.c)}
            x2={toX(1)}
            y2={toY(data.c)}
            stroke="green"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <line
            x1={toX(1)}
            y1={toY(data.c)}
            x2={toX(1)}
            y2={toY(y1)}
            stroke="green"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <line
            x1={toX(0)}
            y1={toY(data.c)}
            x2={toX(-2)}
            y2={toY(data.c)}
            stroke="green"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <text x={toX(1) + 4} y={toY(data.c)} fontSize="12" fill="green">
            a = {pp(data.a)}
          </text>
          <text x={toX(-3) - 12} y={toY(data.c) + 4} fontSize="12" fill="green">
            c = {pp(data.c)}
          </text>
        </svg>
      </>
    )
  },
}
