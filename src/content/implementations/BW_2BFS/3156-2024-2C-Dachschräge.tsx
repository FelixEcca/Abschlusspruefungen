import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

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
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Unter einer Dachschräge soll der Platz, wie in der Skizze dargestellt,
          genutzt werden. Geplant ist. dort einen 100 cm breiten Schrank
          einzubauen.
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
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie, wie hoch der Schrank maximal sein kann.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Tipp: Achte bei dieser Aufgabe auf die Einheiten der Maße.</p>
            <p>
              Vereinfacht stellt die Skizze ein Dreieck dar. Die Höhe des
              Schranks nennen wir x.
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
                  {buildInlineFrac(
                    <>x</>,
                    <>
                      {pp(data.gesamt * 100)} - {data.schrank}
                    </>,
                  )}
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{pp(data.wand * 100)}</>,
                    <>{pp(data.gesamt * 100)}</>,
                  )}
                </>,
              ],
              [
                <>
                  {buildInlineFrac(
                    <>x</>,
                    <>{pp(data.gesamt * 100 - data.schrank)}</>,
                  )}
                </>,
                <>=</>,
                <>{ppFrac(data.wand / data.gesamt)}</>,
                <>| · {pp(data.gesamt * 100 - data.schrank)}</>,
              ],
              [
                <>x</>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      ((data.gesamt * 100 - data.schrank) * data.wand) /
                        data.gesamt,
                      2,
                    ),
                  )}
                </>,
              ],
            ])}
            <p>
              Der Schrank darf maximal{' '}
              {pp(
                roundToDigits(
                  ((data.gesamt * 100 - data.schrank) * data.wand) /
                    data.gesamt,
                  2,
                ),
              )}{' '}
              cm breit sein.
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
            <p>Berechnen Sie den Winkel α.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Für den Winkel α rechnen wir in diesem rechtwinkligen Dreieck:
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
            <p>Berechne den Wert von α mit dem Tangens:</p>
            {buildEquation([
              [
                <>tan(α)</>,
                <>=</>,
                <>{buildInlineFrac(<>Gegenkathete</>, <>Ankathete</>)}</>,
              ],
              [
                <>tan(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{pp(data.wand)}</>,
                    <>{pp(data.gesamt)}</>,
                  )}
                </>,
                <>
                  | tan<sup>-1</sup>()
                </>,
              ],
              [
                <>α</>,
                <>=</>,
                <>
                  tan<sup>-1</sup>
                  <span className="inline-block  scale-y-[2]">(</span>
                  {buildInlineFrac(
                    <>{pp(data.wand)}</>,
                    <>{pp(data.gesamt)}</>,
                  )}
                  <span className="inline-block  scale-y-[2]">)</span>
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(
                    roundToDigits(
                      (360 * Math.atan(data.wand / data.gesamt)) /
                        (2 * Math.PI),
                      2,
                    ),
                  )}
                  °
                </>,
              ],
            ])}
            <p>
              Die Größe von α beträgt{' '}
              {pp(
                roundToDigits(
                  (360 * Math.atan(data.wand / data.gesamt)) / (2 * Math.PI),
                  2,
                ),
              )}
              °.
            </p>
            <p>
              {data.wand == data.gesamt && (
                <>
                  Tipp: Hier hätte man keine Rechnung gebraucht. Da die Wand
                  gleich lang ist wie der Boden ist α = 45°. Das lässt sich mit
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
