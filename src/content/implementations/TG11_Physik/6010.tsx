import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type ModeB = 'fromFxCos' | 'fromFySin'

interface DATA {
  // Teilaufgabe 1: rechtwinklig (Pythagoras)
  f1: number // N (horizontal)
  f2: number // N (vertikal)
  fresA: number // N

  // Teilaufgabe 2: Winkel + Komponente (Winkelfunktion)
  modeB: ModeB
  alphaDeg: number
  fx: number // N
  fy: number // N
  fresB: number // N
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function ForcesRightAngleSvg(props: {
  f1Text: string
  f2Text: string
  fresText: string
}) {
  const { f1Text, f2Text, fresText } = props

  return (
    <svg viewBox="0 0 360 170">
      {/* origin */}

      {/* F1 arrow (right) */}
      <line x1="70" y1="40" x2="310" y2="40" stroke="black" strokeWidth="2" />
      <polygon points="310,40 298,34 298,46" fill="black" />
      <text x="165" y="28" fontSize="16">
        {f1Text}
      </text>

      {/* F2 arrow (down) */}
      <line x1="70" y1="40" x2="70" y2="150" stroke="black" strokeWidth="2" />
      <polygon points="70,150 64,138 76,138" fill="black" />
      <text x="10" y="110" fontSize="16">
        {f2Text}
      </text>

      {/* Resultant arrow (diagonal) */}
      <line x1="70" y1="40" x2="310" y2="150" stroke="black" strokeWidth="2" />
      <polygon points="310,150 296,148 302,136" fill="black" />
      <text x="205" y="118" fontSize="16">
        {fresText}
      </text>

      {/* right angle marker */}
      <path
        d="M 70 40 L 92 40 L 92 62 L 70 62 Z"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  )
}

function ForcesAngleSvg(props: {
  alphaText: string
  fxText: string
  fyText: string
  fresText: string
}) {
  const { alphaText, fxText, fyText, fresText } = props

  // Layout (not to scale)
  const ox = 60
  const oy = 170
  const tipX = 320
  const tipY = 50

  return (
    <svg viewBox="0 0 360 210">
      {/* origin */}
      <circle cx={ox} cy={oy} r="2.5" fill="black" />

      {/* Fx arrow (right) */}
      <line x1={ox} y1={oy} x2={tipX} y2={oy} stroke="black" strokeWidth="2" />
      <polygon
        points={`${tipX},${oy} ${tipX - 12},${oy - 6} ${tipX - 12},${oy + 6}`}
        fill="black"
      />
      <text x="170" y="198" fontSize="16">
        {fxText}
      </text>

      {/* Fy arrow (up) */}
      <line x1={ox} y1={oy} x2={ox} y2={tipY} stroke="black" strokeWidth="2" />
      <polygon
        points={`${ox},${tipY} ${ox - 6},${tipY + 12} ${ox + 6},${tipY + 12}`}
        fill="black"
      />
      <text x="8" y="110" fontSize="16">
        {fyText}
      </text>

      {/* resultant */}
      <line
        x1={ox}
        y1={oy}
        x2={tipX}
        y2={tipY}
        stroke="black"
        strokeWidth="2"
      />
      <polygon
        points={`${tipX},${tipY} ${tipX - 13},${tipY + 3} ${tipX - 7},${
          tipY + 15
        }`}
        fill="black"
      />
      <text x="205" y="95" fontSize="16">
        {fresText}
      </text>

      {/* dashed projections */}
      <line
        x1={tipX}
        y1={tipY}
        x2={tipX}
        y2={oy}
        stroke="black"
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />
      <line
        x1={tipX}
        y1={tipY}
        x2={ox}
        y2={tipY}
        stroke="black"
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />

      {/* angle arc (between x-axis and resultant) */}

      <text x="100" y="165" fontSize="14">
        {alphaText}
      </text>
    </svg>
  )
}

export const exercise6010: Exercise<DATA> = {
  title: 'Kräfteaddition rechnerisch',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // --- Teil a: rechtwinklig ---
    const f1 = rng.randomIntBetween(80, 600) // N
    const f2 = rng.randomIntBetween(40, 300) // N
    const fresA = round2(Math.sqrt(f1 * f1 + f2 * f2))

    // --- Teil b: Winkel + Komponente ---
    const possibleAngles = [15, 30, 37, 45, 53, 60, 75]
    const alphaDeg = rng.randomItemFromArray(possibleAngles)
    const rad = (alphaDeg * Math.PI) / 180

    const modeB: ModeB = rng.randomBoolean() ? 'fromFxCos' : 'fromFySin'

    let fx = NaN
    let fy = NaN
    let fresB = NaN

    if (modeB === 'fromFxCos') {
      fx = rng.randomIntBetween(80, 600)
      fresB = round2(fx / Math.cos(rad))
      fy = round2(fresB * Math.sin(rad))
    } else {
      fy = rng.randomIntBetween(40, 300)
      fresB = round2(fy / Math.sin(rad))
      fx = round2(fresB * Math.cos(rad))
    }

    return { f1, f2, fresA, modeB, alphaDeg, fx, fy, fresB }
  },

