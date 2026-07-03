// exercise5123.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type EquationType =
  | 'factorLeft'
  | 'factorRight'
  | 'shiftLeft'
  | 'shiftRight'
  | 'exponentShift'
  | 'scaledExponentRight'

interface EEquation {
  type: EquationType
  factor: number
  innerValue: number
  result: number
  solution: number
  valueShift?: number
  exponentShift?: number
  exponentFactor?: number
}

interface DATA {
  equation: EEquation
}

function round4(x: number) {
  return Math.round(x * 10000) / 10000
}

function equationMath(eq: EEquation) {
  if (eq.type === 'factorLeft') {
    return `${pp(eq.factor)}\\cdot e^x=${pp(eq.result)}`
  }

  if (eq.type === 'factorRight') {
    return `${pp(eq.result)}=${pp(eq.factor)}\\cdot e^x`
  }

  if (eq.type === 'shiftLeft') {
    return `${pp(eq.factor)}\\cdot e^x${pp(
      eq.valueShift ?? 0,
      'merge_op',
    )}=${pp(eq.result)}`
  }

  if (eq.type === 'shiftRight') {
    return `${pp(eq.result)}=${pp(eq.factor)}\\cdot e^x${pp(
      eq.valueShift ?? 0,
      'merge_op',
    )}`
  }

  if (eq.type === 'exponentShift') {
    return `${pp(eq.factor)}\\cdot e^{x${pp(
      eq.exponentShift ?? 0,
      'merge_op',
    )}}=${pp(eq.result)}`
  }

  return `${pp(eq.result)}=${pp(eq.factor)}\\cdot e^{${pp(
    eq.exponentFactor ?? 1,
  )}x}`
}

function lnMath(eq: EEquation) {
  return `\\ln(${pp(eq.innerValue)})`
}

function buildEquation(
  type: EquationType,
  factor: number,
  innerValue: number,
  valueShift: number,
  exponentShift: number,
  exponentFactor: number,
): EEquation {
  const logarithmResult = round4(Math.log(innerValue))

  if (type === 'factorLeft' || type === 'factorRight') {
    return {
      type,
      factor,
      innerValue,
      result: factor * innerValue,
      solution: logarithmResult,
    }
  }

  if (type === 'shiftLeft' || type === 'shiftRight') {
    return {
      type,
      factor,
      innerValue,
      valueShift,
      result: factor * innerValue + valueShift,
      solution: logarithmResult,
    }
  }

  if (type === 'exponentShift') {
    return {
      type,
      factor,
      innerValue,
      exponentShift,
      result: factor * innerValue,
      solution: round4(logarithmResult - exponentShift),
    }
  }

  return {
    type,
    factor,
    innerValue,
    exponentFactor,
    result: factor * innerValue,
    solution: round4(logarithmResult / exponentFactor),
  }
}

