import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type VarName = 'x' | 'a' | 'b'
type Mode = 'linear' | 'quadratic'

interface DATA {
  varName: VarName
  mode: Mode
  coeff: number
  start: number
  end: number
  values: { input: number; output: number }[]
}

export const exercise4908: Exercise<DATA> = {
  title: 'Wertetabelle anlegen',
  source: 'Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const varName: VarName = rng.randomItemFromArray(['x', 'a', 'b'])
    const mode: Mode = rng.randomBoolean() ? 'linear' : 'quadratic'

    const coeff = rng.randomIntBetween(1, 5) * (rng.randomBoolean() ? 1 : -1)

    const rangeTemplates = [
      { start: -3, end: 3 },
      { start: -2, end: 2 },
      { start: -4, end: 4 },
      { start: -1, end: 3 },
      { start: 0, end: 4 },
    ]
    const { start, end } = rng.randomItemFromArray(rangeTemplates)

    const values = []
    for (let i = start; i <= end; i++) {
      const output = mode === 'linear' ? coeff * i : coeff * i * i
      values.push({ input: i, output })
    }

    return { varName, mode, coeff, start, end, values }
  },

  originalData: {
    varName: 'x',
    mode: 'quadratic',
    coeff: -4,
    start: -3,
    end: 3,
    values: [
      { input: -3, output: -36 },
      { input: -2, output: -16 },
      { input: -1, output: -4 },
      { input: 0, output: 0 },
      { input: 1, output: -4 },
      { input: 2, output: -16 },
      { input: 3, output: -36 },
    ],
  },

  constraint({ data }) {
    return data.start < data.end && data.coeff !== 0
  },

  task({ data }) {
    const { varName, mode, coeff, start, end } = data

    const functionTerm =
      mode === 'linear'
        ? `y = ${pp(coeff)}${varName}`
        : `y = ${pp(coeff)}${varName}^{2}`

    return (
      <>
        <p>
          Gegeben ist die Gleichung <InlineMath math={functionTerm} />.
          Erstellen Sie eine Wertetabelle für<br></br>{' '}
          <InlineMath math={`${pp(start)} \\leq ${varName} \\leq ${pp(end)}`} />
          .
        </p>
      </>
    )
  },

  solution({ data }) {
    const { varName, values } = data

    return (
      <>
        <p>Für jeden vorgegebenen Wert wird der Term eingesetzt.</p>
        <table className="border-collapse border border-gray-400 my-2">
          <thead>
            <tr>
              <th className="border border-gray-400 px-3 py-1">{varName}</th>
              <th className="border border-gray-400 px-3 py-1">y</th>
            </tr>
          </thead>
          <tbody>
            {values.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-3 py-1">
                  {pp(row.input)}
                </td>
                <td className="border border-gray-400 px-3 py-1">
                  {pp(row.output)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  },
}
