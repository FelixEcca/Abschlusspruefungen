import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pick } from './_avTrainingShared'

type Kind = 'mixedFractionShare'

interface DATA {
  kind: Kind
  a: number
  b: number
  c: number
  d: number
  result: number
  result2: number
  label: string
}

const kind: Kind = 'mixedFractionShare'

function makeData(rng: any): DATA {
  const options = [
    [1, 2, 1, 3],
    [1, 3, 1, 2],
    [1, 4, 1, 5],
    [2, 3, 2, 4],
    [2, 5, 1, 3],
    [3, 4, 1, 5],
    [3, 5, 3, 3],
  ]
  const [whole, b, a, bottles] = rng.randomItemFromArray(options)
  const improper = whole * b + a
  return {
    kind,
    a: whole,
    b,
    c: a,
    d: bottles,
    result: improper / bottles,
    result2: improper,
    label: pick(rng, ['Saft', 'Limonade', 'Eistee', 'Mineralwasser']),
  }
}

const originalData = makeData({
  randomItemFromArray<T>(arr: T[]) {
    return arr[0]
  },
})

export const exercise9618: Exercise<DATA> = {
  title: 'Gemischten Bruch aufteilen',
  source: 'Bruchrechnen',
  useCalculator: true,
  duration: 42,
  points: 42,
  generator(rng) {
    return makeData(rng)
  },
  originalData,
  constraint({ data }) {
    return (
      data.kind === kind &&
      Number.isFinite(data.result) &&
      data.result2 % data.d === 0
    )
  },
  task({ data }) {
    return (
      <p>
        Es gibt <InlineMath math={`${data.a}\\frac{${data.c}}{${data.b}}`} />{' '}
        Liter {data.label}. {data.label} wird gleichmäßig auf <b>{data.d}</b>{' '}
        Flaschen verteilt. Wie viel Liter kommen in eine Flasche?
      </p>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Schreibe zuerst den gemischten Bruch als unechten Bruch.</p>

        <InlineMath
          math={`\\color{red}${data.a}\\color{black}\\frac{${data.c}}{\\color{red}${data.b}\\color{black}}=\\frac{\\color{red}${data.a}\\cdot${data.b}\\color{black}+${data.c}}{${data.b}}=\\frac{${data.result2}}{${data.b}}`}
        />
        <p>Jetzt wird die Menge gleichmäßig auf {data.d} Flaschen verteilt.</p>
        <InlineMath
          math={`\\frac{${data.result2}}{${data.b}}:${data.d}=\\frac{${data.result2}}{${data.b}}\\cdot\\frac{1}{${data.d}}`}
        />
        <br />
        <InlineMath
          math={`=\\frac{${data.result2}}{${data.b}\\cdot ${data.d}}`}
        />
        <br />
        <InlineMath math={`${data.result2}:${data.d}=${data.result}`} />
        <br />
        <InlineMath
          math={`\\frac{${data.result2}}{${data.b}\\cdot ${data.d}}=\\frac{${data.result}}{${data.b}}`}
        />
        <p>
          In eine Flasche kommen{' '}
          <InlineMath math={`\\frac{${data.result}}{${data.b}}`} /> Liter.
        </p>
      </>
    )
  },
}
