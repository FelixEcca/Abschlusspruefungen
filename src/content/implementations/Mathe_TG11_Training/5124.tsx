// exercise5124.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  q: number
  d: number
  k: number
}

function round4(x: number) {
  return Math.round(x * 10000) / 10000
}

function functionMath(data: DATA) {
  return `f(x)=${pp(data.a)}\\cdot ${pp(data.q)}^x${pp(data.d, 'merge_op')}`
}

function eFunctionMath(data: DATA) {
  return `f(x)=${pp(data.a)}\\cdot e^{${pp(data.k)}x}${pp(data.d, 'merge_op')}`
}

export const exercise5124: Exercise<DATA> = {
  title: 'Exponentialfunktionen als e-Funktion schreiben',
  source: 'Exponentialfunktionen',
  useCalculator: true,
  duration: 15,

  generator(rng) {
    const a = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const q = rng.randomItemFromArray([0.45, 0.6, 0.75, 0.8, 1.2, 1.4, 1.6, 2])
    const d = rng.randomItemFromArray([-5, -3, -2, 0, 2, 4, 6])
    const k = round4(Math.log(q))

    return { a, q, d, k }
  },

  originalData: {
    a: 4,
    q: 1.6,
    d: 2,
    k: 0.47,
  },

  constraint({ data }) {
    return data.q > 0 && data.q !== 1
  },

  intro() {
    return null
  },

  task({ data }) {
    return (
      <>
        <p>Schreiben Sie die Funktion als e-Funktion: </p>
        <p>
          <InlineMath math={functionMath(data)} />
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Einsetzen in die e-Funktion:</p>
        <InlineMath
          math={`${pp(data.q)}^x=e^{\\ln(${pp(data.q)})\\cdot x}\\approx e^{${pp(
            data.k,
          )}x}`}
        />

        <p>Damit lautet die Funktion:</p>
        <p>
          <strong>
            <InlineMath math={eFunctionMath(data)} />
          </strong>
        </p>
      </>
    )
  },
}
