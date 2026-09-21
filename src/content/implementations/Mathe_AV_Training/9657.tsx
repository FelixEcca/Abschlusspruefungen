import { Exercise } from '@/data/types'

interface Comparison {
  left: string
  right: string
  leftValue: number
  rightValue: number
  hint: string
}

interface DATA {
  items: Comparison[]
}

const comparisons: Comparison[] = [
  {
    left: '3,10',
    right: '3,1',
    leftValue: 3.1,
    rightValue: 3.1,
    hint: 'Die zusätzliche 0 nach dem Komma verändert die Stelle auf dem Zahlenstrahl nicht.',
  },
  {
    left: '0,90',
    right: '0,9',
    leftValue: 0.9,
    rightValue: 0.9,
    hint: '0,90 und 0,9 stehen an derselben Stelle.',
  },
  {
    left: '2,09',
    right: '2,10',
    leftValue: 2.09,
    rightValue: 2.1,
    hint: 'Schreibe beide Zahlen mit gleich vielen Stellen: 2,09 und 2,10.',
  },
  {
    left: '4,50',
    right: '4,05',
    leftValue: 4.5,
    rightValue: 4.05,
    hint: 'Schreibe 4,50 und 4,05 untereinander. Nach dem Komma entscheidet schon die erste unterschiedliche Stelle.',
  },
  {
    left: '12,099',
    right: '12,1',
    leftValue: 12.099,
    rightValue: 12.1,
    hint: '12,1 kann man als 12,100 schreiben.',
  },
  {
    left: '0,08',
    right: '0,8',
    leftValue: 0.08,
    rightValue: 0.8,
    hint: '0,8 kann man als 0,80 schreiben. Dann sieht man den Unterschied leichter.',
  },
  {
    left: '7,007',
    right: '7,07',
    leftValue: 7.007,
    rightValue: 7.07,
    hint: '7,07 kann man als 7,070 schreiben.',
  },
  {
    left: '1005',
    right: '995',
    leftValue: 1005,
    rightValue: 995,
    hint: 'Bei ganzen Zahlen entscheidet hier schon die Tausenderstelle.',
  },
  {
    left: '−3,2',
    right: '−3,02',
    leftValue: -3.2,
    rightValue: -3.02,
    hint: 'Bei negativen Zahlen liegt die Zahl weiter links, wenn der Betrag größer ist.',
  },
  {
    left: '−0,7',
    right: '−0,70',
    leftValue: -0.7,
    rightValue: -0.7,
    hint: 'Die zusätzliche 0 nach dem Komma verändert die Stelle auf dem Zahlenstrahl nicht.',
  },
  {
    left: '−1,05',
    right: '−1,5',
    leftValue: -1.05,
    rightValue: -1.5,
    hint: '−1,5 liegt weiter links auf dem Zahlenstrahl.',
  },
  {
    left: '5,099',
    right: '5,09',
    leftValue: 5.099,
    rightValue: 5.09,
    hint: '5,09 kann man als 5,090 schreiben.',
  },
]

function symbolFor({ leftValue, rightValue }: Comparison) {
  if (leftValue < rightValue) return '<'
  if (leftValue > rightValue) return '>'
  return '='
}

function isEqualComparison(item: Comparison) {
  return item.leftValue === item.rightValue
}

function NumberLine({ item }: { item: Comparison }) {
  const minValue = Math.min(item.leftValue, item.rightValue)
  const maxValue = Math.max(item.leftValue, item.rightValue)
  const range = maxValue - minValue
  const padding = range === 0 ? 1 : range * 1.2
  const lineMin = minValue - padding
  const lineMax = maxValue + padding
  const xFor = (value: number) =>
    28 + ((value - lineMin) / (lineMax - lineMin)) * 284
  const leftX = xFor(item.leftValue)
  const rightX = xFor(item.rightValue)
  const samePosition = item.leftValue === item.rightValue

  return (
    <svg viewBox="0 0 340 92" className="mt-2 max-w-md">
      <line x1="28" y1="46" x2="312" y2="46" stroke="#334155" />
      <path d="M312 46l-9 -5v10z" fill="#334155" />
      <text x="26" y="70" fontSize="11" textAnchor="middle" fill="#64748b">
        kleiner
      </text>
      <text x="312" y="70" fontSize="11" textAnchor="middle" fill="#64748b">
        größer
      </text>
      {samePosition ? (
        <>
          <circle cx={leftX} cy="46" r="6" fill="#7c3aed" />
          <line
            x1={leftX}
            y1="18"
            x2={leftX}
            y2="46"
            stroke="#7c3aed"
            strokeWidth="2"
          />
          <text
            x={leftX}
            y="14"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            fill="#5b21b6"
          >
            {item.left} = {item.right}
          </text>
        </>
      ) : (
        <>
          <circle cx={leftX} cy="46" r="6" fill="#2563eb" />
          <line
            x1={leftX}
            y1="24"
            x2={leftX}
            y2="46"
            stroke="#2563eb"
            strokeWidth="2"
          />
          <text
            x={leftX}
            y="18"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            fill="#1d4ed8"
          >
            {item.left}
          </text>
          <circle cx={rightX} cy="46" r="6" fill="#f97316" />
          <line
            x1={rightX}
            y1="24"
            x2={rightX}
            y2="46"
            stroke="#f97316"
            strokeWidth="2"
          />
          <text
            x={rightX}
            y="18"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            fill="#c2410c"
          >
            {item.right}
          </text>
        </>
      )}
    </svg>
  )
}

export const exercise9657: Exercise<DATA> = {
  title: 'Zahlen vergleichen',
  source: 'Grundlagen',
  useCalculator: false,
  duration: 12,
  points: 12,

  generator(rng) {
    const equalComparisons = comparisons.filter(isEqualComparison)
    const unequalComparisons = comparisons.filter(item => !isEqualComparison(item))
    const amount = rng.randomIntBetween(2, 3)
    const includeEqual = rng.randomIntBetween(1, 5) === 1
    const items = rng.shuffleArray(unequalComparisons).slice(0, amount)

    if (includeEqual) {
      items[0] = rng.randomItemFromArray(equalComparisons)
    }

    return {
      items: rng.shuffleArray(items),
    }
  },

  originalData: {
    items: [comparisons[2], comparisons[3], comparisons[4]],
  },

  task({ data }) {
    return (
      <>
        <p>
          Setzen Sie jeweils das richtige Zeichen ein:{' '}
          <b>&lt;</b>, <b>&gt;</b> oder <b>=</b>.
        </p>
        <div className="my-4 grid gap-3">
          {data.items.map((item, index) => (
            <div
              key={`${item.left}-${item.right}-${index}`}
              className="grid max-w-sm grid-cols-[1fr_auto_1fr] items-center gap-4 rounded border border-slate-300 bg-slate-50 px-4 py-3 text-center text-xl"
            >
              <span>{item.left}</span>
              <span className="font-semibold text-slate-400">□</span>
              <span>{item.right}</span>
            </div>
          ))}
        </div>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Die richtigen Zeichen sind:</p>
        <div className="my-4 grid gap-3">
          {data.items.map((item, index) => (
            <div
              key={`${item.left}-${item.right}-${index}`}
              className="max-w-xl rounded border border-slate-300 bg-white px-4 py-3"
            >
              <p className="text-xl">
                {item.left} <b>{symbolFor(item)}</b> {item.right}
              </p>
              <NumberLine item={item} />
              <p className="text-sm text-slate-700">{item.hint}</p>
            </div>
          ))}
        </div>
      </>
    )
  },
}
