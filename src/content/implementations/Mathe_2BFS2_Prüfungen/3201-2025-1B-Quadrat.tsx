import { Exercise } from '@/data/types'
import { buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface DATA {
  x: number
  A1: number
  A2: number
  A3: number
  A4: number
  A1Side: number
}

export const exercise3201: Exercise<DATA> = {
  title: 'Quadrat mit Teilflächen',
  source: '2025 Pflichtteil Aufgabe 1B',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    const x = rng.randomIntBetween(8, 14)
    const A1Side = rng.randomIntBetween(2, Math.floor(x / 2))

    const A1 = A1Side * A1Side
    const A2 = (x - A1Side) * A1Side
    const A3 = A1Side * (x - A1Side)
    const A4 = (x - A1Side) * (x - A1Side)

    const data: DATA = { x, A1, A2, A3, A4, A1Side }
    return data
  },
  originalData: {
    x: 10,
    A1: 9,
    A2: 21,
    A3: 21,
    A4: 49,
    A1Side: 3,
  },
  constraint({ data }) {
    // ausgeschlossen: alle Teilflächen Quadrate ⇒ x = 2·A1Side
    return data.A1 > 0 && data.A4 > 0 && data.x !== 2 * data.A1Side
  },
  intro({ data }) {
    return (
      <>
        <p>
          In der Abbildung ist eine quadratische Fläche{' '}
          <InlineMath math={`A_{ges}`} /> mit der Seitenlänge x dargestellt. Sie
          besteht aus den vier Teilflächen <InlineMath math={`A_{1}`} />,
          <InlineMath math={`A_{2}`} />, <InlineMath math={`A_{3}`} /> und{' '}
          <InlineMath math={`A_{4}`} />.
        </p>
        <svg viewBox="-2 0 12 10" width="220" height="200">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>

          {/* Quadrat */}
          <rect
            x="0"
            y="0"
            width="10"
            height="10"
            fill="none"
            stroke="black"
            strokeWidth={0.1}
          />
          {/* Teilungen proportional zu A1Side/x */}
          <line
            x1={(data.A1Side / data.x) * 10}
            y1="0"
            x2={(data.A1Side / data.x) * 10}
            y2="10"
            stroke="black"
            strokeWidth={0.1}
          />
          <line
            x1="0"
            y1={(data.A1Side / data.x) * 10}
            x2="10"
            y2={(data.A1Side / data.x) * 10}
            stroke="black"
            strokeWidth={0.1}
          />

          {/* Beschriftungen */}
          <text x="1.2" y="1.8" fontSize="1.2">
            A₁
          </text>
          <text x="6" y="1.8" fontSize="1.2">
            A₂
          </text>
          <text x="1.2" y="6.5" fontSize="1.2">
            A₃
          </text>
          <text x="6" y="6.5" fontSize="1.2">
            A₄
          </text>

          {/* Doppelpfeil links für x */}
          <line
            x1="-1"
            y1="0"
            x2="-1"
            y2="10"
            stroke="black"
            strokeWidth={0.1}
          />
          <line
            x1="-1"
            y1="0"
            x2="-1.3"
            y2="0.8"
            stroke="black"
            strokeWidth={0.1}
          />
          <line
            x1="-1"
            y1="0"
            x2="-0.7"
            y2="0.8"
            stroke="black"
            strokeWidth={0.1}
          />
          <line
            x1="-1"
            y1="10"
            x2="-1.3"
            y2="9.2"
            stroke="black"
            strokeWidth={0.1}
          />
          <line
            x1="-1"
            y1="10"
            x2="-0.7"
            y2="9.2"
            stroke="black"
            strokeWidth={0.1}
          />
          <text x="-1.6" y="5.3" fontSize="1.2">
            x
          </text>
        </svg>
        <p>
          Für die Gesamtfläche gilt:{' '}
          <InlineMath math={`A_{ges} = ${pp(data.x * data.x)} ~m²`} />. <br />
          Für die Teilfläche <InlineMath math={`A_{1}`} /> gilt:{' '}
          <InlineMath math={`A_{1} = ${pp(data.A1)} ~m²`} />.
        </p>
      </>
    )
  },
  tasks: [
    {
      points: 14,
      task() {
        return <p>Bestimmen Sie die Seitenlänge x.</p>
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Gesamtfläche beträgt{' '}
              <InlineMath math={`A_{ges} = ${pp(data.x * data.x)} ~m²`} />. Da
              es sich um ein Quadrat handelt, gilt:
              <InlineMath math={`A_{ges} = x^2`} />
            </p>
            <p>
              <InlineMath
                math={`x = \\sqrt{${pp(data.x * data.x)}} = ${pp(data.x)} ~m`}
              />
            </p>
          </>
        )
      },
    },
    {
      points: 14,
      task() {
        return (
          <p>
            Berechnen Sie den Flächeninhalt der Teilfläche A<sub>4</sub>.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>
              Die Seitenlänge von <InlineMath math={`A_{1}`} /> beträgt{' '}
              <InlineMath math={` ${pp(data.A1Side)} ~m`} />. Damit ist die
              Seitenlänge von <InlineMath math={`A_{4}:`} />
              <br></br>
              <br></br>{' '}
              <InlineMath
                math={`A_{4} = ${pp(data.x)} −
              ${pp(data.A1Side)} = ${pp(data.x - data.A1Side)} ~m.`}
              />{' '}
            </p>
            <p>
              <InlineMath
                math={`A_{4} = (${pp(data.x - data.A1Side)} ~m)² = ${pp(data.A4)} ~m²`}
              />
            </p>
          </>
        )
      },
    },
    {
      points: 14,
      task() {
        return (
          <p>
            Begründen Sie, dass die beiden Rechtecke mit den Flächen A
            <sub>2</sub> und A<sub>3</sub> kongruent sind.
          </p>
        )
      },
      solution({ data }) {
        return (
          <p>
            <InlineMath math={`A_2`} /> hat die Seitenlängen{' '}
            <InlineMath math={`${pp(data.x - data.A1Side)} ~m`} /> und{' '}
            <InlineMath math={`${pp(data.A1Side)} ~m`} />. <br />
            <InlineMath math={`A_3`} />
            hat die Seitenlängen <InlineMath
              math={`${pp(data.A1Side)} ~m`}
            />{' '}
            und <InlineMath math={`${pp(data.x - data.A1Side)} ~m`} />. <br />
            <br />
            Beide Rechtecke haben dieselben Seitenlängen und sind daher
            kongruent.
          </p>
        )
      },
    },
  ],
}
