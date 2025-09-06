import { Exercise } from '@/data/types'

interface DATA {}

export const exercise4005: Exercise<DATA> = {
  title: 'Nullstellen & y-Achsenabschnitt am Graphen',
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
