// exercise9041.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'preisschild' | 'jacke' | 'fahrrad' | 'gerät'

interface DATA {
  kontext: Kontext
  oldPrice: number
  discount: number
  discountValue: number
  newPrice: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'jacke') {
    return `Eine Jacke kostet bisher ${pp(data.oldPrice)} €. Der neue Preis soll ${data.discount} % weniger sein.`
  }

  if (data.kontext === 'fahrrad') {
    return `Ein Fahrrad kostet bisher ${pp(data.oldPrice)} €. Der neue Preis soll ${data.discount} % weniger sein.`
  }

  if (data.kontext === 'gerät') {
    return `Ein Gerät kostet bisher ${pp(data.oldPrice)} €. Der neue Preis soll ${data.discount} % weniger sein.`
  }

  return `Der Preis beträgt bisher ${pp(data.oldPrice)} €. Der neue Preis soll ${data.discount} % weniger sein.`
}

export const exercise9041: Exercise<DATA> = {
  title: 'Teil 2: Preis senken',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'preisschild',
      'jacke',
      'fahrrad',
      'gerät',
    ])
    const oldPrice = rng.randomItemFromArray([80, 120, 150, 170, 200, 250])
    const discount = rng.randomItemFromArray([10, 20, 25, 30, 40])
    const discountValue = round2((oldPrice * discount) / 100)
    const newPrice = round2(oldPrice - discountValue)

    return { kontext, oldPrice, discount, discountValue, newPrice }
  },

  originalData: {
    kontext: 'preisschild',
    oldPrice: 170,
    discount: 30,
    discountValue: 51,
    newPrice: 119,
  },

  constraint({ data }) {
    return data.newPrice > 0
  },

  task({ data }) {
    return (
      <>
        <p>{getContext(data)}</p>
        <p>Berechnen Sie den neuen Preis.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Berechne zuerst den Preisnachlass:</p>
        <InlineMath
          math={`W=\\frac{G\\cdot p}{100}=\\frac{${pp(data.oldPrice)}\\cdot ${
            data.discount
          }}{100}=${pp(data.discountValue)}\\,€`}
        />

        <p>Dann wird der Nachlass abgezogen:</p>
        <InlineMath
          math={`${pp(data.oldPrice)}-${pp(data.discountValue)}=${pp(
            data.newPrice,
          )}\\,€`}
        />

        <p>
          Der neue Preis beträgt <b>{pp(data.newPrice)} €</b>.
        </p>
      </>
    )
  },
}
