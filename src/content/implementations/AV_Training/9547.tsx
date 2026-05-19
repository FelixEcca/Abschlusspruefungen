// exercise9547.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  a: number
  b: number
  result: number
}

export const exercise9547: Exercise<DATA> = {
  title: 'Schriftliche Subtraktion',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const b = rng.randomIntBetween(80, 4999)
    const result = rng.randomIntBetween(50, 5000)
    const a = b + result

    return { a, b, result }
  },

  originalData: {
    a: 6047,
    b: 2569,
    result: 3478,
  },

  constraint({ data }) {
    return data.a > data.b && data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie schriftlich:</p>
        <InlineMath math={`${data.a}-${data.b}`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        
        
        <p>
          Ergebnis zur Kontrolle:         </p>
        <InlineMath math={`${data.a}-${data.b}=${data.result}`} />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zur schriftlichen Subtraktion:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/FVKBfnkkLS8"
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
