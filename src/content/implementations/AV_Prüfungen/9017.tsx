// exercise9017.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Kontext = 'huette' | 'schulbus' | 'sporthalle' | 'computerraum'

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
  if (data.kontext === 'schulbus') {
    return {
      text: (
        <>
          Für einen neuen Schulbus werden {pp(data.capital)} € benötigt. Die
          Schule nimmt dafür einen Kredit mit einem Zinssatz von {pp(data.rate)}{' '}
          % auf.
        </>
      ),
      question: `Berechnen Sie, wie viel Zinsen für ${data.months} Monate bezahlt werden müssen.`,
    }
  }

  if (data.kontext === 'sporthalle') {
    return {
      text: (
        <>
          Die Sporthalle soll für {pp(data.capital)} € renoviert werden. Die
          Schule nimmt dafür einen Kredit mit einem Zinssatz von {pp(data.rate)}{' '}
          % auf.
        </>
      ),
      question: `Berechnen Sie, wie viel Zinsen für ${data.months} Monate bezahlt werden müssen.`,
    }
  }

  if (data.kontext === 'computerraum') {
    return {
      text: (
        <>
          Der Computerraum soll für {pp(data.capital)} € neu ausgestattet
          werden. Die Schule nimmt dafür einen Kredit mit einem Zinssatz von{' '}
          {pp(data.rate)} % auf.
        </>
      ),
      question: `Berechnen Sie, wie viel Zinsen für ${data.months} Monate bezahlt werden müssen.`,
    }
  }

  return {
    text: (
      <>
        Das Dach einer Hütte soll für {pp(data.capital)} € erneuert werden. Die
        Schule nimmt dafür einen Kredit mit einem Zinssatz von {pp(data.rate)} %
        auf.
      </>
    ),
    question: `Berechnen Sie, wie viel Zinsen für ${data.months} Monate bezahlt werden müssen.`,
  }
}

export const exercise9017: Exercise<DATA> = {
  title: 'Teil 2: Zinsen',
  source: '2025',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'huette',
      'schulbus',
      'sporthalle',
      'computerraum',
    ])

    const capital = rng.randomItemFromArray([
      12000, 18000, 25000, 32000, 45000, 60000,
    ])
    const rate = rng.randomItemFromArray([3, 4, 5, 6, 7, 8])
    const months = rng.randomIntBetween(3, 10)
    const interest = round2((capital * rate * months * 30) / (100 * 360))

    return { kontext, capital, rate, months, interest }
  },

  originalData: {
    kontext: 'huette',
    capital: 45000,
    rate: 6,
    months: 5,
    interest: 1125,
  },

  constraint({ data }) {
    return data.interest > 0
  },

  task({ data }) {
    const context = getContext(data)

    return (
      <>
        <p>{context.text}</p>
        <p>{context.question}</p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>
          {data.months} Monate sind {data.months * 30} Tage.
        </p>

        <InlineMath math={`Z=\\frac{K\\cdot p\\cdot t}{100\\cdot 360}`} />

        <p>
          Einsetzen der Werte:
          <br />
          <InlineMath
            math={`Z=\\frac{${pp(data.capital)}\\cdot ${pp(
              data.rate,
            )}\\cdot ${data.months * 30}}{100\\cdot 360}`}
          />
          <br />
          <InlineMath math={`Z=${pp(data.interest)}\\,€`} />
        </p>
      </>
    )
  },
}
