import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './math'

interface DATA {
  r: number
  h: number
  k: number
  variant: number
}

export const exercise22013: Exercise<DATA> = {
  title: 'Markante Stellen in einem Graphen ablesen',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      r: rng.randomIntBetween(-2, 2),
      h: rng.randomIntBetween(1, 4),
      k: rng.randomItemFromArray([-1, 1]),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { r: 1, h: 2, k: 1, variant: 0 },
  task({ data }) {
    return (
      <>
        <p>
          {
            [
              'Lesen Sie den Scheitelpunkt ab und benennen Sie seine Art.',
              'Geben Sie die Intervalle an, in denen der Graph steigt beziehungsweise fällt.',
              'Lesen Sie den Schnittpunkt mit der y-Achse ab.',
            ][data.variant]
          }
        </p>
        <FunctionGraph
          fn={x => data.k * (x - data.r) ** 2 + data.h}
          xMin={-5}
          xMax={5}
          yMin={-5}
          yMax={8}
        />
      </>
    )
  },
  solution({ data }) {
    return (
      <p>
        {data.variant === 0 ? (
          <>
            Der Scheitel liegt bei{' '}
            <InlineMath math={String.raw`S(${data.r}\mid${data.h})`} />. Es ist
            ein {data.k > 0 ? 'Tiefpunkt' : 'Hochpunkt'}.
          </>
        ) : data.variant === 1 ? (
          <>
            Links von <InlineMath math={String.raw`x=${data.r}`} />{' '}
            {data.k > 0 ? 'fällt' : 'steigt'} der Graph, rechts davon{' '}
            {data.k > 0 ? 'steigt' : 'fällt'} er.
          </>
        ) : (
          <>
            An der y-Achse ist x = 0. Der Schnittpunkt ist{' '}
            <InlineMath
              math={String.raw`(0\mid${data.k * data.r ** 2 + data.h})`}
            />
            .
          </>
        )}
      </p>
    )
  },
}
