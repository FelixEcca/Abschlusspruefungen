// exercise9026.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type Kontext = 'supermarkt' | 'party' | 'grillfest' | 'klassenfest'

interface DATA {
  kontext: Kontext
  items: string[]
  prices: number[]
  total: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'party') return 'Sie kaufen für eine Party ein:'
  if (data.kontext === 'grillfest') return 'Sie kaufen für ein Grillfest ein:'
  if (data.kontext === 'klassenfest')
    return 'Sie kaufen für ein Klassenfest ein:'
  return 'Sie kaufen im örtlichen Supermarkt ein:'
}

function splitMoney(value: number) {
  const [euros, cents] = value.toFixed(2).split('.')
  return { euros, cents }
}

function getCarriesByColumn(addends: string[]) {
  const columnCount = addends[0].length
  const carries = Array<string>(columnCount).fill('')
  let carry = 0

  for (let col = columnCount - 1; col >= 0; col--) {
    let columnSum = carry
    for (const addend of addends) {
      columnSum += Number(addend[col])
    }

    carry = Math.floor(columnSum / 10)
    if (carry > 0 && col > 0) {
      carries[col - 1] = String(carry)
    }
  }

  return carries
}

function buildMoneyCells(
  euros: string,
  cents: string,
  maxEuroDigits: number,
  sign = '',
) {
  return [
    sign,
    ...euros.padStart(maxEuroDigits, ' ').split(''),
    ',',
    ...cents.split(''),
    '€',
  ]
}

export const exercise9026: Exercise<DATA> = {
  title: 'Teil 1: Einkauf berechnen',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'supermarkt',
      'party',
      'grillfest',
      'klassenfest',
    ])

    const pools = {
      supermarkt: ['Getränke', 'Bratwürste', 'Gemüsespieße', 'Brot', 'Obst'],
      party: ['Getränke', 'Snacks', 'Pizza', 'Deko', 'Eis'],
      grillfest: ['Grillfleisch', 'Salate', 'Baguette', 'Getränke', 'Soßen'],
      klassenfest: ['Kuchen', 'Getränke', 'Becher', 'Servietten', 'Obst'],
    }

    const items = pools[kontext]
    const prices = items.map(() => round2(rng.randomIntBetween(200, 1200) / 10))
    const total = round2(prices.reduce((s, p) => s + p, 0))

    return { kontext, items, prices, total }
  },

  originalData: {
    kontext: 'supermarkt',
    items: ['Getränke', 'Bratwürste', 'Gemüsespieße', 'Brot', 'Obst'],
    prices: [102.5, 88.2, 47.9, 78.5, 50],
    total: 367.1,
  },

  constraint({ data }) {
    return data.total > 0
  },

  task({ data }) {
    return (
      <>
        <p>{getContext(data)}</p>
        <p>
          {data.items.map((item, i) => (
            <span key={item}>
              {item}: {pp(data.prices[i])} €<br />
            </span>
          ))}
        </p>
        <p>Berechnen Sie, wie viel Sie für den Einkauf bezahlen müssen.</p>
      </>
    )
  },

  solution({ data }) {
    const splitPrices = data.prices.map(splitMoney)
    const sum = splitMoney(data.total)
    const maxEuroDigits = Math.max(
      ...splitPrices.map(p => p.euros.length),
      sum.euros.length,
    )

    const addends = splitPrices.map(
      p => `${p.euros.padStart(maxEuroDigits, '0')}${p.cents}`,
    )
    const carries = getCarriesByColumn(addends)
    const carryRow = [
      ' ',
      ...carries.slice(0, maxEuroDigits),
      ',',
      ...carries.slice(maxEuroDigits),
      ' ',
    ]
    const rows = [
      buildMoneyCells(
        splitPrices[0].euros,
        splitPrices[0].cents,
        maxEuroDigits,
      ),
      ...splitPrices
        .slice(1)
        .map(price =>
          buildMoneyCells(price.euros, price.cents, maxEuroDigits, '+'),
        ),
    ]
    const sumRow = buildMoneyCells(sum.euros, sum.cents, maxEuroDigits)

    return (
      <>
        <p>Alle Beträge werden untereinander geschrieben und addiert:</p>
        <div className="my-4 inline-block">
          <table
            className="border-collapse font-mono text-m leading-tight"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`row-${rowIndex}-${cellIndex}`}
                      className="px-1 text-center"
                    >
                      {cell === ' ' ? '\u00A0' : cell}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="text-xs text-slate-500">
                {carryRow.map((cell, index) => (
                  <td key={`carry-${index}`} className="px-1 text-center">
                    {cell === ' ' ? '\u00A0' : cell}
                  </td>
                ))}
              </tr>
              <tr>
                {sumRow.map((cell, index) => (
                  <td
                    key={`sum-${index}`}
                    className="border-t border-slate-700 px-1 text-center"
                  >
                    {cell === ' ' ? '\u00A0' : cell}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Sie müssen <b>{pp(data.total)} €</b> bezahlen.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/oIVm7ucnapE"
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
