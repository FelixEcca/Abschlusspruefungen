import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { coord, ReflectionSketch, Vec } from './math'

interface DATA {
  point: Vec
  axis: number
  reflection: number
}
export const exercise22058: Exercise<DATA> = {
  title: 'Projektion und Spiegelung an Koordinatenebenen unterscheiden',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      point: [
        rng.randomIntBetween(-4, 4),
        rng.randomIntBetween(-4, 4),
        rng.randomIntBetween(1, 5),
      ],
      axis: rng.randomIntBetween(0, 2),
      reflection: rng.randomIntBetween(0, 1),
    }
  },
  originalData: { point: [-2, 3, 4], axis: 0, reflection: 1 },
  task({ data }) {
    const plane = ['x_2x_3', 'x_1x_3', 'x_1x_2'][data.axis]
    return (
      <>
        <p>
          Der Punkt <InlineMath math={String.raw`A(${coord(data.point)})`} />{' '}
          wird {data.reflection ? 'gespiegelt' : 'orthogonal projiziert'}{' '}
          {data.reflection ? 'an der' : 'auf die'} <InlineMath math={plane} />
          -Ebene. Geben Sie die Koordinaten des Bildpunkts an.
        </p>
      </>
    )
  },
  solution({ data }) {
    const result = data.point.map((value, i) =>
      i === data.axis ? (data.reflection ? -value : 0) : value,
    ) as Vec
    return (
      <>
        <p>
          Die zur Ebene senkrechte Koordinate ist x{data.axis + 1}.{' '}
          {data.reflection
            ? 'Bei der Spiegelung wechselt nur ihr Vorzeichen.'
            : 'Bei der orthogonalen Projektion wird nur sie null.'}{' '}
          Die anderen Koordinaten bleiben unverändert.
        </p>
        <p>
          <InlineMath math={String.raw`A'(${coord(result)})`} />.
        </p>
        {data.axis === 0 && data.reflection === 1 && (
          <ReflectionSketch
            x={data.point[0]}
            y={data.point[1]}
            z={data.point[2]}
          />
        )}
      </>
    )
  },
}
