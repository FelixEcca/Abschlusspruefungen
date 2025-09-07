import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type GivenSide = 'a' | 'b' | 'c' // a=Gegenkathete zu α, b=Ankathete zu α, c=Hypotenuse
type Ask = 'a' | 'b' | 'c' | 'beta' // gesucht: eine Seite oder der andere spitze Winkel β
interface DATA {
  alpha: number // 20..60°
  a: number
  b: number
  c: number
  givenSide: GivenSide
  ask: Ask
}

/** runde Skizzen-Koordinaten */
function triSVG() {
  return {
    base: '30,140 250,140 30,40 30,140', // rechtwinklig bei (30,140)
    rightAngle: '30,140 55,140 55,115',
  }
}

export const exercise4601: Exercise<DATA> = {
  title: 'Winkelfunktionen im rechtwinkligen Dreieck',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const alpha = rng.randomIntBetween(20, 60) // Grad
    // Erzeuge ein "nettes" Dreieck: starte mit Hypotenuse und runde a,b
    const c = rng.randomIntBetween(7, 12)
    const rad = (alpha * Math.PI) / 180
    const aReal = c * Math.sin(rad) // Gegenkathete
    const bReal = c * Math.cos(rad) // Ankathete
    const a = Math.max(1, Math.round(aReal))
    const b = Math.max(1, Math.round(bReal))

    const givenSide = rng.randomItemFromArray<GivenSide>(['a', 'b', 'c'])
    const askPool: Ask[] =
      givenSide === 'a' ? ['b', 'c', 'beta'] :
      givenSide === 'b' ? ['a', 'c', 'beta'] :
      ['a', 'b', 'beta']
    const ask = rng.randomItemFromArray<Ask>(askPool)

    return { alpha, a, b, c, givenSide, ask }
  },

  originalData: { alpha: 37, a: 6, b: 8, c: 10, givenSide: 'b', ask: 'c' },

  task({ data }) {
    const { alpha, givenSide, a, b, c, ask } = data
    const labelsGiven =
      givenSide === 'a'
        ? <InlineMath math={`\\alpha=${alpha}^{\\circ},\\; a=${a}`} />
        : givenSide === 'b'
          ? <InlineMath math={`\\alpha=${alpha}^{\\circ},\\; b=${b}`} />
          : <InlineMath math={`\\alpha=${alpha}^{\\circ},\\; c=${c}`} />

    return (
      <>
        <p>
          Gegeben ist ein rechtwinkliges Dreieck mit{' '}
          <InlineMath math={`\\alpha=${alpha}^{\\circ}`} /> (am linken Fußpunkt).
          Es ist genau <b>eine</b> Seitenlänge bekannt. Bestimme die gesuchte Größe.
        </p>

        {/* Skizze */}
        <svg viewBox="0 0 280 180" className="border rounded my-2">
          <polyline points={triSVG().base} fill="none" stroke="black" strokeWidth="2" />
          <text x="180" y="135" fontSize="12">α={alpha}°</text>
          {/* Seitenbeschriftung grob */}
          <text x="140" y="160" fontSize="20">b</text>
          <text x="0" y="100" fontSize="20" transform="rotate(-90 10,90)">a</text>
          <text x="140" y="80" fontSize="20">c</text>
        </svg>

        <p>Gegeben: {labelsGiven}. Gesucht: <b>{
          ask==='a'?'a ':
          ask==='b'?'b ':
          ask==='c'?'c ':'β'
        }</b>.</p>
      </>
    )
  },

  solution({ data }) {
    const { alpha, a, b, c, givenSide, ask } = data
    const rad = (alpha * Math.PI) / 180

    // Beziehungen: sin α = a/c, cos α = b/c, tan α = a/b, β = 90°-α
    let formel = ''
    let einsetzen = ''
    let ergebnis: number | string = ''

    if (ask === 'c') {
      if (givenSide === 'a') {
        formel = '\\sin\\,\\alpha=\\tfrac{a}{c}'
        einsetzen = `\\sin(${alpha}^{\\circ})=\\tfrac{${pp(a)}}{c}`
        ergebnis = (a / Math.sin(rad))
      } else { // given b
        formel = '\\cos\\,\\alpha=\\tfrac{b}{c}'
        einsetzen = `\\cos(${alpha}^{\\circ})=\\tfrac{${pp(b)}}{c}`
        ergebnis = (b / Math.cos(rad))
      }
    } else if (ask === 'a') {
      if (givenSide === 'c') {
        formel = '\\sin\\,\\alpha=\\tfrac{a}{c}'
        einsetzen = `\\sin(${alpha}^{\\circ})=\\tfrac{a}{${pp(c)}}`
        ergebnis = (c * Math.sin(rad))
      } else { // given b
        formel = '\\tan\\,\\alpha=\\tfrac{a}{b}'
        einsetzen = `\\tan(${alpha}^{\\circ})=\\tfrac{a}{${pp(b)}}`
        ergebnis = (b * Math.tan(rad))
      }
    } else if (ask === 'b') {
      if (givenSide === 'c') {
        formel = '\\cos\\,\\alpha=\\tfrac{b}{c}'
        einsetzen = `\\cos(${alpha}^{\\circ})=\\tfrac{b}{${pp(c)}}`
        ergebnis = (c * Math.cos(rad))
      } else { // given a
        formel = '\\tan\\,\\alpha=\\tfrac{a}{b}'
        einsetzen = `\\tan(${alpha}^{\\circ})=\\tfrac{${pp(a)}}{b}`
        ergebnis = (a / Math.tan(rad))
      }
    } else { // ask === 'beta'
      // α + β = 90°
      formel = '\\alpha+\\beta=90^{\\circ}'
      einsetzen = `${alpha}^{\\circ}+\\beta=90^{\\circ}`
      ergebnis = 90 - alpha
    }

    const out =
      typeof ergebnis === 'number'
        ? Math.round(ergebnis * 100) / 100
        : ergebnis

    return (
      <>
        <p><b>Formel → Einsetzen → Lösen</b></p>
        <InlineMath math={formel} /><br />
        <InlineMath math={einsetzen} /><br />
        {ask === 'beta'
          ? <InlineMath math={`\\Rightarrow\\; \\beta= ${out}^{\\circ}`} />
          : <InlineMath math={`\\Rightarrow\\; ${ask}= ${pp(out)}`} />
        }
        <p className="text-xs text-gray-600 mt-2">
          Hinweis: Um Winkel aus Seiten zu bestimmen, nutze z.&nbsp;B.{' '}
          <InlineMath math={`\\beta=\\tan^{-1}(\\tfrac{a}{b})`} /> oder{' '}
          <InlineMath math={`\\beta=\\sin^{-1}(\\tfrac{a}{c})`} /> bzw.{' '}
          <InlineMath math={`\\beta=\\cos^{-1}(\\tfrac{b}{c})`} />. Hier genügt
          <InlineMath math="\\;\\beta=90^{\\circ}-\\alpha" />.
        </p>
      </>
    )
  },
}
