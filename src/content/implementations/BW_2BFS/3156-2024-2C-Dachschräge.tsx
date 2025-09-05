import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { InlineMath } from 'react-katex'

interface DATA {
  gesamt: number
  wand: number
  schrank: number
}

export const exercise3156: Exercise<DATA> = {
  title: 'Dachschräge',
  source: '2024 Wahlteil Aufgabe 2C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      gesamt: rng.randomIntBetween(18, 30) / 10,
      wand: rng.randomIntBetween(18, 30) / 10,
      schrank: rng.randomIntBetween(70, 120),
    }
  },
  originalData: { gesamt: 2.4, wand: 2.2, schrank: 100 },
  constraint() {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Unter einer Dachschräge soll der Platz, wie in der Skizze dargestellt,
          genutzt werden. Geplant ist. dort einen{' '}
          <InlineMath math={` ${pp(data.schrank)} \\, \\text{cm}`} /> breiten
          Schrank einzubauen.
        </p>
        <svg viewBox="0 0 328 230">
          <image href="/content/BW_2BFS/306.png" height="230" width="328" />
          <text x={100} y={200} fontSize={15} textAnchor="right" stroke="black">
            {pp(data.gesamt)} m
          </text>
          <text
            x={258}
            y={115}
            fontSize={15}
            textAnchor="right"
            stroke="black"
            transform="rotate(270 258 115)"
          >
            {pp(data.wand)} m
          </text>
          <text x={176} y={178} fontSize={15} textAnchor="right" stroke="black">
            {data.schrank} cm
          </text>
        </svg>
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
            <p>Berechnen Sie, wie hoch der Schrank maximal sein kann.</p>
          </>
        )
      },
      solution({ data }) {
        const numX = roundToDigits(
          ((data.gesamt * 100 - data.schrank) * data.wand) / data.gesamt,
          2,
        )
        return (
          <>
            <p>Tipp: Achte bei dieser Aufgabe auf die Einheiten der Maße.</p>
            <p>
              Vereinfacht stellt die Skizze ein Dreieck dar. Die Höhe des
              Schranks nennen wir <InlineMath math="x" />.
            </p>
            <svg viewBox="0 0 328 230">
              <image
                href="/content/BW_2BFS/306_2.png"
                height="230"
                width="328"
              />
              <text
                x={100}
                y={200}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.gesamt)} m
              </text>
              <text
                x={258}
                y={115}
                fontSize={15}
                textAnchor="right"
                stroke="black"
                transform="rotate(270 258 115)"
              >
                {pp(data.wand)} m
              </text>
              <text
                x={176}
                y={178}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {data.schrank} cm
              </text>
            </svg>
            <p>
              Durch den Strahlensatz stehen die Seiten in folgendem Verhältnis
              zueinander:
            </p>

            {buildEquation([
              [
                <>
                  <span style={{ fontSize: 12 }}>
                    <InlineMath
                      math={`\\dfrac{x}{${pp(data.gesamt * 100)} - ${data.schrank}}`}
                    />
                  </span>
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <span style={{ fontSize: 12 }}>
                    <InlineMath
                      math={`\\dfrac{${pp(data.wand * 100)}}{${pp(
                        data.gesamt * 100,
                      )}}`}
                    />
                  </span>
                </>,
              ],
              [
                <>
                  <span style={{ fontSize: 12 }}>
                    <InlineMath
                      math={`\\dfrac{x}{${pp(data.gesamt * 100 - data.schrank)}}`}
                    />
                  </span>
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <span style={{ fontSize: 12 }}>
                    <InlineMath
                      math={`\\dfrac{${pp(data.wand)}}{${pp(data.gesamt)}}`}
                    />
                  </span>
                </>,
                <>
                  |{' '}
                  <InlineMath
                    math={`\\cdot ${pp(data.gesamt * 100 - data.schrank)}`}
                  />
                </>,
              ],
              [
                <>
                  <InlineMath math="x" />
                </>,
                <>
                  <InlineMath math="\approx" />
                </>,
                <>
                  <span style={{ fontSize: 12 }}>
                    <InlineMath math={`${pp(numX)}`} />
                  </span>
                </>,
              ],
            ])}

            <p>
              Der Schrank darf maximal{' '}
              <b>
                {' '}
                <InlineMath math={`${pp(numX)}~ cm`} />
              </b>{' '}
              hoch sein.
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
            <p>Berechnen Sie den Winkel α.</p>
          </>
        )
      },
      solution({ data }) {
        const alpha = roundToDigits(
          (360 * Math.atan(data.wand / data.gesamt)) / (2 * Math.PI),
          2,
        )
        return (
          <>
            <p>
              Für den Winkel <InlineMath math="\alpha" /> rechnen wir in diesem
              rechtwinkligen Dreieck:
            </p>
            <svg viewBox="0 0 328 230">
              <image
                href="/content/BW_2BFS/306_3.png"
                height="230"
                width="328"
              />
              <text
                x={130}
                y={190}
                fontSize={15}
                textAnchor="right"
                stroke="black"
              >
                {pp(data.gesamt)} m
              </text>
              <text
                x={258}
                y={115}
                fontSize={15}
                textAnchor="right"
                stroke="black"
                transform="rotate(270 258 115)"
              >
                {pp(data.wand)} m
              </text>
            </svg>
            <p>Die Ankathete des Winkels und die Gegenkathete sind gegeben.</p>
            <p>
              Berechne den Wert von <InlineMath math="\alpha" /> mit dem
              Tangens:
            </p>

            {buildEquation([
              [
                <>
                  <InlineMath math="\tan(\alpha)" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math="\dfrac{\text{Gegenkathete}}{\text{Ankathete}}" />
                </>,
              ],
              [
                <>
                  <InlineMath math="\tan(\alpha)" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\dfrac{${pp(data.wand)}}{${pp(data.gesamt)}}`}
                  />
                </>,
                <>
                  | <InlineMath math="\arctan()" />
                </>,
              ],
              [
                <>
                  <InlineMath math="\alpha" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\arctan\\!\\left(\\dfrac{${pp(
                      data.wand,
                    )}}{${pp(data.gesamt)}}\\right)`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="\approx" />
                </>,
                <>
                  <InlineMath math={`${pp(alpha)}^{\\circ}`} />
                </>,
              ],
            ])}

            <p>
              Die Größe von <InlineMath math="\alpha" /> beträgt{' '}
              <b>
                <InlineMath math={`${pp(alpha)}^{\\circ}`} />
              </b>
              .
            </p>

            <p>
              {data.wand == data.gesamt && (
                <>
                  Tipp: Hier hätte man keine Rechnung gebraucht. Da die Wand
                  gleich lang ist wie der Boden, ist{' '}
                  <InlineMath math="\alpha = 45^{\circ}" />. Das lässt sich mit
                  einem halben Quadrat begründen.
                </>
              )}
            </p>
          </>
        )
      },
    },
  ],
}
