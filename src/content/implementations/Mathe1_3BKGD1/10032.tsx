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

export const exercise10032: Exercise<DATA> = {
  title: 'Steigung aus zwei Punkten berechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { x1: 1, y1: 3, x2: 5, y2: 11, context: 'Gerade in einem Layout-Raster' },
      { x1: -2, y1: 5, x2: 4, y2: -1, context: 'fallende Hilfslinie' },
      { x1: 0, y1: -2, x2: 3, y2: 7, context: 'Kostenmodell' },
      { x1: -3, y1: -4, x2: 1, y2: 4, context: 'Trendgerade' },
    ])
  },
  originalData: { x1: 1, y1: 3, x2: 5, y2: 11, context: 'Gerade in einem Layout-Raster' },
  task({ data }) {
    return (
      <p>
        Für die {data.context} sind die Punkte{' '}
        <InlineMath math={`P_1(${data.x1}|${data.y1})`} /> und{' '}
        <InlineMath math={`P_2(${data.x2}|${data.y2})`} /> gegeben. Berechnen
        Sie die Steigung der Geraden.
      </p>
    )
  },
  solution({ data }) {
    const dy = data.y2 - data.y1
    const dx = data.x2 - data.x1
    const m = dy / dx
    return (
      <>
        <p>Die Steigung berechnet man aus der Änderung der y-Werte geteilt durch die Änderung der x-Werte.</p>
        <p>
          <InlineMath math={`m=\\frac{y_2-y_1}{x_2-x_1}`} />
        </p>
        <p>
          Einsetzen:{' '}
          <InlineMath
            math={`m=\\frac{${data.y2}-${data.y1}}{${data.x2}-${data.x1}}=\\frac{${dy}}{${dx}}=${pp(m)}`}
          />
        </p>
        <p>
          Die Steigung beträgt <b>{pp(m)}</b>.
        </p>
      </>
    )
  },
}
