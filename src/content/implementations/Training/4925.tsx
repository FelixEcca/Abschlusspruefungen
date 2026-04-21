// =====================================
// exercise4925.tsx
// Schnittpunkte zweier Parabeln
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Count = 0 | 1 | 2

interface DATA {
  a1: number
  b1: number
  c1: number
  a2: number
  b2: number
  c2: number
  count: Count
  x1: number
  x2: number
  y1: number
  y2: number
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
function parabolaPoints(a: number, b: number, c: number) {
  const pts: string[] = []
  for (let x = -5; x <= 5; x += 0.05) {
    const y = a * x * x + b * x + c
    pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

function quadraticToLatex(a: number, b: number, c: number): string {
  const parts: string[] = []

  function appendTerm(coeff: number, variable: string) {
    if (coeff === 0) return
    const isFirst = parts.length === 0
    const absCoeff = Math.abs(coeff)
    const coeffText = variable !== '' && absCoeff === 1 ? '' : pp(absCoeff)
    const sign = coeff < 0 ? '−' : isFirst ? '' : '+'
    parts.push(`${sign}${coeffText}${variable}`)
  }

  appendTerm(a, 'x^2')
  appendTerm(b, 'x')
  appendTerm(c, '')

  return parts.length === 0 ? '0' : parts.join('')
}

export const exercise4925: Exercise<DATA> = {
  title: 'Schnittpunkte Parabel-Parabel',
  source: 'Training',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const count = rng.randomItemFromArray<Count>([0,1, 2])

    if (count === 2) {
      const a2 = rng.randomItemFromArray([1, -1])
      const a1 = a2 + rng.randomItemFromArray([-2, -1, 1, 2])
      const r1 = rng.randomItemFromArray([-3, -2, -1, 0, 1])
      let r2 = rng.randomItemFromArray([0, 1, 2, 3])
      while (r2 === r1) r2 = rng.randomItemFromArray([0, 1, 2, 3])

      const A = a1 - a2
      const xsum = r1 + r2
      const xprod = r1 * r2

      const b2 = rng.randomIntBetween(-2, 2)
      const b1 = b2 - A * xsum

      const c2 = rng.randomIntBetween(-2, 2)
      const c1 = c2 + A * xprod

      const y1 = round2(a1 * r1 * r1 + b1 * r1 + c1)
      const y2 = round2(a1 * r2 * r2 + b1 * r2 + c1)

      return { a1, b1, c1, a2, b2, c2, count, x1: r1, x2: r2, y1, y2 }
    }

    if (count === 1) {
      const a2 = rng.randomItemFromArray([1, -1])
      const a1 = a2 + rng.randomItemFromArray([-2, -1, 1, 2])
      const xs = rng.randomItemFromArray([-3, -2, -1, 0, 1, 2])

      const b2 = rng.randomIntBetween(-2, 2)
      const b1 = b2 - 2 * (a1 - a2) * xs

      const c2 = rng.randomIntBetween(-2, 2)
      const c1 = c2 + (a1 - a2) * xs * xs

      const ys = round2(a1 * xs * xs + b1 * xs + c1)

      return { a1, b1, c1, a2, b2, c2, count, x1: xs, x2: xs, y1: ys, y2: ys }
    }

    return {
      a1: 1,
      b1: 0,
      c1: 3,
      a2: 2,
      b2: 0,
      c2: -1,
      count,
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    }
  },

  originalData: {
    a1: 1,
    b1: -1,
    c1: -2,
    a2: -1,
    b2: 3,
    c2: 2,
    count: 2,
    x1: -1,
    x2: 2,
    y1: 0,
    y2: 0,
  },

  constraint({ data }) {
    return data.a1 !== data.a2
  },

  task({ data }) {
    const p1 = parabolaPoints(data.a1, data.b1, data.c1)
    const p2 = parabolaPoints(data.a2, data.b2, data.c2)
    const f1 = quadraticToLatex(data.a1, data.b1, data.c1)
    const f2 = quadraticToLatex(data.a2, data.b2, data.c2)

    return (
      <>
        <p>Berechnen Sie die Schnittpunkte der beiden Parabeln.</p>
        <InlineMath math={`p_1: y=${f1}`} />
        <br />
        <InlineMath math={`p_2: y=${f2}`} />

        <svg viewBox="0 0 328 328">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline points={p1} fill="none" stroke="black" strokeWidth="2" />
          <polyline points={p2} fill="none" stroke="black" strokeWidth="2" />
        </svg>
      </>
    )
  },

  solution({ data }) {
    const A = data.a1 - data.a2
    const B = data.b1 - data.b2
    const C = data.c1 - data.c2
    const D = B * B - 4 * A * C
    const f1 = quadraticToLatex(data.a1, data.b1, data.c1)
    const f2 = quadraticToLatex(data.a2, data.b2, data.c2)
    const fDiff = quadraticToLatex(A, B, C)

    return (
      <>
        <InlineMath math={`${f1}=${f2}`} />
        <br />
        <InlineMath math={`${fDiff}=0`} />
        <br />

        {data.count === 0 && (
          <>
            <InlineMath math={`D=${pp(D)}<0`} />
            <p>Es gibt keine reellen Schnittpunkte.</p>
          </>
        )}

        {data.count === 1 && (
          <>
            <InlineMath math={`D=${pp(D)}=0`} />
            <br />
            <InlineMath math={`x=${pp(data.x1)},\\quad y=${pp(data.y1)}`} />
            <p>
              <b>
                <InlineMath math={`S(${pp(data.x1)}\\mid${pp(data.y1)})`} />
              </b>
            </p>
          </>
        )}

        {data.count === 2 && (
          <>
            <InlineMath math={`D=${pp(D)}>0`} />
            <br />
            <InlineMath
              math={`x_1=${pp(data.x1)},\\quad x_2=${pp(data.x2)}`}
            />
            <br />
            <InlineMath
              math={`y_1=${pp(data.y1)},\\quad y_2=${pp(data.y2)}`}
            />
            <p>
              <b>
                <InlineMath
                  math={`S_1(${pp(data.x1)}\\mid${pp(
                    data.y1,
                  )}),\\quad S_2(${pp(data.x2)}\\mid${pp(data.y2)})`}
                />
              </b>
            </p>
          </>
        )}
      </>
    )
  },
}