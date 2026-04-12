import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'quadratic' | 'cubic'

interface DATA {
  modeA: Mode
  modeB: Mode

  // Teil a
  coeffsA: number[]
  x1A: number
  x2A: number
  y1A: number
  y2A: number
  avgA: number

  // Teil b
  coeffsB: number[]
  x1B: number
  x2B: number
  y1B: number
  y2B: number
  avgB: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}

function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function evalPoly(mode: Mode, coeffs: number[], x: number) {
  if (mode === 'quadratic') {
    const [a, b, c] = coeffs
    return a * x * x + b * x + c
  }
  const [a, b, c, d] = coeffs
  return a * x * x * x + b * x * x + c * x + d
}

function polyToLatex(mode: Mode, coeffs: number[]) {
  const parts: string[] = []

  function addTerm(coeff: number, latexVar: string, isFirst = false) {
    if (coeff === 0) return
    const sign = coeff < 0 ? ' - ' : isFirst ? '' : ' + '
    const abs = Math.abs(coeff)

    let coeffStr = ''
    if (latexVar === '') {
      coeffStr = `${pp(abs)}`
    } else if (abs === 1) {
      coeffStr = ''
    } else {
      coeffStr = `${pp(abs)}`
    }

    parts.push(`${sign}${coeffStr}${latexVar}`)
  }

  if (mode === 'quadratic') {
    const [a, b, c] = coeffs
    addTerm(a, 'x^{2}', true)
    addTerm(b, 'x')
    addTerm(c, '')
  } else {
    const [a, b, c, d] = coeffs
    addTerm(a, 'x^{3}', true)
    addTerm(b, 'x^{2}')
    addTerm(c, 'x')
    addTerm(d, '')
  }

  return parts.join('').trim()
}

