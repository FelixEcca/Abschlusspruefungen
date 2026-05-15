// exercise9018.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  count: number
  price: number
  discount: number
  finalPrice: number
  length: number
  width: number
  area: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9018: Exercise<DATA> = {
  title: 'Teil 2: Solarmodule',
  source: '2025',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const count = rng.randomItemFromArray([6, 8, 10, 12, 15])
    const price = rng.randomItemFromArray([285, 320, 335, 360, 410])
    const discount = rng.randomItemFromArray([10, 15, 20, 25])
    const finalPrice = round2(count * price * (1 - discount / 100))
    const length = rng.randomItemFromArray([1.2, 1.5, 1.6, 1.8])
    const width = rng.randomItemFromArray([0.6, 0.75, 0.8, 0.9])
    const area = round2(count * length * width)
    return { count, price, discount, finalPrice, length, width, area }
  },

  originalData: {
    count: 10,
    price: 335,
    discount: 20,
    finalPrice: 2680,
    length: 1.5,
    width: 0.75,
    area: 11.25,
  },

  constraint({ data }) {
    return data.count > 0
  },

  intro({ data }) {
    return (
      <p>Auf dem Dach sollen {data.count} Solarmodule installiert werden.</p>
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
            Ein Solarmodul kostet {pp(data.price)} €. Beim Kauf von {data.count}{' '}
            Solarmodulen gibt es {data.discount} % Rabatt. Berechnen Sie den
            Preis für die Solarmodule.
          </p>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath
              math={`${data.count}\\cdot ${pp(data.price)}=${pp(
                data.count * data.price,
              )}`}
            />
            <br />
            <InlineMath
              math={`${pp(data.count * data.price)}\\cdot \\frac{${
                100 - data.discount
              }}{100}=${pp(data.finalPrice)}\\,€`}
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
            Ein Solarmodul ist rechteckig und hat die Seitenlänge{' '}
            {pp(data.length)} m und die Breite {pp(data.width)} m. Berechnen Sie
            die gesamte Fläche der Solarmodule.
          </p>
        )
      },
      solution({ data }) {
        return (
          <InlineMath
            math={`${data.count}\\cdot ${pp(data.length)}\\cdot ${pp(
              data.width,
            )}=${pp(data.area)}\\,\\mathrm{m}^2`}
          />
        )
      },
    },
  ],
}
