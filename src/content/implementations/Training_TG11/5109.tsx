import * as React from 'react'
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Term = { exp: number; coeff: number }

interface DATA {
  terms: Term[] // Polynom
  degree: number // höchster Exponent
  lead: number // Leitkoeffizient
}

function toX(n: number) {
  return 167 + n * ((94.5 * 2) / 10)
}
function toY(n: number) {
  return 163 - n * ((94.5 * 2) / 10)
}

function pickNonZeroInt(rng: any, lo: number, hi: number) {
  let x = rng.randomIntBetween(lo, hi)
  while (x === 0) x = rng.randomIntBetween(lo, hi)
  return x
}

function polyValue(x: number, terms: Term[]) {
  return terms.reduce((acc, t) => acc + t.coeff * Math.pow(x, t.exp), 0)
}

function buildPolyline(terms: Term[]) {
  const pts: string[] = []
  for (let x = -5; x <= 5; x += 0.2) {
    const y = polyValue(x, terms)
    const yClamped = Math.max(-9.5, Math.min(9.5, y))
    pts.push(`${toX(x)},${toY(yClamped)}`)
  }
  return pts.join(' ')
}

function termLatex(t: Term, isFirst: boolean) {
  const a = t.coeff
  const n = t.exp

  const sign = isFirst ? (a < 0 ? '-' : '') : a < 0 ? '-' : '+'
  const absA = Math.abs(a)

  const coeff =
    n === 0
      ? `${absA}`
      : absA === 1
        ? '' // 1*x^n -> nur x^n
        : `${absA}\\cdot `

  const xpart = n === 0 ? '' : n === 1 ? 'x' : `x^{${n}}`
  return `${sign}${coeff}${xpart}`.trim()
}

function polyLatex(terms: Term[]) {
  const sorted = [...terms].sort((a, b) => b.exp - a.exp)
  return sorted
    .map((t, i) => termLatex(t, i === 0))
    .join(' ')
    .replace(/\+\s-/g, '- ')
    .replace(/\s+/g, ' ')
}

function globalBehaviorFromLead(degree: number, lead: number) {
  const even = degree % 2 === 0
  // Leitterm: lead*x^degree
  // x->+inf: lead>0 => +inf, lead<0 => -inf
  const posInf = lead > 0 ? '+\\infty' : '-\\infty'
  // x->-inf: bei geradem Grad gleich wie +inf, bei ungeradem Grad Vorzeichen kippt
  const negInf = even ? posInf : lead > 0 ? '-\\infty' : '+\\infty'
  return { posInf, negInf }
}

export const exercise5109: Exercise<DATA> = {
  title: 'Globalverhalten',
  source: 'Polynomfunktionen',
  useCalculator: false,
  duration: 10,
  points: 4,

  generator(rng) {
    // Grad 1..6 (für saubere Skizzen im KS)
    const degree = rng.randomIntBetween(1, 6)

    // Leitkoeffizient ≠ 0
    const lead = pickNonZeroInt(rng, -3, 3)

    // 2 bis 4 Terme insgesamt
    const termCount = rng.randomIntBetween(2, 4)

    const exps = new Set<number>()
    exps.add(degree)
    while (exps.size < termCount) {
      exps.add(rng.randomIntBetween(0, degree - 1))
    }

    const terms: Term[] = Array.from(exps).map(exp => {
      if (exp === degree) return { exp, coeff: lead }
      // kleine Koeffizienten, damit die Kurve im KS nicht komplett explodiert
      let c = rng.randomIntBetween(-3, 3)
      while (c === 0) c = rng.randomIntBetween(-3, 3)
      return { exp, coeff: c }
    })

    return { terms, degree, lead }
  },

  originalData: {
    // Beispiel: -2x^3 + x + 1
    terms: [
      { exp: 3, coeff: -2 },
      { exp: 1, coeff: 1 },
      { exp: 0, coeff: 1 },
    ],
    degree: 3,
    lead: -2,
  },

  constraint({ data }) {
    // Leitkoeffizient muss zum höchsten Exponenten passen
    const leadTerm = data.terms.find(t => t.exp === data.degree)
    return !!leadTerm && leadTerm.coeff === data.lead && data.lead !== 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const poly = buildPolyline(data.terms)
        return (
          <>
            <p>
              Gegeben ist das Schaubild einer <b>Polynomfunktion</b>. Beschreibe
              das Globalverhalten:
            </p>
            <p>
              <InlineMath
                math={`x\\to \\infty\\Rightarrow f(x)\\to \\square`}
              />
              <br />
              <InlineMath
                math={`x\\to -\\infty\\Rightarrow f(x)\\to \\square`}
              />
            </p>

            <svg viewBox="0 0 328 328" className="my-2">
              <image
                href="/content/BW_2BFS/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <polyline
                points={poly}
                fill="none"
                stroke="black"
                strokeWidth="3"
              />
            </svg>
          </>
        )
      },
      solution({ data }) {
        const { posInf, negInf } = globalBehaviorFromLead(
          data.degree,
          data.lead,
        )
        return (
          <>
            <InlineMath
              math={`\\begin{aligned}
              x\\to\\infty &\\Rightarrow f(x)\\to ${posInf}\\\\
              x\\to-\\infty &\\Rightarrow f(x)\\to ${negInf}
              \\end{aligned}`}
            />
          </>
        )
      },
    },

    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const latex = polyLatex(data.terms)
        return (
          <>
            <p>
              Gegeben ist der Funktionsterm einer Polynomfunktion. Beschreibe
              das Globalverhalten:
            </p>
            <p>
              <InlineMath math={`f(x)=${latex}`} />
            </p>
            <p>
              <InlineMath
                math={`x\\to \\infty\\Rightarrow f(x)\\to \\square`}
              />
              <br />
              <InlineMath
                math={`x\\to -\\infty\\Rightarrow f(x)\\to \\square`}
              />
            </p>
          </>
        )
      },
      solution({ data }) {
        const { posInf, negInf } = globalBehaviorFromLead(
          data.degree,
          data.lead,
        )
        return (
          <>
            <InlineMath
              math={`\\begin{aligned}
              x\\to\\infty &\\Rightarrow f(x)\\to ${posInf}\\\\
              x\\to-\\infty &\\Rightarrow f(x)\\to ${negInf}
              \\end{aligned}`}
            />
          </>
        )
      },
    },
  ],
}
