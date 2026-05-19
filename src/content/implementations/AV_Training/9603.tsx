// exercise9603.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'kredit' | 'anschaffung' | 'konto' | 'darlehen'

interface DATA {
  kontext: Kontext
  capital: number
  rate: number
  months: number
  interest: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'anschaffung') {
    return `Für eine Anschaffung werden ${pp(
      data.capital,
    )} € geliehen. Der Zinssatz beträgt ${pp(data.rate)} %.`
  }

  if (data.kontext === 'konto') {
    return `Auf einem Konto liegen ${pp(
      data.capital,
    )} €. Der Zinssatz beträgt ${pp(data.rate)} %.`
  }

  if (data.kontext === 'darlehen') {
    return `Ein Darlehen beträgt ${pp(
      data.capital,
    )} €. Der Zinssatz beträgt ${pp(data.rate)} %.`
  }

  return `Ein Kredit beträgt ${pp(data.capital)} €. Der Zinssatz beträgt ${pp(
    data.rate,
  )} %.`
}

export const exercise9603: Exercise<DATA> = {
  title: 'Monatszinsen berechnen',
  source: 'Prozentrechnung',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'kredit',
      'anschaffung',
      'konto',
      'darlehen',
    ])
    const capital = rng.randomItemFromArray([1000, 2000, 5000, 12000, 18000, 25000])
    const rate = rng.randomItemFromArray([2, 3, 4, 5, 6, 8])
    const months = rng.randomIntBetween(2, 11)
    const interest = round2((capital * rate * months) / (100 * 12))

    return { kontext, capital, rate, months, interest }
  },

  originalData: {
    kontext: 'kredit',
    capital: 12000,
    rate: 6,
    months: 5,
    interest: 300,
  },

  constraint({ data }) {
    return data.interest > 0
  },

  task({ data }) {
    return (
      <>
        <p>{getContext(data)}</p>
        <p>Berechnen Sie die Zinsen für {data.months} Monate.</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Berechne die Monatszinsen.</p>
        <InlineMath math={`Z=\\frac{K\\cdot p\\cdot m}{100\\cdot 12}`} />
        <p>Einsetzen:</p>
        <InlineMath
          math={`Z=\\frac{${pp(data.capital)}\\cdot ${pp(data.rate)}\\cdot ${
            data.months
          }}{100\\cdot 12}=${pp(data.interest)}\\,€`}
        />
        <p>
          Die Zinsen betragen <b>{pp(data.interest)} €</b>.
        </p>
      </>
    )
  },
}