function buildPolyline(mode: Mode, coeffs: number[]) {
  const pts: string[] = []
  for (let x = -8; x <= 8; x += 0.1) {
    const y = evalPoly(mode, coeffs, x)
    pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

function generateFunctionData(rng: any, mode: Mode) {
  const xOptions = [-3, -2.5, -2, -1.5, -1, 0, 1, 1.5, 2, 2.5, 3]

  while (true) {
    let coeffs: number[] = []

    if (mode === 'quadratic') {
      const a = rng.randomItemFromArray([-1, -0.5, 0.5, 1])
      const b = rng.randomItemFromArray([-2, -1, 0, 1, 2])
      const c = rng.randomItemFromArray([-3, -2, -1, 0, 1, 2, 3])
      coeffs = [a, b, c]
    } else {
      const a = rng.randomItemFromArray([-0.5, -0.25, 0.25, 0.5])
      const b = rng.randomItemFromArray([-1, 0, 1])
      const c = rng.randomItemFromArray([-2, -1, 0, 1, 2])
      const d = rng.randomItemFromArray([-2, -1, 0, 1, 2])
      coeffs = [a, b, c, d]
    }

    const x1 = rng.randomItemFromArray(xOptions)
    let x2 = rng.randomItemFromArray(xOptions)
    while (x2 === x1) x2 = rng.randomItemFromArray(xOptions)

    const y1 = round2(evalPoly(mode, coeffs, x1))
    const y2 = round2(evalPoly(mode, coeffs, x2))
    const avg = round2((y2 - y1) / (x2 - x1))

    if (
      Math.abs(y1) <= 8 &&
      Math.abs(y2) <= 8 &&
      x1 !== x2 &&
      Math.abs(avg) <= 10
    ) {
      return { coeffs, x1, x2, y1, y2, avg }
    }
  }
}

export const exercise5116: Exercise<DATA> = {
  title: 'Durchschnittliche Änderungsrate',
  source: 'Funktionen',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const modeA: Mode = rng.randomItemFromArray(['quadratic', 'cubic'])
    const modeB: Mode = rng.randomItemFromArray(['quadratic', 'cubic'])

    const partA = generateFunctionData(rng, modeA)
    const partB = generateFunctionData(rng, modeB)

    return {
      modeA,
      modeB,
      coeffsA: partA.coeffs,
      x1A: partA.x1,
      x2A: partA.x2,
      y1A: partA.y1,
      y2A: partA.y2,
      avgA: partA.avg,

      coeffsB: partB.coeffs,
      x1B: partB.x1,
      x2B: partB.x2,
      y1B: partB.y1,
      y2B: partB.y2,
      avgB: partB.avg,
    }
  },

  originalData: {
    modeA: 'quadratic',
    modeB: 'cubic',

    coeffsA: [1, -2, -3],
    x1A: -1,
    x2A: 3,
    y1A: 0,
    y2A: 0,
    avgA: 0,

    coeffsB: [0.25, 0, -2, 1],
    x1B: -2,
    x2B: 2,
    y1B: 3,
    y2B: -1,
    avgB: -1,
  },

  constraint({ data }) {
    return data.x1A !== data.x2A && data.x1B !== data.x2B
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        const graphPoints = buildPolyline(data.modeA, data.coeffsA)

        return (
          <>
            <p>
              Auf dem Graphen liegen die Punkte P und Q mit den Koordinaten P(
              {pp(data.x1A)}|{pp(data.y1A)}) und Q({pp(data.x2A)}|{pp(data.y2A)}
              ).
            </p>
            <p>
              Berechnen Sie die durchschnittliche Änderungsrate auf dem
              Intervall{' '}
              <InlineMath
                math={`\\left[${pp(data.x1A)};${pp(data.x2A)}\\right]`}
              />
              .
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={graphPoints}
                fill="none"
                stroke="black"
                strokeWidth="2"
              />

              <circle
                cx={toX(data.x1A)}
                cy={toY(data.y1A)}
                r="4"
                fill="black"
              />
              <circle
                cx={toX(data.x2A)}
                cy={toY(data.y2A)}
                r="4"
                fill="black"
              />
              <text
                x={toX(data.x1A) + 6}
                y={toY(data.y1A) - 6}
                fontSize="15"
                fill="blue"
              >
                P
              </text>
              <text
                x={toX(data.x2A) + 6}
                y={toY(data.y2A) - 6}
                fontSize="15"
                fill="blue"
              >
                Q
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`m = \\frac{y_2-y_1}{x_2-x_1}`} />
            <br />
            <InlineMath
              math={`m = \\frac{${pp(data.y2A)}-${pp(data.y1A)}}{${pp(
                data.x2A,
              )}-${pp(data.x1A)}}`}
            />
            <br />
            <InlineMath math={`m = ${pp(data.avgA)}`} />
          </>
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        const term = polyToLatex(data.modeB, data.coeffsB)

        return (
          <>
            <p>
              Gegeben ist die Funktion <br></br>
              <InlineMath math={`f(x)=${term}`} />. Berechnen Sie die
              durchschnittliche Änderungsrate im Intervall{' '}
              <InlineMath
                math={`\\left[${pp(data.x1B)};${pp(data.x2B)}\\right]`}
              />
              .
            </p>
            <p>
              Hinweis: Berechnen Sie dazu erstmal die Funktionswerte{' '}
              <InlineMath math={`f(${pp(data.x1B)}), f(${pp(data.x2B)})`} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const term = polyToLatex(data.modeB, data.coeffsB)

        return (
          <>
            <InlineMath math={`f(x)=${term}`} />
            <br />
            <InlineMath math={`f(${pp(data.x1B)}) = ${pp(data.y1B)}`} />
            <br />
            <InlineMath math={`f(${pp(data.x2B)}) = ${pp(data.y2B)}`} />
            <br />
            <InlineMath
              math={`m = \\frac{f(${pp(data.x2B)})-f(${pp(data.x1B)})}{${pp(
                data.x2B,
              )}-${pp(data.x1B)}}`}
            />
            <br />
            <InlineMath
              math={`m = \\frac{${pp(data.y2B)}-${pp(data.y1B)}}{${pp(
                data.x2B,
              )}-${pp(data.x1B)}}`}
            />
            <br />
            <InlineMath math={`m = ${pp(data.avgB)}`} />
          </>
        )
      },
    },
  ],
}
