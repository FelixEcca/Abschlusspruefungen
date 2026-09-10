import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  base: number
  exponent: number
  variable: string
  variableExponent: number
}

export const exercise10022: Exercise<DATA> = {
  title: 'Potenzen mit negativen Exponenten umformen',
  source: '3BKGD1',
  useCalculator: false,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { base: 2, exponent: -3, variable: 'x', variableExponent: -4 },
      { base: 5, exponent: -2, variable: 'a', variableExponent: -3 },
      { base: 10, exponent: -4, variable: 'z', variableExponent: -2 },
      { base: 3, exponent: -2, variable: 'b', variableExponent: -5 },
    ])
  },
  originalData: { base: 2, exponent: -3, variable: 'x', variableExponent: -4 },
  task({ data }) {
    return (
      <>
        <p>Schreiben Sie ohne negative Exponenten.</p>
        <p>
          <InlineMath
            math={`${data.base}^{${data.exponent}}\\cdot ${data.variable}^{${data.variableExponent}}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const positiveNumberExponent = Math.abs(data.exponent)
    const positiveVariableExponent = Math.abs(data.variableExponent)
    return (
      <>
        <p>
          Ein negativer Exponent bedeutet: Der Faktor wandert in den Nenner.
        </p>
        <p>
          <InlineMath
            math={`${data.base}^{${data.exponent}}=\\frac{1}{${data.base}^{${positiveNumberExponent}}}`}
          />
        </p>
        <p>
          <InlineMath
            math={`${data.variable}^{${data.variableExponent}}=\\frac{1}{${data.variable}^{${positiveVariableExponent}}}`}
          />
        </p>
        <p>
          Zusammengesetzt ergibt das:{' '}
          <InlineMath
            math={`${data.base}^{${data.exponent}}\\cdot ${data.variable}^{${data.variableExponent}}=\\frac{1}{${data.base}^{${positiveNumberExponent}}${data.variable}^{${positiveVariableExponent}}}`}
          />
        </p>
      </>
    )
  },
}
