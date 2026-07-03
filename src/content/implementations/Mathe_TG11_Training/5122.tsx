// exercise5122.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface SimpleEquation {
  base: number
  exponent: number
  value: number
}

type ExponentialEquationType =
  | 'factorPower'
  | 'shiftedValue'
  | 'shiftedExponent'
  | 'scaledExponent'

interface LogEquation {
  type: ExponentialEquationType
  base: number
  factor: number
  result: number
  powerValue: number
  solution: number
  valueShift?: number
  exponentShift?: number
  exponentFactor?: number
}

interface DATA {
  simpleEquations: SimpleEquation[]
  equation: LogEquation
}

function pow(base: number, exponent: number) {
  return Math.pow(base, exponent)
}

function round4(x: number) {
  return Math.round(x * 10000) / 10000
}

function exponentialEquationMath(eq: LogEquation) {
  if (eq.type === 'factorPower') {
    return `${pp(eq.factor)}\\cdot ${pp(eq.base)}^x=${pp(eq.result)}`
  }

  if (eq.type === 'shiftedValue') {
    return `${pp(eq.factor)}\\cdot ${pp(eq.base)}^x${pp(
      eq.valueShift ?? 0,
      'merge_op',
    )}=${pp(eq.result)}`
  }

  if (eq.type === 'shiftedExponent') {
    return `${pp(eq.factor)}\\cdot ${pp(eq.base)}^{x${pp(
      eq.exponentShift ?? 0,
      'merge_op',
    )}}=${pp(eq.result)}`
  }

  return `${pp(eq.factor)}\\cdot ${pp(eq.base)}^{${pp(
    eq.exponentFactor ?? 1,
  )}x}=${pp(eq.result)}`
}

function logQuotientMath(eq: LogEquation) {
  return `\\log_{${pp(eq.base)}}(${pp(eq.powerValue)})`
}

function exponentLogResult(eq: LogEquation) {
  return round4(Math.log(eq.powerValue) / Math.log(eq.base))
}

