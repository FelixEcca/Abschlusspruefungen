import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  h: number
  k: number
  z: number
  case: number
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
          Eine Tüte Fruchtbonbons enthält {data.h} Himbeer-Bonbons (H), {data.k}{' '}
          Kirsch-Bonbons (K) und {data.z} Zitrone-Bonbons (Z). Es werden blind
          zwei Bonbons entnommen. Die Grafik zeigt ein unvollständiges
          Baumdiagramm:
        </p>
        <svg viewBox="0 0 328 190">
          <image href="/content/BW_2BFS/3004.png" height="190" width="328" />
          <foreignObject x={90} y={18} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac(data.h / summe)}
            </div>
          </foreignObject>
          <foreignObject x={164} y={30} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac(data.k / summe)}
            </div>
          </foreignObject>
          <foreignObject x={7} y={86} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac((data.h - 1) / (summe - 1))}
            </div>
          </foreignObject>
          <foreignObject x={80} y={86} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac(data.z / (summe - 1))}
            </div>
          </foreignObject>
          <foreignObject x={162} y={86} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac((data.k - 1) / (summe - 1))}
            </div>
          </foreignObject>
          <foreignObject x={192} y={86} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac(data.z / (summe - 1))}
            </div>
          </foreignObject>
          <foreignObject x={231} y={86} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac(data.h / (summe - 1))}
            </div>
          </foreignObject>
          <foreignObject x={259} y={86} width={20} height={45}>
            <div
              style={{
                fontSize: '12px',
                color: 'black',
                transform: 'scale(0.7)',
              }}
            >
              {ppFrac(data.k / (summe - 1))}
            </div>
          </foreignObject>
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
            <p>Vervollständigen Sie dieses Baumdiagramm.</p>
          </>
        )
      },
      solution({ data }) {
        const summe = data.h + data.k + data.z
        return (
          <>
            <p>
              Es gibt insgesamt {data.z} Zitronen-Bonbons. Die
              Wahrscheinlichkeit diese zu ziehen liegt bei:{' '}
            </p>

            <p>
              P(Z) = {buildInlineFrac(<>Anzahl Z</>, <>Bonbons insgesamt</>)} ={' '}
              {ppFrac([data.z, summe])}
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_2BFS/3004.png"
                height="190"
                width="328"
              />
              <foreignObject x={90} y={18} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.h / summe)}
                </div>
              </foreignObject>
              <foreignObject x={164} y={30} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.k / summe)}
                </div>
              </foreignObject>
              <foreignObject x={218} y={27} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'green',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac([data.z, summe])}
                </div>
              </foreignObject>
              <foreignObject x={7} y={86} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac((data.h - 1) / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={80} y={86} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.z / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={162} y={86} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac((data.k - 1) / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={192} y={86} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.z / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={231} y={86} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.h / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={259} y={86} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.k / (summe - 1))}
                </div>
              </foreignObject>
            </svg>
            <p>
              Im zweiten Zug fehlt jeweils ein H -,K - oder Z - Bonbon. Die
              Anzahl der Bonbons insgesamt ist um 1 kleiner.
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_2BFS/3004.png"
                height="190"
                width="328"
              />
              <foreignObject x={90} y={18} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.h / summe)}
                </div>
              </foreignObject>
              <foreignObject x={164} y={30} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.k / summe)}
                </div>
              </foreignObject>
              <foreignObject x={218} y={27} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'green',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac([data.z, summe])}
                </div>
              </foreignObject>
              <foreignObject x={7} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac((data.h - 1) / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={44} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'green',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac([data.k, summe - 1])}
                </div>
              </foreignObject>
              <foreignObject x={80} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.z / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={126} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'green',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac([data.h, summe - 1])}
                </div>
              </foreignObject>
              <foreignObject x={162} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac((data.k - 1) / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={192} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.z / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={231} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.h / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={259} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'black',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac(data.k / (summe - 1))}
                </div>
              </foreignObject>
              <foreignObject x={294} y={87} width={20} height={45}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'green',
                    transform: 'scale(0.7)',
                  }}
                >
                  {ppFrac([data.z - 1, summe - 1])}
                </div>
              </foreignObject>
            </svg>
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
        const summe = data.h + data.k + data.z
        return (
          <>
            <p>
              Beschreiben Sie ein mögliches Ereignis zur folgenden
              Wahrscheinlichkeit:
            </p>
            <p>
              {data.case == 1 && (
                <>
                  <p>
                    P(A) = 1 - {buildInlineFrac(2, 5)} ·{' '}
                    {buildInlineFrac(5, 14)}
                  </p>
                </>
              )}
              {data.case == 2 && (
                <>
                  <p>
                    P(A) = 1 - {ppFrac(data.k / summe)} ·{' '}
                    {ppFrac((data.k - 1) / (summe - 1))}
                  </p>
                </>
              )}
              {data.case == 3 && (
                <>
                  <p>
                    P(A) = 1 - {ppFrac(data.z / summe)} ·{' '}
                    {ppFrac((data.z - 1) / (summe - 1))}
                  </p>
                </>
              )}
              {data.case == 4 && (
                <>
                  <p>
                    P(A) = {buildInlineFrac(data.k, summe)} +{' '}
                    {buildInlineFrac(data.z, summe)}
                  </p>
                </>
              )}
              {data.case == 5 && (
                <>
                  <p>
                    P(A) = {buildInlineFrac(data.h, summe)} +{' '}
                    {buildInlineFrac(data.z, summe)}
                  </p>
                </>
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
                  Die Wahrscheinlichkeit {buildInlineFrac(2, 5)} ·{' '}
                  {buildInlineFrac(5, 14)} beschreibt, dass zwei mal
                  hintereinander ein Himbeer-Bonbons gezogen wird.
                </p>
                <p>
                  Mit der Differenz 1 - {buildInlineFrac(2, 5)} ·{' '}
                  {buildInlineFrac(5, 14)} wird das Gegenereignis berechnet.
                </p>
                <p>
                  A beschreibt also, dass <b>nicht</b> zwei mal hintereinander
                  ein Himbeer-Bonbon gezogen wird.
                </p>
              </>
            )}
            {data.case == 2 && (
              <>
                <p>
                  Die Wahrscheinlichkeit {ppFrac(data.k / summe)} ·{' '}
                  {ppFrac((data.k - 1) / (summe - 1))} beschreibt, dass zwei mal
                  hintereinander ein Kirsch-Bonbon gezogen wird.
                </p>
                <p>
                  Mit der Differenz 1 - {ppFrac(data.k / summe)} ·{' '}
                  {ppFrac((data.k - 1) / (summe - 1))} wird das Gegenereignis
                  berechnet.
                </p>
                <p>
                  A beschreibt also, dass <b>nicht</b> zwei mal hintereinander
                  ein Kirsch-Bonbon gezogen wird.
                </p>
              </>
            )}
            {data.case == 3 && (
              <>
                <p>
                  Die Wahrscheinlichkeit {ppFrac(data.z / summe)} ·{' '}
                  {ppFrac((data.z - 1) / (summe - 1))} beschreibt, dass zwei mal
                  hintereinander ein Zitronen-Bonbon gezogen wird.
                </p>
                <p>
                  Mit der Differenz 1 - {ppFrac(data.z / summe)} ·{' '}
                  {ppFrac((data.z - 1) / (summe - 1))} wird das Gegenereignis
                  berechnet.
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
                  {buildInlineFrac(data.k, summe)} ist die Wahrscheinlichkeit im
                  ersten Zug ein Kirsch-Bonbon zu ziehen.
                  <br></br>
                  {buildInlineFrac(data.z, summe)} ist die Wahrscheinlichkeit im
                  ersten Zug ein Zitronen-Bonbon zu ziehen.
                </p>
                <p>
                  Die Summe ist also die Wahrscheinlichkeit ein Kirsch -{' '}
                  <b>oder</b> Zitronen-Bonbon im ersten Zug zu ziehen.
                </p>
              </>
            )}
            {data.case == 5 && (
              <>
                <p>
                  {buildInlineFrac(data.h, summe)} ist die Wahrscheinlichkeit im
                  ersten Zug ein Himbeer-Bonbon zu ziehen.
                  <br></br>
                  {buildInlineFrac(data.z, summe)} ist die Wahrscheinlichkeit im
                  ersten Zug ein Zitronen-Bonbon zu ziehen.
                </p>
                <p>
                  Die Summe ist also die Wahrscheinlichkeit ein Himbeer -{' '}
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
