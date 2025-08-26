import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

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
          quadratische Grundfläche mit der Seitenlänge {pp(data.länge)} m.
        </p>
        <svg viewBox="0 0 328 80">
          <image href="/content/BW_2BFS/312.png" height="80" width="328" />
        </svg>
        <p>
          Die weiteren Maße des Körpers sind: <br></br>h<sub>1</sub> ={' '}
          {pp(data.h1)} m;&nbsp;&nbsp; h<sub>2</sub> = {pp(data.h2)}{' '}
          m;&nbsp;&nbsp; r = {pp(data.r)} m
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
              Berechnen Sie, wie schwer der Körper ist, wenn 1 m³ Beton{' '}
              {data.weight} kg wiegt.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              <b>Volumen des Körpers</b>
            </p>
            <p>Berechne das Volumen der kleinen Zylinder:</p>
            {buildEquation([
              [
                <>
                  V<sub>Zylinder</sub>
                </>,
                <>=</>,
                <>
                  π · r² · h<sub>2</sub>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  π · {pp(data.r)}² · {pp(data.h2)}
                </>,
              ],
              [
                <></>,
                <>≈</>,
                <>
                  {pp(roundToDigits(Math.PI * data.r * data.r * data.h2, 2))}
                </>,
              ],
            ])}
            <p>Das Volumen aller vier Zylinder beträgt:</p>
            <p>
              4 · {pp(roundToDigits(Math.PI * data.r * data.r * data.h2, 2))} ={' '}
              {pp(roundToDigits(4 * Math.PI * data.r * data.r * data.h2, 2))}
            </p>

            <p>Das Volumen des Quaders ist:</p>
            {buildEquation([
              [
                <>
                  V<sub>Quader</sub>
                </>,
                <>=</>,
                <>
                  l · b · h<sub>1</sub>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {pp(data.länge)} · {pp(data.länge)} · {pp(data.h1)}
                </>,
              ],
              [<></>, <>=</>, <>{pp(data.länge * data.länge * data.h1)}</>],
            ])}
            <p>Das gesamte Volumen ist damit:</p>
            <p>
              {pp(roundToDigits(4 * Math.PI * data.r * data.r * data.h2, 2))} +{' '}
              {pp(data.länge * data.länge * data.h1)} ≈{' '}
              {pp(
                data.länge * data.länge * data.h1 +
                  roundToDigits(4 * Math.PI * data.r * data.r * data.h2, 2),
              )}
            </p>
            <p>
              Das Volumen beträgt:{' '}
              {pp(
                data.länge * data.länge * data.h1 +
                  roundToDigits(4 * Math.PI * data.r * data.r * data.h2, 2),
              )}{' '}
              m³
            </p>
            <p>
              <b>Gewicht des Körpers</b>
            </p>
            <p>Der Körper wiegt damit insgesamt:</p>
            <p>
              {pp(
                data.länge * data.länge * data.h1 +
                  roundToDigits(4 * Math.PI * data.r * data.r * data.h2, 2),
              )}{' '}
              m³ · {data.weight}
              {buildInlineFrac(<>kg</>, <>m³</>)} ={' '}
              {pp(
                data.weight *
                  (data.länge * data.länge * data.h1 +
                    roundToDigits(4 * Math.PI * data.r * data.r * data.h2, 2)),
              )}{' '}
              kg
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
              Der Körper soll neu gestrichen werden. Berechnen Sie den
              Flächeninhalt der sichtbaren Oberfläche, die angestrichen werden
              muss.
            </p>
          </>
        )
      },
      solution({ data }) {
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
                  M<sub>Zylinder</sub>
                </>,
                <>=</>,
                <>
                  2 · π · r · h<sub>2</sub>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  2 · π · {pp(data.r)} · {pp(data.h2)}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>{pp(roundToDigits(2 * Math.PI * data.r * data.h2, 2))}</>,
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
                      O<sub>Quader</sub>
                    </>,
                    <>=</>,
                    <>
                      M<sub>Quader</sub> + D<sub>Quader</sub>
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
                            Die 4 Seitenflächen haben jeweils die Fläche l · h
                            <sub>1</sub>
                          </Color4>
                        </span>
                      </div>
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      4 · l · h<sub>1</sub> + l · l
                    </>,
                  ],
                  [
                    <></>,
                    <>=</>,
                    <>
                      4 · {pp(data.länge)} · {pp(data.h1)} + {pp(data.länge)} ·{' '}
                      {pp(data.länge)}
                    </>,
                  ],
                  [
                    <></>,
                    <>≈</>,
                    <>
                      {pp(
                        roundToDigits(
                          4 * data.länge * data.h1 + data.länge * data.länge,
                          2,
                        ),
                      )}
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
              <div>
                <span style={{ fontSize: '0.8em' }}>
                  O = 4 · M<sub>Zylinder</sub> + O<sub>Quader</sub> ={' '}
                  {pp(roundToDigits(4 * 2 * Math.PI * data.r * data.h2, 2))} +{' '}
                  {pp(
                    roundToDigits(
                      4 * data.länge * data.h1 + data.länge * data.länge,
                      2,
                    ),
                  )}{' '}
                  ={' '}
                  {pp(
                    roundToDigits(4 * 2 * Math.PI * data.r * data.h2, 2) +
                      roundToDigits(
                        4 * data.länge * data.h1 + data.länge * data.länge,
                        2,
                      ),
                  )}
                </span>
              </div>
            </p>
          </>
        )
      },
    },
  ],
}
