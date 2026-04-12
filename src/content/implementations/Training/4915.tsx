import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  alpha: number
  beta: number
  gamma: number
  given: 'alpha' | 'beta'
  cx: number
  cy: number
}

const CX = 164
const CY = 100
const R = 70

function polarPoint(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CX + R * Math.cos(rad),
    y: CY - R * Math.sin(rad),
  }
}

export const exercise4915: Exercise<DATA> = {
  title: 'Thaleskreis – Winkel bestimmen',
  source: 'Trigonometrie',
  useCalculator: false,
  duration: 42,
  points: 42,
  generator(rng) {
    const alpha = rng.randomIntBetween(25, 65)
    const beta = 90 - alpha
    const gamma = 90
    const given = rng.randomBoolean() ? 'alpha' : 'beta'

    // Punkt C sicher auf dem oberen Halbkreis
    const angleOnCircle = rng.randomIntBetween(35, 145)
    const p = polarPoint(angleOnCircle)

    return {
      alpha,
      beta,
      gamma,
      given,
      cx: p.x,
      cy: p.y,
    }
  },
  originalData: {
    alpha: 35,
    beta: 55,
    gamma: 90,
    given: 'alpha',
    cx: polarPoint(75).x,
    cy: polarPoint(75).y,
  },
  constraint({ data }) {
    return (
      data.alpha > 0 &&
      data.beta > 0 &&
      data.alpha + data.beta === 90 &&
      Math.abs(
        (data.cx - CX) * (data.cx - CX) +
          (data.cy - CY) * (data.cy - CY) -
          R * R,
      ) < 0.001
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Gegeben ist ein Dreieck im Thaleskreis. Bestimmen Sie alle Winkel.
        </p>

        <svg viewBox="0 0 328 180">
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          {/* Durchmesser */}
          <line
            x1={CX - R}
            y1={CY}
            x2={CX + R}
            y2={CY}
            stroke="black"
            strokeWidth="2"
          />

          {/* Dreieck */}
          <line
            x1={CX - R}
            y1={CY}
            x2={data.cx}
            y2={data.cy}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={CX + R}
            y1={CY}
            x2={data.cx}
            y2={data.cy}
            stroke="black"
            strokeWidth="2"
          />

          {/* Winkelbeschriftungen */}
          <text x={CX - 48} y={CY - 8} fontSize="16">
            {data.given === 'alpha' ? `α = ${data.alpha}°` : 'α'}
          </text>
          <text x={CX + 26} y={CY - 8} fontSize="16">
            {data.given === 'beta' ? `β = ${data.beta}°` : 'β'}
          </text>
          <text x={data.cx - 10} y={data.cy + 22} fontSize="16">
            γ
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    if (data.given === 'alpha') {
      return (
        <>
          <p>
            Im Thaleskreis ist der Winkel über dem Durchmesser immer ein rechter
            Winkel.
          </p>
          <InlineMath math={`\\gamma = 90^{\\circ}`} />
          <br />
          <InlineMath math={`\\alpha + \\beta + \\gamma = 180^{\\circ}`} />
          <br />
          <InlineMath
            math={`${pp(data.alpha)}^{\\circ} + \\beta + 90^{\\circ} = 180^{\\circ}`}
          />
          <br />
          <InlineMath
            math={`\\beta = 180^{\\circ} - 90^{\\circ} - ${pp(
              data.alpha,
            )}^{\\circ} = ${pp(data.beta)}^{\\circ}`}
          />
          <p>
            Damit sind die Winkel:
            <br />
            <InlineMath
              math={`\\alpha = ${pp(data.alpha)}^{\\circ},\\quad \\beta = ${pp(
                data.beta,
              )}^{\\circ},\\quad \\gamma = 90^{\\circ}`}
            />
          </p>
        </>
      )
    }

    return (
      <>
        <p>
          Im Thaleskreis ist der Winkel über dem Durchmesser immer ein rechter
          Winkel.
        </p>
        <InlineMath math={`\\gamma = 90^{\\circ}`} />
        <br />
        <InlineMath math={`\\alpha + \\beta + \\gamma = 180^{\\circ}`} />
        <br />
        <InlineMath
          math={`\\alpha + ${pp(data.beta)}^{\\circ} + 90^{\\circ} = 180^{\\circ}`}
        />
        <br />
        <InlineMath
          math={`\\alpha = 180^{\\circ} - 90^{\\circ} - ${pp(
            data.beta,
          )}^{\\circ} = ${pp(data.alpha)}^{\\circ}`}
        />
        <p>
          Damit sind die Winkel:
          <br />
          <InlineMath
            math={`\\alpha = ${pp(data.alpha)}^{\\circ},\\quad \\beta = ${pp(
              data.beta,
            )}^{\\circ},\\quad \\gamma = 90^{\\circ}`}
          />
        </p>
      </>
    )
  },
}
