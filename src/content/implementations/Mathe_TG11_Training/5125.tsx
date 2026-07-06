// exercise5125.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type EquationForm = 'standard' | 'moveC' | 'moveBC'

interface EEquation {
  a: number
  b: number
  c: number
  u1: number
  u2: number
  form: EquationForm
}

interface DATA {
  eq1: EEquation
  eq2: EEquation
}

function round4(x: number) {
  return Math.round(x * 10000) / 10000
}

function coeff(n: number) {
  return n === 1 ? '' : `${pp(n)}\\cdot `
}

function buildEquation(
  a: number,
  u1: number,
  u2: number,
  form: EquationForm,
): EEquation {
  return {
    a,
    b: -a * (u1 + u2),
    c: a * u1 * u2,
    u1,
    u2,
    form,
  }
}

function standardMath(eq: EEquation) {
  return `${coeff(eq.a)}e^{2x} ${pp(eq.b, 'koeff')}e^x ${pp(
    eq.c,
    'merge_op',
  )}=0`
}

function equationMath(eq: EEquation) {
  if (eq.form === 'moveC') {
    return `${coeff(eq.a)}e^{2x} ${pp(eq.b, 'koeff')}e^x=${pp(-eq.c)}`
  }

  if (eq.form === 'moveBC') {
    return `${coeff(eq.a)}e^{2x}=${pp(-eq.c)} ${pp(-eq.b, 'koeff')}e^x`
  }

  return standardMath(eq)
}

function solutionSteps(eq: EEquation) {
  const sqrtD = eq.a * Math.abs(eq.u1 - eq.u2)
  const d = sqrtD * sqrtD
  const uPlus = Math.max(eq.u1, eq.u2)
  const uMinus = Math.min(eq.u1, eq.u2)
  const x1 = round4(Math.log(uPlus))
  const x2 = uMinus > 0 ? round4(Math.log(uMinus)) : null

  return (
    <>
      <p>
        <InlineMath math={equationMath(eq)} />
      </p>
      {eq.form !== 'standard' && (
        <>
          <p>Zuerst alle Terme auf die linke Seite bringen:</p>
          <InlineMath math={standardMath(eq)} />
        </>
      )}
      <p>
        Substitution <InlineMath math={`u=e^x`} /> (damit ist{' '}
        <InlineMath math={`e^{2x}=u^2`} />
        ):
      </p>
      <InlineMath
        math={`${coeff(eq.a)}u^2 ${pp(eq.b, 'koeff')}u ${pp(
          eq.c,
          'merge_op',
        )}=0`}
      />
      <p>Mit der Mitternachtsformel lösen:</p>
      <InlineMath
        math={`u_{1,2}=\\frac{${pp(-eq.b)}\\pm\\sqrt{(${pp(
          eq.b,
          'embrace_neg',
        )})^2-4\\cdot ${pp(eq.a, 'embrace_neg')}\\cdot ${pp(
          eq.c,
          'embrace_neg',
        )}}}{2\\cdot ${pp(eq.a)}}=\\frac{${pp(-eq.b)}\\pm\\sqrt{${pp(
          d,
        )}}}{${pp(2 * eq.a)}}`}
      />
      <p>
        <InlineMath math={`u_1=${pp(uPlus)}`} /> und{' '}
        <InlineMath math={`u_2=${pp(uMinus)}`} />
      </p>
      <p>
        Rücksubstitution <InlineMath math={`e^x=u`} />:
      </p>
      <p>
        <InlineMath
          math={`e^x=${pp(uPlus)}\\;\\Rightarrow\\; x_1=\\ln(${pp(
            uPlus,
          )})\\approx ${pp(x1)}`}
        />
      </p>
      <p>
        {x2 !== null ? (
          <InlineMath
            math={`e^x=${pp(uMinus)}\\;\\Rightarrow\\; x_2=\\ln(${pp(
              uMinus,
            )})\\approx ${pp(x2)}`}
          />
        ) : (
          <>
            <InlineMath math={`e^x=${pp(uMinus)}`} /> hat keine Lösung, da{' '}
            <InlineMath math={`e^x>0`} /> für alle x.
          </>
        )}
      </p>
      <p>
        <strong>
          <InlineMath
            math={
              x2 !== null
                ? `x_1\\approx ${pp(x1)},\\quad x_2\\approx ${pp(x2)}`
                : `x\\approx ${pp(x1)}`
            }
          />
        </strong>
      </p>
    </>
  )
}

export const exercise5125: Exercise<DATA> = {
  title: 'Exponentialgleichungen durch Substitution lösen',
  source: 'Exponentialfunktionen',
  useCalculator: true,
  duration: 15,

  generator(rng) {
    const a1 = rng.randomItemFromArray([1, 2, 3])
    const u11 = rng.randomIntBetween(2, 5)
    const u12 = rng.randomItemFromArray([-4, -3, -2, -1, 1, 2, 3, 4])

    const a2 = rng.randomItemFromArray([1, 2, 3])
    const u21 = rng.randomIntBetween(2, 5)
    const u22 = rng.randomItemFromArray([-4, -3, -2, -1, 1, 2, 3, 4])
    const form2 = rng.randomItemFromArray<EquationForm>(['moveC', 'moveBC'])

    return {
      eq1: buildEquation(a1, u11, u12, 'standard'),
      eq2: buildEquation(a2, u21, u22, form2),
    }
  },

  originalData: {
    eq1: { a: 2, b: -4, c: -6, u1: 3, u2: -1, form: 'standard' },
    eq2: { a: 1, b: -6, c: 8, u1: 4, u2: 2, form: 'moveC' },
  },

  constraint({ data }) {
    return (
      data.eq1.u1 !== data.eq1.u2 &&
      data.eq1.b !== 0 &&
      data.eq2.u1 !== data.eq2.u2 &&
      data.eq2.b !== 0
    )
  },

  intro() {
    return null
  },

  tasks: [
    {
      points: 3,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>
              Lösen Sie die Gleichung mit der Substitution{' '}
              <InlineMath math={`u=e^x`} />.
            </p>
            <p>
              <InlineMath math={equationMath(data.eq1)} />
            </p>
          </>
        )
      },
      solution({ data }) {
        return solutionSteps(data.eq1)
      },
    },
    {
      points: 4,
      intro() {
        return null
      },
      task({ data }) {
        return (
          <>
            <p>Lösen Sie die Gleichung.</p>
            <p>
              <InlineMath math={equationMath(data.eq2)} />
            </p>
          </>
        )
      },
      solution({ data }) {
        return solutionSteps(data.eq2)
      },
    },
  ],
}
