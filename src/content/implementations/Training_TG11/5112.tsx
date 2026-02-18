import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  // z^2 + p z + q = 0 (mit z=x^2)
  p: number
  q: number
  // Lösungen in z
  z1: number
  z2: number
}

function pickNonZeroInt(rng: any, lo: number, hi: number) {
  let x = rng.randomIntBetween(lo, hi)
  while (x === 0) x = rng.randomIntBetween(lo, hi)
  return x
}

export const exercise5112: Exercise<DATA> = {
  title: 'Gleichung lösen mit Substitution',
  source: 'Polynomfunktionen',
  useCalculator: true,
  duration: 12,
  points: 4,

  generator(rng) {
    // Wir konstruieren absichtlich "schöne" z-Lösungen:
    // z1 > 0 (liefert reelle x), z2 < 0 (liefert keine reellen x) – typisch und sauber.
    const z1 = rng.randomItemFromArray([1, 2, 4, 5, 9, 10, 15, 16, 25, -1, -2])
    const z2 = rng.randomItemFromArray([1, 2, 4, 5, 9, 10, 15, 16, 25, -1, -2])

    const p = -(z1 + z2)
    const q = z1 * z2

    // Skaliere auf ax^4 + bx^2 + c = 0 (mit a != 0)
    const a = pickNonZeroInt(rng, -3, 3)
    const b = a * p
    const c = a * q

    return { a, b, c, p, q, z1, z2 }
  },

  originalData: {
    a: 1,
    b: -5,
    c: 4,
    p: -5,
    q: 4,
    z1: 4,
    z2: 1,
  },

  constraint({ data }) {
    // a darf nicht 0 sein, und es muss wirklich biquadratisch bleiben
    if (data.a === 0) return false
    if (data.b === 0) return false
    if (data.z1 === data.z2) return false
    // b und c sind okay auch wenn 0, aber biquadratisch heißt: nur x^4, x^2, konst.
    return true
  },

  task({ data }) {
    const { a, b, c } = data
    const termB = b === 0 ? '' : `${pp(b, 'merge_op')}\\,x^2`
    const termC = c === 0 ? '' : `${pp(c, 'merge_op')}`

    return (
      <>
        <p>Berechne die Lösungsmenge der Gleichung.</p>
        <p>
          <InlineMath math={`${pp(a)}\\,x^4 ${termB} ${termC} = 0`} />
        </p>
      </>
    )
  },

  solution({ data }) {
    const { a, p, q, z1, z2 } = data

    // Für die x-Lösungen: x^2 = z
    const xFromZ = (z: number) => {
      if (z < 0) return [] as number[]
      if (z === 0) return [0]
      const r = Math.sqrt(z)

      const rr = Math.round(r * 100) / 100
      return [-rr, rr]
    }

    const xs1 = xFromZ(z1)
    const xs2 = xFromZ(z2)

    const termZ = a === 1 ? 'z^2' : `${pp(a)}\\,z^2`
    const termP = p === 0 ? '' : `${pp(a * p, 'merge_op')}\\,z`
    const termQ = q === 0 ? '' : `${pp(a * q, 'merge_op')}`

    return (
      <>
        <p>
          <InlineMath math={`\\text{Ersetze }x^2\\text{ durch }z.`} />
        </p>

        <InlineMath
          math={`${pp(a)}\\,x^4 ${pp(a * p, 'merge_op')}\\,x^2 ${pp(a * q, 'merge_op')}=0`}
        />
        <br />
        <InlineMath math={`\\Rightarrow ${termZ} ${termP} ${termQ}=0`} />

        <p className="mt-2">
          Löse die quadratische Gleichung in <InlineMath math="z" />:
        </p>

        <InlineMath
          math={`\\begin{aligned}
          z^2 ${pp(p, 'merge_op')}\\,z ${pp(q, 'merge_op')} &= 0 \\\\
         
         \\Rightarrow z_1 &= ${pp(z1)} \\\\
          \\Rightarrow  z_2 &= ${pp(z2)}
          \\end{aligned}`}
        />

        <p className="mt-2">
          <InlineMath
            math={`\\text{Ersetze jetzt wieder }z\\text{ durch }x^2.`}
          />
        </p>

        <InlineMath
          math={`\\begin{aligned}
          x^2 &= ${pp(z1)} \\\\
          ${xs1.length > 0 ? `x = ${pp(xs1[0])}\\;\\text{ oder }\\;x=${pp(xs1[1])}` : `\\text{keine Lösung}`}
          \\end{aligned}`}
        />

        <div className="h-2" />

        <InlineMath
          math={`\\begin{aligned}
          x^2 &= ${pp(z2)} \\\\
          ${xs2.length > 0 ? `x = ${pp(xs2[0])}\\;\\text{ oder }\\;x=${pp(xs2[1])}` : `\\text{keine Lösung}`}
          \\end{aligned}`}
        />

        <p className="mt-2">
          <b>Lösungsmenge:</b>{' '}
          {xs1.length > 0 && xs2.length > 0 ? (
            <InlineMath
              math={`L=\\left\\{${pp(xs1[0])};\\;${pp(xs1[1])};\\;${pp(xs2[0])};\\;${pp(xs2[1])}\\right\\}`}
            />
          ) : xs1.length > 0 && xs2.length <= 0 ? (
            <InlineMath
              math={`L=\\left\\{${pp(xs1[0])};\\;${pp(xs1[1])}\\right\\}`}
            />
          ) : xs1.length <= 0 && xs2.length > 0 ? (
            <InlineMath
              math={`L=\\left\\{${pp(xs2[0])};\\;${pp(xs2[1])}\\right\\}`}
            />
          ) : (
            <InlineMath math={`L=\\{~\\}`} />
          )}
        </p>
      </>
    )
  },
}
