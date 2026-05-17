// exercise9503.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'addDivSubMul' | 'mulAddDivSub' | 'subMulAddDiv' | 'addMulSubDiv'

interface DATA {
  mode: Mode
  a: number
  b: number
  c: number
  d: number
  e: number
  result: number
}

function term(data: DATA) {
  if (data.mode === 'addDivSubMul') {
    return `${data.a}+${data.b}:${data.c}-${data.d}\\cdot ${data.e}`
  }

  if (data.mode === 'mulAddDivSub') {
    return `${data.a}\\cdot ${data.b}+${data.c}:${data.d}-${data.e}`
  }

  if (data.mode === 'subMulAddDiv') {
    return `${data.a}-${data.b}\\cdot ${data.c}+${data.d}:${data.e}`
  }

  return `${data.a}+${data.b}\\cdot ${data.c}-${data.d}:${data.e}`
}

export const exercise9503: Exercise<DATA> = {
  title: 'Punkt vor Strich',
  source: 'Rechnen und Terme',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const mode: Mode = rng.randomItemFromArray([
      'addDivSubMul',
      'mulAddDivSub',
      'subMulAddDiv',
      'addMulSubDiv',
    ])

    let a = rng.randomIntBetween(10, 50)
    let b = rng.randomIntBetween(2, 12)
    let c = rng.randomIntBetween(2, 12)
    let d = rng.randomIntBetween(2, 12)
    let e = rng.randomIntBetween(2, 12)

    if (mode === 'addDivSubMul') {
      c = rng.randomItemFromArray([2, 3, 4, 5, 6])
      b = c * rng.randomIntBetween(2, 10)
    }

    if (mode === 'mulAddDivSub') {
      d = rng.randomItemFromArray([2, 3, 4, 5, 6])
      c = d * rng.randomIntBetween(2, 10)
    }

    if (mode === 'subMulAddDiv') {
      e = rng.randomItemFromArray([2, 3, 4, 5, 6])
      d = e * rng.randomIntBetween(2, 10)
    }

    if (mode === 'addMulSubDiv') {
      e = rng.randomItemFromArray([2, 3, 4, 5, 6])
      d = e * rng.randomIntBetween(2, 10)
    }

    let result = 0
    if (mode === 'addDivSubMul') result = a + b / c - d * e
    if (mode === 'mulAddDivSub') result = a * b + c / d - e
    if (mode === 'subMulAddDiv') result = a - b * c + d / e
    if (mode === 'addMulSubDiv') result = a + b * c - d / e

    return { mode, a, b, c, d, e, result }
  },

  originalData: {
    mode: 'addDivSubMul',
    a: 16,
    b: 32,
    c: 4,
    d: 7,
    e: 2,
    result: 10,
  },

  constraint({ data }) {
    return Number.isInteger(data.result)
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie das Ergebnis. </p>
        <p>
          <InlineMath math={term(data)} />
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst werden Mal und Geteilt berechnet.</p>

        {data.mode === 'addDivSubMul' && (
          <>
            <InlineMath math={term(data)} />
            <br />
            <InlineMath
              math={`${data.a}+${pp(data.b / data.c)}-${pp(data.d * data.e)}`}
            />
            <br />
            <InlineMath math={`=${pp(data.result)}`} />
          </>
        )}

        {data.mode === 'mulAddDivSub' && (
          <>
            <InlineMath math={term(data)} />
            <br />
            <InlineMath
              math={`${pp(data.a * data.b)}+${pp(data.c / data.d)}-${data.e}`}
            />
            <br />
            <InlineMath math={`=${pp(data.result)}`} />
          </>
        )}

        {data.mode === 'subMulAddDiv' && (
          <>
            <InlineMath math={term(data)} />
            <br />
            <InlineMath
              math={`${data.a}-${pp(data.b * data.c)}+${pp(data.d / data.e)}`}
            />
            <br />
            <InlineMath math={`=${pp(data.result)}`} />
          </>
        )}

        {data.mode === 'addMulSubDiv' && (
          <>
            <InlineMath math={term(data)} />
            <br />
            <InlineMath
              math={`${data.a}+${pp(data.b * data.c)}-${pp(data.d / data.e)}`}
            />
            <br />
            <InlineMath math={`=${pp(data.result)}`} />
          </>
        )}
      </>
    )
  },
}