export const exercise5123: Exercise<DATA> = {
  title: 'Gleichungen mit e^x lösen',
  source: 'Logarithmen',
  useCalculator: true,
  duration: 15,

  generator(rng) {
    const type = rng.randomItemFromArray<EquationType>([
      'factorLeft',
      'factorRight',
      'shiftLeft',
      'shiftRight',
      'exponentShift',
      'scaledExponentRight',
    ])
    const factor = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const innerValue = rng.randomItemFromArray([3, 4, 5, 6, 8, 10, 12, 15])
    const valueShift = rng.randomItemFromArray([-9, -6, -4, 5, 7, 10])
    const exponentShift = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])
    const exponentFactor = rng.randomItemFromArray([2, 3, 4])

    return {
      equation: buildEquation(
        type,
        factor,
        innerValue,
        valueShift,
        exponentShift,
        exponentFactor,
      ),
    }
  },

  originalData: {
    equation: {
      type: 'shiftRight',
      factor: 3,
      innerValue: 8,
      valueShift: -5,
      result: 19,
      solution: 2.0794,
    },
  },

  constraint({ data }) {
    return (
      data.equation.factor > 0 &&
      data.equation.innerValue > 0 &&
      data.equation.result > 0
    )
  },

  intro() {
    return null
  },

  task({ data }) {
    return (
      <>
        <p>Lösen Sie die Gleichung.</p>
        <p>
          <InlineMath math={equationMath(data.equation)} />
        </p>
      </>
    )
  },

  solution({ data }) {
    const eq = data.equation

    if (eq.type === 'factorLeft') {
      return (
        <>
          <p>
            <InlineMath math={equationMath(eq)} />
          </p>
          <p>Zuerst durch den Faktor teilen:</p>
          <InlineMath
            math={`e^x=\\frac{${pp(eq.result)}}{${pp(eq.factor)}}=${pp(
              eq.innerValue,
            )}`}
          />
          <p>Mit dem natürlichen Logarithmus lösen:</p>
          <InlineMath math={`x=${lnMath(eq)}\\approx ${pp(eq.solution)}`} />
          <p>
            <strong>
              <InlineMath math={`x\\approx ${pp(eq.solution)}`} />
            </strong>
          </p>
        </>
      )
    }

    if (eq.type === 'factorRight') {
      return (
        <>
          <p>
            <InlineMath math={equationMath(eq)} />
          </p>
          <p>Zuerst durch den Faktor teilen:</p>
          <InlineMath math={`${pp(eq.innerValue)}=e^x`} />
          <p>Die Seiten tauschen und logarithmieren:</p>
          <InlineMath math={`x=${lnMath(eq)}\\approx ${pp(eq.solution)}`} />
          <p>
            <strong>
              <InlineMath math={`x\\approx ${pp(eq.solution)}`} />
            </strong>
          </p>
        </>
      )
    }

    if (eq.type === 'shiftLeft') {
      return (
        <>
          <p>
            <InlineMath math={equationMath(eq)} />
          </p>
          <p>Zuerst den Summanden auf die andere Seite bringen:</p>
          <InlineMath
            math={`${pp(eq.factor)}\\cdot e^x=${pp(eq.result)}${pp(
              -(eq.valueShift ?? 0),
              'merge_op',
            )}=${pp(eq.factor * eq.innerValue)}`}
          />
          <p>Dann durch den Faktor teilen:</p>
          <InlineMath
            math={`e^x=\\frac{${pp(eq.factor * eq.innerValue)}}{${pp(
              eq.factor,
            )}}=${pp(eq.innerValue)}`}
          />
          <p>Logarithmieren:</p>
          <InlineMath math={`x=${lnMath(eq)}\\approx ${pp(eq.solution)}`} />
          <p>
            <strong>
              <InlineMath math={`x\\approx ${pp(eq.solution)}`} />
            </strong>
          </p>
        </>
      )
    }

    if (eq.type === 'shiftRight') {
      return (
        <>
          <p>
            <InlineMath math={equationMath(eq)} />
          </p>
          <p>Zuerst den Summanden auf die andere Seite bringen:</p>
          <InlineMath
            math={`${pp(eq.result)}${pp(
              -(eq.valueShift ?? 0),
              'merge_op',
            )}=${pp(eq.factor * eq.innerValue)}=${pp(eq.factor)}\\cdot e^x`}
          />
          <p>Dann durch den Faktor teilen:</p>
          <InlineMath math={`${pp(eq.innerValue)}=e^x`} />
          <p>Die Seiten tauschen und logarithmieren:</p>
          <InlineMath math={`x=${lnMath(eq)}\\approx ${pp(eq.solution)}`} />
          <p>
            <strong>
              <InlineMath math={`x\\approx ${pp(eq.solution)}`} />
            </strong>
          </p>
        </>
      )
    }

    if (eq.type === 'exponentShift') {
      const logResult = round4(eq.solution + (eq.exponentShift ?? 0))

      return (
        <>
          <p>
            <InlineMath math={equationMath(eq)} />
          </p>
          <p>Zuerst durch den Faktor teilen:</p>
          <InlineMath
            math={`e^{x${pp(
              eq.exponentShift ?? 0,
              'merge_op',
            )}}=\\frac{${pp(eq.result)}}{${pp(eq.factor)}}=${pp(
              eq.innerValue,
            )}`}
          />
          <p>Logarithmieren:</p>
          <InlineMath
            math={`x${pp(
              eq.exponentShift ?? 0,
              'merge_op',
            )}=${lnMath(eq)}\\approx ${pp(logResult)}`}
          />
          <p>Nach x auflösen:</p>
          <InlineMath
            math={`x\\approx ${pp(logResult)}${pp(
              -(eq.exponentShift ?? 0),
              'merge_op',
            )}=${pp(eq.solution)}`}
          />
          <p>
            <strong>
              <InlineMath math={`x\\approx ${pp(eq.solution)}`} />
            </strong>
          </p>
        </>
      )
    }

    const logResult = round4(eq.solution * (eq.exponentFactor ?? 1))

    return (
      <>
        <p>
          <InlineMath math={equationMath(eq)} />
        </p>
        <p>Zuerst durch den Faktor teilen:</p>
        <InlineMath
          math={`${pp(eq.innerValue)}=e^{${pp(eq.exponentFactor ?? 1)}x}`}
        />
        <p>Logarithmieren:</p>
        <InlineMath
          math={`${pp(eq.exponentFactor ?? 1)}x=${lnMath(eq)}\\approx ${pp(
            logResult,
          )}`}
        />
        <p>Nach x auflösen:</p>
        <InlineMath
          math={`x\\approx \\frac{${pp(logResult)}}{${pp(
            eq.exponentFactor ?? 1,
          )}}=${pp(eq.solution)}`}
        />
        <p>
          <strong>
            <InlineMath math={`x\\approx ${pp(eq.solution)}`} />
          </strong>
        </p>
      </>
    )
  },
}
