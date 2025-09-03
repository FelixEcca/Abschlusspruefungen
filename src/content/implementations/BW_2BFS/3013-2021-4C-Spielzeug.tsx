import { Exercise } from '@/data/types'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { InlineMath } from 'react-katex'

interface DATA {
  r2: number
  r1: number
}

export const exercise3013: Exercise<DATA> = {
  title: 'Spielzeug',
  source: '2021 Wahlteil Aufgabe 4C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return { r2: rng.randomIntBetween(5, 12), r1: rng.randomIntBetween(10, 20) }
  },
  originalData: { r2: 9, r1: 15 },
  constraint({ data }) {
    return data.r1 > data.r2
  },
  intro({ data }) {
    return (
      <>
        <p>
          Ein Spielgerät zum Balancieren besteht aus einer kreisrunden Scheibe,
          einer darunter angesetzten Halbkugel <InlineMath math={`H_{1}`} /> und
          einer kleineren, oberhalb angesetzten Halbkugel{' '}
          <InlineMath math={`H_{2}`} />.
        </p>
        <svg viewBox="0 0 328 100">
          <image href="/content/BW_2BFS/3013.png" height="100" width="328" />
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Berechnen Sie den Oberflächeninhalt der Halbkugel{' '}
              <InlineMath math={`H_{2}`} />, wenn deren Radius{' '}
              <InlineMath math={`${data.r2} \\, \\text{cm}`} /> beträgt.
            </p>
          </>
        )
      },
      solution({ data }) {
        const surfaceArea = Math.round(4 * Math.PI * data.r2 ** 2 * 100) / 100
        return (
          <>
            <p>Berechne die Oberfläche mit der Formel für die Kugelfläche:</p>
            {buildEquation([
              [
                <>
                  <InlineMath math={`O`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  {' '}
                  <InlineMath math={`4\\cdot π \\cdot r_{2}^{2}`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={`O`} />
                </>,
                <>
                  <InlineMath math={`=`} />
                </>,
                <>
                  <InlineMath math={`4\\cdot π \\cdot (${data.r2} ~cm)²`} />
                </>,
              ],
              [
                <>
                  <InlineMath math={`O`} />
                </>,
                <>
                  <InlineMath math={`\\approx`} />
                </>,
                <>
                  <InlineMath math={`${pp(surfaceArea)} ~cm²`} />
                </>,
              ],
            ])}
            <p>
              {' '}
              Damit ist die Oberfläche der <b>Halbkugel</b>:
            </p>
            <p>
              <InlineMath
                math={`${pp(surfaceArea)} ~cm² : 2 = ${pp(surfaceArea / 2)} ~cm²`}
              />
            </p>
          </>
        )
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Geben Sie das Verhältnis des Volumens der Halbkugel{' '}
              <InlineMath math={`H_{1}`} />
              zum Volumen der Halbkugel <InlineMath math={`H_{2}`} /> an. Es ist{' '}
              <InlineMath math={`r_{1} = ${data.r1} ~cm`} /> und{' '}
              <InlineMath math={`r_{2} = ${data.r2} ~cm`} />.
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Berechne das Verhältnis der Volumina:</p>
            <p>
              {buildInlineFrac(
                <>
                  <InlineMath math={`V_{1}`} />
                </>,
                <>
                  <InlineMath math={`V_{2}`} />
                </>,
              )}{' '}
              <InlineMath math={`=`} />{' '}
              {buildInlineFrac(
                <>
                  <InlineMath math={`\\frac{2}{3} · π · r_{1}^{3}`} />
                </>,
                <>
                  <InlineMath math={`\\frac{2}{3} · π · r_{2}^{3}`} />
                </>,
              )}{' '}
              <InlineMath math={`=`} />{' '}
              {buildInlineFrac(
                <>
                  <InlineMath math={`r_{1}^{3}`} />
                </>,
                <>
                  <InlineMath math={`r_{2}^{3}`} />
                </>,
              )}{' '}
              <InlineMath math={`=`} />{' '}
              {buildInlineFrac(
                <>
                  <InlineMath math={`${data.r1}^{3}`} />
                </>,
                <>
                  <InlineMath math={`${data.r2}^{3}`} />
                </>,
              )}{' '}
              <InlineMath math={`=`} />{' '}
              <InlineMath
                math={`${pp(Math.round((100 * data.r1 ** 3) / data.r2 ** 3) / 100)}`}
              />
            </p>
          </>
        )
      },
    },
  ],
}
