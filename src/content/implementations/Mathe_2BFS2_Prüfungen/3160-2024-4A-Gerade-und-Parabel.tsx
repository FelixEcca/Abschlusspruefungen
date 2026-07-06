import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  m: number
  b: number
  b_p: number
  c: number
}

function linLatex(m: number, b: number) {
  const mPart = m === 1 ? 'x' : m === -1 ? '-x' : `${m}x`
  const bPart = b === 0 ? '' : b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`
  return `y = ${mPart}${bPart}`
}

function quadLatex(b_p: number, c: number) {
  const bx =
    b_p === 0 ? '' : b_p > 0 ? `+ ${b_p}\\,x` : `- ${Math.abs(b_p)}\\,x`
  const cPart = c === 0 ? '' : c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`
  return `y = x^{2} ${bx} ${cPart}`
}

export const exercise3160: Exercise<DATA> = {
  title: 'Parabel und Gerade',
  source: '2024 Wahlteil Aufgabe 4A',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      m: rng.randomItemFromArray([-1, 1]),
      b: rng.randomIntBetween(-1, 2),
      b_p: rng.randomIntBetween(-8, 1) * 2,
      c: rng.randomIntBetween(4, 10),
    }
  },
  originalData: { m: -1, b: 3, b_p: -6, c: 7 },
  constraint({ data }) {
    const p = data.b_p - data.m
    const q = data.c - data.b
    const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    return x1 % 1 == 0 && x2 % 1 == 0 && x1 > -1 && x2 < 5 && data.b !== 0
  },
  intro({ data }) {
    return (
      <>
        <p>
          Gegeben sind die Gerade <InlineMath math={'g'} /> und die Parabel{' '}
          <InlineMath math={'p'} />.
        </p>
        <p>
          <InlineMath math={'g:\\; ' + linLatex(data.m, data.b)} />
          <br />
          <InlineMath math={'p:\\; ' + quadLatex(data.b_p, data.c)} />
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Zeichnen Sie die Schaubilder von <InlineMath math={'g'} /> und{' '}
              <InlineMath math={'p'} /> in ein Koordinatensystem.
              <br />
              <InlineMath
                math={
                  '(1\\,\\text{cm}\\,\\widehat{=}\\,1\\,\\text{LE};\\;-1\\le x\\le 6;\\;-3\\le y\\le 4)'
                }
              />
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 98 + n * (185 / 7)
        }
        function toY(n: number) {
          return 133 - n * (185 / 7)
        }
        function generateParabolaPoints(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -2; x <= 7; x += step) {
            const y = x * x + b * x + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -2; x <= 7; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(data.b_p, data.c, 0.1)
        const linePoints = generateLinePoints(data.m, data.b, 0.1)
        return (
          <>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/Mathe_2BFS2/310.png"
                height="230"
                width="328"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={linePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Bestimmen Sie den Schnittpunkt der Geraden{' '}
              <InlineMath math={'g'} /> mit der <InlineMath math={'y'} />
              -Achse.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 98 + n * (185 / 7)
        }
        function toY(n: number) {
          return 133 - n * (185 / 7)
        }
        function generateParabolaPoints(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -2; x <= 7; x += step) {
            const y = x * x + b * x + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -2; x <= 7; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(data.b_p, data.c, 0.1)
        const linePoints = generateLinePoints(data.m, data.b, 0.1)
        return (
          <>
            <p>Lies den Schnittpunkt aus dem Koordinatensystem ab:</p>
            <svg viewBox="0 0 328 260">
              <image
                href="/content/Mathe_2BFS2/310.png"
                height="230"
                width="328"
              />
              <text
                x={toX(0) + 20}
                y={toY(data.b) + 4}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                × (0|{data.b})
              </text>
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={linePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Berechnen Sie die Schnittpunkte von Gerade{' '}
              <InlineMath math={'g'} /> und Parabel <InlineMath math={'p'} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const p = data.b_p - data.m
        const q = data.c - data.b
        const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
        const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)

        return (
          <>
            <p>
              Setze die Geradengleichung mit der Parabelgleichung gleich und
              löse nach x:
            </p>
            {buildEquation([
              [
                <>
                  <InlineMath math={'y_g'} />
                </>,
                <>
                  <InlineMath math={'='} />
                </>,
                <>
                  <InlineMath math={'y_p'} />
                </>,
              ],
              [
                <>
                  <InlineMath
                    math={linLatex(data.m, data.b).replace('y = ', '')}
                  />
                </>,
                <>
                  <InlineMath math={'='} />
                </>,
                <>
                  <InlineMath
                    math={quadLatex(data.b_p, data.c).replace('y = ', '')}
                  />
                </>,
                <>
                  <InlineMath
                    math={data.m === 1 ? '\\;|\\;-x' : '\\;|\\;+\\,x'}
                  />
                </>,
              ],
              [
                <>
                  <InlineMath math={`${data.b}`} />
                </>,
                <>
                  <InlineMath math={'='} />
                </>,
                <>
                  <InlineMath
                    math={`x^{2} ${data.b_p - data.m}\\,x + ${data.c}`}
                  />
                </>,
                <>
                  <InlineMath math={`\\;|\\;${pp(-data.b)}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={'0'} />
                </>,
                <>
                  <InlineMath math={'='} />
                </>,
                <>
                  <InlineMath math={`x^{2} ${p}\\,x + ${q}`} />
                </>,
              ],
            ])}

            <p>
              Löse diese quadratische Gleichung mit der pq-Formel. Bestimme dazu{' '}
              <InlineMath math={'p'} /> und <InlineMath math={'q'} />:
              <br />
              <InlineMath math={`p = ${p},\\; q = ${q}`} />
            </p>

            {buildEquation([
              [
                <>
                  <InlineMath math={'x_{1/2}'} />
                </>,
                <>
                  <InlineMath math={'='} />
                </>,
                <>
                  <InlineMath
                    math={
                      '-\\frac{p}{2} \\;\\pm\\; \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}'
                    }
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math={'='} />
                </>,
                <>
                  <InlineMath
                    math={`-\\frac{${p}}{2} \\;\\pm\\; \\sqrt{\\left(\\frac{${p}}{2}\\right)^2 - (${pp(q)})}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math={'='} />
                </>,
                <>
                  <InlineMath
                    math={`${pp(-p / 2)}\\;\\pm\\;\\sqrt{${pp(
                      (p / 2) * (p / 2) - q,
                    )}}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math={'='} />
                </>,
                <>
                  <InlineMath
                    math={`${pp(-p / 2)}\\;\\pm\\;${pp(Math.sqrt((p / 2) * (p / 2) - q))}`}
                  />
                </>,
              ],
            ])}

            <p>
              <InlineMath
                math={`x_1 = ${pp(-p / 2)} + ${pp(Math.sqrt((p / 2) * (p / 2) - q))} = ${pp(x1)}`}
              />
            </p>
            <p>
              <InlineMath
                math={`x_2 = ${pp(-p / 2)} - ${pp(Math.sqrt((p / 2) * (p / 2) - q))} = ${pp(x2)}`}
              />
            </p>

            <p>
              Berechne die <InlineMath math={'y'} />
              -Werte der Schnittpunkte. (Mit beiden Gleichungen erhältst du die
              gleichen <InlineMath math={'y'} />
              -Werte.)
            </p>
            <p>
              <InlineMath
                math={`y_1 = ${data.m}\\,\\cdot\\,${pp(x1)} + ${data.b} = ${pp(data.m * x1 + data.b)}`}
              />
              <br />
              <InlineMath
                math={`y_2 = ${data.m}\\,\\cdot\\,${pp(x2)} + ${data.b} = ${pp(data.m * x2 + data.b)}`}
              />
            </p>

            <p>
              Damit sind die Schnittpunkte:
              <br />
              <InlineMath
                math={`P_1\\big(${pp(x1)}\\mid ${pp(data.m * x1 + data.b)}\\big)\\;\\;P_2\\big(${pp(
                  x2,
                )}\\mid ${pp(data.m * x2 + data.b)}\\big)`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
