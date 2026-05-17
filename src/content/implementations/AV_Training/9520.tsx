// exercise9520.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  price: number
  discount: number
  finalPrice: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9520: Exercise<DATA> = {
  title: 'Rabatt berechnen',
  source: 'Prozentrechnen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const price = rng.randomItemFromArray([80, 120, 150, 200, 250, 320, 450])
    const discount = rng.randomItemFromArray([10, 15, 20, 25, 30])
    const finalPrice = round2((price * (100 - discount)) / 100)

    return { price, discount, finalPrice }
  },

  originalData: {
    price: 335,
    discount: 20,
    finalPrice: 268,
  },

  constraint({ data }) {
    return data.finalPrice > 0
  },

  task({ data }) {
    return (
      <p>
        Ein Artikel kostet {pp(data.price)} €. Es gibt {data.discount} % Rabatt.
        Berechnen Sie den neuen Preis.
      </p>
    )
  },

 // Lösung für exercise9520 ersetzen durch:

solution({ data }) {
  const rabatt = Math.round((data.price * data.discount) / 100 * 100) / 100

  return (
    <>
      <p>Berechne den Prozentwert:</p>
      <InlineMath math={`W=\\frac{G\\cdot p}{100}`} />
      <br />
      <InlineMath
        math={`W=\\frac{${pp(data.price)}\\cdot ${data.discount}}{100}=${pp(
          rabatt,
        )}\\,€`}
      />

      <p>Der Rabatt wird vom alten Preis abgezogen:</p>
      <InlineMath
        math={`${pp(data.price)}-${pp(rabatt)}=${pp(data.finalPrice)}\\,€`}
      />
    </>
  )
},
}