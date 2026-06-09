// exercise5121.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  q: number
  d: number
  f0: number
  xP: number
  yP: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function f(x: number, data: DATA) {
  return data.a * Math.pow(data.q, x) + data.d
}

function xMap(x: number) {
  return 167 + x * ((94.5 * 2) / 10)
}

function yMap(y: number) {
  return 163 - y * ((94.5 * 2) / 10)
}

function graphPath(data: DATA) {
  const points = Array.from({ length: 161 }, (_, i) => {
    const x = -8 + i * 0.1
    const y = f(x, data)
    return `${i === 0 ? 'M' : 'L'} ${xMap(x)} ${yMap(y)}`
  })

  return points.join(' ')
}

export const exercise5121: Exercise<DATA> = {
  title: 'Exponentialfunktion bestimmen',
  source: 'Exponentialfunktionen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const a = rng.randomItemFromArray([2, 3, 4, 5])
    const q = rng.randomItemFromArray([0.6, 0.7, 0.8, 1.2, 1.3])
    const d = rng.randomItemFromArray([-4, -3, -2, 2, 3, 4])
    const xP = rng.randomItemFromArray([1, 2, 3])
    const f0 = round2(a + d)
    const yP = round2(a * Math.pow(q, xP) + d)

    return { a, q, d, f0, xP, yP }
  },

  originalData: {
    a: 4,
    q: 1.3,
    d: 2,
    f0: 6,
    xP: 2,
    yP: 8.76,
  },

  constraint({ data }) {
    return data.q > 0 && data.q !== 1
  },

  intro({ data }) {
    return (
      <>
        <p>
          Der Graph gehört zu einer Funktion der Form{' '}
          <InlineMath math={`f(x)=a\\cdot q^x+d`} />.
        </p>

        <svg viewBox="0 0 328 328">
          <image
            href="/content/BW_2BFS/ksgroßmitachsen.png"
            width="328"
            height="328"
          />

          <path
            d={graphPath(data)}
            fill="none"
            stroke="black"
            strokeWidth="3"
          />

          <circle cx={xMap(0)} cy={yMap(data.f0)} r="4" fill="black" />
        </svg>
      </>
    )
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Lesen Sie aus dem Schaubild den Wert der Asymptoten{' '}
            <InlineMath math={`d`} /> und den Wert <InlineMath math={`a`} /> ab.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>Die Asymptote ist:</p>
            <InlineMath math={`d=${pp(data.d)}`} />

            <p>Am Graphen liest man ab:</p>
            <InlineMath math={`f(0)=${pp(data.f0)}`} />

            <p>Da gilt:</p>

            <InlineMath
              math={`a=f(0)-d=${pp(data.f0)}${pp(-data.d, 'merge_op')}=${pp(data.a)}`}
            />
          </>
        )
      },
    },
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            Zusätzlich ist der Punkt{' '}
            <InlineMath math={`P(${pp(data.xP)}\\mid ${pp(data.yP)})`} />{' '}
            gegeben. Bestimmen Sie den Wachstumsfaktor <InlineMath math={`q`} />{' '}
            durch Einsetzen des Punktes.
          </p>
        )
      },
      solution({ data }) {
        const numerator = round2(data.yP - data.d)
        const quotient = round2(numerator / data.a)

        return (
          <>
            <p>Der Punkt wird eingesetzt mit den Daten aus a):</p>
            <InlineMath math={`f(x)=a\\cdot q^x+d`} />
            <br />
            <InlineMath
              math={`${pp(data.yP)}=${pp(data.a)}\\cdot q^{${pp(
                data.xP,
              )}}${pp(data.d, 'merge_op')}`}
            />

            <p>Nach dem Potenzterm umformen:</p>
            <InlineMath
              math={`${pp(data.yP)}${pp(-data.d, 'merge_op')}=${pp(
                data.a,
              )}\\cdot q^{${pp(data.xP)}}`}
            />
            <br />
            <InlineMath
              math={`q^{${pp(data.xP)}}=${pp(numerator)}:${pp(
                data.a,
              )}=${pp(quotient)}`}
            />

            <p>Wurzel ziehen:</p>
            <InlineMath
              math={`q=\\sqrt[${pp(data.xP)}]{${pp(quotient)}}\\approx ${pp(
                data.q,
              )}`}
            />
          </>
        )
      },
    },
  ],
}