  originalData: {
    f1: 480,
    f2: 90,
    fresA: round2(Math.sqrt(480 * 480 + 90 * 90)),
    modeB: 'fromFxCos',
    alphaDeg: 37,
    fx: 400,
    fy: round2(
      (400 / Math.cos((37 * Math.PI) / 180)) * Math.sin((37 * Math.PI) / 180),
    ),
    fresB: round2(400 / Math.cos((37 * Math.PI) / 180)),
  },

  constraint({ data }) {
    return (
      data.f1 > 0 &&
      data.f2 > 0 &&
      data.fresA > 0 &&
      data.alphaDeg > 0 &&
      data.fx > 0 &&
      data.fy > 0 &&
      data.fresB > 0
    )
  },

  intro({ data }) {
    return null
  },

  tasks: [
    {
      points: 21,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { f1, f2 } = data

        return (
          <>
            <p>
              Zwei Kräfte greifen rechtwinklig zueinander an (Skizze nicht
              maßstabsgetreu).
            </p>

            <ForcesRightAngleSvg
              f1Text={`F₁ = ${pp(f1)} N`}
              f2Text={`F₂ = ${pp(f2)} N`}
              fresText={'F_res = ?'}
            />

            <p>
              Berechne die resultierende Kraft{' '}
              <InlineMath math={'F_\\mathrm{res}'} />.
            </p>

            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`F_1 = ${pp(f1)}\\,\\mathrm N`} />
              </li>
              <li>
                <InlineMath math={`F_2 = ${pp(f2)}\\,\\mathrm N`} />
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const { f1, f2, fresA } = data

        return (
          <>
            <InlineMath math={'F_\\mathrm{res} = \\sqrt{F_1^{2}+F_2^{2}}'} />
            <br />
            <InlineMath
              math={`F_\\mathrm{res} = \\sqrt{(${pp(f1)}\\,\\mathrm N)^{2}+(${pp(
                f2,
              )}\\,\\mathrm N)^{2}}`}
            />
            <br />
            <InlineMath
              math={`F_\\mathrm{res} \\approx ${pp(fresA)}\\,\\mathrm N`}
            />
          </>
        )
      },
    },
    {
      points: 21,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { modeB, alphaDeg, fx, fy } = data

        const fxText = modeB === 'fromFxCos' ? `Fₓ = ${pp(fx)} N` : 'Fₓ = ?'
        const fyText = modeB === 'fromFySin' ? `Fᵧ = ${pp(fy)} N` : 'Fᵧ = ?'

        return (
          <>
            <p>
              Eine Kraft wirkt schräg. In der Skizze sind die Komponenten und
              der Winkel eingezeichnet (Skizze nicht maßstabsgetreu).
            </p>

            <ForcesAngleSvg
              alphaText={`α = ${pp(alphaDeg)}°`}
              fxText={fxText}
              fyText={fyText}
              fresText={'F_res = ?'}
            />

            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`\\alpha = ${pp(alphaDeg)}^{\\circ}`} />
              </li>

              {modeB === 'fromFxCos' && (
                <li>
                  <InlineMath math={`F_x = ${pp(fx)}\\,\\mathrm N`} />
                </li>
              )}

              {modeB === 'fromFySin' && (
                <li>
                  <InlineMath math={`F_y = ${pp(fy)}\\,\\mathrm N`} />
                </li>
              )}
            </ul>

            <p>
              Berechne die resultierende Kraft{' '}
              <InlineMath math={'F_\\mathrm{res}'} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { modeB, alphaDeg, fx, fy, fresB } = data

        if (modeB === 'fromFxCos') {
          return (
            <>
              <InlineMath
                math={'\\cos\\alpha = \\tfrac{F_x}{F_\\mathrm{res}}'}
              />
              <br />
              <InlineMath
                math={'F_\\mathrm{res} = \\tfrac{F_x}{\\cos\\alpha}'}
              />
              <br />
              <InlineMath
                math={`F_\\mathrm{res} = \\tfrac{${pp(
                  fx,
                )}\\,\\mathrm N}{\\cos\\left(${pp(alphaDeg)}^{\\circ}\\right)}`}
              />
              <br />
              <InlineMath
                math={`F_\\mathrm{res} \\approx ${pp(fresB)}\\,\\mathrm N`}
              />
            </>
          )
        }

        return (
          <>
            <InlineMath math={'\\sin\\alpha = \\tfrac{F_y}{F_\\mathrm{res}}'} />
            <br />
            <InlineMath math={'F_\\mathrm{res} = \\tfrac{F_y}{\\sin\\alpha}'} />
            <br />
            <InlineMath
              math={`F_\\mathrm{res} = \\tfrac{${pp(
                fy,
              )}\\,\\mathrm N}{\\sin\\left(${pp(alphaDeg)}^{\\circ}\\right)}`}
            />
            <br />
            <InlineMath
              math={`F_\\mathrm{res} \\approx ${pp(fresB)}\\,\\mathrm N`}
            />
          </>
        )
      },
    },
  ],
}
