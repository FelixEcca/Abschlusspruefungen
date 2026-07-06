import { Exercise } from '@/data/types'

interface DATA {
  start: string
  end: string
  startTime: string
  rideMinutes: number[]
  timesAfterRide: string[]
  totalRideMinutes: number
}

function formatTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export const exercise9062: Exercise<DATA> = {
  title: 'Teil 1: Fahrplan',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const rideMinutes = Array.from({ length: 5 }, () =>
      rng.randomIntBetween(5, 20),
    )
    const startHour = rng.randomIntBetween(5, 9)
    const startMinute = rng.randomItemFromArray([
      0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,
    ])
    const startMinutesTotal = startHour * 60 + startMinute
    let runningMinutes = startMinutesTotal

    const timesAfterRide = rideMinutes.map(minutes => {
      runningMinutes += minutes
      return formatTime(runningMinutes)
    })

    const totalRideMinutes = rideMinutes.reduce((a, b) => a + b, 0)
    const Startbahnhof = rng.randomItemFromArray([
      'Tauberbischofsheim',
      'Lauda',
      'Lauda',
      'Ludwigsburg',
      'Ludwigsburg',
    ])
    const Zielbahnhof = rng.randomItemFromArray(['Stuttgart Nord'])
    return {
      start: 'Startbahnhof',
      end: 'Zielbahnhof',
      startTime: formatTime(startMinutesTotal),
      rideMinutes,
      timesAfterRide,
      totalRideMinutes,
    }
  },

  originalData: {
    start: 'Tauberbischofsheim',
    end: 'Stuttgart Nord',
    startTime: '07:15',
    rideMinutes: [9, 14, 7, 18, 11],
    timesAfterRide: ['07:24', '07:38', '07:45', '08:03', '08:14'],
    totalRideMinutes: 59,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <svg viewBox="0 0 328 400">
          <image
            href="/content/Mathe_AV/Zugfahrt.png"
            height="400"
            width="328"
          />

          <text x="0" y="25" fontSize="10">
            {data.startTime} Uhr
          </text>
          {data.rideMinutes.map((minutes, index) => (
            <text key={`ride-${index}`} x="0" y={50 + index * 75} fontSize="13">
              {minutes} min
            </text>
          ))}

          {data.timesAfterRide.map((time, index) => (
            <text key={index} x="0" y={105 + index * 71} fontSize="10">
              {time} Uhr
            </text>
          ))}
        </svg>
        <p>Für den Ausflug suchen Sie im Internet nach einer Zugverbindung.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die reine Fahrtzeit beträgt {data.totalRideMinutes} Minuten.</p>

        <p>Insgesamt muss man 2 mal umsteigen.</p>
      </>
    )
  },
}
