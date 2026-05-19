// exercise9543.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  hours: number
  h: number
  m: number
}

export const exercise9543: Exercise<DATA> = {
  title: 'Dezimalstunden umwandeln',
  source: 'Zeit',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const hours = rng.randomItemFromArray([
      1.25, 1.5, 1.75, 2.25, 2.5, 3.5, 4.75,
    ])
    const h = Math.floor(hours)
    const m = Math.round((hours - h) * 60)

    return { hours, h, m }
  },

  originalData: {
    hours: 4.5,
    h: 4,
    m: 30,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <p>
        Wandeln Sie{' '}
        <InlineMath
          math={`${String(data.hours).replace('.', ',')}\\,\\mathrm{h}`}
        />{' '}
        in Stunden und Minuten um.
      </p>
    )
  },

  solution({ data }) {
    return (
      <p>
        <b>
          {data.h} Stunden und {data.m} Minuten
        </b>
        <p>
          Für die Anzahl der Minuten kann man <br></br>
          <InlineMath
            math={`${String(data.hours - data.h).replace('.', ',')}\\cdot 60`}
          />{' '}
          rechnen.
        </p>
      </p>
    )
  },
}
