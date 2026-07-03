// exercise9598.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  percent: number
  decimal: number
}

export const exercise9598: Exercise<DATA> = {
  title: 'Prozent in Dezimalzahl',
  source: 'Prozentrechnung',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const percent = rng.randomItemFromArray([
      1, 2, 5, 10, 12.5, 20, 25, 40, 50, 75, 80, 125, 150,
    ])
    const decimal = percent / 100

    return { percent, decimal }
  },

  originalData: {
    percent: 25,
    decimal: 0.25,
  },

  constraint({ data }) {
    return data.percent > 0
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in eine Dezimalzahl um.</p>
        <InlineMath math={`${pp(data.percent)}\\%`} />
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Prozent bedeutet „von 100“.</p>
        <InlineMath
          math={`${pp(data.percent)}\\%=\\frac{${pp(
            data.percent,
          )}}{100}=${pp(data.decimal)}`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/FbSG_MwL760"
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
