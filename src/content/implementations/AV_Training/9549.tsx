// exercise9549.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function hasDecimal(x: number) {
  return !Number.isInteger(x)
}

export const exercise9549: Exercise<DATA> = {
  title: 'Schriftliche Multiplikation',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const bothDecimal = rng.randomItemFromArray([true, false])
    const a = rng.randomItemFromArray([
      1.2, 1.5, 2.4, 3.6, 4.8, 12.5, 15.2, 24.6,
    ])
    const b = bothDecimal
      ? rng.randomItemFromArray([1.1, 1.4, 2.5, 3.2, 4.5, 6.8])
      : rng.randomItemFromArray([3, 4, 5, 6, 8, 12, 15])
    const result = round2(a * b)

    return { a, b, result }
  },

  originalData: {
    a: 2.4,
    b: 6,
    result: 14.4,
  },

  constraint({ data }) {
    return data.result > 0 && (hasDecimal(data.a) || hasDecimal(data.b))
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie:</p>
        <InlineMath math={`${pp(data.a)}\\cdot ${pp(data.b)}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Ergebnis zur Kontrolle:</p>
        <InlineMath
          math={`${pp(data.a)}\\cdot ${pp(data.b)}=${pp(data.result)}`}
        />
        <h2>Erklärvideo</h2>
        <p>
          Hier gibt es noch ein Erklärungsvideo zur Multiplikation mit
          Kommazahlen:
        </p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/b2MYpB_ZdRg"
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
