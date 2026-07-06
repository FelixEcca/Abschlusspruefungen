import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Count = 0 | 1 | 2

interface DATA {
  a: number
  b: number
  c: number
  m: number
  n: number
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
  for (let x = -8; x <= 8; x += 0.1) {
    const y = a * x * x + b * x + c
    pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

function linePoints(m: number, n: number) {
  const pts: string[] = []
  for (let x = -8; x <= 8; x += 0.1) {
    const y = m * x + n
    pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

export const exercise4924: Exercise<DATA> = {
  title: 'Gerade und Parabel',
  source: 'Training',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const count = rng.randomItemFromArray<Count>([1, 2])

    if (count === 2) {
      const a = rng.randomItemFromArray([1, -1])
      const r1 = rng.randomItemFromArray([-3, -2, -1, 0, 1])
      let r2 = rng.randomItemFromArray([0, 1, 2, 3, 4])
      while (r2 === r1) r2 = rng.randomItemFromArray([0, 1, 2, 3, 4])

      const m = rng.randomItemFromArray([-2, -1, 0, 1, 2])
      const n = rng.randomIntBetween(-3, 3)

      const A = a
      const xsum = r1 + r2
      const xprod = r1 * r2
      const b = m - A * xsum
      const c = n + A * xprod

      const y1 = round2(m * r1 + n)
      const y2 = round2(m * r2 + n)

      return { a, b, c, m, n, count, x1: r1, x2: r2, y1, y2 }
    }

    if (count === 1) {
      const a = rng.randomItemFromArray([1, -1])
      const xs = rng.randomItemFromArray([-3, -2, -1, 0, 1, 2])
      const m = rng.randomItemFromArray([-2, -1, 0, 1, 2])
      const n = rng.randomIntBetween(-3, 3)

      const b = m - 2 * a * xs
      const c = m * xs + n - a * xs * xs - b * xs
      const ys = round2(m * xs + n)

      return { a, b, c, m, n, count, x1: xs, x2: xs, y1: ys, y2: ys }
    }

    const a = 1
    const b = 0
    const c = 3
    const m = 0
    const n = -2
    return { a, b, c, m, n, count, x1: 0, x2: 0, y1: 0, y2: 0 }
  },

  originalData: {
    a: 1,
    b: -2,
    c: 4,
    m: 2,
    n: 1,
    count: 2,
    x1: 1,
    x2: 3,
    y1: 3,
    y2: 7,
  },

  constraint({ data }) {
    const B = data.b - data.m
    const C = data.c - data.n
    return (
      data.a !== 0 &&
      data.b !== 0 &&
      data.c !== 0 &&
      data.m !== 0 &&
      data.n !== 0 &&
      B != 0 &&
      C != 0
    )
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Schnittpunkte der Gerade mit der Parabel.</p>
        <InlineMath
          math={`p: y=${pp(data.a)}x^2${pp(data.b, 'merge_op')}x${pp(
            data.c,
            'merge_op',
          )}`}
        />
        <br />
        <InlineMath math={`g: y=${pp(data.m)}x${pp(data.n, 'merge_op')}`} />
      </>
    )
  },

  solution({ data }) {
    const A = data.a
    const B = data.b - data.m
    const C = data.c - data.n

    const pPts = parabolaPoints(data.a, data.b, data.c)
    const gPts = linePoints(data.m, data.n)

    return (
      <>
        <p>
          Setze die beiden Terme gleich, die Parabel links und die Gerade
          rechts.
        </p>
        <InlineMath
          math={`${pp(data.a)}x^2${pp(data.b, 'merge_op')}x${pp(
            data.c,
            'merge_op',
          )}=${pp(data.m)}x${pp(data.n, 'merge_op')}`}
        />
        <p>Stelle die Gleichung um, sodass rechts 0 steht.</p>
        <InlineMath
          math={`${pp(A)}x^2${pp(B, 'merge_op')}x${pp(C, 'merge_op')}=0`}
        />

        <p>Nun wird die abc-Formel angewendet.</p>
        <InlineMath math={`x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}`} />
        <br />
        <InlineMath
          math={`x_{1,2}=\\frac{${pp(-B)}\\pm\\sqrt{${pp(B, 'embrace_neg')}^2-4\\cdot${pp(
            A,
            'embrace_neg',
          )}\\cdot${pp(C, 'embrace_neg')}}}{2\\cdot${pp(A, 'embrace_neg')}}`}
        />

        {data.count === 0 && (
          <>
            <p>
              Es gibt keine Schnittpunkte, weil der Wert unter der Wurzel
              negativ ist.
            </p>
          </>
        )}

        {data.count === 1 && (
          <>
            <br />
            <InlineMath math={`x=${pp(data.x1)}`} />
            <p>
              Setze den Wert in eine der Gleichungen ein und berechne y.
            </p>{' '}
            <InlineMath
              math={`y=${pp(data.m)}\\cdot${pp(data.x1)}${pp(data.n, 'merge_op')}=${pp(data.y1)}`}
            />
            <p>
              <b>
                <InlineMath math={`S(${pp(data.x1)}\\mid${pp(data.y1)})`} />
              </b>
            </p>
          </>
        )}

        {data.count === 2 && (
          <>
            <br />
            <InlineMath
              math={`x_1=${pp(data.x1)},\\quad x_2=${pp(data.x2)}`}
            />{' '}
            <p>Setze die Werte in einer der Gleichungen ein und berechne y.</p>
            <InlineMath
              math={`y_1=${pp(data.m)}\\cdot${pp(data.x1, 'embrace_neg')}${pp(
                data.n,
                'merge_op',
              )}=${pp(data.y1)}`}
            />
            <br />
            <InlineMath
              math={`y_2=${pp(data.m)}\\cdot${pp(data.x2, 'embrace_neg')}${pp(
                data.n,
                'merge_op',
              )}=${pp(data.y2)}`}
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

        <svg viewBox="0 0 328 328">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline points={pPts} fill="none" stroke="black" strokeWidth="2" />
          <polyline points={gPts} fill="none" stroke="black" strokeWidth="2" />

          {data.count >= 1 && (
            <circle cx={toX(data.x1)} cy={toY(data.y1)} r="3" fill="black" />
          )}
          {data.count === 2 && (
            <circle cx={toX(data.x2)} cy={toY(data.y2)} r="3" fill="black" />
          )}
        </svg>
      </>
    )
  },
}
