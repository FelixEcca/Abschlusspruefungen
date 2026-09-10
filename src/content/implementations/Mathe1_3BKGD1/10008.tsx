import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  originalM: number
  scale: number
  object: string
}

export const exercise10008: Exercise<DATA> = {
  title: 'Zeichnungsgröße bei gegebenem Maßstab berechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { originalM: 2.4, scale: 20, object: 'Banner' },
      { originalM: 3, scale: 50, object: 'Schaufenster' },
      { originalM: 1.8, scale: 25, object: 'Infotafel' },
      { originalM: 4.5, scale: 100, object: 'Raumwand' },
    ])
  },
  originalData: { originalM: 2.4, scale: 20, object: 'Banner' },
  task({ data }) {
    return (
      <p>
        Ein {data.object} ist in Wirklichkeit <b>{pp(data.originalM)} m</b>{' '}
        breit. Es soll im Maßstab <b>1:{data.scale}</b> gezeichnet werden.
        Berechnen Sie die Breite in der Zeichnung.
      </p>
    )
  },
  solution({ data }) {
    const originalCm = data.originalM * 100
    const drawingCm = originalCm / data.scale
    return (
      <>
        <p>Zuerst rechne ich die Originallänge in cm um.</p>
        <p>
          <InlineMath math={`${pp(data.originalM)}\\,\\mathrm m=${pp(originalCm)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          Beim Maßstab 1:{data.scale} wird durch {data.scale} geteilt:
        </p>
        <p>
          <InlineMath math={`${pp(originalCm)}:${data.scale}=${pp(drawingCm)}\\,\\mathrm{cm}`} />
        </p>
        <p>
          Die Zeichnung muss <b>{pp(drawingCm)} cm</b> breit sein.
        </p>
      </>
    )
  },
}
