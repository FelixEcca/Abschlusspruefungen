import { Exercise } from '@/data/types'

interface DATA {}

export const exercise3016: Exercise<DATA> = {
  title: 'Ebene Figuren',
  source: '2021 Wahlteil Aufgabe 5C',
  useCalculator: true,
  duration: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return (
      <>
        <p>
          Im Dreieck ACD liegt der Punkt B in der Mitte der Seite zwischen A und
          C. Die Strecke von A nach B ist der Durchmesser des Halbkreises, auf
          dem der Punkt E liegt. x ist parallel zu y.
        </p>
        <svg viewBox="0 0 328 328">
          <image href="/content/BW_2BFS/3016.png" height="328" width="328" />
        </svg>
      </>
    )
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
    {
      points: 42,
      intro({ data }) {
        return null
      },
      task({ data }) {
        return <></>
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
