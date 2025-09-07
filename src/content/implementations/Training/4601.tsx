import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Side = 'a' | 'b' | 'c' // a = Gegenkathete zu α, b = Ankathete zu α, c = Hypotenuse
type Ask = 'a' | 'b' | 'c' | 'alpha' | 'beta'
type GivenAngle = 'alpha' | 'beta' | 'none'

interface DATA {
  alpha: number // wir speichern immer α (falls β gegeben war: α = 90°−β)
  a: number
  b: number
  c: number
  givenAngle: GivenAngle
  givenSides: Side[] // 1 Seite, wenn eine Seite gesucht wird; 2 Seiten, wenn ein Winkel gesucht wird
  ask: Ask
}

/** Skizzen-Pfade */
function triSVG() {
  return {
    // rechtwinklig bei (30,140), Spitze bei (30,40), rechter Fußpunkt bei (250,140)
    base: '30,140 250,140 30,40 30,140',
    rightAngleSquare: '30,140 55,140 55,115', // kleines Quadrat
  }
}

export const exercise4601: Exercise<DATA> = {
  title: 'Winkelfunktionen im rechtwinkligen Dreieck',
  source: 'Training',
  useCalculator: true,
  duration: 8,
  points: 4,

  generator(rng) {
    // α „echter“ Winkel 20..60°, Seiten aus Hypotenuse konstruiert
    const alpha = rng.randomIntBetween(20, 60)
    const rad = (alpha * Math.PI) / 180
    // starte mit Hypotenuse (7..12) und runde Katheten
    const c0 = rng.randomIntBetween(7, 12)
    const a = Math.max(1, Math.round(c0 * Math.sin(rad)))
    const b = Math.max(1, Math.round(c0 * Math.cos(rad)))
    const c = Math.max(1, Math.round(Math.hypot(a, b))) // auf Integer bringen

    // zwei Modi:
    // 1) Seite gesucht -> 1 Winkel (α oder β) + 1 Seite gegeben
    // 2) Winkel gesucht -> KEIN Winkel gegeben + 2 Seiten gegeben
    const angleAsked = rng.randomItemFromArray([true, false])

    if (angleAsked) {
      // Winkel gesucht: α oder β suchen, zwei Seiten vorgeben
      const ask: Ask = rng.randomItemFromArray(['alpha', 'beta'])
      const sidePair: [Side, Side] = rng.randomItemFromArray([
        ['a', 'b'],
        ['a', 'c'],
        ['b', 'c'],
      ])
      return {
        alpha,
        a,
        b,
        c,
        givenAngle: 'none',
        givenSides: sidePair,
        ask,
      }
    } else {
      // Seite gesucht: genau 1 Winkel + 1 Seite vorgeben
      const givenAngle: GivenAngle = rng.randomItemFromArray(['alpha', 'beta'])
      const givenSide: Side = rng.randomItemFromArray(['a', 'b', 'c'])
      // gesuchte Seite darf nicht die gegebene sein
      const ask: Ask = rng.randomItemFromArray(
        (['a', 'b', 'c'] as Side[]).filter(s => s !== givenSide),
      ) as Ask
      return {
        alpha,
        a,
        b,
        c,
        givenAngle,
        givenSides: [givenSide],
        ask,
      }
    }
  },

  // Beispiel
  originalData: {
    alpha: 37,
    a: 6,
    b: 8,
    c: 10,
    givenAngle: 'alpha',
    givenSides: ['b'],
    ask: 'c',
  },

  task({ data }) {
    const { alpha, a, b, c, givenAngle, givenSides, ask } = data

    // Labels für „Gegeben“
    const angleLabel =
      givenAngle === 'alpha' ? (
        <InlineMath math={`\\alpha=${alpha}^{\\circ}`} />
      ) : givenAngle === 'beta' ? (
        <InlineMath math={`\\beta=${90 - alpha}^{\\circ}`} />
      ) : null

    const sideValue = (s: Side) => (s === 'a' ? a : s === 'b' ? b : c)
    const sideLabel = (s: Side) => (
      <InlineMath math={`${s}=${pp(sideValue(s))}`} />
    )

    return (
      <>
        <p>Gegeben ist ein rechtwinkliges Dreieck siehe Skizze.</p>
        <p>
          <b>Gesucht:</b>{' '}
          {
            {
              a: 'a',
              b: 'b',
              c: 'c)',
              alpha: 'α',
              beta: 'β',
            }[ask]
          }
        </p>

        {/* Skizze */}
        <svg viewBox="0 0 280 180" className="border rounded my-2">
          {/* Dreieck */}
          <polyline
            points={triSVG().base}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          {/* rechter Winkel: kleines Quadrat + Kreisbogen */}

          {/* Kreisbogen am rechten Winkel (Viertelkreis, r=18) */}
          <path
            d="M30,122 A18,18 0 0,1 48,140"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          {/* α am rechten Fußpunkt (ungefähr) */}
          <path
            d="M160,140 A30,30 0 0,1 170,105"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          {givenAngle === 'alpha' ? (
            <text x="165" y="130" fontSize="12" fill="black">
              α={alpha}°
            </text>
          ) : (
            <text x="165" y="130" fontSize="15" fill="black">
              α
            </text>
          )}
          {givenAngle === 'beta' ? (
            <text x="35" y="75" fontSize="12" fill="black">
              β={90 - alpha}°
            </text>
          ) : (
            <text x="35" y="75" fontSize="15" fill="black">
              β
            </text>
          )}
          {/* Kreisbogen oben links um β (Viertelkreis, r=18) */}
          <path
            d="M80,62 A50,50 0 0,1 30,90"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
          {/* Seitenbeschriftungen: Gegebene Werte als Zahl, andere als Buchstabe */}
          {/* b unten */}
          <text x="140" y="160" fontSize="14">
            {givenSides.includes('b') ? b : 'b'}
          </text>
          {/* a links (hochkant) */}
          <text x="0" y="100" fontSize="14" transform="rotate(-90 10,90)">
            {givenSides.includes('a') ? a : 'a'}
          </text>
          {/* c schräg */}
          <text x="140" y="80" fontSize="14">
            {givenSides.includes('c') ? c : 'c'}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    const { alpha, a, b, c, givenAngle, givenSides, ask } = data
    // wir rechnen intern immer mit α
    const alphaDeg = alpha
    const alphaRad = (alphaDeg * Math.PI) / 180

    // Hilfsfunktionen
    const formulaLine = (f: string) => <InlineMath math={f} />
    const eq = (lhs: string, rhs: string) => (
      <InlineMath math={`${lhs}=${rhs}`} />
    )

    // --- Fälle ---
    // 1) Seite gesucht (eine Seite + ein Winkel gegeben)
    if (ask === 'a' || ask === 'b' || ask === 'c') {
      // wir haben genau 1 gegebene Seite
      const g = givenSides[0] as Side
      // effektiver Winkel in Grad/Rad: ist α gegeben oder β? (bei β: α = 90°−β -> bereits in data.alpha enthalten)
      // givenAngle dient hier nur der Darstellung in "Einsetzen"
      const angleDisplay =
        givenAngle === 'alpha'
          ? `\\alpha=${alphaDeg}^{\\circ}`
          : givenAngle === 'beta'
            ? `\\beta=${90 - alphaDeg}^{\\circ}`
            : `\\alpha=${alphaDeg}^{\\circ}`

      // Formelauswahl (immer in α-Notation lösen)
      // sin α = a/c, cos α = b/c, tan α = a/b
      let formel = ''
      let einsetzen = ''
      let res = 0

      if (ask === 'c') {
        if (g === 'a') {
          formel = '\\sin\\,\\alpha=\\tfrac{a}{c}'
          einsetzen = `\\sin(${alphaDeg}^{\\circ})=\\tfrac{${pp(a)}}{c}`
          res = a / Math.sin(alphaRad)
        } else if (g === 'b') {
          formel = '\\cos\\,\\alpha=\\tfrac{b}{c}'
          einsetzen = `\\cos(${alphaDeg}^{\\circ})=\\tfrac{${pp(b)}}{c}`
          res = b / Math.cos(alphaRad)
        } else {
          // g = c, aber c ist gegeben und c gesucht ist ausgeschlossen (Generator verhindert das)
          formel = '\\sin\\,\\alpha=\\tfrac{a}{c}'
          einsetzen = `\\sin(${alphaDeg}^{\\circ})=\\tfrac{a}{${pp(c)}}`
          res = c // Fallback
        }
      } else if (ask === 'a') {
        if (g === 'c') {
          formel = '\\sin\\,\\alpha=\\tfrac{a}{c}'
          einsetzen = `\\sin(${alphaDeg}^{\\circ})=\\tfrac{a}{${pp(c)}}`
          res = c * Math.sin(alphaRad)
        } else if (g === 'b') {
          formel = '\\tan\\,\\alpha=\\tfrac{a}{b}'
          einsetzen = `\\tan(${alphaDeg}^{\\circ})=\\tfrac{a}{${pp(b)}}`
          res = b * Math.tan(alphaRad)
        } else {
          // g = a -> trivial
          formel = 'a=a'
          einsetzen = `a=${pp(a)}`
          res = a
        }
      } else {
        // ask === 'b'
        if (g === 'c') {
          formel = '\\cos\\,\\alpha=\\tfrac{b}{c}'
          einsetzen = `\\cos(${alphaDeg}^{\\circ})=\\tfrac{b}{${pp(c)}}`
          res = c * Math.cos(alphaRad)
        } else if (g === 'a') {
          formel = '\\tan\\,\\alpha=\\tfrac{a}{b}'
          einsetzen = `\\tan(${alphaDeg}^{\\circ})=\\tfrac{${pp(a)}}{b}`
          res = a / Math.tan(alphaRad)
        } else {
          // g = b
          formel = 'b=b'
          einsetzen = `b=${pp(b)}`
          res = b
        }
      }

      const out = Math.round(res * 100) / 100

      return (
        <>
          {formulaLine(formel)}
          <br />
          {formulaLine(einsetzen)}
          <br />
          {/* Rearranged equation using dfrac and plugged-in values */}
          {ask === 'a' && g === 'b'
            ? formulaLine(`a =${pp(b)} \\cdot \\tan\\,${alphaDeg}^{\\circ}`)
            : ask === 'a' && g === 'c'
              ? formulaLine(`a =${pp(c)} \\cdot \\sin\\,${alphaDeg}^{\\circ}`)
              : ask === 'b' && g === 'a'
                ? formulaLine(
                    `b = \\dfrac{${pp(a)}}{\\tan\\,${alphaDeg}^{\\circ}}`,
                  )
                : ask === 'b' && g === 'c'
                  ? formulaLine(
                      `b = ${pp(c)} \\cdot \\cos\\,${alphaDeg}^{\\circ}`,
                    )
                  : ask === 'c' && g === 'a'
                    ? formulaLine(
                        `c =\\dfrac{${pp(a)}}{\\sin\\,${alphaDeg}^{\\circ}}`,
                      )
                    : ask === 'c' && g === 'b'
                      ? formulaLine(
                          `c =\\dfrac{${pp(b)}}{\\cos\\,${alphaDeg}^{\\circ}}`,
                        )
                      : null}
          <br />
          {formulaLine(`\\Rightarrow\\; ${ask}= ${pp(out)}`)}
        </>
      )
    }

    // 2) Winkel gesucht (zwei Seiten gegeben, kein Winkel gegeben)
    // gegebene Seitenpaare: (a,c) ⇒ sin, (b,c) ⇒ cos, (a,b) ⇒ tan
    const [s1, s2] = givenSides
    let formel = ''
    let einsetzen = ''
    let alphaResDeg = alphaDeg // wird unten überschrieben

    // Determine which angle is being asked for
    const isAlpha = data.ask === 'alpha'
    if ((s1 === 'a' && s2 === 'c') || (s1 === 'c' && s2 === 'a')) {
      formel = isAlpha
        ? '\\sin\\,\\alpha=\\tfrac{a}{c}'
        : '\\sin\\,\\beta=\\tfrac{b}{c}'
      einsetzen = isAlpha
        ? `\\sin\\,\\alpha=\\tfrac{${pp(a)}}{${pp(c)}}`
        : `\\sin\\,\\beta=\\tfrac{${pp(b)}}{${pp(c)}}`
      alphaResDeg = isAlpha
        ? (Math.asin(a / c) * 180) / Math.PI
        : 90 - (Math.asin(a / c) * 180) / Math.PI
    } else if ((s1 === 'b' && s2 === 'c') || (s1 === 'c' && s2 === 'b')) {
      formel = isAlpha
        ? '\\cos\\,\\alpha=\\tfrac{b}{c}'
        : '\\cos\\,\\beta=\\tfrac{a}{c}'
      einsetzen = isAlpha
        ? `\\cos\\,\\alpha=\\tfrac{${pp(b)}}{${pp(c)}}`
        : `\\cos\\,\\beta=\\tfrac{${pp(a)}}{${pp(c)}}`
      alphaResDeg = isAlpha
        ? (Math.acos(b / c) * 180) / Math.PI
        : 90 - (Math.acos(b / c) * 180) / Math.PI
    } else {
      // (a,b)
      formel = isAlpha
        ? '\\tan\\,\\alpha=\\tfrac{a}{b}'
        : '\\tan\\,\\beta=\\tfrac{b}{a}'
      einsetzen = isAlpha
        ? `\\tan\\,\\alpha=\\tfrac{${pp(a)}}{${pp(b)}}`
        : `\\tan\\,\\beta=\\tfrac{${pp(b)}}{${pp(a)}}`
      alphaResDeg = isAlpha
        ? (Math.atan(a / b) * 180) / Math.PI
        : 90 - (Math.atan(a / b) * 180) / Math.PI
    }

    const alphaOut = Math.round(alphaResDeg * 100) / 100
    const betaOut = Math.round((90 - alphaResDeg) * 100) / 100

    return (
      <>
        <p></p>
        {formulaLine(formel)}
        <br />
        {formulaLine(einsetzen)}
        <br />
        {/* Rearranged equation using inverse functions */}
        {(() => {
          // Determine which angle is being asked for
          const isAlpha = data.ask === 'alpha'
          if ((s1 === 'a' && s2 === 'c') || (s1 === 'c' && s2 === 'a')) {
            // sin^-1
            return (
              <>
                {formulaLine(
                  `${isAlpha ? '\\alpha' : '\\beta'} = \\sin^{-1}\\left(\\dfrac{${isAlpha ? pp(a) : pp(b)}}{${pp(c)}}\\right)`,
                )}
              </>
            )
          } else if ((s1 === 'b' && s2 === 'c') || (s1 === 'c' && s2 === 'b')) {
            // cos^-1
            return (
              <>
                {formulaLine(
                  `${isAlpha ? '\\alpha' : '\\beta'} = \\cos^{-1}\\left(\\dfrac{${isAlpha ? pp(b) : pp(a)}}{${pp(c)}}\\right)`,
                )}
              </>
            )
          } else {
            // (a,b) tan^-1
            return (
              <>
                {formulaLine(
                  `${isAlpha ? '\\alpha' : '\\beta'} = \\tan^{-1}\\left(\\dfrac{${isAlpha ? pp(a) : pp(b)}}{${isAlpha ? pp(b) : pp(a)}}\\right)`,
                )}
              </>
            )
          }
        })()}
        <br />
        {data.ask === 'alpha'
          ? formulaLine(
              `\\Rightarrow\\; \\alpha\\;=\\;${pp(alphaOut)}^{\\circ}`,
            )
          : formulaLine(`\\Rightarrow\\; \\beta\\;=\\;${pp(betaOut)}^{\\circ}`)}
      </>
    )
  },
}
