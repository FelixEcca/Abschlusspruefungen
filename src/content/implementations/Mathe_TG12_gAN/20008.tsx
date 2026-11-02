import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

interface Equation {
  trig: 'sin' | 'cos'
  angle: number
  a: number
  b: number
  c: number
  d: number
}
interface DATA {
  simple: Equation
  harder: Equation
  lower: number
  upper: number
}

function piFraction(value: number): [number, number] | null {
  if (!Number.isFinite(value)) return null
  // Generated angles include thirds of sixths (pi/18), so retain exact fractions.
  let d = 1
  while (d < 144 && Math.abs(value * d - Math.round(value * d)) > 1e-8) d++
  if (Math.abs(value * d - Math.round(value * d)) > 1e-8) return null
  let n = Math.round(value * d)
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
  const divisor = gcd(Math.abs(n), d)
  n /= divisor
  d /= divisor
  return [n, d]
}
function piTerm(value: number) {
  const fraction = piFraction(value)
  if (!fraction)
    throw new Error('Winkel ist nicht als exakter pi-Bruch darstellbar')
  const [n, d] = fraction
  if (!n) return '0'
  const numerator = `${Math.abs(n) === 1 ? '' : pp(Math.abs(n))}\\pi`
  return `${n < 0 ? '-' : ''}${d === 1 ? numerator : `\\frac{${numerator}}{${pp(d)}}`}`
}
function shift(c: number) {
  return c ? `${c < 0 ? '-' : '+'}${piTerm(Math.abs(c))}` : ''
}
function target(eq: Equation) {
  return Math[eq.trig](eq.angle * Math.PI)
}
function targetMath(eq: Equation) {
  const v = target(eq),
    abs = Math.abs(v)
  const term =
    Math.abs(abs - 0.5) < 1e-8
      ? pp(0.5)
      : Math.abs(abs - Math.SQRT1_2) < 1e-8
        ? '\\frac{\\sqrt{2}}{2}'
        : '\\frac{\\sqrt{3}}{2}'
  return `${v < 0 ? '-' : ''}${term}`
}
function roots(eq: Equation) {
  const other =
    eq.trig === 'sin' ? (((1 - eq.angle) % 2) + 2) % 2 : 2 - eq.angle
  return [eq.angle, other].map(t => (t - eq.c) / eq.b).sort((a, b) => a - b)
}
function equation(eq: Equation) {
  const argument = `${eq.b === 1 ? '' : pp(eq.b)}x${shift(eq.c)}`
  const rhs =
    Math.abs(Math.abs(target(eq)) - 0.5) < 1e-8
      ? pp(Math.round((eq.a * target(eq) + eq.d) * 1e8) / 1e8)
      : eq.a === 1 && !eq.d
        ? targetMath(eq)
        : `${pp(eq.a)}\\cdot\\left(${targetMath(eq)}\\right)${eq.d ? pp(eq.d, 'merge_op') : ''}`
  return `${eq.a === 1 ? '' : `${pp(eq.a)}\\cdot`}\\${eq.trig}(${argument})${eq.d ? pp(eq.d, 'merge_op') : ''}=${rhs}`
}
function intervalRoots(eq: Equation, lower: number, upper: number) {
  const period = 2 / eq.b
  return roots(eq)
    .flatMap(root => {
      const values: number[] = []
      for (
        let k = Math.ceil((lower - root) / period - 1e-9);
        k <= Math.floor((upper - root) / period + 1e-9);
        k++
      )
        values.push(root + k * period)
      return values
    })
    .sort((a, b) => a - b)
}
function validEquation(eq: Equation) {
  if (
    !['sin', 'cos'].includes(eq.trig) ||
    ![eq.angle, eq.a, eq.b, eq.c, eq.d].every(Number.isFinite) ||
    eq.a === 0 ||
    ![1, 2, 3, 4].includes(eq.b) ||
    eq.angle < 0 ||
    eq.angle >= 2
  )
    return false
  const value = target(eq)
  if (
    ![0.5, Math.SQRT1_2, Math.sqrt(3) / 2].some(
      v => Math.abs(Math.abs(value) - v) < 1e-8,
    )
  )
    return false
  const solutions = roots(eq),
    period = 2 / eq.b
  const separation = (solutions[1] - solutions[0]) / period
  const alpha =
    (eq.trig === 'sin' ? Math.asin(value) : Math.acos(value)) / Math.PI
  return (
    Math.abs(separation - Math.round(separation)) > 1e-8 &&
    [eq.angle, eq.c, period, alpha, ...solutions].every(
      x => piFraction(x) !== null,
    ) &&
    solutions.every(
      x => Math.abs(Math[eq.trig]((eq.b * x + eq.c) * Math.PI) - value) < 1e-8,
    )
  )
}
function validData(data: DATA) {
  if (
    !validEquation(data.simple) ||
    !validEquation(data.harder) ||
    data.simple.b !== 1 ||
    data.simple.c !== 0 ||
    ![data.lower, data.upper].every(
      x => Number.isFinite(x) && Math.abs(x) <= 10 && piFraction(x) !== null,
    ) ||
    data.lower >= data.upper
  )
    return false
  const solutions = intervalRoots(data.harder, data.lower, data.upper)
  return (
    solutions.length > 0 &&
    solutions.every(
      (x, i) =>
        x >= data.lower - 1e-8 &&
        x <= data.upper + 1e-8 &&
        piFraction(x) !== null &&
        (i === 0 || x - solutions[i - 1] > 1e-8) &&
        Math.abs(
          Math[data.harder.trig](
            (data.harder.b * x + data.harder.c) * Math.PI,
          ) - target(data.harder),
        ) < 1e-8,
    )
  )
}
function GeneralSolution({ eq }: { eq: Equation }) {
  const [r1, r2] = roots(eq)
  const alpha =
    (eq.trig === 'sin' ? Math.asin(target(eq)) : Math.acos(target(eq))) /
    Math.PI
  return (
    <>
      <p>Sinus- bzw. Kosinusterm isolieren:</p>
      <p>
        <InlineMath
          math={`\\${eq.trig}(${eq.b === 1 ? '' : pp(eq.b)}x${shift(eq.c)})=${targetMath(eq)}`}
        />
      </p>
      <p>Mit der Umkehrfunktion erhält man zunächst:</p>
      <p>
        <InlineMath
          math={`\\alpha=\\${eq.trig === 'sin' ? 'arcsin' : 'arccos'}\\left(${targetMath(eq)}\\right)=${piTerm(alpha)}`}
        />
      </p>
      <p>
        Mit{' '}
        <InlineMath math={`u=${eq.b === 1 ? '' : pp(eq.b)}x${shift(eq.c)}`} />{' '}
        erhält man im Intervall <InlineMath math={'[0;2\\pi)'} />:
      </p>
      <p>
        <InlineMath
          math={`u_1=${piTerm(eq.angle)},\\quad u_2=${piTerm(eq.trig === 'sin' ? (((1 - eq.angle) % 2) + 2) % 2 : 2 - eq.angle)}`}
        />
      </p>
      <p>
        Für die zweite Lösung nutzt man{' '}
        <InlineMath
          math={
            eq.trig === 'sin' ? '\\sin(u)=\\sin(\\pi-u)' : '\\cos(u)=\\cos(-u)'
          }
        />
        . Beide Lösungsfolgen wiederholen sich nach{' '}
        <InlineMath math={'2\\pi'} />.
      </p>
      <p>
        Verschiebung rückgängig machen und durch <InlineMath math={pp(eq.b)} />{' '}
        teilen:
      </p>
      <p>
        <InlineMath
          math={`x=\\frac{u${shift(-eq.c)}}{${pp(eq.b)}},\\qquad p=\\frac{2\\pi}{${pp(eq.b)}}=${piTerm(2 / eq.b)}`}
        />
      </p>
      <p>
        <strong>
          <InlineMath math={`x=${piTerm(r1)}+k\\cdot ${piTerm(2 / eq.b)}`} />
        </strong>
      </p>
      <p>oder</p>
      <p>
        <strong>
          <InlineMath
            math={`x=${piTerm(r2)}+k\\cdot ${piTerm(2 / eq.b)},\\quad k\\in\\mathbb Z`}
          />
        </strong>
      </p>
    </>
  )
}
export const exercise20008: Exercise<DATA> = {
  title: 'Trigonometrische Gleichungen lösen',
  source: 'TG12 gAN',
  useCalculator: true,
  duration: 22,
  generator(rng) {
    const make = (hard: boolean): Equation => ({
      trig: rng.randomItemFromArray(['sin', 'cos']),
      angle: rng.randomItemFromArray([
        1 / 6,
        1 / 4,
        1 / 3,
        2 / 3,
        3 / 4,
        5 / 6,
        7 / 6,
        5 / 4,
        4 / 3,
      ]),
      a: hard ? rng.randomItemFromArray([2, 3, 4]) : 1,
      b: hard ? rng.randomItemFromArray([2, 3, 4]) : 1,
      c: hard ? rng.randomItemFromArray([-0.5, 0, 0.5, 1]) : 0,
      d: hard ? rng.randomItemFromArray([-3, -1, 2, 4]) : 0,
    })
    return {
      simple: make(false),
      harder: make(true),
      lower: rng.randomItemFromArray([-4, -3, -2]),
      upper: rng.randomItemFromArray([2, 3, 4]),
    }
  },
  originalData: {
    simple: { trig: 'sin', angle: 1 / 6, a: 1, b: 1, c: 0, d: 0 },
    harder: { trig: 'cos', angle: 2 / 3, a: 2, b: 2, c: 0.5, d: 3 },
    lower: -2,
    upper: 3,
  },
  constraint: ({ data }) => validData(data),
  intro: () => <p>Alle Winkel werden im Bogenmaß angegeben.</p>,
  tasks: [
    {
      points: 4,
      task: ({ data }) => (
        <>
          <p>
            Lösen Sie die Gleichung für <InlineMath math={'x\\in[0;2\\pi)'} />.
          </p>
          <InlineMath math={equation(data.simple)} />
        </>
      ),
      solution: ({ data }) => (
        <>
          <GeneralSolution eq={data.simple} />
          <p>Im gefragten Intervall liegen:</p>
          <strong>
            <InlineMath
              math={`L=\\{${intervalRoots(data.simple, 0, 2 - 1e-8)
                .map(piTerm)
                .join(';')}\\}`}
            />
          </strong>
        </>
      ),
    },
    {
      points: 6,
      task: ({ data }) => (
        <>
          <p>Bestimmen Sie alle reellen Lösungen.</p>
          <InlineMath math={equation(data.harder)} />
        </>
      ),
      solution: ({ data }) => <GeneralSolution eq={data.harder} />,
    },
    {
      points: 5,
      task: ({ data }) => (
        <p>
          Geben Sie alle Lösungen der vorherigen Gleichung im Intervall{' '}
          <InlineMath math={`[${piTerm(data.lower)};${piTerm(data.upper)}]`} />{' '}
          an.
        </p>
      ),
      solution: ({ data }) => (
        <>
          <p>
            Setzen Sie in beide Lösungsfolgen alle ganzen Zahlen{' '}
            <InlineMath math={'k'} /> ein, für die{' '}
            <InlineMath
              math={`${piTerm(data.lower)}\\le x\\le ${piTerm(data.upper)}`}
            />{' '}
            gilt. Die Randpunkte gehören dazu.
          </p>
          <p>
            Für eine Folge <InlineMath math={'x=r+kp'} /> gilt:
          </p>
          <p>
            <InlineMath
              math={`\\frac{${piTerm(data.lower)}-r}{p}\\le k\\le\\frac{${piTerm(data.upper)}-r}{p}`}
            />
          </p>
          <p>Damit ergeben sich aufsteigend folgende Lösungen:</p>
          <ul>
            {intervalRoots(data.harder, data.lower, data.upper).map((x, i) => (
              <li key={i}>
                <strong>
                  <InlineMath math={`x_{${i + 1}}=${piTerm(x)}`} />
                </strong>
              </li>
            ))}
          </ul>
        </>
      ),
    },
  ],
}
