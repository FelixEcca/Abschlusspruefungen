import { Exercise } from '@/data/types'

interface DATA {}

export const exercise4104: Exercise<DATA> = {
  title: 'Schnittpunkt zweier Geraden',
  source: '',
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
