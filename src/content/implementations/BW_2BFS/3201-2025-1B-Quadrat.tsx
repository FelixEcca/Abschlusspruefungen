import { Exercise } from '@/data/types'

interface DATA {}

export const exercise3201: Exercise<DATA> = {
  title: 'Quadrat',
  source: '3201-2025-1B-Quadrat',
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
