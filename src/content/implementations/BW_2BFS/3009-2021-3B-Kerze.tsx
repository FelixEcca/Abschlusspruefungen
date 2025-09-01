import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'

interface DATA {
  a: number
  volume: number
}

export const exercise3009: Exercise<DATA> = {
  title: 'Kerze',
  source: '2021 Wahlteil Aufgabe 3B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      a: rng.randomIntBetween(3, 10),
      volume: rng.randomIntBetween(8, 20) * 10,
    }
  },
  originalData: { a: 5, volume: 100 },
  constraint({ data }) {
    const h = (data.volume * 3) / (data.a * data.a)
    return h % 1 == 0
  },
  intro({ data }) {
    return (
      <>
        <p>
          Eine Wachskerze hat die Form einer Pyramide mit quadratischer
          Grundfläche. Die Seitenlänge a der Grundfläche beträgt {data.a} cm und
          das Volumen der Wachskerze beträgt {data.volume}0 cm³.
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
              Berechnen Sie den Flächeninhalt der quadratischen Grundfläche der
              Pyramide und die Höhe h der Wachskerze.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Fläche des Quadrats beträgt:</p>
            {buildEquation([
              [<>A</>, <>=</>, <>a²</>],
              [<></>, <>=</>, <>({data.a} cm)²</>],
              [
                <></>,
                <>=</>,
                <>
                  <b>{data.a * data.a} cm²</b>
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
              Berechnen Sie den Winkel zwischen der Seitenfläche und der
              Grundfläche.
            </p>
          </>
        )
      },
      solution({ data }) {
        const h = (data.volume * 3) / (data.a * data.a)
        const alpha = Math.round(100 * Math.atan(h / ((1 / 2) * data.a))) / 100
        return (
          <>
            <p>Die Skizze zeigt die Pyramide von der Seite.</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/3009.png"
                height="328"
                width="328"
              />
            </svg>
            <p>
              Berechne den Winkel im rechtwinkligen Dreieck aus der halben
              Seitenlänge a/2 und der Höhe h.
            </p>
            <p>Die Höhe h lässt sich aus dem Volumen der Pyramide berechen:</p>
            {buildEquation([
              [<>V</>, <>=</>, <>{ppFrac(1 / 3)} G · h</>],
              [
                <>{data.volume}</>,
                <>=</>,
                <>
                  {ppFrac(1 / 3)} {data.a * data.a} · h
                </>,
                <>| · 3</>,
              ],
              [
                <>{data.volume * 3}</>,
                <>=</>,
                <>{data.a * data.a} · h</>,
                <>| : {data.a * data.a}</>,
              ],
              [<>{h}</>, <>=</>, <>h</>],
            ])}
            <p>Verwende die Höhe h = {h} cm um den Winkel α zu berechnen:</p>
            {buildEquation([
              [
                <>tan(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>h</>,
                    <>{buildInlineFrac(<>a</>, <>2</>)}</>,
                  )}
                </>,
              ],
              [
                <>tan(α)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{h}</>,
                    <>{buildInlineFrac(<>{data.a}</>, <>2</>)}</>,
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
                  tan<sup>-1</sup>({h / ((1 / 2) * data.a)})
                </>,
              ],
              [<>α</>, <>{alpha % 1 == 0 ? '=' : '≈'}</>, <>{pp(alpha)}°</>],
            ])}
            <p>Der Winkel α beträgt {pp(alpha)}°.</p>
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
              Die Wachskerze wird komplett geschlossen eingeschmolzen und in
              Kugelform gegossen. Berechnen Sie den Durchmesser der
              kugelförmigen Kerze.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Das Volumen V = {data.volume} cm³ entspricht jetzt dem Volumen der
              Kugel.
            </p>
            <p>
              Stelle die Gleichung nach r um, um den Radius und anschließend den
              Durchmesser zu berechnen:
            </p>
            {buildEquation([
              [<>V</>, <>=</>, <>{ppFrac(4 / 3)} π r³</>],
              [
                <>{data.volume}</>,
                <>=</>,
                <>{ppFrac(4 / 3)} π r³</>,
                <>| · 3</>,
              ],
              [<>{data.volume * 3}</>, <>=</>, <>4 π r³</>, <>| : 4π</>],
              [
                <>
                  {pp(
                    Math.round((100 * (data.volume * 3)) / (4 * Math.PI)) / 100,
                  )}
                </>,
                <>=</>,
                <>r³</>,
                <>
                  | <sup>3</sup>√
                </>,
              ],
              [
                <>
                  {pp(
                    Math.round(
                      100 * Math.cbrt((data.volume * 3) / (4 * Math.PI)),
                    ) / 100,
                  )}
                </>,
                <>=</>,
                <>r</>,
              ],
            ])}
            <p>
              Der Durchmesser der Kugel beträgt damit: 2 ·{' '}
              {pp(
                Math.round(100 * Math.cbrt((data.volume * 3) / (4 * Math.PI))) /
                  100,
              )}{' '}
              ={' '}
              {pp(
                (2 *
                  Math.round(
                    100 * Math.cbrt((data.volume * 3) / (4 * Math.PI)),
                  )) /
                  100,
              )}
              cm.
            </p>
          </>
        )
      },
    },
  ],
}
