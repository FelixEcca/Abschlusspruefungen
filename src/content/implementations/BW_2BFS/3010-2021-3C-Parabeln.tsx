import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

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
    return (
      <>
        <p>
          Gegeben ist die Parabel p<sub>1</sub> mit der Gleichung y = x²{' '}
          {pp(-2 * data.x_s, 'koeff')}x {pp(data.x_s * data.x_s, 'merge_op')},
          sowie die Normalparabel p<sub>2</sub> mit y = x².
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Zeigen Sie, dass der Scheitelpunkt der Parabel von p<sub>1</sub>{' '}
              auf der x-Achse liegt und geben Sie die Gleichung von p
              <sub>1</sub> in der Scheitelform an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const b = -2 * data.x_s

        return (
          <>
            <p>Für die x-Koordinate des Scheitels gilt:</p>
            {buildEquation([
              [
                <>
                  x<sub>s</sub>
                </>,
                <>=</>,
                <>{buildInlineFrac(<>-b</>, <>2a</>)}</>,
              ],
              [
                <>
                  x<sub>s</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(<>-{pp(b, 'embrace_neg')}</>, <>2 · 1</>)}
                </>,
              ],
              [
                <>
                  x<sub>s</sub>
                </>,
                <>=</>,
                <>{pp(data.x_s)}</>,
              ],
            ])}
            <p>
              Setze die Koordinate in die Gleichung von p<sub>1</sub> ein:
            </p>
            {buildEquation([
              [
                <>y</>,
                <>=</>,
                <>
                  x² {pp(data.x_s, 'merge_op')}x{' '}
                  {pp(data.x_s * data.x_s, 'merge_op')}
                </>,
              ],
              [
                <>y</>,
                <>=</>,
                <>
                  {pp(data.x_s, 'embrace_neg')} · {pp(data.x_s, 'embrace_neg')}{' '}
                  {pp(b, 'merge_op')} · {pp(data.x_s, 'embrace_neg')}{' '}
                  {pp(data.x_s * data.x_s, 'merge_op')}
                </>,
              ],
              [<>y</>, <>=</>, <>0</>],
            ])}
            <p>
              Der Scheitelpunkt von p<sub>1</sub> liegt also auf der x-Achse.
            </p>
            <p>Setze die x-Koordinate noch in die Scheitelform ein:</p>
            <p> y = (x {pp(-data.x_s, 'merge_op')})² </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Die Parabel p<sub>2</sub> kann mit einer weiteren Parabel q
              keinen, einen oder zwei Schnittpunkte haben. Geben Sie für jeden
              dieser drei Fälle eine mögliche Parabelgleichung von q an.
            </p>
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
            <p>q: y = -x² + 1</p>
            <p>Beispiel für einen Schnittpunkt:</p>
            <p>q: y = -x²</p>
            <p>Beispiel für keinen Schnittpunkt:</p>
            <p>q: y = x² + 1</p>
            <p>Dargestellt im Koordinatensystem:</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={generateParabolaPoints(-1, 1, 0.1)}
                stroke="green"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={generateParabolaPoints(-1, 0, 0.1)}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={generateParabolaPoints(1, 1, 0.1)}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={generateParabolaPoints(1, 0, 0.1)}
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
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
