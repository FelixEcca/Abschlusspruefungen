// exercise9528.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'ml' | 'l'

interface DATA {
  value: number
  from: Unit
  to: Unit
  result: number
}

function factor(u: Unit) {
  return u === 'ml' ? 0.001 : 1
}

function unit(u: Unit) {
  return `\\mathrm{${u}}`
}

export const exercise9528: Exercise<DATA> = {
  title: 'Liter und Milliliter',
  source: 'Einheiten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pairs: [Unit, Unit][] = [
      ['ml', 'l'],
      ['l', 'ml'],
    ]
    const [from, to] = rng.randomItemFromArray(pairs)
    const value =
      from === 'l'
        ? rng.randomItemFromArray([0.25, 0.5, 1.2, 2.5, 7.8])
        : rng.randomItemFromArray([250, 500, 750, 1250, 2750])
    const result =
      Math.round(((value * factor(from)) / factor(to)) * 10000) / 10000

    return { value, from, to, result }
  },

  originalData: {
    value: 0.75,
    from: 'l',
    to: 'ml',
    result: 750,
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
            href="/content/AV_Prüfungen/ml_l.png"
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
            src="https://www.youtube.com/embed/NItq_I7Yz9M"
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
