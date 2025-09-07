/* eslint-disable react/jsx-key */
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation } from '@/helper/math-builder'
import { Color4 } from '@/helper/colors'

interface DATA {
  total: number
  red: number
  withReplacement: boolean
  event: 'exactlyOneRed' | 'twoRed' | 'twoBlack'
}

const eventText = {
  exactlyOneRed: 'genau eine rote Kugel',
  twoRed: 'zwei rote Kugeln',
  twoBlack: 'zwei schwarze Kugeln',
}

const eventMath = {
  exactlyOneRed: 'E=\\text{genau eine rote Kugel}',
  twoRed: 'E=\\text{zwei rote Kugeln}',
  twoBlack: 'E=\\text{zwei schwarze Kugeln}',
}

export const exercise4904: Exercise<DATA> = {
  title: 'Baumdiagramm & Pfadregeln (kompakt)',
  source: 'Training',
  useCalculator: false,
  duration: 10,
  points: 5,

  generator(rng) {
    const total = rng.randomIntBetween(10, 16) * 2
    const red = rng.randomIntBetween(6, 9) * 2
    const withReplacement = rng.randomBoolean()
    const event = rng.randomItemFromArray(['exactlyOneRed', 'twoRed', 'twoBlack'] as const)
    return { total, red, withReplacement, event }
  },

  originalData: { total: 32, red: 16, withReplacement: false, event: 'exactlyOneRed' },

  constraint({ data }) {
    return (
      data.red > 0 &&
      data.red < data.total &&
      (data.event !== 'twoRed' || data.red >= 2) &&
      (data.event !== 'twoBlack' || data.total - data.red >= 2)
    )
  },

  task({ data }) {
    return (
      <>
        <p>
          In einer Urne liegen rote (R) und schwarze (S) Kugeln. Es wird zweimal
          nacheinander {data.withReplacement ? 'mit' : 'ohne'} Zurücklegen gezogen.
          Ergänze das Baumdiagramm und bestimme die Wahrscheinlichkeit für das Ereignis{' '}
          <InlineMath math={eventMath[data.event]} />.
        </p>

        <svg viewBox="0 0 328 180">
          <image href="/content/BW_2BFS/302.png" height="180" width="328" />
          {/* P(R) */}
          <foreignObject x={105} y={20} width={24} height={45}>
            <div style={{ fontSize: '16px' }}>
              <InlineMath math={`\\tfrac{${data.red}}{${data.total}}`} />
            </div>
          </foreignObject>
          {/* P(S|S) */}
          <foreignObject x={266} y={97} width={28} height={45}>
            <div style={{ fontSize: '16px' }}>
              <InlineMath
                math={
                  data.withReplacement
                    ? `\\tfrac{${data.total - data.red}}{${data.total}}`
                    : `\\tfrac{${data.total - data.red - 1}}{${data.total - 1}}`
                }
              />
            </div>
          </foreignObject>
        </svg>
      </>
    )
  },

  solution({ data }) {
    // Wahrscheinlichkeiten
    const pR = data.red / data.total
    const pS = (data.total - data.red) / data.total

    // Mit oder ohne Zurücklegen
    let pRgivenR, pSgivenR, pRgivenS, pSgivenS
    if (data.withReplacement) {
      pRgivenR = pR
      pSgivenR = pS
      pRgivenS = pR
      pSgivenS = pS
    } else {
      pRgivenR = (data.red - 1) / (data.total - 1)
      pSgivenR = (data.total - data.red) / (data.total - 1)
      pRgivenS = data.red / (data.total - 1)
      pSgivenS = (data.total - data.red - 1) / (data.total - 1)
    }

    // Zähler und Nenner für die Ereignisse
    let num = 0
    let den = 0
    let eqLatex = ''
    let eqPaths: string[] = []

    if (data.event === 'exactlyOneRed') {
      // (R,S) + (S,R)
      // P(R) * P(S|R) + P(S) * P(R|S)
      const numRS = data.red * (data.total - data.red)
      const numSR = (data.total - data.red) * data.red
      if (data.withReplacement) {
        den = data.total * data.total
      } else {
        den = data.total * (data.total - 1)
      }
      num = numRS + numSR
      eqLatex =
        data.withReplacement
          ? `\\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${data.total - data.red}}{${data.total}} + \\tfrac{${data.total - data.red}}{${data.total}}\\cdot\\tfrac{${data.red}}{${data.total}}`
          : `\\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${data.total - data.red}}{${data.total - 1}} + \\tfrac{${data.total - data.red}}{${data.total}}\\cdot\\tfrac{${data.red}}{${data.total - 1}}`
      eqPaths = [
        data.withReplacement
          ? `P(R,S) = \\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${data.total - data.red}}{${data.total}}`
          : `P(R,S) = \\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${data.total - data.red}}{${data.total - 1}}`,
        data.withReplacement
          ? `P(S,R) = \\tfrac{${data.total - data.red}}{${data.total}}\\cdot\\tfrac{${data.red}}{${data.total}}`
          : `P(S,R) = \\tfrac{${data.total - data.red}}{${data.total}}\\cdot\\tfrac{${data.red}}{${data.total - 1}}`,
      ]
    } else if (data.event === 'twoRed') {
      // (R,R)
      // P(R) * P(R|R)
      if (data.withReplacement) {
        num = data.red * data.red
        den = data.total * data.total
        eqLatex = `\\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${data.red}}{${data.total}}`
      } else {
        num = data.red * (data.red - 1)
        den = data.total * (data.total - 1)
        eqLatex = `\\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${data.red - 1}}{${data.total - 1}}`
      }
      eqPaths = [
        data.withReplacement
          ? `P(R,R) = \\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${data.red}}{${data.total}}`
          : `P(R,R) = \\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${data.red - 1}}{${data.total - 1}}`,
      ]
    } else if (data.event === 'twoBlack') {
      // (S,S)
      // P(S) * P(S|S)
      if (data.withReplacement) {
        num = (data.total - data.red) * (data.total - data.red)
        den = data.total * data.total
        eqLatex = `\\tfrac{${data.total - data.red}}{${data.total}}\\cdot\\tfrac{${data.total - data.red}}{${data.total}}`
      } else {
        num = (data.total - data.red) * (data.total - data.red - 1)
        den = data.total * (data.total - 1)
        eqLatex = `\\tfrac{${data.total - data.red}}{${data.total}}\\cdot\\tfrac{${data.total - data.red - 1}}{${data.total - 1}}`
      }
      eqPaths = [
        data.withReplacement
          ? `P(S,S) = \\tfrac{${data.total - data.red}}{${data.total}}\\cdot\\tfrac{${data.total - data.red}}{${data.total}}`
          : `P(S,S) = \\tfrac{${data.total - data.red}}{${data.total}}\\cdot\\tfrac{${data.total - data.red - 1}}{${data.total - 1}}`,
      ]
    }

    const g = getGcd(num, den)
    const numSimp = Math.round(num / g)
    const denSimp = Math.round(den / g)

    return (
      <>
        <p>
          <b>Baumdiagramm ergänzen</b>
        </p>
        <svg viewBox="0 0 328 180">
          <image href="/content/BW_2BFS/302.png" height="180" width="328" />
          {/* P(R) */}
          <foreignObject x={105} y={20} width={24} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath math={`\\tfrac{${data.red}}{${data.total}}`} />
            </div>
          </foreignObject>
          {/* P(S) */}
          <foreignObject x={230} y={20} width={24} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath
                math={`\\tfrac{${data.total - data.red}}{${data.total}}`}
              />
            </div>
          </foreignObject>
          {/* nach S */}
          <foreignObject x={179} y={97} width={24} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath
                math={
                  data.withReplacement
                    ? `\\tfrac{${data.red}}{${data.total}}`
                    : `\\tfrac{${data.red}}{${data.total - 1}}`
                }
              />
            </div>
          </foreignObject>
          <foreignObject x={266} y={97} width={28} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath
                math={
                  data.withReplacement
                    ? `\\tfrac{${data.total - data.red}}{${data.total}}`
                    : `\\tfrac{${data.total - data.red - 1}}{${data.total - 1}}`
                }
              />
            </div>
          </foreignObject>
          {/* nach R */}
          <foreignObject x={33} y={97} width={24} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath
                math={
                  data.withReplacement
                    ? `\\tfrac{${data.red}}{${data.total}}`
                    : `\\tfrac{${data.red - 1}}{${data.total - 1}}`
                }
              />
            </div>
          </foreignObject>
          <foreignObject x={136} y={97} width={28} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath
                math={
                  data.withReplacement
                    ? `\\tfrac{${data.total - data.red}}{${data.total}}`
                    : `\\tfrac{${data.total - data.red}}{${data.total - 1}}`
                }
              />
            </div>
          </foreignObject>
        </svg>

        <p className="mt-2">
          <b>
            Pfadregeln für E = {eventText[data.event]}
            <br />
            ({data.withReplacement ? 'mit' : 'ohne'} Zurücklegen)
          </b>
        </p>
        {buildEquation([
          [
            <>E</>,
            <>
              <InlineMath math="=" />
            </>,
            <>
              <InlineMath
                math={
                  data.event === 'exactlyOneRed'
                    ? 'P(R,S)+P(S,R)'
                    : data.event === 'twoRed'
                    ? 'P(R,R)'
                    : 'P(S,S)'
                }
              />
            </>,
          ],
          ...eqPaths.map((eq, i) => [
            <></>,
            <Color4>{i === 0 ? '=' : '+'}</Color4>,
            <InlineMath math={eq.replace(/^P\([A-Z,]+\)\s*=\s*/, '')} />,
          ]),
          [
            <></>,
            <Color4>=</Color4>,
            <InlineMath math={`\\tfrac{${numSimp}}{${denSimp}}`} />,
          ],
        ])}
      </>
    )
  },
}
