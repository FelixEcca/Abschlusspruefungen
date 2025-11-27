import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Target = 'F' | 'D' | 's'
type UnitMode = 'm' | 'cm'

interface DATA {
  D: number // Federkonstante
  s: number // Auslenkung
  F: number // Federkraft
  target: Target
  unitMode: UnitMode
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise7005: Exercise<DATA> = {
  title: 'Federkraft',
  source: 'Mechanik',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unitMode: UnitMode = rng.randomItemFromArray(['m', 'cm'])

    let D: number
    let s: number

    if (unitMode === 'm') {
      // D in N/m, s in m
      D = rng.randomIntBetween(50, 300) // N/m
      const sCm = rng.randomIntBetween(2, 10) * 5 // 10cm..50cm
      s = sCm / 100 // m
    } else {
      // unitMode === 'cm': D in N/cm, s in cm
      D = rng.randomIntBetween(2, 15) // N/cm
      s = rng.randomIntBetween(2, 10) // cm
    }

    const F = round2(D * s) // N in beiden Modi
    const target: Target = rng.randomItemFromArray(['F', 'D', 's'])

    return { D, s, F, target, unitMode }
  },

  originalData: {
    D: 120,
    s: 0.25,
    F: 30,
    target: 'F',
    unitMode: 'm',
  },

  constraint({ data }) {
    return data.D > 0 && data.s > 0 && data.F > 0
  },

  task({ data }) {
    const isM = data.unitMode === 'm'
    const unitD = isM
      ? '\\tfrac{\\mathrm N}{\\mathrm m}'
      : '\\tfrac{\\mathrm N}{\\mathrm{cm}}'
    const unitS = isM ? '\\mathrm m' : '\\mathrm{cm}'
    const unitF = '\\mathrm N'

    const askText =
      data.target === 'F' ? (
        <>
          Bestimme die Federkraft <InlineMath math="F" />.
        </>
      ) : data.target === 'D' ? (
        <>
          Bestimme die Federhärte <InlineMath math="D" />.
        </>
      ) : (
        <>
          Bestimme die Strecke <InlineMath math="s" />, um die die Feder länger
          wird.
        </>
      )

    const DDisplay = data.target === 'D' ? '\\square' : pp(data.D)

    const SDisplay =
      data.target === 's' ? '\\square' : isM ? pp(data.s) : pp(data.s)

    const FDisplay = data.target === 'F' ? '\\square' : pp(data.F)

    return (
      <>
        <p>Eine Feder wird mit einer Masse belastet.</p>
        <p>{askText}</p>
        <p>Gegeben:</p>
        <ul className="list-disc ml-6">
          <li>
            <InlineMath math={`D = ${DDisplay}\\;${unitD}`} />
          </li>
          <li>
            <InlineMath math={`s = ${SDisplay}\\;${unitS}`} />
          </li>
          <li>
            <InlineMath math={`F = ${FDisplay}\\;${unitF}`} />
          </li>
        </ul>
        <p>
          Formel:&nbsp;
          <InlineMath math={`F = D\\cdot s`} />
        </p>
      </>
    )
  },

  solution({ data }) {
    const isM = data.unitMode === 'm'
    const unitD = isM
      ? '\\tfrac{\\mathrm N}{\\mathrm m}'
      : '\\tfrac{\\mathrm N}{\\mathrm{cm}}'
    const unitS = isM ? '\\mathrm m' : '\\mathrm{cm}'
    const unitF = '\\mathrm N'

    if (data.target === 'F') {
      const F = round2(data.D * data.s)
      return (
        <>
          <p>
            Setze die bekannten Werte ein und berechne <InlineMath math="F" />.
          </p>
          <InlineMath math={`F = D\\cdot s`} />
          <br />
          <InlineMath
            math={`F = ${pp(data.D)}\\,${unitD}\\cdot ${pp(data.s)}\\,${unitS}`}
          />
          <br />
          <InlineMath math={`F = ${pp(F)}\\,${unitF}`} />
          <p>
            Es wirkt eine Federkraft von{' '}
            <InlineMath math={`F = ${pp(F)}\\,${unitF}`} />.
          </p>
        </>
      )
    }

    if (data.target === 'D') {
      const D = round2(data.F / data.s)
      return (
        <>
          <p>
            Setze die bekannten Werte ein und forme nach <InlineMath math="D" />{' '}
            um.
          </p>
          <InlineMath math={`F = D\\cdot s`} />
          <br />
          <InlineMath
            math={`${pp(data.F)}\\,${unitF} = D\\cdot {${pp(data.s)}\\,${unitS}} \\quad | : {${pp(data.s)}\\,${unitS}}`}
          />

          <br />
          <InlineMath
            math={`D = \\tfrac{${pp(data.F)}\\,${unitF}}{${pp(
              data.s,
            )}\\,${unitS}}`}
          />
          <br />
          <InlineMath math={`D = ${pp(D)}\\,${unitD}`} />
          <p>
            Die Federhärte beträgt{' '}
            <InlineMath math={`D = ${pp(D)}\\,${unitD}`} />.
          </p>
        </>
      )
    }

    // target === 's'
    const s = round2(data.F / data.D)
    return (
      <>
        <p>
          Setze die bekannten Werte ein und forme nach <InlineMath math="s" />{' '}
          um.
        </p>
        <InlineMath math={`F = D\\cdot s`} />
        <br />
        <InlineMath
          math={`${pp(data.F)}\\,${unitF} = {${pp(data.D)}\\,${unitD}}\\cdot s \\quad | : {${pp(data.D)}\\,${unitD}}`}
        />
        <br />

        <InlineMath
          math={`s = \\tfrac{${pp(data.F)}\\,${unitF}}{${pp(
            data.D,
          )}\\,${unitD}}`}
        />
        <br />
        <InlineMath math={`s = ${pp(s)}\\,${unitS}`} />
        <p>
          Die Feder wird um <InlineMath math={`s = ${pp(s)}\\,${unitS}`} />{' '}
          gedehnt.
        </p>
      </>
    )
  },
}
