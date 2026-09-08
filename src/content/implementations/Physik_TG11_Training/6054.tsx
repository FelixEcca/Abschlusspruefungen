import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'force' | 'stretch'

interface DATA {
  target: Target
  constant: number
  stretch: number
  force: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6054: Exercise<DATA> = {
  title: 'Federkraft und Dehnung berechnen',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const target: Target = rng.randomBoolean() ? 'force' : 'stretch'
    const constant = rng.randomItemFromArray([50, 80, 100, 150, 200, 250])
    const stretch = rng.randomItemFromArray([0.02, 0.04, 0.05, 0.08, 0.1, 0.12])
    const force = round2(constant * stretch)

    return { target, constant, stretch, force }
  },

  originalData: {
    target: 'force',
    constant: 150,
    stretch: 0.08,
    force: 12,
  },

  constraint({ data }) {
    return data.constant > 0 && data.stretch > 0 && data.force > 0
  },

  task({ data }) {
    if (data.target === 'force') {
      return (
        <p>
          Eine Feder hat die Federkonstante{' '}
          <InlineMath math={`D=${pp(data.constant)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`} />.
          Sie wird um <InlineMath math={`s=${pp(data.stretch)}\\,\\mathrm m`} /> gedehnt.
          Berechne die Federkraft <InlineMath math="F" />.
        </p>
      )
    }

    return (
      <p>
        Eine Feder hat die Federkonstante{' '}
        <InlineMath math={`D=${pp(data.constant)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`} />.
        Es wirkt eine Federkraft von{' '}
        <InlineMath math={`F=${pp(data.force)}\\,\\mathrm N`} />. Berechne die Dehnung{' '}
        <InlineMath math="s" />.
      </p>
    )
  },

  solution({ data }) {
    if (data.target === 'force') {
      return (
        <>
          <InlineMath math={`F=D\\cdot s`} />
          <br />
          <InlineMath
            math={`F=${pp(data.constant)}\\,\\tfrac{\\mathrm N}{\\mathrm m}\\cdot${pp(data.stretch)}\\,\\mathrm m=${pp(data.force)}\\,\\mathrm N`}
          />
        </>
      )
    }

    return (
      <>
        <InlineMath math={`F=D\\cdot s`} />
        <br />
        <InlineMath math={`s=\\tfrac{F}{D}`} />
        <br />
        <InlineMath
          math={`s=\\tfrac{${pp(data.force)}\\,\\mathrm N}{${pp(data.constant)}\\,\\tfrac{\\mathrm N}{\\mathrm m}}=${pp(data.stretch)}\\,\\mathrm m`}
        />
      </>
    )
  },
}
