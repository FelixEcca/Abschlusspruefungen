import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { InlineMath } from 'react-katex'

interface DATA {
  länge: number
  h1: number
  h2: number
  r: number
  weight: number
}

export const exercise3162: Exercise<DATA> = {
  title: 'Betonkörper',
  source: '2024 Wahlteil Aufgabe 4C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      länge: rng.randomIntBetween(20, 50) / 10,
      h1: rng.randomIntBetween(20, 50) / 10,
      h2: rng.randomIntBetween(1, 7) / 10,
      r: rng.randomIntBetween(20, 50) / 10,
      weight: rng.randomIntBetween(15, 35) * 100,
    }
  },
  originalData: { länge: 3.5, h1: 1.4, h2: 0.4, r: 0.7, weight: 2600 },
  constraint({ data }) {
    return 2 * data.r < data.länge
  },
  intro({ data }) {
    return (
      <>
        <p>
          Vor einem Museum steht der abgebildete Körper aus Beton. Er hat eine
          quadratische Grundfläche mit der Seitenlänge{' '}
          <InlineMath math={`${pp(data.länge)}\\,\\text{m}`} />.
        </p>
        <svg viewBox="0 0 328 80">
          <image href="/content/BW_2BFS/312.png" height="80" width="328" />
        </svg>
        <p>
          Die weiteren Maße des Körpers sind: <br />
          <InlineMath math={`h_1 = ${pp(data.h1)}\\,\\text{m}`} />
          &nbsp;&nbsp; <InlineMath math={`h_2 = ${pp(data.h2)}\\,\\text{m}`} />
          &nbsp;&nbsp; <InlineMath math={`r = ${pp(data.r)}\\,\\text{m}`} />
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
      task({ data }) {
        return (
          <>
            <p>
              Berechnen Sie, wie schwer der Körper ist, wenn{' '}
              <InlineMath math={`1\\,\\text{m}^3`} /> Beton{' '}
              <InlineMath math={`${data.weight}\\,\\text{kg}`} /> wiegt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const vZylEinz = roundToDigits(Math.PI * data.r * data.r * data.h2, 2)
        const vZylAlle = roundToDigits(
          4 * Math.PI * data.r * data.r * data.h2,
          2,
        )
        const vQuader = data.länge * data.länge * data.h1
        const vGes = vQuader + vZylAlle
        const gewicht = data.weight * vGes

        return (
          <>
            <p>
              <b>Volumen des Körpers</b>
            </p>
            <p>Berechne das Volumen der kleinen Zylinder:</p>

            {buildEquation([
              [
                <>
                  <InlineMath math={`V_{\\text{Zylinder}}`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`\\pi\\, r^{2}\\, h_{2}`} />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\pi\\,\\cdot\\, ${pp(data.r)}^{2}\\,\\cdot\\, ${pp(data.h2)}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="\approx" />
                </>,
                <>
                  <InlineMath math={`${pp(vZylEinz)}~\\text{m³}`} />
                </>,
              ],
            ])}

            <p>
              Das Volumen aller vier Zylinder beträgt:{' '}
              <InlineMath
                math={`4\\,\\cdot\\,${pp(vZylEinz)}\\;=\\;${pp(vZylAlle)} ~\\text{m³}`}
              />
            </p>

            <p>Das Volumen des Quaders ist:</p>

            {buildEquation([
              [
                <>
                  <InlineMath math={`V_{\\text{Quader}}`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`l\\,\\cdot\\,b\\,\\cdot\\,h_{1}`} />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`${pp(data.länge)}\\,\\cdot\\,${pp(data.länge)}\\,\\cdot\\,${pp(data.h1)}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`${pp(vQuader)}~\\text{m³}`} />
                </>,
              ],
            ])}

            <p>Das gesamte Volumen ist damit:</p>
            <p>
              <InlineMath
                math={`${pp(vZylAlle)}\\;+\\;${pp(vQuader)}\\;\\approx\\;${pp(vGes)}~\\text{m³}`}
              />
            </p>

            <p>
              <b>Gewicht des Körpers</b>
            </p>
            <p>Der Körper wiegt damit insgesamt:</p>
            <p>
              <InlineMath
                math={`${pp(vGes)}\\,\\text{m}^3\\;\\cdot\\;${data.weight}\\,\\frac{\\text{kg}}{\\text{m}^3}\\;=\\;${pp(
                  gewicht,
                )}\\,\\text{kg}`}
              />
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
      task() {
        return (
          <>
            <p>
              Der Körper soll neu gestrichen werden. Berechnen Sie den
              Flächeninhalt der sichtbaren Oberfläche, die angestrichen werden
              muss.
            </p>
          </>
        )
      },
      solution({ data }) {
        const mZyl = roundToDigits(2 * Math.PI * data.r * data.h2, 2)
        const oQuader = roundToDigits(
          4 * data.länge * data.h1 + data.länge * data.länge,
          2,
        )
        const oGes = mZyl * 4 + oQuader

        return (
          <>
            <p>
              Die Oberfläche besteht aus den Seitenflächen des Quaders, der
              Deckelfläche und den vier Mantelflächen der Zylinder.
            </p>
            <svg viewBox="0 0 328 80">
              <image
                href="/content/BW_2BFS/312_3.png"
                height="80"
                width="328"
              />
            </svg>
            <p>Von oben:</p>
            <svg viewBox="0 0 328 80">
              <image
                href="/content/BW_2BFS/312_4.png"
                height="80"
                width="328"
              />
            </svg>

            <p>
              <b>Mantelflächen der Zylinder</b>
            </p>

            {buildEquation([
              [
                <>
                  <InlineMath math={`M_{\\text{Zylinder}}`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`2\\,\\pi\\, r\\, h_{2}`} />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`2\\,\\pi\\,\\cdot\\,${pp(data.r)}\\,\\cdot\\,${pp(data.h2)}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="\\approx" />
                </>,
                <>
                  <InlineMath math={`${pp(mZyl)}`} />
                </>,
              ],
            ])}

            <p>
              <b>Fläche des Quaders</b>
            </p>
            <p>
              Die Oberfläche besteht aus den vier Seitenflächen und der
              Deckelfläche.
            </p>

            <div>
              <span style={{ fontSize: '0.8em' }}>
                {buildEquation([
                  [
                    <>
                      <InlineMath math={`O_{\\text{Quader}}`} />
                    </>,
                    <>
                      <InlineMath math="=" />
                    </>,
                    <>
                      <InlineMath
                        math={`M_{\\text{Quader}}\\;+\\;D_{\\text{Quader}}`}
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
                      <div>
                        <span style={{ fontSize: '0.7em' }}>
                          <Color4>
                            Die 4 Seitenflächen haben jeweils die Fläche{' '}
                            <InlineMath math={`l\\,\\cdot\\,h_{1}`} />.
                          </Color4>
                        </span>
                      </div>
                    </>,
                  ],
                  [
                    <></>,
                    <>
                      <InlineMath math="=" />
                    </>,
                    <>
                      <InlineMath
                        math={`4\\,\\cdot\\,l\\,\\cdot\\,h_{1}\\; +\\; l\\,\\cdot\\,l`}
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
                        math={`4\\,\\cdot\\,${pp(data.länge)}\\,\\cdot\\,${pp(
                          data.h1,
                        )}\\; +\\; ${pp(data.länge)}\\,\\cdot\\,${pp(data.länge)}`}
                      />
                    </>,
                  ],
                  [
                    <></>,
                    <>
                      <InlineMath math="\\approx" />
                    </>,
                    <>
                      <InlineMath math={`${pp(oQuader)}`} />
                    </>,
                  ],
                ])}
              </span>
            </div>

            <p>
              <b>Gesamtfläche</b>
            </p>
            <p>Die gesamte Fläche beträgt:</p>
            <p>
              <span style={{ fontSize: '0.8em' }}>
                <InlineMath
                  math={`O\\;=\\;4\\,\\cdot\\,M_{\\text{Zylinder}}\\; +\\; O_{\\text{Quader}}\\;=\\;${pp(
                    4 * mZyl,
                  )}\\; +\\; ${pp(oQuader)}\\; =\\; ${pp(oGes)}`}
                />
              </span>
            </p>
          </>
        )
      },
    },
  ],
}
