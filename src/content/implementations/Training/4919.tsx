// exercise4919.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  mode: 'hypotenuse' | 'cathetus'
  a: number
  b: number
  c: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise4919: Exercise<DATA> = {
  title: 'Pythagoras',
  source: 'Trigonometrie',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
    ]
    const [x, y, z] = rng.randomItemFromArray(triples)
    const mode = rng.randomBoolean() ? 'hypotenuse' : 'cathetus'
    return {
      mode,
      a: x,
      b: y,
      c: z,
    }
  },
  originalData: {
    mode: 'hypotenuse',
    a: 6,
    b: 8,
    c: 10,
  },
  constraint() {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die fehlende Seite mit dem Satz des Pythagoras.</p>

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
            {data.mode === 'cathetus' ? '?' : data.a}
          </text>
          <text x="130" y="150" fontSize="16">
            {data.b}
          </text>
          <text x="145" y="90" fontSize="16">
            {data.mode === 'hypotenuse' ? '?' : data.c}
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    if (data.mode === 'hypotenuse') {
      return (
        <>
          <InlineMath math={`c^2 = a^2 + b^2`} />
          <br />
          <InlineMath math={`c^2 = ${data.a}^2 + ${data.b}^2`} />
          <br />
          <InlineMath math={`c^2 = ${data.a * data.a + data.b * data.b}`} />
          <br />
          <InlineMath math={`c = ${pp(round2(data.c))}`} />
        </>
      )
    }

    return (
      <>
        <InlineMath math={`a^2 = c^2 - b^2`} />
        <br />
        <InlineMath math={`a^2 = ${data.c}^2 - ${data.b}^2`} />
        <br />
        <InlineMath math={`a^2 = ${data.c * data.c - data.b * data.b}`} />
        <br />
        <InlineMath math={`a = ${pp(round2(data.a))}`} />
      </>
    )
  },
}
