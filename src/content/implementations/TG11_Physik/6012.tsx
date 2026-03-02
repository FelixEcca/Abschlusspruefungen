import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  alphaDeg: number
  fg: number
  fn: number
  fh: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function arrowHeadPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  size = 10,
) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const ux = dx / len
  const uy = dy / len
  // perpendicular
  const px = -uy
  const py = ux

  const backX = x2 - ux * size
  const backY = y2 - uy * size

  const leftX = backX + px * (size * 0.6)
  const leftY = backY + py * (size * 0.6)
  const rightX = backX - px * (size * 0.6)
  const rightY = backY - py * (size * 0.6)

  return `${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`
}

function InclineForcesSvg(props: {
  alphaDeg: number
  fgText: string
  fnText: string
  fhText: string
}) {
  const { alphaDeg, fgText, fnText, fhText } = props
  const rad = (alphaDeg * Math.PI) / 180

  // geometry (not to scale)
  const x0 = 70
  const y0 = 190
  const xBase = 350
  const yBase = 190
  const xTop = 350
  const yTop = 70

  // block center on the plane (line from x0,y0 to xTop,yTop)
  const t = 0.62
  const bx = x0 + (xTop - x0) * t
  const by = y0 + (yTop - y0) * t - 17

  // direction along plane (up-slope)
  const ux = Math.cos((25 * Math.PI) / 180)
  const uy = -Math.sin((25 * Math.PI) / 180)

  // down-slope direction
  const dx = -ux
  const dy = -uy

  // outward normal (perpendicular away from plane)
  // IMPORTANT: choose the normal that points "out of the plane" (up-left in screen coords)
  const nx = -Math.sin((25 * Math.PI) / 180)
  const ny = -Math.cos((25 * Math.PI) / 180)

  // arrow lengths
  const Lh = 85
  const Ln = 80
  const Lg = 85

  // endpoints
  const fhx = bx + dx * Lh
  const fhy = by + dy * Lh

  const fnx = bx + nx * Ln
  const fny = by + ny * Ln

  const fgx = bx
  const fgy = by + Lg

  // block (aligned to plane)
  const blockW = 46
  const blockH = 28
  const rotDeg = -25

  // small right-angle marker between plane and normal near the block
  const m = 14
  const p1x = bx + dx * m
  const p1y = by + dy * m
  const p2x = p1x + nx * m
  const p2y = p1y + ny * m
  const p3x = bx + nx * m
  const p3y = by + ny * m

  // angle marker at base
  const arcCx = x0 + 45
  const arcCy = y0
  const r = 26
  const ax = arcCx + r
  const ay = arcCy
  const bxArc = arcCx + r * Math.cos(rad)
  const byArc = arcCy - r * Math.sin(rad)

  return (
    <svg viewBox="0 0 420 230">
      {/* incline */}
      <path
        d={`M ${x0} ${y0} L ${xBase} ${yBase} L ${xTop} ${yTop} Z`}
        fill="none"
        stroke="black"
        strokeWidth="3"
      />

      {/* angle alpha */}

      <text x={arcCx + 10} y={arcCy - 8} fontSize="14">
        {`α = ${pp(alphaDeg)}°`}
      </text>

      {/* block */}
      <rect
        x={bx - blockW / 2}
        y={by - blockH / 2}
        width={blockW}
        height={blockH}
        fill="none"
        stroke="black"
        strokeWidth="2"
        transform={`rotate(${rotDeg} ${bx} ${by})`}
      />
      <circle cx={bx} cy={by} r="2.5" fill="black" />

      {/* right-angle marker between plane and normal */}
      <path
        d={`M ${bx} ${by} L ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y} Z`}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />

      {/* FH (parallel to plane, down-slope) */}
      <line x1={bx} y1={by} x2={fhx} y2={fhy} stroke="black" strokeWidth="2" />
      <polygon points={arrowHeadPoints(bx, by, fhx, fhy, 10)} fill="black" />
      <text x={fhx - 55} y={fhy} fontSize="14">
        {fhText}
      </text>

      {/* FN (perpendicular outward) */}
      <line x1={bx} y1={by} x2={fnx} y2={fny} stroke="black" strokeWidth="2" />
      <polygon points={arrowHeadPoints(bx, by, fnx, fny, 10)} fill="black" />
      <text x={fnx - 10} y={fny - 10} fontSize="14">
        {fnText}
      </text>

      {/* FG (vertical down) */}
      <line x1={bx} y1={by} x2={fgx} y2={fgy} stroke="black" strokeWidth="2" />
      <polygon points={arrowHeadPoints(bx, by, fgx, fgy, 10)} fill="black" />
      <text x={fgx + 10} y={fgy - 8} fontSize="14">
        {fgText}
      </text>
    </svg>
  )
}

