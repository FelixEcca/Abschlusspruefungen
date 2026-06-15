import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'waffelverkauf' | 'schulfest' | 'klassenfest' | 'sporttag'

interface DATA {
  kontext: Kontext
  cost1: number
  cost2: number
  cost3: number
  total: number
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

function getItems(kontext: Kontext) {
  if (kontext === 'schulfest') return ['Getränke', 'Becher', 'Dekoration']
  if (kontext === 'klassenfest') return ['Essen', 'Servietten', 'Spiele']
  if (kontext === 'sporttag') return ['Obst', 'Wasser', 'Material']
  return ['Zutaten', 'Servietten', 'Küchengeräte']
}

export const exercise9052: Exercise<DATA> = {
  title: 'Teil 1: Gesamtkosten',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'waffelverkauf',
      'schulfest',
      'klassenfest',
      'sporttag',
    ])
    const cost1 = rng.randomItemFromArray([28.45, 42.8, 58.93, 64.25])
    const cost2 = rng.randomItemFromArray([4.5, 5.98, 8.75, 12.4])
    const cost3 = rng.randomItemFromArray([15.2, 23.43, 31.6, 44.9])
    const total = round2(cost1 + cost2 + cost3)
    return { kontext, cost1, cost2, cost3, total }
  },

  originalData: {
    kontext: 'waffelverkauf',
    cost1: 58.93,
    cost2: 5.98,
    cost3: 23.43,
    total: 88.34,
  },

  constraint({ data }) {
    return data.total === round2(data.cost1 + data.cost2 + data.cost3)
  },

  task({ data }) {
    const [a, b, c] = getItems(data.kontext)
    return (
      <>
        <p>
          Sie kaufen ein. Für {a} zahlen Sie {pp(data.cost1)} €, für {b}{' '}
          {pp(data.cost2)} € und für {c} {pp(data.cost3)} €.
        </p>
        <p>Berechnen Sie die Gesamtkosten.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${pp(data.cost1)}+${pp(data.cost2)}+${pp(data.cost3)}=${pp(
            data.total,
          )}\\,€`}
        />
      </>
    )
  },
}
