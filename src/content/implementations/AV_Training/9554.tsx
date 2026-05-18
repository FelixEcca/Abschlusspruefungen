// exercise9554.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Op = '+' | '-'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  op: Op
  xCoeff: number
  constant: number
}

function sign(n: number) {
  if (n < 0) return `${n}`
  return `+${n}`
}

function termPart(coeff: number, variable: string) {
  if (coeff === 1) return variable
  if (coeff === -1) return `-${variable}`
  return `${coeff}${variable}`
}

export const exercise9554: Exercise<DATA> = {
  title: 'Terme addieren und subtrahieren',
  source: 'Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const op: Op = rng.randomItemFromArray(['+', '-'])

    const a = rng.randomIntBetween(-9, 9)
    const b = rng.randomIntBetween(-20, 20)
    const c = rng.randomIntBetween(-9, 9)
    const d = rng.randomIntBetween(-20, 20)

    const xCoeff = op === '+' ? a + c : a - c
    const constant = op === '+' ? b + d : b - d

    return { a, b, c, d, op, xCoeff, constant }
  },

  originalData: {
    a: 3,
    b: 5,
    c: 2,
    d: 7,
    op: '+',
    xCoeff: 5,
    constant: 12,
  },

  constraint({ data }) {
    return data.a !== 0 && data.c !== 0 && data.xCoeff !== 0
  },

  task({ data }) {
    return (
      <>
        <p>Fassen Sie den Term zusammen.</p>
        <InlineMath
          math={`(${termPart(data.a, 'x')}${sign(data.b)})${data.op}(${termPart(
            data.c,
            'x',
          )}${sign(data.d)})`}
        />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Gleichartige Teile werden zusammengefasst.</p>

        {data.op === '+' ? (
          <>
            <p>Die Klammern können direkt weggelassen werden.</p>
            <InlineMath
              math={`(${termPart(data.a, 'x')}${sign(data.b)})+(${termPart(
                data.c,
                'x',
              )}${sign(data.d)})`}
            />
            <br />
            <InlineMath
              math={`${termPart(data.a, 'x')}${sign(data.b)}${sign(data.c)}x${sign(
                data.d,
              )}`}
            />
          </>
        ) : (
          <>
            <p>Bei Minus vor der Klammer ändern sich die Vorzeichen.</p>
            <InlineMath
              math={`(${termPart(data.a, 'x')}${sign(data.b)})-(${termPart(
                data.c,
                'x',
              )}${sign(data.d)})`}
            />
            <br />
            <InlineMath
              math={`${termPart(data.a, 'x')}${sign(data.b)}${sign(-data.c)}x${sign(
                -data.d,
              )}`}
            />
          </>
        )}

        <br />
        <InlineMath
          math={`=${termPart(data.xCoeff, 'x')}${sign(data.constant)}`}
        />
      </>
    )
  },
}
