import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type ModeA = 'hypotenuse' | 'leg'
type ModeB =
  | 'adjacentFromHyp'
  | 'oppositeFromHyp'
  | 'adjacentFromOpp'
  | 'oppositeFromAdj'
type ModeC = 'asin' | 'acos' | 'atan'

interface DATA {
  // a) Pythagoras
  modeA: ModeA
  a: number
  b: number
  c: number // Hypotenuse
  targetA: 'a' | 'b' | 'c'

  // b) Winkel + Seite -> weitere Seite
  modeB: ModeB
  alphaDegB: number
  adjB: number
  oppB: number
  hypB: number
  targetB: 'adj' | 'opp'

  // c) Winkel aus zwei Seiten
  modeC: ModeC
  alphaDegC: number
  adjC: number
  oppC: number
  hypC: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function round1(x: number) {
  return Math.round(x * 10) / 10
}

function RightTriangleSvg(props: {
  aText: string
  bText: string
  cText: string
  alphaText?: string
}) {
  const { aText, bText, cText, alphaText } = props

  return (
    <svg viewBox="0 0 320 160">
      {/* triangle */}
      <path
        d="M 60 120 L 260 120 L 60 40 Z"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      {/* right angle marker */}
      <path
        d="M 60 120 L 85 120 L 85 95 L 60 95 Z"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />

      {/* labels */}
      <text x="10" y="85" fontSize="16">
        {aText}
      </text>
      <text x="150" y="140" fontSize="16">
        {bText}
      </text>
      <text x="175" y="70" fontSize="16">
        {cText}
      </text>

      {alphaText && (
        <text x="175" y="115" fontSize="14">
          {alphaText}
        </text>
      )}
    </svg>
  )
}

export const exercise6009: Exercise<DATA> = {
  title: 'Rechnen im rechtwinkligen Dreieck',
  source: 'Trigonometrie',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // ---------- a) Pythagoras ----------
    const modeA: ModeA = rng.randomBoolean() ? 'hypotenuse' : 'leg'

    const a = rng.randomIntBetween(3, 20)
    const b = rng.randomIntBetween(3, 20)
    const c = round2(Math.sqrt(a * a + b * b))

    let targetA: 'a' | 'b' | 'c' = 'c'
    if (modeA === 'hypotenuse') {
      targetA = 'c'
    } else {
      targetA = rng.randomBoolean() ? 'a' : 'b'
    }

    // ---------- b) Winkel + Seite -> Seite ----------
    const possibleAngles = [15, 30, 37, 45, 53, 60, 75]
    const alphaDegB = rng.randomItemFromArray(possibleAngles)
    const radB = (alphaDegB * Math.PI) / 180

    const modeB: ModeB = rng.randomItemFromArray([
      'adjacentFromHyp',
      'oppositeFromHyp',
      'adjacentFromOpp',
      'oppositeFromAdj',
    ])

    const base = rng.randomIntBetween(6, 20)

    let adjB = NaN
    let oppB = NaN
    let hypB = NaN
    let targetB: 'adj' | 'opp' = 'opp'

    if (modeB === 'adjacentFromHyp') {
      hypB = base
      adjB = round2(hypB * Math.cos(radB))
      oppB = round2(hypB * Math.sin(radB))
      targetB = 'adj'
    } else if (modeB === 'oppositeFromHyp') {
      hypB = base
      adjB = round2(hypB * Math.cos(radB))
      oppB = round2(hypB * Math.sin(radB))
      targetB = 'opp'
    } else if (modeB === 'adjacentFromOpp') {
      oppB = base
      hypB = round2(oppB / Math.sin(radB))
      adjB = round2(hypB * Math.cos(radB))
      targetB = 'adj'
    } else {
      // oppositeFromAdj
      adjB = base
      hypB = round2(adjB / Math.cos(radB))
      oppB = round2(hypB * Math.sin(radB))
      targetB = 'opp'
    }

    // ---------- c) Winkel aus zwei Seiten ----------
    const modeC: ModeC = rng.randomItemFromArray(['asin', 'acos', 'atan'])

    const adjC = rng.randomIntBetween(4, 20)
    const oppC = rng.randomIntBetween(4, 20)
    const hypC = round2(Math.sqrt(adjC * adjC + oppC * oppC))
    const alphaDegC = round1((Math.atan2(oppC, adjC) * 180) / Math.PI)

    return {
      modeA,
      a,
      b,
      c,
      targetA,
      modeB,
      alphaDegB,
      adjB,
      oppB,
      hypB,
      targetB,
      modeC,
      alphaDegC,
      adjC,
      oppC,
      hypC,
    }
  },

