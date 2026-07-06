import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation } from '@/helper/math-builder'
import { InlineMath } from 'react-katex'

interface DATA {
  gesamt: number
  rot: number
}

export const exercise3152: Exercise<DATA> = {
  title: 'Kartenspiel',
  source: '2024 Pflichtteil Aufgabe 1C',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      gesamt: rng.randomIntBetween(10, 16) * 2,
      rot: rng.randomIntBetween(7, 9) * 2,
    }
  },
  originalData: { gesamt: 32, rot: 16 },
  constraint({ data }) {
    return getGcd(data.gesamt, data.gesamt - data.rot) != 1
  },
  intro({ data }) {
    return (
      <>
        <p>
          Ein Kartenspiel besteht aus roten (R) und schwarzen (S) Karten. Es
          werden zwei Karten nacheinander gezogen. Dabei ergibt sich folgendes
          Baumdiagramm.
        </p>

        <svg viewBox="0 0 328 180">
          <image href="/content/Mathe_2BFS2/302.png" height="180" width="328" />

          {/* P(R) */}
          <foreignObject x={105} y={20} width={20} height={45}>
            <div
              style={{
                fontSize: '16px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              <InlineMath math={`\\tfrac{${data.rot}}{${data.gesamt}}`} />
            </div>
          </foreignObject>

          {/* P(S|S) */}
          <foreignObject x={266} y={97} width={25} height={45}>
            <div
              style={{
                fontSize: '16px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              <InlineMath
                math={`\\tfrac{${data.gesamt - data.rot - 1}}{${data.gesamt - 1}}`}
              />
            </div>
          </foreignObject>
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
            <p>Ergänzen Sie die fehlenden Angaben im Baumdiagramm.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {/* Schritt 3: zweiter Ast nach Rot im 1. Zug */}
            <svg viewBox="0 0 328 180">
              <image
                href="/content/Mathe_2BFS2/302.png"
                height="180"
                width="328"
              />

              {/* P(R) */}
              <foreignObject x={105} y={20} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(1)',
                  }}
                >
                  <InlineMath math={`\\tfrac{${data.rot}}{${data.gesamt}}`} />
                </div>
              </foreignObject>

              {/* P(S) */}
              <foreignObject x={230} y={20} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.gesamt - data.rot}}{${data.gesamt}}`}
                  />
                </div>
              </foreignObject>

              {/* P(S|S) */}
              <foreignObject x={266} y={97} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(1)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.gesamt - data.rot - 1}}{${data.gesamt - 1}}`}
                  />
                </div>
              </foreignObject>

              {/* P(R|S) */}
              <foreignObject x={179} y={97} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.rot}}{${data.gesamt - 1}}`}
                  />
                </div>
              </foreignObject>

              {/* P(R|R) – markiert */}
              <foreignObject x={33} y={97} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(0.8)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.rot - 1}}{${data.gesamt - 1}}`}
                  />
                </div>
              </foreignObject>

              {/* P(S|R) – markiert */}
              <foreignObject x={136} y={97} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(0.8)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.gesamt - data.rot}}{${data.gesamt - 1}}`}
                  />
                </div>
              </foreignObject>
            </svg>
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
              Geben Sie an, aus wie vielen Karten das Kartenspiel insgesamt
              besteht.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>An den Brüchen kann man erkennen: </p>
            <p>Das Kartenspiel besteht aus {data.gesamt} Karten.</p>
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
              Berechnen Sie die Wahrscheinlichkeit, dass zwei schwarze Karten
              gezogen werden.
            </p>
          </>
        )
      },
      solution({ data }) {
        // gekürzte Produkt-Bruchform
        const numUnred = (data.gesamt - data.rot) * (data.gesamt - data.rot - 1)
        const denUnred = (data.gesamt - 1) * data.gesamt
        const g = getGcd(numUnred, denUnred)
        const num = numUnred / g
        const den = denUnred / g

        return (
          <>
            <p>
              Die Wahrscheinlichkeit ist gegeben durch den rechten Ast im
              Baumdiagramm:
            </p>

            {/* Markierung der relevanten Äste */}
            <svg viewBox="0 0 328 180">
              <image
                href="/content/Mathe_2BFS2/302.png"
                height="180"
                width="328"
              />

              {/* P(R) */}
              <foreignObject x={105} y={20} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(1)',
                  }}
                >
                  <InlineMath math={`\\tfrac{${data.rot}}{${data.gesamt}}`} />
                </div>
              </foreignObject>

              {/* P(S) – markiert */}
              <foreignObject x={230} y={20} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(0.8)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.gesamt - data.rot}}{${data.gesamt}}`}
                  />
                </div>
              </foreignObject>

              {/* P(S|S) – markiert */}
              <foreignObject x={266} y={97} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(1)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.gesamt - data.rot - 1}}{${data.gesamt - 1}}`}
                  />
                </div>
              </foreignObject>

              {/* P(R|S) */}
              <foreignObject x={179} y={97} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.rot}}{${data.gesamt - 1}}`}
                  />
                </div>
              </foreignObject>

              {/* P(R|R) */}
              <foreignObject x={33} y={97} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.rot - 1}}{${data.gesamt - 1}}`}
                  />
                </div>
              </foreignObject>

              {/* P(S|R) */}
              <foreignObject x={136} y={97} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  <InlineMath
                    math={`\\tfrac{${data.gesamt - data.rot}}{${data.gesamt - 1}}`}
                  />
                </div>
              </foreignObject>
            </svg>

            <p>
              Berechne die Wahrscheinlichkeit P(s,s) aus den einzelnen
              Wahrscheinlichkeiten:
            </p>
            {buildEquation([
              [
                <>
                  <InlineMath math="P(s,s)" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\tfrac{${data.gesamt - data.rot}}{${data.gesamt}}\\,\\cdot\\,\\tfrac{${data.gesamt - data.rot - 1}}{${data.gesamt - 1}}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <Color4>
                    <span className="inline-block  scale-y-[1.5]">↓</span>
                  </Color4>
                </>,
                <>
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Kürze wenn möglich und berechne das Ergebnis
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
                  <InlineMath math={`\\tfrac{${num}}{${den}}`} />
                </>,
              ],
            ])}
          </>
        )
      },
    },
  ],
}
