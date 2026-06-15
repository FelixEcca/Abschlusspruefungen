import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  students: number
  groupSize: number
  groupTicket: number
  entry: number
  gift: number
  profit: number
  groups: number
  totalCost: number
  remaining: number
  perStudent: number
}

export const exercise9061: Exercise<DATA> = {
  title: 'Teil 1: Ausflugskosten',
  source: '2023',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const students = rng.randomItemFromArray([20, 25, 30])
    const groupSize = rng.randomItemFromArray([4, 5, 10])
    const groupTicket = rng.randomItemFromArray([20, 24, 30])
    const entry = rng.randomItemFromArray([3, 4, 5])
    const gift = rng.randomItemFromArray([15, 22, 30])
    const profit = rng.randomItemFromArray([100, 167, 200])
    const groups = Math.ceil(students / groupSize)
    const totalCost = groups * groupTicket + students * entry + gift
    const remaining = totalCost - profit
    const perStudent = remaining / students
    return {
      students,
      groupSize,
      groupTicket,
      entry,
      gift,
      profit,
      groups,
      totalCost,
      remaining,
      perStudent,
    }
  },

  originalData: {
    students: 25,
    groupSize: 5,
    groupTicket: 24,
    entry: 3,
    gift: 22,
    profit: 167,
    groups: 5,
    totalCost: 217,
    remaining: 50,
    perStudent: 2,
  },

  constraint({ data }) {
    return Number.isInteger(data.perStudent)
  },

  task({ data }) {
    return (
      <>
        <p>
          Ihre Klasse hat {data.students} Schülerinnen und Schüler. Für{' '}
          {data.groupSize} Personen kostet ein Gruppenticket{' '}
          {pp(data.groupTicket)} €. Der Eintritt kostet {pp(data.entry)} €
          pro Person. Für ein Geschenk geben Sie {pp(data.gift)} € aus. Der
          Gewinn von {pp(data.profit)} € wird abgezogen.
        </p>
        <p>Berechnen Sie, wie viel jeder einzelne noch bezahlen muss.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <InlineMath
          math={`${data.groups}\\cdot ${data.groupTicket}+${data.students}\\cdot ${data.entry}+${data.gift}=${data.totalCost}`}
        />
        <br />
        <InlineMath
          math={`(${data.totalCost}-${data.profit}):${data.students}=${pp(
            data.perStudent,
          )}\\,€`}
        />
      </>
    )
  },
}
