import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  known: 'a,b' | 'a,c' | 'b,c'
  a: number
  b: number
  c: number
}

export const exercise4602: Exercise<DATA> = {
  title: 'Satz des Pythagoras',
  source: 'Training',
  useCalculator: false,
  duration: 6,
  points: 3,

  generator(rng) {
    const a = rng.randomIntBetween(3, 9)
    const b = rng.randomIntBetween(4, 10)
    const c = Math.round(Math.sqrt(a * a + b * b))
    const known = rng.randomItemFromArray<DATA['known']>(['a,b', 'a,c', 'b,c'])
    return { known, a, b, c }
  },

  originalData: { known: 'a,b', a: 6, b: 8, c: 10 },

  task({ data }) {
    const { known, a, b, c } = data
    return (
      <>
        <p>
          In einem rechtwinkligen Dreieck gilt <br></br>
          <InlineMath math="a^2+b^2=c^2" />.
        </p>
        <p>
          Gegeben:{' '}
          {known === 'a,b' ? (
            <InlineMath math={`a=${a},\\; b=${b}`} />
          ) : known === 'a,c' ? (
            <InlineMath math={`a=${a},\\; c=${c}`} />
          ) : (
            <InlineMath math={`b=${b},\\; c=${c}`} />
          )}
          .
        </p>
        <p>Bestimme die fehlende Seite.</p>
      </>
    )
  },

  solution({ data }) {
    const { known, a, b, c } = data
    let formel = 'a^2+b^2=c^2',
      einsetzen = '',
      result = 0,
      sym = ''

    if (known === 'a,b') {
      result = Math.sqrt(a * a + b * b)
      einsetzen = `${pp(a)}^2+${pp(b)}^2=c^2`
      sym = 'c'
    } else if (known === 'a,c') {
      result = Math.sqrt(c * c - a * a)
      einsetzen = `${pp(a)}^2+b^2=${pp(c)}^2`
      sym = 'b'
    } else {
      result = Math.sqrt(c * c - b * b)
      einsetzen = `a^2+${pp(b)}^2=${pp(c)}^2`
      sym = 'a'
    }

    return (
      <>
        <p>
          <b>Formel → Einsetzen → Lösen</b>
        </p>
        <InlineMath math={formel} />
        <br />
        <InlineMath math={einsetzen} />
        <br />
        {(() => {
          // Helper to check for perfect squares
          const isPerfectSquare = (n: number) => Number.isInteger(Math.sqrt(n))
          // Helper to format the result as sqrt or integer
          let value = 0
          if (sym === 'c') value = a * a + b * b
          else if (sym === 'b') value = c * c - a * a
          else value = c * c - b * b

          if (isPerfectSquare(value)) {
            return <InlineMath math={`${sym} = ${Math.sqrt(value)}`} />
          } else {
            return <InlineMath math={`${sym} = \\sqrt{${value}}`} />
          }
        })()}
      </>
    )
  },
}
