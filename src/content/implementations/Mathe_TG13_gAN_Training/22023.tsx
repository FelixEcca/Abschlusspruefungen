import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './math'

interface DATA {
  a: number
  r: number
}

export const exercise22023: Exercise<DATA> = {
  title: 'Aus dem Ableitungsgraphen auf f schließen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomItemFromArray([-2, -1, 1, 2]),
      r: rng.randomIntBetween(-2, 2),
    }
  },
  originalData: { a: 1, r: -1 },
  task({ data }) {
    return (
      <>
        <p>
          Gezeigt ist der Graph von f′, nicht der von f. In welchen Intervallen
          steigt oder fällt f? Welche Art von Extremstelle hat f?
        </p>
        <FunctionGraph
          fn={x => data.a * (x - data.r)}
          xMin={-5}
          xMax={5}
          yMin={-6}
          yMax={6}
        />
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die Ableitung ist bei <InlineMath math={String.raw`x=${data.r}`} />{' '}
          null. Links davon ist sie {data.a > 0 ? 'negativ' : 'positiv'}, rechts
          davon {data.a > 0 ? 'positiv' : 'negativ'}.
        </p>
        <p>
          Deshalb ist f links von dieser Stelle{' '}
          {data.a > 0 ? 'fallend' : 'steigend'} und rechts davon{' '}
          {data.a > 0 ? 'steigend' : 'fallend'}. Es liegt eine{' '}
          {data.a > 0 ? 'Tiefstelle' : 'Hochstelle'} vor.
        </p>
        <p>
          Die y-Koordinate des Extrempunkts von f lässt sich aus dem
          Ableitungsgraphen allein nicht bestimmen.
        </p>
      </>
    )
  },
}
