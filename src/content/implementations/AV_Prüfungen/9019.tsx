// exercise9019.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  workers1: number
  hours1: number
  extra: number
  workers2: number
  hours2: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9019: Exercise<DATA> = {
  title: 'Teil 2: Arbeitszeit berechnen',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const workers1 = rng.randomItemFromArray([2, 3, 4])
    const hours1 = rng.randomItemFromArray([4, 5, 6, 7, 8])
    const extra = rng.randomItemFromArray([2, 3, 4, 5])
    const workers2 = workers1 + extra
    const hours2 = round2((workers1 * hours1) / workers2)
    return { workers1, hours1, extra, workers2, hours2 }
  },

  originalData: { workers1: 2, hours1: 5, extra: 3, workers2: 5, hours2: 2 },

  constraint({ data }) {
    return data.hours2 > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          {data.workers1} Schüler brauchen für eine Arbeit {pp(data.hours1)}{' '}
          Stunden.
        </p>
        <p>
          Berechnen Sie, wie lange die Schüler brauchen, wenn ihnen noch{' '}
          {data.extra} weitere Schüler helfen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die gesamte Arbeitsmenge bleibt gleich.</p>
        <InlineMath
          math={`${data.workers1}\\cdot ${pp(data.hours1)}=${pp(
            data.workers1 * data.hours1,
          )}`}
        />
        <br />
        <InlineMath
          math={`${pp(data.workers1 * data.hours1)}:${data.workers2}=${pp(
            data.hours2,
          )}`}
        />
        <p>
          Sie brauchen <b>{pp(data.hours2)} Stunden</b>.
        </p>
      </>
    )
  },
}
