import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Symmetry = 'axis' | 'point' | 'none'

interface DATA {
  expression: string
  symmetry: Symmetry
  reason: string
}

export const exercise10055: Exercise<DATA> = {
  title: 'Symmetrie von Polynomfunktionen untersuchen',
  source: '3BKGD1',
  useCalculator: false,
  duration: 10,
  points: 10,
  generator(rng) {
    return rng.randomItemFromArray<DATA>([
      {
        expression: '2x^4-3x^2+1',
        symmetry: 'axis',
        reason: 'Es kommen nur gerade Exponenten vor.',
      },
      {
        expression: 'x^5-4x^3+x',
        symmetry: 'point',
        reason: 'Es kommen nur ungerade Exponenten vor und kein konstantes Glied.',
      },
      {
        expression: 'x^3+2x^2-5',
        symmetry: 'none',
        reason: 'Gerade und ungerade Exponenten werden gemischt.',
      },
      {
        expression: '-x^6+4x^4-2',
        symmetry: 'axis',
        reason: 'Es kommen nur gerade Exponenten vor.',
      },
    ])
  },
  originalData: {
    expression: '2x^4-3x^2+1',
    symmetry: 'axis',
    reason: 'Es kommen nur gerade Exponenten vor.',
  },
  task({ data }) {
    return (
      <p>
        Untersuchen Sie die Symmetrie der Polynomfunktion{' '}
        <InlineMath math={`f(x)=${data.expression}`} />.
      </p>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>{data.reason}</p>
        {data.symmetry === 'axis' && (
          <p>
            Deshalb gilt <InlineMath math="f(-x)=f(x)" />. Der Graph ist{' '}
            <b>achsensymmetrisch zur y-Achse</b>.
          </p>
        )}
        {data.symmetry === 'point' && (
          <p>
            Deshalb gilt <InlineMath math="f(-x)=-f(x)" />. Der Graph ist{' '}
            <b>punktsymmetrisch zum Ursprung</b>.
          </p>
        )}
        {data.symmetry === 'none' && (
          <p>
            Es gilt weder <InlineMath math="f(-x)=f(x)" /> noch{' '}
            <InlineMath math="f(-x)=-f(x)" />. Der Graph besitzt hier keine
            dieser beiden Standardsymmetrien.
          </p>
        )}
      </>
    )
  },
}
