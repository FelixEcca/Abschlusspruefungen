import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type ModeB = 'massFromFG' | 'gFromFG'

interface DATA {
  // Teil a
  mA: number // kg
  gA: number // m/s^2
  fGA: number // N

  // Teil b (außerirdischer Planet)
  modeB: ModeB
  mB: number // kg
  gB: number // m/s^2
  fGB: number // N
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6008: Exercise<DATA> = {
  title: 'Gewichtskraft',
  source: 'Kräfte / Gravitation',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    // Teil a: Masse + Fallbeschleunigung gegeben
    const mA = rng.randomIntBetween(2, 120) // kg
    const gA = round2(rng.randomIntBetween(80, 120) / 10) // 8,0 ... 12,0 m/s^2
    const fGA = round2(mA * gA)

    // Teil b: außerirdischer Planet, entweder m oder g gesucht
    const modeB: ModeB = rng.randomBoolean() ? 'massFromFG' : 'gFromFG'
    const mB = rng.randomIntBetween(5, 120) // kg
    const gB = round2(rng.randomIntBetween(15, 260) / 10) // 1,5 ... 26,0 m/s^2
    const fGB = round2(mB * gB)

    return { mA, gA, fGA, modeB, mB, gB, fGB }
  },

  originalData: {
    mA: 10,
    gA: 9.81,
    fGA: round2(10 * 9.81),
    modeB: 'gFromFG',
    mB: 80,
    gB: 14.2,
    fGB: round2(80 * 14.2),
  },

  constraint({ data }) {
    return (
      data.mA > 0 &&
      data.gA > 0 &&
      data.fGA > 0 &&
      data.mB > 0 &&
      data.gB > 0 &&
      data.fGB > 0
    )
  },

  intro({ data }) {
    return null
  },

  tasks: [
    {
      points: 21,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { mA, gA } = data
        return (
          <>
            <p>
              Die Masse eines Körpers und die Fallbeschleunigung sind gegeben:
            </p>
            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`m = ${pp(mA)}\\,\\mathrm{kg}`} />
              </li>
              <li>
                <InlineMath
                  math={`g = ${pp(gA)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
                />
              </li>
            </ul>
            <p>
              Berechne die Gewichtskraft <InlineMath math={'F_\\mathrm{G}'} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        const { mA, gA, fGA } = data
        return (
          <>
            <InlineMath math={'F_\\mathrm{G} = m\\cdot g'} />
            <br />
            <InlineMath
              math={`F_\\mathrm{G} = ${pp(mA)}\\,\\mathrm{kg}\\cdot ${pp(
                gA,
              )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
            <br />
            <InlineMath
              math={`F_\\mathrm{G} \\approx ${pp(fGA)}\\,\\mathrm N`}
            />
          </>
        )
      },
    },
    {
      points: 21,
      intro({ data }) {
        return null
      },
      task({ data }) {
        const { modeB, mB, gB, fGB } = data

        return (
          <>
            <p>
              Auf einem außerirdischen Planeten wird mit einem Kraftmesser eine
              Gewichtskraft gemessen.
            </p>

            {modeB === 'massFromFG' && (
              <>
                <p>Gegeben sind:</p>
                <ul className="list-disc ml-6">
                  <li>
                    <InlineMath
                      math={`F_\\mathrm{G} = ${pp(fGB)}\\,\\mathrm N`}
                    />
                  </li>
                  <li>
                    <InlineMath
                      math={`g = ${pp(gB)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
                    />
                  </li>
                </ul>
                <p>
                  Bestimme die Masse <InlineMath math={'m'} /> des Körpers.
                </p>
              </>
            )}

            {modeB === 'gFromFG' && (
              <>
                <p>Gegeben sind:</p>
                <ul className="list-disc ml-6">
                  <li>
                    <InlineMath math={`m = ${pp(mB)}\\,\\mathrm{kg}`} />
                  </li>
                  <li>
                    <InlineMath
                      math={`F_\\mathrm{G} = ${pp(fGB)}\\,\\mathrm N`}
                    />
                  </li>
                </ul>
                <p>
                  Bestimme die Fallbeschleunigung <InlineMath math={'g'} /> auf
                  diesem Planeten.
                </p>
              </>
            )}
          </>
        )
      },
      solution({ data }) {
        const { modeB, mB, gB, fGB } = data

        if (modeB === 'massFromFG') {
          const mCalc = round2(fGB / gB)
          return (
            <>
              <InlineMath math={'F_\\mathrm{G} = m\\cdot g'} />
              <br />
              <InlineMath math={'m = \\tfrac{F_\\mathrm{G}}{g}'} />
              <br />
              <InlineMath
                math={`m = \\tfrac{${pp(fGB)}\\,\\mathrm N}{${pp(
                  gB,
                )}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}}`}
              />
              <br />
              <InlineMath math={`m \\approx ${pp(mCalc)}\\,\\mathrm{kg}`} />
            </>
          )
        }

        // modeB === 'gFromFG'
        const gCalc = round2(fGB / mB)
        return (
          <>
            <InlineMath math={'F_\\mathrm{G} = m\\cdot g'} />
            <br />
            <InlineMath math={'g = \\tfrac{F_\\mathrm{G}}{m}'} />
            <br />
            <InlineMath
              math={`g = \\tfrac{${pp(fGB)}\\,\\mathrm N}{${pp(
                mB,
              )}\\,\\mathrm{kg}}`}
            />
            <br />
            <InlineMath
              math={`g \\approx ${pp(gCalc)}\\,\\tfrac{\\mathrm m}{\\mathrm s^2}`}
            />
          </>
        )
      },
    },
  ],
}
