import { Exercise } from '@/data/types'

interface DATA {
  start: string
  end: string
  stops: string[]
  rideMinutes: number[]
  transferMinutes: number[]
  changes: number
  pureRideMinutes: number
}

export const exercise9062: Exercise<DATA> = {
  title: 'Teil 1: Fahrplan',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const changes = rng.randomItemFromArray([1, 2, 3])
    const rideMinutes = rng.shuffleArray([12, 25, 40, 55]).slice(0, changes + 1)
    const transferMinutes = rng.shuffleArray([3, 5, 7]).slice(0, changes)
    return {
      start: 'Startbahnhof',
      end: 'Zielbahnhof',
      stops: ['Startbahnhof', 'Bahnhof A', 'Bahnhof B', 'Zielbahnhof'].slice(
        0,
        changes + 2,
      ),
      rideMinutes,
      transferMinutes,
      changes,
      pureRideMinutes: rideMinutes.reduce((a, b) => a + b, 0),
    }
  },

  originalData: {
    start: 'Tauberbischofsheim',
    end: 'Stuttgart Nord',
    stops: ['Tauberbischofsheim', 'Lauda', 'Ludwigsburg', 'Stuttgart Nord'],
    rideMinutes: [6, 90, 12],
    transferMinutes: [3, 7],
    changes: 2,
    pureRideMinutes: 108,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Für den Ausflug suchen Sie im Internet nach einer Zugverbindung.</p>
        <p>
          Die Fahrt führt von {data.start} nach {data.end}. Die reinen
          Fahrzeiten betragen {data.rideMinutes.join(' min, ')} min. Die
          Umsteigezeiten betragen {data.transferMinutes.join(' min, ')} min.
        </p>
        <p>Entnehmen Sie, wie häufig Sie umsteigen müssen.</p>
        <p>Berechnen Sie die reine Fahrtzeit ohne Umsteigezeit.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <p>
        Sie steigen {data.changes}-mal um. Die reine Fahrtzeit beträgt{' '}
        {data.pureRideMinutes} Minuten.
      </p>
    )
  },
}
