import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  c: number
  x: number
  guess: number
}

export const exercise3001: Exercise<DATA> = {
  title: 'Gleichung',
  source: '2021 Pflichtteil Aufgabe 1B',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(-5, 5),
      b: rng.randomIntBetween(-8, 8),
      c: rng.randomIntBetween(-6, 8),
      x: rng.randomIntBetween(-5, 5),
      guess: rng.randomIntBetween(1, 10),
    }
  },
  originalData: { a: 3, b: 2, c: 8, x: 3, guess: 2 },
  constraint({ data }) {
    const d = (data.a - data.c) * data.x + data.b
    const y = data.a * data.x + data.b
    return (
      Math.abs(data.a) > 1 &&
      data.b != 0 &&
      data.c != 0 &&
      data.a != data.c &&
      Math.abs(d) <= 50 &&
      data.x != data.guess &&
      Math.abs(y) < 8
    )
  },
  intro({ data }) {
    const d = (data.a - data.c) * data.x + data.b
    return (
      <>
        <p>
          Gegeben ist die Gleichung<br></br>{' '}
          <InlineMath
            math={`${pp(data.a)}x
          ${pp(data.b, 'merge_op')} = ${pp(d)} ${pp(data.c, 'koeff')}x`}
          />
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
              Zeigen Sie, dass <InlineMath math={`x = ${data.guess}`} /> keine
              Lösung der Gleichung ist.
            </p>
          </>
        )
      },
      solution({ data }) {
        const d = (data.a - data.c) * data.x + data.b
        return (
          <>
            <p>
              Setze <InlineMath math={`${data.guess}`} /> für{' '}
              <InlineMath math={`x`} /> ein:
            </p>
            {buildEquation([
              [
                <>
                  <InlineMath
                    math={`${pp(data.a)}x ${pp(data.b, 'merge_op')}`}
                  />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath math={`${pp(d)} ${pp(data.c, 'koeff')}x`} />
                </>,
              ],
              [
                <>
                  <InlineMath
                    math={`${pp(data.a)} \\cdot ${data.guess} ${pp(data.b, 'merge_op')}`}
                  />
                </>,

                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath
                    math={`${pp(d)} ${pp(data.c, 'koeff')} \\cdot ${data.guess}`}
                  />
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
                    <span style={{ fontSize: 'small' }}>
                      Berechne die Werte.
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  <InlineMath math={pp(data.a * data.guess + data.b)} />
                </>,
                <>
                  <InlineMath math={`\\neq`} />
                </>,
                <>
                  <InlineMath math={pp(data.c * data.guess + d)} />
                </>,
              ],
            ])}
            <p>
              Die Gleichung ist nicht erfüllt. Das bedeutet,{' '}
              <InlineMath math={`x = ${data.guess}`} /> ist keine Lösung der
              Gleichung.
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
            <p>Bestimmen Sie die Lösung der Gleichung</p>
          </>
        )
      },
      solution({ data }) {
        const d = (data.a - data.c) * data.x + data.b
        return (
          <>
            <p>
              Löse die Gleichung. Sortiere die x-Terme und die Zahlen jeweils
              auf eine Seite.
            </p>
            {buildEquation([
              [
                <>
                  <InlineMath
                    math={`${pp(data.a)}x ${pp(data.b, 'merge_op')}`}
                  />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath math={`${pp(d)} ${pp(data.c, 'koeff')}x`} />
                </>,
                <>
                  {' '}
                  | <InlineMath math={pp(-data.c, 'koeff')} />x
                </>,
              ],

              [
                <>
                  <InlineMath
                    math={`${pp(data.a + -data.c)}x ${pp(data.b, 'merge_op')}`}
                  />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath math={pp(d)} />
                </>,
                <>
                  {' '}
                  | <InlineMath math={pp(-data.b, 'merge_op')} />
                </>,
              ],
            ])}
            {data.a + -data.c != 1 && (
              <>
                {buildEquation([
                  [
                    <>
                      <InlineMath math={`${pp(data.a + -data.c)}x`} />
                    </>,
                    <>
                      <InlineMath math={`=`} />
                    </>,
                    <>
                      <InlineMath math={pp(d - data.b)} />
                    </>,
                    <>
                      {' '}
                      | :{' '}
                      <InlineMath math={pp(data.a + -data.c, 'embrace_neg')} />
                    </>,
                  ],
                ])}
              </>
            )}
            {buildEquation([
              [
                <>
                  <InlineMath math={`x`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath math={pp(data.x)} />
                </>,
              ],
            ])}
            <p>
              Die Lösung ist <InlineMath math={`x = ${pp(data.x)}`} />
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
            <p>
              Erläutern Sie, wie die Gleichung graphisch gelöst werden könnte.
            </p>
          </>
        )
      },
      solution({ data }) {
        const d = (data.a - data.c) * data.x + data.b
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        const y = data.a * data.x + data.b
        return (
          <>
            <p>
              Die Terme können jeweils als Geradengleichung verstanden werden:
            </p>
            <p>
              <InlineMath
                math={`y_1 = ${pp(data.a)}x ${pp(data.b, 'merge_op')}`}
              />
            </p>
            {buildEquation([
              [
                <>
                  <InlineMath math={`y_2`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath math={`${pp(d)} ${pp(data.c, 'koeff')}x`} />
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
                    <span style={{ fontSize: 'small' }}>
                      Ist genau gleich wie:
                    </span>
                  </Color4>
                </>,
              ],
              [
                <>
                  <InlineMath math={`y_2`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath math={`${pp(data.c)}x ${pp(d, 'merge_op')}`} />
                </>,
              ],
            ])}

            <p>
              Die Lösung der Gleichung ist die Stelle an der sich die Geraden
              schneiden.
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <line
                x1={toX(-10)}
                y1={toY(data.a * -10 + data.b)}
                x2={toX(10)}
                y2={toY(data.a * 10 + data.b)}
                stroke="red"
                strokeWidth={2}
              />
              <line
                x1={toX(-10)}
                y1={toY(d + data.c * -10)}
                x2={toX(10)}
                y2={toY(d + data.c * 10)}
                stroke="blue"
                strokeWidth={2}
              />
              <line
                x1={toX(data.x)}
                y1={toY(0)}
                x2={toX(data.x)}
                y2={toY(y)}
                stroke="orange"
                strokeWidth={2}
                strokeDasharray={'5,5'}
              />
              <text
                x={toX(data.x)}
                y={toY(-2)}
                fontSize={15}
                textAnchor="middle"
                stroke="orange"
              >
                x = {data.x}
              </text>
            </svg>
          </>
        )
      },
    },
  ],
}
