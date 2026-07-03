import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Mode = 'invPower' | 'none'
type Sign = 1 | -1

interface DATA {
  mode: Mode
  n?: number
  sign?: Sign
  exprLatex?: string
  solutionText:
    | 'achsensymmetrisch zur y-Achse'
    | 'punktsymmetrisch zum Ursprung'
    | 'keine Symmetrie'
}

function fmtSign(sign: Sign) {
  return sign === -1 ? '-' : ''
}

const noSymExamples = [
  { expr: '-x^{-3}+2x+2', sol: 'keine Symmetrie' as const },
  { expr: 'x^{-2}+x', sol: 'keine Symmetrie' as const },
  { expr: '-x^{-4}+3', sol: 'keine Symmetrie' as const },
  { expr: 'x^{-1}+2', sol: 'keine Symmetrie' as const },
]

export const exercise5104: Exercise<DATA> = {
  title: 'Symmetrie (x^{-n})',
  source: 'Potenfunktionen',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray<Mode>([
      'invPower',
      'invPower',
      'invPower',
    ])

    if (mode === 'invPower') {
      const n = rng.randomItemFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      const sign: Sign = rng.randomItemFromArray<Sign>([1])

      const even = n % 2 === 0
      const solutionText = even
        ? ('achsensymmetrisch zur y-Achse' as const)
        : ('punktsymmetrisch zum Ursprung' as const)

      return { mode, n, sign, solutionText }
    }

    const ex = rng.randomItemFromArray(noSymExamples)
    return { mode, exprLatex: ex.expr, solutionText: ex.sol }
  },

  originalData: {
    mode: 'invPower',
    n: 3,
    sign: 1,
    solutionText: 'punktsymmetrisch zum Ursprung',
  },

  constraint({ data }) {
    if (data.mode === 'invPower') {
      return typeof data.n === 'number' && typeof data.sign === 'number'
    }
    return typeof data.exprLatex === 'string'
  },

  task({ data }) {
    const term =
      data.mode === 'invPower'
        ? `f(x)=${fmtSign(data.sign!)}x^{-${data.n!}}`
        : `f(x)=${data.exprLatex}`

    return (
      <>
        <p>
          Gegeben ist der Funktionsterm <InlineMath math={term} />.
        </p>
        <p>
          Entscheide, ob die Funktion
          <br />• <b>achsensymmetrisch zur y-Achse</b> ist,
          <br />• <b>punktsymmetrisch zum Ursprung</b> ist,
          <br />• oder <b>keine Symmetrie</b> besitzt.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>
          Antwort: <b>{data.solutionText}</b>
        </p>
      </>
    )
  },
}
