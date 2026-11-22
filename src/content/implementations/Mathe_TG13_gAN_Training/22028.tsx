import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './math'

interface DATA {
  a: number
  length: number
}

export const exercise22028: Exercise<DATA> = {
  title: 'Flächeninhalt und Integralwert unterscheiden',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return { a: rng.randomIntBetween(1, 4), length: rng.randomIntBetween(1, 4) }
  },
  originalData: { a: 2, length: 3 },
  task({ data }) {
    return (
      <>
        <p>
          Der Graph von <InlineMath math={String.raw`f(x)=${data.a}x`} /> wird
          im Intervall{' '}
          <InlineMath math={String.raw`[-${data.length};${data.length}]`} />{' '}
          betrachtet. Bestimmen Sie a) das Integral und b) den gesamten
          Flächeninhalt zwischen Graph und x-Achse.
        </p>
        <FunctionGraph
          fn={x => data.a * x}
          xMin={-data.length}
          xMax={data.length}
          yMin={-data.a * data.length}
          yMax={data.a * data.length}
          yStep={data.a}
        />
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Das linke Dreieck liegt unter der x-Achse und zählt beim Integral
          negativ. Das rechte zählt positiv. Beide sind gleich groß.
        </p>
        <p>
          <InlineMath
            math={String.raw`\int_{-${data.length}}^{${data.length}}${data.a}x\,dx=0`}
          />
          .
        </p>
        <p>
          Beim Flächeninhalt werden beide positiven Dreiecksflächen addiert:{' '}
          <InlineMath
            math={String.raw`A=2\cdot\frac12\cdot${data.length}\cdot${data.a * data.length}=${data.a * data.length ** 2}`}
          />{' '}
          Flächeneinheiten.
        </p>
      </>
    )
  },
}
