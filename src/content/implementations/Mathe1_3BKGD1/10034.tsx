import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  x1: number
  y1: number
  x2: number
  y2: number
  context: string
}

export const exercise10034: Exercise<DATA> = {
  title: 'Geradengleichung aus zwei Punkten bestimmen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { x1: 1, y1: 4, x2: 5, y2: 12, context: 'Layoutlinie' },
      { x1: -2, y1: 7, x2: 2, y2: -1, context: 'Hilfslinie' },
      { x1: 0, y1: 3, x2: 4, y2: 11, context: 'Kostenmodell' },
      { x1: -3, y1: -5, x2: 3, y2: 7, context: 'Trendgerade' },
    ])
  },
  originalData: { x1: 1, y1: 4, x2: 5, y2: 12, context: 'Layoutlinie' },
  task({ data }) {
    return (
      <p>
        Eine {data.context} verläuft durch die Punkte{' '}
        <InlineMath math={`P(${data.x1}|${data.y1})`} /> und{' '}
        <InlineMath math={`Q(${data.x2}|${data.y2})`} />. Bestimmen Sie die
        Geradengleichung in der Form <InlineMath math="y=mx+b" />.
      </p>
    )
  },
  solution({ data }) {
    const m = (data.y2 - data.y1) / (data.x2 - data.x1)
    const b = data.y1 - m * data.x1
    return (
      <>
        <p>Zuerst berechne ich die Steigung aus den beiden Punkten.</p>
        <p>
          <InlineMath
            math={`m=\\frac{${data.y2}-${data.y1}}{${data.x2}-${data.x1}}=${pp(m)}`}
          />
        </p>
        <p>
          Danach setze ich einen Punkt in <InlineMath math="y=mx+b" /> ein,
          zum Beispiel <InlineMath math={`P(${data.x1}|${data.y1})`} />.
        </p>
        <p>
          <InlineMath math={`${data.y1}=${pp(m)}\\cdot${data.x1}+b`} />
        </p>
        <p>
          <InlineMath math={`b=${pp(b)}`} />
        </p>
        <p>
          Die Geradengleichung lautet{' '}
          <InlineMath math={`y=${pp(m)}x${b >= 0 ? '+' : ''}${pp(b)}`} />.
        </p>
      </>
    )
  },
}
