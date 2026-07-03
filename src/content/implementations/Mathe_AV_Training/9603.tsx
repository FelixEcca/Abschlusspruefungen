// exercise9603.tsx
import { Exercise } from '@/data/types'
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
    const capital = rng.randomItemFromArray([
      1000, 2000, 5000, 12000, 18000, 25000,
    ])
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
    const yearlyInterest = round2((data.capital * data.rate) / 100)
    const monthlyInterest = round2(yearlyInterest / 12)

    return (
      <>
        <p>Berechne mit dem Dreisatz zuerst die Jahreszinsen:</p>
        <svg viewBox="0 0 328 185">
          <image
            href="/content/AV_Prüfungen/Dreisatz.PNG"
            height="185"
            width="328"
          />
          <text x="120" y="12" fontSize="15" textAnchor="middle">
            %
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            €
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            100
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(data.capital)} €
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(data.capital / 100)} €
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.rate)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(yearlyInterest)} €
          </text>

          <text x="24" y="72" fontSize="14">
            : 100
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.rate)}
          </text>

          <text x="286" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.rate)}
          </text>
        </svg>

        <p>Dann werden die Zinsen für {data.months} Monate berechnet:</p>
        <svg viewBox="0 0 328 185">
          <image
            href="/content/AV_Prüfungen/Dreisatz.PNG"
            height="185"
            width="328"
          />
          <text x="120" y="12" fontSize="15" textAnchor="middle">
            Monate
          </text>
          <text x="205" y="12" fontSize="15" textAnchor="middle">
            €
          </text>

          <text x="120" y="42" fontSize="15" textAnchor="middle">
            12
          </text>
          <text x="200" y="42" fontSize="15" textAnchor="middle">
            {pp(yearlyInterest)} €
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(monthlyInterest)} €
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {data.months}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.interest)} €
          </text>

          <text x="24" y="72" fontSize="14">
            : 12
          </text>
          <text x="22" y="123" fontSize="14">
            · {data.months}
          </text>

          <text x="286" y="72" fontSize="14">
            : 12
          </text>
          <text x="284" y="123" fontSize="14">
            · {data.months}
          </text>
        </svg>
        <p>
          Die Zinsen betragen <b>{pp(data.interest)} €</b>.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/Yme_T-O_s2w"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
      </>
    )
  },
}
