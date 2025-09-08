// ===============================
// 2B — Strahlensatz (A–C, y, α)
// ===============================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3106 {
  a: number
  b: number
  rRight: number
}

export const exercise3106: Exercise<DATA3106> = {
  title: 'Strahlensatz',
  source: '2023 Wahlteil Aufgabe 2B',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    const a = rng.randomIntBetween(4, 7) // „links oben“
    const b = rng.randomIntBetween(3, 6) // „links unten“
    const rRight = rng.randomIntBetween(5, 8) // rechte gegebene Strecke
    return { a, b, rRight }
  },

  originalData: { a: 5, b: 3, rRight: 6 },

  constraint({ data }) {
    return data.b !== 0
  },

  intro({ data }) {
    return (
      <>
        <p>
          Die Geraden <InlineMath math="f" /> und <InlineMath math="g" /> sind
          parallel. Es gelten ähnliche Dreiecke.
        </p>
        <div className="space-y-1">
          <div>
            (A)&nbsp;
            <InlineMath
              math={`\\dfrac{y}{${data.rRight}}=\\dfrac{${data.a}}{${data.b}}`}
            />
          </div>
          <div>
            (B)&nbsp;
            <InlineMath
              math={`\\dfrac{${data.rRight}}{y+${data.rRight}}=\\dfrac{${data.b}}{${data.a}}`}
            />
          </div>
          <div>
            (C)&nbsp;
            <InlineMath
              math={`\\dfrac{y+${data.rRight}}{${data.rRight}}=\\dfrac{${data.a}}{${data.b}}`}
            />
          </div>
        </div>
      </>
    )
  },

  tasks: [
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>1) Markieren Sie die korrekten Gleichungen aus (A)–(C).</p>
            <p>
              2) Berechnen Sie die gesuchte Strecke <InlineMath math="y" />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const y = data.rRight * (data.a / data.b)
        return (
          <div className="space-y-2">
            <p>Korrekt: (A)</p>
            <BlockMath
              math={`\\frac{y}{${data.rRight}}=\\frac{${data.a}}{${data.b}}\\Rightarrow y=${data.rRight}\\cdot\\frac{${data.a}}{${data.b}}=${pp(y)}`}
            />
          </div>
        )
      },
    },
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie den Winkel <InlineMath math="\\alpha" /> der linken
            Transversalen zur Basis (auf 2 Dez.).
          </p>
        )
      },
      solution({ data }) {
        const alpha = (Math.atan(data.a / data.b) * 180) / Math.PI
        return (
          <>
            <InlineMath math="\\tan(\\alpha)=\\dfrac{\\text{Gegenkathete}}{\\text{Ankathete}}=\\dfrac{a}{b}" />
            <br />
            <InlineMath
              math={`\\alpha=\\tan^{-1}\\!\\big(\\tfrac{${data.a}}{${data.b}}\\big)\\approx ${pp(Math.round(alpha * 100) / 100)}^{\\circ}`}
            />
          </>
        )
      },
    },
  ],
}
