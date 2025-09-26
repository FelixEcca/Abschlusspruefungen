// ======================================
// 4A — Gerade g: y = -x + 2, Parabel p: y = 2x^2 - 1
// (Randomisiert: Parabel über Scheitelpunkt S(h|k))
// ======================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3111 {
  // Parabel in Scheitelform: y = a (x - h)^2 + k
  a: number
  h: number
  k: number
  // Gerade: y = m x + d
  m: number
  d: number
}

// KS-Mapping (10er-Raster, Bild 328×328)
function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

export const exercise3111: Exercise<DATA3111> = {
  title: 'Gerade und Parabel',
  source: '2023 Wahlteil Aufgabe 4A',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    // „nette“ Werte: Scheitel NICHT im Ursprung
    const a = rng.randomItemFromArray([1])
    const h = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3, 4, 5, 6])
    const k = rng.randomItemFromArray([-3, -2, 1, 2, 3, 4, 5, 6, -4, -1])
    const m = rng.randomItemFromArray([-3, -2, 1, 2, 3])
    const d = rng.randomIntBetween(1, 3)

    return { a, h, k, m, d }
  },

  // Original (Scan): g: y = -x + 2 ; p: y = 2x^2 − 1  ⇒ a=2, h=0, k=-1
  originalData: { a: 2, h: 0, k: -1, m: -1, d: 2 },

  constraint({ data }) {
    // Reelle Schnittpunkte ermöglichen (nicht zwingend, aber wünschenswert)
    // Diskriminante von a(x-h)^2 + k = m x + d
    const A = data.a
    const B = -2 * data.a * data.h - data.m
    const C = data.a * data.h * data.h + data.k - data.d
    const D = B * B - 4 * A * C
    const x1 = (-B + Math.sqrt(D)) / 2
    const x2 = (-B - Math.sqrt(D)) / 2
    return (
      D > 0 &&
      data.k * data.k + data.h != 0 &&
      (x1 * 2) % 1 === 0 &&
      (x2 * 2) % 1 === 0
    )
  },

  intro({ data }) {
    return (
      <p>
        Gegeben ist die Gerade <InlineMath math="g" /> mit<br></br>{' '}
        <InlineMath
          math={`y=${data.m == 1 ? '' : pp(data.m)}x${pp(data.d, 'merge_op')}`}
        />{' '}
        und die Parabel <InlineMath math="p" /> mit<br></br>{' '}
        <InlineMath
          math={`y=${data.a != 1 ? pp(data.a) : ''}x²${pp(-2 * data.a * data.h, 'merge_op')}x${pp(
            data.k + data.a * data.h * data.h,
            'merge_op',
          )}`}
        />
        .
      </p>
    )
  },

  tasks: [
    // (1) Scheitelpunkt
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Geben Sie die Koordinaten des Scheitelpunktes der Parabel{' '}
            <InlineMath math="p" /> an.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Bestimme die Scheitelpunktform mit quadratischer Ergänzung:</p>
            <BlockMath
              math={`y = x^{2}${pp(-2 * data.a * data.h, 'merge_op')}x + \\left(\\frac{${pp(Math.abs(-2 * data.a * data.h))}}{2}\\right)^2${pp(
                data.k + data.a * data.h * data.h,
                'merge_op',
              )}- \\left(\\frac{${pp(Math.abs(-2 * data.a * data.h))}}{2}\\right)^2`}
            />
            <BlockMath
              math={`y = \\left(x ${-2 * data.a * data.h > 0 ? '+' : '-'}\\frac{${pp(Math.abs(-2 * data.a * data.h))}}{2}\\right)^{2} ${pp(data.k + data.a * data.h * data.h - ((-2 * data.a * data.h) / 2) * ((-2 * data.a * data.h) / 2), 'merge_op')}`}
            />
            <BlockMath
              math={`y = (x ${pp((-2 * data.a * data.h) / 2, 'merge_op')})^{2} ${pp(data.k + data.a * data.h * data.h - ((-2 * data.a * data.h) / 2) * ((-2 * data.a * data.h) / 2), 'merge_op')}`}
            />
            <BlockMath
              math={`\\Rightarrow\\; S\\,=\\,(${pp(data.h)}\\mid ${pp(data.k)})`}
            />
            <BlockMath math={`S\\,=\\,(${pp(data.h)}\\mid ${pp(data.k)})`} />
          </>
        )
      },
    },

    // (2) Skizze
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Zeichnen Sie die Gerade <InlineMath math="g" /> und die Parabel{' '}
            <InlineMath math="p" /> in ein Koordinatensystem.
          </p>
        )
      },
      solution({ data }) {
        // Parabelpfad
        const xs: number[] = []
        for (let x = data.h - 6; x <= data.h + 6; x += 0.1)
          xs.push(+x.toFixed(1))
        const pathP = xs
          .map(x => `${toX(x)},${toY(data.a * (x - data.h) ** 2 + data.k)}`)
          .join(' ')
        // Gerade
        const xs2: number[] = []
        for (let x = -8; x <= 8; x += 0.1) xs2.push(+x.toFixed(1))
        const pathG = xs2
          .map(x => `${toX(x)},${toY(data.m * x + data.d)}`)
          .join(' ')
        return (
          <svg viewBox="0 0 328 328" width="328" height="328">
            <image
              href="/content/BW_2BFS/ksgroßmitachsen.png"
              width="328"
              height="328"
            />
            <polyline
              points={pathP}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <polyline
              points={pathG}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <circle cx={toX(data.h)} cy={toY(data.k)} r="3" />
            <text x={toX(data.h) + 6} y={toY(data.k) - 6} fontSize={12}>
              S
            </text>
            <text x={toX(3)} y={toY(data.m * 3 + data.d) - 6} fontSize={12}>
              g
            </text>
            <text
              x={toX(data.h + 3)}
              y={toY(data.a * 9 + data.k) - 6}
              fontSize={12}
            >
              p
            </text>
          </svg>
        )
      },
    },

    // (3) Schnittpunkte berechnen
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie die Koordinaten der Schnittpunkte der Gerade{' '}
            <InlineMath math="g" /> mit der Parabel <InlineMath math="p" />.
          </p>
        )
      },
      solution({ data }) {
        // Gleichsetzen: a(x-h)^2 + k = m x + d
        // ⇒ a x^2 + (-2ah - m)x + (a h^2 + k - d) = 0

        const B = -2 * data.a * data.h - data.m
        const C = data.a * data.h * data.h + data.k - data.d
        const D = B * B - 4 * C
        const x1 = (-B + Math.sqrt(D)) / 2
        const x2 = (-B - Math.sqrt(D)) / 2
        const y1 = data.m * x1 + data.d
        const y2 = data.m * x2 + data.d

        return (
          <>
            <p>Setze die Terme gleich:</p>
            <div className="space-y-2">
              <BlockMath
                math={`${data.a != 1 ? pp(data.a) : ''}x²${pp(-2 * data.a * data.h, 'merge_op')}x${pp(
                  data.k + data.a * data.h * data.h,
                  'merge_op',
                )}=${pp(data.m)}x${pp(data.d, 'merge_op')}`}
              />
              <BlockMath
                math={`x^2${pp(B, 'merge_op')}x${pp(C, 'merge_op')}=0`}
              />
              <BlockMath
                math={`x_{1,2}=-\\frac{${pp(B)}}{2}\\pm\\sqrt{\\left(\\frac{${pp(B)}}{2}\\right)^2-${pp(C)}}`}
              />
              <BlockMath
                math={`x_{1,2}=-\\frac{${pp(B)}}{2}\\pm\\sqrt{${pp((B * B) / 4 - C)}}`}
              />
              <BlockMath math={`x_1=${pp(x1)},\\quad x_2=${pp(x2)}`} />
              <p>Berechne die y-Werte mithilfe der Geradengleichung:</p>
              <BlockMath
                math={`y_1=${pp(data.m)}\\cdot ${pp(x1)}${pp(
                  data.d,
                  'merge_op',
                )}=${pp(y1)},\\quad y_2=${pp(data.m)}\\cdot ${pp(x2)}${pp(
                  data.d,
                  'merge_op',
                )}=${pp(y2)}`}
              />
              <BlockMath
                math={`\\Rightarrow\\; S_1(${pp(x1)}\\mid ${pp(y1)}),\\; S_2(${pp(
                  x2,
                )}\\mid ${pp(y2)})`}
              />
            </div>
          </>
        )
      },
    },
  ],
}
