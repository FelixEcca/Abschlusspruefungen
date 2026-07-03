// exercise9560.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type Mode = 'radius' | 'durchmesser'

interface DATA {
  mode: Mode
  r: number
  d: number
}

export const exercise9560: Exercise<DATA> = {
  title: 'Radius und Durchmesser',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray(['radius', 'durchmesser'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 7, 8, 10, 12])
    const d = 2 * r

    return { mode, r, d }
  },

  originalData: {
    mode: 'radius',
    r: 5,
    d: 10,
  },

  constraint({ data }) {
    return data.r > 0 && data.d === 2 * data.r
  },

  task({ data }) {
    return (
      <>
        {data.mode === 'radius' ? (
          <p>
            Der Durchmesser eines Kreises beträgt {data.d} cm. Berechnen Sie den
            Radius.
          </p>
        ) : (
          <p>
            Der Radius eines Kreises beträgt {data.r} cm. Berechnen Sie den
            Durchmesser.
          </p>
        )}
      </>
    )
  },

  solution({ data }) {
    if (data.mode === 'radius') {
      return (
        <>
          <p>Der Radius ist die Hälfte des Durchmessers.</p>
          <InlineMath math={`r=${data.d}:2=${data.r}\\,\\mathrm{cm}`} />
        </>
      )
    }

    return (
      <>
        <p>Der Durchmesser ist doppelt so groß wie der Radius.</p>
        <InlineMath math={`d=2\\cdot ${data.r}=${data.d}\\,\\mathrm{cm}`} />
      </>
    )
  },
}
