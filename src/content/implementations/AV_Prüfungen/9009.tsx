// exercise9010.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type ModeA =
  | 'addDivAddSubMul'
  | 'mulAddDivSub'
  | 'subDivAddMulSub'
  | 'addMulSubDivAdd'

type ModeB =
  | 'originalLike'
  | 'parenMulSubDiv'
  | 'mulParenAddParenDiv'
  | 'parenTimesParenSub'

interface DATA {
  modeA: ModeA
  a1: number
  b1: number
  c1: number
  d1: number
  e1: number
  f1: number
  resultA: number

  modeB: ModeB
  a2: number
  b2: number
  c2: number
  d2: number
  e2: number
  f2: number
  g2: number
  resultB: number
}

function expressionA(data: DATA) {
  const { modeA, a1, b1, c1, d1, e1, f1 } = data

  if (modeA === 'addDivAddSubMul') {
    return `${pp(a1)}+${pp(b1)}:${pp(c1)}+${pp(d1)}-${pp(e1)}\\cdot ${pp(f1)}`
  }

  if (modeA === 'mulAddDivSub') {
    return `${pp(a1)}\\cdot ${pp(b1)}+${pp(c1)}:${pp(d1)}-${pp(e1)}+${pp(f1)}`
  }

  if (modeA === 'subDivAddMulSub') {
    return `${pp(a1)}-${pp(b1)}:${pp(c1)}+${pp(d1)}\\cdot ${pp(e1)}-${pp(f1)}`
  }

  return `${pp(a1)}+${pp(b1)}\\cdot ${pp(c1)}-${pp(d1)}:${pp(e1)}+${pp(f1)}`
}

function expressionB(data: DATA) {
  const { modeB, a2, b2, c2, d2, e2, f2, g2 } = data

  if (modeB === 'originalLike') {
    return `${pp(a2)}+(${pp(b2)}+${pp(c2)})\\cdot ${pp(d2)}-(${pp(e2)}:${pp(
      f2,
    )})\\cdot ${pp(g2)}`
  }

  if (modeB === 'parenMulSubDiv') {
    return `(${pp(a2)}+${pp(b2)})\\cdot ${pp(c2)}-${pp(d2)}:${pp(e2)}+${pp(f2)}`
  }

  if (modeB === 'mulParenAddParenDiv') {
    return `${pp(a2)}\\cdot (${pp(b2)}+${pp(c2)})+(${pp(d2)}-${pp(e2)}):${pp(
      f2,
    )}`
  }

  return `(${pp(a2)}-${pp(b2)})\\cdot (${pp(c2)}+${pp(d2)})-${pp(e2)}:${pp(f2)}`
}

