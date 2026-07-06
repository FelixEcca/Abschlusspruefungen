// exercise9049.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type Kontext = 'smartphone' | 'laptop' | 'fahrrad' | 'reise' | 'moebel'

interface DATA {
  kontext: Kontext
  itemName: string
  target: number
  savings: number
  credit: number
  interestRate: number
  months: number
  yearlyInterest: number
  monthlyInterest: number
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(kontext: Kontext) {
  if (kontext === 'laptop') return 'Laptop'
  if (kontext === 'fahrrad') return 'E-Bike'
  if (kontext === 'reise') return 'Reise'
  if (kontext === 'moebel') return 'Möbel'
  return 'Smartphone'
}

export const exercise9049: Exercise<DATA> = {
  title: 'Teil 2: Kreditzinsen',
  source: '2024',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'smartphone',
      'laptop',
      'fahrrad',
      'reise',
      'moebel',
    ])

    const itemName = getContext(kontext)
    const target = rng.randomItemFromArray([900, 1000, 1200, 1500, 1800])
    const savings = rng.randomItemFromArray([400, 500, 650, 750, 900])
    const credit = target - savings
    const interestRate = rng.randomItemFromArray([6.5, 8.9, 10, 11.95, 12.5])
    const months = rng.randomItemFromArray([3, 6, 9])

    const yearlyInterest = round2((credit * interestRate) / 100)
    const monthlyInterest = round2(yearlyInterest / 12)
    const result = round2(monthlyInterest * months)

    return {
      kontext,
      itemName,
      target,
      savings,
      credit,
      interestRate,
      months,
      yearlyInterest,
      monthlyInterest,
      result,
    }
  },

  originalData: {
    kontext: 'smartphone',
    itemName: 'ein Smartphone',
    target: 1200,
    savings: 750,
    credit: 450,
    interestRate: 11.95,
    months: 6,
    yearlyInterest: 53.78,
    monthlyInterest: 4.48,
    result: 26.88,
  },

  constraint({ data }) {
    return data.credit > 0 && data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>Nach einem halben Jahr haben Sie {pp(data.savings)} € angespart.</p>

        <p>
          Um das {data.itemName} für {pp(data.target)} € jetzt schon kaufen zu
          können, nehmen Sie für den Rest einen Kredit bei der Bank auf.
          <br />
          Für die Zinsen gilt ein jährlicher Zinssatz von{' '}
          {pp(data.interestRate)} %.
        </p>

        <p>
          Berechnen Sie, wie viel Zinsen Sie der Bank nach {data.months} Monaten
          bezahlen müssen.
        </p>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Zuerst wird berechnet, wie hoch der Kredit ist:</p>

        <p>
          {pp(data.target)} € - {pp(data.savings)} € ={' '}
          <b>{pp(data.credit)} €</b>
        </p>

        <p>Berechne die Zinsen mit dem Dreisatz:</p>

        <svg viewBox="0 0 328 185">
          <image
            href="/content/Mathe_AV/Dreisatz.PNG"
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
            {pp(data.credit)}
          </text>

          <text x="120" y="92" fontSize="15" textAnchor="middle">
            1
          </text>
          <text x="200" y="92" fontSize="15" textAnchor="middle">
            {pp(data.credit / 100)}
          </text>

          <text x="120" y="142" fontSize="15" textAnchor="middle">
            {pp(data.interestRate)}
          </text>
          <text x="200" y="142" fontSize="15" textAnchor="middle">
            {pp(data.yearlyInterest)}
          </text>

          <text x="22" y="72" fontSize="14">
            : 100
          </text>
          <text x="22" y="123" fontSize="14">
            · {pp(data.interestRate)}
          </text>

          <text x="284" y="72" fontSize="14">
            : 100
          </text>
          <text x="284" y="123" fontSize="14">
            · {pp(data.interestRate)}
          </text>
        </svg>

        <p>
          Die Jahreszinsen betragen <b>{pp(data.yearlyInterest)} €</b>.
        </p>

        <p>Nun werden die Zinsen für einen Monat berechnet:</p>

        <p>
          {pp(data.yearlyInterest)} € : 12 = {pp(data.monthlyInterest)} €
        </p>

        <p>Die Zinsen für {data.months} Monate betragen:</p>

        <p>
          {pp(data.monthlyInterest)} € · {data.months} ={' '}
          <b>{pp(data.result)} €</b>
        </p>

        <p>
          Sie müssen nach {data.months} Monaten <b>{pp(data.result)} €</b>{' '}
          Zinsen bezahlen.
        </p>
      </>
    )
  },
}
