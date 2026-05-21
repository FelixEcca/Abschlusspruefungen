// exercise9045.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'sesseleck' | 'terrasse' | 'wohnzimmer' | 'garten'

interface DATA {
  kontext: Kontext
  chairPrice: number
  tablePrice: number
  setPrice: number
  extraChairs: number
  option1: number
  option2: number
}

export const exercise9045: Exercise<DATA> = {
  title: 'Teil 2: Günstiger vergleichen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'sesseleck',
      'terrasse',
      'wohnzimmer',
      'garten',
    ])

    const chairPrice = rng.randomItemFromArray([99, 149, 199])
    const tablePrice = rng.randomItemFromArray([199, 249, 299])
    const setPrice = rng.randomItemFromArray([699, 769, 849])

    const extraChairs = 2

    const option1 = 5 * chairPrice + tablePrice
    const option2 = setPrice + extraChairs * chairPrice

    return {
      kontext,
      chairPrice,
      tablePrice,
      setPrice,
      extraChairs,
      option1,
      option2,
    }
  },

  originalData: {
    kontext: 'sesseleck',
    chairPrice: 199,
    tablePrice: 249,
    setPrice: 769,
    extraChairs: 2,
    option1: 1244,
    option2: 1167,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Sie möchten 5 Sessel und einen Tisch kaufen.</p>

        <p>Der Tisch kostet {pp(data.tablePrice)} €.</p>

        <p>Ein einzelner Sessel kostet {pp(data.chairPrice)} €.</p>

        <p>
          Es gibt auch ein Set für {pp(data.setPrice)} € aus 3 Sesseln und dem
          Tisch.
        </p>

        <p>Berechnen Sie, welche Möglichkeit günstiger ist.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Möglichkeit 1:</p>

        <InlineMath
          math={`5\\cdot ${data.chairPrice}+${data.tablePrice}=${data.option1}`}
        />

        <p>Möglichkeit 2:</p>

        <InlineMath
          math={`${data.setPrice}+2\\cdot ${data.chairPrice}=${data.option2}`}
        />

        <p>
          Günstiger ist{' '}
          <b>
            {data.option1 < data.option2 ? 'Möglichkeit 1' : 'Möglichkeit 2'}
          </b>
          .
        </p>
      </>
    )
  },
}
