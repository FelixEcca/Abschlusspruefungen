// exercise9022.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  helmets: number
  helmetPrice: number
  gloves: number
  glovePrice: number
  pants: number
  pantsPrice: number
  shoes: number
  shoePrice: number
  total: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9022: Exercise<DATA> = {
  title: 'Teil 2: Gesamtpreis',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const helmets = rng.randomIntBetween(2, 6)
    const gloves = rng.randomIntBetween(3, 8)
    const pants = rng.randomIntBetween(2, 6)
    const shoes = rng.randomIntBetween(1, 5)

    const helmetPrice = rng.randomItemFromArray([29.9, 34.9, 39.9, 44.9])
    const glovePrice = rng.randomItemFromArray([14.95, 19.95, 24.95])
    const pantsPrice = rng.randomItemFromArray([69.8, 82.8, 89.9])
    const shoePrice = rng.randomItemFromArray([79.97, 91.97, 99.95])

    const total = round2(
      helmets * helmetPrice +
        gloves * glovePrice +
        pants * pantsPrice +
        shoes * shoePrice,
    )

    return {
      helmets,
      helmetPrice,
      gloves,
      glovePrice,
      pants,
      pantsPrice,
      shoes,
      shoePrice,
      total,
    }
  },

  originalData: {
    helmets: 3,
    helmetPrice: 39.9,
    gloves: 5,
    glovePrice: 19.95,
    pants: 4,
    pantsPrice: 82.8,
    shoes: 2,
    shoePrice: 91.97,
    total: 734.93,
  },

  constraint({ data }) {
    return data.total > 0
  },

  task({ data }) {
    return (
      <>
        <p>Zum Arbeiten im Wald kaufen Sie noch weiteres Material.</p>
        <p>Sie entscheiden sich, folgende Schutzausrüstung zu bestellen:</p>
        <p>
          {data.helmets} Helme zu je {pp(data.helmetPrice)} €
          <br />
          {data.gloves} Paar Arbeitshandschuhe zu je {pp(data.glovePrice)} €
          <br />
          {data.pants} Arbeitshosen zu je {pp(data.pantsPrice)} €
          <br />
          {data.shoes} Paar Arbeitsschuhe zu je {pp(data.shoePrice)} €
        </p>
        <p>Berechnen Sie den Gesamtpreis für Ihre Bestellung.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${data.helmets}\\cdot ${pp(data.helmetPrice)}+${data.gloves}\\cdot ${pp(data.glovePrice)}+${data.pants}\\cdot ${pp(data.pantsPrice)}+${data.shoes}\\cdot ${pp(data.shoePrice)}=${pp(data.total)}`}
        />
        <p>
          Der Gesamtpreis beträgt <b>{pp(data.total)} €</b>.
        </p>
      </>
    )
  },
}
