import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  totalProfit: number
  classes: number
  perClass: number
}

export const exercise9057: Exercise<DATA> = {
  title: 'Teil 1: Gewinn aufteilen',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const classes = rng.randomItemFromArray([8, 10, 12, 13, 15])
    const perClass = rng.randomItemFromArray([85, 120, 150, 167, 210])
    const totalProfit = classes * perClass
    return { totalProfit, classes, perClass }
  },

  originalData: {
    totalProfit: 2171,
    classes: 13,
    perClass: 167,
  },

  constraint({ data }) {
    return data.totalProfit === data.classes * data.perClass
  },

  task({ data }) {
    return (
      <>
        <p>
          Der Gewinn der ganzen Schule beträgt insgesamt {pp(data.totalProfit)}{' '}
          €. Der Gewinn wird gleichmäßig unter allen {data.classes} Klassen
          der Schule aufgeteilt.
        </p>
        <p>Berechnen Sie, wie viel jede Klasse bekommt.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <InlineMath
        math={`${pp(data.totalProfit)}:${data.classes}=${pp(data.perClass)}\\,€`}
      />
    )
  },
}
