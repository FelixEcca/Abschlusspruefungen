import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  known: 'width' | 'height'
  side: number
  diagonal: number
  context: string
}

export const exercise10061: Exercise<DATA> = {
  title: 'Seitenverhältnis aus Seite und Diagonale bestimmen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { known: 'width', side: 24, diagonal: 30, context: 'Foto' },
      { known: 'height', side: 15, diagonal: 25, context: 'Display' },
      { known: 'width', side: 30, diagonal: 50, context: 'Plakatentwurf' },
      { known: 'height', side: 20, diagonal: 29, context: 'Layoutfläche' },
    ])
  },
  originalData: { known: 'width', side: 24, diagonal: 30, context: 'Foto' },
  task({ data }) {
    return (
      <p>
        Bei einem rechteckigen {data.context} beträgt{' '}
        {data.known === 'width' ? 'die Breite' : 'die Höhe'}{' '}
        <b>{pp(data.side)} cm</b>. Die Diagonale beträgt{' '}
        <b>{pp(data.diagonal)} cm</b>. Berechnen Sie die fehlende Seitenlänge
        und geben Sie anschließend das Seitenverhältnis Breite : Höhe an.
      </p>
    )
  },
  solution({ data }) {
    const missing = Math.sqrt(data.diagonal ** 2 - data.side ** 2)
    const width = data.known === 'width' ? data.side : missing
    const height = data.known === 'height' ? data.side : missing
    const divisor = width > height ? height : width
    const ratioW = width / divisor
    const ratioH = height / divisor
    return (
      <>
        <p>
          Die Diagonale ist die Hypotenuse. Deshalb gilt der Satz des
          Pythagoras.
        </p>
        <p>
          <InlineMath
            math={`\\text{fehlende Seite}^2=${pp(data.diagonal)}^2-${pp(data.side)}^2`}
          />
        </p>
        <p>
          <InlineMath
            math={`\\text{fehlende Seite}=\\sqrt{${data.diagonal ** 2}-${data.side ** 2}}\\approx${pp(missing)}\\,\\mathrm{cm}`}
          />
        </p>
        <p>
          Damit sind Breite und Höhe:{' '}
          <InlineMath math={`${pp(width)}\\,\\mathrm{cm}:${pp(height)}\\,\\mathrm{cm}`} />.
        </p>
        <p>
          Gekürzt als Verhältnis:{' '}
          <InlineMath math={`${pp(width)}:${pp(height)}\\approx${pp(ratioW)}:${pp(ratioH)}`} />.
        </p>
      </>
    )
  },
}
