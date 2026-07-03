// exercise9587.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  numerator: number
  denominator: number
}

export const exercise9587: Exercise<DATA> = {
  title: 'Zähler und Nenner',
  source: 'Bruchrechnen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const denominator = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12])
    const numerator = rng.randomIntBetween(1, denominator - 1)
    return { numerator, denominator }
  },

  originalData: {
    numerator: 3,
    denominator: 8,
  },

  constraint({ data }) {
    return data.numerator > 0 && data.denominator > data.numerator
  },

  task({ data }) {
    return (
      <>
        <p>Geben Sie Zähler und Nenner des Bruchs an.</p>
        <InlineMath math={`\\frac{${data.numerator}}{${data.denominator}}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Der Zähler steht oben. Der Nenner steht unten.</p>
        <p>
          Zähler: <b>{data.numerator}</b>
          <br />
          Nenner: <b>{data.denominator}</b>
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/j97CMAKyXMs"
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
