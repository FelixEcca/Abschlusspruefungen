import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildOverline,
} from '@/helper/math-builder'

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
          Im Dreieck ACD liegt der Punkt B in der Mitte der Seite zwischen A und
          C. Die Strecke von A nach B ist der Durchmesser des Halbkreises, auf
          dem der Punkt E liegt. x ist parallel zu y.
        </p>
        <svg viewBox="0 0 328 280 ">
          <image href="/content/BW_2BFS/3016.png" height="280" width="328" />
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
            <p>Berechnen Sie die Länge der Strecke x.</p>
            <p>Kontrollergebnis: {data.auswahl[1]} cm</p>
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
            <p>Zudem ist die Seite AB {data.auswahl[2]} cm lang.</p>
            <svg viewBox="0 0 328 190 ">
              <image
                href="/content/BW_2BFS/3016_2.png"
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
                <>{data.auswahl[0]}² + x²</>,
                <>=</>,
                <>{data.auswahl[2]}²</>,
                <>| - {data.auswahl[0]}²</>,
              ],
              [
                <>x²</>,
                <>=</>,
                <>
                  {data.auswahl[2]}² - {data.auswahl[0]}²
                </>,
                <>| √</>,
              ],
              [
                <>x</>,
                <>=</>,
                <>
                  {Math.sqrt(data.auswahl[2] ** 2 - data.auswahl[0] ** 2)} cm
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
            <p>Berechnen Sie die Länge der Strecke y.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Da x und y parallel sind, sind die Dreiecke ACD und ABE ähnlich.
            </p>
            <p>
              Die Seitenlängen des größeren Dreiecks sind alle genau doppelt so
              groß, also ist:
            </p>
            <p>y = 2 · x = {data.auswahl[1] * 2} cm</p>
          </>
        )
      },
    },
  ],
}
