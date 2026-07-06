import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  h: number
  m: number // Abstand von h zu den Nullstellen (damit ganzzahlig)
  k: number // = -a*m^2
  y0: number // y-Achsenabschnitt
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise4005: Exercise<DATA> = {
  title: 'Nullstellen & y-Achsenabschnitt am Graphen',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const a = rng.randomItemFromArray([1, -1])
    const h = rng.randomIntBetween(-4, 4)
    const m = rng.randomIntBetween(1, 4)
    const k = -a * m * m
    const y0 = a * h * h + k
    return { a, h, m, k, y0 }
  },

  originalData: {
    a: 1,
    h: -2,
    m: 3,
    k: -6, // -a*m^2
    y0: 1 * 4 - 9, // -5
  },

  constraint({ data }) {
    // alles im Sichtbereich halten
    const { h, m, y0 } = data
    return (
      Math.abs(h) <= 7 &&
      Math.abs(h + m) <= 8 &&
      Math.abs(h - m) <= 8 &&
      Math.abs(y0) <= 8 &&
      Math.abs(data.k) <= 8
    )
  },

  task({ data }) {
    const { a, h, k } = data

    // Graph rendern
    const denseXs: number[] = []
    for (let x = h - 6; x <= h + 6; x += 0.1) denseXs.push(+x.toFixed(1))
    const path = denseXs
      .map(x => `${toX(x)},${toY(a * (x - h) * (x - h) + k)}`)
      .join(' ')

    return (
      <>
        <p>
          Lies am Schaubild der Parabel alle Schnittpunkte mit den
          Koordinatenachsen ab.
        </p>
        <svg viewBox="0 0 328 328" className="w-full max-w-xs">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={path}
            fill="none"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </svg>
      </>
    )
  },

  solution({ data }) {
    const { h, m, y0 } = data
    const x1 = h - m
    const x2 = h + m
    return (
      <>
        <p>
          Nullstellen:{' '}
          <InlineMath
            math={`N_{1}(${pp(x1)}\\mid 0),\\;N_{2}(${pp(x2)}\\mid 0)`}
          />
        </p>
        <p>
          Schnittpunkt mit der y-Achse: <br></br>
          <InlineMath math={`SP_{y}(0\\mid ${pp(y0)})`} />
        </p>
      </>
    )
  },
}
