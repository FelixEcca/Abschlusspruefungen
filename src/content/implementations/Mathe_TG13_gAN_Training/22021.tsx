import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { polynomial } from './math'

interface DATA {
  a: number
  c: number
  variant: number
}

export const exercise22021: Exercise<DATA> = {
  title: 'Hochpunkt, Tiefpunkt oder waagerechte Wendestelle?',
  source: 'Pflichtteiltrainer · Aufbau',
  useCalculator: false,
  duration: 5,
  points: 3,
  generator(rng) {
    return {
      a: rng.randomItemFromArray([-2, -1, 1, 2]),
      c: rng.randomIntBetween(-3, 3),
      variant: rng.randomIntBetween(0, 2),
    }
  },
  originalData: { a: 1, c: 2, variant: 2 },
  task({ data }) {
    const power = [2, 4, 3][data.variant]
    return (
      <>
        <p>
          Untersuchen Sie die stationäre Stelle x = 0. Liegt ein Hochpunkt, ein
          Tiefpunkt oder kein Extrempunkt vor?
        </p>
        <p>
          <InlineMath
            math={String.raw`f(x)=${polynomial([
              [data.a, power],
              [data.c, 0],
            ])}`}
          />
        </p>
      </>
    )
  },
  solution({ data }) {
    const power = [2, 4, 3][data.variant]
    return (
      <>
        <p>
          <InlineMath
            math={String.raw`f'(x)=${data.a * power}x^{${power - 1}},\quad f'(0)=0`}
          />
          .
        </p>
        <p>
          {power % 2 === 0 ? (
            <>
              Die Potenz ist gerade. In der Umgebung von 0 sind alle Werte{' '}
              {data.a > 0 ? 'größer oder gleich' : 'kleiner oder gleich'} f(0).
              Daher liegt ein {data.a > 0 ? 'Tiefpunkt' : 'Hochpunkt'}{' '}
              <InlineMath math={String.raw`(0\mid${data.c})`} /> vor.
              {power === 4
                ? ' Hier ist f″(0) = 0. Das allein schließt einen Extrempunkt nicht aus.'
                : ''}
            </>
          ) : (
            <>
              Es gilt <InlineMath math={String.raw`f'(x)=${3 * data.a}x^2`} />.
              Links und rechts von 0 hat die Ableitung dasselbe Vorzeichen. Es
              liegt kein Extrempunkt vor, sondern eine waagerechte Wendestelle.
            </>
          )}
        </p>
      </>
    )
  },
}
