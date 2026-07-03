import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type VarName = 'a' | 'b' | 'x'

interface DATA {
  varName: VarName

  // Aufgaben
  k1: number
  rhs1: number
  sol1: number

  k2: number
  rhs2: number
  sol2: number
}

export const exercise4907: Exercise<DATA> = {
  title: 'Einfache Gleichungen lösen',
  source: 'Gleichungen',
  useCalculator: false,
  duration: 42,

  generator(rng) {
    const varName: VarName = rng.randomItemFromArray(['a', 'b', 'x'])

    // Lösung festlegen (ganzzahlig)
    const sol1 = rng.randomIntBetween(-10, 10) || 2
    const sol2 = rng.randomIntBetween(-10, 10) || -3

    // Faktoren (≠0)
    const k1 = rng.randomIntBetween(2, 6) * (rng.randomBoolean() ? 1 : -1)
    const k2 = rng.randomIntBetween(2, 6) * (rng.randomBoolean() ? 1 : -1)

    // rechte Seite berechnen → garantiert ganzzahlige Lösung
    const rhs1 = k1 * sol1
    const rhs2 = k2 * sol2

    return {
      varName,
      k1,
      rhs1,
      sol1,
      k2,
      rhs2,
      sol2,
    }
  },

  originalData: {
    varName: 'a',
    k1: 2,
    rhs1: 8,
    sol1: 4,
    k2: -3,
    rhs2: 3,
    sol2: -1,
  },

  constraint({ data }) {
    return data.k1 !== 0 && data.k2 !== 0
  },

  intro() {
    return (
      <>
        <p>Lösen Sie die Gleichungen:</p>
      </>
    )
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
            <ul className="list-disc ml-6">
              <li>
                <InlineMath math={`${pp(data.k1)}${v} = ${pp(data.rhs1)}`} />
              </li>
              <li>
                <InlineMath math={`${pp(data.k2)}${v} = ${pp(data.rhs2)}`} />
              </li>
            </ul>
          </>
        )
      },
      solution({ data }) {
        const v = data.varName

        return (
          <>
            <InlineMath
              math={`${pp(data.k1)}${v} = ${pp(data.rhs1)}\\quad | : ${pp(
                data.k1,
              )}`}
            />
            <br />
            <InlineMath math={`${v} = ${pp(data.sol1)}`} />
            <br />
            <br />
            <InlineMath
              math={`${pp(data.k2)}${v} = ${pp(data.rhs2)}\\quad | : ${pp(
                data.k2,
              )}`}
            />
            <br />
            <InlineMath math={`${v} = ${pp(data.sol2)}`} />
          </>
        )
      },
    },
  ],
}
