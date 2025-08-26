import { Exercise } from '@/data/types'

interface DATA {}

export const exercise3053: Exercise<DATA> = {
  title: 'Koordinatensysteme',
  source: '2022 Pflichtteil Aufgabe 1D',
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
