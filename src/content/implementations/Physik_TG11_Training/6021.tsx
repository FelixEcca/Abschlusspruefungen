import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  s0: number
  v: number
  t1: number
  t2: number
  s1: number
  s2: number
  question: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function toX(t: number) {
  return 40 + t * 8
}

function toY(s: number, scaleY: number) {
  return 170 - s * scaleY
}

function understandingTask(question: number) {
  if (question === 0) {
    return (
      <p>
        Beschreibe in einem Satz, woran man im Diagramm erkennt, dass die
        Bewegung gleichförmig ist.
      </p>
    )
  }
  if (question === 1) {
    return (
      <p>
        Erkläre, welche Bedeutung die Steigung im s-t-Diagramm für die Bewegung
        hat.
      </p>
    )
  }
  if (question === 2) {
    return (
      <p>
        Erkläre, was ein größerer y-Achsenabschnitt im s-t-Diagramm bedeutet.
      </p>
    )
  }
  return (
    <p>
      Beschreibe, wie sich das s-t-Diagramm verändern würde, wenn sich der
      Körper langsamer bewegt.
    </p>
  )
}

function understandingSolution(question: number) {
  if (question === 0) {
    return (
      <p>
        Der Graph ist eine Gerade. Das bedeutet: In gleichen Zeiten werden
        gleiche Strecken zurückgelegt, die Geschwindigkeit ist also konstant.
      </p>
    )
  }
  if (question === 1) {
    return (
      <p>
        Die Steigung gibt die Geschwindigkeit an. Je größer die Steigung ist,
        desto schneller bewegt sich der Körper.
      </p>
    )
  }
  if (question === 2) {
    return (
      <p>
        Der y-Achsenabschnitt gibt den Startort an. Ein größerer Wert bedeutet,
        dass der Körper zum Zeitpunkt <InlineMath math="t=0" /> schon weiter
        vom Nullpunkt entfernt ist.
      </p>
    )
  }
  return (
    <p>
      Der Graph wäre flacher. In derselben Zeit würde dann eine kleinere Strecke
      zurückgelegt.
    </p>
  )
}

export const exercise6021: Exercise<DATA> = {
  title: 's-t-Diagramm auswerten',
  source: 'Kinematik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const s0 = rng.randomItemFromArray([0, 10, 20, 30])
    const v = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const t1 = rng.randomItemFromArray([4, 5, 6, 8])
    const t2 = rng.randomItemFromArray([12, 15, 18, 20])
    const s1 = round2(s0 + v * t1)
    const s2 = round2(s0 + v * t2)
    const question = rng.randomItemFromArray([0, 1, 2, 3])

    return { s0, v, t1, t2, s1, s2, question }
  },

  originalData: {
    s0: 10,
    v: 4,
    t1: 5,
    t2: 15,
    s1: 30,
    s2: 70,
    question: 0,
  },

  constraint({ data }) {
    return data.t2 > data.t1 && data.s2 > data.s1 && data.question >= 0 && data.question <= 3
  },

  intro({ data }) {
    const x1 = toX(data.t1)
    const x2 = toX(data.t2)
    const maxS = data.s0 + data.v * (data.t2 + 3)
    const scaleY = 130 / Math.max(maxS, 1)
    const y1 = toY(data.s1, scaleY)
    const y2 = toY(data.s2, scaleY)

    return (
      <>
        <p>
          In einem s-t-Diagramm wurden zwei Punkte einer gleichförmigen Bewegung
          markiert.
        </p>
        <svg viewBox="0 0 328 200" className="my-2">
          <line x1="40" y1="170" x2="300" y2="170" stroke="black" />
          <polygon points="300,170 294,166 294,174" fill="black" />
          <text x="306" y="174" fontSize="12">
            t
          </text>
          <line x1="40" y1="170" x2="40" y2="25" stroke="black" />
          <polygon points="40,25 36,31 44,31" fill="black" />
          <text x="22" y="31" fontSize="12">
            s
          </text>
          <line
            x1={toX(0)}
            y1={toY(data.s0, scaleY)}
            x2={x2 + 30}
            y2={toY(data.s0 + data.v * (data.t2 + 3), scaleY)}
            stroke="#007ec1"
            strokeWidth="3"
          />
          <circle cx={x1 + 1} cy={y1} r="5" fill="#c10000" />
          <circle cx={x2 + 3} cy={y2} r="5" fill="#c10000" />
          <text x={x1 - 22} y={y1 - 8} fontSize="12">
            P₁
          </text>
          <text x={x2 + 8} y={y2 - 8} fontSize="12">
            P₂
          </text>
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Gegeben sind die beiden Punkte:</p>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath
                  math={`P_1(${pp(data.t1)}\\,\\mathrm s\\,|\\,${pp(
                    data.s1,
                  )}\\,\\mathrm m)`}
                />
              </li>
              <li>
                <InlineMath
                  math={`P_2(${pp(data.t2)}\\,\\mathrm s\\,|\\,${pp(
                    data.s2,
                  )}\\,\\mathrm m)`}
                />
              </li>
            </ul>
            <p>
              Berechne die Geschwindigkeit <InlineMath math="v" /> aus der
              Steigung des Diagramms.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Geschwindigkeit ist die Steigung im s-t-Diagramm:</p>
            <InlineMath math={`v = \\tfrac{\\Delta s}{\\Delta t}`} />
            <br />
            <InlineMath
              math={`v = \\tfrac{${pp(data.s2)}\\,\\mathrm m - ${pp(
                data.s1,
              )}\\,\\mathrm m}{${pp(data.t2)}\\,\\mathrm s - ${pp(
                data.t1,
              )}\\,\\mathrm s}`}
            />
            <br />
            <InlineMath
              math={`v = ${pp(data.v)}\\,\\tfrac{\\mathrm m}{\\mathrm s}`}
            />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return understandingTask(data.question)
      },
      solution({ data }) {
        return understandingSolution(data.question)
      },
    },
  ],
}
