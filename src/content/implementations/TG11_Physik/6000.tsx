import { Exercise } from '@/data/types'

interface DATA {}

export const exercise6000: Exercise<DATA> = {
  title: 'Geschwindigkeit in mehreren Dimensionen',
  source: 'Kinematik',
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