export const exercise9009: Exercise<DATA> = {
  title: 'Teil 1: Terme berechnen',
  source: '2025',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const modeA: ModeA = rng.randomItemFromArray([
      'addDivAddSubMul',
      'mulAddDivSub',
      'subDivAddMulSub',
      'addMulSubDivAdd',
    ])

    let a1 = rng.randomIntBetween(8, 35)
    let b1 = rng.randomIntBetween(8, 48)
    let c1 = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    let d1 = rng.randomIntBetween(2, 15)
    let e1 = rng.randomIntBetween(2, 10)
    let f1 = rng.randomIntBetween(2, 10)

    if (modeA === 'addDivAddSubMul') {
      c1 = rng.randomItemFromArray([2, 4, 5, 8])
      b1 = c1 * rng.randomIntBetween(3, 12)
    }

    if (modeA === 'mulAddDivSub') {
      d1 = rng.randomItemFromArray([2, 3, 4, 5, 6])
      c1 = d1 * rng.randomIntBetween(2, 10)
    }

    if (modeA === 'subDivAddMulSub') {
      c1 = rng.randomItemFromArray([2, 3, 4, 6])
      b1 = c1 * rng.randomIntBetween(2, 9)
    }

    if (modeA === 'addMulSubDivAdd') {
      e1 = rng.randomItemFromArray([2, 3, 4, 5, 6])
      d1 = e1 * rng.randomIntBetween(2, 10)
    }

    let resultA = 0
    if (modeA === 'addDivAddSubMul') {
      resultA = a1 + b1 / c1 + d1 - e1 * f1
    }
    if (modeA === 'mulAddDivSub') {
      resultA = a1 * b1 + c1 / d1 - e1 + f1
    }
    if (modeA === 'subDivAddMulSub') {
      resultA = a1 - b1 / c1 + d1 * e1 - f1
    }
    if (modeA === 'addMulSubDivAdd') {
      resultA = a1 + b1 * c1 - d1 / e1 + f1
    }

    const modeB: ModeB = rng.randomItemFromArray([
      'originalLike',
      'parenMulSubDiv',
      'mulParenAddParenDiv',
      'parenTimesParenSub',
    ])

    let a2 = rng.randomIntBetween(2, 20)
    let b2 = rng.randomIntBetween(2, 15)
    let c2 = rng.randomIntBetween(2, 15)
    let d2 = rng.randomIntBetween(2, 8)
    let e2 = rng.randomIntBetween(12, 30)
    let f2 = rng.randomItemFromArray([2, 3, 4, 5, 6, 9])
    let g2 = rng.randomIntBetween(2, 8)

    if (modeB === 'originalLike') {
      f2 = rng.randomItemFromArray([2, 3, 4, 5, 6, 9])
      e2 = f2 * rng.randomIntBetween(3, 10)
    }

    if (modeB === 'parenMulSubDiv') {
      e2 = rng.randomItemFromArray([2, 3, 4, 5, 6])
      d2 = e2 * rng.randomIntBetween(3, 10)
    }

    if (modeB === 'mulParenAddParenDiv') {
      f2 = rng.randomItemFromArray([2, 3, 4, 5, 6])
      const q = rng.randomIntBetween(2, 8)
      e2 = rng.randomIntBetween(2, 12)
      d2 = e2 + q * f2
    }

    if (modeB === 'parenTimesParenSub') {
      a2 = rng.randomIntBetween(10, 30)
      b2 = rng.randomIntBetween(2, a2 - 1)
      f2 = rng.randomItemFromArray([2, 3, 4, 5])
      e2 = f2 * rng.randomIntBetween(2, 10)
    }

    let resultB = 0
    if (modeB === 'originalLike') {
      resultB = a2 + (b2 + c2) * d2 - (e2 / f2) * g2
    }
    if (modeB === 'parenMulSubDiv') {
      resultB = (a2 + b2) * c2 - d2 / e2 + f2
    }
    if (modeB === 'mulParenAddParenDiv') {
      resultB = a2 * (b2 + c2) + (d2 - e2) / f2
    }
    if (modeB === 'parenTimesParenSub') {
      resultB = (a2 - b2) * (c2 + d2) - e2 / f2
    }

    return {
      modeA,
      a1,
      b1,
      c1,
      d1,
      e1,
      f1,
      resultA,

      modeB,
      a2,
      b2,
      c2,
      d2,
      e2,
      f2,
      g2,
      resultB,
    }
  },

  originalData: {
    modeA: 'addDivAddSubMul',
    a1: 16,
    b1: 32,
    c1: 4,
    d1: 9,
    e1: 7,
    f1: 2,
    resultA: 19,

    modeB: 'originalLike',
    a2: 2,
    b2: 4,
    c2: 12,
    d2: 3,
    e2: 36,
    f2: 9,
    g2: 5,
    resultB: 30,
  },

  constraint({ data }) {
    return Number.isInteger(data.resultA) && Number.isInteger(data.resultB)
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie das Ergebnis.</p>
            <p>
              <InlineMath math={expressionA(data)} />
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.modeA === 'addDivAddSubMul' && (
              <>
                <InlineMath math={expressionA(data)} />
                <br />
                <InlineMath
                  math={`${pp(data.a1)}+${pp(data.b1 / data.c1)}+${pp(
                    data.d1,
                  )}-${pp(data.e1 * data.f1)}`}
                />
                <br />
                <InlineMath math={`=${pp(data.resultA)}`} />
              </>
            )}

            {data.modeA === 'mulAddDivSub' && (
              <>
                <InlineMath math={expressionA(data)} />
                <br />
                <InlineMath
                  math={`${pp(data.a1 * data.b1)}+${pp(
                    data.c1 / data.d1,
                  )}-${pp(data.e1)}+${pp(data.f1)}`}
                />
                <br />
                <InlineMath math={`=${pp(data.resultA)}`} />
              </>
            )}

            {data.modeA === 'subDivAddMulSub' && (
              <>
                <InlineMath math={expressionA(data)} />
                <br />
                <InlineMath
                  math={`${pp(data.a1)}-${pp(data.b1 / data.c1)}+${pp(
                    data.d1 * data.e1,
                  )}-${pp(data.f1)}`}
                />
                <br />
                <InlineMath math={`=${pp(data.resultA)}`} />
              </>
            )}

            {data.modeA === 'addMulSubDivAdd' && (
              <>
                <InlineMath math={expressionA(data)} />
                <br />
                <InlineMath
                  math={`${pp(data.a1)}+${pp(data.b1 * data.c1)}-${pp(
                    data.d1 / data.e1,
                  )}+${pp(data.f1)}`}
                />
                <br />
                <InlineMath math={`=${pp(data.resultA)}`} />
              </>
            )}
            <h2>Erklärvideo</h2>
            <p>
              Hier gibt es noch ein Erklärungsvideo zur Punkt-vor-Strich-Regel:
            </p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/zEvWRs6BWos"
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
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie das Ergebnis.</p>
            <p>
              <InlineMath math={expressionB(data)} />
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            {data.modeB === 'originalLike' && (
              <>
                <InlineMath math={expressionB(data)} />
                <br />
                <InlineMath
                  math={`${pp(data.a2)}+${pp(data.b2 + data.c2)}\\cdot ${pp(
                    data.d2,
                  )}-(${pp(data.e2 / data.f2)})\\cdot ${pp(data.g2)}`}
                />
                <br />
                <InlineMath
                  math={`${pp(data.a2)}+${pp((data.b2 + data.c2) * data.d2)}-${pp(
                    (data.e2 / data.f2) * data.g2,
                  )}`}
                />
                <br />
                <InlineMath math={`=${pp(data.resultB)}`} />
              </>
            )}

            {data.modeB === 'parenMulSubDiv' && (
              <>
                <InlineMath math={expressionB(data)} />
                <br />
                <InlineMath
                  math={`${pp(data.a2 + data.b2)}\\cdot ${pp(data.c2)}-${pp(
                    data.d2 / data.e2,
                  )}+${pp(data.f2)}`}
                />
                <br />
                <InlineMath
                  math={`${pp((data.a2 + data.b2) * data.c2)}-${pp(
                    data.d2 / data.e2,
                  )}+${pp(data.f2)}`}
                />
                <br />
                <InlineMath math={`=${pp(data.resultB)}`} />
              </>
            )}

            {data.modeB === 'mulParenAddParenDiv' && (
              <>
                <InlineMath math={expressionB(data)} />
                <br />
                <InlineMath
                  math={`${pp(data.a2)}\\cdot ${pp(data.b2 + data.c2)}+${pp(
                    data.d2 - data.e2,
                  )}:${pp(data.f2)}`}
                />
                <br />
                <InlineMath
                  math={`${pp(data.a2 * (data.b2 + data.c2))}+${pp(
                    (data.d2 - data.e2) / data.f2,
                  )}`}
                />
                <br />
                <InlineMath math={`=${pp(data.resultB)}`} />
              </>
            )}

            {data.modeB === 'parenTimesParenSub' && (
              <>
                <InlineMath math={expressionB(data)} />
                <br />
                <InlineMath
                  math={`${pp(data.a2 - data.b2)}\\cdot ${pp(
                    data.c2 + data.d2,
                  )}-${pp(data.e2 / data.f2)}`}
                />
                <br />
                <InlineMath
                  math={`${pp((data.a2 - data.b2) * (data.c2 + data.d2))}-${pp(
                    data.e2 / data.f2,
                  )}`}
                />
                <br />
                <InlineMath math={`=${pp(data.resultB)}`} />
              </>
            )}
            <h2>Erklärvideo</h2>
            <p>
              Hier gibt es noch ein Erklärungsvideo zum Rechnen mit Klammern:
            </p>
            <div className="my-4">
              <iframe
                width="100%"
                height="220"
                src="https://www.youtube.com/embed/99szI22KyYE"
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
