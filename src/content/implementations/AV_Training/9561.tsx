// exercise9561.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Given = 'r' | 'd'

interface DATA {
  given: Given
  r: number
  d: number
}

export const exercise9561: Exercise<DATA> = {
  title: 'Radius und Durchmesser',
  source: 'Figuren und Flächen',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const given: Given = rng.randomItemFromArray(['r', 'd'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 7, 8, 10, 12])
    const d = 2 * r
    return { given, r, d }
  },

  originalData: { given: 'd', r: 5, d: 10 },

  constraint({ data }) {
    return data.r > 0 && data.d === 2 * data.r
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie die fehlende Größe.</p>
        <svg viewBox="0 0 328 170">
          <circle
            cx="164"
            cy="85"
            r="55"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />
          {data.given === 'r' ? (
            <>
              <line x1="164" y1="85" x2="219" y2="85" stroke="black" />
              <text x="185" y="75" fontSize="15">
                r = {pp(data.r)} cm
              </text>
            </>
          ) : (
            <>
              <line x1="109" y1="85" x2="219" y2="85" stroke="black" />
              <text x="137" y="75" fontSize="15">
                d = {pp(data.d)} cm
              </text>
            </>
          )}
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        {data.given === 'r' ? (
          <>
            <p>Der Durchmesser ist doppelt so groß wie der Radius.</p>
            <InlineMath
              math={`d=2\\cdot r=2\\cdot ${pp(data.r)}=${pp(data.d)}\\,\\mathrm{cm}`}
            />
          </>
        ) : (
          <>
            <p>Der Radius ist die Hälfte des Durchmessers.</p>
            <InlineMath
              math={`r=\\frac{d}{2}=\\frac{${pp(data.d)}}{2}=${pp(data.r)}\\,\\mathrm{cm}`}
            />
          </>
        )}
      </>
    )
  },
}
