// exercise9007.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'mm' | 'cm' | 'dm' | 'm' | 'km' | 'mm²' | 'cm²' | 'dm²' | 'm²'

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
  // Basis für Längen: m
  if (unit === 'mm') return 0.001
  if (unit === 'cm') return 0.01
  if (unit === 'dm') return 0.1
  if (unit === 'm') return 1
  if (unit === 'km') return 1000

  // Basis für Flächen: m²
  if (unit === 'mm²') return 0.000001
  if (unit === 'cm²') return 0.0001
  if (unit === 'dm²') return 0.01
  if (unit === 'm²') return 1

  return 1
}

function convert(value: number, from: Unit, to: Unit) {
  return (value * factorToBase(from)) / factorToBase(to)
}

function round4(x: number) {
  return Math.round(x * 10000) / 10000
}

function unitLatex(unit: Unit) {
  if (unit === 'mm²') return '\\mathrm{mm}^2'
  if (unit === 'cm²') return '\\mathrm{cm}^2'
  if (unit === 'dm²') return '\\mathrm{dm}^2'
  if (unit === 'm²') return '\\mathrm{m}^2'
  return `\\mathrm{${unit}}`
}

function createLengthConversion(rng: any): Conversion {
  // Nur benachbarte Längeneinheiten
  // Achtung: m und km sind hier direkte Nachbarn, weil dazwischen keine der verwendeten Einheiten liegt.
  const pairs: [Unit, Unit][] = [
    ['mm', 'cm'],
    ['cm', 'mm'],
    ['cm', 'dm'],
    ['dm', 'cm'],
    ['dm', 'm'],
    ['m', 'dm'],
    ['m', 'km'],
    ['km', 'm'],
  ]

  const [from, to] = rng.randomItemFromArray(pairs)

  let value = 0

  if (from === 'km') {
    value = rng.randomItemFromArray([0.25, 0.48, 0.72, 1.5, 2.4, 3.75])
  } else if (from === 'm') {
    value = rng.randomItemFromArray([0.5, 1.2, 2.5, 3.6, 7.8, 12])
  } else if (from === 'dm') {
    value = rng.randomItemFromArray([3.5, 8, 12, 24, 36])
  } else if (from === 'cm') {
    value = rng.randomItemFromArray([7.5, 9.3, 12.6, 25, 48, 125])
  } else {
    value = rng.randomIntBetween(120, 9500)
  }

  return {
    value,
    from,
    to,
    result: round4(convert(value, from, to)),
  }
}

function createAreaConversion(rng: any): Conversion {
  // Nur benachbarte Flächeneinheiten
  const pairs: [Unit, Unit][] = [
    ['mm²', 'cm²'],
    ['cm²', 'mm²'],
    ['cm²', 'dm²'],
    ['dm²', 'cm²'],
    ['dm²', 'm²'],
    ['m²', 'dm²'],
  ]

  const [from, to] = rng.randomItemFromArray(pairs)

  let value = 0

  if (from === 'm²') {
    value = rng.randomItemFromArray([0.25, 0.5, 1.2, 2.4, 3.5])
  } else if (from === 'dm²') {
    value = rng.randomItemFromArray([4.2, 8, 15, 24, 36, 75])
  } else if (from === 'cm²') {
    value = rng.randomItemFromArray([12, 25, 48, 72, 120, 350])
  } else {
    value = rng.randomItemFromArray([150, 240, 350, 480, 1250, 3600])
  }

  return {
    value,
    from,
    to,
    result: round4(convert(value, from, to)),
  }
}

export const exercise9007: Exercise<DATA> = {
  title: 'Teil 1: Einheiten umwandeln',
  source: '2025',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const conversions: Conversion[] = []

    conversions.push(createLengthConversion(rng))
    conversions.push(createLengthConversion(rng))
    conversions.push(createLengthConversion(rng))
    conversions.push(createAreaConversion(rng))
    conversions.push(createAreaConversion(rng))

    return { conversions: rng.shuffleArray(conversions) }
  },

  originalData: {
    conversions: [
      {
        value: 7562,
        from: 'mm',
        to: 'cm',
        result: 756.2,
      },
      {
        value: 92.3,
        from: 'cm',
        to: 'mm',
        result: 923,
      },
      {
        value: 0.72,
        from: 'km',
        to: 'm',
        result: 720,
      },
      {
        value: 240,
        from: 'm²',
        to: 'dm²',
        result: 24000,
      },
      {
        value: 3.5,
        from: 'mm²',
        to: 'cm²',
        result: 0.035,
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
        <p>Hier gibt es noch ein Erklärungsvideo zu Längeneinheiten:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/iRh4wA6TVy4"
            title="Erklärungsvideo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded border"
          />
        </div>
        <p>Hier gibt es noch ein Erklärungsvideo zu Flächeneinheiten:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/bEgBxIdZZLs"
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
