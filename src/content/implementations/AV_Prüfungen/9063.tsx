import { Exercise } from '@/data/types'

interface DATA {
  times: string[]
  visitors: number[]
  maxTime: string
  below100: string[]
}

export const exercise9063: Exercise<DATA> = {
  title: 'Teil 1: Besucherschaubild',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const times = [
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
    ]

    const peakIndex = rng.randomItemFromArray([4, 5, 6, 7])
    const peakHeight = rng.randomItemFromArray([200, 210, 220])
    const slopeLeft = rng.randomItemFromArray([20, 24, 28])
    const slopeRight = rng.randomItemFromArray([20, 24, 28])

    const visitors = times.map((_, i) => {
      const distance =
        i < peakIndex
          ? (peakIndex - i) * slopeLeft
          : (i - peakIndex) * slopeRight
      const noise = rng.randomIntBetween(-12, 12)
      return Math.max(10, peakHeight - distance + noise)
    })

    const extraDipCandidates = [3, 4, 7, 8].filter(i => i !== peakIndex)
    const extraDipCount = rng.randomIntBetween(1, 2)
    const extraDipIndices = rng
      .shuffleArray(extraDipCandidates)
      .slice(0, extraDipCount)
    extraDipIndices.forEach(i => {
      visitors[i] = Math.max(35, visitors[i] - rng.randomIntBetween(30, 65))
    })

    const hasAdditionalBelow100 = visitors.some(
      (v, i) => v < 100 && i >= 3 && i <= 8,
    )
    if (!hasAdditionalBelow100) {
      const forcedLowIndex = rng.randomItemFromArray(extraDipCandidates)
      visitors[forcedLowIndex] = rng.randomIntBetween(70, 95)
    }

    const otherMax = Math.max(...visitors.filter((_, i) => i !== peakIndex))
    visitors[peakIndex] = Math.max(
      visitors[peakIndex],
      otherMax + rng.randomIntBetween(8, 18),
    )

    const max = Math.max(...visitors)
    const maxIndex = visitors.indexOf(max)

    return {
      times,
      visitors,
      maxTime: times[maxIndex],
      below100: times.filter((_, index) => visitors[index] < 100),
    }
  },

  originalData: {
    times: [
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
    ],
    visitors: [15, 80, 100, 110, 180, 220, 195, 150, 110, 80, 40, 20],
    maxTime: '13:00-14:00',
    below100: [
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
    ],
  },

  constraint({ data }) {
    if (data.times.length !== 12 || data.visitors.length !== 12) return false
    const max = Math.max(...data.visitors)
    const maxTime = data.times[data.visitors.indexOf(max)]
    const below100 = data.times.filter((_, i) => data.visitors[i] < 100)

    return (
      data.maxTime === maxTime &&
      data.below100.length === below100.length &&
      data.below100.every((slot, i) => slot === below100[i])
    )
  },

  task({ data }) {
    return (
      <>
        <p>Das Museum öffnet um 8 Uhr und schließt um 20 Uhr.</p>
        <p>
          Im Internet finden Sie folgendes Diagramm zum Besucherandrang im
          Museum:
        </p>
        <svg viewBox="0 0 420 220">
          <text
            x="210"
            y="16"
            fontSize="13"
            fontWeight="bold"
            textAnchor="middle"
          >
            Anzahl der Besucher nach Uhrzeit
          </text>

          <line x1="40" y1="190" x2="402" y2="190" stroke="black" />
          <polygon points="402,190 394,186 394,194" fill="black" />

          <line x1="40" y1="190" x2="400" y2="190" stroke="black" />
          <line x1="40" y1="20" x2="40" y2="190" stroke="black" />

          <line x1="40" y1="115" x2="400" y2="115" stroke="black" />
          <line x1="40" y1="40" x2="400" y2="40" stroke="black" />

          {data.visitors.map((value, index) => (
            <rect
              key={index}
              x={41 + index * 30}
              y={190 - value * 0.75}
              width="28"
              height={value * 0.75}
              fill="#9a9a9a"
              stroke="black"
            />
          ))}

          <text x="35" y="115" fontSize="12" textAnchor="end">
            100
          </text>
          <text x="35" y="40" fontSize="12" textAnchor="end">
            200
          </text>

          <text x="76" y="210" fontSize="11" textAnchor="middle">
            09:00
          </text>
          <text x="166" y="210" fontSize="11" textAnchor="middle">
            12:00
          </text>
          <text x="256" y="210" fontSize="11" textAnchor="middle">
            15:00
          </text>
          <text x="346" y="210" fontSize="11" textAnchor="middle">
            18:00
          </text>
        </svg>
        <p>
          Entnehmen Sie aus dem Schaubild, wann die meisten Personen das Museum
          besuchen.
        </p>
        <p>
          Geben Sie die Zeiträume an, in denen weniger als 100 Personen das
          Museum besuchen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Die meisten Personen besuchen das Museum von {data.maxTime} Uhr. Weniger
        als 100 Personen sind im Museum in den Zeiträumen{' '}
        {data.below100.join(', ')} Uhr.
      </p>
    )
  },
}
