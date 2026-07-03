import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4201 {
  p: number
  q: number
  r: number
  s: number // (px + q) = r x + s  ODER  k(px+q)=rx+s
  k: number
}

export const exercise4201: Exercise<D4201> = {
  title: 'Klammern & Ausmultiplizieren',
  source: 'Training',
  useCalculator: false,
  duration: 7,
  points: 3,
  generator(rng) {
    const p = rng.randomIntBetween(-5, 5)
    const q = rng.randomIntBetween(-9, 9)
    const r = rng.randomIntBetween(-5, 5)
    const s = rng.randomIntBetween(-9, 9)
    // manchmal mit äußere Konstante k zum Ausmultiplizieren

    const k = rng.randomIntBetween(-6, 6)
    return { p, q, r, s, k }
  },
  originalData: { p: 3, q: -2, r: -1, s: 4, k: 2 },
  constraint({ data }) {
    const { p, q, r, s, k } = data
    const L = k ? k * p : p
    const C = k ? k * q : q
    const A = L - r
    const B = s - C
    const x = B / A
    return (
      data.q != 0 &&
      data.s != 0 &&
      Math.abs(data.p) >= 2 &&
      Math.abs(data.r) >= 2 &&
      Math.abs(data.k) >= 2 &&
      (x * 2) % 1 == 0
    )
  }, // keine Nullkoeffizienten
  task({ data }) {
    const { p, q, r, s, k } = data
    return (
      <>
        <p>Löse die Gleichung.</p>
        {k ? (
          <BlockMath
            math={`${pp(k)}\\,(${pp(p)}x ${pp(q, 'merge_op')}) = ${pp(r)}x ${pp(s, 'merge_op')}`}
          />
        ) : (
          <BlockMath
            math={`(${pp(p)}x ${pp(q, 'merge_op')}) = ${pp(r)}x ${pp(s, 'merge_op')}`}
          />
        )}
      </>
    )
  },
  solution({ data }) {
    const { p, q, r, s, k } = data
    // falls k: k p x + k q = r x + s  -> (kp - r) x = s - k q
    const L = k ? k * p : p
    const C = k ? k * q : q
    const A = L - r
    const B = s - C
    const x = B / A
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          k
            ? `${pp(k)}(${pp(p)}x ${pp(q, 'merge_op')}) &= ${pp(r)}x ${pp(s, 'merge_op')}\\\\`
            : `(${pp(p)}x ${pp(q, 'merge_op')}) &= ${pp(r)}x ${pp(s, 'merge_op')}\\\\`,
          `${pp(L)}x ${pp(C, 'merge_op')} &= ${pp(r)}x ${pp(s, 'merge_op')}\\\\`,
          `${pp(A)}x &= ${pp(B)}\\\\`,
          `x &= ${pp(x)}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
