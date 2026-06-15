import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  retailYear1: number
  retailYear2: number
  careYear1: number
  careYear2: number
  difference: number
  percentMore: number
}

export const exercise9068: Exercise<DATA> = {
  title: 'Teil 2: Ausbildungsgehälter',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const retailYear1 = rng.randomItemFromArray([850, 900, 960])
    const retailYear2 = rng.randomItemFromArray([1000, 1065, 1120])
    const careYear1 = rng.randomItemFromArray([580, 610, 650])
    const careYear2 = rng.randomItemFromArray([700, 720, 760])
    const difference = retailYear2 - careYear2
    const percentMore = (difference / careYear2) * 100
    return {
      retailYear1,
      retailYear2,
      careYear1,
      careYear2,
      difference,
      percentMore,
    }
  },

  originalData: {
    retailYear1: 960,
    retailYear2: 1065,
    careYear1: 610,
    careYear2: 720,
    difference: 345,
    percentMore: 47.9166666667,
  },

  constraint({ data }) {
    return data.difference === data.retailYear2 - data.careYear2
  },

  task({ data }) {
    return (
      <>
        <p>Sie vergleichen Ausbildungsgehälter.</p>
        <p>
          Einzelhandel: {pp(data.retailYear1)} € im 1. Jahr und{' '}
          {pp(data.retailYear2)} € im 2. Jahr. Körperpflege:{' '}
          {pp(data.careYear1)} € im 1. Jahr und {pp(data.careYear2)} € im 2.
          Jahr.
        </p>
        <p>
          Berechnen Sie, wie viel Prozent Sie im 2. Ausbildungsjahr im
          Einzelhandel mehr verdienen als in der Körperpflege.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`${data.difference}:${data.careYear2}\\cdot 100=${pp(
          data.percentMore,
        )}\\,\\%`}
      />
    )
  },
}
