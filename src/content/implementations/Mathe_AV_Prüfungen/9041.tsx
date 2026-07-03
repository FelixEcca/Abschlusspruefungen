// exercise9041.tsx
import { Exercise } from '@/data/types'
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
  title: 'Teil 2: Neuer Preis',
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
    const targetPercent = 100 - data.discount

    return (
      <>
        <p>Berechne mit dem Dreisatz den neuen Preis direkt:</p>

        <svg viewBox="0 0 328 185">
          <image
            href="/content/AV_Prüfungen/Dreisatz.PNG"
            height="185"
            width="328"
          />

          <text x="120" y="12" fontSize="15" textAnchor="middle">
            %
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            €
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            100
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.oldPrice)}
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(data.oldPrice / 100)}
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {targetPercent}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.newPrice)}
          </text>

          <text x="14" y="72" fontSize="14">
            : 100
          </text>
          <text x="18" y="123" fontSize="14">
            · {targetPercent}
          </text>

          <text x="280" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {targetPercent}
          </text>
        </svg>

        <p>
          Der neue Preis beträgt <b>{pp(data.newPrice)} €</b>.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum Prozentwert:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/w4c6fNktgx0"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
