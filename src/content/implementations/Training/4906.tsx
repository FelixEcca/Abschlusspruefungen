import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type VarName = 'a' | 'b' | 'x'
type ModeA = 'plus' | 'minus' | 'linear' | 'quadratic'
type ModeB = 'timesBracket' | 'timesBracketMinus' | 'doubleBracket'

interface DATA {
  varName: VarName
  value: number

  modeA: ModeA
  t1: number
  t2: number
  t3: number
  resultA: number

  modeB: ModeB
  k1: number
  k2: number
  k3: number
  resultB: number
}

export const exercise4906: Exercise<DATA> = {
  title: 'Termwerte berechnen',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const varName: VarName = rng.randomItemFromArray(['a', 'b', 'x'])
    let value = rng.randomIntBetween(-5, 5)
    while (value === 0) value = rng.randomIntBetween(-5, 5)

    const modeA: ModeA = rng.randomItemFromArray([
      'plus',
      'minus',
      'linear',
      'quadratic',
    ])

    const t1 = rng.randomIntBetween(2, 12)
    const t2 = rng.randomIntBetween(2, 8)
    const t3 = rng.randomIntBetween(2, 6)

    let resultA = 0
    if (modeA === 'plus') resultA = value + t1
    if (modeA === 'minus') resultA = t1 - value
    if (modeA === 'linear') resultA = t2 * value + t1
    if (modeA === 'quadratic') resultA = t3 * value * value - t1

    const modeB: ModeB = rng.randomItemFromArray([
      'timesBracket',
      'timesBracketMinus',
      'doubleBracket',
    ])

    const k1 = rng.randomIntBetween(2, 6)
    const k2 = rng.randomIntBetween(2, 6)
    const k3 = rng.randomIntBetween(2, 5)

    let resultB = 0
    if (modeB === 'timesBracket') resultB = k1 * (value + k2)
    if (modeB === 'timesBracketMinus') resultB = k1 * (k2 - value)
    if (modeB === 'doubleBracket') resultB = (value + k1) * (value - k3)

    return {
      varName,
      value,
      modeA,
      t1,
      t2,
      t3,
      resultA,
      modeB,
      k1,
      k2,
      k3,
      resultB,
    }
  },

  originalData: {
    varName: 'a',
    value: -2,
    modeA: 'quadratic',
    t1: 7,
    t2: 4,
    t3: 4,
    resultA: 4 * -2 * -2 - 7,
    modeB: 'timesBracket',
    k1: 2,
    k2: 3,
    k3: 1,
    resultB: 2 * (-2 + 3),
  },

  constraint({ data }) {
    return data.value !== 0
  },

  intro({ data }) {
    return <></>
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const v = data.varName

        return (
          <>
            <p>
              Berechnen Sie den Wert des Terms für{' '}
              <InlineMath math={`${data.varName} = ${pp(data.value)}`} />:
            </p>
            {data.modeA === 'plus' && (
              <InlineMath math={`${v} + ${pp(data.t1)}`} />
            )}
            {data.modeA === 'minus' && (
              <InlineMath math={`${pp(data.t1)} - ${v}`} />
            )}
            {data.modeA === 'linear' && (
              <InlineMath
                math={`${pp(data.t2)}${v} + ${pp(data.t1, 'embrace_neg')}`}
              />
            )}
            {data.modeA === 'quadratic' && (
              <InlineMath
                math={`${pp(data.t3)}${v}^2 - ${pp(data.t1, 'embrace_neg')}`}
              />
            )}
          </>
        )
      },
      solution({ data }) {
        const v = data.varName
        const val = data.value

        return (
          <>
            {data.modeA === 'plus' && (
              <>
                <InlineMath
                  math={`${v} + ${pp(data.t1, 'embrace_neg')} = ${pp(val)} + ${pp(data.t1, 'embrace_neg')}`}
                />
                <br />
                <InlineMath math={`= ${pp(data.resultA)}`} />
              </>
            )}

            {data.modeA === 'minus' && (
              <>
                <InlineMath
                  math={`${pp(data.t1)} - ${v} = ${pp(data.t1, 'embrace_neg')} - ${pp(val, 'embrace_neg')}`}
                />
                <br />
                <InlineMath math={`= ${pp(data.resultA)}`} />
              </>
            )}

            {data.modeA === 'linear' && (
              <>
                <InlineMath
                  math={`${pp(data.t2)}${v} + ${pp(data.t1, 'embrace_neg')} = ${pp(
                    data.t2,
                  )}\\cdot ${pp(val, 'embrace_neg')} + ${pp(data.t1, 'embrace_neg')}`}
                />
                <br />
                <InlineMath math={`= ${pp(data.resultA)}`} />
              </>
            )}

            {data.modeA === 'quadratic' && (
              <>
                <InlineMath
                  math={`${pp(data.t3)}${v}^2 - ${pp(data.t1, 'embrace_neg')} = ${pp(
                    data.t3,
                  )}\\cdot ${pp(val, 'embrace_neg')}^2 - ${pp(data.t1, 'embrace_neg')}`}
                />
                <br />
                <InlineMath math={`= ${pp(data.resultA)}`} />
              </>
            )}
            <h2>Erklärvideo</h2>
            <p>Hier gibt es noch ein Erklärungsvideo:</p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/Xen1pMKDmLw"
                title="Erklärungsvideo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded border"
              />
            </div>
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const v = data.varName

        return (
          <>
            <p>
              Berechnen Sie den Wert des Terms für{' '}
              <InlineMath math={`${data.varName} = ${pp(data.value)}`} />:
            </p>
            {data.modeB === 'timesBracket' && (
              <InlineMath
                math={`${pp(data.k1)}\\cdot (${v} + ${pp(data.k2)})`}
              />
            )}

            {data.modeB === 'timesBracketMinus' && (
              <InlineMath
                math={`${pp(data.k1)}\\cdot (${pp(data.k2)} - ${v})`}
              />
            )}

            {data.modeB === 'doubleBracket' && (
              <InlineMath
                math={`(${v} + ${pp(data.k1)})\\cdot (${v} - ${pp(data.k3)})`}
              />
            )}
          </>
        )
      },
      solution({ data }) {
        const v = data.varName
        const val = data.value

        return (
          <>
            {data.modeB === 'timesBracket' && (
              <>
                <InlineMath
                  math={`${pp(data.k1)}\\cdot (${v} + ${pp(
                    data.k2,
                    'embrace_neg',
                  )}) = ${pp(data.k1)}\\cdot (${pp(val, 'embrace_neg')} + ${pp(data.k2, 'embrace_neg')})`}
                />
                <br />
                <InlineMath math={`= ${pp(data.resultB)}`} />
              </>
            )}

            {data.modeB === 'timesBracketMinus' && (
              <>
                <InlineMath
                  math={`${pp(data.k1)}\\cdot (${pp(data.k2, 'embrace_neg')} - ${v}) = ${pp(
                    data.k1,
                  )}\\cdot (${pp(data.k2, 'embrace_neg')} - ${pp(val, 'embrace_neg')})`}
                />
                <br />
                <InlineMath math={`= ${pp(data.resultB)}`} />
              </>
            )}

            {data.modeB === 'doubleBracket' && (
              <>
                <InlineMath
                  math={`(${v} + ${pp(data.k1, 'embrace_neg')})\\cdot (${v} - ${pp(
                    data.k3,
                    'embrace_neg',
                  )}) = (${pp(val)} + ${pp(data.k1, 'embrace_neg')})\\cdot (${pp(val, 'embrace_neg')} - ${pp(
                    data.k3,
                    'embrace_neg',
                  )})`}
                />
                <br />
                <InlineMath math={`= ${pp(data.resultB)}`} />
              </>
            )}
            <h2>Erklärvideo</h2>
            <p>Hier gibt es noch ein Erklärungsvideo:</p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/Xen1pMKDmLw"
                title="Erklärungsvideo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded border"
              />
            </div>
          </>
        )
      },
    },
  ],
}
