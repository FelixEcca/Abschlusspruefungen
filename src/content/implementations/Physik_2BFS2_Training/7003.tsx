import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'F' | 'm'

interface DATA {
  g: number // m/s^2
  m: number // kg
  F: number // N
  target: Target
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise7003: Exercise<DATA> = {
  title: 'Gewichtskraft',
  source: 'Mechanik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const g = 9.81
    const m = rng.randomIntBetween(2, 80) // kg
    const F = round2(m * g)
    const target = rng.randomItemFromArray(['F', 'm'] as const) as Target
    return { g, m, F, target }
  },

  originalData: {
    g: 9.81,
    m: 12,
    F: 117.72,
    target: 'F',
  },

  constraint({ data }) {
    return data.g > 0 && data.m > 0
  },

  task({ data }) {
    const unitM = '\\mathrm{kg}'
    const unitG = '\\tfrac{\\mathrm m}{\\mathrm s^{2}}'
    const unitF = '\\mathrm N'

    const ask =
      data.target === 'F' ? (
        <>
          Bestimme die Gewichtskraft <InlineMath math="F" />, die wirkt, wenn
          die Masse <InlineMath math={`m=${pp(data.m)}\\;${unitM}`} /> gegeben
          ist.
        </>
      ) : (
        <>
          Bestimme die Masse <InlineMath math="m" /> des Körpers, wenn die
          Gewichtskraft <InlineMath math={`F=${pp(data.F)}\\;${unitF}`} />{' '}
          gegeben ist.
        </>
      )

    return (
      <>
        <p>
          Ein Körper erfährt auf der Erde die Erdbeschleunigung{' '}
          <InlineMath math={`g=${pp(data.g)}\\;${unitG}`} />.
        </p>
        <p>{ask}</p>

        <p>
          Formel:&nbsp;
          <InlineMath math={`F=m\\cdot g`} />
        </p>
      </>
    )
  },

  solution({ data }) {
    const unitM = '\\mathrm{kg}'
    const unitG = '\\tfrac{\\mathrm m}{\\mathrm s^{2}}'
    const unitF = '\\mathrm N'

    if (data.target === 'F') {
      const val = round2(data.m * data.g)
      return (
        <>
          <p>
            Setze die bekannten Werte ein und berechne <InlineMath math="F" />.
          </p>
          <InlineMath math={`F=m\\cdot g`} />
          <br />
          <InlineMath
            math={`F=${pp(data.m)}\\,${unitM}\\cdot ${pp(data.g)}\\,${unitG}`}
          />
          <br />
          <InlineMath math={`F=${pp(val)}\\,${unitF}`} />
          <p>
            Die Gewichtskraft beträgt{' '}
            <InlineMath math={`F=${pp(val)}\\,${unitF}`} />.
          </p>
        </>
      )
    } else {
      const val = round2(data.F / data.g)
      return (
        <>
          <p>
            Setze die bekannten Werte ein und forme nach <InlineMath math="m" />{' '}
            um.
          </p>
          <InlineMath math={`F=m\\cdot g`} />
          <br />
          <InlineMath
            math={`{${pp(data.F)}\\,${unitF}}=m\\cdot {${pp(data.g)}\\,${unitG}}\\quad |:{${pp(data.g)}\\,${unitG}}`}
          />
          <br />
          <InlineMath
            math={`m=\\tfrac{${pp(data.F)}\\,${unitF}}{${pp(data.g)}\\,${unitG}}`}
          />
          <br />
          <InlineMath math={`m=${pp(val)}\\,${unitM}`} />
          <p>
            Die Masse des Körpers beträgt{' '}
            <InlineMath math={`m=${pp(val)}\\,${unitM}.`} />
          </p>
        </>
      )
    }
  },
}
