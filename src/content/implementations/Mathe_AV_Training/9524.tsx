// exercise9524.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'mm' | 'cm' | 'dm' | 'm' | 'km'

interface DATA {
  value: number
  from: Unit
  to: Unit
  result: number
}

function factor(u: Unit) {
  if (u === 'mm') return 0.001
  if (u === 'cm') return 0.01
  if (u === 'dm') return 0.1
  if (u === 'm') return 1
  return 1000
}

function unit(u: Unit) {
  return `\\mathrm{${u}}`
}

export const exercise9524: Exercise<DATA> = {
  title: 'Längen umwandeln',
  source: 'Einheiten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
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
    const value =
      from === 'km'
        ? rng.randomItemFromArray([0.5, 1.2, 2.5])
        : from === 'm'
          ? rng.randomItemFromArray([0.5, 1.2, 3.5, 12])
          : rng.randomIntBetween(12, 950)

    const result =
      Math.round(((value * factor(from)) / factor(to)) * 10000) / 10000

    return { value, from, to, result }
  },

  originalData: {
    value: 75,
    from: 'cm',
    to: 'dm',
    result: 7.5,
  },

  constraint() {
    return true
  },

  task({ data }) {
    return (
      <p>
        Wandeln Sie um:{' '}
        <InlineMath math={`${pp(data.value)}\\,${unit(data.from)}`} /> in{' '}
        <InlineMath math={unit(data.to)} />.
      </p>
    )
  },

  solution({ data }) {
    return (
      <>
        <svg viewBox="0 0 328 100">
          <image
            href="/content/AV_Prüfungen/länge.png"
            height="100"
            width="328"
          />
        </svg>
        <br></br>
        <InlineMath
          math={`${pp(data.value)}\\,${unit(data.from)}=${pp(
            data.result,
          )}\\,${unit(data.to)}`}
        />
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/GUepNEC48WI"
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
