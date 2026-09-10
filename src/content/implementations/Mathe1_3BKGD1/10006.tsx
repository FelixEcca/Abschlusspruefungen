import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  drawingCm: number
  originalM: number
  object: string
}

export const exercise10006: Exercise<DATA> = {
  title: 'Maßstab aus Originalmaß und Abbildungsmaß berechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { drawingCm: 4, originalM: 2, object: 'Schaufenster' },
      { drawingCm: 6, originalM: 3, object: 'Messestand' },
      { drawingCm: 2.5, originalM: 1, object: 'Schild' },
      { drawingCm: 8, originalM: 4, object: 'Wandgrafik' },
    ])
  },
  originalData: { drawingCm: 4, originalM: 2, object: 'Schaufenster' },
  task({ data }) {
    return (
      <p>
        Ein {data.object} ist in Wirklichkeit <b>{pp(data.originalM)} m</b>{' '}
        breit. In einer Zeichnung ist es <b>{pp(data.drawingCm)} cm</b> breit.
        Bestimmen Sie den Maßstab der Zeichnung.
      </p>
    )
  },
  solution({ data }) {
    const originalCm = data.originalM * 100
    const scale = originalCm / data.drawingCm
    return (
      <>
        <p>Zuerst müssen beide Längen in derselben Einheit stehen.</p>
        <p>
          <InlineMath math={`${pp(data.originalM)}\\,\\mathrm m=${pp(originalCm)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          Maßstabszahl:{' '}
          <InlineMath math={`${pp(originalCm)}:${pp(data.drawingCm)}=${pp(scale)}`} />
        </p>
        <p>
          Der Maßstab lautet <b>1:{pp(scale)}</b>. Das bedeutet: 1 cm in der
          Zeichnung entspricht {pp(scale)} cm in Wirklichkeit.
        </p>
      </>
    )
  },
}
