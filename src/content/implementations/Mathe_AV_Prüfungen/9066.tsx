import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  totalLiter: number
  orangeParts: number
  lemonParts: number
  waterParts: number
  teaParts: number
  partsTotal: number
  orangeLiter: number
  lemonLiter: number
  waterLiter: number
  teaLiter: number
}

export const exercise9066: Exercise<DATA> = {
  title: 'Teil 2: Rezept im Verhältnis',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const totalLiter = rng.randomItemFromArray([24, 36, 42, 48])
    const orangeParts = rng.randomItemFromArray([4, 5, 6])
    const lemonParts = 1
    const waterParts = rng.randomItemFromArray([2, 3])
    const teaParts = rng.randomItemFromArray([3, 4])
    const partsTotal = orangeParts + lemonParts + waterParts + teaParts
    const partLiter = totalLiter / partsTotal
    return {
      totalLiter,
      orangeParts,
      lemonParts,
      waterParts,
      teaParts,
      partsTotal,
      orangeLiter: orangeParts * partLiter,
      lemonLiter: lemonParts * partLiter,
      waterLiter: waterParts * partLiter,
      teaLiter: teaParts * partLiter,
    }
  },

  originalData: {
    totalLiter: 42,
    orangeParts: 5,
    lemonParts: 1,
    waterParts: 2,
    teaParts: 4,
    partsTotal: 12,
    orangeLiter: 17.5,
    lemonLiter: 3.5,
    waterLiter: 7,
    teaLiter: 14,
  },

  constraint({ data }) {
    return data.partsTotal > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Das Mischgetränk wird aus {data.orangeParts} Teilen Orangensaft,{' '}
          {data.lemonParts} Teil Zitronensaft, {data.waterParts} Teilen
          Mineralwasser und {data.teaParts} Teilen Tee zubereitet.
        </p>
        <p>
          Sie möchten {data.totalLiter} Liter herstellen. Erstellen Sie eine
          Liste der benötigten Zutaten mit Mengen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Ein Teil sind {pp(data.totalLiter / data.partsTotal)} l. Orangensaft:{' '}
        {pp(data.orangeLiter)} l, Zitronensaft: {pp(data.lemonLiter)} l,
        Mineralwasser: {pp(data.waterLiter)} l, Tee: {pp(data.teaLiter)} l.
      </p>
    )
  },
}
