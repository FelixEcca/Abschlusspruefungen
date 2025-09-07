/* eslint-disable react/jsx-key */
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation } from '@/helper/math-builder'
import { Color4 } from '@/helper/colors'

interface DATA {
  total: number
  red: number
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
    return { total, red }
  },

  originalData: { total: 32, red: 16 },

  constraint({ data }) {
    return data.red > 0 && data.red < data.total
  },

  task({ data }) {
    return (
      <>
        <p>
          In einer Urne liegen rote (R) und schwarze (S) Kugeln. Es wird zweimal
          nacheinander <b>ohne Zurücklegen</b> gezogen. Ergänze das Baumdiagramm
          und bestimme die Wahrscheinlichkeit für das Ereignis{' '}
          <InlineMath math="E=\{\\text{genau eine rote Kugel}\}" />.
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
                math={`\\tfrac{${data.total - data.red - 1}}{${data.total - 1}}`}
              />
            </div>
          </foreignObject>
        </svg>
      </>
    )
  },

  solution({ data }) {
    // Ergänzungen
    const pS = (data.total - data.red) / data.total
    const pRgivenR = (data.red - 1) / (data.total - 1)
    const pSgivenR = (data.total - data.red) / (data.total - 1)
    const pRgivenS = data.red / (data.total - 1)

    // E = (R,S) ∪ (S,R)
    const numRS_un = data.red * (data.total - data.red)
    const denRS_un = data.total * (data.total - 1)
    const numSR_un = (data.total - data.red) * data.red
    const denSR_un = data.total * (data.total - 1)

    const num_un = numRS_un + numSR_un
    const den_un = denRS_un // gleich
    const g = getGcd(num_un, den_un)
    const num = Math.round(num_un / g)
    const den = Math.round(den_un / g)

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
              <InlineMath math={`\\tfrac{${data.red}}{${data.total - 1}}`} />
            </div>
          </foreignObject>
          <foreignObject x={266} y={97} width={28} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath
                math={`\\tfrac{${data.total - data.red - 1}}{${data.total - 1}}`}
              />
            </div>
          </foreignObject>
          {/* nach R */}
          <foreignObject x={33} y={97} width={24} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath
                math={`\\tfrac{${data.red - 1}}{${data.total - 1}}`}
              />
            </div>
          </foreignObject>
          <foreignObject x={136} y={97} width={28} height={45}>
            <div style={{ fontSize: '16px', color: 'green' }}>
              <InlineMath
                math={`\\tfrac{${data.total - data.red}}{${data.total - 1}}`}
              />
            </div>
          </foreignObject>
        </svg>

        <p className="mt-2">
          <b>Pfadregeln für E = genau eine rote</b>
        </p>
        {buildEquation([
          [
            <>E</>,
            <>
              <InlineMath math="=" />
            </>,
            <>
              <InlineMath math="P(R,S)+P(S,R)" />
            </>,
          ],
          [
            <></>,
            <Color4>=</Color4>,
            <>
              <InlineMath
                math={`\\tfrac{${data.red}}{${data.total}}\\cdot\\tfrac{${
                  data.total - data.red
                }}{${data.total - 1}}\\; +\\; \\tfrac${'{'}${
                  data.total - data.red
                }{'}'}{${data.total}}\\cdot\\tfrac{${data.red}}{${
                  data.total - 1
                }}`}
              />
            </>,
          ],
          [
            <></>,
            <Color4>=</Color4>,
            <>
              <InlineMath math={`\\tfrac{${num}}{${den}}`} />
            </>,
          ],
        ])}
      </>
    )
  },
}
