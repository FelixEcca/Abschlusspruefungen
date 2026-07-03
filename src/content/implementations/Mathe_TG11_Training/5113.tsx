import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type VariantA = 'linearFactors'
type VariantB = 'factorOut'

interface DATA {
  // a)
  k: number // Vorfaktor
  rootsA: number[] // eindeutige Nullstellen (inkl. 0 wenn x-Faktor)
  factorsLatexA: string // komplette LF-Darstellung (ohne "=0")
  degreeA: number

  // b)
  kB: number
  g: number // auszuklammernder Faktor
  root0B: number // aus Faktor (x-root0B)
  root1B: number // aus Klammer (x-root1B)
  root2B: number // aus Klammer (x-root2B) oder ggf. nur 2 Faktoren in Klammer
  threeInBracket: boolean
}

function pickNonZeroInt(rng: any, lo: number, hi: number) {
  let x = rng.randomIntBetween(lo, hi)
  while (x === 0) x = rng.randomIntBetween(lo, hi)
  return x
}

function uniq(arr: number[]) {
  return Array.from(new Set(arr))
}

function fmtFactor(x0: number) {
  // (x - x0) bzw (x + |x0|) bzw (x)
  if (x0 === 0) return 'x'
  return `\\left(x${pp(-x0, 'merge_op')}\\right)`
}