  originalData: {
    modeA: 'leg',
    a: 4,
    b: 20,
    c: round2(Math.sqrt(4 * 4 + 20 * 20)),
    targetA: 'b',
    modeB: 'oppositeFromHyp',
    alphaDegB: 37,
    adjB: round2(10 * Math.cos((37 * Math.PI) / 180)),
    oppB: round2(10 * Math.sin((37 * Math.PI) / 180)),
    hypB: 10,
    targetB: 'opp',
    modeC: 'atan',
    alphaDegC: 36.9,
    adjC: 11,
    oppC: 8,
    hypC: round2(Math.sqrt(11 * 11 + 8 * 8)),
  },

  constraint({ data }) {
    return (
      data.a > 0 &&
      data.b > 0 &&
      data.c > 0 &&
      data.hypB > 0 &&
      data.adjB > 0 &&
      data.oppB > 0 &&
      data.hypC > 0 &&
      data.adjC > 0 &&
      data.oppC > 0
    )
  },

  intro({ data }) {
    return null
  },

  tasks: [
    {
      points: 14,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { a, b, c, targetA } = data

        const aText = targetA === 'a' ? 'a = ?' : `a = ${pp(a)}`
        const bText = targetA === 'b' ? 'b = ?' : `b = ${pp(b)}`
        const cText = targetA === 'c' ? 'c = ?' : `c = ${pp(c)}`

        return (
          <>
            <p>
              Gegeben ist ein rechtwinkliges Dreieck (Skizze nicht
              maßstabsgetreu).
            </p>

            <RightTriangleSvg aText={aText} bText={bText} cText={cText} />

            <p>
              Berechne die fehlende Seite <InlineMath math={targetA} /> mit dem
              Satz des Pythagoras.
            </p>

            <ul className="list-disc ml-6">
              {targetA !== 'a' && (
                <li>
                  <InlineMath math={`a = ${pp(a)}\\,\\mathrm{cm}`} />
                </li>
              )}
              {targetA !== 'b' && (
                <li>
                  <InlineMath math={`b = ${pp(b)}\\,\\mathrm{cm}`} />
                </li>
              )}
              {targetA !== 'c' && (
                <li>
                  <InlineMath math={`c = ${pp(c)}\\,\\mathrm{cm}`} />
                </li>
              )}
            </ul>
          </>
        )
      },
      solution({ data }) {
        const { a, b, c, targetA } = data

        if (targetA === 'c') {
          const cCalc = round2(Math.sqrt(a * a + b * b))
          return (
            <>
              <InlineMath math={'c^{2} = a^{2} + b^{2}'} />
              <br />
              <InlineMath
                math={`c = \\sqrt{a^{2}+b^{2}} = \\sqrt{(${pp(a)}\\,\\mathrm{cm})^{2}+(${pp(
                  b,
                )}\\,\\mathrm{cm})^{2}}`}
              />
              <br />
              <InlineMath math={`c \\approx ${pp(cCalc)}\\,\\mathrm{cm}`} />
            </>
          )
        }

        if (targetA === 'a') {
          const aCalc = round2(Math.sqrt(c * c - b * b))
          return (
            <>
              <InlineMath math={'c^{2} = a^{2} + b^{2}'} />
              <br />
              <InlineMath math={'a^{2} = c^{2} - b^{2}'} />
              <br />
              <InlineMath
                math={`a = \\sqrt{c^{2}-b^{2}} = \\sqrt{(${pp(c)}\\,\\mathrm{cm})^{2}-(${pp(
                  b,
                )}\\,\\mathrm{cm})^{2}}`}
              />
              <br />
              <InlineMath math={`a \\approx ${pp(aCalc)}\\,\\mathrm{cm}`} />
            </>
          )
        }

        const bCalc = round2(Math.sqrt(c * c - a * a))
        return (
          <>
            <InlineMath math={'c^{2} = a^{2} + b^{2}'} />
            <br />
            <InlineMath math={'b^{2} = c^{2} - a^{2}'} />
            <br />
            <InlineMath
              math={`b = \\sqrt{c^{2}-a^{2}} = \\sqrt{(${pp(c)}\\,\\mathrm{cm})^{2}-(${pp(
                a,
              )}\\,\\mathrm{cm})^{2}}`}
            />
            <br />
            <InlineMath math={`b \\approx ${pp(bCalc)}\\,\\mathrm{cm}`} />
          </>
        )
      },
    },
    {
      points: 14,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { modeB, alphaDegB, adjB, oppB, hypB, targetB } = data

        // Standard-Benennung: a = Gegenkathete (opp), b = Ankathete (adj), c = Hypotenuse (hyp)
        const aText = targetB === 'opp' ? 'a = ?' : `a = ${pp(oppB)}`
        const bText = targetB === 'adj' ? 'b = ?' : `b = ${pp(adjB)}`
        const cText = `c = ${pp(hypB)}`
        const alphaText = `α = ${pp(alphaDegB)}°`

        return (
          <>
            <p>
              In einem rechtwinkligen Dreieck ist ein Winkel und eine Seite
              gegeben (Skizze nicht maßstabsgetreu).
            </p>

            <RightTriangleSvg
              aText={
                modeB === 'oppositeFromHyp' || modeB === 'oppositeFromAdj'
                  ? aText
                  : `a = ${pp(oppB)}`
              }
              bText={
                modeB === 'adjacentFromHyp' || modeB === 'adjacentFromOpp'
                  ? bText
                  : `b = ${pp(adjB)}`
              }
              cText={
                modeB === 'adjacentFromHyp' || modeB === 'oppositeFromHyp'
                  ? cText
                  : `c = ${pp(hypB)}`
              }
              alphaText={alphaText}
            />

            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`\\alpha = ${pp(alphaDegB)}^{\\circ}`} />
              </li>

              {(modeB === 'adjacentFromHyp' || modeB === 'oppositeFromHyp') && (
                <li>
                  <InlineMath math={`c = ${pp(hypB)}\\,\\mathrm{cm}`} />
                </li>
              )}

              {modeB === 'adjacentFromOpp' && (
                <li>
                  <InlineMath math={`a = ${pp(oppB)}\\,\\mathrm{cm}`} />
                </li>
              )}

              {modeB === 'oppositeFromAdj' && (
                <li>
                  <InlineMath math={`b = ${pp(adjB)}\\,\\mathrm{cm}`} />
                </li>
              )}
            </ul>

            <p>
              Berechne die gesuchte Seite{' '}
              <InlineMath math={targetB === 'adj' ? 'b' : 'a'} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { modeB, alphaDegB, adjB, oppB, hypB } = data
        const rad = (alphaDegB * Math.PI) / 180

        if (modeB === 'adjacentFromHyp') {
          const bCalc = round2(hypB * Math.cos(rad))
          return (
            <>
              <InlineMath math={'\\cos\\alpha = \\tfrac{b}{c}'} />
              <br />
              <InlineMath math={'b = c\\cdot\\cos\\alpha'} />
              <br />
              <InlineMath
                math={`b = ${pp(hypB)}\\,\\mathrm{cm}\\cdot\\cos\\left(${pp(
                  alphaDegB,
                )}^{\\circ}\\right)`}
              />
              <br />
              <InlineMath math={`b \\approx ${pp(bCalc)}\\,\\mathrm{cm}`} />
            </>
          )
        }

        if (modeB === 'oppositeFromHyp') {
          const aCalc = round2(hypB * Math.sin(rad))
          return (
            <>
              <InlineMath math={'\\sin\\alpha = \\tfrac{a}{c}'} />
              <br />
              <InlineMath math={'a = c\\cdot\\sin\\alpha'} />
              <br />
              <InlineMath
                math={`a = ${pp(hypB)}\\,\\mathrm{cm}\\cdot\\sin\\left(${pp(
                  alphaDegB,
                )}^{\\circ}\\right)`}
              />
              <br />
              <InlineMath math={`a \\approx ${pp(aCalc)}\\,\\mathrm{cm}`} />
            </>
          )
        }

        if (modeB === 'adjacentFromOpp') {
          const bCalc = round2(oppB / Math.tan(rad))
          return (
            <>
              <InlineMath math={'\\tan\\alpha = \\tfrac{a}{b}'} />
              <br />
              <InlineMath math={'b = \\tfrac{a}{\\tan\\alpha}'} />
              <br />
              <InlineMath
                math={`b = \\tfrac{${pp(oppB)}\\,\\mathrm{cm}}{\\tan\\left(${pp(
                  alphaDegB,
                )}^{\\circ}\\right)}`}
              />
              <br />
              <InlineMath math={`b \\approx ${pp(bCalc)}\\,\\mathrm{cm}`} />
            </>
          )
        }

        const aCalc = round2(adjB * Math.tan(rad))
        return (
          <>
            <InlineMath math={'\\tan\\alpha = \\tfrac{a}{b}'} />
            <br />
            <InlineMath math={'a = b\\cdot\\tan\\alpha'} />
            <br />
            <InlineMath
              math={`a = ${pp(adjB)}\\,\\mathrm{cm}\\cdot\\tan\\left(${pp(
                alphaDegB,
              )}^{\\circ}\\right)`}
            />
            <br />
            <InlineMath math={`a \\approx ${pp(aCalc)}\\,\\mathrm{cm}`} />
          </>
        )
      },
    },
    {
      points: 14,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { modeC, adjC, oppC, hypC } = data

        // show the two given sides in the sketch, alpha unknown
        let aText = `a = ${pp(oppC)}`
        let bText = `b = ${pp(adjC)}`
        let cText = `c = ${pp(hypC)}`

        if (modeC === 'asin') {
          // given a and c
          bText = 'b = ?'
        }
        if (modeC === 'acos') {
          // given b and c
          aText = 'a = ?'
        }
        if (modeC === 'atan') {
          // given a and b
          cText = 'c = ?'
        }

        return (
          <>
            <p>
              Bestimme den Winkel <InlineMath math={'\\alpha'} /> (Skizze nicht
              maßstabsgetreu).
            </p>

            <RightTriangleSvg
              aText={aText}
              bText={bText}
              cText={cText}
              alphaText={'α = ?'}
            />

            <ul className="list-disc ml-6">
              {modeC === 'asin' && (
                <>
                  <li>
                    <InlineMath math={`a = ${pp(oppC)}\\,\\mathrm{cm}`} />
                  </li>
                  <li>
                    <InlineMath math={`c = ${pp(hypC)}\\,\\mathrm{cm}`} />
                  </li>
                </>
              )}
              {modeC === 'acos' && (
                <>
                  <li>
                    <InlineMath math={`b = ${pp(adjC)}\\,\\mathrm{cm}`} />
                  </li>
                  <li>
                    <InlineMath math={`c = ${pp(hypC)}\\,\\mathrm{cm}`} />
                  </li>
                </>
              )}
              {modeC === 'atan' && (
                <>
                  <li>
                    <InlineMath math={`a = ${pp(oppC)}\\,\\mathrm{cm}`} />
                  </li>
                  <li>
                    <InlineMath math={`b = ${pp(adjC)}\\,\\mathrm{cm}`} />
                  </li>
                </>
              )}
            </ul>
          </>
        )
      },
      solution({ data }) {
        const { modeC, adjC, oppC, hypC } = data

        if (modeC === 'asin') {
          const alphaCalc = round2((Math.asin(oppC / hypC) * 180) / Math.PI)
          return (
            <>
              <InlineMath math={'\\sin\\alpha = \\tfrac{a}{c}'} />
              <br />
              <InlineMath
                math={`\\sin\\alpha = \\tfrac{${pp(oppC)}}{${pp(hypC)}}`}
              />
              <br />
              <InlineMath
                math={`\\alpha = \\arcsin\\left(\\tfrac{${pp(
                  oppC,
                )}}{${pp(hypC)}}\\right) \\approx ${pp(alphaCalc)}^{\\circ}`}
              />
            </>
          )
        }

        if (modeC === 'acos') {
          const alphaCalc = round2((Math.acos(adjC / hypC) * 180) / Math.PI)
          return (
            <>
              <InlineMath math={'\\cos\\alpha = \\tfrac{b}{c}'} />
              <br />
              <InlineMath
                math={`\\cos\\alpha = \\tfrac{${pp(adjC)}}{${pp(hypC)}}`}
              />
              <br />
              <InlineMath
                math={`\\alpha = \\arccos\\left(\\tfrac{${pp(
                  adjC,
                )}}{${pp(hypC)}}\\right) \\approx ${pp(alphaCalc)}^{\\circ}`}
              />
            </>
          )
        }

        const alphaCalc = round2((Math.atan2(oppC, adjC) * 180) / Math.PI)
        return (
          <>
            <InlineMath math={'\\tan\\alpha = \\tfrac{a}{b}'} />
            <br />
            <InlineMath
              math={`\\tan\\alpha = \\tfrac{${pp(oppC)}}{${pp(adjC)}}`}
            />
            <br />
            <InlineMath
              math={`\\alpha = \\arctan\\left(\\tfrac{${pp(
                oppC,
              )}}{${pp(adjC)}}\\right) \\approx ${pp(alphaCalc)}^{\\circ}`}
            />
          </>
        )
      },
    },
  ],
}
