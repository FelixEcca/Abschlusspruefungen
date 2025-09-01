import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

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
    const x_1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x_2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    return (
      data.y_offset !== 0 &&
      data.b !== data.y_offset &&
      data.b !== 0 &&
      p % 1 == 0 &&
      q % 1 == 0 &&
      x_1 % 1 == 0 &&
      x_2 % 1 == 0 &&
      x_1 !== x_2
    )
  },
  intro({ data }) {
    return (
      <>
        <p>
          Gegeben sind die Parabel p und die Gerade g durch ihre Gleichungen:
        </p>
        <p>
          p: y = {data.neg && '-'}x² {pp(data.y_offset, 'merge_op')}
        </p>
        <p>
          g: y ={' '}
          {ppPolynom([
            [data.m, 'x', 1],
            [data.b, 'x', 0],
          ])}
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
            <p>Geben Sie die Koordinaten des Scheitelpunkts von p an.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              p: y = {data.neg && '-'}x² <b>{pp(data.y_offset, 'merge_op')}</b>
            </p>
            <p>
              Die Parabel schneidet die y-Achse an der Stelle{' '}
              <b>{pp(data.y_offset)}</b>.
            </p>
            <p>
              Damit ist der Scheitel: <b>S(0|{pp(data.y_offset)})</b>
            </p>
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
            <p>Zeichnen Sie p und g in ein Koordinatensystem.</p>
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
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = a * (x - b) * (x - b) + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function linearPoints(
          m: number,
          b: number,

          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const linearPoints123 = linearPoints(data.m, data.b, 0.1)
        const parabolaPoints1 = generateParabolaPoints(1, 0, data.y_offset, 0.1)
        const parabolaPoints2 = generateParabolaPoints(
          -1,
          0,
          data.y_offset,
          0.1,
        )
        return (
          <>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={linearPoints123}
                stroke="darkgreen"
                strokeWidth="2"
                fill="none"
              />
              {!data.neg ? (
                <>
                  <polyline
                    points={parabolaPoints1}
                    stroke="blue"
                    strokeWidth="2"
                    fill="none"
                  />
                </>
              ) : (
                <>
                  <polyline
                    points={parabolaPoints2}
                    stroke="blue"
                    strokeWidth="2"
                    fill="none"
                  />
                </>
              )}
            </svg>
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
            <p>Berechnen Sie die Koordinaten der Schnittpunkte von p und g.</p>
          </>
        )
      },
      solution({ data }) {
        const p = data.neg ? data.m : -data.m
        const q = data.neg ? -data.y_offset + data.b : data.y_offset - data.b
        const x_1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
        const x_2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
        return (
          <>
            <p>
              Es reicht nicht die Schnittpunkte aus dem Schaubild von b)
              abzulesen. Sie müssen berechnet werden.
            </p>
            <p>Setze die Geradengleichung mit dem Term der Parabel gleich:</p>
            {buildEquation([
              [
                <>
                  y<sub>p</sub>
                </>,
                <>=</>,
                <>
                  y<sub>g</sub>
                </>,
              ],
              [
                <>
                  {data.neg && '-'}x² {pp(data.y_offset, 'merge_op')}
                </>,
                <>=</>,
                <>
                  {ppPolynom([
                    [data.m, 'x', 1],
                    [data.b, 'x', 0],
                  ])}
                </>,
                <>
                  {' '}
                  | {data.neg ? '+ x²' : <>{pp(-data.m, 'merge_op')}x</>} &nbsp;
                  |{' '}
                  {data.neg ? (
                    <>{pp(-data.y_offset, 'merge_op')}</>
                  ) : (
                    <>{pp(-data.b, 'merge_op')}</>
                  )}
                </>,
              ],
              [
                '',
                <>
                  {' '}
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>Umstellen</span>
                  </Color4>
                </>,
              ],
              [
                <>0</>,
                <>=</>,
                <>
                  {!data.neg ? (
                    <>
                      x² {pp(-data.m, 'merge_op')}x{' '}
                      {pp(data.y_offset - data.b, 'merge_op')}
                    </>
                  ) : (
                    <>
                      x² {pp(data.m, 'merge_op')}x{' '}
                      {pp(-data.y_offset + data.b, 'merge_op')}
                    </>
                  )}
                </>,
              ],
            ])}
            <p>Löse die Gleichung mithilfe der pq-Formel:</p>
            {buildEquation([
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  −{buildInlineFrac('p', 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac('p', 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      q
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  −{buildInlineFrac(pp(p, 'embrace_neg'), 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac(pp(p, 'embrace_neg'), 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −{' '}
                      {q < 0 && <>(</>}
                      {pp(q)}
                      {q < 0 && <>)</>}
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <>
                    <span style={{ verticalAlign: 'middle' }}>
                      {pp(-p / 2)} ±{' '}
                    </span>
                    {buildSqrt(pp((p / 2) * (p / 2) - q))}
                  </>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <>
                    <span style={{ verticalAlign: 'middle' }}>
                      {pp(-p / 2)} ±{' '}
                    </span>
                    {pp(Math.sqrt((p / 2) * (p / 2) - q))}
                  </>
                </>,
              ],
            ])}

            <strong>
              <p>
                x<sub>1</sub> = {pp(x_1)}
              </p>
              <p>
                x<sub>2</sub> = {pp(x_2)}
              </p>
            </strong>
            <p>Berechne die y-Werte mit der Geradengleichung:</p>
            {buildEquation([
              [
                <>
                  y<sub>1</sub>
                </>,
                <>=</>,
                <>
                  {pp(data.m, 'embrace_neg')}·{pp(x_1, 'embrace_neg')}{' '}
                  {pp(data.b, 'merge_op')}
                </>,
              ],
              [
                <>
                  y<sub>1</sub>
                </>,
                <>=</>,
                <>
                  <strong>{pp(data.m * x_1 + data.b)}</strong>
                </>,
              ],
              [
                <>
                  y<sub>2</sub>
                </>,
                <>=</>,
                <>
                  {pp(data.m, 'embrace_neg')}·{pp(x_2, 'embrace_neg')}{' '}
                  {pp(data.b, 'merge_op')}
                </>,
              ],
              [
                <>
                  y<sub>2</sub>
                </>,
                <>=</>,
                <>
                  <strong>{pp(data.m * x_2 + data.b)}</strong>
                </>,
              ],
            ])}
            <p>Damit sind die Schnittpunkte:</p>
            <strong>
              <p>
                S<sub>1</sub>({pp(x_1)}|{pp(data.m * x_1 + data.b)})
              </p>
              <p>
                S<sub>2</sub>({pp(x_2)}|{pp(data.m * x_2 + data.b)})
              </p>
            </strong>
          </>
        )
      },
    },
  ],
}
