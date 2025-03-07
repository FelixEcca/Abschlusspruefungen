import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'

interface DATA {}

export const exercise301: Exercise<DATA> = {
  title: 'Graphen',
  source: '2024 Hauptprüfung Hauptteil Aufgabe 1',
  useCalculator: false,
  duration: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  intro({ data }) {
    return null
  },
  tasks: [
    {
      points: 42,
      intro({ data }) {
        return (
          <>
            Gegeben sind die Parabel p mit y = (x + 1)² - 3 und die Gerade g mit
            y = {buildInlineFrac(<>1</>, <>2</>)}x + 1 sowie deren Schaubilder
          </>
        )
      },
      task({ data }) {
        return (
          <>Beschriften und skalieren Sie die Achsen des Koordinatensystems.</>
        )
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
        return (
          <>
            Beschreiben Sie, wie die Parabel p aus der Normalparabel mit y = x²
            entsteht.
          </>
        )
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
        return (
          <>
            Geben Sie die Gleichung einer Geraden h an, die parallel zur Geraden
            g verläuft und die Parabel nicht schneidet.
          </>
        )
      },
      solution({ data }) {
        return <></>
      },
    },
  ],
}
