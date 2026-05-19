// exercise9553.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  divisor: number
  quotient: number
  dividend: number
}

export const exercise9553: Exercise<DATA> = {
  title: 'Schriftliches Dividieren',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const divisor = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 9, 12])
    const quotient = rng.randomIntBetween(12, 250)
    const dividend = divisor * quotient

    return { divisor, quotient, dividend }
  },

  originalData: {
    divisor: 6,
    quotient: 48,
    dividend: 288,
  },

  constraint({ data }) {
    return data.dividend % data.divisor === 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie schriftlich:</p>
        <InlineMath math={`${data.dividend}:${data.divisor}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        
        
       
        
        <p>
          Ergebnis zur Kontrolle: <b>{data.quotient}</b>
        </p>
        <InlineMath
          math={`${data.dividend}:${data.divisor}=${data.quotient}`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum schriftlichen Dividieren:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/2A-9_-GCXrA"
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
