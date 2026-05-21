// exercise9040.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'kaninchen' | 'hunde' | 'katzen' | 'vögel'

interface DATA {
  kontext: Kontext
  animals1: number
  days1: number
  sold: number
  animals2: number
  days2: number
}

function getAnimal(data: DATA) {
  if (data.kontext === 'hunde') return 'Hunde'
  if (data.kontext === 'katzen') return 'Katzen'
  if (data.kontext === 'vögel') return 'Vögel'
  return 'Kaninchen'
}

export const exercise9040: Exercise<DATA> = {
  title: 'Teil 2: Futtervorrat',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'kaninchen',
      'hunde',
      'katzen',
      'vögel',
    ])

    const animals1 = rng.randomItemFromArray([8, 10, 12, 15, 20])
    const days1 = rng.randomItemFromArray([10, 15, 20, 24, 30])
    const sold = rng.randomIntBetween(2, Math.floor(animals1 / 2))
    const animals2 = animals1 - sold
    const days2 = (animals1 * days1) / animals2

    return { kontext, animals1, days1, sold, animals2, days2 }
  },

  originalData: {
    kontext: 'kaninchen',
    animals1: 12,
    days1: 20,
    sold: 4,
    animals2: 8,
    days2: 30,
  },

  constraint({ data }) {
    return Number.isInteger(data.days2)
  },

  task({ data }) {
    const animal = getAnimal(data)

    return (
      <>
        <p>
          Der Futtervorrat im Geschäft würde für {data.animals1} {animal} für{' '}
          {data.days1} Tage reichen.
        </p>
        <p>
          {data.sold} {animal} werden verkauft.
        </p>
        <p>
          Berechnen Sie, für wie viele Tage der Futtervorrat dann ausreicht.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die Futtermenge bleibt gleich.</p>
        <p>Zuerst berechnen wir die Tier-Tage:</p>
        <InlineMath
          math={`${data.animals1}\\cdot ${data.days1}=${data.animals1 * data.days1}`}
        />

        <p>Danach teilen wir durch die neue Anzahl der Tiere:</p>
        <InlineMath
          math={`${data.animals1 * data.days1}:${data.animals2}=${pp(
            data.days2,
          )}`}
        />

        <p>
          Der Futtervorrat reicht für <b>{pp(data.days2)} Tage</b>.
        </p>
      </>
    )
  },
}
