import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type ModeA = 'componentsFromF' | 'fFromComponent'
type ModeB = 'seilFromFg' | 'fgFromSeil'

interface DATA {
  // a) einfache Zerlegung
  modeA: ModeA
  alphaDegA: number
  fresA: number
  fxA: number
  fyA: number

  // b) Straßenlampe (2 Seile symmetrisch)
  modeB: ModeB
  fg: number // N
  alphaDegB: number // Winkel des Seils zur Horizontalen
  fSeil: number // N
  fresUp: number // N (Summe der y-Komponenten)
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function ForcesDecompSvg(props: {
  alphaText: string
  fxText: string
  fyText: string
  fresText: string
}) {
  const { alphaText, fxText, fyText, fresText } = props

  const ox = 70
  const oy = 170
  const tipX = 310
  const tipY = 70

  return (
    <svg viewBox="0 0 360 210">
      <circle cx={ox} cy={oy} r="2.5" fill="black" />

      {/* Fx */}
      <line x1={ox} y1={oy} x2={tipX} y2={oy} stroke="black" strokeWidth="2" />
      <polygon
        points={`${tipX},${oy} ${tipX - 12},${oy - 6} ${tipX - 12},${oy + 6}`}
        fill="black"
      />
      <text x="170" y="198" fontSize="16">
        {fxText}
      </text>

      {/* Fy */}
      <line x1={ox} y1={oy} x2={ox} y2={tipY} stroke="black" strokeWidth="2" />
      <polygon
        points={`${ox},${tipY} ${ox - 6},${tipY + 12} ${ox + 6},${tipY + 12}`}
        fill="black"
      />
      <text x="8" y="120" fontSize="16">
        {fyText}
      </text>

      {/* Fres */}
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

      <text x="112" y="162" fontSize="14">
        {alphaText}
      </text>
    </svg>
  )
}

function LampBetterSvg(props: {
  alphaText: string
  fgText: string
  fLeftText: string
  fRightText: string
  fresText: string
}) {
  const { alphaText, fgText, fLeftText, fRightText, fresText } = props

  // Geometry (not to scale)
  const ox = 180
  const oy = 140

  const leftAnchorX = 60
  const rightAnchorX = 300
  const anchorY = 30

  return (
    <svg viewBox="0 0 360 240">
      {/* joint */}
      <circle cx={ox} cy={oy} r="3" fill="black" />

      {/* tension forces along ropes (arrows from joint outward) */}
      <line
        x1={ox}
        y1={oy}
        x2={ox - 95}
        y2={oy - 45}
        stroke="red"
        strokeWidth="2"
      />
      <polygon
        points={`${ox - 95},${oy - 45} ${ox - 80},${oy - 50} ${ox - 90},${oy - 31}`}
        fill="red"
      />
      <line
        x1={ox}
        y1={oy}
        x2={ox + 95}
        y2={oy - 45}
        stroke="red"
        strokeWidth="2"
      />
      <polygon
        points={`${ox + 95},${oy - 45} ${ox + 80},${oy - 50} ${ox + 90},${oy - 31}`}
        fill="red"
      />

      {/* resultant up */}
      <line
        x1={ox}
        y1={oy}
        x2={ox}
        y2={oy - 95}
        stroke="black"
        strokeWidth="2"
      />
      <polygon
        points={`${ox},${oy - 95} ${ox - 6},${oy - 83} ${ox + 6},${oy - 83}`}
        fill="black"
      />

      {/* weight down */}
      <line
        x1={ox}
        y1={oy}
        x2={ox}
        y2={oy + 105}
        stroke="black"
        strokeWidth="2"
      />
      <polygon
        points={`${ox},${oy + 105} ${ox - 6},${oy + 93} ${ox + 6},${oy + 93}`}
        fill="black"
      />

      {/* right angle marker between vertical and horizontal at joint (just as a reference) */}
      <path
        d={`M ${ox} ${oy} L ${ox + 18} ${oy} L ${ox + 18} ${oy + 18} L ${ox} ${oy + 18} Z`}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />

      {/* labels */}
      <text x={ox - 110} y="65" fontSize="14">
        {fLeftText}
      </text>
      <text x={ox + 70} y="65" fontSize="14">
        {fRightText}
      </text>

      <text x={ox - 30} y={oy - 65} fontSize="14">
        F_Z
      </text>

      <text x={ox + 10} y={oy + 88} fontSize="14">
        {fgText}
      </text>

      <text x={ox - 15} y={oy - 15} fontSize="14">
        {alphaText}
      </text>
      <text x={ox + 5} y={oy - 15} fontSize="14">
        {alphaText}
      </text>
    </svg>
  )
}

export const exercise6011: Exercise<DATA> = {
  title: 'Kräftezerlegung',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // a) einfache Zerlegung
    const possibleAngles = [15, 20, 25, 30, 37, 45, 53, 60, 75]
    const alphaDegA = rng.randomItemFromArray(possibleAngles)
    const radA = (alphaDegA * Math.PI) / 180

    const fresA = rng.randomIntBetween(120, 900) // N
    const fxA = round2(fresA * Math.cos(radA))
    const fyA = round2(fresA * Math.sin(radA))

    const modeA: ModeA = rng.randomBoolean()
      ? 'componentsFromF'
      : 'fFromComponent'

    // b) Straßenlampe: gesucht sind die Seilkräfte
    const alphaDegB = rng.randomItemFromArray([15, 20, 25, 30, 35, 40])
    const radB = (alphaDegB * Math.PI) / 180

    const modeB: ModeB = 'seilFromFg'
    const fg = rng.randomIntBetween(200, 1200) // N

    // Gleichgewicht: 2 * F * sin(alpha) = F_G
    const fSeil = round2(fg / (2 * Math.sin(radB)))
    const fresUp = fg

    return {
      modeA,
      alphaDegA,
      fresA,
      fxA,
      fyA,
      modeB,
      fg,
      alphaDegB,
      fSeil,
      fresUp,
    }
  },

