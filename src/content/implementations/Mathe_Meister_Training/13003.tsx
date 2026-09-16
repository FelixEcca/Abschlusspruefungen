import { Exercise } from '@/data/types'
import { BlockMath } from 'react-katex'

type Fraction = [number, number]
type Mode = 'addThenMultiply' | 'divideThenSubtract' | 'subtractProduct'

interface DATA {
  mode: Mode
  first: Fraction
  second: Fraction
  third: Fraction
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

function normalize([n, d]: Fraction): Fraction {
  const sign = d < 0 ? -1 : 1
  const divisor = gcd(n, d)
  return [(sign * n) / divisor, (sign * d) / divisor]
}

function add([a, b]: Fraction, [c, d]: Fraction): Fraction {
  return normalize([a * d + c * b, b * d])
}

function subtract([a, b]: Fraction, [c, d]: Fraction): Fraction {
  return normalize([a * d - c * b, b * d])
}

function multiply([a, b]: Fraction, [c, d]: Fraction): Fraction {
  return normalize([a * c, b * d])
}

function divide([a, b]: Fraction, [c, d]: Fraction): Fraction {
  return normalize([a * d, b * c])
}

function latex([n, d]: Fraction) {
  if (d === 1) return `${n}`
  return `\\frac{${n}}{${d}}`
}

function expression(data: DATA) {
  const a = latex(data.first)
  const b = latex(data.second)
  const c = latex(data.third)
  if (data.mode === 'addThenMultiply')
    return `\\left(${a}+${b}\\right)\\cdot ${c}`
  if (data.mode === 'divideThenSubtract') return `${a}:${b}-${c}`
  return `${a}-\\left(${b}\\cdot ${c}\\right)`
}

function firstStep(data: DATA) {
  if (data.mode === 'addThenMultiply') return add(data.first, data.second)
  if (data.mode === 'divideThenSubtract') return divide(data.first, data.second)
  return multiply(data.second, data.third)
}

function finalResult(data: DATA) {
  const first = firstStep(data)
  if (data.mode === 'addThenMultiply') return multiply(first, data.third)
  if (data.mode === 'divideThenSubtract') return subtract(first, data.third)
  return subtract(data.first, first)
}

function remainingExpression(data: DATA, intermediate: Fraction) {
  if (data.mode === 'addThenMultiply') {
    return `${latex(intermediate)}\\cdot ${latex(data.third)}`
  }
  if (data.mode === 'divideThenSubtract') {
    return `${latex(intermediate)}-${latex(data.third)}`
  }
  return `${latex(data.first)}-${latex(intermediate)}`
}

export const exercise13003: Exercise<DATA> = {
  title: 'Gemischte Bruchrechnung',
  source: 'Vorbereitungskurs Meister · Rechengrundlagen',
  useCalculator: false,
  duration: 8,
  points: 4,
  generator(rng) {
    const fraction = (): Fraction => {
      const denominator = rng.randomIntBetween(2, 9)
      return [rng.randomIntBetween(1, denominator - 1), denominator]
    }
    return {
      mode: rng.randomItemFromArray<Mode>([
        'addThenMultiply',
        'divideThenSubtract',
        'subtractProduct',
      ]),
      first: fraction(),
      second: fraction(),
      third: fraction(),
    }
  },
  originalData: {
    mode: 'addThenMultiply',
    first: [1, 3],
    second: [1, 6],
    third: [3, 5],
  },
  constraint({ data }) {
    const result = finalResult(data)
    return result[1] !== 0 && Math.abs(result[0]) <= 30 && result[0] !== 0
  },
  task({ data }) {
    return (
      <>
        <p>Berechnen Sie. Beachten Sie Klammern und Punkt-vor-Strich.</p>
        <BlockMath math={expression(data)} />
      </>
    )
  },
  solution({ data }) {
    const intermediate = firstStep(data)
    const result = finalResult(data)
    const explanation =
      data.mode === 'addThenMultiply'
        ? 'Zuerst wird die Summe in der Klammer berechnet.'
        : data.mode === 'divideThenSubtract'
          ? 'Zuerst wird dividiert. Dazu wird mit dem Kehrbruch multipliziert.'
          : 'Zuerst wird das Produkt in der Klammer berechnet.'
    return (
      <>
        <p>{explanation}</p>
        <BlockMath
          math={`${expression(data)}\\quad\\Rightarrow\\quad ${remainingExpression(data, intermediate)}`}
        />
        <p>Danach folgt die verbleibende Rechenoperation.</p>
        <BlockMath math={`\\text{Ergebnis}=${latex(result)}`} />
      </>
    )
  },
}
