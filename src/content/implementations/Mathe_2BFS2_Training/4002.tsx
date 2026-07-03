import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Mode = 'toVertex' | 'toStandard'
interface DATA {
  mode: Mode
  a: number
  h: number
  k: number
  b: number
  c: number
}

export const exercise4002: Exercise<DATA> = {
  title: 'Scheitelform ↔ Normalform umformen',
  source: 'Training',
  useCalculator: false,
  duration: 8,
  points: 4,

  generator(rng) {
    // a = ±1 für saubere Rechnungen
    const a = rng.randomItemFromArray([1, -1])
    const h = rng.randomIntBetween(-9, 9)
    const k = rng.randomIntBetween(-9, 9)

    // dazu passende Normalform-Koeffizienten (aus (x-h)^2 = x^2 -2hx + h^2)
    const b = -2 * a * h
    const c = a * h * h + k

    const mode: Mode = rng.randomItemFromArray(['toVertex', 'toStandard'])

    return { mode, a, h, k, b, c }
  },

  originalData: {
    mode: 'toVertex',
    a: 1,
    h: -2,
    k: 3,
    b: 4, // -2*a*h = -2*1*(-2)=4
    c: 7, // a*h^2 + k = 1*4 + 3 = 7
  },

  constraint({ data }) {
    return (
      data.h != 0 && data.k != 0 && data.mode === 'toVertex' && data.a === 1
    )
  },

  task({ data }) {
    const { mode, a, h, k, b, c } = data
    return (
      <>
        {mode === 'toVertex' ? (
          <p>
            Forme die Normalform<br></br>{' '}
            <InlineMath
              math={`y = ${a == 1 ? '' : a == -1 ? '-' : pp(a)}x^{2} ${pp(b, 'merge_op')}x ${pp(c, 'merge_op')}`}
            />{' '}
            in die Scheitelform um.
          </p>
        ) : (
          <p>
            Forme die Scheitelform<br></br>{' '}
            <InlineMath
              math={`y = ${a == 1 ? '' : a == -1 ? '-' : pp(a)}\\,(x${pp(-h, 'merge_op')})^{2} ${pp(k, 'merge_op')}`}
            />{' '}
            in die Normalform um.
          </p>
        )}
      </>
    )
  },

  solution({ data }) {
    const { mode, a, h, k, b, c } = data
    if (mode === 'toVertex') {
      // quadratische Ergänzung
      // y = a x^2 + b x + c = a[(x + b/(2a))^2 - (b/(2a))^2] + c
      const half = b / (2 * a) // = -h
      const kCalc = c - a * half * half // = k
      return (
        <>
          <InlineMath
            math={String.raw`
            \begin{aligned}
            y &= ${a == 1 ? '' : a == -1 ? '-' : pp(a)}\,x^{2} ${pp(b / a, 'merge_op')}x ${pp(c, 'merge_op')} \\
        &= ${a == 1 ? '' : a == -1 ? '-' : pp(a)}\,\Bigl[x^{2} ${pp(b / a, 'merge_op')}x + \left(${pp(Math.abs(b / (2 * a)))}\right)^{2} - \left(${pp(Math.abs(b / (2 * a)))}\right)^{2}\Bigr] ${pp(c, 'merge_op')} \\
        &= ${a == 1 ? '' : a == -1 ? '-' : pp(a)}\,\Bigl[(x ${pp(b / (2 * a), 'merge_op')})^{2} - ${(b / (2 * a)) ** 2}\Bigr] ${pp(c, 'merge_op')} \\
        &= ${a == 1 ? '' : a == -1 ? '-' : pp(a)}\,(x ${pp(b / (2 * a), 'merge_op')})^{2} ${pp(kCalc, 'merge_op')}
            \end{aligned}
            `}
          />
          <p>
            Ergebnis:{' '}
            <InlineMath
              math={`\\boxed{\\;y = ${a == 1 ? '' : a == -1 ? '-' : pp(a)}\\,(x${pp(-(-half), 'merge_op')})^{2} ${pp(kCalc, 'merge_op')}\\;}`}
            />
          </p>
        </>
      )
    }
    // toStandard: Binom ausmultiplizieren
    // y = a[(x - h)^2] + k = a(x^2 - 2hx + h^2) + k = a x^2 + (-2ah) x + (ah^2 + k)
    const bStd = -2 * data.a * data.h
    const cStd = data.a * data.h * data.h + data.k
    return (
      <>
        <InlineMath
          math={String.raw`
      \begin{aligned}
      y &= ${a == 1 ? '' : a == -1 ? '-' : pp(a)}\,(x${pp(-h, 'merge_op')})^{2} ${pp(k, 'merge_op')} \\
        &= ${a == 1 ? '' : a == -1 ? '-' : pp(a)}\,(x^{2} ${pp(-2 * h, 'merge_op')}x + ${h * h}) ${pp(k, 'merge_op')} \\
        &=\; ${a == 1 ? '' : a == -1 ? '-' : pp(a)}x^{2} ${pp(bStd, 'merge_op')}x ${pp(cStd, 'merge_op')}
      \end{aligned}
            `}
        />
        <p>
          Ergebnis:{' '}
          <InlineMath
            math={`\\boxed{\\;y = ${a == 1 ? '' : a == -1 ? '-' : pp(a)}x^{2} ${pp(bStd, 'merge_op')}x ${pp(cStd, 'merge_op')}\\;}`}
          />
        </p>
      </>
    )
  },
}
