import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  // Teil a
  a1: number
  b1: number
  c1: number

  // Teil b
  known: 'a,b' | 'a,c' | 'b,c'
  a: number
  b: number
  c: number
}

function isPerfectSquare(n: number) {
  return Number.isInteger(Math.sqrt(n))
}

function pythagorasLatexResult(sym: string, value: number) {
  if (isPerfectSquare(value)) {
    return `${sym} = ${pp(Math.sqrt(value))}`
  }
  return `${sym} = \\sqrt{${pp(value)}}`
}

export const exercise4602: Exercise<DATA> = {
  title: 'Satz des Pythagoras',
  source: 'Training',
  useCalculator: false,
  duration: 6,

  generator(rng) {
    // Teil a: schöne pythagoreische Tripel für saubere Skizzen
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
    ] as const
    const [a1, b1, c1] = rng.randomItemFromArray([...triples])

    // Teil b: bestehende Aufgabe
    const [a, b, c] = rng.randomItemFromArray([...triples])
    const known = rng.randomItemFromArray<DATA['known']>(['a,b', 'a,c', 'b,c'])

    return { a1, b1, c1, known, a, b, c }
  },

  originalData: {
    a1: 3,
    b1: 4,
    c1: 5,
    known: 'a,b',
    a: 6,
    b: 8,
    c: 10,
  },

  constraint({ data }) {
    return (
      data.a1 > 0 &&
      data.b1 > 0 &&
      data.c1 > 0 &&
      data.a > 0 &&
      data.b > 0 &&
      data.c > 0
    )
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Bestimme die fehlende Seite mit dem Satz des Pythagoras.</p>

            <svg viewBox="0 0 328 180">
              <line
                x1="60"
                y1="130"
                x2="60"
                y2="50"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1="60"
                y1="130"
                x2="220"
                y2="130"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1="60"
                y1="50"
                x2="220"
                y2="130"
                stroke="black"
                strokeWidth="2"
              />

              <path
                d="M 60 116 L 74 116 L 74 130"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />

              <text x="28" y="95" fontSize="16">
                {data.a1}
              </text>
              <text x="130" y="152" fontSize="16">
                {data.b1}
              </text>
              <text x="145" y="88" fontSize="16">
                c
              </text>
            </svg>
          </>
        )
      },
      solution({ data }) {
        const value = data.a1 * data.a1 + data.b1 * data.b1

        return (
          <>
            <InlineMath math={`a^2+b^2=c^2`} />
            <br />
            <InlineMath math={`${pp(data.a1)}^2+${pp(data.b1)}^2=c^2`} />
            <br />
            <InlineMath math={`c^2=${pp(value)}`} />
            <br />
            <InlineMath math={pythagorasLatexResult('c', value)} />
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        const { known, a, b, c } = data
        return (
          <>
            <p>
              In einem rechtwinkligen Dreieck gilt <br />
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
        let formel = 'a^2+b^2=c^2'
        let einsetzen = ''
        let value = 0
        let sym = ''

        if (known === 'a,b') {
          value = a * a + b * b
          einsetzen = `${pp(a)}^2+${pp(b)}^2=c^2`
          sym = 'c'
        } else if (known === 'a,c') {
          value = c * c - a * a
          einsetzen = `${pp(a)}^2+b^2=${pp(c)}^2`
          sym = 'b'
        } else {
          value = c * c - b * b
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
            <InlineMath math={pythagorasLatexResult(sym, value)} />
          </>
        )
      },
    },
  ],
}
