import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  x_s: number
  y_s: number
  a: number
  order: number[]
}

export const exercise3000: Exercise<DATA> = {
  title: 'Parabeln',
  source: '2021 Pflichtteil Aufgabe 1A',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      x_s: rng.randomIntBetween(-6, 6),
      y_s: rng.randomIntBetween(-6, 6),
      a: rng.randomIntBetween(5, 8) / 10,
      order: rng.shuffleArray([0, 1, 2]),
    }
  },
  originalData: { x_s: 3, y_s: 1, a: 0.5, order: [0, 1, 2] },
  constraint({ data }) {
    return data.x_s != 0 && data.y_s != 0
  },
  intro({ data }) {
    function toX(n: number) {
      return 167 + n * ((94.5 * 2) / 10)
    }
    function toY(n: number) {
      return 163 - n * ((94.5 * 2) / 10)
    }

    function generateParabolaPoints1(
      b: number,
      c: number,
      step: number,
    ): string {
      let points = ''
      for (let x = -9; x <= 9; x += step) {
        const y = -(x - b) * (x - b) + c
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    function generateParabolaPoints2(
      b: number,
      c: number,
      step: number,
    ): string {
      let points = ''
      for (let x = -9; x <= 9; x += step) {
        const y = (x + b) * (x + b) - c
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    function generateParabolaPoints3(
      b: number,
      c: number,
      step: number,
    ): string {
      let points = ''
      for (let x = -9; x <= 9; x += step) {
        const y = data.a * (x - b) * (x - b) + c
        points += `${toX(x)},${toY(y)} `
      }
      return points.trim()
    }
    const parabolaPoints1 = generateParabolaPoints1(data.x_s, data.y_s, 0.1)
    const parabolaPoints2 = generateParabolaPoints2(data.x_s, data.y_s, 0.1)
    const parabolaPoints3 = generateParabolaPoints3(data.x_s, data.y_s, 0.1)
    const listItems = [
      <li key="1">
        <svg viewBox="0 0 328 328">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={parabolaPoints1}
            stroke="blue"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </li>,
      <li key="2">
        <svg viewBox="0 0 328 328">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={parabolaPoints2}
            stroke="blue"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </li>,
      <li key="3">
        <svg viewBox="0 0 328 328">
          <image
            href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
            height="328"
            width="328"
          />
          <polyline
            points={parabolaPoints3}
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
          Gegeben ist die Gleichung der Parabel p mit{' '}
          <InlineMath
            math={`y = (x ${pp(-data.x_s, 'merge_op')})^2 ${pp(data.y_s, 'merge_op')}`}
          />
        </p>
        {shuffledItems[0]}
        <p>Schaubild 1</p>
        {shuffledItems[1]}
        <p>Schaubild 2</p>
        {shuffledItems[2]}
        <p>Schaubild 3</p>
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
              Nennen Sie für jedes der drei Schaubilder einen Grund, warum es
              nicht das Schaubild von p sein kann.
            </p>
          </>
        )
      },
      solution({ data }) {
        const listItems = [
          <li key="1">
            Die Parabel ist nach unten geöffnet. Die Parabel{' '}
            <InlineMath math={`p`} /> hat aber den Öffnungsfaktor{' '}
            <InlineMath math={`a> 0`} /> und ist somit nach oben geöffnet.
          </li>,
          <li key="2">
            Der Scheitel der Parabel <InlineMath math={`p`} /> liegt bei{' '}
            <br></br>
            <InlineMath math={`S(${pp(data.x_s)}|${pp(data.y_s)})`} />. Im
            Koordinatensystem ist er aber im Punkt{' '}
            <InlineMath math={`S(${pp(-data.x_s)}|${pp(-data.y_s)})`} />{' '}
            eingezeichnet.
          </li>,
          <li key="3">
            Die Parabel <InlineMath math={`p`} /> hat den Öffnungsfaktor{' '}
            <br></br> <InlineMath math={`a=1`} />. Die eingezeichnete Parabel
            ist gestaucht, also ist <InlineMath math={`a`} /> kleiner als 1.
          </li>,
        ]

        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <ol>{shuffledItems}</ol>
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
              Eine Gerade g ist die Symmetrieachse der Parabel in Schaubild 1.
              Zeichnen Sie die Gerade g in das Schaubild ein.
            </p>
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

        function generateParabolaPoints1(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = -(x - b) * (x - b) + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateParabolaPoints2(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = (x + b) * (x + b) - c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateParabolaPoints3(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = data.a * (x - b) * (x - b) + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints1 = generateParabolaPoints1(data.x_s, data.y_s, 0.1)
        const parabolaPoints2 = generateParabolaPoints2(data.x_s, data.y_s, 0.1)
        const parabolaPoints3 = generateParabolaPoints3(data.x_s, data.y_s, 0.1)
        const listItems = [
          <li key="1">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints1}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1={toX(data.x_s)}
                y1={toY(-9)}
                x2={toX(data.x_s)}
                y2={toY(9)}
                stroke="orange"
                strokeWidth={2}
              />
              <text
                x={toX(data.x_s + 0.5)}
                y={toY(6)}
                fontSize={20}
                textAnchor="right"
                stroke="orange"
              >
                g
              </text>
            </svg>
          </li>,
          <li key="2">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1={toX(-data.x_s)}
                y1={toY(-9)}
                x2={toX(-data.x_s)}
                y2={toY(9)}
                stroke="orange"
                strokeWidth={2}
              />
              <text
                x={toX(-data.x_s + 0.5)}
                y={toY(6)}
                fontSize={20}
                textAnchor="right"
                stroke="orange"
              >
                g
              </text>
            </svg>
          </li>,
          <li key="3">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints3}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1={toX(data.x_s)}
                y1={toY(-9)}
                x2={toX(data.x_s)}
                y2={toY(9)}
                stroke="orange"
                strokeWidth={2}
              />
              <text
                x={toX(data.x_s + 0.5)}
                y={toY(6)}
                fontSize={20}
                textAnchor="right"
                stroke="orange"
              >
                g
              </text>
            </svg>
          </li>,
        ]

        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>Das Schaubild sollte so aussehen:</p>
            {shuffledItems[0]}
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
              Eine Gerade h verläuft parallel zur x-Achse durch den
              Scheitelpunkt der Parabel in Schaubild 2. Geben Sie die Gleichung
              von h an.
            </p>
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

        function generateParabolaPoints1(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = -(x - b) * (x - b) + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateParabolaPoints2(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = (x + b) * (x + b) - c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        function generateParabolaPoints3(
          b: number,
          c: number,
          step: number,
        ): string {
          let points = ''
          for (let x = -9; x <= 9; x += step) {
            const y = data.a * (x - b) * (x - b) + c
            points += `${toX(x)},${toY(y)} `
          }
          return points.trim()
        }
        const parabolaPoints1 = generateParabolaPoints1(data.x_s, data.y_s, 0.1)
        const parabolaPoints2 = generateParabolaPoints2(data.x_s, data.y_s, 0.1)
        const parabolaPoints3 = generateParabolaPoints3(data.x_s, data.y_s, 0.1)
        const listItems = [
          <li key="1">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints1}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1={toX(-9)}
                y1={toY(data.y_s)}
                x2={toX(9)}
                y2={toY(data.y_s)}
                stroke="orange"
                strokeWidth={2}
              />
              <text
                x={toX(5)}
                y={toY(data.y_s - 1)}
                fontSize={20}
                textAnchor="right"
                stroke="orange"
              >
                h
              </text>
            </svg>
          </li>,
          <li key="2">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints2}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1={toX(-9)}
                y1={toY(-data.y_s)}
                x2={toX(9)}
                y2={toY(-data.y_s)}
                stroke="orange"
                strokeWidth={2}
              />
              <text
                x={toX(5)}
                y={toY(-data.y_s - 1)}
                fontSize={20}
                textAnchor="right"
                stroke="orange"
              >
                h
              </text>
            </svg>
          </li>,
          <li key="3">
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={parabolaPoints3}
                stroke="blue"
                strokeWidth="2"
                fill="none"
              />
              <line
                x1={toX(-9)}
                y1={toY(data.y_s)}
                x2={toX(9)}
                y2={toY(data.y_s)}
                stroke="orange"
                strokeWidth={2}
              />
              <text
                x={toX(5)}
                y={toY(data.y_s - 1)}
                fontSize={20}
                textAnchor="right"
                stroke="orange"
                strokeDasharray="5,5"
              >
                h
              </text>
            </svg>
          </li>,
        ]

        const shuffledItems = data.order.map(i => listItems[i])
        return (
          <>
            <p>
              Diese Skizze stellt die gesuchte Gerade dar. Sie ist nur eine
              Hilfe und muss nicht gemacht werden.
            </p>
            {shuffledItems[1]}
            <p>
              Die Gleichung dieser Geraden ist:<br></br>y = {pp(data.y_s)}
            </p>
          </>
        )
      },
    },
  ],
}
