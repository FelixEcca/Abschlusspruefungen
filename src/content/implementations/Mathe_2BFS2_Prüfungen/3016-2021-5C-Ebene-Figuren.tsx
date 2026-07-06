import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'
import { BlockMath, InlineMath } from 'react-katex'

interface DATA {
  auswahl: number[]
}

const tripel1 = [3, 4, 5]
const tripel2 = [6, 8, 10]
const tripel3 = [9, 12, 15]
const tripel4 = [5, 12, 13]
const tripel5 = [7, 24, 25]
const tripel6 = [8, 15, 17]
const tripel7 = [10, 24, 26]
const tripel8 = [20, 21, 29]

export const exercise3016: Exercise<DATA> = {
  title: 'Ebene Figuren',
  source: '2021 Wahlteil Aufgabe 5C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      auswahl: rng.randomItemFromArray([
        tripel1,
        tripel2,
        tripel3,
        tripel4,
        tripel5,
        tripel6,
        tripel7,
        tripel8,
      ]),
    }
  },
  originalData: { auswahl: [3, 4, 5] },
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Im Dreieck ACD liegt der Punkt <InlineMath math="B" /> in der Mitte
          der Seite zwischen <InlineMath math="A" /> und <InlineMath math="C" />
          . Die Strecke von <InlineMath math="A" /> nach <InlineMath math="B" />{' '}
          ist der Durchmesser des Halbkreises, auf dem der Punkt{' '}
          <InlineMath math="E" /> liegt. <InlineMath math="x" /> ist parallel zu{' '}
          <InlineMath math="y" />.
        </p>
        <svg viewBox="0 0 328 280 ">
          <image
            href="/content/Mathe_2BFS2/3016.png"
            height="280"
            width="328"
          />
          <text
            x={70}
            y={120}
            fontSize={10}
            textAnchor="middle"
            stroke="black"
            transform="rotate(-55 70 120)"
          >
            {data.auswahl[0]} cm
          </text>
          <text
            x={164}
            y={190}
            fontSize={15}
            textAnchor="middle"
            stroke="black"
          >
            {data.auswahl[2] * 2} cm
          </text>
        </svg>
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
              Berechnen Sie die Länge der Strecke <InlineMath math="x" />.
            </p>
            <p>
              Kontrollergebnis:{' '}
              <InlineMath math={`${data.auswahl[1]} \\text{ cm}`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Das Dreieck ABE ist rechtwinklig, weil die Ecken genau auf einem
              Thaleskreis liegen.
            </p>
            <p>
              Zudem ist die Seite{' '}
              <InlineMath
                math={`\\overline{AB} = ${data.auswahl[2]} \\text{ cm}`}
              />{' '}
              lang.
            </p>
            <svg viewBox="0 0 328 190 ">
              <image
                href="/content/Mathe_2BFS2/3016_2.png"
                height="190"
                width="328"
              />
              <text
                x={70}
                y={120}
                fontSize={10}
                textAnchor="middle"
                stroke="black"
                transform="rotate(-55 70 120)"
              >
                {data.auswahl[0]} cm
              </text>
              <text
                x={164}
                y={190}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                {data.auswahl[2] * 2} cm
              </text>
            </svg>
            <p>Im rechtwinkligen Dreieck gilt mit dem Satz des Pythagoras:</p>

            {buildEquation([
              [
                <>
                  <InlineMath math={`${data.auswahl[0]}² + x²`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath math={`${data.auswahl[2]}²`} />
                </>,
                <>
                  <InlineMath math={`- ${data.auswahl[0]}²`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={`x²`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath
                    math={`${data.auswahl[2]}² - ${data.auswahl[0]}²`}
                  />
                </>,
                <>
                  | <InlineMath math={`\\sqrt{}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={`x`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath
                    math={`\\sqrt{${data.auswahl[2] ** 2 - data.auswahl[0] ** 2}}`}
                  />
                </>,
              ],
              [
                <>
                  <InlineMath math={`x`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath
                    math={`${Math.sqrt(data.auswahl[2] ** 2 - data.auswahl[0] ** 2)} \\text{ cm}`}
                  />
                </>,
              ],
            ])}
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
              Berechnen Sie die Länge der Strecke <InlineMath math="y" />.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Da <InlineMath math="x" /> und <InlineMath math="y" /> parallel
              sind, sind die Dreiecke <InlineMath math="ACD" /> und{' '}
              <InlineMath math="ABE" /> ähnlich.
            </p>
            <p>
              Die Seitenlängen des größeren Dreiecks sind alle genau doppelt so
              groß, also ist:
            </p>
            <p>
              <InlineMath
                math={`y = 2 \\cdot x = ${data.auswahl[1] * 2} \\text{ cm}`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
