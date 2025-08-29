import { Exercise } from '@/data/types'
import { Color1, Color4 } from '@/helper/colors'
import { buildEquation } from '@/helper/math-builder'
import { pp, ppFrac } from '@/helper/pretty-print'
import { shuffle } from 'ionicons/icons'

interface DATA {
  x: number
  y: number
  a: number
  b: number
  d: number
  order: number[]
  faktor: number
}

export const exercise3008: Exercise<DATA> = {
  title: 'LGS',
  source: '2021 Wahlteil Aufgabe 3A',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      x: rng.randomIntBetween(-6, 6),
      y: rng.randomIntBetween(-6, 6),
      a: rng.randomIntBetween(2, 9),
      b: rng.randomIntBetween(3, 6),
      d: rng.randomIntBetween(3, 6),
      order: rng.shuffleArray([0, 1, 2]),
      faktor: rng.randomIntBetween(2, 4),
    }
  },
  originalData: {
    x: 2.5,
    y: 2 / 3,
    a: 3,
    b: 2,
    d: 4,
    faktor: 2,
    order: [0, 1, 2],
  },
  constraint({ data }) {
    const c = data.b * data.x + data.a * data.y
    const e = data.d * data.x - data.faktor * data.a * data.y
    return Math.abs(e) < 30 && Math.abs(c) < 30
  },
  intro({ data }) {
    const c = data.b * data.x + data.a * data.y
    const e = data.d * data.x - data.faktor * data.a * data.y
    return (
      <>
        <p>Gegeben ist das folgende lineare Gleichungssystem:</p>
        <p>
          I &nbsp;&nbsp; {data.b}x {pp(data.a, 'merge_op')}y = {pp(c)}
        </p>
        <p>
          II &nbsp; {data.d}x {pp(-data.faktor * data.a, 'merge_op')}y = {pp(e)}
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
            <p>Bestimmen Sie die Lösung des linearen Gleichungssystems.</p>
          </>
        )
      },
      solution({ data }) {
        const c = data.b * data.x + data.a * data.y
        const e = data.d * data.x - data.faktor * data.a * data.y
        return (
          <>
            <p>
              Die Terme {'"'}
              {pp(data.a)}y{'"'} und {'"'}
              {-data.faktor * data.a}y{'"'} können eliminiert werden, wenn der
              erste Term mit dem Faktor {data.faktor} multipliziert wird.
            </p>

            <p>
              {data.faktor} · I: &nbsp;&nbsp; {data.faktor * data.b}x +{' '}
              <Color1>{data.faktor * data.a}y</Color1> = {pp(data.faktor * c)}
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;II: &nbsp;&nbsp;&nbsp; {data.d}x −{' '}
              <Color1>{data.faktor * data.a}y</Color1> = {pp(e)}
            </p>
            <p>Addiere die Gleichungen {data.faktor} · I + II:</p>
            {buildEquation([
              [
                <>
                  {data.faktor * data.b}x + {data.d}x{' '}
                  <Color1>
                    − {data.faktor * data.a}y + {data.faktor * data.a}y
                  </Color1>
                </>,
                <>=</>,
                <>
                  {pp(data.faktor * c)} + {pp(e, 'embrace_neg')}
                </>,
              ],
              [
                <>
                  {data.faktor * data.b}x + {data.d}x{' '}
                </>,
                <>=</>,
                <>
                  {pp(data.faktor * c)} + {pp(e, 'embrace_neg')}
                </>,
              ],
              [
                <>{data.faktor * data.b + data.d}x </>,
                <>=</>,
                <>{pp(data.faktor * c + e)}</>,

                <>| : {data.faktor * data.b + data.d}</>,
              ],
              [<>x </>, <>=</>, <>{pp(data.x)}</>],
            ])}
            <p>
              Setze den Wert für x in die Gleichung I oder II ein. <br></br>x in
              I eingesetzt liefert:
            </p>

            {buildEquation([
              [
                <>
                  {data.b} · {data.x} + {data.a} · y
                </>,
                <>=</>,
                <>{pp(c)}</>,
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
                    <span style={{ fontSize: 'small' }}>fasse zusammen</span>
                  </Color4>
                </>,
              ],
              [
                <>
                  {data.b * data.x} + {data.a} y
                </>,
                <>=</>,
                <>{pp(c)}</>,

                <>| − {data.b * data.x}</>,
              ],
              [<> {data.a} y</>, <>=</>, <>{pp(c - data.b * data.x)}</>],
              [
                <>y</>,
                <>=</>,
                <>{data.y % 1 == 0 ? data.y : ppFrac(data.y)}</>,
              ],
            ])}

            <p>
              Die Lösungsmenge des Gleichungssystems ist{' '}
              <b>
                {'L={('}
                {data.x}; {data.y % 1 == 0 ? data.y : ppFrac(data.y)}
                {')}'}
              </b>
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
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        const c = data.b * data.x + data.a * data.y
        const e = data.d * data.x - data.faktor * data.a * data.y
        function generatePoints(
          a: number,
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = (b - a * x) / c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }

        //  {data.b}x {pp(data.a, 'merge_op')}y = {pp(c)}

        // {data.d}x {pp(-data.faktor * data.a, 'merge_op')}y = {pp(e)}

        const Points = generatePoints(-data.b, c, data.a, 1)
        const Points2 = generatePoints(-data.d, e, -data.faktor * data.a, 1)
        const Points3 = generatePoints(data.b, c, data.a, 1)
        const Points4 = generatePoints(data.d, e, -data.faktor * data.a, 1)
        const Points5 = generatePoints(-data.b, -c, data.a, 1)
        const Points6 = generatePoints(-data.d, -e, data.faktor * data.a, 1)
        const listItems = [
          <li key="1">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
          <li key="2">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points3}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points4}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
          <li key="3">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points5}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points6}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>
              Lineare Gleichungssysteme lassen sich auch graphisch lösen.
              Begründen Sie, welche der folgenden Abbildungen zur Lösung des
              obigen Gleichungssystems passt.
            </p>
            {shuffledItems[0]}
            <p>Abbildung 1</p>
            {shuffledItems[1]}

            <p>Abbildung 2</p>
            {shuffledItems[2]}

            <p>Abbildung 3</p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        const c = data.b * data.x + data.a * data.y
        const e = data.d * data.x - data.faktor * data.a * data.y
        function generatePoints(
          a: number,
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = (b + a * x) / c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }

        const Points = generatePoints(-data.b, c, data.a, 1)
        const Points2 = generatePoints(-data.d, e, -data.faktor * data.a, 1)
        const Points3 = generatePoints(data.b, c, data.a, 1)
        const Points4 = generatePoints(data.d, e, -data.faktor * data.a, 1)
        const Points5 = generatePoints(-data.b, -c, data.a, 1)
        const Points6 = generatePoints(-data.d, -e, data.faktor * data.a, 1)
        const listItems = [
          <li key="0">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
          <li key="1">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points3}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points4}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
          <li key="2">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points5}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points6}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </li>,
        ]
        const shuffledItems = data.order.map(i => listItems[i])
        const correctIndex = data.order.indexOf(1)
        return (
          <>
            <p>Richtig ist die Abbildung {correctIndex + 1}</p>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={Points}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points={Points2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            <p>
              Der Schnittpunkt der Geraden ist gerade die Lösung des linearen
              Gleichungssystems.
            </p>
          </>
        )
      },
    },
  ],
}
