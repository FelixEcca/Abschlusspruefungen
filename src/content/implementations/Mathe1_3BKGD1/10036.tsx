import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  m: number
  b: number
  context: string
}

export const exercise10036: Exercise<DATA> = {
  title: 'Nullstelle einer linearen Funktion berechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { m: 2, b: -8, context: 'Kosten-Ausgleich' },
      { m: -3, b: 12, context: 'fallender Füllstand' },
      { m: 4, b: 6, context: 'Gerade im Koordinatensystem' },
      { m: -5, b: -10, context: 'Hilfsgerade' },
    ])
  },
  originalData: { m: 2, b: -8, context: 'Kosten-Ausgleich' },
  task({ data }) {
    return (
      <p>
        Berechnen Sie die Nullstelle der linearen Funktion{' '}
        <InlineMath math={`f(x)=${data.m}x${data.b >= 0 ? '+' : ''}${data.b}`} />{' '}
        im Kontext {data.context}.
      </p>
    )
  },
  solution({ data }) {
    const zero = -data.b / data.m
    return (
      <>
        <p>An der Nullstelle ist der Funktionswert 0.</p>
        <p>
          <InlineMath math={`0=${data.m}x${data.b >= 0 ? '+' : ''}${data.b}`} />
        </p>
        <p>
          Nach x auflösen:{' '}
          <InlineMath math={`${data.m}x=${-data.b}`} />
        </p>
        <p>
          <InlineMath math={`x=${pp(-data.b)}:${data.m}=${pp(zero)}`} />
        </p>
        <p>
          Die Nullstelle liegt bei <InlineMath math={`x=${pp(zero)}`} />.
        </p>
      </>
    )
  },
}
