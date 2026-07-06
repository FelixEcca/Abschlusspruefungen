// exercise9527.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'mg' | 'g' | 'kg' | 't'

interface DATA {
  value: number
  from: Unit
  to: Unit
  result: number
}

function factor(u: Unit) {
  if (u === 'mg') return 0.001
  if (u === 'g') return 1
  if (u === 'kg') return 1000
  return 1000000
}

function unit(u: Unit) {
  return `\\mathrm{${u}}`
}

export const exercise9527: Exercise<DATA> = {
  title: 'Gewicht umwandeln',
  source: 'Einheiten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pairs: [Unit, Unit][] = [
      ['mg', 'g'],
      ['g', 'mg'],
      ['g', 'kg'],
      ['kg', 'g'],
      ['kg', 't'],
      ['t', 'kg'],
    ]
    const [from, to] = rng.randomItemFromArray(pairs)
    const value =
      from === 'kg' || from === 't'
        ? rng.randomItemFromArray([0.5, 1.2, 2.5, 7.5])
        : rng.randomItemFromArray([125, 250, 725, 1200, 3500])
    const result =
      Math.round(((value * factor(from)) / factor(to)) * 1000000) / 1000000

    return { value, from, to, result }
  },

  originalData: {
    value: 725,
    from: 'g',
    to: 'kg',
    result: 0.725,
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
    const instruction =
      factor(data.to) > factor(data.from)
        ? 'Dividiere durch 1000.'
        : 'Multipliziere mit 1000.'

    return (
      <>
        <svg viewBox="0 0 328 100">
          <image
            href="/content/Mathe_AV/gewicht.png"
            height="100"
            width="328"
          />
        </svg>
        <p>{instruction}</p>
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
