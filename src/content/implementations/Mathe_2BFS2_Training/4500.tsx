import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath, InlineMath } from 'react-katex'

interface D4500 {
  kind: 'W' | 'p' | 'G'
  G: number
  p: number
} // W, Grundwert G, Prozentsatz p%

export const exercise4500: Exercise<D4500> = {
  title: 'Prozentrechnung',
  source: 'Training',
  useCalculator: false,
  duration: 7,
  points: 3,
  generator(rng) {
    const G = rng.randomIntBetween(80, 800)
    const p = rng.randomIntBetween(5, 35)
    const kind = rng.randomItemFromArray(['W', 'p', 'G'] as const)
    return { kind, G, p }
  },
  originalData: { kind: 'W', G: 200, p: 15 },
  constraint() {
    return true
  },
  task({ data }) {
    const { kind, G, p } = data
    return (
      <>
        {kind === 'W' && (
          <p>
            Bestimme den Prozentwert <InlineMath math={'W'} /> <br></br>bei{' '}
            <InlineMath math={`G=${G},\\; p=${p}\\%`} />.
          </p>
        )}
        {kind === 'p' && (
          <p>
            Bestimme den Prozentsatz <InlineMath math={'p'} /> <br></br>bei{' '}
            <InlineMath math={`G=${G},\\; W=${Math.round((G * p) / 100)}`} />.
          </p>
        )}
        {kind === 'G' && (
          <p>
            Bestimme den Grundwert <InlineMath math={'G'} /> <br></br>bei{' '}
            <InlineMath math={`p=${p}\\%,\\; W=${Math.round((G * p) / 100)}`} />
            .
          </p>
        )}
      </>
    )
  },
  solution({ data }) {
    const { kind, G, p } = data
    const W = (G * p) / 100
    if (kind === 'W') {
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            'W &= \\frac{p}{100}\\cdot G\\\\',
            `&= \\frac{${p}}{100}\\cdot ${G} = ${pp(W)}`,
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    if (kind === 'p') {
      const Wgiven = Math.round(W)
      const pcalc = (Wgiven / G) * 100
      return (
        <BlockMath
          math={[
            '\\begin{aligned}',
            'p &= \\frac{W}{G}\\cdot 100\\\\',
            `&= \\frac{${Wgiven}}{${G}}\\cdot 100 = ${pp(pcalc)}\\%`,
            '\\end{aligned}',
          ].join('')}
        />
      )
    }
    // G
    const Wgiven = Math.round(W)
    const Gcalc = (Wgiven * 100) / p
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          'G &= \\frac{W\\cdot 100}{p}\\\\',
          `&= \\frac{${Wgiven}\\cdot 100}{${p}} = ${pp(Gcalc)}`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
