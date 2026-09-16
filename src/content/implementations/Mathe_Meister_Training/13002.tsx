import { Exercise } from '@/data/types'
import { BlockMath, InlineMath } from 'react-katex'

type ErrorType = 'sum' | 'difference' | 'productAsSum'

interface DATA {
  p: number
  q: number
  estimateBase: number
  offset: number
  errorType: ErrorType
}

function erroneousRule(data: DATA) {
  if (data.errorType === 'sum') {
    return `\\sqrt{${data.p ** 2}+${data.q ** 2}}\\stackrel{?}{=}\\sqrt{${data.p ** 2}}+\\sqrt{${data.q ** 2}}=${data.p + data.q}`
  }
  if (data.errorType === 'difference') {
    return `\\sqrt{${data.p ** 2}-${data.q ** 2}}\\stackrel{?}{=}\\sqrt{${data.p ** 2}}-\\sqrt{${data.q ** 2}}=${data.p - data.q}`
  }
  return `\\sqrt{${data.p ** 2}\\cdot${data.q ** 2}}\\stackrel{?}{=}\\sqrt{${data.p ** 2}}+\\sqrt{${data.q ** 2}}=${data.p + data.q}`
}

function correction(data: DATA) {
  if (data.errorType === 'sum') {
    return `\\sqrt{${data.p ** 2}+${data.q ** 2}}=\\sqrt{${data.p ** 2 + data.q ** 2}}\\neq ${data.p + data.q}`
  }
  if (data.errorType === 'difference') {
    return `\\sqrt{${data.p ** 2}-${data.q ** 2}}=\\sqrt{${data.p ** 2 - data.q ** 2}}\\neq ${data.p - data.q}`
  }
  return `\\sqrt{${data.p ** 2}\\cdot${data.q ** 2}}=\\sqrt{${data.p ** 2}}\\cdot\\sqrt{${data.q ** 2}}=${data.p * data.q}`
}

function errorExplanation(errorType: ErrorType) {
  if (errorType === 'sum') {
    return 'Eine Wurzel darf nicht auf die Summanden einer Summe verteilt werden.'
  }
  if (errorType === 'difference') {
    return 'Eine Wurzel darf nicht auf die Teile einer Differenz verteilt werden.'
  }
  return 'Bei einem Produkt werden die Wurzeln miteinander multipliziert und nicht addiert.'
}

export const exercise13002: Exercise<DATA> = {
  title: 'Wurzeln berechnen und Regeln prüfen',
  source: 'Vorbereitungskurs Meister · Rechengrundlagen',
  useCalculator: false,
  duration: 8,
  generator(rng) {
    const q = rng.randomIntBetween(2, 6)
    const p = q + rng.randomIntBetween(1, 4)
    const estimateBase = rng.randomIntBetween(4, 12)
    const offset = rng.randomIntBetween(1, 2 * estimateBase)
    const errorType = rng.randomItemFromArray<ErrorType>([
      'sum',
      'difference',
      'productAsSum',
    ])
    return { p, q, estimateBase, offset, errorType }
  },
  originalData: {
    p: 6,
    q: 4,
    estimateBase: 7,
    offset: 6,
    errorType: 'sum',
  },
  constraint({ data }) {
    return data.p > data.q && data.offset < 2 * data.estimateBase + 1
  },
  intro() {
    return <p>Die Quadratwurzel ist die Umkehrung des Quadrierens.</p>
  },
  tasks: [
    {
      points: 3,
      task({ data }) {
        return (
          <>
            <p>Berechnen Sie ohne Taschenrechner.</p>
            <BlockMath
              math={`\\sqrt{${data.p ** 2}},\\qquad \\sqrt{${data.p ** 2}\\cdot ${data.q ** 2}},\\qquad \\sqrt{\\frac{${data.p ** 2}}{${data.q ** 2}}}`}
            />
          </>
        )
      },
      solution({ data }) {
        return (
          <BlockMath
            math={`\\sqrt{${data.p ** 2}}=${data.p},\\qquad \\sqrt{${data.p ** 2}\\cdot ${data.q ** 2}}=${data.p}\\cdot ${data.q}=${data.p * data.q},\\qquad \\sqrt{\\frac{${data.p ** 2}}{${data.q ** 2}}}=\\frac{${data.p}}{${data.q}}`}
          />
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <>
            <p>
              Beurteilen Sie die Rechnung. Markieren Sie den Fehler und
              korrigieren Sie ihn.
            </p>
            <BlockMath math={erroneousRule(data)} />
          </>
        )
      },
      solution({ data }) {
        return (
          <>
            <p>{errorExplanation(data.errorType)}</p>
            <BlockMath math={correction(data)} />
          </>
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        const n = data.estimateBase ** 2 + data.offset
        return (
          <p>
            Zwischen welchen zwei ganzen Zahlen liegt{' '}
            <InlineMath math={`\\sqrt{${n}}`} />?
          </p>
        )
      },
      solution({ data }) {
        const n = data.estimateBase ** 2 + data.offset
        return (
          <BlockMath
            math={`${data.estimateBase}^2<${n}<${data.estimateBase + 1}^2\\quad\\Rightarrow\\quad ${data.estimateBase}<\\sqrt{${n}}<${data.estimateBase + 1}`}
          />
        )
      },
    },
  ],
}
