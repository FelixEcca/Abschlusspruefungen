import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

// Hilfsfunktionen für LaTeX-Strings
function mono(coeff: number, v = 'x') {
  if (coeff === 0) return '0'
  if (coeff === 1) return v
  if (coeff === -1) return `-${v}`
  return `${coeff}\\,${v}`
}
function lin(m: number, b: number, v = 'x') {
  const mPart = m === 0 ? '' : mono(m, v)
  const bPart =
    b === 0 ? '' : b > 0 ? (mPart ? `+ ${b}` : `${b}`) : `- ${Math.abs(b)}`
  return mPart || bPart ? `${mPart}${mPart && bPart ? ' ' : ''}${bPart}` : '0'
}

interface DATA {
  coeff1: number
  coeff2: number
  cons: number
  m_2: number
  m_3: number
  cons_2: number
}

export const exercise3161: Exercise<DATA> = {
  title: 'LGS',
  source: '2024 Wahlteil Aufgabe 4B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      coeff1: rng.randomIntBetween(1, 3),
      coeff2: rng.randomIntBetween(1, 3),
      cons: rng.randomIntBetween(-6, 4),
      m_2: rng.randomIntBetween(2, 4),
      m_3: rng.randomIntBetween(-4, 4),
      cons_2: rng.randomIntBetween(-3, 4),
    }
  },
  originalData: { coeff1: 1, coeff2: 2, cons: -3, m_2: 2, m_3: -2, cons_2: -1 },
  constraint({ data }) {
    return (
      data.coeff2 != 1 &&
      (data.cons / (data.coeff1 - data.coeff2 * data.m_2)) % 1 == 0 &&
      data.cons != 0 &&
      data.m_3 != 0 &&
      data.m_2 != 0
    )
  },
  intro() {
    return <></>
  },
  tasks: [
    // (a)
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Gegeben ist ein lineares Gleichungssystem.
              <br />
              Berechnen Sie die Lösung.
            </p>
            <p>
              <InlineMath
                math={`(I)\\; ${mono(data.coeff1)} = ${mono(data.coeff2, 'y')}\\; ${data.cons >= 0 ? '+\\,' + data.cons : '-\\,' + Math.abs(data.cons)}`}
              />
              <br />
              <InlineMath math={`(II)\\; y = ${lin(data.m_2, 0)}`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const a = data.coeff1
        const b = data.coeff2
        const c = data.cons
        const m = data.m_2
        const lhsAfterMove = a - b * m
        const xVal = c / lhsAfterMove
        const yVal = m * xVal

        return (
          <>
            <p>
              Setze <InlineMath math={`y = ${lin(m, 0)}`} /> in{' '}
              <InlineMath math="(I)" /> ein und löse nach{' '}
              <InlineMath math="x" /> auf.
            </p>

            {buildEquation([
              [
                <>
                  <InlineMath math={mono(a)} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`${b}\\,\\cdot\\,(${lin(m, 0)})\\; ${c >= 0 ? '+\\,' + c : '-\\,' + Math.abs(c)}`}
                  />
                </>,
              ],
              [
                <>
                  <InlineMath math={mono(a)} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`${mono(b * m)}\\; ${c >= 0 ? '+\\,' + c : '-\\,' + Math.abs(c)}`}
                  />
                </>,
                <>
                  <InlineMath math={`\\;|\\;${mono(-b * m)}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={mono(lhsAfterMove)} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`${c}`} />
                </>,
                <>
                  <InlineMath
                    math={`\\;|\\;:\\,${lhsAfterMove < 0 ? `(${lhsAfterMove})` : lhsAfterMove}`}
                  />
                </>,
              ],
              [
                <>
                  <InlineMath math={'x'} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`${xVal}`} />
                </>,
              ],
            ])}

            <p>
              Bestimme <InlineMath math="y" /> durch Einsetzen in{' '}
              <InlineMath math="(II)" />:
              <br />
              <InlineMath math={`y = ${m}\\cdot ${xVal} = ${yVal}`} />
            </p>
          </>
        )
      },
    },

    // (b)
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            <p>Gegeben ist ein anderes, unvollständiges LGS mit:</p>
            <p>
              <InlineMath math={`(I)\\; y = ${lin(data.m_3, data.cons_2)}`} />
              <br />
              <InlineMath math="(II)" />
            </p>
          </>
        )
      },
      task({ data }) {
        return (
          <>
            <p>
              Stellen Sie Gleichung <InlineMath math="(I)" /> grafisch in einem
              Koordinatensystem dar.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * (284 / 16)
        }
        function toY(n: number) {
          return 154 - n * (284 / 16)
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const LinePoints = generateLinePoints(data.m_3, data.cons_2, 0.1)
        return (
          <>
            <p>
              Zeichne die Gerade{' '}
              <InlineMath math={`y = ${lin(data.m_3, data.cons_2)}`} /> ein.
            </p>
            <svg viewBox="0 0 328 310">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="310"
                width="328"
              />
              <polyline
                points={LinePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </>
        )
      },
    },

    // (c)
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Geben Sie eine zweite Gleichung <InlineMath math="(II)" /> an,
              sodass das LGS aus (b) keine Lösung hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        const m = data.m_3
        const b1 = data.cons_2
        const b2 = b1 + 1
        return (
          <>
            <p>
              Eine mögliche Wahl sind zwei parallele Geraden (gleiche Steigung,
              verschiedene Achsenabschnitte):
            </p>
            <p>
              <InlineMath math={`(I)\\; y = ${lin(m, b1)}`} />
              <br />
              <InlineMath math={`(II)\\; y = ${lin(m, b2)}`} />
            </p>
            <p>
              Subtrahiert man <InlineMath math="(I)" /> von{' '}
              <InlineMath math="(II)" />, erhält man{' '}
              <InlineMath math={'0 = 1'} />, also ein Widerspruch. Das LGS hat
              keine Lösung.
            </p>
          </>
        )
      },
    },

    // (d)
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Stellen Sie eine mögliche Gleichung <InlineMath math="(II)" />{' '}
              grafisch in dem vorhandenen Koordinatensystem dar, sodass das LGS
              keine Lösung hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * (284 / 16)
        }
        function toY(n: number) {
          return 154 - n * (284 / 16)
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const m = data.m_3
        const b1 = data.cons_2
        const b2 = b1 + 1

        const LinePoints = generateLinePoints(m, b1, 0.1)
        const LinePoints2 = generateLinePoints(m, b2, 0.1)

        return (
          <>
            <p>
              Zwei parallele Geraden (gleiche Steigung{' '}
              <InlineMath math={`${m}`} />, verschiedene Achsenabschnitte{' '}
              <InlineMath math={`${b1}`} /> und <InlineMath math={`${b2}`} />)
              schneiden sich nicht.
            </p>
            <svg viewBox="0 0 328 310">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="310"
                width="328"
              />
              <polyline
                points={LinePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={LinePoints2}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={toX(0)}
                y={toY(b2)}
                fontSize={20}
                textAnchor="middle"
                stroke="orange"
              >
                (II)
              </text>
              <text
                x={toX(0)}
                y={toY(b1)}
                fontSize={20}
                textAnchor="middle"
                stroke="blue"
              >
                (I)
              </text>
            </svg>
          </>
        )
      },
    },
  ],
}
