// ======================================
// 5B — Scheitel S(h|k), Gerade g: y = m·x
// (Original: S(1|-5), g: y = -5x)
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3115 {
  h: number // Scheitel x
  k: number // Scheitel y
  m: number // Steigung der Ursprungsgeraden g
}

// KS-Mapping (wie gewohnt, 10er-Raster)
function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise3115: Exercise<DATA3115> = {
  title: 'Parabel (Scheitel) und Ursprungsgerade',
  source: '2023 Wahlteil Aufgabe 5B',
  useCalculator: true,
  duration: 12,
  points: 12,

  generator(rng) {
    // Scheitel leicht variieren, aber ≠(0|0); m negativ wie im Original
    const h = rng.randomItemFromArray([-2, -1, 1, 2])
    const k = rng.randomItemFromArray([-6, -5, -4, -3])
    const m = rng.randomItemFromArray([-5, -4, -3])
    return { h, k, m }
  },

  // Originaldaten exakt übernehmen
  originalData: { h: 1, k: -5, m: -5 },

  constraint({ data }) {
    const B = -2 * data.h
    const C = data.h * data.h + data.k
    const b = B - data.m // (x^2 + Bx + C = mx) ⇒ x^2 + (B - m)x + C = 0
    const c = C
    const D = b * b - 4 * 1 * c
    const x1 = (-b + Math.sqrt(D)) / 2
    const x2 = (-b - Math.sqrt(D)) / 2
    const y1 = data.m * x1
    const y2 = data.m * x2
    return (x1 * 2) % 1 === 0 && (x2 * 2) % 1 === 0
  },

  intro({ data }) {
    return (
      <p>
        Der Scheitelpunkt einer verschobenen Normalparabel{' '}
        <InlineMath math="p" /> liegt bei{' '}
        <InlineMath math={`S(${pp(data.h)}\\mid ${pp(data.k)})`} />.
      </p>
    )
  },

  tasks: [
    // (1) Zeichnen
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return <p>Zeichnen Sie die Parabel p in ein Koordinatensystem.</p>
      },
      solution({ data }) {
        // y = (x-h)^2 + k   (a=1)
        const xs: number[] = []
        for (let x = data.h - 6; x <= data.h + 6; x += 0.1)
          xs.push(+x.toFixed(1))
        const path = xs
          .map(x => `${toX(x)},${toY((x - data.h) * (x - data.h) + data.k)}`)
          .join(' ')
        return (
          <svg
            viewBox="0 0 328 328"
            width="328"
            height="328"
            className="border rounded"
          >
            <image
              href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
              width="328"
              height="328"
            />
            <polyline
              points={path}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <circle cx={toX(data.h)} cy={toY(data.k)} r="3" />
            <text x={toX(data.h) + 6} y={toY(data.k) - 6} fontSize={12}>
              S({pp(data.h)}|{pp(data.k)})
            </text>
          </svg>
        )
      },
    },

    // (2) Nachweis der Funktionsgleichung in Normalform
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        const B = -2 * data.h
        const C = data.h * data.h + data.k
        return (
          <p>
            Zeigen Sie, dass die Parabel <InlineMath math="p" /> durch die
            Gleichung{' '}
            <InlineMath
              math={`y=x^2${B === 1 ? '' : B === -1 ? '-' : pp(B, 'merge_op')}x${C != 0 ? pp(C, 'merge_op') : ''}`}
            />{' '}
            beschrieben werden kann.
          </p>
        )
      },
      solution({ data }) {
        // allgemein: y = (x-h)^2 + k  ⇒  y = x^2 - 2hx + (h^2+k)
        const B = -2 * data.h
        const C = data.h * data.h + data.k
        return (
          <>
            <p>Setze den Scheitel zuerst in die Scheitelform ein:</p>
            <BlockMath
              math={`y=(x${pp(-data.h, 'merge_op')})^2${pp(data.k, 'merge_op')}`}
            />
            <p>Löse die Klammer auf mithilfe der binomischen Formel:</p>
            <BlockMath
              math={`y=(x${pp(-data.h, 'merge_op')})^2${pp(data.k, 'merge_op')}`}
            />
            <BlockMath
              math={`y=x²${pp(-data.h * 2, 'merge_op')}x${pp(data.h * data.h, 'merge_op')}${pp(data.k, 'merge_op')}`}
            />
            <p>Fasse zusammen:</p>
            <BlockMath
              math={`\\Rightarrow\\; y=x^2${pp(B, 'merge_op')}x${pp(C, 'merge_op')}`}
            />
            {/* Hinweis auf Originalzahlen automatisch enthalten */}
          </>
        )
      },
    },

    // (3) Schnittpunkte mit g: y = m x
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            Berechnen Sie die Koordinaten der Schnittpunkte von{' '}
            <InlineMath math="p" /> und der Geraden <InlineMath math={`g`} />{' '}
            mit
            <InlineMath math={`\\;y=${pp(data.m)}x`} />.
          </p>
        )
      },
      solution({ data }) {
        // setze y = mx in y = x^2 + Bx + C
        const B = -2 * data.h
        const C = data.h * data.h + data.k
        const b = B - data.m // (x^2 + Bx + C = mx) ⇒ x^2 + (B - m)x + C = 0
        const c = C
        const D = b * b - 4 * 1 * c
        const x1 = (-b + Math.sqrt(D)) / 2
        const x2 = (-b - Math.sqrt(D)) / 2
        const y1 = data.m * x1
        const y2 = data.m * x2

        return (
          <>
            <p>Setze die Terme gleich:</p>
            <BlockMath math={`y_g=y_p`} />
            <BlockMath
              math={`${pp(data.m)}x=x^2${B === 1 ? '' : B === -1 ? '-' : pp(B, 'merge_op')}x${C != 0 ? pp(C, 'merge_op') : ''}`}
            />
            <BlockMath
              math={`0=x^2${B === 1 ? '' : B === -1 ? '-' : pp(B - data.m, 'merge_op')}x${C != 0 ? pp(C, 'merge_op') : ''}`}
            />
            <p>Löse die Gleichung:</p>
            <BlockMath math={`x_1 = ${pp(x1)}`} />
            <BlockMath math={`x_2 = ${pp(x2)}`} />
            <p>Berechne die y-Koordinaten mit der Geradengleichung:</p>
            <BlockMath
              math={`y_1 = ${pp(data.m)} \\cdot ${pp(x1, 'embrace_neg')} = ${pp(y1)}`}
            />
            <BlockMath
              math={`y_2 = ${pp(data.m)} \\cdot ${pp(x2, 'embrace_neg')} = ${pp(y2)}`}
            />
            <p>Die Schnittpunkte sind also:</p>
            <BlockMath
              math={`P_1(${pp(x1)}\\mid ${pp(y1)}),\\quad P_2(${pp(x2)}\\mid ${pp(y2)})`}
            />
          </>
        )
      },
    },
  ],
}
