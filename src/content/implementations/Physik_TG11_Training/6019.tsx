// exercise6019.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type PartBMode = 'springConstant' | 'stretch'

interface DATA {
  d: number
  s: number
  f: number

  partBMode: PartBMode
  bD: number
  bS: number
  bF: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6019: Exercise<DATA> = {
  title: 'Federkraft',
  source: 'Kraft',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const d = rng.randomItemFromArray([100, 150, 200, 250, 300, 400])
    const s = rng.randomItemFromArray([0.02, 0.04, 0.05, 0.08, 0.1])
    const f = round2(d * s)

    const partBMode: PartBMode = rng.randomItemFromArray([
      'springConstant',
      'stretch',
    ])

    const bD = rng.randomItemFromArray([100, 150, 200, 250, 300, 400])
    const bS = rng.randomItemFromArray([0.02, 0.04, 0.05, 0.08, 0.1])
    const bF = round2(bD * bS)

    return {
      d,
      s,
      f,
      partBMode,
      bD,
      bS,
      bF,
    }
  },

  originalData: {
    d: 200,
    s: 0.05,
    f: 10,
    partBMode: 'stretch',
    bD: 250,
    bS: 0.08,
    bF: 20,
  },

  constraint({ data }) {
    return data.d > 0 && data.s > 0 && data.f > 0
  },

  intro() {
    return (
      <>
        <p>Für eine Feder gilt näherungsweise das Hookesche Gesetz.</p>
        <InlineMath math={`F=D\\cdot s`} />
      </>
    )
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Eine Feder hat die Federkonstante{' '}
            <InlineMath
              math={`D=${pp(data.d)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
            />{' '}
            und wird um <InlineMath math={`s=${pp(data.s)}\\,\\mathrm m`} />{' '}
            gedehnt. Berechnen Sie die Federkraft.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Für die Federkraft gilt:</p>
            <InlineMath math={`F=D\\cdot s`} />

            <p>Einsetzen der Werte:</p>
            <InlineMath
              math={`F=${pp(
                data.d,
              )}\\,\\tfrac{\\mathrm N}{\\mathrm m}\\cdot ${pp(
                data.s,
              )}\\,\\mathrm m`}
            />
            <br />
            <InlineMath math={`F=${pp(data.f)}\\,\\mathrm N`} />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        if (data.partBMode === 'springConstant') {
          return (
            <p>
              Eine Feder wird um{' '}
              <InlineMath math={`s=${pp(data.bS)}\\,\\mathrm m`} /> gedehnt.
              Dabei wirkt eine Federkraft von{' '}
              <InlineMath math={`F=${pp(data.bF)}\\,\\mathrm N`} />. Berechnen
              Sie die Federkonstante.
            </p>
          )
        }

        return (
          <p>
            Eine Feder hat die Federkonstante{' '}
            <InlineMath
              math={`D=${pp(data.bD)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
            />
            . Es wirkt eine Federkraft von{' '}
            <InlineMath math={`F=${pp(data.bF)}\\,\\mathrm N`} />. Berechnen Sie
            die Dehnung der Feder.
          </p>
        )
      },
      solution({ data }) {
        if (data.partBMode === 'springConstant') {
          return (
            <>
              <p>Gesucht ist die Federkonstante.</p>
              <InlineMath math={`F=D\\cdot s`} />
              <br />
              <InlineMath math={`D=\\frac{F}{s}`} />

              <p>Einsetzen der Werte:</p>
              <InlineMath
                math={`D=\\frac{${pp(data.bF)}\\,\\mathrm N}{${pp(
                  data.bS,
                )}\\,\\mathrm m}`}
              />
              <br />
              <InlineMath
                math={`D=${pp(data.bD)}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
              />
            </>
          )
        }

        return (
          <>
            <p>Gesucht ist die Dehnung der Feder.</p>
            <InlineMath math={`F=D\\cdot s`} />
            <br />
            <InlineMath math={`s=\\frac{F}{D}`} />

            <p>Einsetzen der Werte:</p>
            <InlineMath
              math={`s=\\frac{${pp(data.bF)}\\,\\mathrm N}{${pp(
                data.bD,
              )}\\,\\tfrac{\\mathrm N}{\\mathrm m}}`}
            />
            <br />
            <InlineMath math={`s=${pp(data.bS)}\\,\\mathrm m`} />
          </>
        )
      },
    },
  ],
}
