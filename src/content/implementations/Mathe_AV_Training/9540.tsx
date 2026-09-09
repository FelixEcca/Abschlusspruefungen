// exercise9540.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'

interface DATA {
  hours: number
  minutes: number
}

export const exercise9540: Exercise<DATA> = {
  title: 'Stunden in Minuten',
  source: 'Zeit',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const hours = rng.randomItemFromArray([
      0.5, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8,
    ])
    const minutes = hours * 60

    return { hours, minutes }
  },

  originalData: {
    hours: 2.5,
    minutes: 150,
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
        in Minuten um.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Rechne mal 60:</p>
        <InlineMath
          math={`${String(data.hours).replace('.', ',')}\\,\\mathrm{h}\\,\\widehat{=}\\,${data.minutes}\\,\\mathrm{min}`}
        />
      </>
    )
  },
}
