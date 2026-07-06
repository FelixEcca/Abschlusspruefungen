// exercise9525.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'mm²' | 'cm²' | 'dm²' | 'm²'

interface DATA {
  value: number
  from: Unit
  to: Unit
  result: number
}

function factor(u: Unit) {
  if (u === 'mm²') return 0.000001
  if (u === 'cm²') return 0.0001
  if (u === 'dm²') return 0.01
  return 1
}

function unit(u: Unit) {
  if (u === 'mm²') return '\\mathrm{mm}^2'
  if (u === 'cm²') return '\\mathrm{cm}^2'
  if (u === 'dm²') return '\\mathrm{dm}^2'
  return '\\mathrm{m}^2'
}

export const exercise9525: Exercise<DATA> = {
  title: 'Flächen umwandeln',
  source: 'Einheiten',
  useCalculator: false,
  duration: 42,
  points: 42,

  generator(rng) {
    const pairs: [Unit, Unit][] = [
      ['mm²', 'cm²'],
      ['cm²', 'mm²'],
      ['cm²', 'dm²'],
      ['dm²', 'cm²'],
      ['dm²', 'm²'],
      ['m²', 'dm²'],
    ]
    const [from, to] = rng.randomItemFromArray(pairs)
    const value =
      from === 'm²'
        ? rng.randomItemFromArray([0.25, 0.5, 1.2, 3.5])
        : rng.randomItemFromArray([12, 25, 48, 120, 350])
    const result =
      Math.round(((value * factor(from)) / factor(to)) * 10000) / 10000

    return { value, from, to, result }
  },

  originalData: {
    value: 42,
    from: 'dm²',
    to: 'm²',
    result: 0.42,
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
          <image href="/content/Mathe_AV/fläche.png" height="100" width="328" />
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
