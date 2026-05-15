// exercise9025.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  startH: number
  startM: number
  kitchenMin: number
  sleepingMin: number
  roomMin: number
  waitMin: number
  endH: number
  endM: number
  finished: boolean
}

export const exercise9025: Exercise<DATA> = {
  title: 'Teil 2: Zeitplanung',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const startH = rng.randomItemFromArray([7, 8, 9])
    const startM = rng.randomItemFromArray([0, 15, 30, 45])
    const kitchenMin = rng.randomItemFromArray([90, 120, 150, 180])
    const sleepingMin = rng.randomItemFromArray([60, 75, 90])
    const roomMin = rng.randomItemFromArray([60, 90, 120])
    const waitMin = rng.randomItemFromArray([15, 30])

    const total =
      startH * 60 + startM + kitchenMin + sleepingMin + roomMin + waitMin
    const endH = Math.floor(total / 60)
    const endM = total % 60
    const finished = total <= 14 * 60

    return {
      startH,
      startM,
      kitchenMin,
      sleepingMin,
      roomMin,
      waitMin,
      endH,
      endM,
      finished,
    }
  },

  originalData: {
    startH: 8,
    startM: 45,
    kitchenMin: 150,
    sleepingMin: 75,
    roomMin: 90,
    waitMin: 15,
    endH: 14,
    endM: 15,
    finished: false,
  },

  constraint({ data }) {
    return data.kitchenMin > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Am letzten Tag reinigt der Hausmeister die Hütte. Er beginnt um{' '}
          {String(data.startH).padStart(2, '0')}:
          {String(data.startM).padStart(2, '0')} Uhr.
        </p>
        <p>
          Er braucht für die Küche {data.kitchenMin} Minuten, für den Schlafraum{' '}
          {data.sleepingMin} Minuten und für den Aufenthaltsraum {data.roomMin}{' '}
          Minuten. Außerdem muss er am Schluss {data.waitMin} Minuten warten,
          bis der Boden getrocknet ist.
        </p>
        <p>Berechnen Sie, ob bis 14 Uhr alles fertig ist.</p>
      </>
    )
  },

  solution({ data }) {
    const total =
      data.kitchenMin + data.sleepingMin + data.roomMin + data.waitMin
    return (
      <>
        <p>Zuerst werden die Zeiten addiert.</p>
        <InlineMath
          math={`${data.kitchenMin}+${data.sleepingMin}+${data.roomMin}+${data.waitMin}=${total}\\,\\mathrm{min}`}
        />
        <p>Endzeit:</p>
        <InlineMath
          math={`${String(data.startH).padStart(2, '0')}:${String(
            data.startM,
          ).padStart(2, '0')}+${total}\\,\\mathrm{min}=${String(
            data.endH,
          ).padStart(2, '0')}:${String(data.endM).padStart(2, '0')}`}
        />
        <p>
          {data.finished
            ? 'Ja, bis 14 Uhr ist alles fertig.'
            : 'Nein, bis 14 Uhr ist nicht alles fertig.'}
        </p>
      </>
    )
  },
}
