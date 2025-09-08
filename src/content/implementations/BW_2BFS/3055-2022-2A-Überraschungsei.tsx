// ====================================
// 2A (3055) – Überraschungsei
// ====================================
import { Exercise } from '@/data/types'
import { InlineMath, BlockMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  n: number // „jedes n-te Ei“ enthält eine Figur  → p=1/n
  buyPrice: number
  sellPrice: number
}

export const exercise3055: Exercise<DATA> = {
  title: 'Überraschungsei – Wahrscheinlichkeit & Erwartungswert',
  source: '2022 Aufgabe 2A',
  useCalculator: true,
  duration: 12,

  generator(rng) {
    const n = rng.randomIntBetween(5, 10)
    const buyPrice = rng.randomItemFromArray([0.79, 0.89, 0.99])
    const sellPrice = rng.randomItemFromArray([5, 6, 7])
    return { n, buyPrice, sellPrice }
  },

  // Original: jedes 7. Ei enthält eine Figur; 0,89 €; 6 €
  originalData: { n: 7, buyPrice: 0.89, sellPrice: 6 },

  constraint() {
    return true
  },

  intro({ data }) {
    return (
      <p>
        Im Schnitt ist in <b>jedem {data.n}. Ei</b> eine Sammelfigur (p = 1/
        {data.n}).
      </p>
    )
  },

  tasks: [
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <p>
            <b>1.</b> Tim kauft 35 Eier. Wie viele Figuren kann er erwarten?
          </p>
        )
      },
      solution({ data }) {
        const E = 35 * (1 / data.n)
        return (
          <InlineMath
            math={`E=35\\cdot \\tfrac{1}{${data.n}}=${pp(E)}\\;\\text{Figuren (im Mittel)}`}
          />
        )
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task() {
        return (
          <p>
            Mehmet kauft 2 Eier. Bestimmen Sie die Wahrscheinlichkeit, dass in{' '}
            <b>keinem</b> Ei eine Figur ist.
          </p>
        )
      },
      solution({ data }) {
        const p = 1 / data.n
        const none = (1 - p) * (1 - p)
        return (
          <>
            <BlockMath math="P(\text{keine}) = (1-p)^2" />
            <BlockMath
              math={`= (1-\\tfrac{1}{${data.n}})^2 = ${pp(none)} \\approx ${Math.round(none * 100)}\\%`}
            />
          </>
        )
      },
    },
    {
      points: 4,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return (
          <p>
            <b>3.</b> Ein Ei kostet {pp(data.buyPrice)} €. Paula verkauft eine
            Figur für {pp(data.sellPrice)} €. Lohnt sich der Kauf von 100 Eiern?
          </p>
        )
      },
      solution({ data }) {
        const p = 1 / data.n
        const expectedFigures = 100 * p
        const revenue = expectedFigures * data.sellPrice
        const cost = 100 * data.buyPrice
        const diff = revenue - cost
        return (
          <>
            <InlineMath
              math={`E(\\text{Figuren})=100\\cdot \\tfrac{1}{${data.n}}=${pp(expectedFigures)}`}
            />
            <br />
            <InlineMath
              math={`E(\\text{Gewinn})=${pp(revenue)}- ${pp(cost)}=${pp(diff)}\\,€`}
            />
            <p>
              {diff >= 0
                ? 'Ja, es lohnt sich im Erwartungswert.'
                : 'Nein, im Erwartungswert lohnt es sich nicht.'}
            </p>
          </>
        )
      },
    },
  ],
}
