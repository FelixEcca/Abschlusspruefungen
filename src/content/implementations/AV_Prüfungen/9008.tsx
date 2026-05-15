// exercise9008.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit =
  | 'mg'
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'ct'
  | '€'
  | 'mm³'
  | 'cm³'
  | 'dm³'
  | 'm³'

interface Conversion {
  value: number
  from: Unit
  to: Unit
  result: number
}

interface DATA {
  conversions: Conversion[]
}

function factorToBase(unit: Unit) {
  // Masse: Basis g
  if (unit === 'mg') return 0.001
  if (unit === 'g') return 1
  if (unit === 'kg') return 1000

  // Volumen Flüssigkeiten: Basis l
  if (unit === 'ml') return 0.001
  if (unit === 'l') return 1

  // Geld: Basis €
  if (unit === 'ct') return 0.01
  if (unit === '€') return 1

  // Raummaß: Basis m³
  if (unit === 'mm³') return 0.000000001
  if (unit === 'cm³') return 0.000001
  if (unit === 'dm³') return 0.001
  if (unit === 'm³') return 1

  return 1
}

function convert(value: number, from: Unit, to: Unit) {
  return (value * factorToBase(from)) / factorToBase(to)
}

function round6(x: number) {
  return Math.round(x * 1000000) / 1000000
}

function unitLatex(unit: Unit) {
  if (unit === '€') return '€'
  if (unit === 'mm³') return '\\mathrm{mm}^3'
  if (unit === 'cm³') return '\\mathrm{cm}^3'
  if (unit === 'dm³') return '\\mathrm{dm}^3'
  if (unit === 'm³') return '\\mathrm{m}^3'
  return `\\mathrm{${unit}}`
}

function createMassConversion(rng: any): Conversion {
  const pairs: [Unit, Unit][] = [
    ['mg', 'g'],
    ['g', 'mg'],
    ['g', 'kg'],
    ['kg', 'g'],
  ]

  const [from, to] = rng.randomItemFromArray(pairs)

  let value = 0
  if (from === 'mg') {
    value = rng.randomItemFromArray([250, 500, 750, 1200, 3500, 4800])
  } else if (from === 'g') {
    value = rng.randomItemFromArray([125, 250, 725, 900, 1200, 3500])
  } else {
    value = rng.randomItemFromArray([0.5, 1.2, 2.5, 4.8, 7.5])
  }

  return {
    value,
    from,
    to,
    result: round6(convert(value, from, to)),
  }
}

function createLiquidConversion(rng: any): Conversion {
  const pairs: [Unit, Unit][] = [
    ['ml', 'l'],
    ['l', 'ml'],
  ]

  const [from, to] = rng.randomItemFromArray(pairs)

  const value =
    from === 'ml'
      ? rng.randomItemFromArray([250, 500, 750, 1250, 1500, 2750])
      : rng.randomItemFromArray([0.25, 0.5, 1.2, 2.5, 7.8, 12.7])

  return {
    value,
    from,
    to,
    result: round6(convert(value, from, to)),
  }
}

function createMoneyConversion(rng: any): Conversion {
  const pairs: [Unit, Unit][] = [
    ['ct', '€'],
    ['€', 'ct'],
  ]

  const [from, to] = rng.randomItemFromArray(pairs)

  const value =
    from === 'ct'
      ? rng.randomItemFromArray([125, 250, 875, 950, 1200, 3500])
      : rng.randomItemFromArray([1.25, 2.5, 8.75, 12, 24.5, 36])

  return {
    value,
    from,
    to,
    result: round6(convert(value, from, to)),
  }
}

function createVolumeConversion(rng: any): Conversion {
  const pairs: [Unit, Unit][] = [
    ['mm³', 'cm³'],
    ['cm³', 'mm³'],
    ['cm³', 'dm³'],
    ['dm³', 'cm³'],
    ['dm³', 'm³'],
    ['m³', 'dm³'],
  ]

  const [from, to] = rng.randomItemFromArray(pairs)

  let value = 0
  if (from === 'mm³') {
    value = rng.randomItemFromArray([250, 500, 950, 1200, 3500, 4800])
  } else if (from === 'cm³') {
    value = rng.randomItemFromArray([12, 25, 56, 125, 250, 562])
  } else if (from === 'dm³') {
    value = rng.randomItemFromArray([0.25, 0.5, 1.2, 2.5, 5.6, 12])
  } else {
    value = rng.randomItemFromArray([0.25, 0.5, 1.2, 2.5, 4.8])
  }

  return {
    value,
    from,
    to,
    result: round6(convert(value, from, to)),
  }
}

export const exercise9008: Exercise<DATA> = {
  title: 'Teil 1: Einheiten umwandeln 2',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const conversions: Conversion[] = [
      createMassConversion(rng),
      createLiquidConversion(rng),
      createMoneyConversion(rng),
      createVolumeConversion(rng),
      createVolumeConversion(rng),
    ]

    return { conversions: rng.shuffleArray(conversions) }
  },

  originalData: {
    conversions: [
      {
        value: 725,
        from: 'g',
        to: 'kg',
        result: 0.725,
      },
      {
        value: 562,
        from: 'm³',
        to: 'dm³',
        result: 562000,
      },
      {
        value: 12.75,
        from: 'l',
        to: 'ml',
        result: 12750,
      },
      {
        value: 8750,
        from: 'ct',
        to: '€',
        result: 87.5,
      },
      {
        value: 95,
        from: 'mm³',
        to: 'cm³',
        result: 0.095,
      },
    ],
  },

  constraint({ data }) {
    return data.conversions.length === 5
  },

  task({ data }) {
    return (
      <>
        <p>Wandeln Sie in die Klammern angegebene Einheit um.</p>

        {data.conversions.map((conv, i) => (
          <p key={i}>
            {pp(conv.value)} {conv.from} ({conv.to})
          </p>
        ))}
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        {data.conversions.map((conv, i) => (
          <p key={i}>
            <InlineMath
              math={`${pp(conv.value)}\\,${unitLatex(conv.from)}=${pp(
                conv.result,
              )}\\,${unitLatex(conv.to)}`}
            />
          </p>
        ))}
        <h2>Erklärvideos</h2>
        <p>Hier gibt es noch ein Erklärungsvideo zu Geld:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/GBGyn_SJ9Ig"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
        <p>Hier gibt es noch ein Erklärungsvideo zu Volumen:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/NItq_I7Yz9M"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
        <p>Hier gibt es noch ein Erklärungsvideo zu Masseneinheiten:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/fxD5937olmU"
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
