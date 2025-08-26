import { Exercise } from '@/data/types'

interface DATA {}

export const exercise3063: Exercise<DATA> = {
  title: 'Strahlensatz',
  source: '2022 Wahlteil Aufgabe 4C',
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
    return null
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
