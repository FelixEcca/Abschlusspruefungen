import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  n: number
}

export const exercise10048: Exercise<DATA> = {
  title: 'Symmetrie von Potenzfunktionen beschreiben',
  source: '3BKGD1',
  useCalculator: false,
  duration: 8,
  points: 8,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      { a: 2, n: 4 },
      { a: -1, n: 3 },
      { a: 3, n: 5 },
      { a: -2, n: 2 },
    ])
  },
  originalData: { a: 2, n: 4 },
  task({ data }) {
    return (
      <p>
        Beschreiben Sie die Symmetrie der Potenzfunktion{' '}
        <InlineMath math={`f(x)=${data.a}x^${data.n}`} />.
      </p>
    )
  },
  solution({ data }) {
    const even = data.n % 2 === 0
    return (
      <>
        <p>
          Entscheidend ist der Exponent <InlineMath math={`${data.n}`} />.
        </p>
        {even ? (
          <p>
            Der Exponent ist gerade. Deshalb gilt{' '}
            <InlineMath math="f(-x)=f(x)" />. Der Graph ist{' '}
            <b>achsensymmetrisch zur y-Achse</b>.
          </p>
        ) : (
          <p>
            Der Exponent ist ungerade. Deshalb gilt{' '}
            <InlineMath math="f(-x)=-f(x)" />. Der Graph ist{' '}
            <b>punktsymmetrisch zum Ursprung</b>.
          </p>
        )}
        <p>
          Der Faktor <InlineMath math={`${data.a}`} /> kann den Graphen
          strecken oder spiegeln, ändert diese Symmetrie aber nicht.
        </p>
      </>
    )
  },
}
