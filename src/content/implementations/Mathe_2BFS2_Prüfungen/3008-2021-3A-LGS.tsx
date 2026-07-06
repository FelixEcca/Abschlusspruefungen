import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number
  order: number[]
  faktor: number
}

function fracLatex(x: number) {
  if (Number.isInteger(x)) return `${x}`
  const sign = x < 0 ? '-' : ''
  const abs = Math.abs(x)

  // einfache Brüche für diese Aufgabe
  const rounded = Math.round(abs * 1000) / 1000
  for (let den = 2; den <= 12; den++) {
    const num = rounded * den
    if (Math.abs(num - Math.round(num)) < 1e-9) {
      return `${sign}\\dfrac{${Math.round(num)}}{${den}}`
    }
  }

  return `${x}`.replace('.', '{,}')
}

export const exercise3008: Exercise<DATA> = {
  title: 'LGS',
  source: '2021 Wahlteil Aufgabe 3A',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      x: rng.randomIntBetween(-6, 6),
      y: rng.randomIntBetween(-6, 6),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),
      order: rng.shuffleArray([0, 1, 2]),
      faktor: rng.randomIntBetween(2, 4),
    }
  },
  originalData: {
    x: 2.5,
    y: 2 / 3,
    a: 3,
    b: 2,
    d: 4,
    faktor: 2,
    order: [0, 1, 2],
  },
  constraint({ data }) {
    const c = data.b * data.x + data.a * data.y
    const e = data.d * data.x - data.faktor * data.a * data.y
    return Math.abs(e) < 30 && Math.abs(c) < 30
  },
  intro({ data }) {
    const c = data.b * data.x + data.a * data.y
    const e = data.d * data.x - data.faktor * data.a * data.y

    const b = data.b
    const a = data.a
    const d = data.d
    const k = data.faktor

    return (
      <>
        <p>Gegeben ist das folgende lineare Gleichungssystem:</p>
        <BlockMath
          math={String.raw`
\begin{aligned}
\text{(I)}\quad & ${b}\,x \;+\; ${a}\,y \;=\; ${pp(c)}\\
\text{(II)}\quad & ${d}\,x \;-\; ${k * a}\,y \;=\; ${pp(e)}
\end{aligned}
`}
        />
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
            <p>Bestimmen Sie die Lösung des linearen Gleichungssystems.</p>
          </>
        )
      },
      solution({ data }) {
        const b = data.b
        const a = data.a
        const d = data.d
        const k = data.faktor

        const c = b * data.x + a * data.y
        const e = d * data.x - k * a * data.y

        const lhsX = k * b + d
        const rhs = k * c + e

        return (
          <>
            <p>
              Addiere{' '}
              <InlineMath math={`${k}\\cdot \\text{(I)} + \\text{(II)}`} />:
            </p>

            <BlockMath
              math={String.raw`
\begin{aligned}
${k}\cdot\text{(I)}&:\quad ${k * b}\,x \;+\; ${k * a}\,y \;=\; ${pp(k * c)}\\
\text{(II)}&:\quad ${d}\,x \;-\; ${k * a}\,y \;=\; ${pp(e)}\\[4pt]
\hline
${k * b + d}\,x \;&=\; ${pp(k * c)} \;+\; ${pp(e, 'embrace_neg')}
\end{aligned}
`}
            />

            <BlockMath
              math={String.raw`
x \;=\; \frac{${pp(rhs)}}{${lhsX}} \;=\; ${fracLatex(data.x)}
`}
            />

            <p>
              Einsetzen in (I) zur Bestimmung von <InlineMath math={'y'} />:
            </p>

            <BlockMath
              math={String.raw`
\begin{aligned}
${b}\cdot ${fracLatex(data.x)} \;+\; ${a}\,y &= ${pp(c)}\\
${a}\,y &= ${pp(c)} \;-\; ${fracLatex(b * data.x)}\\
y &= \dfrac{${fracLatex(c - b * data.x)}}{${a}} \;=\; ${fracLatex(data.y)}
\end{aligned}
`}
            />

            <p>
              Die Lösungsmenge ist{' '}
              <b>
                <InlineMath
                  math={`L=\\left\\{\\left(${fracLatex(data.x)}\\,;\\,${fracLatex(
                    data.y,
                  )}\\right)\\right\\}`}
                />
              </b>
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        const c = data.b * data.x + data.a * data.y
        const e = data.d * data.x - data.faktor * data.a * data.y

        function generatePoints(
          a: number,
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = (b - a * x) / c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }

        const Points = generatePoints(-data.b, c, data.a, 1)
        const Points2 = generatePoints(-data.d, e, -data.faktor * data.a, 1)
        const Points3 = generatePoints(data.b, c, data.a, 1)
        const Points4 = generatePoints(data.d, e, -data.faktor * data.a, 1)
        const Points5 = generatePoints(-data.b, -c, data.a, 1)
        const Points6 = generatePoints(-data.d, -e, data.faktor * data.a, 1)

        const listItems = [
          <li key="1">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
          <li key="2">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points3}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points4}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
          <li key="3">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points5}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points6}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])

        return (
          <>
            <p>
              Lineare Gleichungssysteme lassen sich auch graphisch lösen.
              Begründen Sie, welche der folgenden Abbildungen zur Lösung des
              obigen Gleichungssystems passt.
            </p>
            {shuffledItems[0]} <p>Abbildung 1</p>
            {shuffledItems[1]} <p>Abbildung 2</p>
            {shuffledItems[2]} <p>Abbildung 3</p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        const c = data.b * data.x + data.a * data.y
        const e = data.d * data.x - data.faktor * data.a * data.y

        function generatePoints(
          a: number,
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = (b + a * x) / c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }

        const Points = generatePoints(-data.b, c, data.a, 1)
        const Points2 = generatePoints(-data.d, e, -data.faktor * data.a, 1)
        const Points3 = generatePoints(data.b, c, data.a, 1)
        const Points4 = generatePoints(data.d, e, -data.faktor * data.a, 1)
        const Points5 = generatePoints(-data.b, -c, data.a, 1)
        const Points6 = generatePoints(-data.d, -e, data.faktor * data.a, 1)

        const listItems = [
          <li key="0">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
          <li key="1">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points3}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points4}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
          <li key="2">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points5}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points6}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        const correctIndex = data.order.indexOf(1)

        return (
          <>
            <p>Richtig ist die Abbildung {correctIndex + 1}.</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <p>Die Geraden stellen die Gleichungen aus der Aufgabe dar.</p>
            <p>
              Der Schnittpunkt der beiden Geraden ist genau die Lösung des
              Gleichungssystems{' '}
              <InlineMath
                math={`\\left(${fracLatex(data.x)}\\,|\\,${fracLatex(
                  data.y,
                )}\\right)`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
