import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  radius: number
  höhe: number
  ring: number
}

export const exercise3157: Exercise<DATA> = {
  title: 'Zusammengesetzter Körper',
  source: '2024 Wahlteil Aufgabe 3A',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      radius: rng.randomIntBetween(4, 12),
      höhe: rng.randomIntBetween(1, 5) * 5,
      ring: rng.randomIntBetween(1, 8),
    }
  },
  originalData: { radius: 10, höhe: 15, ring: 6 },
  constraint({ data }) {
    return data.ring < data.radius
  },
  intro({ data }) {
    return (
      <>
        <p>
          Ein Turm besteht aus einem Zylinder und einer aufgesetzten Halbkugel
          als Kuppe. Die Höhe des Zylinders beträgt {data.höhe} m, der Radius
          von Halbkugel und Zylinder beträgt jeweils {data.radius} m.
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
              Der gesamte Turm wird beheizt. Berechnen Sie das zu beheizende
              Volumen.
            </p>
          </>
        )
      },
      solution({ data }) {
        const zylinder = roundToDigits(
          Math.PI * data.radius * data.radius * data.höhe,
          2,
        )
        const halbkugel = roundToDigits(
          (2 / 3) * Math.PI * data.radius * data.radius * data.radius,
          2,
        )
        return (
          <>
            <p>Tipp: Oft ist es hilfreich sich eine Skizze anzulegen.</p>
            <svg viewBox="0 0 328 180">
              <image href="/content/BW_2BFS/307.png" height="180" width="328" />
              <text
                x={225}
                y={120}
                fontSize={18}
                textAnchor="right"
                stroke="black"
              >
                {data.höhe} m
              </text>
              <text
                x={168}
                y={68}
                fontSize={18}
                textAnchor="right"
                stroke="black"
              >
                {data.radius} m
              </text>
            </svg>
            <p>Berechne jeweils das Volumen mit der Formel:</p>
            {buildEquation([
              [
                <>
                  V<sub>Zylinder</sub>
                </>,
                <>=</>,
                <>π · r² · h</>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  π · {data.radius}² · {data.höhe}
                </>,
              ],
              [<></>, <>≈</>, <>{pp(zylinder)}</>],
            ])}
            <p>Das Volumen des Zylinders beträgt {pp(zylinder)} m³.</p>
            {buildEquation([
              [
                <>
                  V<sub>Halbkugel</sub>
                </>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>{buildInlineFrac(<>4</>, <>3</>)}π · r³</>,
                    <>2</>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>
                      {buildInlineFrac(<>4</>, <>3</>)}π · {data.radius}³
                    </>,
                    <>2</>,
                  )}
                </>,
              ],
              [<></>, <>≈</>, <>{pp(halbkugel)}</>],
            ])}
            <p>Das Volumen der Halbkugel beträgt {pp(halbkugel)} m³.</p>
            <p>Zusammen ist das Volumen des Turms:</p>
            <p>
              {pp(zylinder)} m³ + {pp(halbkugel)} m³ ={' '}
              <b>{pp(zylinder + halbkugel)} m³</b>
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
            <p>Berechnen Sie den Oberflächeninhalt der Kuppel.</p>
          </>
        )
      },
      solution({ data }) {
        const halbkugel = roundToDigits(
          2 * Math.PI * data.radius * data.radius,
          2,
        )
        return (
          <>
            <p>
              Die Kuppel stellt eine halbe Kugeloberfläche dar. Berechne den
              Flächeninhalt mit der Formel:
            </p>
            {buildEquation([
              [
                <>
                  O<sub>Halbkugel</sub>
                </>,
                <>=</>,
                <>{buildInlineFrac(<>4 · π · r²</>, <>2</>)}</>,
              ],
              [
                <></>,
                <>=</>,
                <>{buildInlineFrac(<>4 · π · {data.radius}²</>, <>2</>)}</>,
              ],
              [<></>, <>≈</>, <>{pp(halbkugel)}</>],
            ])}
            <p>Die Oberfläche beträgt {pp(halbkugel)} m².</p>
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
              Die Kuppel hat in {data.ring} m Höhe einen Befestigungsring für
              Lampen. Siehe Abbildung.
            </p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/BW_2BFS/307_2.png"
                height="110"
                width="328"
              />

              <text
                x={164}
                y={68}
                fontSize={12}
                textAnchor="right"
                stroke="black"
              >
                {data.ring} m
              </text>
              <text
                x={190}
                y={84}
                fontSize={12}
                textAnchor="right"
                stroke="black"
              >
                {data.radius} m
              </text>
            </svg>
            <p>
              Berechnen Sie den Radius r<sub>B</sub>.
            </p>
          </>
        )
      },
      solution({ data }) {
        const ergebnis = roundToDigits(
          Math.sqrt(data.radius * data.radius - data.ring * data.ring),
          2,
        )
        return (
          <>
            <p>
              Berechne r<sub>B</sub> im rechtwinkligen Dreieck:
            </p>
            <svg viewBox="0 0 328 110">
              <image
                href="/content/BW_2BFS/307_3.png"
                height="110"
                width="328"
              />

              <text
                x={166}
                y={74}
                fontSize={12}
                textAnchor="right"
                stroke="black"
              >
                {data.ring} m
              </text>
              <text
                x={200}
                y={84}
                fontSize={12}
                textAnchor="right"
                stroke="black"
              >
                {data.radius} m
              </text>
            </svg>
            <p>
              Dabei ist die längste Seite des Dreiecks gerade der Radius der
              Halbkugel.
            </p>
            <p>Rechne mit dem Satz des Pythagoras:</p>
            {buildEquation([
              [
                <>{data.radius}²</>,
                <>=</>,
                <>
                  r<sub>B</sub>² + {data.ring}²
                </>,
              ],
              [
                <>{data.radius * data.radius}</>,
                <>=</>,
                <>
                  r<sub>B</sub>² + {data.ring * data.ring}
                </>,
                <>| - {data.ring * data.ring}</>,
              ],
              [
                <>
                  r<sub>B</sub>²
                </>,
                <>=</>,
                <>
                  {data.radius * data.radius} - {data.ring * data.ring}
                </>,
                <>| √</>,
              ],
              [
                <>
                  r<sub>B</sub>
                </>,
                <>=</>,
                <>
                  {buildSqrt(data.radius * data.radius - data.ring * data.ring)}
                </>,
              ],
              [
                <>
                  r<sub>B</sub>
                </>,
                <>{ergebnis % 1 == 0 ? <>=</> : <>≈</>}</>,
                <>{pp(ergebnis)}</>,
              ],
            ])}
            <p>
              Der Radius in {data.ring} m Höhe beträgt {pp(ergebnis)} m.
            </p>
          </>
        )
      },
    },
  ],
}
