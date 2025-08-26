import { Exercise } from '@/data/types'
import {
  buildEquation,
  buildInlineFrac,
  buildSqrt,
} from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  m: number
  b: number
  b_p: number
  c: number
}

export const exercise3160: Exercise<DATA> = {
  title: 'Parabel und Gerade',
  source: '2024 Wahlteil Aufgabe 4A',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      m: rng.randomItemFromArray([-1, 1]),
      b: rng.randomIntBetween(-1, 2),
      b_p: rng.randomIntBetween(-8, 1) * 2,
      c: rng.randomIntBetween(4, 10),
    }
  },
  originalData: { m: -1, b: 3, b_p: -6, c: 7 },
  constraint({ data }) {
    const p = data.b_p - data.m
    const q = data.c - data.b
    const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
    const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
    return x1 % 1 == 0 && x2 % 1 == 0 && x1 > -1 && x2 < 5
  },
  intro({ data }) {
    return (
      <>
        <p>Gegeben sind die Gerade g und die Parabel p.</p>
        <p>
          g: y ={' '}
          {ppPolynom([
            [data.m, 'x', 1],
            [data.b, 'x', 0],
          ])}
          <br></br>p: y = x² {data.b_p > 0 && <>+</>}{' '}
          {ppPolynom([
            [data.b_p, 'x', 1],
            [data.c, 'x', 0],
          ])}
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
              Zeichnen Sie die Schaubilder von g und p in ein Koordinatensystem.
              <br></br>(1 cm ≙ 1 LE; -1 ≤ x ≤ 6; -3 ≤ y ≤ 4)
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 98 + n * (185 / 7)
        }
        function toY(n: number) {
          return 133 - n * (185 / 7)
        }
        function generateParabolaPoints(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -2; x <= 7; x += step) {
            const y = x * x + b * x + c
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
          for (let x = -2; x <= 7; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(data.b_p, data.c, 0.1)
        const linePoints = generateLinePoints(data.m, data.b, 0.1)
        return (
          <>
            <svg viewBox="0 0 328 260">
              <image href="/content/BW_2BFS/310.png" height="230" width="328" />

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
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Bestimmen Sie den Schnittpunkt der Geraden g mit der y-Achse.</p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 98 + n * (185 / 7)
        }
        function toY(n: number) {
          return 133 - n * (185 / 7)
        }
        function generateParabolaPoints(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -2; x <= 7; x += step) {
            const y = x * x + b * x + c
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
          for (let x = -2; x <= 7; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints = generateParabolaPoints(data.b_p, data.c, 0.1)
        const linePoints = generateLinePoints(data.m, data.b, 0.1)
        return (
          <>
            <p>Lies den Schnittpunkt aus dem Koordinatensystem ab:</p>
            <svg viewBox="0 0 328 260">
              <image href="/content/BW_2BFS/310.png" height="230" width="328" />
              <text
                x={toX(0) + 20}
                y={toY(data.b) + 4}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                × (0|{data.b})
              </text>
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
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie die Schnittpunkte von Gerade g und Parabel p.</p>
          </>
        )
      },
      solution({ data }) {
        const p = data.b_p - data.m
        const q = data.c - data.b
        const x1 = -p / 2 + Math.sqrt((p / 2) * (p / 2) - q)
        const x2 = -p / 2 - Math.sqrt((p / 2) * (p / 2) - q)
        return (
          <>
            <p>Setze die Funktionsterme gleich und löse die Gleichung:</p>
            {buildEquation([
              [
                <>
                  y<sub>g</sub>
                </>,
                <>=</>,
                <>
                  y<sub>p</sub>
                </>,
              ],
              [
                <>
                  {ppPolynom([
                    [data.m, 'x', 1],
                    [data.b, 'x', 0],
                  ])}
                </>,
                <>=</>,
                <>
                  x² {data.b_p > 0 && <>+</>}{' '}
                  {ppPolynom([
                    [data.b_p, 'x', 1],
                    [data.c, 'x', 0],
                  ])}
                </>,
                <>| {data.m == 1 ? <>-</> : <>+</>} x</>,
              ],
              [
                <>{pp(data.b)}</>,
                <>=</>,
                <>
                  x² {data.b_p > 0 && <>+</>}{' '}
                  {ppPolynom([
                    [data.b_p - data.m, 'x', 1],
                    [data.c, 'x', 0],
                  ])}
                </>,
                <>| {pp(-data.b, 'merge_op')} </>,
              ],
              [
                <>0</>,
                <>=</>,
                <>
                  x² {data.b_p > 0 && <>+</>}{' '}
                  {ppPolynom([
                    [data.b_p - data.m, 'x', 1],
                    [data.c - data.b, 'x', 0],
                  ])}
                </>,
              ],
            ])}
            <p>
              Löse diese quadratische Gleichung mit der pq-Formel. Bestimme dazu
              p und q: <br></br>p = {pp(p)}, q = {pp(q)}
            </p>
            {buildEquation([
              [
                <>
                  x<sub>1/2</sub>
                </>,
                <>=</>,
                <>
                  −{buildInlineFrac('p', 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac('p', 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −
                      q
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  −{buildInlineFrac(p, 2)} ±{' '}
                  {buildSqrt(
                    <>
                      <span className="inline-block  scale-y-[2.6]">(</span>
                      {buildInlineFrac(p, 2)}
                      <span className="inline-block  scale-y-[2.6]">)</span>² −{' '}
                      {q < 0 && <>(</>}
                      {pp(q)}
                      {q < 0 && <>)</>}
                    </>,
                  )}
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <>
                    <span style={{ verticalAlign: 'middle' }}>
                      {pp(-p / 2)} ±{' '}
                    </span>
                    {buildSqrt(pp((p / 2) * (p / 2) - q))}
                  </>
                </>,
              ],
              [
                <></>,
                <>=</>,
                <>
                  <>
                    <span style={{ verticalAlign: 'middle' }}>
                      {pp(-p / 2)} ±{' '}
                    </span>
                    {pp(Math.sqrt((p / 2) * (p / 2) - q))}
                  </>
                </>,
              ],
            ])}

            <p>
              x<sub>1</sub> = {pp(-p / 2)} +{' '}
              {pp(Math.sqrt((p / 2) * (p / 2) - q))} = {pp(x1)}
            </p>
            <p>
              x<sub>2</sub> = {pp(-p / 2)} -{' '}
              {pp(Math.sqrt((p / 2) * (p / 2) - q))} = {pp(x2)}
            </p>
            <p>
              Berechne die y-Werte der Schnittpunkte. Tipp: Mit beiden
              Funktionen erhältst du die gleichen y-Werte.
            </p>
            <p>
              y<sub>1</sub> = {pp(data.m * x1)} + {data.b} ={' '}
              {pp(data.m * x1 + data.b)}
              <br></br>y<sub>2</sub> = {pp(data.m * x2)} + {data.b} ={' '}
              {pp(data.m * x2 + data.b)}
            </p>
            <p>
              Damit sind die Schnittpunkte: <br></br>P<sub>1</sub>({pp(x1)}|
              {pp(data.m * x1 + data.b)}) P<sub>2</sub>({pp(x2)}|
              {pp(data.m * x2 + data.b)})
            </p>
          </>
        )
      },
    },
  ],
}
