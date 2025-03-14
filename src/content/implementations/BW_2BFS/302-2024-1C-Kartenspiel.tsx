import { Exercise } from '@/data/types'
import { Color4 } from '@/helper/colors'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  gesamt: number
  rot: number
}

export const exercise302: Exercise<DATA> = {
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
          <image href="/content/BW_2BFS/302.png" height="180" width="328" />
          <foreignObject x={105} y={8} width={20} height={45}>
            <div
              style={{
                fontSize: '16px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac(data.rot / data.gesamt)}
            </div>
          </foreignObject>
          <foreignObject x={266} y={90} width={25} height={45}>
            <div
              style={{
                fontSize: '16px',
                color: 'black',
                transform: 'scale(1)',
              }}
            >
              {ppFrac([data.gesamt - data.rot - 1, data.gesamt - 1])}
            </div>
          </foreignObject>
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
            <p>Ergänzen Sie die fehlenden Angaben im Baumdiagramm.</p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Ausgehend von einem Knoten ergeben die Wahrscheinlichkeiten
              zusammen immer 1.
            </p>
            <p>
              Bestimme damit zuerst die Wahrscheinlichkeit für das Ziehen einer
              schwarzen Karte:
            </p>
            <svg viewBox="0 0 328 180">
              <image href="/content/BW_2BFS/302.png" height="180" width="328" />
              <foreignObject x={105} y={8} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(1)',
                  }}
                >
                  {ppFrac(data.rot / data.gesamt)}
                </div>
              </foreignObject>
              <foreignObject x={230} y={10} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac((data.gesamt - data.rot) / data.gesamt)}
                </div>
              </foreignObject>
              <foreignObject x={266} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(1)',
                  }}
                >
                  {ppFrac([data.gesamt - data.rot - 1, data.gesamt - 1])}
                </div>
              </foreignObject>
            </svg>
            <p>
              Bestimme auf die gleiche Weise die Wahrscheinlichkeit für
              &quot;Rot&quot; im zweiten Zug, wenn zuvor schwarz gezogen wurde:
            </p>
            <svg viewBox="0 0 328 180">
              <image href="/content/BW_2BFS/302.png" height="180" width="328" />
              <foreignObject x={105} y={8} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(1)',
                  }}
                >
                  {ppFrac(data.rot / data.gesamt)}
                </div>
              </foreignObject>
              <foreignObject x={230} y={10} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac((data.gesamt - data.rot) / data.gesamt)}
                </div>
              </foreignObject>
              <foreignObject x={266} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(1)',
                  }}
                >
                  {ppFrac([data.gesamt - data.rot - 1, data.gesamt - 1])}
                </div>
              </foreignObject>
              <foreignObject x={179} y={88} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac([data.rot, data.gesamt - 1])}
                </div>
              </foreignObject>
            </svg>
            <p>
              Stell dir vor, im ersten Zug wäre rot gezogen worden. Dann wäre
              eine rote Karte weniger verfügbar, eine schwarze Karte mehr und
              die Wahrscheinlichkeiten ergeben sich zu:
            </p>
            <svg viewBox="0 0 328 180">
              <image href="/content/BW_2BFS/302.png" height="180" width="328" />
              <foreignObject x={105} y={8} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(1)',
                  }}
                >
                  {ppFrac(data.rot / data.gesamt)}
                </div>
              </foreignObject>
              <foreignObject x={230} y={10} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac((data.gesamt - data.rot) / data.gesamt)}
                </div>
              </foreignObject>
              <foreignObject x={266} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(1)',
                  }}
                >
                  {ppFrac([data.gesamt - data.rot - 1, data.gesamt - 1])}
                </div>
              </foreignObject>
              <foreignObject x={179} y={88} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac([data.rot, data.gesamt - 1])}
                </div>
              </foreignObject>
              <foreignObject x={33} y={88} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac([data.rot - 1, data.gesamt - 1])}
                </div>
              </foreignObject>
              <foreignObject x={136} y={88} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac([data.gesamt - data.rot, data.gesamt - 1])}
                </div>
              </foreignObject>
            </svg>
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
              Geben Sie an, aus wie vielen Karten das Kartenspiel insgesamt
              besteht.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>An der zweiten Stufe im Baumdiagramm kann man erkennen: </p>
            <p>Das Kartenspiel besteht aus {data.gesamt} Karten.</p>
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
              Berechnen Sie die Wahrscheinlichkeit, dass zwei schwarze Karten
              gezogen werden.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Wahrscheinlichkeit ist gegeben durch den rechten Ast im
              Baumdiagramm:
            </p>
            <svg viewBox="0 0 328 180">
              <image href="/content/BW_2BFS/302.png" height="180" width="328" />
              <foreignObject x={105} y={8} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(1)',
                  }}
                >
                  {ppFrac(data.rot / data.gesamt)}
                </div>
              </foreignObject>
              <foreignObject x={230} y={10} width={20} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac((data.gesamt - data.rot) / data.gesamt)}
                </div>
              </foreignObject>
              <foreignObject x={266} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'green',
                    transform: 'scale(1)',
                  }}
                >
                  {ppFrac([data.gesamt - data.rot - 1, data.gesamt - 1])}
                </div>
              </foreignObject>
              <foreignObject x={179} y={88} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac([data.rot, data.gesamt - 1])}
                </div>
              </foreignObject>
              <foreignObject x={33} y={88} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac([data.rot - 1, data.gesamt - 1])}
                </div>
              </foreignObject>
              <foreignObject x={136} y={88} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.8)',
                  }}
                >
                  {ppFrac([data.gesamt - data.rot, data.gesamt - 1])}
                </div>
              </foreignObject>
            </svg>
            <p>
              Berechne die Wahrscheinlichkeit P(s;s) aus den einzelnen
              Wahrscheinlichkeiten:
            </p>
            {buildEquation([
              [
                <>P(s;s)</>,
                <>=</>,
                <>
                  {ppFrac((data.gesamt - data.rot) / data.gesamt)} ·{' '}
                  {ppFrac([data.gesamt - data.rot - 1, data.gesamt - 1])}
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
                  <Color4>
                    <span style={{ fontSize: 'small' }}>
                      Kürze wenn möglich und berechne das Ergebnis
                    </span>
                  </Color4>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  {ppFrac([
                    ((data.gesamt - data.rot) * (data.gesamt - data.rot - 1)) /
                      getGcd(
                        (data.gesamt - data.rot) * (data.gesamt - data.rot - 1),
                        (data.gesamt - 1) * data.gesamt,
                      ),
                    ((data.gesamt - 1) * data.gesamt) /
                      getGcd(
                        (data.gesamt - data.rot) * (data.gesamt - data.rot - 1),
                        (data.gesamt - 1) * data.gesamt,
                      ),
                  ])}
                </>,
              ],
            ])}
          </>
        )
      },
    },
  ],
}
