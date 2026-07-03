import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { InlineMath } from 'react-katex'

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
          als Kuppe. Die Höhe des Zylinders beträgt{' '}
          <InlineMath math={`{${data.höhe}}  ~\\text{m}`} />, der Radius von
          Halbkugel und Zylinder beträgt jeweils{' '}
          <InlineMath math={`{${data.radius}} ~\\text{m}`} /> .
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
      task() {
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
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math="\pi\cdot r^{2}\cdot h" />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\pi\\cdot ${data.radius}^{2}\\cdot ${data.höhe}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="\approx" />
                </>,
                <>
                  <InlineMath math={pp(zylinder)} />
                </>,
              ],
            ])}

            <p>
              Das Volumen des Zylinders beträgt{' '}
              <InlineMath math={`${pp(zylinder)}~\\text{m³}`} /> .
            </p>

            {buildEquation([
              [
                <>
                  V<sub>Halbkugel</sub>
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math="\dfrac{\frac{4}{3}\pi r^{3}}{2}" />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\dfrac{\\frac{4}{3}\\pi ${data.radius}^{3}}{2}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="\approx" />
                </>,
                <>
                  <InlineMath math={pp(halbkugel)} />
                </>,
              ],
            ])}

            <p>
              Das Volumen der Halbkugel beträgt{' '}
              <InlineMath math={`${pp(halbkugel)}~\\text{m³}`} /> .
            </p>

            <p>Zusammen ist das Volumen des Turms:</p>
            <p>
              <InlineMath
                math={`${pp(zylinder)}~\\text{m³} + ${pp(halbkugel)}~\\text{m³} =
                ${pp(zylinder + halbkugel)}~\\text{m³}`}
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
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math="\dfrac{4\cdot\pi\cdot r^{2}}{2}" />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\dfrac{4\\cdot\\pi\\cdot ${data.radius}^{2}}{2}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="\approx" />
                </>,
                <>
                  <InlineMath math={pp(halbkugel)} />
                </>,
              ],
            ])}

            <p>
              Die Oberfläche beträgt{' '}
              <InlineMath math={`${pp(halbkugel)}~\\text{m²}`} />.
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
      task({ data }) {
        return (
          <>
            <p>
              Die Kuppel hat in <InlineMath math={`${data.ring} ~\\text{m}`} />{' '}
              Höhe einen Befestigungsring für Lampen. Siehe Abbildung.
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
                <>
                  <InlineMath math={`${data.radius}^{2}`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`r_{B}^{2} + ${data.ring}^{2}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={`${data.radius * data.radius}`} />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={`r_{B}^{2} + ${data.ring * data.ring}`} />
                </>,
                <>| − {data.ring * data.ring}</>,
              ],
              [
                <>
                  <InlineMath math="r_{B}^{2}" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`${data.radius * data.radius} - ${data.ring * data.ring}`}
                  />
                </>,
                <>
                  | <InlineMath math="\sqrt{\\ }" />
                </>,
              ],
              [
                <>
                  <InlineMath math="r_{B}" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\sqrt{${data.radius * data.radius - data.ring * data.ring}}`}
                  />
                </>,
              ],
              [
                <>
                  <InlineMath math="r_{B}" />
                </>,
                <>
                  {ergebnis % 1 === 0 ? (
                    <InlineMath math="=" />
                  ) : (
                    <InlineMath math="\approx" />
                  )}
                </>,
                <>
                  <InlineMath math={pp(ergebnis)} />
                </>,
              ],
            ])}

            <p>
              Der Radius in <InlineMath math={`${data.ring}~\\text{m}`} /> Höhe
              beträgt <InlineMath math={`${pp(ergebnis)}~\\text{m}`} /> .
            </p>
          </>
        )
      },
    },
  ],
}
