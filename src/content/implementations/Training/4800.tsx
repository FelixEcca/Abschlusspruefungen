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
  title: 'Lineare Gleichungssysteme',
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
    const u = rng.randomIntBetween(-6, 6)
    let s = rng.randomIntBetween(-6, 6)
    while (s === u) s = rng.randomIntBetween(-6, 6)
    const v = rng.randomIntBetween(-8, 8)
    const t = rng.randomIntBetween(-8, 8)

    let a1 = -u,
      b1 = 1,
      c1 = v
    let a2 = -s,
      b2 = 1,
      c2 = t

    if (m === 'addition') {
      b2 = -1
      c2 = -t
    }

    if (m === 'einsetzen') {
      a2 *= 2
      b2 *= 2
      c2 *= 2
    }

    return { m, a1, b1, c1, a2, b2, c2 }
  },
  originalData: { m: 'addition', a1: -2, b1: 1, c1: 5, a2: 3, b2: -1, c2: -1 },
  constraint({ data }) {
    const { a1, b1, c1, a2, b2, c2 } = data
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
    const { a1, b1, c1, a2, b2, c2 } = data
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
    const { a1, b1, c1, a2, b2, c2 } = data
    const D = a1 * b2 - a2 * b1
    const Dx = c1 * b2 - c2 * b1
    const Dy = a1 * c2 - a2 * c1
    const x = Dx / D
    const y = Dy / D

    const factor = -b2
    const newA1 = factor * a1
    const newB1 = factor * b1
    const newC1 = factor * c1

    const sumA = newA1 + a2
    const sumB = newB1 + b2
    const sumC = newC1 + c2

    return (
      <>
        {b2 != -1 && (
          <>
            <p>
              Multipliziere die erste Gleichung mit {pp(factor)} und addiere
              dann beide Gleichungen.
            </p>
            <BlockMath
              math={String.raw`
\begin{aligned}
\text{(I)}\quad & ${a1 === 1 ? '' : a1 === -1 ? '-' : pp(a1)}x ${b1 === 1 ? '+' : b1 === -1 ? '-' : pp(b1, 'merge_op')}y = ${pp(c1)} \\
\text{(II)}\quad & ${a2 === 1 ? '' : a2 === -1 ? '-' : pp(a2)}x ${b2 === 1 ? '+' : b2 === -1 ? '-' : pp(b2, 'merge_op')}y = ${pp(c2)}
\end{aligned}
`}
            />
            <BlockMath
              math={String.raw`
\begin{aligned}
${pp(factor)}\cdot \text{(I)}:\quad & ${newA1 === 1 ? '' : newA1 === -1 ? '-' : pp(newA1)}x ${newB1 === 1 ? '+' : newB1 === -1 ? '-' : pp(newB1, 'merge_op')}y = ${pp(newC1)} \\
\text{(II)}:\quad & ${a2 === 1 ? '' : a2 === -1 ? '-' : pp(a2)}x ${b2 === 1 ? '+' : b2 === -1 ? '-' : pp(b2, 'merge_op')}y = ${pp(c2)} \\
\hline
& ${sumA === 1 ? '' : sumA === -1 ? '-' : pp(sumA)}x ${sumB === 0 ? '' : sumB > 0 ? '+' : '-'} ${sumB === 0 ? '' : ''}= ${pp(sumC)}
\end{aligned}
`}
            />

            <BlockMath
              math={String.raw`
\begin{aligned}
${pp(sumA)}x &= ${pp(sumC)} \\
x &= ${pp(x)}
\end{aligned}
`}
            />

            <p>Setze den x-Wert in die erste Gleichung ein.</p>

            <BlockMath
              math={String.raw`
\begin{aligned}
${a1 === 1 ? '' : a1 === -1 ? '-' : pp(a1)}\cdot(${pp(x)}) ${b1 === 1 ? '+' : b1 === -1 ? '-' : pp(b1, 'merge_op')}y &= ${pp(c1)} \\
${pp(a1 * x)} ${b1 === 1 ? '+' : b1 === -1 ? '-' : pp(b1, 'merge_op')}y &= ${pp(c1)} \\
${b1 === 1 ? '' : b1 === -1 ? '-' : pp(b1)}y &= ${pp(c1 - a1 * x)} \\
y &= ${pp(y)}
\end{aligned}
`}
            />
          </>
        )}
        {b2 === -1 && (
          <>
            <p>Addiere beide Gleichungen.</p>
            <BlockMath
              math={String.raw`
\begin{aligned}
\text{(I)}\quad & ${a1 === 1 ? '' : a1 === -1 ? '-' : pp(a1)}x ${b1 === 1 ? '+' : b1 === -1 ? '-' : pp(b1, 'merge_op')}y = ${pp(c1)} \\
\text{(II)}\quad & ${a2 === 1 ? '' : a2 === -1 ? '-' : pp(a2)}x -y = ${pp(c2)}
\end{aligned}
`}
            />

            <BlockMath
              math={String.raw`
\begin{aligned}
${pp(sumA)}x &= ${pp(sumC)} \\
x &= ${pp(x)}
\end{aligned}
`}
            />

            <p>Setze den x-Wert in die erste Gleichung ein.</p>

            <BlockMath
              math={String.raw`
\begin{aligned}
${a1 === 1 ? '' : a1 === -1 ? '-' : pp(a1)}\cdot(${pp(x)}) ${b1 === 1 ? '+' : b1 === -1 ? '-' : pp(b1, 'merge_op')}y &= ${pp(c1)} \\
${pp(a1 * x)} ${b1 === 1 ? '+' : b1 === -1 ? '-' : pp(b1, 'merge_op')}y &= ${pp(c1)} \\
${b1 === 1 ? '' : b1 === -1 ? '-' : pp(b1)}y &= ${pp(c1 - a1 * x)} \\
y &= ${pp(y)}
\end{aligned}
`}
            />
          </>
        )}
        <p>Ergebnis:</p>
        <BlockMath
          math={String.raw`\begin{aligned}x &= ${pp(x)} ,~~~ y &= ${pp(y)}\end{aligned}`}
        />
      </>
    )
  },
}
