// exercise3065.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  x1: number
  x2: number
  hSlope: number
  hIntercept: number
  hShift: number
}

export const exercise3065: Exercise<DATA> = {
  title: 'Gerade und Parabel',
  source: 'Prüfung 2022 / Aufgabe 5B',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const x1 = rng.randomItemFromArray([-4, -3, -2])
    const x2 = x1
    const hSlope = -2
    const hIntercept = 1
    const hShift = rng.randomItemFromArray([1, 2, 3])
    return { x1, x2, hSlope, hIntercept, hShift }
  },

  originalData: {
    x1: -1,
    x2: -1,
    hSlope: -2,
    hIntercept: 1,
    hShift: 1,
  },

  constraint() {
    return true
  },

  intro() {
    return (
      <>
        <p>
          Gegeben ist die Gleichung <br></br>
          <InlineMath math={'-2x + 1 = x^2 - 2x + 1'} />.
        </p>
      </>
    )
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task() {
        return <p>Lösen Sie die Gleichung.</p>
      },
      solution() {
        return (
          <>
            <InlineMath math={'-2x + 1 = x^2 - 2x + 1'} />
            <br />
            <InlineMath math={'0 = x^2'} />
            <br />
            <InlineMath math={'x = 0'} />
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return null
      },
      task() {
        return (
          <>
            <p>
              Geben Sie eine Fragestellung an, die in Bezug auf Geraden und
              Parabeln mit dieser Gleichung gelöst werden könnte.
            </p>
          </>
        )
      },
      solution() {
        return (
          <>
            <p>
              Zum Beispiel: „Für welche x-Werte schneiden sich die Gerade und
              die Parabel?“
            </p>
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return (
          <>
            <p>
              Gegeben ist die Parabel durch{' '}
              <InlineMath math={'y = x^2 - 2x + 1'} />.
            </p>
          </>
        )
      },
      task() {
        return (
          <>
            <p>Geben Sie die Gleichung der Parabel in der Scheitelform an.</p>
          </>
        )
      },
      solution() {
        return (
          <>
            <InlineMath math={'y = x^2 - 2x + 1'} />
            <br />
            <InlineMath math={'y = (x - 1)^2'} />
          </>
        )
      },
    },
    {
      points: 2,
      intro() {
        return (
          <>
            <p>
              Beschreiben Sie den Verlauf der Geraden h mit{' '}
              <InlineMath math={'y = -2x + 1'} />.
            </p>
          </>
        )
      },
      task() {
        return <></>
      },
      solution() {
        return (
          <>
            <p>
              Die Gerade fällt. Sie hat die Steigung <InlineMath math={'-2'} />{' '}
              und schneidet die y-Achse bei <InlineMath math={'1'} />.
            </p>
          </>
        )
      },
    },
  ],
}
