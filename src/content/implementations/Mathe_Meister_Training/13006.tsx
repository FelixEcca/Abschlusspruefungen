import { Exercise } from '@/data/types'
import { BlockMath, InlineMath } from 'react-katex'

type Context = 'tolerance' | 'production' | 'pressure' | 'surface'

interface DATA {
  context: Context
  coefficient1: number
  exponent1: number
  coefficient2: number
  exponent2: number
  coefficient3: number
  exponent3: number
  coefficient4: number
  exponent4: number
}

function decimal(value: number) {
  return value.toLocaleString('de-DE', {
    useGrouping: false,
    maximumFractionDigits: 8,
  })
}

function unit(context: Context) {
  if (context === 'tolerance') return '\\mathrm{m}'
  if (context === 'production') return '\\text{ Stück}'
  if (context === 'pressure') return '\\mathrm{Pa}'
  return '\\mathrm{mm}^2'
}

export const exercise13006: Exercise<DATA> = {
  title: 'Technische Zahlen in Potenzschreibweise',
  source: 'Vorbereitungskurs Meister · Rechengrundlagen',
  useCalculator: false,
  duration: 7,
  generator(rng) {
    const context = rng.randomItemFromArray<Context>([
      'tolerance',
      'production',
      'pressure',
      'surface',
    ])
    const exponents =
      context === 'tolerance'
        ? [-6, -5, -4]
        : context === 'surface'
          ? [3, 4, 5]
          : [4, 5, 6]
    const coefficient1 = rng.randomIntBetween(12, 95) / 10
    const coefficient2 = rng.randomIntBetween(12, 95) / 10
    const coefficient3 = rng.randomIntBetween(12, 95) / 10
    const coefficient4 = rng.randomIntBetween(12, 95) / 10
    const exponent1 = rng.randomItemFromArray(exponents)
    const exponent2 = rng.randomItemFromArray(exponents)
    const exponent3 = rng.randomItemFromArray(exponents)
    const exponent4 = rng.randomItemFromArray(exponents)
    return {
      context,
      coefficient1,
      exponent1,
      coefficient2,
      exponent2,
      coefficient3,
      exponent3,
      coefficient4,
      exponent4,
    }
  },
  originalData: {
    context: 'tolerance',
    coefficient1: 2.5,
    exponent1: -5,
    coefficient2: 7.2,
    exponent2: -6,
    coefficient3: 4.8,
    exponent3: -5,
    coefficient4: 6.1,
    exponent4: -6,
  },
  constraint({ data }) {
    const value1 = data.coefficient1 * 10 ** data.exponent1
    const value2 = data.coefficient2 * 10 ** data.exponent2
    const value3 = data.coefficient3 * 10 ** data.exponent3
    const value4 = data.coefficient4 * 10 ** data.exponent4
    return (
      value1 !== value2 &&
      value3 !== value4 &&
      value3 !== value1 &&
      value3 !== value2 &&
      value4 !== value1 &&
      value4 !== value2 &&
      Number.isFinite(value1) &&
      Number.isFinite(value2) &&
      Number.isFinite(value3) &&
      Number.isFinite(value4)
    )
  },
  intro({ data }) {
    const descriptions: Record<Context, string> = {
      tolerance: 'Sehr kleine Maßabweichungen werden kompakt angegeben.',
      production: 'Große Produktionsmengen werden übersichtlich angegeben.',
      pressure: 'Große Druckwerte werden kompakt angegeben.',
      surface: 'Große Flächenwerte einer Serie werden kompakt angegeben.',
    }
    return <p>{descriptions[data.context]}</p>
  },
  tasks: [
    {
      points: 2,
      task({ data }) {
        const value = data.coefficient1 * 10 ** data.exponent1
        return (
          <p>
            Schreiben Sie{' '}
            <InlineMath math={`${decimal(value)}\\,${unit(data.context)}`} /> in
            wissenschaftlicher Potenzschreibweise.
          </p>
        )
      },
      solution({ data }) {
        const value = data.coefficient1 * 10 ** data.exponent1
        return (
          <BlockMath
            math={`${decimal(value)}\\,${unit(data.context)}=${decimal(data.coefficient1)}\\cdot10^{${data.exponent1}}\\,${unit(data.context)}`}
          />
        )
      },
    },
    {
      points: 2,
      task({ data }) {
        return (
          <p>
            Schreiben Sie{' '}
            <InlineMath
              math={`${decimal(data.coefficient2)}\\cdot10^{${data.exponent2}}\\,${unit(data.context)}`}
            />{' '}
            als Dezimalzahl.
          </p>
        )
      },
      solution({ data }) {
        const value = data.coefficient2 * 10 ** data.exponent2
        return (
          <BlockMath
            math={`${decimal(data.coefficient2)}\\cdot10^{${data.exponent2}}\\,${unit(data.context)}=${decimal(value)}\\,${unit(data.context)}`}
          />
        )
      },
    },
    {
      points: 1,
      task({ data }) {
        return (
          <>
            <p>
              Vergleichen Sie die beiden neuen Größen. Setzen Sie das passende
              Vergleichszeichen ein und begründen Sie Ihre Entscheidung.
            </p>
            <BlockMath
              math={`${decimal(data.coefficient3)}\\cdot10^{${data.exponent3}}\\,${unit(data.context)}\\quad\\square\\quad ${decimal(data.coefficient4)}\\cdot10^{${data.exponent4}}\\,${unit(data.context)}`}
            />
          </>
        )
      },
      solution({ data }) {
        const value3 = data.coefficient3 * 10 ** data.exponent3
        const value4 = data.coefficient4 * 10 ** data.exponent4
        const relation = value3 > value4 ? '>' : '<'
        return (
          <>
            <BlockMath
              math={`${decimal(data.coefficient3)}\\cdot10^{${data.exponent3}}\\;${relation}\\;${decimal(data.coefficient4)}\\cdot10^{${data.exponent4}}`}
            />
            <p>
              Zuerst werden die Exponenten verglichen. Nur bei gleichen
              Exponenten entscheidet der Faktor vor der Zehnerpotenz.
            </p>
          </>
        )
      },
    },
  ],
}
