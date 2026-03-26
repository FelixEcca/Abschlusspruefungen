import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unknown =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'parallelLeft'
  | 'parallelRight'

interface DATA {
  topLeft: number
  topRight: number // hinterer Teilabschnitt
  bottomLeft: number
  bottomRight: number // hinterer Teilabschnitt
  parallelLeft: number
  parallelRight: number

  solution: number
  unknown: Unknown
}

export const exercise4914: Exercise<DATA> = {
  title: 'Strahlensatz',
  source: 'Figuren',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const k = rng.randomIntBetween(2, 4)

    const topLeft = rng.randomIntBetween(2, 5)
    const bottomLeft = rng.randomIntBetween(2, 5)
    const parallelLeft = rng.randomIntBetween(2, 5)

    const totalTop = topLeft * k
    const totalBottom = bottomLeft * k
    const totalParallel = parallelLeft * k

    const topRight = totalTop - topLeft
    const bottomRight = totalBottom - bottomLeft
    const parallelRight = totalParallel

    const unknown: Unknown = rng.randomItemFromArray([
      'topRight',
      'bottomLeft',
      'bottomRight',
      'parallelLeft',
      'parallelRight',
    ])

    let solution = 0

    switch (unknown) {
      case 'topRight':
        solution = topRight
        break
      case 'bottomLeft':
        solution = bottomLeft
        break
      case 'bottomRight':
        solution = bottomRight
        break
      case 'parallelLeft':
        solution = parallelLeft
        break
      case 'parallelRight':
        solution = parallelRight
        break
    }

    return {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      parallelLeft,
      parallelRight,
      solution,
      unknown,
    }
  },

  originalData: {
    topLeft: 3,
    topRight: 6,
    bottomLeft: 2,
    bottomRight: 4,
    parallelLeft: 4,
    parallelRight: 12,
    solution: 3,
    unknown: 'topLeft',
  },

  constraint({ data }) {
    return (
      data.topLeft > 0 &&
      data.topRight > 0 &&
      data.bottomLeft > 0 &&
      data.bottomRight > 0 &&
      data.parallelLeft > 0 &&
      data.parallelRight > 0 &&
      data.topLeft !== data.topRight &&
      data.bottomLeft !== data.bottomRight &&
      data.parallelLeft !== data.parallelRight &&
      data.parallelRight != data.topRight &&
      data.parallelRight != data.bottomRight &&
      data.topLeft != data.bottomLeft
    )
  },

  task({ data }) {
    const label = (key: Unknown, value: number) =>
      data.unknown === key ? 'x' : pp(value)

    return (
      <>
        <p>
          Berechnen Sie die Länge der gesuchten Strecke{' '}
          <InlineMath math={'x'} />.
        </p>

        <svg viewBox="0 0 328 120">
          <image href="/content/BW_2BFS/4914.png" height="120" width="328" />
          <text x={145} y={35} fontSize={10} textAnchor="middle" stroke="black">
            {label('topRight', data.topRight)}
          </text>
          <text x={215} y={65} fontSize={10} textAnchor="middle" stroke="black">
            {label('topLeft', data.topLeft)}
          </text>
          <text x={95} y={60} fontSize={10} textAnchor="middle" stroke="black">
            {label('parallelRight', data.parallelRight)}
          </text>
          <text x={150} y={75} fontSize={10} textAnchor="middle" stroke="black">
            {label('parallelLeft', data.parallelLeft)}
          </text>
          <text x={120} y={90} fontSize={10} textAnchor="middle" stroke="black">
            {label('bottomRight', data.bottomRight)}
          </text>
          <text x={200} y={90} fontSize={10} textAnchor="middle" stroke="black">
            {label('bottomLeft', data.bottomLeft)}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    const {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      parallelLeft,
      parallelRight,
      unknown,
      solution,
    } = data

    const totalTop =
      unknown === 'topLeft' ? solution + topRight : topLeft + topRight

    const totalBottom =
      unknown === 'bottomLeft'
        ? solution + bottomRight
        : bottomLeft + bottomRight

    if (unknown === 'topLeft') {
      return (
        <>
          <p>Für die gesamten Strecken gilt oben und unten der Strahlensatz:</p>
          <InlineMath
            math={`\\frac{x + ${pp(topRight)}}{${pp(
              topLeft + topRight,
            )}} = \\frac{${pp(bottomLeft + bottomRight)}}{${pp(
              bottomLeft + bottomRight,
            )}}`}
          />
          <br />
          <InlineMath
            math={`\\frac{x}{${pp(topLeft + topRight)}} = \\frac{${pp(
              bottomLeft,
            )}}{${pp(bottomLeft + bottomRight)}}`}
          />
          <br />
          <InlineMath
            math={`x = ${pp(topLeft + topRight)}\\cdot\\frac{${pp(
              bottomLeft,
            )}}{${pp(bottomLeft + bottomRight)}}`}
          />
          <br />
          <InlineMath math={`x = ${pp(solution)}`} />
        </>
      )
    }

    if (unknown === 'topRight') {
      return (
        <>
          <p>Zuerst wird die gesamte obere Strecke bestimmt.</p>
          <InlineMath
            math={`\\frac{${pp(topLeft)}}{x + ${pp(topLeft)}} = \\frac{${pp(
              bottomLeft,
            )}}{${pp(bottomLeft + bottomRight)}}`}
          />
          <br />
          <InlineMath math={`x + ${pp(topLeft)} = ${pp(topLeft + topRight)}`} />
          <br />
          <InlineMath math={`x = ${pp(solution)}`} />
        </>
      )
    }

    if (unknown === 'bottomLeft') {
      return (
        <>
          <p>Für die gesamten Strecken gilt der Strahlensatz:</p>
          <InlineMath
            math={`\\frac{${pp(topLeft)}}{${pp(topLeft + topRight)}} = \\frac{x}{x + ${pp(
              bottomRight,
            )}}`}
          />
          <br />
          <InlineMath
            math={`\\frac{${pp(topLeft)}}{${pp(
              topLeft + topRight,
            )}} = \\frac{x}{${pp(bottomLeft + bottomRight)}}`}
          />
          <br />
          <InlineMath
            math={`x = ${pp(bottomLeft + bottomRight)}\\cdot\\frac{${pp(
              topLeft,
            )}}{${pp(topLeft + topRight)}}`}
          />
          <br />
          <InlineMath math={`x = ${pp(solution)}`} />
        </>
      )
    }

    if (unknown === 'bottomRight') {
      return (
        <>
          <p>Zuerst wird die gesamte untere Strecke verwendet.</p>
          <InlineMath
            math={`\\frac{${pp(bottomLeft)}}{x + ${pp(
              bottomLeft,
            )}} = \\frac{${pp(topLeft)}}{${pp(topLeft + topRight)}}`}
          />
          <br />
          <InlineMath
            math={`x + ${pp(bottomLeft)} = ${pp(bottomLeft + bottomRight)}`}
          />
          <br />
          <InlineMath math={`x = ${pp(solution)}`} />
        </>
      )
    }

    if (unknown === 'parallelLeft') {
      return (
        <>
          <p>
            Die parallelen Strecken verhalten sich wie die gesamten Strahlen:
          </p>
          <InlineMath
            math={`\\frac{x}{${pp(parallelRight)}} = \\frac{${pp(
              topLeft,
            )}}{${pp(topLeft + topRight)}}`}
          />
          <br />
          <InlineMath
            math={`x = ${pp(parallelRight)}\\cdot\\frac{${pp(
              topLeft,
            )}}{${pp(topLeft + topRight)}}`}
          />
          <br />
          <InlineMath math={`x = ${pp(solution)}`} />
        </>
      )
    }

    return (
      <>
        <p>Die parallelen Strecken verhalten sich wie die gesamten Strahlen:</p>
        <InlineMath
          math={`\\frac{${pp(parallelLeft)}}{x} = \\frac{${pp(
            topLeft,
          )}}{${pp(topLeft + topRight)}}`}
        />
        <br />
        <InlineMath
          math={`x = ${pp(parallelLeft)}\\cdot\\frac{${pp(
            topLeft + topRight,
          )}}{${pp(topLeft)}}`}
        />
        <br />
        <InlineMath math={`x = ${pp(solution)}`} />
      </>
    )
  },
}
