import { Exercise } from '@/data/types'
import { Color2, Color4 } from '@/helper/colors'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { InlineMath } from 'react-katex'

interface DATA {
  x_s: number
  y_s: number
  ax: number
  delta_ay: number
}

export const exercise3158: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2024 Wahlteil Aufgabe 3B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      x_s: rng.randomIntBetween(-5, 5),
      y_s: rng.randomIntBetween(-5, -1),
      ax: rng.randomIntBetween(-4, 4),
      delta_ay: rng.randomIntBetween(-1, 1),
    }
  },
  originalData: { x_s: -1, y_s: -3, ax: -3, delta_ay: -1 },
  constraint({ data }) {
    return data.x_s != 0
  },
  intro({ data }) {
    const eq = `p:\\; y = x^{2} ${pp(2 * data.x_s, 'merge_op')}x ${pp(
      data.x_s * data.x_s + data.y_s,
      'merge_op',
    )}`
    return (
      <>
        <p>
          Gegeben ist die Parabelgleichung <br></br>
          <InlineMath math={eq} />.
        </p>
      </>
    )
  },
  tasks: [
    /* a) Punktlage */
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        function parabel(n: number) {
          return n * n + data.x_s * 2 * n + data.x_s * data.x_s + data.y_s
        }
        return (
          <>
            <p>
              Untersuchen Sie, ob der Punkt <br></br>
              <InlineMath
                math={`A\\big(${pp(data.ax)}\\mid ${
                  parabel(data.ax) + data.delta_ay
                }\\big)`}
              />{' '}
              auf der Parabel, oberhalb der Parabel oder unterhalb der Parabel
              liegt.
            </p>
          </>
        )
      },
      solution({ data }) {
        function parabel(n: number) {
          return n * n + data.x_s * 2 * n + data.x_s * data.x_s + data.y_s
        }
        const p1 = `y`
        const p2 = `x^{2} ${pp(2 * data.x_s, 'merge_op')}x ${pp(
          data.x_s * data.x_s + data.y_s,
          'merge_op',
        )}`
        const p3 = `${pp(data.ax, 'embrace_neg')}^{2} ${pp(
          2 * data.x_s,
          'merge_op',
        )}\\cdot ${pp(data.ax, 'embrace_neg')} ${pp(
          data.x_s * data.x_s + data.y_s,
          'merge_op',
        )}`
        const p4 = `${pp(data.ax * data.ax)} ${pp(
          2 * data.x_s * data.ax,
          'merge_op',
        )} ${pp(data.x_s * data.x_s + data.y_s, 'merge_op')}`
        const p5 = `${parabel(data.ax)}`
        const Acoord = `A\\big(${pp(data.ax)}\\mid ${
          parabel(data.ax) + data.delta_ay
        }\\big)`
        return (
          <>
            <p>
              Setze den <InlineMath math="x" />
              -Wert in die Funktionsgleichung ein und berechne den zugehörigen{' '}
              <InlineMath math="y" />
              -Wert:
            </p>

            {buildEquation([
              [
                <>
                  <InlineMath math={p1} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={p2} />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={p3} />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={p4} />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={p5} />
                </>,
              ],
            ])}

            <p>
              Die Parabel hat{' '}
              {data.delta_ay == 0 && (
                <>
                  den gleichen <InlineMath math="y" />
                  -Wert wie der Punkt.
                </>
              )}
              {data.delta_ay == 1 && (
                <>
                  einen niedrigeren <InlineMath math="y" />
                  -Wert als der Punkt.
                </>
              )}
              {data.delta_ay == -1 && (
                <>
                  einen größeren <InlineMath math="y" />
                  -Wert als der Punkt.
                </>
              )}
            </p>

            <p>
              Damit liegt der Punkt <InlineMath math={Acoord} />{' '}
              {data.delta_ay == 0 && <>auf</>}
              {data.delta_ay == -1 && <>unter</>}
              {data.delta_ay == 1 && <>über</>} der Parabel.
            </p>
          </>
        )
      },
    },

    /* b) Nullstellen */
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Berechnen Sie die gemeinsamen Punkte der Parabel{' '}
              <InlineMath math="p" /> mit der <InlineMath math="x" />
              -Achse. Runden Sie falls nötig auf zwei Nachkommastellen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const p = 2 * data.x_s
        const q = data.x_s * data.x_s + data.y_s
        return (
          <>
            <p>
              Berechne die Nullstellen der Parabel <br></br>
              <InlineMath
                math={`y = x^{2} ${pp(2 * data.x_s, 'merge_op')}x ${pp(
                  data.x_s * data.x_s + data.y_s,
                  'merge_op',
                )}`}
              />
              .
            </p>
            <p>
              Bestimme <InlineMath math="p" /> und <InlineMath math="q" />:{' '}
              <InlineMath math={`p=${pp(p)}`} />,{' '}
              <InlineMath math={`q=${pp(q)}`} />
            </p>
            <p>
              Setze in die pq-Formel ein und berechne{' '}
              <InlineMath math="x_{1,2}" />.
            </p>
            <p>
              Bestimme <InlineMath math="p" /> und <InlineMath math="q" />:{' '}
              <InlineMath math={`p=${pp(p)}`} />,{' '}
              <InlineMath math={`q=${pp(q)}`} />
            </p>

            {buildEquation([
              [
                <>
                  <InlineMath math="x_{1,2}" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math="-\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}" />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`-\\frac{${pp(p, 'embrace_neg')}}{2} \\pm \\sqrt{\\left(\\frac{${p}}{2}\\right)^2 - ${q}}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`-\\frac{${pp(p, 'embrace_neg')}}{2} \\pm \\sqrt{${(p * p) / 4} - ${q}}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`{${pp(-p / 2)}} \\pm \\sqrt{${pp((p / 2) * (p / 2) - q)}}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  {Math.sqrt((p / 2) * (p / 2) - q) % 1 !== 0 ? (
                    <InlineMath math="\approx" />
                  ) : (
                    <InlineMath math="=" />
                  )}
                </>,
                <>
                  <InlineMath
                    math={`{${pp(-p / 2)}} \\pm ${pp(
                      roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                    )}`}
                  />
                </>,
              ],
            ])}

            <p>
              <InlineMath math="x_1" /> ={' '}
              <InlineMath
                math={`${pp(-p / 2)} + ${pp(
                  roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                )} = ${pp(
                  -p / 2 + roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                )}`}
              />
              <br />
              <InlineMath math="x_2" /> ={' '}
              <InlineMath
                math={`${pp(-p / 2)} - ${pp(
                  roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                )} = ${pp(
                  -p / 2 - roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                )}`}
              />
            </p>

            <p>
              Damit sind die gemeinsamen Punkte mit der <InlineMath math="x" />
              -Achse:
            </p>
            <p>
              <b>
                <InlineMath
                  math={`N_1\\Big(${pp(
                    -p / 2 + roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                  )}\\mid 0\\Big)\\;\\;N_2\\Big(${pp(
                    -p / 2 - roundToDigits(Math.sqrt((p / 2) * (p / 2) - q), 2),
                  )}\\mid 0\\Big)`}
                />
              </b>
            </p>
          </>
        )
      },
    },

    /* c) Scheitelform */
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Bestimmen Sie die Scheitelform der Parabel <InlineMath math="p" />
              .
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Bestimme die Scheitelform der Parabel mit einer quadratischen
              Ergänzung:
            </p>

            {buildEquation([
              [
                <>
                  <InlineMath math="y" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`x^{2}\\;\\mathbf{${pp(
                      2 * data.x_s,
                      'merge_op',
                    )}}x\\;${pp(data.x_s * data.x_s + data.y_s, 'merge_op')}`}
                  />
                </>,
              ],
              [
                '',
                <>
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Ergänze mit dem Term{' '}
                      <InlineMath
                        math={`\\left(\\frac{${pp(2 * data.x_s)}}{2}\\right)^{2}`}
                      />
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`x^{2} ${pp(
                      2 * data.x_s,
                      'merge_op',
                    )}x + \\left(\\frac{${pp(2 * data.x_s)}}{2}\\right)^{2} ${pp(
                      data.x_s * data.x_s + data.y_s,
                      'merge_op',
                    )} - \\left(\\frac{${pp(2 * data.x_s)}}{2}\\right)^{2}`}
                  />
                </>,
              ],
              [
                '',
                <>
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Fasse den vorderen Teil zu einem Binom zusammen.
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\big(x ${pp(data.x_s, 'merge_op')}\\big)^{2} ${pp(
                      data.x_s * data.x_s + data.y_s,
                      'merge_op',
                    )} - ${pp(data.x_s)}^{2}`}
                  />
                </>,
              ],
              [
                '',
                <>
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Fasse den hinteren Teil zusammen.
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\big(x ${pp(data.x_s, 'merge_op')}\\big)^{2} ${pp(
                      data.y_s,
                      'merge_op',
                    )}`}
                  />
                </>,
              ],
            ])}
          </>
        )
      },
    },
  ],
}
