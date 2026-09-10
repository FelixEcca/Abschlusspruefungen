import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  m: number
  b: number
}

export const exercise10039: Exercise<DATA> = {
  title: 'Schnittpunkte mit den Koordinatenachsen bestimmen',
  source: '3BKGD1',
  useCalculator: true,
  duration: 12,
  points: 12,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { m: 2, b: -6 },
      { m: -3, b: 9 },
      { m: 4, b: 8 },
      { m: -2, b: -10 },
    ])
  },
  originalData: { m: 2, b: -6 },
  task({ data }) {
    return (
      <p>
        Bestimmen Sie die Schnittpunkte des Graphen von{' '}
        <InlineMath math={`f(x)=${data.m}x${data.b >= 0 ? '+' : ''}${data.b}`} />{' '}
        mit der x-Achse und mit der y-Achse.
      </p>
    )
  },
  solution({ data }) {
    const xIntercept = -data.b / data.m
    return (
      <>
        <p>
          Schnittpunkt mit der y-Achse: Dort ist <InlineMath math="x=0" />.
        </p>
        <p>
          <InlineMath math={`f(0)=${data.m}\\cdot0${data.b >= 0 ? '+' : ''}${data.b}=${data.b}`} />
        </p>
        <p>
          Also: <InlineMath math={`S_y(0|${data.b})`} />
        </p>
        <p>
          Schnittpunkt mit der x-Achse: Dort ist <InlineMath math="f(x)=0" />.
        </p>
        <p>
          <InlineMath
            math={`0=${data.m}x${data.b >= 0 ? '+' : ''}${data.b}\\quad\\Rightarrow\\quad x=${pp(xIntercept)}`}
          />
        </p>
        <p>
          Also: <InlineMath math={`S_x(${pp(xIntercept)}|0)`} />.
        </p>
      </>
    )
  },
}
