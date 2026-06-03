// exercise9040.tsx
import { Exercise } from '@/data/types'
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
          Der Futtervorrat im Zoogeschäft würde für {data.animals1} {animal} für{' '}
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
    const animal = getAnimal(data)
    const totalAnimalDays = data.animals1 * data.days1

    return (
      <>
        <p>Berechne mit dem umgekehrten Dreisatz:</p>

        <svg viewBox="0 0 328 185">
          <image
            href="/content/AV_Prüfungen/Dreisatz.PNG"
            height="185"
            width="328"
          />

          <text x="120" y="12" fontSize="15" textAnchor="middle">
            {animal}
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            Tage
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            {data.animals1}
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {data.days1}
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(totalAnimalDays)}
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {data.animals2}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.days2)}
          </text>

          <text x="30" y="72" fontSize="14">
            : {data.animals1}
          </text>
          <text x="30" y="123" fontSize="14">
            · {data.animals2}
          </text>

          <text x="286" y="72" fontSize="14">
            · {data.animals1}
          </text>
          <text x="286" y="123" fontSize="14">
            : {data.animals2}
          </text>
        </svg>

        <p>
          Der Futtervorrat reicht für <b>{pp(data.days2)} Tage</b>.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zum umgekehrten Dreisatz:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/ISGhREON0T4"
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
