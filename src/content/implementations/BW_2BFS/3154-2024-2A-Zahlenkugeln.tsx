import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildEquation } from '@/helper/math-builder'
import { InlineMath } from 'react-katex'

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

export const exercise3154: Exercise<DATA> = {
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
      intro() {
        return null
      },
      task() {
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

        const frac = (a: number, b: number) => `\\tfrac{${a}}{${b}}`

        return (
          <>
            <p>
              Das blinde Ziehen der Kugeln ist ein Laplace-Experiment. Berechne
              die Wahrscheinlichkeiten mit der Formel:
            </p>
            {buildEquation([
              [
                <>
                  <InlineMath math="P(1)" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath
                    math={`\\dfrac{\\text{Anzahl günstiger Ergebnisse}}{\\text{Anzahl möglicher Ergebnisse}}`}
                  />
                </>,
              ],
              [
                <></>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={frac(einser, 8)} />
                  {/* ggf. bereits gekürzt */}
                </>,
              ],
            ])}
            {buildEquation([
              [
                <>
                  <InlineMath math="P(2)" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={frac(zweier, 8)} />
                </>,
              ],
            ])}
            {buildEquation([
              [
                <>
                  <InlineMath math="P(3)" />
                </>,
                <>
                  <InlineMath math="=" />
                </>,
                <>
                  <InlineMath math={frac(dreier, 8)} />
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
              {/* Erste Stufe */}
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
                  <InlineMath math={frac(einser, 8)} />
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
                  <InlineMath math={frac(zweier, 8)} />
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
                  <InlineMath math={frac(dreier, 8)} />
                </div>
              </foreignObject>

              {/* Zweite Stufe – unter „1“ */}
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
                  <InlineMath math={frac(einser, 8)} />
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
                  <InlineMath math={frac(zweier, 8)} />
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
                  <InlineMath math={frac(dreier, 8)} />
                </div>
              </foreignObject>

              {/* Zweite Stufe – unter „2“ */}
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
                  <InlineMath math={frac(einser, 8)} />
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
                  <InlineMath math={frac(zweier, 8)} />
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
                  <InlineMath math={frac(dreier, 8)} />
                </div>
              </foreignObject>

              {/* Zweite Stufe – unter „3“ */}
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
                  <InlineMath math={frac(einser, 8)} />
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
                  <InlineMath math={frac(zweier, 8)} />
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
                  <InlineMath math={frac(dreier, 8)} />
                </div>
              </foreignObject>
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

        const numA = dreier * dreier
        const denA = 64
        const gA = getGcd(numA, denA)
        const numAk = numA / gA
        const denAk = denA / gA

        const numB = einser * einser + zweier * zweier + dreier * dreier
        const denB = 64
        const gB = getGcd(numB, denB)
        const numBk = numB / gB
        const denBk = denB / gB

        const numC = 64 - numA
        const denC = 64
        const gC = getGcd(numC, denC)
        const numCk = numC / gC
        const denCk = denC / gC

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
                    <>
                      <InlineMath math="P(3,3)" />
                    </>,
                    <>
                      <InlineMath math="=" />
                    </>,
                    <>
                      <InlineMath
                        math={`\\tfrac{${dreier}}{8} \\cdot \\tfrac{${dreier}}{8} = \\tfrac{${numA}}{64}`}
                      />{' '}
                      {gA !== 1 && (
                        <>
                          {' '}
                          = <InlineMath math={`\\tfrac{${numAk}}{${denAk}}`} />
                        </>
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
                        <>
                          <InlineMath math="P(2~\text{gleiche})" />
                        </>,
                        <>
                          <InlineMath math="=" />
                        </>,
                        <>
                          <span style={{ fontSize: 12 }}>
                            <InlineMath math="P(1,1)+P(2,2)+P(3,3)" />
                          </span>
                        </>,
                      ],
                      [
                        <></>,
                        <>
                          <InlineMath math="=" />
                        </>,
                        <>
                          <InlineMath
                            math={`\\frac{${einser}\\cdot${einser}}{64} + \\frac{${zweier}\\cdot${zweier}}{64} + \\frac{${dreier}\\cdot${dreier}}{64}`}
                          />
                        </>,
                      ],
                      [
                        <></>,
                        <>
                          <InlineMath math="=" />
                        </>,
                        <>
                          <InlineMath math={`\\tfrac{${numB}}{64}`} />{' '}
                          {gB !== 1 && (
                            <>
                              {' '}
                              ={' '}
                              <InlineMath
                                math={`\\tfrac{${numBk}}{${denBk}}`}
                              />
                            </>
                          )}
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
                  [
                    <>
                      <span style={{ fontSize: 15 }}>
                        <InlineMath math="P(\text{höchstens eine }3)" />
                      </span>
                    </>,
                    <>
                      <InlineMath math="=" />
                    </>,
                    <>
                      <InlineMath math="1 - P(3,3)" />
                    </>,
                  ],
                  [
                    <></>,
                    <>
                      <InlineMath math="=" />
                    </>,
                    <>
                      <InlineMath
                        math={`1 - \\frac{${numA}}{64} = \\frac{${numC}}{64}`}
                      />{' '}
                      {gC !== 1 && (
                        <>
                          {' '}
                          = <InlineMath math={`\\frac{${numCk}}{${denCk}}`} />
                        </>
                      )}
                    </>,
                  ],
                ])}
              </li>
            </ul>
          </>
        )
      },
    },
  ],
}