export const exercise6012: Exercise<DATA> = {
  title: 'Kräfte an der schiefen Ebene',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const possibleAngles = [15, 20, 25, 30, 35, 40, 45]
    const alphaDeg = rng.randomItemFromArray(possibleAngles)
    const rad = (alphaDeg * Math.PI) / 180

    const fg = rng.randomIntBetween(80, 1200) // N
    const fn = round2(fg * Math.cos(rad))
    const fh = round2(fg * Math.sin(rad))

    return { alphaDeg, fg, fn, fh }
  },

  originalData: {
    alphaDeg: 30,
    fg: 743,
    fn: round2(743 * Math.cos((30 * Math.PI) / 180)),
    fh: round2(743 * Math.sin((30 * Math.PI) / 180)),
  },

  constraint({ data }) {
    return data.alphaDeg > 0 && data.fg > 0 && data.fn > 0 && data.fh > 0
  },

  task({ data }) {
    const { alphaDeg, fg } = data
    return (
      <>
        <p>
          Ein Körper liegt auf einer schiefen Ebene (Skizze nicht
          maßstabsgetreu). Die Gewichtskraft wird in zwei Komponenten zerlegt:{' '}
          <InlineMath math={'F_\\mathrm{H}'} /> (parallel zur Ebene,
          hangabwärts) und <InlineMath math={'F_\\mathrm{N}'} /> (senkrecht zur
          Ebene).
        </p>
        <svg viewBox="0 0 328 328">
          <image
            href="/content/TG11_Physik/6012.png"
            height="328"
            width="328"
          />
        </svg>{' '}
        <ul className="list-disc ml-6">
          <li>
            <InlineMath math={`F_\\mathrm{G} = ${pp(fg)}\\,\\mathrm N`} />
          </li>
          <li>
            <InlineMath math={`\\alpha = ${pp(alphaDeg)}^{\\circ}`} />
          </li>
        </ul>
        <p>
          Berechne <InlineMath math={'F_\\mathrm{H}'} /> und{' '}
          <InlineMath math={'F_\\mathrm{N}'} />.
        </p>
      </>
    )
  },

  solution({ data }) {
    const { alphaDeg, fg, fn, fh } = data

    return (
      <>
        <InlineMath math={'F_\\mathrm{H} = F_\\mathrm{G}\\cdot\\sin\\alpha'} />
        <br />
        <InlineMath
          math={`F_\\mathrm{H} = ${pp(fg)}\\,\\mathrm N\\cdot\\sin\\left(${pp(
            alphaDeg,
          )}^{\\circ}\\right) \\approx ${pp(fh)}\\,\\mathrm N`}
        />
        <br />
        <br />
        <InlineMath math={'F_\\mathrm{N} = F_\\mathrm{G}\\cdot\\cos\\alpha'} />
        <br />
        <InlineMath
          math={`F_\\mathrm{N} = ${pp(fg)}\\,\\mathrm N\\cdot\\cos\\left(${pp(
            alphaDeg,
          )}^{\\circ}\\right) \\approx ${pp(fn)}\\,\\mathrm N`}
        />
      </>
    )
  },
}
