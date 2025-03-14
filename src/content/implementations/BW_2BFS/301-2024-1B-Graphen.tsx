import { Exercise } from '@/data/types'
import { Color2, Color3 } from '@/helper/colors'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp, ppFrac, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  x_s: number
  y_s: number
  m: number
  b: number
  verzerrung: number
}

export const exercise301: Exercise<DATA> = {
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
  intro({ data }) {
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

        return (
          <>
            <p>
              Gegeben sind die Parabel p mit <br></br> y = (x{' '}
              {pp(-data.x_s, 'merge_op')})² {pp(data.y_s, 'merge_op')} und die
              Gerade g mit <br></br>y ={' '}
              {data.m % 1 == 0 ? (
                <>
                  {ppPolynom([
                    [data.m, 'x', 1],
                    [data.b, 'x', 0],
                  ])}
                </>
              ) : (
                <>
                  {ppFrac(data.m)}x {pp(data.b, 'merge_op')}
                </>
              )}{' '}
              sowie deren Schaubilder.
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
      task({ data }) {
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
              Es hilft den Scheitelpunkt der Parabel <br></br>S({pp(data.x_s)}|
              {pp(data.y_s)}) zu bestimmen, um die Skalierung herauszufinden.
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
                      key={i}
                      x={toX(i)}
                      y={toY(0)}
                      fontSize={5}
                      textAnchor="middle"
                      stroke="black"
                    >
                      |
                    </text>
                    <text
                      key={i}
                      x={toX(i)}
                      y={toY(0) + 17}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {i}
                    </text>
                    <text
                      key={i}
                      x={toX(0) + 15}
                      y={toY(itop)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {itop}
                    </text>
                    <text
                      key={i}
                      x={toX(0) + 15}
                      y={toY(ibot)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {ibot}
                    </text>
                    <text
                      key={i}
                      x={toX(0)}
                      y={toY(itop) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                    <text
                      key={i}
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
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Beschreiben Sie, wie die Parabel p aus der Normalparabel mit y =
              x² entsteht.
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
                {data.x_s < 0 ? <>links</> : <>rechts</>} verschoben: <br></br>y
                = x² wird zu y = (x <Color2>{pp(-data.x_s, 'merge_op')}</Color2>
                )²
              </li>
              <li>
                um <Color3>{Math.abs(data.y_s)}</Color3>{' '}
                {Math.abs(data.y_s) == 1 ? <>Einheit</> : <>Einheiten</>} nach{' '}
                {data.y_s < 0 ? <>unten</> : <>oben</>} verschoben:<br></br>y =
                (x <Color2>{pp(-data.x_s, 'merge_op')}</Color2>
                )² wird zu y = (x <Color2>
                  {pp(-data.x_s, 'merge_op')}
                </Color2>)² <Color3>{pp(data.y_s, 'merge_op')}</Color3>
              </li>
            </ol>
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
        const p = 2 * data.x_s - data.m
        const q = data.x_s * data.x_s + data.y_s - data.b
        const dis = (p / 2) * (p / 2) - q
        return (
          <>
            <p>
              Die Gerade h soll parallel zur Gerade g verlaufen:<br></br>y<sub>h</sub> ={' '}
              {ppPolynom([[data.m,'x',1]])} + b
            </p>
            <p>
              Wähle den y-Achsenabschnitt so klein, dass die Gerade unter der
              Parabel durchläuft:
            </p>
            <p>
              Zum Beispiel: y<sub>h</sub> = {ppPolynom([[data.m,'x',1],[-data.m * data.x_s - 1 + data.y_s,'x',0]])}{' '}
              
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
                      key={i}
                      x={toX(i)}
                      y={toY(0)}
                      fontSize={5}
                      textAnchor="middle"
                      stroke="black"
                    >
                      |
                    </text>
                    <text
                      key={i}
                      x={toX(i)}
                      y={toY(0) + 17}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {i}
                    </text>
                    <text
                      key={i}
                      x={toX(0) + 15}
                      y={toY(itop)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {itop}
                    </text>
                    <text
                      key={i}
                      x={toX(0) + 15}
                      y={toY(ibot)}
                      fontSize={15}
                      textAnchor="middle"
                      stroke="black"
                    >
                      {ibot}
                    </text>
                    <text
                      key={i}
                      x={toX(0)}
                      y={toY(itop) + 2}
                      fontSize={10}
                      textAnchor="middle"
                      stroke="black"
                    >
                      -
                    </text>
                    <text
                      key={i}
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
