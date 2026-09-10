import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  n: number
}

export const exercise10050: Exercise<DATA> = {
  title: 'Parameter einer Potenzfunktion untersuchen',
  source: '3BKGD1',
  useCalculator: false,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { a: 3, n: 2 },
      { a: -2, n: 2 },
      { a: 0.5, n: 3 },
      { a: -4, n: 3 },
    ])
  },
  originalData: { a: 3, n: 2 },
  task({ data }) {
    return (
      <p>
        Beschreiben Sie, wie sich der Parameter{' '}
        <InlineMath math={`a=${String(data.a).replace('.', ',')}`} /> auf den
        Graphen der Potenzfunktion{' '}
        <InlineMath math={`f(x)=${String(data.a).replace('.', ',')}x^${data.n}`} /> auswirkt.
      </p>
    )
  },
  solution({ data }) {
    const mirrored = data.a < 0
    const stretched = Math.abs(data.a) > 1
    const compressed = Math.abs(data.a) < 1
    return (
      <>
        <p>
          Der Parameter <InlineMath math="a" /> steht vor der Potenz und
          verändert die y-Werte.
        </p>
        {stretched && <p>Da |a| größer als 1 ist, wird der Graph steiler bzw. gestreckt.</p>}
        {compressed && <p>Da |a| zwischen 0 und 1 liegt, wird der Graph flacher bzw. gestaucht.</p>}
        {mirrored ? (
          <p>
            Da <InlineMath math="a<0" /> gilt, wird der Graph zusätzlich an der
            x-Achse gespiegelt.
          </p>
        ) : (
          <p>
            Da <InlineMath math="a>0" /> gilt, wird der Graph nicht an der
            x-Achse gespiegelt.
          </p>
        )}
        <p>
          Der Exponent <InlineMath math={`${data.n}`} /> legt weiterhin die
          Grundform und Symmetrie fest.
        </p>
      </>
    )
  },
}
