// exercise9045.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'sitzecke' | 'garten' | 'esszimmer' | 'buero' | 'camping'

interface DATA {
  kontext: Kontext
  areaName: string
  chairName: string
  tableName: string
  neededChairs: number
  includedChairs: number
  chairPrice: number
  tablePrice: number
  setPrice: number
  option1: number
  option2: number
  difference: number
}

function getContext(kontext: Kontext) {
  if (kontext === 'garten') {
    return {
      areaName: 'Gartenecke',
      chairName: 'Gartenstuhl',
      tableName: 'Gartentisch',
    }
  }

  if (kontext === 'esszimmer') {
    return {
      areaName: 'Essecke',
      chairName: 'Stuhl',
      tableName: 'Esstisch',
    }
  }

  if (kontext === 'buero') {
    return {
      areaName: 'Besprechungsecke',
      chairName: 'Bürostuhl',
      tableName: 'Besprechungstisch',
    }
  }

  if (kontext === 'camping') {
    return {
      areaName: 'Campingecke',
      chairName: 'Campingstuhl',
      tableName: 'Campingtisch',
    }
  }

  return {
    areaName: 'Sitzecke',
    chairName: 'Sessel',
    tableName: 'Tisch',
  }
}

export const exercise9045: Exercise<DATA> = {
  title: 'Teil 2: Günstiger vergleichen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'sitzecke',
      'garten',
      'esszimmer',
      'buero',
      'camping',
    ])

    const context = getContext(kontext)

    const neededChairs = rng.randomItemFromArray([5, 6, 7, 8])
    const includedChairs = rng.randomItemFromArray([3, 4])
    const extraChairs = neededChairs - includedChairs

    const chairPrice = rng.randomItemFromArray([89, 99, 129, 149, 179, 199])
    const tablePrice = rng.randomItemFromArray([199, 249, 299, 349])

    const option1 = neededChairs * chairPrice + tablePrice

    const setDiscount = rng.randomItemFromArray([40, 60, 80, 100, 120])
    const setPrice = includedChairs * chairPrice + tablePrice - setDiscount

    const option2 = setPrice + extraChairs * chairPrice
    const difference = Math.abs(option1 - option2)

    return {
      kontext,
      areaName: context.areaName,
      chairName: context.chairName,
      tableName: context.tableName,
      neededChairs,
      includedChairs,
      chairPrice,
      tablePrice,
      setPrice,
      option1,
      option2,
      difference,
    }
  },

  originalData: {
    kontext: 'sitzecke',
    areaName: 'Sitzecke',
    chairName: 'Sessel',
    tableName: 'Tisch',
    neededChairs: 5,
    includedChairs: 3,
    chairPrice: 199,
    tablePrice: 249,
    setPrice: 769,
    option1: 1244,
    option2: 1167,
    difference: 77,
  },

  constraint({ data }) {
    return (
      data.neededChairs > data.includedChairs &&
      data.option1 > 0 &&
      data.option2 > 0
    )
  },

  task({ data }) {
    const extraChairs = data.neededChairs - data.includedChairs

    return (
      <>
        <p>
          Für eine {data.areaName} wollen Sie {data.neededChairs}{' '}
          {data.chairName} und einen {data.tableName} kaufen.
        </p>

        <p>
          Der {data.tableName} kostet {pp(data.tablePrice)} €. Ein einzelner{' '}
          {data.chairName} kostet {pp(data.chairPrice)} €.
          <br />
          Es gibt auch ein Set für {pp(data.setPrice)} € aus{' '}
          {data.includedChairs} {data.chairName}
          {data.includedChairs === 1 ? '' : 'n'} und dem {data.tableName}.
        </p>

        <p>Sie haben zwei Möglichkeiten:</p>

        <ol>
          <li>
            Sie können die {data.neededChairs} {data.chairName} und den{' '}
            {data.tableName} einzeln kaufen oder
          </li>
          <li>
            das Set und {extraChairs} {data.chairName} dazu.
          </li>
        </ol>

        <p>Berechnen Sie, welche Möglichkeit günstiger ist.</p>
      </>
    )
  },

  solution({ data }) {
    const extraChairs = data.neededChairs - data.includedChairs

    return (
      <>
        <p>Möglichkeit 1: Alles einzeln kaufen.</p>

        <InlineMath
          math={`${data.neededChairs}\\cdot ${pp(
            data.chairPrice,
          )}+${pp(data.tablePrice)}=${pp(data.option1)}\\,€`}
        />

        <p>
          Möglichkeit 2: Das Set und die fehlenden {extraChairs} dazu kaufen.
        </p>

        <InlineMath
          math={`${pp(data.setPrice)}+${extraChairs}\\cdot ${pp(
            data.chairPrice,
          )}=${pp(data.option2)}\\,€`}
        />

        <p>Jetzt werden beide Möglichkeiten verglichen:</p>

        <p>
          <b>
            {data.option1 < data.option2 ? 'Möglichkeit 1' : 'Möglichkeit 2'}
          </b>{' '}
          ist günstiger.
        </p>
      </>
    )
  },
}
