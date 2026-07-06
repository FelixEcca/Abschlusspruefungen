import { Exercise } from '@/data/types'
import { buildEquation } from '@/helper/math-builder'
import { getGcd } from '@/helper/get-gcd'
import { InlineMath } from 'react-katex'

interface DATA {
  h: number
  k: number
  z: number
  case: number
}

function fracStr(n: number, d: number) {
  return `\\dfrac{${n}}{${d}}`
}

function FractionInSvg(props: {
  x: number
  y: number
  n: number
  d: number
  color?: string
  scale?: number
}) {
  return (
    <foreignObject
      x={props.x}
      y={props.y}
      width={36}
      height={24}
      xmlns="http://www.w3.org/1999/xhtml"
    >
      <div
        style={{
          fontSize: '12px',
          color: props.color ?? 'black',
          transform: `scale(${props.scale ?? 0.7})`,
          transformOrigin: 'top left',
          width: '50px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <InlineMath math={fracStr(props.n, props.d)} />
      </div>
    </foreignObject>
  )
}

export const exercise3004: Exercise<DATA> = {
  title: 'Zufallsexperiment',
  source: '2021 Pflichtteil Aufgabe 1E',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {
      h: rng.randomIntBetween(3, 8),
      k: rng.randomIntBetween(3, 8),
      z: rng.randomIntBetween(3, 8),
      case: rng.randomIntBetween(1, 5),
    }
  },
  originalData: { h: 6, k: 5, z: 4, case: 1 },
  constraint({ data }) {
    return (
      data.h + data.k + data.z <= 20 &&
      (data.h + data.k + data.z) % 2 === 0 &&
      data.h != data.k &&
      data.h != data.z &&
      data.k != data.z
    )
  },
  intro({ data }) {
    const summe = data.h + data.k + data.z
    return (
      <>
        <p>
          Eine Tüte Fruchtbonbons enthält <InlineMath math={`${data.h}`} />{' '}
          Himbeer-Bonbons (H), <InlineMath math={`${data.k}`} /> Kirsch-Bonbons
          (K) und <InlineMath math={`${data.z}`} /> Zitrone-Bonbons (Z). Es
          werden blind zwei Bonbons entnommen. Die Grafik zeigt ein
          unvollständiges Baumdiagramm:
        </p>
        <svg viewBox="0 0 328 190">
          <image
            href="/content/Mathe_2BFS2/3004.png"
            height="190"
            width="328"
          />

          <FractionInSvg x={90} y={18} n={data.h} d={summe} />
          <FractionInSvg x={180} y={18} n={data.k} d={summe} />

          <FractionInSvg x={7} y={95} n={data.h - 1} d={summe - 1} />
          <FractionInSvg x={70} y={95} n={data.z} d={summe - 1} />
          <FractionInSvg x={155} y={95} n={data.k - 1} d={summe - 1} />
          <FractionInSvg x={180} y={95} n={data.z} d={summe - 1} />
          <FractionInSvg x={225} y={95} n={data.h} d={summe - 1} />
          <FractionInSvg x={250} y={95} n={data.k} d={summe - 1} />
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>Vervollständigen Sie dieses Baumdiagramm.</p>
          </>
        )
      },
      solution({ data }) {
        const summe = data.h + data.k + data.z
        return (
          <>
            <p>
              Es gibt insgesamt <InlineMath math={`${data.z}`} />{' '}
              Zitronen-Bonbons. Die Wahrscheinlichkeit diese zu ziehen liegt
              bei:
            </p>

            <p>
              <InlineMath
                math={`P(Z) = \\dfrac{\\text{Anzahl Z}}{\\text{Bonbons insgesamt}} = \\dfrac{${data.z}}{${summe}}`}
              />
            </p>

            <svg viewBox="0 0 328 190">
              <image
                href="/content/Mathe_2BFS2/3004.png"
                height="190"
                width="328"
              />

              <FractionInSvg x={90} y={18} n={data.h} d={summe} />
              <FractionInSvg x={164} y={30} n={data.k} d={summe} />
              <FractionInSvg
                x={218}
                y={27}
                n={data.z}
                d={summe}
                color="green"
              />

              <FractionInSvg x={7} y={86} n={data.h - 1} d={summe - 1} />
              <FractionInSvg x={80} y={86} n={data.z} d={summe - 1} />
              <FractionInSvg x={162} y={86} n={data.k - 1} d={summe - 1} />
              <FractionInSvg x={192} y={86} n={data.z} d={summe - 1} />
              <FractionInSvg x={231} y={86} n={data.h} d={summe - 1} />
              <FractionInSvg x={259} y={86} n={data.k} d={summe - 1} />
            </svg>

            <p>
              Im zweiten Zug fehlt jeweils ein H-, K- oder Z-Bonbon. Die Anzahl
              der Bonbons insgesamt ist um 1 kleiner.
            </p>

            <svg viewBox="0 0 328 190">
              <image
                href="/content/Mathe_2BFS2/3004.png"
                height="190"
                width="328"
              />

              <FractionInSvg x={90} y={18} n={data.h} d={summe} />
              <FractionInSvg x={164} y={30} n={data.k} d={summe} />
              <FractionInSvg
                x={218}
                y={27}
                n={data.z}
                d={summe}
                color="green"
              />

              <FractionInSvg x={7} y={87} n={data.h - 1} d={summe - 1} />
              <FractionInSvg
                x={44}
                y={87}
                n={data.k}
                d={summe - 1}
                color="green"
              />
              <FractionInSvg x={80} y={87} n={data.z} d={summe - 1} />

              <FractionInSvg
                x={126}
                y={87}
                n={data.h}
                d={summe - 1}
                color="green"
              />
              <FractionInSvg x={162} y={87} n={data.k - 1} d={summe - 1} />
              <FractionInSvg x={192} y={87} n={data.z} d={summe - 1} />

              <FractionInSvg x={231} y={87} n={data.h} d={summe - 1} />
              <FractionInSvg x={259} y={87} n={data.k} d={summe - 1} />
              <FractionInSvg
                x={294}
                y={87}
                n={data.z - 1}
                d={summe - 1}
                color="green"
              />
            </svg>
          </>
        )
      },
    },
    {
      points: 42,
      intro() {
        return null
      },
      task({ data }) {
        const summe = data.h + data.k + data.z
        return (
          <>
            <p>
              Beschreiben Sie ein mögliches Ereignis zur folgenden
              Wahrscheinlichkeit:
            </p>
            <p>
              {data.case == 1 && (
                <InlineMath
                  math={`P(A) = 1 - \\frac{2}{5}  \\cdot \\frac{5}{14}`}
                />
              )}
              {data.case == 2 && (
                <InlineMath
                  math={`P(A) = 1 - \\frac{${data.k}}{${summe}} \\cdot \\frac{${data.k - 1}}{${summe - 1}}`}
                />
              )}
              {data.case == 3 && (
                <InlineMath
                  math={`P(A) = 1 - \\frac{${data.z}}{${summe}}  \\cdot \\frac{${data.z - 1}}{${summe - 1}}`}
                />
              )}
              {data.case == 4 && (
                <InlineMath
                  math={`P(A) = \\frac{${data.k}}{${summe}} + \\frac{${data.z}}{${summe}}`}
                />
              )}
              {data.case == 5 && (
                <InlineMath
                  math={`P(A) = \\frac{${data.h}}{${summe}} + \\frac{${data.z}}{${summe}}`}
                />
              )}
            </p>
          </>
        )
      },
      solution({ data }) {
        const summe = data.h + data.k + data.z
        return (
          <>
            {data.case == 1 && (
              <>
                <p>
                  Die Wahrscheinlichkeit{' '}
                  <InlineMath math={`\\frac{2}{5}  \\cdot \\frac{5}{14}`} />{' '}
                  beschreibt, dass zwei mal hintereinander ein Himbeer-Bonbon
                  gezogen wird.
                </p>
                <p>
                  Mit der Differenz{' '}
                  <InlineMath math={'1 - \\frac{2}{5} \\cdot \\frac{5}{14}'} />{' '}
                  wird das Gegenereignis berechnet.
                </p>
                <p>
                  <InlineMath math={`A`} /> beschreibt also, dass <b>nicht</b>{' '}
                  zwei mal hintereinander ein Himbeer-Bonbon gezogen wird.
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  <InlineMath
                    math={`\\frac{${data.k}}{${summe}} \\cdot \\frac{${data.k - 1}}{${summe - 1}}`}
                  />{' '}
                  beschreibt, dass zwei mal hintereinander ein Kirsch-Bonbon
                  gezogen wird.
                </p>
                <p>
                  Mit der Differenz{' '}
                  <InlineMath
                    math={`1 - \\frac{${data.k}}{${summe}} \\cdot \\frac{${data.k - 1}}{${summe - 1}}`}
                  />{' '}
                  wird das Gegenereignis berechnet.
                </p>
                <p>
                  <InlineMath math={`A`} /> beschreibt also, dass <b>nicht</b>{' '}
                  zwei mal hintereinander ein Kirsch-Bonbon gezogen wird.
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  Die Wahrscheinlichkeit{' '}
                  <InlineMath
                    math={`\\frac{${data.z}}{${summe}} \\cdot \\frac{${data.z - 1}}{${summe - 1}}`}
                  />{' '}
                  beschreibt, dass zwei mal hintereinander ein Zitronen-Bonbon
                  gezogen wird.
                </p>
                <p>
                  Mit der Differenz{' '}
                  <InlineMath
                    math={`1 - \\frac{${data.z}}{${summe}} \\cdot \\frac{${data.z - 1}}{${summe - 1}}`}
                  />{' '}
                  wird das Gegenereignis berechnet.
                </p>
                <p>
                  A beschreibt also, dass <b>nicht</b> zwei mal hintereinander
                  ein Zitronen-Bonbon gezogen wird.
                </p>
              </>
            )}
            {data.case == 4 && (
              <>
                <p>
                  <InlineMath math={`\\frac{${data.k}}{${summe}}`} /> ist die
                  Wahrscheinlichkeit im ersten Zug ein Kirsch-Bonbon zu ziehen.
                  <br />
                  <InlineMath math={`\\frac{${data.z}}{${summe}}`} /> ist die
                  Wahrscheinlichkeit im ersten Zug ein Zitronen-Bonbon zu
                  ziehen.
                </p>
                <p>
                  Die Summe ist also die Wahrscheinlichkeit ein Kirsch-{' '}
                  <b>oder</b> Zitronen-Bonbon im ersten Zug zu ziehen.
                </p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  <InlineMath math={`\\frac{${data.h}}{${summe}}`} /> ist die
                  Wahrscheinlichkeit im ersten Zug ein Himbeer-Bonbon zu ziehen.
                  <br />
                  <InlineMath math={`\\frac{${data.z}}{${summe}}`} /> ist die
                  Wahrscheinlichkeit im ersten Zug ein Zitronen-Bonbon zu
                  ziehen.
                </p>
                <p>
                  Die Summe ist also die Wahrscheinlichkeit ein Himbeer-{' '}
                  <b>oder</b> Zitronen-Bonbon im ersten Zug zu ziehen.
                </p>
              </>
            )}
          </>
        )
      },
    },
  ],
}
