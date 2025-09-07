import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type DType4900 = 'bar' | 'pie'
interface D4900 {
  t: DType4900
  labels: string[]
  values: number[]
}

export const exercise4900: Exercise<D4900> = {
  title: 'Diagramme lesen',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 3,
  generator(rng) {
    const t = rng.randomItemFromArray(['bar', 'pie'] as const)
    const labels = ['A', 'B', 'C', 'D', 'E'].slice(
      0,
      rng.randomIntBetween(3, 5),
    )
    const values = labels.map(() => rng.randomIntBetween(2, 12))
    return { t, labels, values }
  },
  originalData: { t: 'bar', labels: ['A', 'B', 'C'], values: [3, 7, 5] },
  constraint() {
    return true
  },
  task({ data }) {
    const { t, labels, values } = data
    const total = values.reduce((s, v) => s + v, 0)
    return (
      <>
        {t === 'bar' ? (
          <>
            <p>
              Betrachte das Balkendiagramm. Nenne die größte Kategorie und die
              Gesamtanzahl.
            </p>
            <svg viewBox="0 0 240 150" className="w-full max-w-sm">
              {values.map((v, i) => (
                <rect
                  key={i}
                  x={30 + i * 40}
                  y={140 - v * 8}
                  width="30"
                  height={v * 8}
                  fill="#60a5fa"
                />
              ))}
              <line x1="20" y1="140" x2="220" y2="140" stroke="#000" />
              {labels.map((L, i) => (
                <text
                  key={i}
                  x={45 + i * 40}
                  y="145"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {L}
                </text>
              ))}
            </svg>
          </>
        ) : (
          <>
            <p>
              Betrachte das Kreisdiagramm. Wie groß (in %) ist der Anteil von
              Kategorie A? Wie viele sind es absolut?
            </p>
            <svg viewBox="0 0 160 160" className="w-full max-w-[220px]">
              {/* simple pie via stroke-dasharray */}
              {(() => {
                const r = 60,
                  cx = 80,
                  cy = 80,
                  C = 2 * Math.PI * r
                let acc = 0
                return values.map((v, i) => {
                  const frac = v / total
                  const dash = frac * C
                  const gap = C - dash
                  const rot = (acc / total) * 360
                  acc += v
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="none"
                      strokeWidth="40"
                      stroke={
                        ['#60a5fa', '#f59e0b', '#10b981', '#ef4444', '#a78bfa'][
                          i % 5
                        ]
                      }
                      strokeDasharray={`${dash} ${gap}`}
                      transform={`rotate(${rot} ${cx} ${cy})`}
                    />
                  )
                })
              })()}
            </svg>
          </>
        )}
      </>
    )
  },
  solution({ data }) {
    const { t, labels, values } = data
    const total = values.reduce((s, v) => s + v, 0)
    if (t === 'bar') {
      const iMax = values.reduce(
        (imax, v, i) => (v > values[imax] ? i : imax),
        0,
      )
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            '\\text{Größte Kategorie: }&\\;' + labels[iMax] + '\\\\',
            '\\text{Gesamt: }&\\;' + total,
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    // pie
    const vA = values[0]
    const pA = (vA / total) * 100
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          'p_{A}&=\\frac{v_A}{\\text{Gesamt}}\\cdot 100=\\frac{' +
            vA +
            '}{' +
            total +
            '}\\cdot100=' +
            pp(pA) +
            '\\%\\\\',
          '\\text{Absolut: }&\\;' + vA,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
