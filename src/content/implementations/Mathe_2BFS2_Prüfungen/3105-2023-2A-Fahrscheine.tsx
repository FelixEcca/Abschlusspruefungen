// ============================
// 2A — Wahrscheinlichkeit/Zug
// ============================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA3105 {
  pNo: number
  sample: number
}

export const exercise3105: Exercise<DATA3105> = {
  title: 'Fahrscheine',
  source: '2023 Wahlteil Aufgabe 2A',
  useCalculator: true,
  duration: 8,

  generator(rng) {
    const pNo = rng.randomItemFromArray([0.1, 0.12, 0.15, 0.18, 0.2])
    const sample = rng.randomItemFromArray([60, 80, 100, 120])
    return { pNo, sample }
  },

  originalData: { pNo: 0.15, sample: 100 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        Angenommen, von den Personen, die mit dem Zug fahren, fahren{' '}
        {Math.round(100 * data.pNo)}% ohne gültigen Fahrschein.
      </p>
    )
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Berechnen Sie mithilfe eines Baumdiagramms die Wahrscheinlichkeit
            dafür, dass zwei zufällig kontrollierte Personen ohne gültigen
            Fahrschein fahren.
          </p>
        )
      },
      solution({ data }) {
        const p2 = data.pNo * data.pNo
        return (
          <>
            <p>
              Das Baumdiagramm für das Kontrollieren von zwei Fahrgästen sieht
              so aus:
            </p>
            <svg viewBox="0 0 328 200">
              <image
                href="/content/Mathe_2BFS2/3105.png"
                height="200"
                width="328"
              />
              <text
                x={70}
                y={100}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                ohne
              </text>
              <text
                x={240}
                y={100}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                mit
              </text>
              <text
                x={20}
                y={195}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                ohne
              </text>
              <text
                x={140}
                y={195}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                mit
              </text>
              <text
                x={180}
                y={195}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                ohne
              </text>
              <text
                x={300}
                y={195}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                mit
              </text>
              <text
                x={70}
                y={100}
                fontSize={15}
                textAnchor="middle"
                stroke="black"
              >
                ohne
              </text>
              <foreignObject x={60} y={30} width={40} height={30}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <InlineMath math={`${pp(data.pNo)}`} />
                </div>
              </foreignObject>
              <foreignObject x={205} y={30} width={40} height={30}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <InlineMath math={`${pp(1 - data.pNo)}`} />
                </div>
              </foreignObject>
              <foreignObject x={270} y={130} width={40} height={30}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <InlineMath math={`${pp(1 - data.pNo)}`} />
                </div>
              </foreignObject>
              <foreignObject x={105} y={130} width={40} height={30}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <InlineMath math={`${pp(1 - data.pNo)}`} />
                </div>
              </foreignObject>
              <foreignObject x={0} y={130} width={40} height={30}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <InlineMath math={`${pp(data.pNo)}`} />
                </div>
              </foreignObject>
              <foreignObject x={170} y={130} width={40} height={30}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <InlineMath math={`${pp(data.pNo)}`} />
                </div>
              </foreignObject>
            </svg>
            <BlockMath
              math={`
                \\begin{align*}
                  P(2\\ \\text{ohne}) &= P(ohne) \\cdot P(ohne) \\\\
                  &= ${pp(data.pNo)} \\cdot ${pp(data.pNo)} \\\\
                  &= ${pp(p2)}
                \\end{align*}
              `}
            />
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Ermitteln Sie, wie viele Personen man erwarten kann, die ohne
            gültigen Fahrschein fahren, wenn {data.sample} Personen zufällig
            kontrolliert werden.
          </p>
        )
      },
      solution({ data }) {
        const E = data.pNo * data.sample
        return (
          <>
            <InlineMath math="E=n\cdot p" />
            <br />
            <InlineMath
              math={`E=${data.sample}\\cdot ${pp(data.pNo)}=${pp(E)}`}
            />
            <p>
              Etwa {Math.round(E)} Personen werden erwartungsgemäß kontrolliert.
            </p>
          </>
        )
      },
    },
  ],
}
