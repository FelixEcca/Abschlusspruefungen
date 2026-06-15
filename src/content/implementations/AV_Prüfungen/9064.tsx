import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  activities: string[]
  oldPersons: number[]
  oldHoursPerPerson: number[]
  totalHours: number[]
  newHoursPerPerson: number
  newPersons: number[]
  totalPersons: number
  start: string
}

export const exercise9064: Exercise<DATA> = {
  title: 'Teil 2: Einsatzplan',
  source: '2023',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const activities = ['Stände', 'Tische', 'Getränke', 'Spülbereich']
    const oldPersons = [rng.randomItemFromArray([3, 4, 5]), 4, 8, 6]
    const oldHoursPerPerson = [0.75, 1, 0.5, rng.randomItemFromArray([0.5, 5 / 6, 1])]
    const totalHours = oldPersons.map((p, i) => p * oldHoursPerPerson[i])
    const newHoursPerPerson = 1
    const newPersons = totalHours.map(Math.ceil)
    return {
      activities,
      oldPersons,
      oldHoursPerPerson,
      totalHours,
      newHoursPerPerson,
      newPersons,
      totalPersons: newPersons.reduce((a, b) => a + b, 0),
      start: '13:45 Uhr',
    }
  },

  originalData: {
    activities: [
      'Aufbau Stände',
      'Aufbau Bänke und Tische',
      'Vorbereitung der Getränke',
      'Aufbau Spülbereich',
    ],
    oldPersons: [4, 4, 8, 6],
    oldHoursPerPerson: [0.75, 1, 0.5, 5 / 6],
    totalHours: [3, 4, 4, 5],
    newHoursPerPerson: 1,
    newPersons: [3, 4, 4, 5],
    totalPersons: 16,
    start: '13:45 Uhr',
  },

  constraint({ data }) {
    return data.totalPersons === data.newPersons.reduce((a, b) => a + b, 0)
  },

  task({ data }) {
    return (
      <>
        <p>
          Bei der Abschlussfeier wurde nach einem Plan aufgebaut. In diesem
          Schuljahr soll jede Person genau {pp(data.newHoursPerPerson)} Stunde
          arbeiten.
        </p>
        <table>
          <tbody>
            {data.activities.map((activity, index) => (
              <tr key={activity}>
                <td>{activity}</td>
                <td>{data.oldPersons[index]} Personen</td>
                <td>{pp(data.oldHoursPerPerson[index])} h pro Person</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Erstellen Sie den neuen Einsatzplan.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>
          Gesamte Arbeitszeiten:{' '}
          {data.totalHours.map(value => pp(value)).join(' h, ')} h.
        </p>
        <p>
          Neuer Plan: {data.newPersons.join(', ')} Personen. Insgesamt:{' '}
          <b>{data.totalPersons} Personen</b>. Beginn Aufbau: {data.start}.
        </p>
      </>
    )
  },
}
