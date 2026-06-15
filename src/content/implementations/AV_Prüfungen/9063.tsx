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
    const times = ['8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15']
    const visitors = rng.shuffleArray([20, 50, 90, 120, 150, 180, 220])
    const max = Math.max(...visitors)
    return {
      times,
      visitors,
      maxTime: times[visitors.indexOf(max)],
      below100: times.filter((_, index) => visitors[index] < 100),
    }
  },

  originalData: {
    times: [
      '8-9',
      '9-10',
      '10-11',
      '11-12',
      '12-13',
      '13-14',
      '14-15',
      '15-16',
      '16-17',
      '17-18',
      '18-19',
      '19-20',
    ],
    visitors: [15, 45, 90, 150, 200, 220, 195, 150, 105, 70, 40, 20],
    maxTime: '13-14',
    below100: ['8-9', '9-10', '10-11', '17-18', '18-19', '19-20'],
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Das Museum öffnet um 8 Uhr und schließt um 20 Uhr.</p>
        <svg viewBox="0 0 420 220">
          <line x1="40" y1="190" x2="400" y2="190" stroke="black" />
          <line x1="40" y1="20" x2="40" y2="190" stroke="black" />
          {data.visitors.map((value, index) => (
            <rect
              key={index}
              x={55 + index * 28}
              y={190 - value * 0.75}
              width="18"
              height={value * 0.75}
              fill="#999"
              stroke="black"
            />
          ))}
          <text x="35" y="115" fontSize="12" textAnchor="end">
            100
          </text>
          <text x="35" y="40" fontSize="12" textAnchor="end">
            200
          </text>
        </svg>
        <p>Entnehmen Sie, wann die meisten Personen das Museum besuchen.</p>
        <p>
          Geben Sie die Zeiträume an, in denen weniger als 100 Personen da
          sind.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Die meisten Personen besuchen das Museum von {data.maxTime} Uhr. Weniger
        als 100 Personen: {data.below100.join(', ')} Uhr.
      </p>
    )
  },
}
