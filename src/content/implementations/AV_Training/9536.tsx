// exercise9536.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  total: number
  p1: number
  p2: number
  p3: number
  p4: number
  target: number
}

function sectorPath(cx: number, cy: number, r: number, start: number, end: number) {
  const x1 = cx + r * Math.cos(start)
  const y1 = cy + r * Math.sin(start)
  const x2 = cx + r * Math.cos(end)
  const y2 = cy + r * Math.sin(end)
  const large = end - start > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
}

export const exercise9536: Exercise<DATA> = {
  title: 'Kreisdiagramm lesen',
  source: 'Diagramme',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const total = rng.randomItemFromArray([40, 60, 80, 100, 120])
    const p1 = rng.randomItemFromArray([40, 50, 60])
    const p2 = rng.randomItemFromArray([10, 15, 20])
    const p3 = rng.randomItemFromArray([10, 15, 20])
    const p4 = 100 - p1 - p2 - p3
    const target = rng.randomIntBetween(0, 3)

    return { total, p1, p2, p3, p4, target }
  },

  originalData: {
    total: 80,
    p1: 60,
    p2: 20,
    p3: 15,
    p4: 5,
    target: 1,
  },

  constraint({ data }) {
    return data.p4 > 0
  },

  task({ data }) {
    const values = [data.p1, data.p2, data.p3, data.p4]
    const labels = ['A', 'B', 'C', 'D']
    let start = -Math.PI / 2

    return (
      <>
        <p>Das Kreisdiagramm zeigt eine Umfrage mit {data.total} Personen.</p>

        <svg viewBox="0 0 328 220">
          {values.map((v, i) => {
            const end = start + (v / 100) * 2 * Math.PI
            const d = sectorPath(164, 105, 75, start, end)
            const mid = (start + end) / 2
            const tx = 164 + 105 * Math.cos(mid)
            const ty = 105 + 105 * Math.sin(mid)
            start = end

            return (
              <g key={i}>
                <path d={d} fill={i % 2 === 0 ? '#ddd' : '#aaa'} stroke="black" />
                <text x={tx} y={ty} fontSize="12" textAnchor="middle">
                  {labels[i]}
                </text>
                <text x={tx} y={ty + 14} fontSize="12" textAnchor="middle">
                  {v}%
                </text>
              </g>
            )
          })}
        </svg>

        <p>
          Berechnen Sie, wie viele Personen zu Bereich {labels[data.target]}{' '}
          gehören.
        </p>
      </>
    )
  },

  solution({ data }) {
    const values = [data.p1, data.p2, data.p3, data.p4]
    const v = values[data.target]
    const result = (data.total * v) / 100

    return (
      <>
        <InlineMath math={`${data.total}\\cdot\\frac{${v}}{100}=${pp(result)}`} />
        <p>
          Das sind <b>{pp(result)} Personen</b>.
        </p>
      </>
    )
  },
}