import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kind = 'even' | 'odd' | 'none'

interface DATA {
  kind: Kind
  // wir bauen f(x)=ax^4+bx^2+c (even) oder ax^3+bx (odd) oder Mischung (none)
  a: number
  b: number
  c: number
}

function pickNonZero(rng: any, lo: number, hi: number) {
  let x = rng.randomIntBetween(lo, hi)
  while (x === 0) x = rng.randomIntBetween(lo, hi)
  return x
}

function termLatex(kind: Kind, a: number, b: number, c: number) {
  if (kind === 'even') {
    // ax^4 + bx^2 + c
    const t1 = `${pp(a)}\\cdot x^{4}`
    const t2 = `${pp(b)}\\cdot x^{2}`
    const t3 = `${pp(c)}`
    return `${t1} ${cSign(b)} ${absLatex(t2)} ${cSign(c)} ${pp(Math.abs(c))}`
      .replace(/\+\s-/g, '- ')
      .replace(/\s+/g, ' ')
  }
  if (kind === 'odd') {
    // ax^3 + bx
    const t1 = `${pp(a)}\\cdot x^{3}`
    const t2 = `${pp(b)}\\cdot x`
    return `${t1} ${cSign(b)} ${absLatex(t2)}`
      .replace(/\+\s-/g, '- ')
      .replace(/\s+/g, ' ')
  }
  // none: ax^3 + bx^2 + c
  const t1 = `${pp(a)}\\cdot x^{3}`
  const t2 = `${pp(b)}\\cdot x^{2}`
  const t3 = `${pp(c)}`
  return `${t1} ${cSign(b)} ${absLatex(t2)} ${cSign(c)} ${pp(Math.abs(c))}`
    .replace(/\+\s-/g, '- ')
    .replace(/\s+/g, ' ')
}

function cSign(v: number) {
  return v >= 0 ? '+' : '-'
}
function absLatex(term: string) {
  // term beginnt mit pp(b) ... -> wir ersetzen - durch positive Darstellung
  return term.replace(/-\s*/g, '')
}

export const exercise5111: Exercise<DATA> = {
  title: 'Symmetrie mit f(-x)',
  source: 'Polynomfunktionen',
  useCalculator: false,
  duration: 10,
  points: 4,

  generator(rng) {
    const kind: Kind = rng.randomItemFromArray(['even', 'odd', 'none'])

    if (kind === 'even') {
      const a = pickNonZero(rng, -4, 4)
      const b = pickNonZero(rng, -6, 6)
      const c = rng.randomIntBetween(-6, 6)
      return { kind, a, b, c }
    }

    if (kind === 'odd') {
      const a = pickNonZero(rng, -4, 4)
      const b = pickNonZero(rng, -6, 6)
      return { kind, a, b, c: 0 }
    }

    // none: Mischung aus geraden/ungeraden + konstante ≠0
    const a = pickNonZero(rng, -4, 4) // x^3
    const b = pickNonZero(rng, -6, 6) // x^2
    let c = rng.randomIntBetween(-6, 6)
    while (c === 0) c = rng.randomIntBetween(-6, 6)
    return { kind, a, b, c }
  },

  originalData: { kind: 'none', a: 2, b: -3, c: 4 },

  constraint({ data }) {
    if (data.kind === 'none' && data.c === 0) return false
    return true
  },

  task({ data }) {
    const latex = termLatex(data.kind, data.a, data.b, data.c)
    return (
      <>
        <p>
          Gegeben ist <InlineMath math={`f(x)=${latex}`} />.
        </p>
        <p>
          Bestimme die Symmetrie, indem du <InlineMath math="f(-x)" />{' '}
          berechnest und mit <InlineMath math="f(x)" /> bzw.{' '}
          <InlineMath math="-f(x)" /> vergleichst.
        </p>
      </>
    )
  },

  solution({ data }) {
    const fx = termLatex(data.kind, data.a, data.b, data.c)

    // f(-x) je nach Struktur:
    // even: ax^4+bx^2+c bleibt gleich
    // odd: ax^3+bx -> -ax^3 - bx = -f(x)
    // none: ax^3 + bx^2 + c -> -ax^3 + bx^2 + c (nicht gleich)
    let fminus = ''
    let conclusion = ''

    if (data.kind === 'even') {
      fminus = `f(-x)=${pp(data.a)}\\cdot (-x)^{4}+${pp(data.b)}\\cdot (-x)^{2}+${pp(data.c)}`
      conclusion = `f(-x)=f(x)\\Rightarrow \\text{achsensymmetrisch zur y-Achse}`
    } else if (data.kind === 'odd') {
      fminus = `f(-x)=${pp(data.a)}\\cdot (-x)^{3}+${pp(data.b)}\\cdot (-x)`
      conclusion = `f(-x)=-f(x)\\Rightarrow \\text{punktsymmetrisch zum Ursprung}`
    } else {
      fminus = `f(-x)=${pp(data.a)}\\cdot (-x)^{3}+${pp(data.b)}\\cdot (-x)^{2}+${pp(data.c)}`
      conclusion = `f(-x)\\neq f(x)\\;\\text{und}\\; f(-x)\\neq -f(x)\\Rightarrow \\text{keine Symmetrie}`
    }

    return (
      <>
        <InlineMath math={fminus} />
        <br />
        <InlineMath math={conclusion} />
      </>
    )
  },
}
