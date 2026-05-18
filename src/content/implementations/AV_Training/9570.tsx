// exercise9570.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'
type Given = 'r' | 'd'

interface DATA {
  given: Given
  r: number
  d: number
  unit: Unit
  area: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9570: Exercise<DATA> = {
  title: 'Fläche Kreis',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const given: Given = rng.randomItemFromArray(['r', 'd'])

    const r =
      unit === 'cm'
        ? rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 10])
        : unit === 'dm'
          ? rng.randomItemFromArray([2, 3, 4, 5, 6])
          : rng.randomItemFromArray([1, 2, 3, 4, 5])

    const d = 2 * r
    const area = round2(Math.PI * r * r)

    return { given, r, d, unit, area }
  },

  originalData: {
    given: 'r',
    r: 5,
    d: 10,
    unit: 'cm',
    area: 78.54,
  },

  constraint({ data }) {
    return data.r > 0 && data.area > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt des Kreises.</p>

        <svg viewBox="0 0 328 180">
          <circle
            cx="164"
            cy="90"
            r="58"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />

          {data.given === 'r' ? (
            <>
              <line x1="164" y1="90" x2="222" y2="90" stroke="black" />
              <text x="185" y="82" fontSize="15">
                r = {pp(data.r)} {data.unit}
              </text>
            </>
          ) : (
            <>
              <line x1="106" y1="90" x2="222" y2="90" stroke="black" />
              <text x="164" y="82" fontSize="15" textAnchor="middle">
                d = {pp(data.d)} {data.unit}
              </text>
            </>
          )}
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Beim Kreis gilt:</p>
        <InlineMath math={`A=\\pi\\cdot r^2`} />

        {data.given === 'd' && (
          <>
            <p>Zuerst wird der Radius berechnet.</p>
            <InlineMath
              math={`r=\\frac{d}{2}=\\frac{${pp(data.d)}}{2}=${pp(
                data.r,
              )}\\,${unitLatex(data.unit)}`}
            />
          </>
        )}

        <p>Einsetzen:</p>
        <InlineMath math={`A=\\pi\\cdot ${pp(data.r)}^2`} />
        <br />
        <InlineMath
          math={`A\\approx ${pp(data.area)}\\,${unitLatex(data.unit)}^2`}
        />

        <p>
          Der Flächeninhalt beträgt ungefähr{' '}
          <b>
            {pp(data.area)} {data.unit}²
          </b>
          .
        </p>
      </>
    )
  },
}
