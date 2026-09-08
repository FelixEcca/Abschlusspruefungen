import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  constant: number
  stretch1: number
  force1: number
  stretch2: number
  force2: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function toX(stretch: number) {
  return 42 + stretch * 1800
}

function toY(force: number, maxForce: number) {
  return 168 - (force / maxForce) * 120
}

export const exercise6055: Exercise<DATA> = {
  title: 'F-s-Diagramm einer Feder auswerten',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const constant = rng.randomItemFromArray([50, 80, 100, 150, 200])
    const stretch1 = rng.randomItemFromArray([0.02, 0.04, 0.05])
    const stretch2 = rng.randomItemFromArray([0.08, 0.1, 0.12])
    const force1 = round2(constant * stretch1)
    const force2 = round2(constant * stretch2)

    return { constant, stretch1, force1, stretch2, force2 }
  },

  originalData: {
    constant: 100,
    stretch1: 0.04,
    force1: 4,
    stretch2: 0.1,
    force2: 10,
  },

  constraint({ data }) {
    return data.stretch2 > data.stretch1 && data.force2 > data.force1
  },

  intro() {
    return null
  },

  task({ data }) {
    const maxForce = Math.max(data.force2 * 1.25, 1)
    const x1 = toX(data.stretch1)
    const y1 = toY(data.force1, maxForce)
    const x2 = toX(data.stretch2)
    const y2 = toY(data.force2, maxForce)

    return (
      <>
        <svg viewBox="0 0 330 205" className="my-2">
          <line x1="42" y1="168" x2="300" y2="168" stroke="black" />
          <polygon points="300,168 294,164 294,172" fill="black" />
          <text x="305" y="172" fontSize="12">
            s
          </text>
          <line x1="42" y1="168" x2="42" y2="28" stroke="black" />
          <polygon points="42,28 38,34 46,34" fill="black" />
          <text x="24" y="34" fontSize="12">
            F
          </text>
          <line
            x1="42"
            y1="168"
            x2={x2 + 40}
            y2={toY(data.constant * (data.stretch2 + 0.02), maxForce)}
            stroke="#007ec1"
            strokeWidth="3"
          />
          <circle cx={x1} cy={y1} r="5" fill="#c10000" />
          <circle cx={x2} cy={y2} r="5" fill="#c10000" />
          <text x={x1 - 22} y={y1 - 8} fontSize="12">
            P₁
          </text>
          <text x={x2 + 7} y={y2 - 8} fontSize="12">
            P₂
          </text>
          <text x="258" y="190" fontSize="11">
            s in m
          </text>
          <text x="6" y="58" fontSize="11">
            F in N
          </text>
        </svg>
        <p>
          Im abgebildeten <InlineMath math="F(s)" />
          -Diagramm einer Feder liegen die Punkte{' '}
          <InlineMath
            math={`P_1(${pp(data.stretch1)}\\,\\mathrm m\\,|\\,${pp(
              data.force1,
            )}\\,\\mathrm N)`}
          />{' '}
          und{' '}
          <InlineMath
            math={`P_2(${pp(data.stretch2)}\\,\\mathrm m\\,|\\,${pp(
              data.force2,
            )}\\,\\mathrm N)`}
          />
          . Bestimme aus der Steigung die Federkonstante <InlineMath math="D" />
          .
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath math={`D=\\tfrac{\\Delta F}{\\Delta s}`} />
        <br />
        <InlineMath
          math={`D=\\tfrac{${pp(data.force2)}\\,\\mathrm N-${pp(data.force1)}\\,\\mathrm N}{${pp(data.stretch2)}\\,\\mathrm m-${pp(data.stretch1)}\\,\\mathrm m}`}
        />
        <br />
        <InlineMath
          math={`D=${pp(data.constant)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
        />
        <p>
          Die Gerade durch den Ursprung passt zu einer Feder im linearen
          Bereich.
        </p>
      </>
    )
  },
}
