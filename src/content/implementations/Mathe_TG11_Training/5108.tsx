import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Term = { exp: number; coeff: number }

interface DATA {
  terms: Term[] // unsortiert möglich, wir sortieren fürs Anzeigen
  degree: number
}

function termToLatex(t: Term, isFirst: boolean) {
  const a = t.coeff
  const n = t.exp

  // Vorzeichen + Koeffizient
  const sign = isFirst ? (a < 0 ? '-' : '') : a < 0 ? '-' : '+'
  const absA = Math.abs(a)

  // Koeffizient anzeigen?
  const coeff =
    n === 0
      ? `${absA}`
      : absA === 1
        ? '' // 1x^n -> nur x^n
        : `${absA}\\cdot `

  // x-Teil
  const xpart = n === 0 ? '' : n === 1 ? 'x' : `x^{${n}}`

  return `${sign}${coeff}${xpart || ''}`.trim()
}

function buildPolyLatex(terms: Term[]) {
  const sorted = [...terms].sort((a, b) => b.exp - a.exp)
  return sorted
    .map((t, i) => termToLatex(t, i === 0))
    .join(' ')
    .replace(/\+\s-/g, '- ')
}

export const exercise5108: Exercise<DATA> = {
  title: 'Grad einer Polynomfunktion',
  source: 'Polynomfunktionen',
  useCalculator: false,
  duration: 6,
  points: 3,

  generator(rng) {
    const degree = rng.randomIntBetween(1, 6)

    // 2 bis 4 Terme, Grad-Term ist sicher drin
    const termCount = rng.randomIntBetween(2, 4)
    const exps = new Set<number>()
    exps.add(degree)

    while (exps.size < termCount) {
      exps.add(rng.randomIntBetween(0, degree))
    }

    const terms: Term[] = Array.from(exps).map(exp => {
      let coeff = rng.randomIntBetween(-6, 6)
      while (coeff === 0) coeff = rng.randomIntBetween(-6, 6)
      // führender Koeffizient nicht zu klein
      if (exp === degree && Math.abs(coeff) === 1) coeff *= 2
      return { exp, coeff }
    })

    return { terms, degree }
  },

  originalData: {
    terms: [
      { exp: 4, coeff: -3 },
      { exp: 2, coeff: 5 },
      { exp: 0, coeff: -1 },
    ],
    degree: 4,
  },

  constraint({ data }) {
    return data.terms.some(t => t.exp === data.degree)
  },

  task({ data }) {
    const latex = buildPolyLatex(data.terms)
    return (
      <>
        <p>
          Bestimme den <b>Grad</b> der Polynomfunktion
        </p>
        <p>
          <InlineMath math={`f(x)=${latex}`} />
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>
          Der höchste Exponent ist <InlineMath math={`${data.degree}`} />.
          <br />
          Also hat die Funktion den Grad <InlineMath math={`${data.degree}`} />.
        </p>
      </>
    )
  },
}
