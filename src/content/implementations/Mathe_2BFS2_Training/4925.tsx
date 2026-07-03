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

function parabolaValue(a: number, b: number, c: number, x: number) {
  return a * x * x + b * x + c
}

function parabolaPoints(a: number, b: number, c: number) {
  const pts: string[] = []
  for (let x = -8; x <= 8; x += 0.1) {
    const y = parabolaValue(a, b, c, x)
    pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

export const exercise4925: Exercise<DATA> = {
  title: 'Zwei Parabeln',
  source: 'Training',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const count = rng.randomItemFromArray<Count>([1, 2])

    if (count === 2) {
      const a2 = rng.randomItemFromArray([-2, -1, 1, 2])
      let a1 = rng.randomItemFromArray([-2, -1, 1, 2])
      while (a1 === a2) a1 = rng.randomItemFromArray([-2, -1, 1, 2])

      const r1 = rng.randomItemFromArray([-3, -2, -1, 0, 1])
      let r2 = rng.randomItemFromArray([0, 1, 2, 3, 4])
      while (r2 === r1) r2 = rng.randomItemFromArray([0, 1, 2, 3, 4])

      const A = a1 - a2
      const b2 = rng.randomIntBetween(-2, 2)
      const c2 = rng.randomIntBetween(-2, 2)

      const b1 = b2 - A * (r1 + r2)
      const c1 = c2 + A * r1 * r2

      const x1 = Math.min(r1, r2)
      const x2 = Math.max(r1, r2)
      const y1 = round2(parabolaValue(a1, b1, c1, x1))
      const y2 = round2(parabolaValue(a1, b1, c1, x2))

      return { a1, b1, c1, a2, b2, c2, count, x1, x2, y1, y2 }
    }

    if (count === 1) {
      const a2 = rng.randomItemFromArray([-2, -1, 1, 2])
      let a1 = rng.randomItemFromArray([-2, -1, 1, 2])
      while (a1 === a2) a1 = rng.randomItemFromArray([-2, -1, 1, 2])

      const xs = rng.randomItemFromArray([-3, -2, -1, 0, 1, 2, 3])
      const A = a1 - a2

      const b2 = rng.randomIntBetween(-2, 2)
      const c2 = rng.randomIntBetween(-2, 2)

      const b1 = b2 - 2 * A * xs
      const c1 = c2 + A * xs * xs

      const ys = round2(parabolaValue(a1, b1, c1, xs))

      return { a1, b1, c1, a2, b2, c2, count, x1: xs, x2: xs, y1: ys, y2: ys }
    }

    // keine Schnittpunkte
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
    b1: -2,
    c1: 4,
    a2: -1,
    b2: 2,
    c2: 0,
    count: 2,
    x1: 1,
    x2: 2,
    y1: 3,
    y2: 4,
  },

  constraint({ data }) {
    const A = data.a1 - data.a2
    const B = data.b1 - data.b2
    const C = data.c1 - data.c2
    return (
      data.a1 !== data.a2 &&
      data.a1 !== 0 &&
      data.a2 !== 0 &&
      data.b1 != 0 &&
      data.b2 != 0 &&
      data.c1 != 0 &&
      data.c2 != 0 &&
      A != 0 &&
      B != 0 &&
      C != 0
    )
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die Schnittpunkte der beiden Parabeln.</p>
        <InlineMath
          math={`p_1: y=${pp(data.a1)}x^2${pp(data.b1, 'merge_op')}x${pp(
            data.c1,
            'merge_op',
          )}`}
        />
        <br />
        <InlineMath
          math={`p_2: y=${pp(data.a2)}x^2${pp(data.b2, 'merge_op')}x${pp(
            data.c2,
            'merge_op',
          )}`}
        />
      </>
    )
  },

  solution({ data }) {
    const A = data.a1 - data.a2
    const B = data.b1 - data.b2
    const C = data.c1 - data.c2

    const p1 = parabolaPoints(data.a1, data.b1, data.c1)
    const p2 = parabolaPoints(data.a2, data.b2, data.c2)

    return (
      <>
        <p>
          Setze die beiden Terme gleich, p<sub>1</sub> links und p<sub>2</sub>{' '}
          rechts.
        </p>
        <InlineMath
          math={`${pp(data.a1)}x^2${pp(data.b1, 'merge_op')}x${pp(
            data.c1,
            'merge_op',
          )}=${pp(data.a2)}x^2${pp(data.b2, 'merge_op')}x${pp(
            data.c2,
            'merge_op',
          )}`}
        />
        <p>Stelle die Gleichung so um, dass rechts 0 steht.</p>
        <InlineMath
          math={`${pp(A)}x^2${pp(B, 'merge_op')}x${pp(C, 'merge_op')}=0`}
        />
        <p>Bestimme a,b und c und setze sie in die Formel ein.</p>
        <InlineMath math={`x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}`} />
        <br />
        <InlineMath
          math={`x_{1,2}=\\frac{${pp(-B)}\\pm\\sqrt{${pp(B, 'embrace_neg')}^2-4\\cdot${pp(
            A,
            'embrace_neg',
          )}\\cdot${pp(C, 'embrace_neg')}}}{2\\cdot${pp(A, 'embrace_neg')}}`}
        />

        {data.count === 0 && (
          <p>
            Es gibt keine Schnittpunkte, weil der Wert unter der Wurzel negativ
            ist.
          </p>
        )}

        {data.count === 1 && (
          <>
            <p>Die einzige Lösung ist:</p>
            <InlineMath math={`x=${pp(data.x1)}`} />
            <p>Setze x in eine der Gleichungen ein und berechne y:</p>
            <InlineMath math={`y=${pp(data.y1)}`} />
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
            <InlineMath math={`x_1=${pp(data.x1)},\\quad x_2=${pp(data.x2)}`} />
            <br />
            <InlineMath math={`y_1=${pp(data.y1)},\\quad y_2=${pp(data.y2)}`} />
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
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline points={p1} fill="none" stroke="black" strokeWidth="2" />
          <polyline points={p2} fill="none" stroke="black" strokeWidth="2" />

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
