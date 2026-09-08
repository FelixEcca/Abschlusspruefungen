import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'force' | 'stretch'

interface DATA {
  mode: Mode
  d: number
  s: number
  f: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6042: Exercise<DATA> = {
  title: 'Feder aus Messdaten auswerten',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomBoolean() ? 'force' : 'stretch'
    const d = rng.randomItemFromArray([50, 80, 100, 150, 200, 250, 300])
    const s = rng.randomItemFromArray([0.02, 0.04, 0.05, 0.08, 0.1, 0.12])
    const f = round2(d * s)
    return { mode, d, s, f }
  },

  originalData: {
    mode: 'force',
    d: 200,
    s: 0.05,
    f: 10,
  },

  constraint({ data }) {
    return data.d > 0 && data.s > 0 && data.f > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Bei einer Feder wurde die Federkonstante{' '}
          <InlineMath math={`D=${pp(data.d)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`} /> bestimmt.
        </p>
        {data.mode === 'force' ? (
          <p>
            Die Feder wird um <InlineMath math={`s=${pp(data.s)}\\,\\mathrm m`} /> gedehnt.
            Berechne die Federkraft.
          </p>
        ) : (
          <p>
            Es wirkt eine Federkraft von <InlineMath math={`F=${pp(data.f)}\\,\\mathrm N`} />.
            Berechne die Dehnung der Feder.
          </p>
        )}
      </>
    )
  },

  solution({ data }) {
    if (data.mode === 'force') {
      return (
        <>
          <InlineMath math={`F=D\\cdot s`} />
          <br />
          <InlineMath
            math={`F=${pp(data.d)}\\,\\tfrac{\\mathrm N}{\\mathrm m}\\cdot${pp(
              data.s,
            )}\\,\\mathrm m=${pp(data.f)}\\,\\mathrm N`}
          />
        </>
      )
    }

    return (
      <>
        <InlineMath math={`F=D\\cdot s`} />
        <br />
        <InlineMath
          math={`s=\\tfrac{F}{D}=\\tfrac{${pp(data.f)}\\,\\mathrm N}{${pp(
            data.d,
          )}\\,\\tfrac{\\mathrm N}{\\mathrm m}}=${pp(data.s)}\\,\\mathrm m`}
        />
      </>
    )
  },
}
