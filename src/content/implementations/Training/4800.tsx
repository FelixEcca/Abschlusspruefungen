import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

type Method = 'addition' | 'einsetzen' | 'gleichsetzung'
interface D4800 {
  m: Method
  a1: number
  b1: number
  c1: number
  a2: number
  b2: number
  c2: number
}

export const exercise4800: Exercise<D4800> = {
  title: 'Lineare Gleichungssysteme – Verfahren anwenden',
  source: 'Training',
  useCalculator: false,
  duration: 10,
  points: 4,
  generator(rng) {
    const m = rng.randomItemFromArray<Method>([
      'addition',
      'einsetzen',
      'gleichsetzung',
    ])
    // Wir konstruieren ein lösbares System mit kleinen Zahlen
    // Start: y = u x + v  &  y = s x + t
    const u = rng.randomIntBetween(-6, 6)
    let s = rng.randomIntBetween(-6, 6)
    while (s === u) s = rng.randomIntBetween(-6, 6)
    const v = rng.randomIntBetween(-8, 8)
    const t = rng.randomIntBetween(-8, 8)
    // in ax+by=c-Form:
    // -u x + y = v
    // -s x + y = t
    let a1 = -u,
      b1 = 1,
      c1 = v
    let a2 = -s,
      b2 = 1,
      c2 = t

    // Für "addition": mache b1 und b2 Gegenzahlen
    if (m === 'addition') {
      b2 = -1
      c2 = -t
    }

    // Für "einsetzen": setze eine Gleichung schon nach y frei (ok), andere eher "verbogen"
    if (m === 'einsetzen') {
      a2 *= 2
      b2 *= 2
      c2 *= 2
    }

    // Für "gleichsetzung": beide schon als y=... interpretiert—passt.
    return { m, a1, b1, c1, a2, b2, c2 }
  },
  originalData: { m: 'addition', a1: -2, b1: 1, c1: 5, a2: 3, b2: -1, c2: -1 },
  constraint({ data }) {
    const { a1, b1, c1, a2, b2, c2, m } = data
    // Löse allgemein via Determinante (nur intern); Ausgabe als Schritte
    const D = a1 * b2 - a2 * b1
    const Dx = c1 * b2 - c2 * b1
    const Dy = a1 * c2 - a2 * c1
    const x = Dx / D
    const y = Dy / D

    return (
      x % 1 === 0 &&
      y % 1 === 0 &&
      D !== 0 &&
      data.a1 !== 0 &&
      data.a2 !== 0 &&
      data.b1 !== 0 &&
      data.b2 !== 0 &&
      data.c1 !== 0 &&
      data.c2 !== 0
    )
  },
  task({ data }) {
    const { m, a1, b1, c1, a2, b2, c2 } = data
    return (
      <>
        <p>Löse das LGS.</p>
        <BlockMath
          math={`
${a1 === 1 ? '' : a1 === -1 ? '-' : pp(a1)}x ${b1 === 1 ? '+' : b1 === -1 ? '-' : pp(b1, 'merge_op')}y = ${pp(c1)}\\\\
${a2 === 1 ? '' : a2 === -1 ? '-' : pp(a2)}x ${b2 === 1 ? '+' : b2 === -1 ? '-' : pp(b2, 'merge_op')}y = ${pp(c2)}
`}
        />
      </>
    )
  },
  solution({ data }) {
    const { a1, b1, c1, a2, b2, c2, m } = data
    // Löse allgemein via Determinante (nur intern); Ausgabe als Schritte
    const D = a1 * b2 - a2 * b1
    const Dx = c1 * b2 - c2 * b1
    const Dy = a1 * c2 - a2 * c1
    const x = Dx / D
    const y = Dy / D

    // Korrigiere KaTeX-Ausgabe: Gleichheitszeichen in align-Umgebung
    if (m === 'addition') {
      return (
        <BlockMath
          math={`\\begin{aligned}x &= ${pp(x)} \\\\ y &= ${pp(y)}\\end{aligned}`}
        />
      )
    }

    if (m === 'einsetzen') {
      return (
        <BlockMath
          math={`\\begin{aligned}x &= ${pp(x)} \\\\ y &= ${pp(y)}\\end{aligned}`}
        />
      )
    }

    return (
      <BlockMath
        math={`\\begin{aligned}x &= ${pp(x)} \\\\ y &= ${pp(y)}\\end{aligned}`}
      />
    )
  },
}
