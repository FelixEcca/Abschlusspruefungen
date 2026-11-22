import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  x: number
  y: number
  variant: number
}

export const exercise22010: Exercise<DATA> = {
  title: 'Funktionswert, Steigung und Stammfunktion unterscheiden',
  source: 'Pflichtteiltrainer · Basis',
  useCalculator: false,
  duration: 3,
  points: 2,
  generator(rng) {
    return {
      x: rng.randomIntBetween(-4, 4),
      y: rng.randomIntBetween(1, 6),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { x: 2, y: 3, variant: 1 },
  task({ data }) {
    return (
      <>
        <p>
          Erklären Sie die Aussage in einem Satz. Handelt es sich um einen
          Funktionswert von f, eine Steigung von f oder einen Funktionswert
          einer Stammfunktion F?
        </p>
        <p>
          <InlineMath
            math={String.raw`${['f', "f'", 'F'][data.variant]}(${data.x})=${data.y}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <p>
        {data.variant === 0 ? (
          <>
            Der Graph von f enthält den Punkt{' '}
            <InlineMath math={String.raw`(${data.x}\mid${data.y})`} />. Die
            Aussage beschreibt keine Steigung.
          </>
        ) : data.variant === 1 ? (
          <>
            Der Graph von f hat bei{' '}
            <InlineMath math={String.raw`x=${data.x}`} /> die Tangentensteigung{' '}
            {data.y}. Der Funktionswert von f an dieser Stelle ist dadurch nicht
            festgelegt.
          </>
        ) : (
          <>
            Der Graph einer Stammfunktion F enthält den Punkt{' '}
            <InlineMath math={String.raw`(${data.x}\mid${data.y})`} />. Daraus
            folgt weder <InlineMath math={String.raw`f(${data.x})=${data.y}`} />{' '}
            noch eine entsprechende Steigung von f.
          </>
        )}
      </p>
    )
  },
}
