// exercise9552.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Op = '+' | '-' 

interface DATA {
  a: number
  b: number
  op: Op
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9552: Exercise<DATA> = {
  title: 'Rechnen mit Kommazahlen',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const op = rng.randomItemFromArray(['+', '-'] as const)

   

    const a = rng.randomItemFromArray([1.2, 2.5, 3.75, 4.8, 6.25, 10.5])
    const b = rng.randomItemFromArray([0.5, 1.25, 2.4, 3.5, 4.75])

    let result = 0
    if (op === '+') result = round2(a + b)
    if (op === '-') result = round2(a - b)

    return { a, b, op, result }
  },

  originalData: {
    a: 3.75,
    b: 1.25,
    op: '+',
    result: 5,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        <InlineMath math={`${pp(data.a)}${data.op}${pp(data.b)}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        
        <p>
          Ergebnis zur Kontrolle: 
        </p>
          <InlineMath
            math={`${pp(data.a)}${data.op}${pp(data.b)}=${pp(data.result)}`}
          />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Rechnen mit Kommazahlen:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/pT_6tNzVJZU"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
        
      </>
    )
  },
}
