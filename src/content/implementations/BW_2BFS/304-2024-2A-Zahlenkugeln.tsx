import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation, buildInlineFrac } from '@/helper/math-builder'
import { ppFrac } from '@/helper/pretty-print'

interface DATA {
  zahl1: number
  zahl2: number
  zahl3: number
  zahl4: number
  zahl5: number
  zahl6: number
  zahl7: number
  zahl8: number
}

export const exercise304: Exercise<DATA> = {
  title: 'Zahlenkugeln',
  source: '2024 Wahlteil Aufgabe 2A',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {
      zahl1: rng.randomIntBetween(1, 3),
      zahl2: rng.randomIntBetween(1, 3),
      zahl3: rng.randomIntBetween(1, 3),
      zahl4: rng.randomIntBetween(1, 3),
      zahl5: rng.randomIntBetween(1, 3),
      zahl6: rng.randomIntBetween(1, 3),
      zahl7: rng.randomIntBetween(1, 3),
      zahl8: rng.randomIntBetween(1, 3),
    }
  },
  originalData: {
    zahl1: 1,
    zahl2: 2,
    zahl3: 3,
    zahl4: 3,
    zahl5: 3,
    zahl6: 2,
    zahl7: 1,
    zahl8: 3,
  },
  constraint({ data }) {
    const array = [
      data.zahl1,
      data.zahl2,
      data.zahl3,
      data.zahl4,
      data.zahl5,
      data.zahl6,
      data.zahl7,
      data.zahl8,
    ]
    const einser = array.filter(num => num === 1).length
    const zweier = array.filter(num => num === 2).length
    const dreier = array.filter(num => num === 3).length
    return einser >= 1 && zweier >= 2 && dreier >= 3
  },
  intro({ data }) {
    return (
      <>
        <p>
          Vor Sven steht eine Schale mit verschiedenen Zahlenkugeln (siehe
          Abbildung). Er zieht blind eine Kugel, legt sie zurück und zieht dann
          erneut eine Kugel.
        </p>
        <svg viewBox="0 0 328 90">
          <image href="/content/BW_2BFS/304.png" height="90" width="328" />
          <text x={92} y={51} fontSize={20} textAnchor="right" stroke="black">
            {data.zahl1}
          </text>
          <text x={117} y={33} fontSize={20} textAnchor="right" stroke="black">
            {data.zahl2}
          </text>
          <text x={119} y={63} fontSize={20} textAnchor="right" stroke="black">
            {data.zahl3}
          </text>
          <text x={152} y={69} fontSize={20} textAnchor="right" stroke="black">
            {data.zahl4}
          </text>
          <text x={158} y={39} fontSize={20} textAnchor="right" stroke="black">
            {data.zahl5}
          </text>
          <text x={182} y={68} fontSize={20} textAnchor="right" stroke="black">
            {data.zahl6}
          </text>
          <text x={188} y={38} fontSize={20} textAnchor="right" stroke="black">
            {data.zahl7}
          </text>
          <text x={212} y={58} fontSize={20} textAnchor="right" stroke="black">
            {data.zahl8}
          </text>
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
              Fertigen Sie ein Baumdiagramm zur oben beschriebenen Situation an.
            </p>
          </>
        )
      },
      solution({ data }) {
        const array = [
          data.zahl1,
          data.zahl2,
          data.zahl3,
          data.zahl4,
          data.zahl5,
          data.zahl6,
          data.zahl7,
          data.zahl8,
        ]
        const einser = array.filter(num => num === 1).length
        const zweier = array.filter(num => num === 2).length
        const dreier = array.filter(num => num === 3).length
        return (
          <>
            <p>
              Das blinde Ziehen der Kugeln ist ein Laplace-Experiment. Berechne
              die Wahrscheinlichkeiten mit der Formel:
            </p>
            {buildEquation([
              [
                <>P(1)</>,
                <>=</>,
                <>
                  {buildInlineFrac(
                    <>Anzahl günstiger Ergebnisse</>,
                    <>Anzahl möglicher Ergebnisse</>,
                  )}
                </>,
              ],

              [
                <></>,
                <>=</>,
                <>
                  {buildInlineFrac(<>{einser}</>, <>8</>)}{' '}
                  {getGcd(einser, 8) != 1 && <>= {ppFrac(einser / 8)}</>}
                </>,
              ],
            ])}
            {buildEquation([
              [
                <>P(2)</>,

                <>=</>,
                <>
                  {buildInlineFrac(<>{zweier}</>, <>8</>)}{' '}
                  {getGcd(zweier, 8) != 1 && <>= {ppFrac(zweier / 8)}</>}
                </>,
              ],
            ])}
            {buildEquation([
              [
                <>P(3)</>,

                <>=</>,
                <>
                  {buildInlineFrac(<>{dreier}</>, <>8</>)}{' '}
                  {getGcd(dreier, 8) != 1 && <>= {ppFrac(dreier / 8)}</>}
                </>,
              ],
            ])}
            <p>
              Lege das Baumdiagramm an und trage die Wahrscheinlichkeiten ein:
            </p>
            <svg viewBox="0 0 328 190">
              <image
                href="/content/BW_2BFS/304_2.png"
                height="190"
                width="328"
              />
              <foreignObject x={105} y={7} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(einser / 8)}
                </div>
              </foreignObject>
              <foreignObject x={30} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(einser / 8)}
                </div>
              </foreignObject>
              <foreignObject x={130} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(einser / 8)}
                </div>
              </foreignObject>
              <foreignObject x={230} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(einser / 8)}
                </div>
              </foreignObject>
              <foreignObject x={147} y={7} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(zweier / 8)}
                </div>
              </foreignObject>
              <foreignObject x={50} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(zweier / 8)}
                </div>
              </foreignObject>
              <foreignObject x={150} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(zweier / 8)}
                </div>
              </foreignObject>
              <foreignObject x={253} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(zweier / 8)}
                </div>
              </foreignObject>
              <foreignObject x={195} y={7} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(dreier / 8)}
                </div>
              </foreignObject>
              <foreignObject x={70} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(dreier / 8)}
                </div>
              </foreignObject>
              <foreignObject x={170} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(dreier / 8)}
                </div>
              </foreignObject>
              <foreignObject x={275} y={90} width={25} height={45}>
                <div
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    transform: 'scale(0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                >
                  {ppFrac(dreier / 8)}
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
        const array = [
          data.zahl1,
          data.zahl2,
          data.zahl3,
          data.zahl4,
          data.zahl5,
          data.zahl6,
          data.zahl7,
          data.zahl8,
        ]
        const einser = array.filter(num => num === 1).length
        const zweier = array.filter(num => num === 2).length
        const dreier = array.filter(num => num === 3).length
        return (
          <>
            <p>
              Berechnen Sie die Wahrscheinlichkeiten für die folgenden
              Ereignisse:
            </p>
            <ul>
              <li>A: &quot;Sven zieht zweimal eine 3.&quot;</li>
              <li>B: &quot;Sven zieht zweimal die selbe Zahl.&quot;</li>
              <li>C: &quot;Sven zieht höchstens eine 3.&quot;</li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const array = [
          data.zahl1,
          data.zahl2,
          data.zahl3,
          data.zahl4,
          data.zahl5,
          data.zahl6,
          data.zahl7,
          data.zahl8,
        ]
        const einser = array.filter(num => num === 1).length
        const zweier = array.filter(num => num === 2).length
        const dreier = array.filter(num => num === 3).length
        return (
          <>
            <p>
              Tipp: Es ist hilfreich mit dem Baumdiagramm aus der ersten
              Teilaufgabe zu arbeiten.
            </p>
            <ul>
              <li>
                A:{' '}
                {buildEquation([
                  [
                    <>P(3,3)</>,
                    <>=</>,
                    <>
                      {ppFrac(dreier / 8)} · {ppFrac(dreier / 8)} ={' '}
                      {ppFrac([dreier * dreier, 64])}{' '}
                      {getGcd(dreier * dreier, 64) != 1 && (
                        <>= {ppFrac((dreier * dreier) / 64)}</>
                      )}
                    </>,
                  ],
                ])}
              </li>
              <li>
                B:{' '}
                <div>
                  <span style={{ fontSize: '0.8em' }}>
                    {buildEquation([
                      [
                        <>P(2 gleiche)</>,
                        <>=</>,
                        <>P(1,1) + P(2,2) + P(3,3)</>,
                      ],
                      [
                        <></>,
                        <>=</>,
                        <>
                          {ppFrac([einser * einser, 64])} +{' '}
                          {ppFrac([zweier * zweier, 64])} +{' '}
                          {ppFrac((dreier * dreier) / 64)}
                        </>,
                      ],
                      [
                        <></>,
                        <>=</>,
                        <>
                          {ppFrac(
                            (einser * einser +
                              zweier * zweier +
                              dreier * dreier) /
                              64,
                          )}{' '}
                        </>,
                      ],
                    ])}
                  </span>
                </div>
              </li>
              <li>
                C: Dieses Ereignis ist genau das Gegenereignis von &quot;Sven
                zieht zwei mal die 3.&quot; Berechne mit der Formel für das
                Gegenereignis:
                {buildEquation([
                  [<>P(höchstens eine 3)</>, <>=</>, <>1 - P(3,3)</>],
                  [<></>, <>=</>, <>1 - {ppFrac((dreier * dreier) / 64)}</>],
                  [<></>, <>=</>, <>{ppFrac((64 - dreier * dreier) / 64)} </>],
                ])}
              </li>
            </ul>
          </>
        )
      },
    },
  ],
}
