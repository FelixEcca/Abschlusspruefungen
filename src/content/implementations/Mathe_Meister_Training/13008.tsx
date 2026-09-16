import { Exercise } from '@/data/types'
import { BlockMath } from 'react-katex'

interface DATA {
  base: number
  m: number
  n: number
  divisorExponent: number
  sumA: number
  sumB: number
  errorType: 'sumSquare' | 'productPower' | 'powerOfPower'
}

function wrongRule(data: DATA) {
  if (data.errorType === 'sumSquare') {
    return `(${data.sumA}+${data.sumB})^2\\stackrel{?}{=}${data.sumA}^2+${data.sumB}^2`
  }
  if (data.errorType === 'productPower') {
    return `(${data.sumA}\\cdot${data.sumB})^2\\stackrel{?}{=}${data.sumA}\\cdot${data.sumB}^2`
  }
  return `(${data.base}^{${data.m}})^{${data.n}}\\stackrel{?}{=}${data.base}^{${data.m}+${data.n}}`
}

export const exercise13008: Exercise<DATA> = {
  title: 'Potenzgesetze verstehen und Fehler erkennen',
  source: 'Vorbereitungskurs Meister · Terme und Rechengesetze',
  useCalculator: false,
  duration: 8,
  generator(rng) {
    const m = rng.randomIntBetween(2, 5)
    const n = rng.randomIntBetween(2, 5)
    return {
      base: rng.randomIntBetween(2, 6),
      m,
      n,
      divisorExponent: rng.randomIntBetween(1, Math.min(4, m + n - 1)),
      sumA: rng.randomIntBetween(2, 8),
      sumB: rng.randomIntBetween(2, 8),
      errorType: rng.randomItemFromArray<DATA['errorType']>([
        'sumSquare',
        'productPower',
        'powerOfPower',
      ]),
    }
  },
  originalData: {
    base: 3,
    m: 4,
    n: 2,
    divisorExponent: 3,
    sumA: 4,
    sumB: 2,
    errorType: 'sumSquare',
  },
  constraint({ data }) {
    return (
      data.divisorExponent < data.m + data.n &&
      data.sumA !== data.sumB &&
      (data.errorType !== 'powerOfPower' || data.m * data.n !== data.m + data.n)
    )
  },
  intro() {
    return <p>Potenzgesetze gelten nur bei passenden Rechenstrukturen.</p>
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie beide Ausdrücke. Erklären Sie den Unterschied.</p>
            <BlockMath
              math={`(-${data.base})^2\\qquad\\text{und}\\qquad -${data.base}^2`}
            />
          </>
        )
      },
      solution({ data }) {
        return (
          <BlockMath
            math={`(-${data.base})^2=${data.base ** 2},\\qquad -${data.base}^2=-${data.base ** 2}`}
          />
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Vereinfachen Sie so weit wie möglich.</p>
            <BlockMath
              math={`\\frac{${data.base}^{${data.m}}\\cdot ${data.base}^{${data.n}}}{${data.base}^{${data.divisorExponent}}}`}
            />
          </>
        )
      },
      solution({ data }) {
        const exponent = data.m + data.n - data.divisorExponent
        return (
          <BlockMath
            math={`\\frac{${data.base}^{${data.m}}\\cdot ${data.base}^{${data.n}}}{${data.base}^{${data.divisorExponent}}}=${data.base}^{${data.m}+${data.n}-${data.divisorExponent}}=${data.base}^{${exponent}}`}
          />
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>Finden und erklären Sie den Fehler.</p>
            <BlockMath math={wrongRule(data)} />
          </>
        )
      },
      solution({ data }) {
        if (data.errorType === 'productPower') {
          return (
            <>
              <p>Bei einem Produkt muss jeder Faktor potenziert werden.</p>
              <BlockMath
                math={`(${data.sumA}\\cdot${data.sumB})^2=${data.sumA}^2\\cdot${data.sumB}^2=${(data.sumA * data.sumB) ** 2}`}
              />
            </>
          )
        }
        if (data.errorType === 'powerOfPower') {
          return (
            <>
              <p>Beim Potenzieren einer Potenz werden die Exponenten multipliziert, nicht addiert.</p>
              <BlockMath
                math={`(${data.base}^{${data.m}})^{${data.n}}=${data.base}^{${data.m}\\cdot${data.n}}=${data.base}^{${data.m * data.n}}`}
              />
            </>
          )
        }
        const left = (data.sumA + data.sumB) ** 2
        const wrong = data.sumA ** 2 + data.sumB ** 2
        return (
          <>
            <p>
              Eine Potenz darf nicht auf eine Summe verteilt werden. Beim
              Quadrieren entsteht zusätzlich der mittlere Term.
            </p>
            <BlockMath
              math={`(${data.sumA}+${data.sumB})^2=${data.sumA}^2+2\\cdot${data.sumA}\\cdot${data.sumB}+${data.sumB}^2=${left}\\neq${wrong}`}
            />
          </>
        )
      },
    },
  ],
}
