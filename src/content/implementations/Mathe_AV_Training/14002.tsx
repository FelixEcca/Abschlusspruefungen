import { Exercise } from '@/data/types'

interface DATA {
  originalPrice: number
  discountPercent: number
}

export const exercise14002: Exercise<DATA> = {
  title: 'Rabatt berechnen',
  source: 'AV Mathematik',
  useCalculator: false,
  duration: 5,
  points: 2,
  generator(rng) {
    return {
      originalPrice: rng.randomIntBetween(-100, 100, 10),
      discountPercent: rng.randomIntBetween(-200, 200, 10),
    }
  },
  originalData: {
    originalPrice: 40,
    discountPercent: 150,
  },
  task({ data }) {
    return (
      <p>
        Ein Pulover kostet {data.originalPrice} €. Im Schlussverkauf wird sein
        Preis um {data.discountPercent} % reduziert. Berechne den neuen
        Verkaufspreis.
      </p>
    )
  },
  solution({ data }) {
    const discount = (data.originalPrice * data.discountPercent) / 100
    const newPrice = data.originalPrice - discount

    return (
      <p>
        {data.discountPercent} % von {data.originalPrice} € sind {discount} €.
        Der neue Verkaufspreis beträgt {newPrice} €.
      </p>
    )
  },
}
