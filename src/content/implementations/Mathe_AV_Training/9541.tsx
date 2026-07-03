// exercise9541.tsx
import { Exercise } from '@/data/types'

interface DATA {
  startH: number
  startM: number
  add: number
  endH: number
  endM: number
}

function clock(h: number, m: number) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function addMinutes(h: number, m: number, add: number) {
  const total = h * 60 + m + add
  return { h: Math.floor(total / 60), m: total % 60 }
}

export const exercise9541: Exercise<DATA> = {
  title: 'Zeit addieren',
  source: 'Zeit',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const startH = rng.randomItemFromArray([7, 8, 9, 10, 11])
    const startM = rng.randomItemFromArray([0, 15, 30, 45])
    const add = rng.randomItemFromArray([20, 30, 45, 60, 75, 90, 120])
    const end = addMinutes(startH, startM, add)

    return { startH, startM, add, endH: end.h, endM: end.m }
  },

  originalData: {
    startH: 8,
    startM: 45,
    add: 75,
    endH: 10,
    endM: 0,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <p>
        Start ist um {clock(data.startH, data.startM)} Uhr. Die Tätigkeit dauert{' '}
        {data.add} Minuten. Wann ist sie fertig?
      </p>
    )
  },

  solution({ data }) {
    return (
      <p>
        {clock(data.startH, data.startM)} Uhr + {data.add} Minuten →{' '}
        <b>{clock(data.endH, data.endM)} Uhr</b>
      </p>
    )
  },
}