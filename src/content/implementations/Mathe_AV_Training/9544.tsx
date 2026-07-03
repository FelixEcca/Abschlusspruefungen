// exercise9544.tsx
import { Exercise } from '@/data/types'

interface DATA {
  startH: number
  startM: number
  items: number[]
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

export const exercise9544: Exercise<DATA> = {
  title: 'Zeitplan Schritt für Schritt',
  source: 'Zeit',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const startH = rng.randomItemFromArray([7, 8, 9])
    const startM = rng.randomItemFromArray([0, 15, 30, 45])
    const items = [
      rng.randomItemFromArray([30, 45, 60, 75]),
      rng.randomItemFromArray([20, 30, 45, 60]),
      rng.randomItemFromArray([15, 30, 45]),
    ]

    let h = startH
    let m = startM

    items.forEach(item => {
      const next = addMinutes(h, m, item)
      h = next.h
      m = next.m
    })

    return { startH, startM, items, endH: h, endM: m }
  },

  originalData: {
    startH: 8,
    startM: 45,
    items: [150, 75, 90, 15],
    endH: 14,
    endM: 15,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <>
        <p>Ein Zeitplan beginnt um {clock(data.startH, data.startM)} Uhr.</p>
        <p>Die Tätigkeiten dauern nacheinander: {data.items.join(' min, ')} min.</p>
        <p>Berechnen Sie die Endzeit.</p>
      </>
    )
  },

  solution({ data }) {
    let h = data.startH
    let m = data.startM

    return (
      <>
        {data.items.map((item, index) => {
          const start = clock(h, m)
          const next = addMinutes(h, m, item)
          h = next.h
          m = next.m

          return (
            <p key={index}>
              {start} Uhr + {item} Minuten → {clock(next.h, next.m)} Uhr
            </p>
          )
        })}

        <p>
          Endzeit: <b>{clock(data.endH, data.endM)} Uhr</b>.
        </p>
      </>
    )
  },
}