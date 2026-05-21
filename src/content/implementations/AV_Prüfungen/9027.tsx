// exercise9027.tsx
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type Kontext = 'pfandbon' | 'gutschein' | 'rabattkarte' | 'guthaben'

interface DATA {
  kontext: Kontext
  price: number
  discount: number
  result: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function getContext(data: DATA) {
  if (data.kontext === 'gutschein') {
    return `Sie haben noch einen Gutschein im Wert von ${pp(
      data.discount,
    )} €, den Sie an der Kasse einlösen. Angenommen der Einkauf kostet ${pp(
      data.price,
    )} €.`
  }

  if (data.kontext === 'rabattkarte') {
    return `Sie haben eine Rabattkarte im Wert von ${pp(
      data.discount,
    )} €. Angenommen der Einkauf kostet ${pp(data.price)} €.`
  }

  if (data.kontext === 'guthaben') {
    return `Sie haben noch ein Guthaben im Wert von ${pp(
      data.discount,
    )} €. Angenommen der Einkauf kostet ${pp(data.price)} €.`
  }

  return `Sie haben noch einen Pfandbon im Wert von ${pp(
    data.discount,
  )} €, den Sie an der Kasse einlösen. Angenommen der Einkauf kostet ${pp(
    data.price,
  )} €.`
}

function splitMoney(value: number) {
  const [euros, cents] = value.toFixed(2).split('.')
  return { euros, cents }
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

function getBorrowMarkers(minuend: string, subtrahend: string) {
  const markers = Array<string>(minuend.length).fill(' ')
  let borrow = 0

  for (let index = minuend.length - 1; index >= 0; index--) {
    const topDigit = Number(minuend[index]) - borrow
    const bottomDigit = Number(subtrahend[index])

    if (topDigit < bottomDigit && index > 0) {
      markers[index - 1] = '1'
      borrow = 1
      continue
    }

    borrow = 0
  }

  return markers
}

function buildBorrowCells(markers: string[], maxEuroDigits: number) {
  return [
    ' ',
    ...markers.slice(0, maxEuroDigits),
    ',',
    ...markers.slice(maxEuroDigits),
    ' ',
  ]
}

export const exercise9027: Exercise<DATA> = {
  title: 'Teil 1: Betrag abziehen',
  source: '2024',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const kontext: Kontext = rng.randomItemFromArray([
      'pfandbon',
      'gutschein',
      'rabattkarte',
      'guthaben',
    ])

    const price = round2(rng.randomIntBetween(15000, 50000) / 100)
    const discount = round2(rng.randomIntBetween(500, 8000) / 100)
    const result = round2(price - discount)

    return { kontext, price, discount, result }
  },

  originalData: {
    kontext: 'pfandbon',
    price: 367.1,
    discount: 36.76,
    result: 330.34,
  },

  constraint({ data }) {
    return data.result > 0
  },

  task({ data }) {
    return (
      <>
        <p>{getContext(data)}</p>
        <p>Berechnen Sie den Preis nach Abzug.</p>
      </>
    )
  },

  solution({ data }) {
    const price = splitMoney(data.price)
    const discount = splitMoney(data.discount)
    const result = splitMoney(data.result)
    const maxEuroDigits = Math.max(
      price.euros.length,
      discount.euros.length,
      result.euros.length,
    )

    const topRow = buildMoneyCells(price.euros, price.cents, maxEuroDigits)
    const subtractionRow = buildMoneyCells(
      discount.euros,
      discount.cents,
      maxEuroDigits,
      '-',
    )
    const resultRow = buildMoneyCells(result.euros, result.cents, maxEuroDigits)
    const minuendDigits = `${price.euros.padStart(maxEuroDigits, '0')}${price.cents}`
    const subtrahendDigits = `${discount.euros.padStart(maxEuroDigits, '0')}${discount.cents}`
    const borrowRow = buildBorrowCells(
      getBorrowMarkers(minuendDigits, subtrahendDigits),
      maxEuroDigits,
    )

    return (
      <>
        <p>Der Betrag wird abgezogen:</p>
        <div className="my-4 inline-block">
          <table
            className="border-collapse font-mono text-m leading-tight"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            <tbody>
              <tr>
                {topRow.map((cell, index) => (
                  <td key={`top-${index}`} className="px-1 text-center">
                    {cell === ' ' ? '\u00A0' : cell}
                  </td>
                ))}
              </tr>
              <tr>
                {subtractionRow.map((cell, index) => (
                  <td key={`subtraction-${index}`} className="px-1 text-center">
                    {cell === ' ' ? '\u00A0' : cell}
                  </td>
                ))}
              </tr>
              <tr className="text-xs text-slate-500">
                {borrowRow.map((cell, index) => (
                  <td key={`borrow-${index}`} className="px-1 text-center">
                    {cell === ' ' ? '\u00A0' : cell}
                  </td>
                ))}
              </tr>
              <tr>
                {resultRow.map((cell, index) => (
                  <td
                    key={`result-${index}`}
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
          Der neue Preis beträgt <b>{pp(data.result)} €</b>.
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/wBJhS-fuB74"
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
