import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { FunctionGraph } from './math'

interface DATA {
  a: number
  length: number
}

export const exercise22029: Exercise<DATA> = {
  title: 'Ein Integral mit einem Rechteck abschätzen',
  source: 'Pflichtteiltrainer · Prüfungstransfer',
  useCalculator: false,
  duration: 8,
  points: 5,
  generator(rng) {
    return { a: rng.randomIntBetween(1, 5), length: rng.randomIntBetween(1, 5) }
  },
  originalData: { a: 2, length: 3 },
  task({ data }) {
    return (
      <>
        <p>
          Begründen Sie allein mit dem Graphen, warum das Integral positiv und
          kleiner als {data.a * data.length} ist. Sie müssen es nicht
          ausrechnen.
        </p>
        <FunctionGraph
          fn={x => data.a * Math.sin((Math.PI * x) / data.length)}
          xMin={0}
          xMax={data.length}
          yMin={0}
          yMax={data.a + 1}
        />
        <p>
          <InlineMath
            math={String.raw`0<\int_0^{${data.length}}f(x)\,dx<${data.a * data.length}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Der Graph liegt im Inneren des Intervalls oberhalb der x-Achse.
          Deshalb ist das Integral positiv.
        </p>
        <p>
          Das umschließende Rechteck hat die Breite {data.length} und die Höhe{' '}
          {data.a}, also den Flächeninhalt {data.length * data.a}. Der Graph
          erreicht diese Höhe nur an seinem Hochpunkt und liegt sonst darunter.
          Daher ist die Fläche unter dem Graphen echt kleiner als die
          Rechteckfläche.
        </p>
      </>
    )
  },
}
