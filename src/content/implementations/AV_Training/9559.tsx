// exercise9559.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'uGesucht' | 'dGesucht'

interface DATA {
  mode: Mode
  d: number
  u: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9559: Exercise<DATA> = {
  title: 'Kreisumfang und Durchmesser',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray(['uGesucht', 'dGesucht'])
    const d = rng.randomItemFromArray([4, 5, 6, 8, 10, 12, 15, 20])
    const u = round2(Math.PI * d)

    return { mode, d, u }
  },

  originalData: {
    mode: 'uGesucht',
    d: 10,
    u: 31.42,
  },

  constraint({ data }) {
    return data.d > 0 && data.u > 0
  },

  task({ data }) {
    return (
      <>
        {data.mode === 'uGesucht' ? (
          <p>
            Ein Kreis hat den Durchmesser {data.d} cm. Berechnen Sie den Umfang.
          </p>
        ) : (
          <p>
            Ein Kreis hat den Umfang {pp(data.u)} cm. Berechnen Sie den
            Durchmesser.
          </p>
        )}
      </>
    )
  },

  solution({ data }) {
    if (data.mode === 'uGesucht') {
      return (
        <>
          <p>Formel:</p>
          <InlineMath math="u=\pi\cdot d" />
          <br />
          <InlineMath
            math={`u=\\pi\\cdot ${data.d}\\approx ${pp(data.u)}\\,\\mathrm{cm}`}
          />
        </>
      )
    }

    return (
      <>
        <p>Formel:</p>
        <InlineMath math="u=\pi\cdot d" />
        <p>Nach dem Durchmesser umstellen:</p>
        <InlineMath math="d=\frac{u}{\pi}" />
        <br />
        <InlineMath
          math={`d=\\frac{${pp(data.u)}}{\\pi}\\approx ${pp(
            data.d,
          )}\\,\\mathrm{cm}`}
        />
      </>
    )
  },
}
