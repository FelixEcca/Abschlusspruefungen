// exercise9571.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  rOuter: number
  rInner: number
  unit: Unit
  areaOuter: number
  areaInner: number
  areaRing: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

function unitLatex(unit: Unit) {
  return `\\mathrm{${unit}}`
}

export const exercise9571: Exercise<DATA> = {
  title: 'Fläche Kreisring',
  source: 'Figuren und Flächen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const rOuter =
      unit === 'cm'
        ? rng.randomItemFromArray([5, 6, 8, 10, 12])
        : unit === 'dm'
          ? rng.randomItemFromArray([4, 5, 6, 8])
          : rng.randomItemFromArray([2, 3, 4, 5])

    const rInner = rng.randomItemFromArray(
      Array.from({ length: rOuter - 1 }, (_, i) => i + 1),
    )

    const areaOuter = round2(Math.PI * rOuter * rOuter)
    const areaInner = round2(Math.PI * rInner * rInner)
    const areaRing = round2(areaOuter - areaInner)

    return { rOuter, rInner, unit, areaOuter, areaInner, areaRing }
  },

  originalData: {
    rOuter: 8,
    rInner: 5,
    unit: 'cm',
    areaOuter: 201.06,
    areaInner: 78.54,
    areaRing: 122.52,
  },

  constraint({ data }) {
    return data.rOuter > data.rInner && data.areaRing > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie den Flächeninhalt des Kreisrings.</p>

        <svg viewBox="0 0 328 190">
          <circle
            cx="164"
            cy="95"
            r="70"
            fill="#eee"
            stroke="black"
            strokeWidth="2"
          />
          <circle
            cx="164"
            cy="95"
            r="42"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          <line x1="164" y1="95" x2="234" y2="95" stroke="black" />
          <line x1="164" y1="95" x2="164" y2="137" stroke="black" />

          <text x="185" y="90" fontSize="16">
            R = {pp(data.rOuter)} {data.unit}
          </text>
          <text x="150" y="110" fontSize="16">
            r = {pp(data.rInner)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>
          Ein Kreisring besteht aus einem großen Kreis minus einem kleinen
          Kreis.
        </p>

        <p>Großer Kreis:</p>
        <InlineMath
          math={`A_1=\\pi\\cdot ${pp(data.rOuter)}^2\\approx ${pp(
            data.areaOuter,
          )}\\,${unitLatex(data.unit)}^2`}
        />

        <p>Kleiner Kreis:</p>
        <InlineMath
          math={`A_2=\\pi\\cdot ${pp(data.rInner)}^2\\approx ${pp(
            data.areaInner,
          )}\\,${unitLatex(data.unit)}^2`}
        />

        <p>Kreisring:</p>
        <InlineMath
          math={`A=A_1-A_2=${pp(data.areaOuter)}-${pp(data.areaInner)}=${pp(
            data.areaRing,
          )}\\,${unitLatex(data.unit)}^2`}
        />

        <p>
          Der Flächeninhalt beträgt ungefähr{' '}
          <b>
            {pp(data.areaRing)} {data.unit}²
          </b>
          .
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/f4P0vTc7XpA"
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
