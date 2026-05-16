// exercise9025.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

type TimeUnit = 'hours' | 'minutes'

interface DATA {
  startH: number
  startM: number

  kitchenValue: number
  kitchenUnit: TimeUnit

  sleepingValue: number
  sleepingUnit: TimeUnit

  roomValue: number
  roomUnit: TimeUnit

  waitValue: number
  waitUnit: TimeUnit

  totalMin: number
  endH: number
  endM: number
  finished: boolean
}

function toMinutes(value: number, unit: TimeUnit) {
  return unit === 'hours' ? value * 60 : value
}

function timeText(value: number, unit: TimeUnit) {
  if (unit === 'hours') {
    return `${value.toString().replace('.', ',')} Stunden`
  }

  return `${value} Minuten`
}

function clock(h: number, m: number) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export const exercise9025: Exercise<DATA> = {
  title: 'Teil 2: Zeitplanung',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const startH = rng.randomItemFromArray([8, 8, 9])
    const startM = rng.randomItemFromArray([0, 15, 30, 45])

    const kitchenUnit: TimeUnit = rng.randomItemFromArray(['hours', 'minutes'])
    const sleepingUnit: TimeUnit = rng.randomItemFromArray(['hours', 'minutes'])
    const roomUnit: TimeUnit = rng.randomItemFromArray(['hours', 'minutes'])
    const waitUnit: TimeUnit = 'minutes'

    const kitchenValue =
      kitchenUnit === 'hours'
        ? rng.randomItemFromArray([1.5, 2, 2.5, 3])
        : rng.randomItemFromArray([90, 120, 150, 180])

    const sleepingValue =
      sleepingUnit === 'hours'
        ? rng.randomItemFromArray([1, 1.25, 1.5])
        : rng.randomItemFromArray([60, 75, 90])

    const roomValue =
      roomUnit === 'hours'
        ? rng.randomItemFromArray([1, 1.5, 2])
        : rng.randomItemFromArray([60, 90, 120])

    const waitValue = rng.randomItemFromArray([15, 20, 30])

    const totalMin =
      toMinutes(kitchenValue, kitchenUnit) +
      toMinutes(sleepingValue, sleepingUnit) +
      toMinutes(roomValue, roomUnit) +
      toMinutes(waitValue, waitUnit)

    const endTotal = startH * 60 + startM + totalMin
    const endH = Math.floor(endTotal / 60)
    const endM = endTotal % 60
    const finished = endTotal <= 14 * 60

    return {
      startH,
      startM,
      kitchenValue,
      kitchenUnit,
      sleepingValue,
      sleepingUnit,
      roomValue,
      roomUnit,
      waitValue,
      waitUnit,
      totalMin,
      endH,
      endM,
      finished,
    }
  },

  originalData: {
    startH: 8,
    startM: 45,

    kitchenValue: 2.5,
    kitchenUnit: 'hours',

    sleepingValue: 75,
    sleepingUnit: 'minutes',

    roomValue: 90,
    roomUnit: 'minutes',

    waitValue: 15,
    waitUnit: 'minutes',

    totalMin: 330,
    endH: 14,
    endM: 15,
    finished: false,
  },

  constraint({ data }) {
    return data.totalMin > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Am letzten Tag reinigt der Hausmeister die Hütte. Er beginnt um{' '}
          {clock(data.startH, data.startM)} Uhr.
        </p>

        <p>
          Er braucht für die Küche{' '}
          {timeText(data.kitchenValue, data.kitchenUnit)}, für den Schlafraum{' '}
          {timeText(data.sleepingValue, data.sleepingUnit)} und für den
          Aufenthaltsraum {timeText(data.roomValue, data.roomUnit)}. Außerdem
          muss er am Schluss {timeText(data.waitValue, data.waitUnit)} warten,
          bis der Boden getrocknet ist.
        </p>

        <p>Berechnen Sie, ob bis 14 Uhr alles fertig ist.</p>
      </>
    )
  },

  solution({ data }) {
    const kitchenMin = toMinutes(data.kitchenValue, data.kitchenUnit)
    const sleepingMin = toMinutes(data.sleepingValue, data.sleepingUnit)
    const roomMin = toMinutes(data.roomValue, data.roomUnit)
    const waitMin = toMinutes(data.waitValue, data.waitUnit)

    function addMinutes(h: number, m: number, add: number) {
      const total = h * 60 + m + add
      return {
        h: Math.floor(total / 60),
        m: total % 60,
      }
    }

    const afterKitchen = addMinutes(data.startH, data.startM, kitchenMin)
    const afterSleeping = addMinutes(
      afterKitchen.h,
      afterKitchen.m,
      sleepingMin,
    )
    const afterRoom = addMinutes(afterSleeping.h, afterSleeping.m, roomMin)
    const afterWait = addMinutes(afterRoom.h, afterRoom.m, waitMin)

    return (
      <>
        {data.kitchenUnit === 'hours' && (
          <p>
            <InlineMath
              math={`${data.kitchenValue
                .toString()
                .replace(
                  '.',
                  ',',
                )}\\,\\mathrm{h}=${kitchenMin}\\,\\mathrm{min}`}
            />
          </p>
        )}

        {data.sleepingUnit === 'hours' && (
          <p>
            <InlineMath
              math={`${data.sleepingValue
                .toString()
                .replace(
                  '.',
                  ',',
                )}\\,\\mathrm{h}=${sleepingMin}\\,\\mathrm{min}`}
            />
          </p>
        )}

        {data.roomUnit === 'hours' && (
          <p>
            <InlineMath
              math={`${data.roomValue
                .toString()
                .replace('.', ',')}\\,\\mathrm{h}=${roomMin}\\,\\mathrm{min}`}
            />
          </p>
        )}

        <p>
          Küche:
          <br />
          {clock(data.startH, data.startM)} Uhr + {kitchenMin} Minuten →{' '}
          {clock(afterKitchen.h, afterKitchen.m)} Uhr
        </p>

        <p>
          Schlafraum:
          <br />
          {clock(afterKitchen.h, afterKitchen.m)} Uhr + {sleepingMin} Minuten →{' '}
          {clock(afterSleeping.h, afterSleeping.m)} Uhr
        </p>

        <p>
          Aufenthaltsraum:
          <br />
          {clock(afterSleeping.h, afterSleeping.m)} Uhr + {roomMin} Minuten →{' '}
          {clock(afterRoom.h, afterRoom.m)} Uhr
        </p>

        <p>
          Wartezeit:
          <br />
          {clock(afterRoom.h, afterRoom.m)} Uhr + {waitMin} Minuten →{' '}
          {clock(afterWait.h, afterWait.m)} Uhr
        </p>

        <p>
          {data.finished
            ? 'Ja, bis 14 Uhr ist alles fertig.'
            : 'Nein, bis 14 Uhr ist nicht alles fertig.'}
        </p>
      </>
    )
  },
}
