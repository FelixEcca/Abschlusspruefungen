// =====================================
// exercise4923.tsx
// Schnittpunkte mit der x-Achse
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  x1: number
  x2: number
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

function buildPolyline(a: number, b: number, c: number) {
  const pts: string[] = []
  for (let x = -8; x <= 8; x += 0.1) {
    const y = a * x * x + b * x + c
    pts.push(`${toX(x)},${toY(y)}`)
  }
  return pts.join(' ')
}

export const exercise4923: Exercise<DATA> = {
  title: 'Nullstellen berechnen',
  source: 'Training',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const a = rng.randomItemFromArray([1, 2, -1, -2])
    const r1 = rng.randomItemFromArray([-4, -3, -2, -1, 0, 1, 2])
    let r2 = rng.randomItemFromArray([-4, -3, -2, -1, 0, 1, 2, 3, 4])
    while (r2 === r1)
      r2 = rng.randomItemFromArray([-4, -3, -2, -1, 0, 1, 2, 3, 4])
    const b = -a * (r1 + r2)
    const c = a * r1 * r2
    const x1 = Math.min(r1, r2)
    const x2 = Math.max(r1, r2)
    return { a, b, c, x1, x2 }
  },

  originalData: {
    a: 1,
    b: 1,
    c: -6,
    x1: -3,
    x2: 2,
  },

  constraint({ data }) {
    return data.a !== 0 && data.b !== 0 && data.c !== 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Berechnen Sie die Schnittpunkte der Parabel mit der x-Achse. Verwenden
          Sie die abc-Formel:
        </p>
        <InlineMath math={`x_{1,2}=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}`} />
        <br />
        <InlineMath
          math={`y=${pp(data.a)}x^2${pp(data.b, 'merge_op')}x${pp(
            data.c,
            'merge_op',
          )}`}
        />
      </>
    )
  },

  solution({ data }) {
    const pts = buildPolyline(data.a, data.b, data.c)
    const D = data.b * data.b - 4 * data.a * data.c

    return (
      <>
        <InlineMath
          math={`0=${pp(data.a)}x^2${pp(data.b, 'merge_op')}x${pp(
            data.c,
            'merge_op',
          )}`}
        />
        <br />
        <InlineMath
          math={`x_{1,2}=\\frac{-${pp(data.b, 'embrace_neg')}\\pm\\sqrt{${pp(data.b, 'embrace_neg')}^2-4\\cdot${pp(
            data.a,
            'embrace_neg',
          )}\\cdot${pp(data.c, 'embrace_neg')}}}{2\\cdot${pp(data.a, 'embrace_neg')}}`}
        />
        <br />
        <InlineMath
          math={`x_{1,2}=\\frac{${pp(-data.b)}\\pm\\sqrt{${pp(D)}}}{${pp(
            2 * data.a,
          )}}`}
        />
        <br />
        <InlineMath
          math={`x_1=${pp(round2(data.x1))},\\quad x_2=${pp(round2(data.x2))}`}
        />
        <p>
          <b>
            <InlineMath
              math={`N_1(${pp(data.x1)}\\mid0),\\quad N_2(${pp(data.x2)}\\mid0)`}
            />
          </b>
        </p>
        <svg viewBox="0 0 328 328">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline points={pts} fill="none" stroke="black" strokeWidth="2" />
        </svg>
      </>
    )
  },
}
