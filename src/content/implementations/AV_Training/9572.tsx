// exercise9555.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  mode: 'xTimesX' | 'numberTimesTerm' | 'monoTimesMono'
  resultCoeff: number
  resultPower: number
}

function termPart(coeff: number, variable: string) {
  if (coeff === 1) return variable
  if (coeff === -1) return `-${variable}`
  return `${coeff}${variable}`
}

function power(variable: string, exponent: number) {
  if (exponent === 1) return variable
  return `${variable}^{${exponent}}`
}

export const exercise9572: Exercise<DATA> = {
  title: 'Terme multiplizieren',
  source: 'Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode = rng.randomItemFromArray([
      'xTimesX',
      'numberTimesTerm',
      'monoTimesMono',
    ] as const)

    const a = rng.randomIntBetween(-9, 9)
    const b = rng.randomIntBetween(-9, 9)

    if (mode === 'xTimesX') {
      const resultCoeff = a * b
      return { a, b, mode, resultCoeff, resultPower: 2 }
    }

    if (mode === 'numberTimesTerm') {
      const resultCoeff = a * b
      return { a, b, mode, resultCoeff, resultPower: 1 }
    }

    const resultCoeff = a * b
    return { a, b, mode, resultCoeff, resultPower: 2 }
  },

  originalData: {
    a: 3,
    b: 4,
    mode: 'monoTimesMono',
    resultCoeff: 12,
    resultPower: 2,
  },

  constraint({ data }) {
    return data.a !== 0 && data.b !== 0 && data.resultCoeff !== 0
  },

  task({ data }) {
    return (
      <>
        <p>Multiplizieren Sie den Term.</p>

        {data.mode === 'xTimesX' && (
          <InlineMath
            math={`${termPart(data.a, 'x')}\\cdot ${termPart(data.b, 'x')}`}
          />
        )}

        {data.mode === 'numberTimesTerm' && (
          <InlineMath math={`${data.a}\\cdot ${termPart(data.b, 'x')}`} />
        )}

        {data.mode === 'monoTimesMono' && (
          <InlineMath
            math={`${termPart(data.a, 'x')}\\cdot ${termPart(data.b, 'x')}`}
          />
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zahlen werden mit Zahlen multipliziert.</p>
        <p>Variablen werden mit Variablen multipliziert.</p>

        {data.mode === 'xTimesX' && (
          <>
            <InlineMath
              math={`${termPart(data.a, 'x')}\\cdot ${termPart(
                data.b,
                'x',
              )}=(${data.a}\\cdot ${data.b})\\cdot (x\\cdot x)`}
            />
            <br />
            <InlineMath
              math={`=${termPart(data.resultCoeff, power('x', data.resultPower))}`}
            />
          </>
        )}

        {data.mode === 'numberTimesTerm' && (
          <>
            <InlineMath
              math={`${data.a}\\cdot ${termPart(data.b, 'x')}=${data.a}\\cdot ${data.b}\\cdot x`}
            />
            <br />
            <InlineMath
              math={`=${termPart(data.resultCoeff, power('x', data.resultPower))}`}
            />
          </>
        )}

        {data.mode === 'monoTimesMono' && (
          <>
            <InlineMath
              math={`${termPart(data.a, 'x')}\\cdot ${termPart(
                data.b,
                'x',
              )}=(${data.a}\\cdot ${data.b})\\cdot (x\\cdot x)`}
            />
            <br />
            <InlineMath
              math={`=${termPart(data.resultCoeff, power('x', data.resultPower))}`}
            />
          </>
        )}
      </>
    )
  },
}
