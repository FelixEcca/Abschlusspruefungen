import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { frac, polynomial } from './math'

interface DATA {
  a: number
  b: number
  variant: number
}

export const exercise22006: Exercise<DATA> = {
  title: 'Das passende Verfahren für eine quadratische Gleichung wählen',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 5),
      b: rng.randomIntBetween(1, 5),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { a: 2, b: 3, variant: 2 },
  task({ data }) {
    const term =
      data.variant === 0
        ? String.raw`x^2=${data.a ** 2}`
        : data.variant === 1
          ? String.raw`x^2-${data.a}x=0`
          : String.raw`${polynomial([
              [1, 2],
              [data.b - data.a, 1],
              [-data.a * data.b, 0],
            ])}=0`
    return (
      <>
        <p>Wählen Sie ein geeignetes Verfahren und lösen Sie die Gleichung.</p>
        <p>
          <InlineMath math={term} />
        </p>
      </>
    )
  },
  solution({ data }) {
    return data.variant === 0 ? (
      <p>
        Wurzelziehen liefert zwei Lösungen:{' '}
        <InlineMath math={String.raw`x=\pm${data.a}`} />. Auch die negative Zahl
        ergibt beim Quadrieren den angegebenen Wert.
      </p>
    ) : data.variant === 1 ? (
      <p>
        Ausklammern liefert <InlineMath math={String.raw`x(x-${data.a})=0`} />.
        Somit sind{' '}
        <InlineMath math={String.raw`x=0\quad\text{oder}\quad x=${data.a}`} />{' '}
        die Lösungen.
      </p>
    ) : (
      <>
        <p>Mit der p-q-Formel erhält man</p>
        <p>
          <InlineMath
            math={String.raw`x=-\frac{${data.b - data.a}}2\pm\sqrt{\left(\frac{${data.b - data.a}}2\right)^2+${data.a * data.b}}`}
          />
          .
        </p>
        <p>
          Die Lösungen sind{' '}
          <InlineMath math={String.raw`x_1=${data.a},\quad x_2=${-data.b}`} />.
          Zur Kontrolle kann man auch{' '}
          <InlineMath math={String.raw`(x-${data.a})(x+${data.b})=0`} />{' '}
          ausmultiplizieren.
        </p>
      </>
    )
  },
}