export const exercise5122: Exercise<DATA> = {
  title: 'Logarithmusgleichungen lösen',
  source: 'Logarithmen',
  useCalculator: true,
  duration: 20,

  generator(rng) {
    const simpleBases = [2, 3, 4, 5, 10]
    const simpleExponents = [1, 2, 3, 4]

    const simpleOptions: SimpleEquation[] = simpleBases.flatMap(base =>
      simpleExponents.map(exponent => ({
        base,
        exponent,
        value: pow(base, exponent),
      })),
    )
    const simpleEquations: SimpleEquation[] = []

    while (simpleEquations.length < 4) {
      const option = rng.randomItemFromArray(simpleOptions)
      const alreadyUsed = simpleEquations.some(
        eq => eq.base === option.base && eq.value === option.value,
      )

      if (!alreadyUsed) {
        simpleEquations.push(option)
      }
    }

    const equationType = rng.randomItemFromArray<ExponentialEquationType>([
      'factorPower',
      'shiftedValue',
      'shiftedExponent',
      'scaledExponent',
    ])
    const base = rng.randomItemFromArray([2, 3, 4, 5, 10])
    const factor = rng.randomItemFromArray([2, 3, 4, 5])
    const powerValue = rng.randomItemFromArray([6, 7, 8, 10, 12, 15, 18, 20])
    const logarithmResult = round4(Math.log(powerValue) / Math.log(base))

    let equation: LogEquation

    if (equationType === 'factorPower') {
      equation = {
        type: 'factorPower',
        base,
        factor,
        powerValue,
        result: factor * powerValue,
        solution: logarithmResult,
      }
    } else if (equationType === 'shiftedValue') {
      const valueShift = rng.randomItemFromArray([-8, -5, -3, 4, 6, 9])

      equation = {
        type: 'shiftedValue',
        base,
        factor,
        powerValue,
        valueShift,
        result: factor * powerValue + valueShift,
        solution: logarithmResult,
      }
    } else if (equationType === 'shiftedExponent') {
      const exponentShift = rng.randomItemFromArray([-3, -2, -1, 1, 2, 3])

      equation = {
        type: 'shiftedExponent',
        base,
        factor,
        powerValue,
        exponentShift,
        result: factor * powerValue,
        solution: round4(logarithmResult - exponentShift),
      }
    } else {
      const exponentFactor = rng.randomItemFromArray([2, 3, 4])

      equation = {
        type: 'scaledExponent',
        base,
        factor,
        powerValue,
        exponentFactor,
        result: factor * powerValue,
        solution: round4(logarithmResult / exponentFactor),
      }
    }

    return {
      simpleEquations,
      equation,
    }
  },

  originalData: {
    simpleEquations: [
      { base: 2, exponent: 3, value: 8 },
      { base: 3, exponent: 2, value: 9 },
      { base: 5, exponent: 3, value: 125 },
      { base: 10, exponent: 4, value: 10000 },
    ],
    equation: {
      type: 'shiftedValue',
      base: 2,
      factor: 3,
      powerValue: 10,
      valueShift: -5,
      result: 25,
      solution: 3.3219,
    },
  },

  constraint({ data }) {
    return (
      data.simpleEquations.every(
        eq => eq.base > 0 && eq.base !== 1 && eq.value > 0,
      ) &&
      data.equation.base > 0 &&
      data.equation.base !== 1 &&
      data.equation.factor > 0 &&
      data.equation.powerValue > 0 &&
      data.equation.result > 0
    )
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 8,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Lösen Sie die Logarithmusgleichungen im Kopf.</p>
            <ul>
              {data.simpleEquations.map((eq, index) => (
                <li key={index}>
                  <InlineMath
                    math={`\\log_{${pp(eq.base)}}(${pp(eq.value)})=x`}
                  />
                </li>
              ))}
            </ul>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.simpleEquations.map((eq, index) => (
              <p key={index}>
                <InlineMath
                  math={`${pp(eq.base)}^{${pp(eq.exponent)}}=${pp(
                    eq.value,
                  )}\\quad\\Rightarrow\\quad x=${pp(eq.exponent)}`}
                />
              </p>
            ))}
          </>
        )
      },
    },
    {
      points: 16,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Lösen Sie die Gleichung.</p>
            <p>
              <InlineMath math={exponentialEquationMath(data.equation)} />
            </p>
          </>
        )
      },
      solution({ data }) {
        const eq = data.equation

        if (eq.type === 'factorPower') {
          return (
            <>
              <p>
                <InlineMath math={exponentialEquationMath(eq)} />
              </p>
              <p>Zuerst durch den Faktor teilen:</p>
              <InlineMath
                math={`${pp(eq.base)}^x=\\frac{${pp(eq.result)}}{${pp(
                  eq.factor,
                )}}=${pp(eq.powerValue)}`}
              />
              <p>Logarithmieren:</p>
              <InlineMath
                math={`x=${logQuotientMath(eq)}\\approx ${pp(eq.solution)}`}
              />
              <p>
                <strong>
                  <InlineMath math={`x\\approx ${pp(eq.solution)}`} />
                </strong>
              </p>
            </>
          )
        }

        if (eq.type === 'shiftedValue') {
          return (
            <>
              <p>
                <InlineMath math={exponentialEquationMath(eq)} />
              </p>
              <p>Zuerst den Summanden auf die andere Seite bringen:</p>
              <InlineMath
                math={`${pp(eq.factor)}\\cdot ${pp(eq.base)}^x=${pp(
                  eq.result,
                )}${pp(-(eq.valueShift ?? 0), 'merge_op')}=${pp(
                  eq.factor * eq.powerValue,
                )}`}
              />
              <p>Dann durch den Faktor teilen:</p>
              <InlineMath
                math={`${pp(eq.base)}^x=\\frac{${pp(
                  eq.factor * eq.powerValue,
                )}}{${pp(eq.factor)}}=${pp(eq.powerValue)}`}
              />
              <p>Logarithmieren:</p>
              <InlineMath
                math={`x=${logQuotientMath(eq)}\\approx ${pp(eq.solution)}`}
              />
              <p>
                <strong>
                  <InlineMath math={`x\\approx ${pp(eq.solution)}`} />
                </strong>
              </p>
            </>
          )
        }

        if (eq.type === 'shiftedExponent') {
          const logResult = exponentLogResult(eq)

          return (
            <>
              <p>
                <InlineMath math={exponentialEquationMath(eq)} />
              </p>
              <p>Zuerst durch den Faktor teilen:</p>
              <InlineMath
                math={`${pp(eq.base)}^{x${pp(
                  eq.exponentShift ?? 0,
                  'merge_op',
                )}}=\\frac{${pp(eq.result)}}{${pp(eq.factor)}}=${pp(
                  eq.powerValue,
                )}`}
              />
              <p>Logarithmieren:</p>
              <InlineMath
                math={`x${pp(
                  eq.exponentShift ?? 0,
                  'merge_op',
                )}=${logQuotientMath(eq)}\\approx ${pp(logResult)}`}
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

        const logResult = exponentLogResult(eq)

        return (
          <>
            <p>
              <InlineMath math={exponentialEquationMath(eq)} />
            </p>
            <p>Zuerst durch den Faktor teilen:</p>
            <InlineMath
              math={`${pp(eq.base)}^{${pp(
                eq.exponentFactor ?? 1,
              )}x}=\\frac{${pp(eq.result)}}{${pp(eq.factor)}}=${pp(
                eq.powerValue,
              )}`}
            />
            <p>Logarithmieren:</p>
            <InlineMath
              math={`${pp(
                eq.exponentFactor ?? 1,
              )}x=${logQuotientMath(eq)}\\approx ${pp(logResult)}`}
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
    },
  ],
}
