import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  drawingCm: number
  scale: number
  object: string
}

export const exercise10007: Exercise<DATA> = {
  title: 'Originallänge aus Maßstab und Zeichnung berechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { drawingCm: 5, scale: 50, object: 'Messestand' },
      { drawingCm: 7.5, scale: 20, object: 'Plakatwand' },
      { drawingCm: 3, scale: 100, object: 'Raumplan' },
      { drawingCm: 12, scale: 25, object: 'Schriftzug' },
    ])
  },
  originalData: { drawingCm: 5, scale: 50, object: 'Messestand' },
  task({ data }) {
    return (
      <p>
        In einer Zeichnung im Maßstab <b>1:{data.scale}</b> ist ein{' '}
        {data.object} <b>{pp(data.drawingCm)} cm</b> lang. Berechnen Sie die
        Originallänge in cm und m.
      </p>
    )
  },
  solution({ data }) {
    const originalCm = data.drawingCm * data.scale
    const originalM = originalCm / 100
    return (
      <>
        <p>
          Beim Maßstab 1:{data.scale} entspricht 1 cm in der Zeichnung{' '}
          {data.scale} cm in Wirklichkeit.
        </p>
        <p>
          <InlineMath math={`${pp(data.drawingCm)}\\cdot${data.scale}=${pp(originalCm)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          <InlineMath math={`${pp(originalCm)}\\,\\mathrm{cm}=${pp(originalM)}\\,\\mathrm m`} />
        </p>
        <p>
          Die Originallänge beträgt <b>{pp(originalCm)} cm</b> bzw.{' '}
          <b>{pp(originalM)} m</b>.
        </p>
      </>
    )
  },
}
