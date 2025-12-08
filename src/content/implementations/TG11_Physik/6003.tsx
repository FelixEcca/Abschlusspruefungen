import { Exercise } from '@/data/types'

interface DATA {}

export const exercise6003: Exercise<DATA> = {
  title: 'Verständnisfragen zum Impuls',
  source: 'Impuls',
  useCalculator: false,
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
