import { Exercise } from '@/data/types'

interface DATA {}

export const exercise4802: Exercise<DATA> = {
  title: 'Schnittpunkt von Geraden (als LGS)',
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
