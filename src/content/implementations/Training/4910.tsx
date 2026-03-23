import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type VarName = 'x' | 'a' | 'b'
type VarName2 = 'y' | 'b' | 'c'

interface DATA {
  v1: VarName
  v2: VarName2

  // a)
  kA: number

  // b)
  c1: number
  c2: number
}

export const exercise4910: Exercise<DATA> = {
  title: 'Ausmultiplizieren',
  source: 'Terme',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const varOptions1: VarName[] = ['x', 'a', 'b']
    const v1 = rng.randomItemFromArray(varOptions1)

    const varOptions2Map: Record<VarName, VarName2[]> = {
      x: ['y', 'b', 'c'],
      a: ['y', 'b', 'c'],
      b: ['y', 'c'],
    }
    const v2 = rng.randomItemFromArray(varOptions2Map[v1])

    const kA = rng.randomIntBetween(2, 6)

    const c1 = rng.randomIntBetween(2, 6)
    const c2 = rng.randomIntBetween(2, 6)

    return {
      v1,
      v2,
      kA,
      c1,
      c2,
    }
  },

  originalData: {
    v1: 'x',
    v2: 'y',
    kA: 2,
    c1: 2,
    c2: 3,
  },

  constraint({ data }) {
    return data.v1 !== data.v2
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
        return (
          <>
            <p>Multiplizieren Sie aus:</p>
            <InlineMath math={`${pp(data.kA)}(${data.v1} + ${data.v2})`} />
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <InlineMath math={`${pp(data.kA)}(${data.v1} + ${data.v2})`} />
            <br />
            <InlineMath
              math={`= ${pp(data.kA)}${data.v1} + ${pp(data.kA)}${data.v2}`}
            />
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
        return (
          <>
            <p>Multiplizieren Sie aus:</p>
            <InlineMath
              math={`(${pp(data.c1)} - ${data.v1})(${pp(data.c2)} + ${data.v2})`}
            />
          </>
        )
      },
      solution({ data }) {
        const mixedCoeff = -1
        return (
          <>
            <InlineMath
              math={`(${pp(data.c1)} - ${data.v1})(${pp(data.c2)} + ${data.v2})`}
            />
            <br />
            <InlineMath
              math={`= ${pp(data.c1)}\\cdot ${pp(data.c2)} + ${pp(
                data.c1,
              )}${data.v2} - ${pp(data.c2)}${data.v1} - ${data.v1}${data.v2}`}
            />
            <br />
            <InlineMath
              math={`= ${pp(data.c1 * data.c2)} + ${pp(data.c1)}${data.v2} - ${pp(
                data.c2,
              )}${data.v1} - ${data.v1}${data.v2}`}
            />
          </>
        )
      },
    },
  ],
}
