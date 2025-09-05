import { Exercise } from '@/data/types'
import { Color2, Color3 } from '@/helper/colors'
import { InlineMath } from 'react-katex'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'
import { polyToLatex } from '@/helper/pp-latex'

interface DATA {
  x_s: number
  y_s: number
  m: number
  b: number
  verzerrung: number
}

export const exercise3151: Exercise<DATA> = {
  title: 'Graphen',
  source: '2024 Pflichtteil Aufgabe 1B',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      x_s: rng.randomIntBetween(-3, 3),
      y_s: rng.randomIntBetween(-3, 3),
      m: rng.randomIntBetween(-3, 3) / 2,
      b: rng.randomIntBetween(-3, 3),
      verzerrung: rng.randomIntBetween(1, 2),
    }
  },
  originalData: { x_s: -1, y_s: -3, m: -0.5, b: 1, verzerrung: 2 },
  constraint({ data }) {
    const p = 2 * -data.x_s - data.m
    const q = data.x_s * data.x_s + data.y_s - data.b
    return (
      data.x_s != 0 &&
      data.y_s != 0 &&
      data.m != 0 &&
      data.b != 0 &&
      (p / 2) * (p / 2) - q > 0
    )
  },
  intro() {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        function toX(n: number) {
          return 167 + data.verzerrung * n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - data.verzerrung * n * ((94.5 * 2) / 10)
        }
        function generateParabolaPoints(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -11; x <= 11; x += step) {
            const y = (x - b) * (x - b) + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -11; x <= 11; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(data.x_s, data.y_s, 0.1)
        const linePoints = generateLinePoints(data.m, data.b, 0.1)

        // Text unverändert, nur Formeln via KaTeX
        const parabLatex = `y = (x ${pp(-data.x_s, 'merge_op')})^{2} ${pp(
          data.y_s,
          'merge_op',
        )}`
        const lineLatex =
          data.m % 1 == 0
            ? String(
                polyToLatex([
                  [data.m, 'x', 1],
                  [data.b, 'x', 0],
                ]),
              )
            : `${ppFrac(data.m)}x ${pp(data.b, 'merge_op')}`

        return (
          <>
            <p>
              Gegeben sind die Parabel p mit <br />
              <InlineMath math={parabLatex} /> und die Gerade g mit <br />
              <InlineMath math={`y = ${lineLatex}`} /> sowie deren Schaubilder.
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksblanko.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={linePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </>
        )
      },
      task() {
        return (
          <>
            <p>
              Übertragen Sie das Koordinatensystem und die Graphen auf Papier.
            </p>
            <p>
              Beschriften und skalieren Sie die Achsen des Koordinatensystems.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + data.verzerrung * n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - data.verzerrung * n * ((94.5 * 2) / 10)
        }
        function generateParabolaPoints(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -11; x <= 11; x += step) {
            const y = (x - b) * (x - b) + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -11; x <= 11; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(data.x_s, data.y_s, 0.1)
        const linePoints = generateLinePoints(data.m, data.b, 0.1)

        return (
          <>
            <p>
              Es hilft den Scheitelpunkt der Parabel <br />
              <InlineMath math={`S(${pp(data.x_s)}\\mid ${pp(data.y_s)})`} /> zu
              bestimmen, um die Skalierung herauszufinden.
            </p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksblanko.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={linePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={150}
                y={15}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                y
              </text>
              <text
                x={300}
                y={153}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              {Array.from({ length: 40 }, (_, index) => {
                const i = index - 20
                const itop = index + 1
                const ibot = index - 40
                return (
                  <>
                    <text
                      key={`tick-x-${i}`}
                      x={toX(i)}
                      y={toY(0)}
                      fontSize={5}
                      textAnchor="middle"
                      stroke="black"
                    >
                      |
                    </text>
                    <text
                      key={`label-x-${i}`}
                      x={toX(i)}
                      y={toY(0) + 17}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {i}
                    </text>
                    <text
                      key={`label-y-top-${i}`}
                      x={toX(0) + 15}
                      y={toY(itop)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {itop}
                    </text>
                    <text
                      key={`label-y-bot-${i}`}
                      x={toX(0) + 15}
                      y={toY(ibot)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {ibot}
                    </text>
                    <text
                      key={`dash-y-top-${i}`}
                      x={toX(0)}
                      y={toY(itop) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                    <text
                      key={`dash-y-bot-${i}`}
                      x={toX(0)}
                      y={toY(ibot) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                  </>
                )
              })}
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
              Beschreiben Sie, wie die Parabel p aus der Normalparabel mit{' '}
              <InlineMath math="y=x^{2}" /> entsteht.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Parabel wurde...</p>
            <ol>
              <li>
                um <Color2>{Math.abs(data.x_s)}</Color2>{' '}
                {Math.abs(data.x_s) == 1 ? <>Einheit</> : <>Einheiten</>} nach{' '}
                {data.x_s < 0 ? <>links</> : <>rechts</>} verschoben: <br />
                <InlineMath math="y=x^{2}" /> wird zu<br></br>{' '}
                <InlineMath
                  math={`y=(x \\color{green}${pp(-data.x_s, 'merge_op')}\\color{black})^{2}`}
                />
              </li>
              <li>
                um <Color3>{Math.abs(data.y_s)}</Color3>{' '}
                {Math.abs(data.y_s) == 1 ? <>Einheit</> : <>Einheiten</>} nach{' '}
                {data.y_s < 0 ? <>unten</> : <>oben</>} verschoben:
                <br />
                <InlineMath
                  math={`y=(x ${pp(-data.x_s, 'merge_op')})^{2}`}
                />{' '}
                wird zu<br></br>{' '}
                <InlineMath
                  math={`y=(x ${pp(-data.x_s, 'merge_op')})^{2} \\color{orange}${pp(
                    data.y_s,
                    'merge_op',
                  )}`}
                />
              </li>
            </ol>
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
              Geben Sie die Gleichung einer Geraden h an, die parallel zur
              Geraden g verläuft und die Parabel nicht schneidet.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + data.verzerrung * n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - data.verzerrung * n * ((94.5 * 2) / 10)
        }
        function generateParabolaPoints(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -11; x <= 11; x += step) {
            const y = (x - b) * (x - b) + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -11; x <= 11; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateLine2Points(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -11; x <= 11; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(data.x_s, data.y_s, 0.1)
        const linePoints = generateLinePoints(data.m, data.b, 0.1)
        const line2Points = generateLine2Points(
          data.m,
          -data.m * data.x_s - 1 + data.y_s,
          0.1,
        )

        // (p,q,dis) bleiben wie im Original berechnet (nicht weiter verwendet)
        const p = 2 * data.x_s - data.m
        const q = data.x_s * data.x_s + data.y_s - data.b
        const dis = (p / 2) * (p / 2) - q
        void dis

        return (
          <>
            <p>
              Die Gerade h soll parallel zur Gerade g verlaufen:
              <br />
              <InlineMath
                math={`y_{h} = ${String(polyToLatex([[data.m, 'x', 1]]))} + b`}
              />
            </p>
            <p>
              Wähle den y-Achsenabschnitt so klein, dass die Gerade unter der
              Parabel durchläuft:
            </p>
            <p>
              Zum Beispiel:{' '}
              <InlineMath
                math={`y_{h} = ${String(
                  polyToLatex([[data.m, 'x', 1]]),
                )} ${pp(-data.m * data.x_s - 1 + data.y_s, 'merge_op')}`}
              />
            </p>

            <p>Tipp: Das lässt sich mit einer Skizze auch überprüfen.</p>

            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksblanko.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={linePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={line2Points}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={150}
                y={15}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                y
              </text>
              <text
                x={300}
                y={153}
                fontSize={20}
                textAnchor="right"
                stroke="black"
              >
                x
              </text>
              {Array.from({ length: 40 }, (_, index) => {
                const i = index - 20
                const itop = index + 1
                const ibot = index - 40
                return (
                  <>
                    <text
                      key={`tick-x-${i}`}
                      x={toX(i)}
                      y={toY(0)}
                      fontSize={5}
                      textAnchor="middle"
                      stroke="black"
                    >
                      |
                    </text>
                    <text
                      key={`label-x-${i}`}
                      x={toX(i)}
                      y={toY(0) + 17}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {i}
                    </text>
                    <text
                      key={`label-y-top-${i}`}
                      x={toX(0) + 15}
                      y={toY(itop)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {itop}
                    </text>
                    <text
                      key={`label-y-bot-${i}`}
                      x={toX(0) + 15}
                      y={toY(ibot)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {ibot}
                    </text>
                    <text
                      key={`dash-y-top-${i}`}
                      x={toX(0)}
                      y={toY(itop) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                    <text
                      key={`dash-y-bot-${i}`}
                      x={toX(0)}
                      y={toY(ibot) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                  </>
                )
              })}
            </svg>
          </>
        )
      },
    },
  ],
}
