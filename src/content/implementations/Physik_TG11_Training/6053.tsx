import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  stretch1: number
  stretch2: number
  stretch3: number
  force1: number
  force2: number
  force3: number
  constant1: number
  constant2: number
  constant3: number
  meanConstant: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise6053: Exercise<DATA> = {
  title: 'Federkonstante aus Messwerten bestimmen',
  source: 'Kräfte',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const base = rng.randomItemFromArray([80, 100, 120, 150, 180, 200])
    const stretch1 = rng.randomItemFromArray([0.02, 0.03, 0.04])
    const stretch2 = round2(stretch1 * 2)
    const stretch3 = round2(stretch1 * 3)
    const constant1 = base
    const constant2 = base
    const constant3 = base + rng.randomItemFromArray([-10, 10])
    const force1 = round2(constant1 * stretch1)
    const force2 = round2(constant2 * stretch2)
    const force3 = round2(constant3 * stretch3)
    const meanConstant = round2((constant1 + constant2 + constant3) / 3)

    return {
      stretch1,
      stretch2,
      stretch3,
      force1,
      force2,
      force3,
      constant1,
      constant2,
      constant3,
      meanConstant,
    }
  },

  originalData: {
    stretch1: 0.03,
    stretch2: 0.06,
    stretch3: 0.09,
    force1: 3,
    force2: 6,
    force3: 9.9,
    constant1: 100,
    constant2: 100,
    constant3: 110,
    meanConstant: 103.33,
  },

  constraint({ data }) {
    return (
      data.stretch1 > 0 &&
      data.stretch2 > data.stretch1 &&
      data.stretch3 > data.stretch2
    )
  },

  task({ data }) {
    return (
      <>
        <p>Bei einer Feder werden drei Messwerte aufgenommen:</p>
        <ul className="list-disc ml-6">
          <li>
            <InlineMath math={`s_1=${pp(data.stretch1)}\\,\\mathrm m`} />,{' '}
            <InlineMath math={`F_1=${pp(data.force1)}\\,\\mathrm N`} />
          </li>
          <li>
            <InlineMath math={`s_2=${pp(data.stretch2)}\\,\\mathrm m`} />,{' '}
            <InlineMath math={`F_2=${pp(data.force2)}\\,\\mathrm N`} />
          </li>
          <li>
            <InlineMath math={`s_3=${pp(data.stretch3)}\\,\\mathrm m`} />,{' '}
            <InlineMath math={`F_3=${pp(data.force3)}\\,\\mathrm N`} />
          </li>
        </ul>
        <p>
          Bestimme für jeden Messwert die Federkonstante{' '}
          <InlineMath math="D" />. Berechne anschließend einen sinnvollen
          Mittelwert und bewerte kurz, ob die Messwerte gut zum Hookeschen
          Gesetz passen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`D_1=\\tfrac{F_1}{s_1}=\\tfrac{${pp(
            data.force1,
          )}\\,\\mathrm N}{${pp(data.stretch1)}\\,\\mathrm m}=${pp(
            data.constant1,
          )}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
        />
        <br />
        <InlineMath
          math={`D_2=\\tfrac{F_2}{s_2}=\\tfrac{${pp(
            data.force2,
          )}\\,\\mathrm N}{${pp(data.stretch2)}\\,\\mathrm m}=${pp(
            data.constant2,
          )}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
        />
        <br />
        <InlineMath
          math={`D_3=\\tfrac{F_3}{s_3}=\\tfrac{${pp(
            data.force3,
          )}\\,\\mathrm N}{${pp(data.stretch3)}\\,\\mathrm m}=${pp(
            data.constant3,
          )}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
        />
        <br />
        <InlineMath
          math={`\\bar D=\\tfrac{${pp(data.constant1)}+${pp(
            data.constant2,
          )}+${pp(data.constant3)}}{3}\\approx${pp(
            data.meanConstant,
          )}\\,\\tfrac{\\mathrm N}{\\mathrm m}`}
        />
        <p>
          Die Werte passen näherungsweise zum Hookeschen Gesetz. Der dritte
          Messwert weicht etwas ab; das ist bei Messwerten realistisch.
        </p>
      </>
    )
  },
}
