import { Exercise } from '@/data/types'

type Operation = 'multiply' | 'divide'

interface Item {
  mantissa: number
  decimalPlaces: number
  operation: Operation
  factor: 10 | 100 | 1000
}

interface DATA {
  item: Item
}

function placesFor(factor: Item['factor']) {
  if (factor === 10) return 1
  if (factor === 100) return 2
  return 3
}

function formatDecimal(
  mantissa: number,
  decimalPlaces: number,
  trim = false,
) {
  if (decimalPlaces <= 0) {
    return `${mantissa}${'0'.repeat(Math.abs(decimalPlaces))}`
  }

  const padded = `${mantissa}`.padStart(decimalPlaces + 1, '0')
  const integerPart = padded.slice(0, -decimalPlaces)
  let decimalPart = padded.slice(-decimalPlaces)

  if (trim) {
    decimalPart = decimalPart.replace(/0+$/, '')
  }

  return decimalPart ? `${integerPart},${decimalPart}` : integerPart
}

function valueText(item: Item) {
  return formatDecimal(item.mantissa, item.decimalPlaces)
}

function resultDecimalPlaces(item: Item) {
  const places = placesFor(item.factor)
  return item.operation === 'multiply'
    ? item.decimalPlaces - places
    : item.decimalPlaces + places
}

function resultText(item: Item) {
  return formatDecimal(item.mantissa, resultDecimalPlaces(item), true)
}

function operationText(item: Item) {
  return item.operation === 'multiply' ? '·' : ':'
}

function directionText(item: Item) {
  return item.operation === 'multiply' ? 'rechts' : 'links'
}

function actionText(item: Item) {
  return item.operation === 'multiply' ? 'multipliziert' : 'dividiert'
}

function makeItem(
  rng: any,
  operation: Operation,
  decimalPlaces: number,
): Item {
  return {
    mantissa:
      decimalPlaces === 0
        ? rng.randomIntBetween(2, 950)
        : rng.randomIntBetween(12, 950),
    decimalPlaces,
    operation,
    factor: rng.randomItemFromArray([10, 100, 1000]),
  }
}

export const exercise9658: Exercise<DATA> = {
  title: 'Rechnen mit 10er-Zahlen',
  source: 'Einheiten',
  useCalculator: false,
  duration: 10,
  points: 10,

  generator(rng) {
    const operation: Operation = rng.randomItemFromArray(['multiply', 'divide'])
    const decimalPlaces = rng.randomItemFromArray([0, 1, 2, 3])

    return {
      item: makeItem(rng, operation, decimalPlaces),
    }
  },

  originalData: {
    item: { mantissa: 47, decimalPlaces: 1, operation: 'multiply', factor: 10 },
  },

  task({ data }) {
    const item = data.item

    return (
      <>
        <p>Berechnen Sie.</p>
        <div className="my-4 max-w-sm rounded border border-slate-300 bg-white px-4 py-3">
          <div className="text-lg">
            {valueText(item)} {operationText(item)} {item.factor} =
          </div>
          <div className="mt-3 border-b border-slate-500" />
        </div>
      </>
    )
  },

  solution({ data }) {
    const item = data.item
    const places = placesFor(item.factor)
    const stellen = places === 1 ? 'Stelle' : 'Stellen'

    return (
      <>
        <p>
          Bei einer 10er-Zahl verschiebt sich das Komma. Die Anzahl der Nullen
          gibt an, um wie viele Stellen verschoben wird.
        </p>
        <div className="my-4 max-w-xl rounded border border-slate-300 bg-white px-4 py-3">
          <p className="text-lg">
            {valueText(item)} {operationText(item)} {item.factor} ={' '}
            <b>{resultText(item)}</b>
          </p>
          <p>
            Es wird durch <b>{item.factor}</b> {actionText(item)}. Das Komma
            wandert deshalb <b>{places}</b> {stellen} nach{' '}
            <b>{directionText(item)}</b>.
          </p>
          <p className="text-lg">
            {valueText(item)} → <b>{resultText(item)}</b>
          </p>
        </div>
      </>
    )
  },
}
