// exercise9551.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  mulA: number
  mulB: number
  mulResult: number
  divA: number
  divB: number
  divResult: number
}

export const exercise9551: Exercise<DATA> = {
  title: 'Ganze Zahlen multiplizieren und dividieren',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const mulA = rng.randomIntBetween(-12, 12)
    let mulB = rng.randomIntBetween(-12, 12)
    while (mulB === 0) mulB = rng.randomIntBetween(-12, 12)
    const mulResult = mulA * mulB

    const divB = rng.randomItemFromArray([
      -12, -10, -8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 8, 10, 12,
    ])
    const divResult = rng.randomIntBetween(-12, 12)
    const divA = divB * divResult

    return { mulA, mulB, mulResult, divA, divB, divResult }
  },

  originalData: {
    mulA: -4,
    mulB: 6,
    mulResult: -24,
    divA: -24,
    divB: 6,
    divResult: -4,
  },

  constraint({ data }) {
    return data.mulB !== 0 && data.divB !== 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie:</p>
            <InlineMath
              math={`${pp(data.mulA, 'embrace_neg')}\\cdot ${pp(data.mulB, 'embrace_neg')}`}
            />
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Achte zuerst auf die Vorzeichen.</p>
            <p>
              Gleiche Vorzeichen ergeben plus. Verschiedene Vorzeichen ergeben
              minus.
            </p>
            <InlineMath
              math={`${pp(data.mulA, 'embrace_neg')}\\cdot ${pp(data.mulB, 'embrace_neg')}=${pp(data.mulResult, 'embrace_neg')}`}
            />
            <p>
              Ergebnis: <b>{data.mulResult}</b>
            </p>
            <h2>Erklärvideo</h2>
            <p>
              Hier gibt es noch ein Erklärungsvideo zum Rechnen mit ganzen
              Zahlen:
            </p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/yAl7RYR-SHo"
                title="Erklärungsvideo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded border"
              />
            </div>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie:</p>
            <InlineMath
              math={`${pp(data.divA, 'embrace_neg')}:${pp(data.divB, 'embrace_neg')}`}
            />
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Achte zuerst auf die Vorzeichen.</p>
            <p>
              Gleiche Vorzeichen ergeben plus. Verschiedene Vorzeichen ergeben
              minus.
            </p>
            <InlineMath
              math={`${pp(data.divA, 'embrace_neg')}:${pp(data.divB, 'embrace_neg')}=${pp(data.divResult, 'embrace_neg')}`}
            />
            <p>
              Ergebnis: <b>{data.divResult}</b>
            </p>
            <h2>Erklärvideo</h2>
            <p>
              Hier gibt es noch ein Erklärungsvideo zum Rechnen mit ganzen
              Zahlen:
            </p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/yAl7RYR-SHo"
                title="Erklärungsvideo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded border"
              />
            </div>
          </>
        )
      },
    },
  ],
}
