import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'power' | 'none'
type Sign = 1 | -1

interface DATA {
  mode: Mode
  // power:
  n?: number
  sign?: Sign
  // none:
  exprLatex?: string
  solutionText: 'achsensymmetrisch zur y-Achse' | 'punktsymmetrisch zum Ursprung' 
}

function fmtSign(sign: Sign) {
  return sign === -1 ? '-' : ''
}



export const exercise5101: Exercise<DATA> = {
  title: 'Symmetrie',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray<Mode>(['power', 'power', 'power', 'none'])

    if (mode === 'power') {
      const n = rng.randomItemFromArray([1, 2, 3, 4, 5, 6,7,8,9,10])
      const sign: Sign = rng.randomItemFromArray<Sign>([1, -1])

      const even = n % 2 === 0
      const solutionText = even
        ? ('achsensymmetrisch zur y-Achse' as const)
        : ('punktsymmetrisch zum Ursprung' as const)

      return { mode, n, sign, solutionText }
    }
    // mode === 'none'
    // For 'none' mode, determine solutionText based on exprLatex
    const solutionText = 'achsensymmetrisch zur y-Achse' as const // or your logic here
    return { mode, solutionText }
  },

  originalData: {
    mode: 'power',
    n: 4,
    sign: -1,
    solutionText: 'achsensymmetrisch zur y-Achse',
  },

  constraint({ data }) {
    if (data.mode === 'power') {
      return typeof data.n === 'number' && typeof data.sign === 'number'
    }
    return typeof data.exprLatex === 'string'
  },

  task({ data }) {
    const term =
      data.mode === 'power'
        ? `f(x)=${fmtSign(data.sign!)}x^{${data.n!}}`
        : `f(x)=${data.exprLatex}`

    return (
      <>
        <p>
          Gegeben ist der Funktionsterm <InlineMath math={term} />.
        </p>
        <p>
          Entscheide, ob die Funktion
          <br />
          • <b>achsensymmetrisch zur y-Achse</b> ist,
          <br />
          • <b>punktsymmetrisch zum Ursprung</b> ist,
          <br />
          • oder <b>keine Symmetrie</b> besitzt.
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
