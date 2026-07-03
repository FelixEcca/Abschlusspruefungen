// exercise3062.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c2: number
  root1: number
  root2: number
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}

function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function polylinePoints(a: number, b: number) {
  let pts = ''
  for (let x = -5; x <= 5; x += 0.05) {
    const y = a * x * x + b * x
    pts += `${toX(x)},${toY(y)} `
  }
  return pts.trim()
}

export const exercise3062: Exercise<DATA> = {
  title: 'Parabel p1 und p2',
  source: 'Prüfung 2022 / Aufgabe 4B',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const a = rng.randomItemFromArray([1, 2, 3])
    const r1 = 0
    const r2 = rng.randomItemFromArray([-4, -3, -2])
    const b = -a * (r1 + r2)
    const c2 = rng.randomItemFromArray([1, 2, 3])

    return {
      a,
      b,
      c2,
      root1: r1,
      root2: r2,
    }
  },

  originalData: {
    a: 2,
    b: 4,
    c2: 1,
    root1: 0,
    root2: -2,
  },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <>
        <p>
          Die Parabel p1 hat die Gleichung
          <br />
          <InlineMath
            math={`y = ${pp(data.a)}x^2 ${data.b >= 0 ? '+' : '-'} ${pp(
              Math.abs(data.b),
            )}x`}
          />
          .
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Berechnen Sie die Schnittpunkte der Parabel p1 mit den
              Koordinatenachsen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const c = 0
        const discriminant = data.b * data.b - 4 * data.a * c

        return (
          <>
            <p>
              Für die Schnittpunkte mit der x-Achse setzt man{' '}
              <InlineMath math="y=0" />.
            </p>
            <InlineMath
              math={`0 = ${pp(data.a)}x^2 ${data.b >= 0 ? '+' : '-'} ${pp(
                Math.abs(data.b),
              )}x`}
            />
            <br />
            <InlineMath
              math={`0 = ${pp(data.a)}x^2 ${data.b >= 0 ? '+' : '-'} ${pp(
                Math.abs(data.b),
              )}x + 0`}
            />
            <br />
            <InlineMath
              math={`x_{1,2} = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}`}
            />
            <br />
            <InlineMath
              math={`x_{1,2} = \\frac{-(${pp(data.b)}) \\pm \\sqrt{${pp(
                data.b,
              )}^2-4\\cdot ${pp(data.a)}\\cdot 0}}{2\\cdot ${pp(data.a)}}`}
            />
            <br />
            <InlineMath
              math={`x_{1,2} = \\frac{-(${pp(data.b)}) \\pm \\sqrt{${pp(
                discriminant,
              )}}}{${pp(2 * data.a)}}`}
            />
            <br />
            <InlineMath
              math={`x_1 = ${pp(data.root1)},\\quad x_2 = ${pp(data.root2)}`}
            />
            <br />
            <p>
              Die Schnittpunkte mit der x-Achse sind also{' '}
              <InlineMath math={`(${pp(data.root1)}\\mid 0)`} /> und{' '}
              <InlineMath math={`(${pp(data.root2)}\\mid 0)`} />.
            </p>
            <p>
              Für die y-Achse setzt man <InlineMath math="x=0" />. Dann ist{' '}
              <InlineMath math="y=0" />.
            </p>
            <InlineMath math={`(0\\mid 0)`} />
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Zeichnen Sie die Parabel p1 in ein Koordinatensystem.</p>
          </>
        )
      },
      solution({ data }) {
        const xS = -data.b / (2 * data.a)
        const yS = data.a * xS * xS + data.b * xS
        const pts = polylinePoints(data.a, data.b)

        return (
          <>
            <p>Wichtige Punkte sind die Nullstellen und der Scheitelpunkt.</p>
            <InlineMath
              math={`x_S = -\\frac{b}{2a} = -\\frac{${pp(data.b)}}{2\\cdot ${pp(
                data.a,
              )}} = ${pp(xS)}`}
            />
            <br />
            <InlineMath
              math={`y_S = ${pp(data.a)}\\cdot ${pp(xS, 'embrace_neg')}^2 ${pp(
                data.b,
                'merge_op',
              )}\\cdot ${pp(xS, 'embrace_neg')} = ${pp(yS)}`}
            />
            <br />
            <InlineMath math={`S(${pp(xS)}\\mid ${pp(yS)})`} />

            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={pts}
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
              <circle cx={toX(data.root1)} cy={toY(0)} r="3" fill="black" />
              <circle cx={toX(data.root2)} cy={toY(0)} r="3" fill="black" />
              <circle cx={toX(xS)} cy={toY(yS)} r="3" fill="black" />

              <text x={toX(data.root1) + 4} y={toY(0) - 4} fontSize="12">
                N₁
              </text>
              <text x={toX(data.root2) + 4} y={toY(0) - 4} fontSize="12">
                N₂
              </text>
              <text x={toX(xS) + 4} y={toY(yS) - 4} fontSize="12">
                S
              </text>
            </svg>
          </>
        )
      },
    },
    {
      points: 2,
      intro({ data }) {
        return (
          <>
            <p>
              Eine weitere Parabel p2 hat die Gleichung{' '}
              <InlineMath math={`y = -x^2 + ${pp(data.c2)}`} />.
            </p>
          </>
        )
      },
      task() {
        return (
          <>
            <p>
              Beschreiben Sie, wie diese Parabel aus der Normalparabel entsteht.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Gegenüber der Normalparabel <InlineMath math={'y=x^2'} /> wird die
              Parabel an der x-Achse gespiegelt und dann um{' '}
              <InlineMath math={`${pp(data.c2)}`} /> Einheiten nach oben
              verschoben.
            </p>
          </>
        )
      },
    },
  ],
}
