// src/content/exercises/3005.tsx
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { polyToLatex } from '@/helper/pp-latex'

/* ---------- kleine LaTeX-Helfer ---------- */
const num = (n: number) => {
  // 1 statt 1.0 usw.
  if (Number.isInteger(n)) return String(n)
  // KaTeX versteht Dezimalpunkt
  return String(Number(n.toFixed(4)).valueOf())
}
const sign = (n: number) => (n >= 0 ? '+' : '−') // echtes Minus
const withSign = (n: number) => `${sign(n)} ${num(Math.abs(n))}`
const maybeCoeff = (k: number) => (k === 1 ? '' : k === -1 ? '−' : num(k))

interface DATA {
  neg: boolean
  y_offset: number
  m: number
  b: number
}

export const exercise3005: Exercise<DATA> = {
  title: 'Funktionen',
  source: '2021 Wahlteil Aufgabe 2A',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    return {
      neg: rng.randomBoolean(),
      y_offset: rng.randomIntBetween(-5, 5),
      m: rng.randomItemFromArray([-1, 1, 0.5, 2, -0.5, -2]),
      b: rng.randomIntBetween(-5, 5),
    }
  },

  originalData: { neg: true, y_offset: 8, m: 1, b: 6 },

  constraint({ data }) {
    const p = data.neg ? data.m : -data.m
    const q = data.neg ? -data.y_offset + data.b : data.y_offset - data.b
    const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    return (
      data.y_offset !== 0 &&
      data.b !== data.y_offset &&
      data.b !== 0 &&
      p % 1 == 0 &&
      q % 1 == 0 &&
      x1 % 1 == 0 &&
      x2 % 1 == 0 &&
      x1 !== x2
    )
  },

  intro({ data }) {
    const pLatex = data.neg
      ? `p:\\;y = -x^{2} ${withSign(data.y_offset)}`
      : `p:\\;y = x^{2} ${withSign(data.y_offset)}`
    const gLatex = `g:\\;y = ${polyToLatex([
      [data.m, 'x', 1],
      [data.b, 'x', 0],
    ])}`

    return (
      <>
        <p>
          Gegeben sind die Parabel <InlineMath math="p" /> und die Gerade{' '}
          <InlineMath math="g" /> durch ihre Gleichungen:
        </p>

        <BlockMath math={pLatex} />
        <BlockMath math={gLatex} />
      </>
    )
  },

  tasks: [
    /* a) Scheitelpunkt */
    {
      points: 42,
      task() {
        return (
          <p>
            Geben Sie die Koordinaten des Scheitelpunkts von{' '}
            <InlineMath math="p" /> an.
          </p>
        )
      },
      solution({ data }) {
        const a = data.neg ? -1 : 1
        const sLatex = `S\\,(0\\mid ${num(data.y_offset)})`
        return (
          <>
            <BlockMath
              math={`p:\\; y = ${a === -1 ? '-' : ''}x^{2} ${withSign(
                data.y_offset,
              )}`}
            />

            <p>
              Der Scheitelpunkt lautet:&nbsp;
              <InlineMath math={sLatex} />
            </p>
          </>
        )
      },
    },

    /* b) Zeichnung */
    {
      points: 42,
      task() {
        return (
          <p>
            Zeichnen Sie <InlineMath math="p" /> und <InlineMath math="g" /> in
            ein Koordinatensystem.
          </p>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        function parabolaPoints(a: number, b: number, c: number, step: number) {
          let pts = ''
          for (let x = -9; x <= 9; x += step) {
            const y = a * (x - b) * (x - b) + c
            pts += `${toX(x)},${toY(y)} `
          }
          return pts.trim()
        }
        function linearPoints(m: number, b: number, step: number) {
          let pts = ''
          for (let x = -9; x <= 9; x += step) {
            const y = m * x + b
            pts += `${toX(x)},${toY(y)} `
          }
          return pts.trim()
        }

        const linePts = linearPoints(data.m, data.b, 0.1)
        const parabPts = parabolaPoints(
          data.neg ? -1 : 1,
          0,
          data.y_offset,
          0.1,
        )

        return (
          <>
            <p>Eine mögliche Skizze:</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={linePts}
                stroke="darkgreen"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={parabPts}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </>
        )
      },
    },

    /* c) Schnittpunkte */
    {
      points: 42,
      task() {
        return (
          <p>
            Berechnen Sie die Koordinaten der Schnittpunkte von{' '}
            <InlineMath math="p" /> und <InlineMath math="g" />.
          </p>
        )
      },
      solution({ data }) {
        // a = +1 (nach oben) oder -1 (nach unten)
        const a = data.neg ? -1 : 1

        // Auf Normalform x^2 + p x + q = 0 bringen
        const p = data.neg ? data.m : -data.m
        const q = data.neg ? -data.y_offset + data.b : data.y_offset - data.b
        const disc = (p / 2) * (p / 2) - q
        const x1 = -p / 2 + Math.sqrt(disc)
        const x2 = -p / 2 - Math.sqrt(disc)
        const y1 = data.m * x1 + data.b
        const y2 = data.m * x2 + data.b

        // zwei getrennte aligned-Umgebungen für die Umstellung
        const alignPlus = String.raw`
\begin{aligned}
\text{Setze } y_p = y_g:\quad
& x^{2} ${withSign(data.y_offset)} = ${polyToLatex([
          [data.m, 'x', 1],
          [data.b, 'x', 0],
        ])}\\[4pt]
\Rightarrow\;& 0 = x^{2} ${withSign(-data.m)}x ${withSign(data.y_offset - data.b)}
\end{aligned}`

        const alignMinus = String.raw`
\begin{aligned}
\text{Setze } y_p = y_g:\quad
& -x^{2} ${withSign(data.y_offset)} = ${polyToLatex([
          [data.m, 'x', 1],
          [data.b, 'x', 0],
        ])}\\[4pt]
\Rightarrow\;& 0 = x^{2} ${withSign(data.m)}x ${withSign(-data.y_offset + data.b)}
\end{aligned}`

        const alignPQ = String.raw`
\begin{aligned}
x_{1,2} &= -\frac{p}{2}\ \pm\ \sqrt{\left(\frac{p}{2}\right)^2 - q}\\[2pt]
&= -\frac{${num(p)}}{2}\ \pm\ \sqrt{\left(\frac{${num(p)}}{2}\right)^2 - (${num(q)})}\\[2pt]
&= ${num(-p / 2)}\ \pm\ \sqrt{${num(disc)}}\\[2pt]
x_1&= ${num(x1)}\\
x_2&= ${num(x2)}
\end{aligned}`

        const alignY = String.raw`
\begin{aligned}
y_1 &= ${maybeCoeff(data.m)}x_1 ${withSign(data.b)} = ${num(y1)}\\
y_2 &= ${maybeCoeff(data.m)}x_2 ${withSign(data.b)} = ${num(y2)}
\end{aligned}`

        return (
          <>
            <p>Gleichsetzen und auf die Normalform bringen:</p>
            <BlockMath math={a === 1 ? alignPlus : alignMinus} />

            <p>Lösen mit der pq-Formel:</p>
            <BlockMath math={alignPQ} />

            <p>y-Werte über die Geradengleichung:</p>
            <BlockMath math={alignY} />

            <p>
              <strong>Damit sind die Schnittpunkte:</strong>
            </p>
            <BlockMath
              math={`S_1\\,(${num(x1)}\\mid ${num(y1)})\\quad\\text{und}\\quad S_2\\,(${num(x2)}\\mid ${num(y2)})`}
            />
          </>
        )
      },
    },
  ],
}