  originalData: {
    modeA: 'componentsFromF',
    alphaDegA: 20,
    fresA: 300,
    fxA: round2(300 * Math.cos((20 * Math.PI) / 180)),
    fyA: round2(300 * Math.sin((20 * Math.PI) / 180)),
    modeB: 'seilFromFg',
    fg: 400,
    alphaDegB: 40,
    fSeil: round2(400 / (2 * Math.sin((40 * Math.PI) / 180))),
    fresUp: 400,
  },

  constraint({ data }) {
    return (
      data.alphaDegA > 0 &&
      data.fresA > 0 &&
      data.fxA > 0 &&
      data.fyA > 0 &&
      data.fg > 0 &&
      data.alphaDegB > 0 &&
      data.fSeil > 0
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
        const { alphaDegA, fresA } = data

        return (
          <>
            <p>
              Eine Kraft wirkt schräg. Zerlege sie in ihre senkrechten
              Komponenten (Skizze nicht maßstabsgetreu).
            </p>

            <ForcesDecompSvg
              alphaText={`α = ${pp(alphaDegA)}°`}
              fxText={'F_x = ?'}
              fyText={'F_y = ?'}
              fresText={`F = ${pp(fresA)} N`}
            />

            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`F = ${pp(fresA)}\\,\\mathrm N`} />
              </li>
              <li>
                <InlineMath math={`\\alpha = ${pp(alphaDegA)}^{\\circ}`} />
              </li>
            </ul>

            <p>
              Berechne <InlineMath math={'F_x'} /> und{' '}
              <InlineMath math={'F_y'} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { alphaDegA, fresA, fxA, fyA } = data

        return (
          <>
            <InlineMath math={'\\cos\\alpha = \\tfrac{F_x}{F}'} />
            <br />
            <InlineMath math={'F_x = F\\cdot\\cos\\alpha'} />
            <br />
            <InlineMath
              math={`F_x = ${pp(fresA)}\\,\\mathrm N\\cdot\\cos\\left(${pp(
                alphaDegA,
              )}^{\\circ}\\right) \\approx ${pp(fxA)}\\,\\mathrm N`}
            />
            <br />
            <br />
            <InlineMath math={'\\sin\\alpha = \\tfrac{F_y}{F}'} />
            <br />
            <InlineMath math={'F_y = F\\cdot\\sin\\alpha'} />
            <br />
            <InlineMath
              math={`F_y = ${pp(fresA)}\\,\\mathrm N\\cdot\\sin\\left(${pp(
                alphaDegA,
              )}^{\\circ}\\right) \\approx ${pp(fyA)}\\,\\mathrm N`}
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
        const { fg, alphaDegB } = data

        return (
          <>
            <p>
              Eine Straßenlampe hängt an zwei gleichen Seilen. Die Seile sind
              symmetrisch und schließen jeweils den Winkel{' '}
              <InlineMath math={'\\alpha'} /> mit der Horizontalen ein (Skizze
              nicht maßstabsgetreu).
            </p>

            <LampBetterSvg
              alphaText={`α`}
              fgText={`F_G = ${pp(fg)} N`}
              fLeftText={'F = ?'}
              fRightText={'F = ?'}
              fresText={'F_res = ?'}
            />

            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`F_\\mathrm{G} = ${pp(fg)}\\,\\mathrm N`} />
              </li>
              <li>
                <InlineMath math={`\\alpha = ${pp(alphaDegB)}^{\\circ}`} />
              </li>
            </ul>

            <p>
              Bestimme die Seilkraft <InlineMath math={'F'} /> in jedem der
              beiden Seile.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { fg, alphaDegB, fSeil } = data

        return (
          <>
            <p>
              Die Kraft <InlineMath math={'F_\\mathrm{Z}'} /> entspricht gleich
              der Gewichtskraft.
            </p>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/TG11_Physik/6011.png"
                height="200"
                width="328"
              />
            </svg>

            <br />
            <InlineMath math={'F_\\mathrm{Z}=2\\cdot F_y '} />
            <br />
            <InlineMath
              math={`\\Rightarrow F_y = ${pp(fg / 2)}\\,\\mathrm N`}
            />

            <br />
            <InlineMath math={'F = \\tfrac{F_\\mathrm{y}}{\\sin\\alpha}'} />
            <br />
            <InlineMath
              math={`F = \\tfrac{${pp(fg / 2)}\\,\\mathrm N}{\\sin\\left(${pp(
                alphaDegB,
              )}^{\\circ}\\right)} \\approx ${pp(fSeil)}\\,\\mathrm N`}
            />
            <p>
              Die Kräfte in den Seilen betragen jeweils{' '}
              <InlineMath math={`${pp(fSeil)}\\,\\mathrm N`} />.
            </p>
          </>
        )
      },
    },
  ],
}
