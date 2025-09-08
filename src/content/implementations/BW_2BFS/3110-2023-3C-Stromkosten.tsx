// =====================================
// 3C — Stromtarife linear
// =====================================
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'
import { buildEquation } from '@/helper/math-builder'

interface DATA3110 {
  base1: number
  rate1: number
  base2: number
  rate2: number
  xUse: number
}

export const exercise3110: Exercise<DATA3110> = {
  title: 'Stromkosten',
  source: '2023 Wahlteil Aufgabe 3C',
  useCalculator: true,
  duration: 10,

  generator(rng) {
    const base1 = rng.randomItemFromArray([8, 10, 12])
    const rate1 = rng.randomItemFromArray([0.36, 0.38, 0.4])
    const base2 = rng.randomItemFromArray([18, 20, 22])
    const rate2 = rng.randomItemFromArray([0.28, 0.3, 0.32])
    const xUse = rng.randomItemFromArray([150, 200, 250])
    return { base1, rate1, base2, rate2, xUse }
  },

  originalData: { base1: 10, rate1: 0.4, base2: 20, rate2: 0.3, xUse: 200 },

  constraint({ data }) {
    return data.rate1 !== data.rate2
  },

  intro({ data }) {
    return (
      <ul className="list-disc ml-5">
        <li>
          Tarif I: {pp(data.base1)} € + {pp(data.rate1)} €·kWh
        </li>
        <li>
          Tarif II: {pp(data.base2)} € + {pp(data.rate2)} €·kWh
        </li>
      </ul>
    )
  },

  tasks: [
    {
      points: 6,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Geben Sie die Gleichungen <InlineMath math="K_1(x), K_2(x)" /> an
            und bestimmen Sie den Schnittpunkt.
          </p>
        )
      },
      solution({ data }) {
        const xs = (data.base2 - data.base1) / (data.rate1 - data.rate2)
        const ys = data.base1 + data.rate1 * xs
        return (
          <>
            {buildEquation([
              [
                'Gleichungen',
                '',
                `K_1(x)=${pp(data.base1)}+${pp(data.rate1)}x,\\ K_2(x)=${pp(data.base2)}+${pp(data.rate2)}x`,
              ],
              [
                'Schnitt',
                '\\Rightarrow',
                `${pp(data.base1)}+${pp(data.rate1)}x=${pp(data.base2)}+${pp(data.rate2)}x`,
              ],
              ['Lösen', '\\Rightarrow', `S(${pp(xs)}\\mid ${pp(ys)})`],
            ])}
          </>
        )
      },
    },
    {
      points: 4,
      intro({ data }) {
        return (
          <p>
            Monatsverbrauch: <InlineMath math={`${data.xUse}\\,\\text{kWh}`} />.
          </p>
        )
      },
      task() {
        return <p>Wie viel spart man mit dem günstigeren Tarif?</p>
      },
      solution({ data }) {
        const K1 = data.base1 + data.rate1 * data.xUse
        const K2 = data.base2 + data.rate2 * data.xUse
        return (
          <InlineMath
            math={`\\text{Ersparnis}=|${pp(K1)}-${pp(K2)}|=\\,${pp(Math.abs(K1 - K2))}\\,\\text{€}`}
          />
        )
      },
    },
  ],
}
