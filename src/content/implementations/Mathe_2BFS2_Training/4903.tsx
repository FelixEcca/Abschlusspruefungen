import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { BlockMath } from 'react-katex'

interface D4903 {
  symbols: string[]
  query: string
}

export const exercise4903: Exercise<D4903> = {
  title: 'Absolute und relative Häufigkeit',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 2,
  generator(rng) {
    const pool = ['♥', '♦', '♣', '♠', '★', '●']
    const n = rng.randomIntBetween(8, 14)
    const symbols = Array.from({ length: n }, () =>
      rng.randomItemFromArray(pool),
    )
    const query = rng.randomItemFromArray(pool)
    return { symbols, query }
  },
  originalData: {
    symbols: ['♥', '♥', '♣', '♠', '★', '♥', '●', '♦'],
    query: '♥',
  },
  constraint() {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Gegeben ist die Stichprobe:</p>
        <div className="text-2xl my-1">{data.symbols.join(' ')}</div>
        <p>
          Bestimme die absolute und relative Häufigkeit von <b>{data.query}</b>.
        </p>
      </>
    )
  },
  solution({ data }) {
    const abs = data.symbols.filter(s => s === data.query).length
    const rel = abs / data.symbols.length
    return (
      <BlockMath
        math={[
          '\\begin{aligned}',
          '\\text{absolute Häufigkeit}&= ' + abs + '\\\\',
          '\\text{relative Häufigkeit}&= \\frac{' +
            abs +
            '}{' +
            data.symbols.length +
            '}=' +
            pp(rel),
          '\\end{aligned}',
        ].join('')}
      />
    )
  },
}
