import { Exercise } from '@/data/types'

interface DATA {}

export const exercise6001: Exercise<DATA> = {
  title: 'Impuls',
  source: 'Impuls',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return {}
  },
  originalData: {},
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
}