function shuffleInPlace<T>(rng: any, a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = rng.randomIntBetween(0, i)
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

export const exercise5113: Exercise<DATA> = {
  title: 'Satz vom Nullprodukt',
  source: 'Polynomfunktionen',
  useCalculator: false,
  duration: 10,
  points: 4,

  generator(rng) {
    // -------------------------
    // a) Linearfaktorform (Grad 2..5)
    // -------------------------
    const degreeA = rng.randomIntBetween(2, 4)
    const k = pickNonZeroInt(rng, -3, 3)

    // roots: evtl. 0 als Faktor x erlaubt, sonst (x - r)
    const allowZero = rng.randomItemFromArray([true, false])
    const pool: number[] = []
    while (pool.length < degreeA) {
      const r = allowZero && pool.length === 0 ? 0 : rng.randomIntBetween(-6, 6)
      // 0 darf nur, wenn allowZero, sonst neu ziehen
      if (!allowZero && r === 0) continue
      // Dopplungen vermeiden für "sauber" ablesbare Nullstellen
      if (pool.includes(r)) continue
      pool.push(r)
    }

    shuffleInPlace(rng, pool)

    const factors = pool.map(r => fmtFactor(r))
    const factorsLatexA = `${pp(k)}\\,${factors.join('\\,')}`

    const rootsA = uniq(pool)

    // -------------------------
    // b) Erst ausklammern, dann ablesen
    // Form: kB * g*(x-root0B) * [ (x-root1B)(x-root2B) ]  oder nur 1 Faktor in Klammer
    // Wir expandieren die Klammer zu einem Polynom und schreiben dann g(x)= (auszuklammern)* (Polynom)
    // -------------------------
    const kB = pickNonZeroInt(rng, -3, 3)
    const g = rng.randomItemFromArray([2, 3, 4, 5]) // auszuklammernder Zahlenfaktor
    const root0B = rng.randomIntBetween(-5, 5) // aus (x-root0B)

    const threeInBracket = rng.randomItemFromArray([true, false])

    let root1B = rng.randomIntBetween(-5, 5)
    while (root1B === root0B) root1B = rng.randomIntBetween(-5, 5)

    let root2B = rng.randomIntBetween(-5, 5)
    while (root2B === root0B || root2B === root1B)
      root2B = rng.randomIntBetween(-5, 5)

    return {
      k,
      rootsA,
      factorsLatexA,
      degreeA,
      kB,
      g,
      root0B,
      root1B,
      root2B,
      threeInBracket,
    }
  },

  originalData: {
    k: 2,
    rootsA: [-1, 0, 3],
    factorsLatexA: `2\\,x\\,\\left(x+1\\right)\\,\\left(x-3\\right)`,
    degreeA: 3,

    kB: 1,
    g: 3,
    root0B: 0,
    root1B: -2,
    root2B: 4,
    threeInBracket: true,
  },

  constraint({ data }) {
    if (data.degreeA < 2 || data.degreeA > 5) return false
    if (data.k === 0 || data.kB === 0) return false
    if (data.root1B === 0) return false
    if (data.root2B === 0) return false
    if (data.kB === 1) return false
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return (
          <p>
            Löse jeweils mit dem <b>Satz vom Nullprodukt</b>.
          </p>
        )
      },
      task({ data }) {
        // b) Wir bauen die "ausklammern"-Aufgabe als: kB*(g*x oder g*(x-root0B))*(Quadratik oder linear) expandiert in der Klammer
        // Wir nehmen: kB * [ g*(x-root0B) ] * [ (x-root1B)(x-root2B) ] und expandieren nur die zweite Klammer,
        // damit "Ausklammern" sinnvoll bleibt: vorne steht dann kB*g*(x-root0B) als Faktor, aber wir packen g in den Vorfaktor hinein,
        // sodass man "g" erst rausziehen muss, z. B. aus: (6x-12)(x^2+...) -> erst 6 ausklammern.
        // Um das wirklich als "erst ausklammern" zu erzwingen, geben wir in b) ein Produkt, in dem der gemeinsame Faktor g in einem Summen-Term steckt:
        // (g*x + g*(-root0B)) = g*(x-root0B) wird als (g x +/- g*root0B) geschrieben.

        const { kB, g, root0B, root1B, root2B, threeInBracket } = data

        // Klammer2: (x-root1)(x-root2) = x^2 - (r1+r2)x + r1*r2
        const p = -(root1B + root2B)
        const q = root1B * root2B

        // Faktor zum Ausklammern: g*(x-root0B) wird als (g x - g*root0B)
        // also: (g x + const)
        const linA = g
        const linB = -g * root0B // Konstante

        const poly2 = threeInBracket
          ? `\\left(x^2${pp(p, 'merge_op')}x${pp(q, 'merge_op')}\\right)`
          : `\\left(x${pp(-root1B, 'merge_op')}\\right)` // nur linear in Klammer, wenn false

        const leftLin = `\\left(${pp(linA)}x${pp(linB, 'merge_op')}\\right)`

        return (
          <>
            <p className="mt-2">
              Bestimme die Nullstellen von: <br></br>{' '}
              <InlineMath math={`f(x) = ${data.factorsLatexA}`} />.
            </p>
          </>
        )
      },

      solution({ data }) {
        // a) Nullstellen direkt aus Faktoren
        const rootsA = [...data.rootsA].sort((a, b) => a - b)

        return (
          <>
            <p>Satz vom Nullprodukt:</p>
            <InlineMath math={`0=${data.factorsLatexA}`} />
            <br />
            <InlineMath
              math={`\\Rightarrow L=\\left\\{${rootsA.map(r => pp(r)).join(',\\;')}\\right\\}`}
            />
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { kB, g, root0B, root1B, root2B, threeInBracket } = data

        // Klammer2: (x-root1)(x-root2) = x^2 - (r1+r2)x + r1*r2
        const p = -(root1B + root2B)
        const q = root1B * root2B

        // Faktor zum Ausklammern: g*(x-root0B) wird als (g x - g*root0B)
        // also: (g x + const)
        const linA = g
        const linB = -g * root0B // Konstante

        const poly2 = threeInBracket
          ? `\\left(x^2${pp(p, 'merge_op')}x${pp(q, 'merge_op')}\\right)`
          : `\\left(x${pp(-root1B, 'merge_op')}\\right)` // nur linear in Klammer, wenn false

        const leftLin = `\\left(${pp(linA)}x${pp(linB, 'merge_op')}\\right)`
        const exprB = `${pp(kB)}\\,${leftLin}\\,${poly2}`
        return (
          <>
            <p className="mt-4">
              Bestimme die Nullstellen von{' '}
              <InlineMath math={`g(x) = ${exprB}`} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { kB, g, root0B, root1B, root2B, threeInBracket } = data

        // Klammer2: (x-root1)(x-root2) = x^2 - (r1+r2)x + r1*r2
        const p = -(root1B + root2B)
        const q = root1B * root2B

        // Faktor zum Ausklammern: g*(x-root0B) wird als (g x - g*root0B)
        // also: (g x + const)
        const linA = g
        const linB = -g * root0B // Konstante

        const poly2 = threeInBracket
          ? `\\left(x^2${pp(p, 'merge_op')}x${pp(q, 'merge_op')}\\right)`
          : `\\left(x${pp(-root1B, 'merge_op')}\\right)` // nur linear in Klammer, wenn false

        const leftLin = `\\left(${pp(linA)}x${pp(linB, 'merge_op')}\\right)`
        const exprB = `${pp(kB)}\\,${leftLin}\\,${poly2}`
        return (
          <>
            <InlineMath math={`0=${exprB}`} />
            <p>
              Sobald eine der Klammern 0 ist, ist das ganze Produkt 0. Betrachte
              zuerst die linke Klammer:
            </p>
            <InlineMath math={`0=${leftLin}`} />
            <br></br>
            <InlineMath math={`\\Rightarrow x=${root0B}`} />
            <p>Dann die rechte Klammer:</p>
            <InlineMath math={`0=${poly2}`} />
            <br></br>

            <InlineMath math={`\\Rightarrow x=${root1B}`} />
            {threeInBracket && (
              <>
                {' '}
                <InlineMath math={`\\text{oder}~x=${root2B}`} />
              </>
            )}
            <p>Damit ist die Lösungsmenge:</p>
            {threeInBracket ? (
              <>
                <InlineMath math={`L=\\{ ${root0B};${root1B};${root2B} \\}`} />
              </>
            ) : (
              <>
                <InlineMath math={`L=\\{ ${root0B};${root1B} \\}`} />
              </>
            )}
          </>
        )
      },
    },
  ],
}
