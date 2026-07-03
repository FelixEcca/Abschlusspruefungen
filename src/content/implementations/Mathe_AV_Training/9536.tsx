// exercise9536.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  total: number
  p1: number
  p2: number
  p3: number
  p4: number
  target: number
}

function sectorPath(
  cx: number,
  cy: number,
  r: number,
  start: number,
  end: number,
) {
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
                <path
                  d={d}
                  fill={i % 2 === 0 ? '#ddd' : '#aaa'}
                  stroke="black"
                />
                <text x={tx} y={ty - 5} fontSize="12" textAnchor="middle">
                  {labels[i]}
                </text>
                <text x={tx} y={ty + 5} fontSize="12" textAnchor="middle">
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
        <p>Berechne mit dem Dreisatz:</p>
        <svg viewBox="0 0 328 185">
          <image
            href="/content/AV_Prüfungen/Dreisatz.PNG"
            height="185"
            width="328"
          />
          <text x="120" y="12" fontSize="15" textAnchor="middle">
            %
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            Personen
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            100
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.total)}
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(data.total / 100)}
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {v}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(result)}
          </text>

          <text x="24" y="72" fontSize="14">
            : 100
          </text>
          <text x="22" y="123" fontSize="14">
            · {v}
          </text>

          <text x="286" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {v}
          </text>
        </svg>
        <p>
          Das sind <b>{pp(result)} Personen</b>.
        </p>
      </>
    )
  },
}
