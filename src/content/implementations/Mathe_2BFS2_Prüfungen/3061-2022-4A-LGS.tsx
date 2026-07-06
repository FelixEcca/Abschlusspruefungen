// exercise3061.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  b1: number
  sum: number
  xSol: number
  ySol: number
}

export const exercise3061: Exercise<DATA> = {
  title: 'Lineares Gleichungssystem',
  source: 'Prüfung 2022 / Aufgabe 4A',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const xSol = rng.randomItemFromArray([1, 2, 3, 4])
    const ySol = rng.randomItemFromArray([1, 2, 3])
    const m = rng.randomItemFromArray([0.5, 1, 1.5, 2])
    const b1 = ySol - m * xSol
    const sum = xSol + ySol

    return { m, b1, sum, xSol, ySol }
  },

  originalData: {
    m: 0.5,
    b1: 1,
    sum: 4,
    xSol: 2,
    ySol: 2,
  },

  constraint({ data }) {
    return true
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 3,
      intro({ data }) {
        return <></>
      },
      task({ data }) {
        return (
          <>
            <p>Lösen Sie das lineare Gleichungssystem rechnerisch.</p>
            <p>
              <InlineMath
                math={`y = ${pp(data.m)}x ${data.b1 >= 0 ? '+' : '-'} ${pp(Math.abs(data.b1))}`}
              />
              <br />
              <InlineMath math={`x + y = ${pp(data.sum)}`} />
            </p>
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`x + (${pp(data.m)}x ${data.b1 >= 0 ? '+' : '-'} ${pp(
                Math.abs(data.b1),
              )}) = ${pp(data.sum)}`}
            />
            <br />
            <InlineMath
              math={`${pp(1 + data.m)}x = ${pp(data.sum - data.b1)}`}
            />
            <br />
            <InlineMath math={`x = ${pp(data.xSol)}`} />
            <br />
            <InlineMath
              math={`y = ${pp(data.m)}\\cdot ${pp(data.xSol)} ${
                data.b1 >= 0 ? '+' : '-'
              } ${pp(Math.abs(data.b1))} = ${pp(data.ySol)}`}
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
      task() {
        return (
          <>
            <p>Überprüfen Sie die Lösung graphisch.</p>
          </>
        )
      },
      solution({ data }) {
        function toX(n: number) {
          return 167 + n * ((94.5 * 2) / 10)
        }
        function toY(n: number) {
          return 163 - n * ((94.5 * 2) / 10)
        }
        function g1(x: number) {
          return data.m * x + data.b1
        }
        function g2(x: number) {
          return -x + data.sum
        }
        return (
          <>
            <svg viewBox="0 0 328 328">
              <image
                href="/content/Mathe_2BFS2/ksgroßmitachsen.png"
                height="328"
                width="328"
              />
              <line
                x1={toX(-8)}
                y1={toY(g1(-8))}
                x2={toX(8)}
                y2={toY(g1(8))}
                stroke="red"
                strokeWidth="2"
              />
              <line
                x1={toX(-8)}
                y1={toY(g2(-8))}
                x2={toX(8)}
                y2={toY(g2(8))}
                stroke="blue"
                strokeWidth="2"
              />
            </svg>
            <p>
              Der Schnittpunkt der beiden Geraden ist
              <InlineMath
                math={`\\ S(${pp(data.xSol)}\\mid ${pp(data.ySol)})`}
              />
              .
            </p>
          </>
        )
      },
    },
  ],
}
