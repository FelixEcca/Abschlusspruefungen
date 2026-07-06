import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath, BlockMath } from 'react-katex'

interface DATA {
  x_s: number
}

export const exercise3010: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2021 Wahlteil Aufgabe 3C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return { x_s: rng.randomIntBetween(-10, 10) / 2 }
  },
  originalData: { x_s: 1.5 },
  constraint({ data }) {
    return data.x_s != 0
  },
  intro({ data }) {
    const b = -2 * data.x_s
    const c = data.x_s * data.x_s
    return (
      <>
        <p>
          Gegeben ist die Parabel <InlineMath math="p_1" /> mit der Gleichung{' '}
          <InlineMath
            math={`y = x^2 ${pp(b, 'merge_op')}x ${pp(c, 'merge_op')}`}
          />
          , sowie die Normalparabel <InlineMath math="p_2" /> mit{' '}
          <InlineMath math="y = x^2" />.
        </p>
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
          <p>
            Zeigen Sie, dass der Scheitelpunkt der Parabel von{' '}
            <InlineMath math="p_1" /> auf der x-Achse liegt, und geben Sie die
            Gleichung von <InlineMath math="p_1" /> in Scheitelform an.
          </p>
        )
      },
      solution({ data }) {
        const b = -2 * data.x_s
        const c = data.x_s * data.x_s
        return (
          <>
            <p>Für die x-Koordinate des Scheitels gilt:</p>
            <BlockMath
              math={[
                '\\begin{aligned}',
                'x_s &= -\\frac{b}{2a}\\\\',
                `&= -\\frac{${pp(b, 'embrace_neg')}}{2\\cdot 1}\\\\`,
                `&= ${pp(data.x_s)}`,
                '\\end{aligned}',
              ].join('')}
            />

            <p>
              Setze <InlineMath math="x=x_s" /> in die Funktionsgleichung ein:
            </p>
            <BlockMath
              math={[
                '\\begin{aligned}',
                'y(x_s) &= x_s^2 + b\\,x_s + c\\\\',
                `&= ${pp(data.x_s)}^2 ${pp(b, 'merge_op')}${pp(
                  data.x_s,
                  'embrace_neg',
                )} ${pp(c, 'merge_op')}\\\\`,
                '&= 0',
                '\\end{aligned}',
              ].join('')}
            />
            <p>
              Der Scheitelpunkt liegt also auf der x-Achse. Die Scheitelform
              lautet:
            </p>
            <BlockMath math={`y=(x\\,${pp(-data.x_s, 'merge_op')})^{2}`} />
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Die Parabel <InlineMath math="p_2" /> kann mit einer weiteren
            Parabel <InlineMath math="q" /> keinen, einen oder zwei
            Schnittpunkte haben. Geben Sie für jeden Fall eine mögliche
            Parabelgleichung von <InlineMath math="q" /> an.
          </p>
        )
      },
      solution() {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        function generateParabolaPoints(
          a: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = a * x * x + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }

        return (
          <>
            <p>Beispiel für zwei Schnittpunkte:</p>
            <InlineMath math="q:\; y=-x^2+1" />

            <p>Beispiel für einen Schnittpunkt (Tangente an p₂):</p>
            <InlineMath math="q:\; y=-x^2" />

            <p>Beispiel für keinen Schnittpunkt:</p>
            <InlineMath math="q:\; y=x^2+1" />

            <p>Dargestellt im Koordinatensystem:</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              {/* zwei Schnittpunkte */}
              <polyline
                points={generateParabolaPoints(-1, 1, 0.1)}
                stroke="green"
                strokeWidth="2"
                fill="none"
              />
              {/* ein Schnittpunkt (Tangente an 0|0) */}
              <polyline
                points={generateParabolaPoints(-1, 0, 0.1)}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              {/* kein Schnittpunkt */}
              <polyline
                points={generateParabolaPoints(1, 1, 0.1)}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
              {/* p2: y=x^2 als Referenz */}
              <polyline
                points={generateParabolaPoints(1, 0, 0.1)}
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
              {/* Labels (unverändert belassen) */}
              <text
                x={210}
                y={140}
                fontSize={20}
                textAnchor="middle"
                stroke="black"
              >
                x²
              </text>
              <text
                x={190}
                y={50}
                fontSize={20}
                textAnchor="middle"
                stroke="orange"
              >
                x²+1
              </text>
              <text
                x={240}
                y={220}
                fontSize={20}
                textAnchor="middle"
                stroke="green"
              >
                -x²+1
              </text>
              <text
                x={185}
                y={250}
                fontSize={20}
                textAnchor="middle"
                stroke="blue"
              >
                -x²
              </text>
            </svg>
          </>
        )
      },
    },
  ],
}
