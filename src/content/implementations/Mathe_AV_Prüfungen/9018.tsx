// exercise9018.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'solarmodule' | 'tischplatten' | 'fenster'

interface DATA {
  kontext: Kontext
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

function getContext(data: DATA) {
  if (data.kontext === 'tischplatten') {
    return {
      intro: (
        <>
          Für einen Werkraum sollen {data.count} rechteckige Tischplatten
          bestellt werden.
        </>
      ),
      item: 'Tischplatte',
      plural: 'Tischplatten',
      priceTask: (
        <>
          Eine Tischplatte kostet {pp(data.price)} €. Beim Kauf von {data.count}{' '}
          Tischplatten gibt es {data.discount} % Rabatt. Berechnen Sie den Preis
          für die Tischplatten.
        </>
      ),
      areaTask: (
        <>
          Eine Tischplatte ist rechteckig und hat die Seitenlänge{' '}
          {pp(data.length)} m und die Breite {pp(data.width)} m. Berechnen Sie
          die gesamte Fläche der Tischplatten.
        </>
      ),
    }
  }

  if (data.kontext === 'fenster') {
    return {
      intro: (
        <>
          In einem Schulgebäude sollen {data.count} rechteckige Fenster
          eingebaut werden.
        </>
      ),
      item: 'Fenster',
      plural: 'Fenster',
      priceTask: (
        <>
          Ein Fenster kostet {pp(data.price)} €. Beim Kauf von {data.count}{' '}
          Fenstern gibt es {data.discount} % Rabatt. Berechnen Sie den Preis für
          die Fenster.
        </>
      ),
      areaTask: (
        <>
          Ein Fenster ist rechteckig und hat die Seitenlänge {pp(data.length)} m
          und die Breite {pp(data.width)} m. Berechnen Sie die gesamte
          Fensterfläche.
        </>
      ),
    }
  }

  return {
    intro: (
      <>Auf dem Dach sollen {data.count} Solarmodule installiert werden.</>
    ),
    item: 'Solarmodul',
    plural: 'Solarmodule',
    priceTask: (
      <>
        Ein Solarmodul kostet {pp(data.price)} €. Beim Kauf von {data.count}{' '}
        Solarmodulen gibt es {data.discount} % Rabatt. Berechnen Sie den Preis
        für die Solarmodule.
      </>
    ),
    areaTask: (
      <>
        Ein Solarmodul ist rechteckig und hat die Seitenlänge {pp(data.length)}{' '}
        m und die Breite {pp(data.width)} m. Berechnen Sie die gesamte Fläche
        der {data.count} Solarmodule.
      </>
    ),
  }
}

export const exercise9018: Exercise<DATA> = {
  title: 'Teil 2: Rabatt und Fläche',
  source: '2025',
  useCalculator: true,
  duration: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'solarmodule',
      'tischplatten',
      'fenster',
    ])

    const count = rng.randomItemFromArray([6, 8, 10, 12, 15])
    const price =
      kontext === 'solarmodule'
        ? rng.randomItemFromArray([285, 320, 335, 360, 410])
        : kontext === 'tischplatten'
          ? rng.randomItemFromArray([85, 120, 145, 180, 220])
          : rng.randomItemFromArray([210, 260, 315, 380, 450])

    const discount = rng.randomItemFromArray([10, 15, 20, 25])
    const finalPrice = round2(count * price * (1 - discount / 100))

    const length =
      kontext === 'solarmodule'
        ? rng.randomItemFromArray([1.2, 1.5, 1.6, 1.8])
        : kontext === 'tischplatten'
          ? rng.randomItemFromArray([1.2, 1.4, 1.6, 1.8])
          : rng.randomItemFromArray([1.0, 1.2, 1.4, 1.5])

    const width =
      kontext === 'solarmodule'
        ? rng.randomItemFromArray([0.6, 0.75, 0.8, 0.9])
        : kontext === 'tischplatten'
          ? rng.randomItemFromArray([0.6, 0.7, 0.8, 0.9])
          : rng.randomItemFromArray([0.6, 0.8, 0.9, 1.0])

    const area = round2(count * length * width)

    return {
      kontext,
      count,
      price,
      discount,
      finalPrice,
      length,
      width,
      area,
    }
  },

  originalData: {
    kontext: 'solarmodule',
    count: 10,
    price: 335,
    discount: 20,
    finalPrice: 2680,
    length: 1.5,
    width: 0.75,
    area: 11.25,
  },

  constraint({ data }) {
    return data.count > 0 && data.price > 0 && data.length > 0 && data.width > 0
  },

  intro({ data }) {
    const context = getContext(data)
    return <p>{context.intro}</p>
  },

  tasks: [
    {
      points: 21,
      intro() {
        return null
      },
      task({ data }) {
        const context = getContext(data)
        return <p>{context.priceTask}</p>
      },
      solution({ data }) {
        const context = getContext(data)
        const fullPrice = round2(data.count * data.price)

        return (
          <>
            <p>Zuerst wird der Preis ohne Rabatt berechnet:</p>
            <InlineMath
              math={`${data.count}\\cdot ${pp(data.price)}=${pp(fullPrice)}\\,€`}
            />
            <br />
            <p>
              Wegen {data.discount} % Rabatt müssen nur {100 - data.discount} %
              bezahlt werden:
            </p>
            <InlineMath math={`W=\\frac{G\\cdot p}{100}`} />
            <br></br>
            <InlineMath
              math={`W=\\frac{${pp(fullPrice)}\\cdot${100 - data.discount}}{100}=${pp(data.finalPrice)}\\,€`}
            />
            <p>
              Die {context.plural} kosten <b>{pp(data.finalPrice)} €</b>.
            </p>
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
        const context = getContext(data)
        return <p>{context.areaTask}</p>
      },
      solution({ data }) {
        const context = getContext(data)
        const singleArea = round2(data.length * data.width)

        return (
          <>
            <p>Eine {context.item} ist eine rechteckige Fläche:</p>
            <InlineMath
              math={`A=a\\cdot b=${pp(data.length)}\\cdot ${pp(
                data.width,
              )}=${pp(singleArea)}\\,\\mathrm{m}^2`}
            />
            <br />
            <p>Insgesamt ist die Fläche:</p>
            <InlineMath
              math={`${data.count}\\cdot ${pp(singleArea)}\\,\\mathrm{m}^2=${pp(
                data.area,
              )}\\,\\mathrm{m}^2`}
            />
          </>
        )
      },
    },
  ],
}
