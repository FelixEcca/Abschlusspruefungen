import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4402 {
  terms: { coef: number; variable: 'x' | '' }[]
}

function shuffle<T>(arr: T[]): T[] {
  return arr
    .map(v => [Math.random(), v] as [number, T])
    .sort(([a], [b]) => a - b)
    .map(([, v]) => v)
}

export const exercise4402: Exercise<D4402> = {
  title: 'Ausklammern',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 2,
  generator(rng) {
    // Always use 3 terms
    const numTerms = 3
    // Randomly decide for each term if it has x or not
    const structures: ('x' | '')[] = shuffle(['x', '', 'x'] as ('x' | '')[])
    // Pick a common factor
    const g = rng.randomIntBetween(2, 4)
    // Generate coefficients
    const coefs = Array(numTerms)
      .fill(0)
      .map(() => rng.randomIntBetween(-6, 6) || 1)
      .map(c => c * g)
    // Build terms
    const terms = shuffle(
      coefs.map((coef, i) => ({
        coef,
        variable: structures[i],
      })),
    )
    return { terms }
  },
  originalData: {
    terms: [
      { coef: 3, variable: 'x' },
      { coef: 9, variable: 'x' },
      { coef: -12, variable: '' },
    ],
  },
  constraint({ data }) {
    const { terms } = data
    return terms.every(t => t.coef !== 0)
  },
  task({ data }) {
    const { terms } = data
    return (
      <>
        <p>Klammere so weit wie möglich aus und fasse zusammen.</p>
        <BlockMath
          math={terms
            .map(
              (t, i) =>
                pp(t.coef, i === 0 ? undefined : 'merge_op') +
                (t.variable ? t.variable : ''),
            )
            .join(' ')}
        />
      </>
    )
  },
  solution({ data }) {
    const { terms } = data
    // Find GCD of all coefficients
    const g = terms.reduce(
      (acc, t) => gcd(acc, t.coef),
      Math.abs(terms[0].coef),
    )
    // Factor out g
    const factoredTerms = terms.map(t => ({
      coef: t.coef / g,
      variable: t.variable,
    }))
    // Combine like terms
    const xSum = factoredTerms
      .filter(t => t.variable === 'x')
      .reduce((acc, t) => acc + t.coef, 0)
    const constSum = factoredTerms
      .filter(t => t.variable === '')
      .reduce((acc, t) => acc + t.coef, 0)
    // Build inner expression
    const inner: string[] = []
    if (xSum !== 0) inner.push(pp(xSum) + 'x')
    if (constSum !== 0)
      inner.push(pp(constSum, inner.length ? 'merge_op' : undefined))
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          `&= ${pp(g)}\\,\\big(${inner.join(' ')}\\big)`,
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}

function gcd(x: number, y: number) {
  x = Math.abs(x)
  y = Math.abs(y)
  while (y) [x, y] = [y, x % y]
  return x
}
