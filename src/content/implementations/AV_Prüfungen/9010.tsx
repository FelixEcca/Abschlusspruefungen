// exercise9010.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  sunday: number
  monday: number
  tuesdayStartH: number
  tuesdayStartM: number
  tuesdayEndH: number
  tuesdayEndM: number
  wed: number
  thu: number
  totalMinutes: number
  hours: number
  minutes: number
}

export const exercise9010: Exercise<DATA> = {
  title: 'Teil 1: Zeiten',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const sunday = rng.randomItemFromArray([2, 3, 4, 5, 6])
    const monday = rng.randomItemFromArray([1.5, 2.5, 3.5, 4.5])
    const tuesdayStartH = rng.randomItemFromArray([13, 14, 15])
    const tuesdayStartM = rng.randomItemFromArray([0, 15, 30, 45])
    const durationTuesday = rng.randomItemFromArray([150, 180, 210, 225])
    const startTotal = tuesdayStartH * 60 + tuesdayStartM
    const endTotal = startTotal + durationTuesday
    const tuesdayEndH = Math.floor(endTotal / 60)
    const tuesdayEndM = endTotal % 60
    const wed = rng.randomItemFromArray([1, 1.5, 2])
    const thu = rng.randomItemFromArray([1, 1.5, 2])

    const totalMinutes =
      sunday * 60 + monday * 60 + durationTuesday + wed * 60 + thu * 60
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return {
      sunday,
      monday,
      tuesdayStartH,
      tuesdayStartM,
      tuesdayEndH,
      tuesdayEndM,
      wed,
      thu,
      totalMinutes,
      hours,
      minutes,
    }
  },

  originalData: {
    sunday: 6,
    monday: 4.5,
    tuesdayStartH: 14,
    tuesdayStartM: 45,
    tuesdayEndH: 18,
    tuesdayEndM: 30,
    wed: 1.5,
    thu: 1.5,
    totalMinutes: 1035,
    hours: 17,
    minutes: 15,
  },

  constraint({ data }) {
    return data.totalMinutes > 0
  },

  task({ data }) {
    const start = `${data.tuesdayStartH}:${String(data.tuesdayStartM).padStart(2, '0')}`
    const end = `${data.tuesdayEndH}:${String(data.tuesdayEndM).padStart(2, '0')}`

    return (
      <>
        <p>
          Am Sonntag haben Sie {pp(data.sunday)} Stunden, am Montag{' '}
          {pp(data.monday)} Stunden, am Dienstag von {start} Uhr bis {end} Uhr
          und am Mittwoch und Donnerstag jeweils {pp(data.wed)} Stunden Videos
          geschaut.
        </p>
        <p>
          Berechnen Sie, wie viele Stunden und Minuten Sie insgesamt Videos
          geschaut haben.
        </p>
      </>
    )
  },

  solution({ data }) {
    const tuesdayMinutes =
      data.tuesdayEndH * 60 +
      data.tuesdayEndM -
      (data.tuesdayStartH * 60 + data.tuesdayStartM)

    return (
      <>
        <p>Zuerst wird alles in Minuten umgerechnet.</p>
        <InlineMath
          math={`${data.sunday * 60}+${data.monday * 60}+${tuesdayMinutes}+${
            data.wed * 60
          }+${data.thu * 60}=${data.totalMinutes}`}
        />
        <p>
          <InlineMath
            math={`${data.totalMinutes}\\,\\mathrm{min}=${data.hours}\\,\\mathrm{h}\\;${data.minutes}\\,\\mathrm{min}`}
          />
        </p>
      </>
    )
  },
}