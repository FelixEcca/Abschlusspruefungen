import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  ratioW: number
  ratioH: number
  known: 'width' | 'height'
  value: number
  unit: string
  context: string
}

export const exercise10004: Exercise<DATA> = {
  title: 'Fehlende Seitenlänge bei Seitenverhältnis berechnen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { ratioW: 16, ratioH: 9, known: 'width', value: 48, unit: 'cm', context: 'Bildschirm' },
      { ratioW: 4, ratioH: 3, known: 'height', value: 18, unit: 'cm', context: 'Tablet' },
      { ratioW: 21, ratioH: 9, known: 'width', value: 63, unit: 'cm', context: 'Banner' },
      { ratioW: 3, ratioH: 2, known: 'height', value: 14, unit: 'cm', context: 'Foto' },
    ])
  },
  originalData: { ratioW: 16, ratioH: 9, known: 'width', value: 48, unit: 'cm', context: 'Bildschirm' },
  task({ data }) {
    return (
      <>
        <p>
          Ein {data.context} hat das Seitenverhältnis{' '}
          <b>
            {data.ratioW}:{data.ratioH}
          </b>
          .
        </p>
        <p>
          {data.known === 'width' ? 'Die Breite' : 'Die Höhe'} beträgt{' '}
          <b>
            {pp(data.value)} {data.unit}
          </b>
          . Berechnen Sie die fehlende Seitenlänge.
        </p>
      </>
    )
  },
  solution({ data }) {
    const factor = data.known === 'width' ? data.value / data.ratioW : data.value / data.ratioH
    const missing = data.known === 'width' ? data.ratioH * factor : data.ratioW * factor
    return (
      <>
        <p>
          Das Verhältnis bedeutet: {data.ratioW} gleiche Teile in der Breite und{' '}
          {data.ratioH} gleiche Teile in der Höhe.
        </p>
        <p>
          Ein Teil ist:{' '}
          <InlineMath
            math={
              data.known === 'width'
                ? `${pp(data.value)}:${data.ratioW}=${pp(factor)}`
                : `${pp(data.value)}:${data.ratioH}=${pp(factor)}`
            }
          />{' '}
          {data.unit}
        </p>
        <p>
          Fehlende Länge:{' '}
          <InlineMath
            math={
              data.known === 'width'
                ? `${data.ratioH}\\cdot${pp(factor)}=${pp(missing)}`
                : `${data.ratioW}\\cdot${pp(factor)}=${pp(missing)}`
            }
          />{' '}
          {data.unit}
        </p>
        <p>
          Die fehlende Seitenlänge beträgt <b>{pp(missing)} {data.unit}</b>.
        </p>
      </>
    )
  },
}
