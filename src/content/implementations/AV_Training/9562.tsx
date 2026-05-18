// exercise9562.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Wanted = 'U' | 'r' | 'd'

interface DATA {
  wanted: Wanted
  r: number
  d: number
  u: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9562: Exercise<DATA> = {
  title: 'Kreisumfang berechnen',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const wanted: Wanted = rng.randomItemFromArray(['U', 'r', 'd'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 10, 12])
    const d = 2 * r
    const u = round2(2 * Math.PI * r)
    return { wanted, r, d, u }
  },

  originalData: { wanted: 'U', r: 5, d: 10, u: 31.42 },

  constraint({ data }) {
    return data.r > 0 && data.d === 2 * data.r
  },

  task({ data }) {
    return (
      <>
        {data.wanted === 'U' && (
          <p>
            Ein Kreis hat den Radius {pp(data.r)} cm. Berechnen Sie den Umfang.
          </p>
        )}
        {data.wanted === 'r' && (
          <p>
            Ein Kreis hat den Umfang ungefähr {pp(data.u)} cm. Berechnen Sie den
            Radius.
          </p>
        )}
        {data.wanted === 'd' && (
          <p>
            Ein Kreis hat den Umfang ungefähr {pp(data.u)} cm. Berechnen Sie den
            Durchmesser.
          </p>
        )}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        {data.wanted === 'U' && (
          <>
            <p>Für den Kreisumfang gilt:</p>
            <InlineMath math={`U=2\\cdot \\pi \\cdot r`} />
            <br />
            <InlineMath
              math={`U=2\\cdot \\pi \\cdot ${pp(data.r)}\\approx ${pp(data.u)}\\,\\mathrm{cm}`}
            />
          </>
        )}

        {data.wanted === 'r' && (
          <>
            <p>Die Formel wird nach dem Radius umgestellt:</p>
            <InlineMath math={`U=2\\cdot \\pi \\cdot r`} />
            <br />
            <InlineMath math={`r=\\frac{U}{2\\cdot \\pi}`} />
            <br />
            <InlineMath
              math={`r=\\frac{${pp(data.u)}}{2\\cdot \\pi}\\approx ${pp(data.r)}\\,\\mathrm{cm}`}
            />
          </>
        )}

        {data.wanted === 'd' && (
          <>
            <p>Für den Kreisumfang gilt auch:</p>
            <InlineMath math={`U=\\pi\\cdot d`} />
            <br />
            <InlineMath math={`d=\\frac{U}{\\pi}`} />
            <br />
            <InlineMath
              math={`d=\\frac{${pp(data.u)}}{\\pi}\\approx ${pp(data.d)}\\,\\mathrm{cm}`}
            />
          </>
        )}
      </>
    )
  },
}
