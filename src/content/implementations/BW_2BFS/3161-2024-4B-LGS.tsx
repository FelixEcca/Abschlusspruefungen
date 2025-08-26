import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  coeff1: number
  coeff2: number
  cons: number
  m_2: number
  m_3: number
  cons_2: number
}

export const exercise3161: Exercise<DATA> = {
  title: 'LGS',
  source: '2024 Wahlteil Aufgabe 4B',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      coeff1: rng.randomIntBetween(1, 3),
      coeff2: rng.randomIntBetween(1, 3),
      cons: rng.randomIntBetween(-6, 4),
      m_2: rng.randomIntBetween(2, 4),
      m_3: rng.randomIntBetween(-4, 4),
      cons_2: rng.randomIntBetween(-3, 4),
    }
  },
  originalData: { coeff1: 1, coeff2: 2, cons: -3, m_2: 2, m_3: -2, cons_2: -1 },
  constraint({ data }) {
    return (
      data.coeff2 != 1 &&
      (data.cons / (data.coeff1 - data.coeff2 * data.m_2)) % 1 == 0 &&
      data.cons != 0 &&
      data.m_3 != 0 &&
      data.m_2 != 0
    )
  },
  intro({ data }) {
    return <></>
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
              Gegeben ist ein lineares Gleichungssystem (LGS).<br></br>Berechnen
              Sie die Lösung.
            </p>
            <p>
              (I) {ppPolynom([[data.coeff1, 'x', 1]])} ={' '}
              {ppPolynom([
                [data.coeff2, 'y', 1],
                [data.cons, 'y', 0],
              ])}
              <br></br>(II) y = {ppPolynom([[data.m_2, 'x', 1]])}
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Setze {ppPolynom([[data.m_2, 'x', 1]])} für y in der ersten
              Gleichung ein:
            </p>
            <p>
              (I) {ppPolynom([[data.coeff1, 'x', 1]])} = {pp(data.coeff2)} ·{' '}
              {ppPolynom([[data.m_2, 'x', 1]])} {pp(data.cons, 'merge_op')}{' '}
            </p>
            <p>Löse diese Gleichung:</p>
            {buildEquation([
              [
                <>{ppPolynom([[data.coeff1, 'x', 1]])}</>,
                <>=</>,
                <>
                  {pp(data.coeff2)} · {ppPolynom([[data.m_2, 'x', 1]])}{' '}
                  {pp(data.cons, 'merge_op')}
                </>,
              ],
              [
                <>{ppPolynom([[data.coeff1, 'x', 1]])}</>,
                <>=</>,
                <>
                  {ppPolynom([[data.coeff2 * data.m_2, 'x', 1]])}{' '}
                  {pp(data.cons, 'merge_op')}
                </>,
                <>| {ppPolynom([[-data.coeff2 * data.m_2, 'x', 1]])}</>,
              ],
              [
                <>
                  {ppPolynom([[data.coeff1 - data.coeff2 * data.m_2, 'x', 1]])}
                </>,
                <>=</>,
                <>{pp(data.cons, 'merge_op')}</>,
                <>
                  | : {pp(data.coeff1 - data.coeff2 * data.m_2, 'embrace_neg')}
                </>,
              ],
              [
                <>x</>,
                <>=</>,
                <>{pp(data.cons / (data.coeff1 - data.coeff2 * data.m_2))}</>,
              ],
            ])}
            <p>
              Um den Wert von y zu bestimmen, setze x in eine der Gleichungen
              ein.{' '}
            </p>
            <p>
              x in (II): y = {pp(data.m_2)} ·{' '}
              {pp(data.cons / (data.coeff1 - data.coeff2 * data.m_2))} ={' '}
              {pp(
                (data.m_2 * data.cons) / (data.coeff1 - data.coeff2 * data.m_2),
              )}
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
              Gegeben ist ein anderes, unvollständiges LGS mit:<br></br>
            </p>
            <p>
              (I) y ={' '}
              {ppPolynom([
                [data.m_3, 'x', 1],
                [data.cons_2, 'x', 0],
              ])}
              <br></br>(II) &nbsp;&nbsp;=
            </p>
            <p>
              Stellen Sie Gleichung (I) grafisch in einem Koordinatensystem dar.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * (284 / 16)
        }
        function toY(n: number) {
          return 154 - n * (284 / 16)
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const LinePoints = generateLinePoints(data.m_3, data.cons_2, 0.1)
        return (
          <>
            <p>Zeichne die Gerade in ein Koordinatensystem ein.</p>
            <svg viewBox="0 0 328 310">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="310"
                width="328"
              />
              <polyline
                points={LinePoints}
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
            <p>
              Geben Sie eine zweite Gleichung (II) an, sodass das LGS aus (b)
              keine Lösung hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Eine mögliche Lösung ist:</p>
            <p>
              <p>
                (I) y ={' '}
                {ppPolynom([
                  [data.m_3, 'x', 1],
                  [data.cons_2, 'x', 0],
                ])}
                <br></br>(II) y ={' '}
                {ppPolynom([
                  [data.m_3, 'x', 1],
                  [data.cons_2 + 1, 'x', 0],
                ])}
              </p>
            </p>
            <p>Subtrahiert man die Gleichungen, erhält man:</p>
            <p>(II) - (I): 0 = 1</p>
            <p>Das LGS hat also keine Lösung.</p>
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
              Stellen Sie eine mögliche Gleichung (II) grafisch in dem vorhanden
              Koordinatensystem dar, sodass das LGS keine Lösung hat.
            </p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * (284 / 16)
        }
        function toY(n: number) {
          return 154 - n * (284 / 16)
        }
        function generateLinePoints(
          m: number,
          b: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = m * x + b
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const LinePoints = generateLinePoints(data.m_3, data.cons_2, 0.1)
        const LinePoints2 = generateLinePoints(data.m_3, data.cons_2 + 1, 0.1)
        return (
          <>
            <p>Die Gleichungen stellen 2 parallele Geraden dar:</p>
            <svg viewBox="0 0 328 310">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="310"
                width="328"
              />
              <polyline
                points={LinePoints}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={LinePoints2}
                stroke="orange"
                strokeWidth="2"
                fill="none"
              />
              <text
                x={toX(0)}
                y={toY(data.cons_2 + 1)}
                fontSize={20}
                textAnchor="middle"
                stroke="orange"
              >
                (II)
              </text>
              <text
                x={toX(0)}
                y={toY(data.cons_2 - 1)}
                fontSize={20}
                textAnchor="middle"
                stroke="blue"
              >
                (I)
              </text>
            </svg>
          </>
        )
      },
    },
  ],
}
