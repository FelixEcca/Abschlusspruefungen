import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type VarName = 'a' | 'b' | 'x'

interface DATA {
  varName: VarName

  // Teil a
  c1: number
  c2: number

  // Teil b
  c3: number
  k: number
  c4: number
}

export const exercise4909: Exercise<DATA> = {
  title: 'Minusklammern',
  source: 'Terme',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const varName: VarName = rng.randomItemFromArray(['a', 'b', 'x'])

    const c1 = rng.randomIntBetween(2, 10)
    const c2 = rng.randomIntBetween(2, 8)

    const c3 = rng.randomIntBetween(2, 10)
    const k = rng.randomIntBetween(2, 6)
    const c4 = rng.randomIntBetween(2, 8)

    return {
      varName,
      c1,
      c2,
      c3,
      k,
      c4,
    }
  },

  originalData: {
    varName: 'x',
    c1: 3,
    c2: 4,
    c3: 5,
    k: 2,
    c4: 1,
  },

  constraint({ data }) {
    return data.k !== 0
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 2,
      intro() {
        return null
      },
      task({ data }) {
        const v = data.varName
        return (
          <>
            <p>Vereinfachen Sie den Term:</p>
            <InlineMath math={`${pp(data.c1)} - (${pp(data.c2)} + ${v})`} />
          </>
        )
      },
      solution({ data }) {
        const v = data.varName

        return (
          <>
            <InlineMath math={`${pp(data.c1)} - (${pp(data.c2)} + ${v})`} />
            <br />
            <InlineMath math={`= ${pp(data.c1)} - ${pp(data.c2)} - ${v}`} />
            <br />
            <InlineMath math={`= ${pp(data.c1 - data.c2)} - ${v}`} />
          </>
        )
      },
    },
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        const v = data.varName
        return (
          <>
            <p>Vereinfachen Sie den Term:</p>
            <InlineMath
              math={`${pp(data.c3)} - ${pp(data.k)}\\cdot (${pp(
                data.c4,
              )} + ${v})`}
            />
          </>
        )
      },
      solution({ data }) {
        const v = data.varName

        return (
          <>
            <InlineMath
              math={`${pp(data.c3)} - ${pp(data.k)}\\cdot (${pp(
                data.c4,
              )} + ${v})`}
            />
            <br />
            <InlineMath
              math={`= ${pp(data.c3)} - ${pp(
                data.k,
              )}\\cdot ${pp(data.c4)} - ${pp(data.k)}${v}`}
            />
            <br />
            <InlineMath
              math={`= ${pp(data.c3 - data.k * data.c4)} - ${pp(data.k)}${v}`}
            />
          </>
        )
      },
    },
  ],
}
