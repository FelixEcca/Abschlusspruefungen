// exercise9579.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'

interface DATA {
  g: number
  h: number
  unit: Unit
  volume: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9579: Exercise<DATA> = {
  title: 'Volumen Pyramide',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])

    const g =
      unit === 'cm'
        ? rng.randomItemFromArray([36, 48, 60, 80, 100, 120])
        : unit === 'dm'
          ? rng.randomItemFromArray([12, 18, 24, 30, 36])
          : rng.randomItemFromArray([6, 9, 12, 15, 18])

    const h =
      unit === 'cm'
        ? rng.randomItemFromArray([6, 9, 12, 15])
        : unit === 'dm'
          ? rng.randomItemFromArray([3, 6, 9, 12])
          : rng.randomItemFromArray([3, 6, 9])

    const volume = round2((g * h) / 3)

    return { g, h, unit, volume }
  },

  originalData: {
    g: 60,
    h: 12,
    unit: 'cm',
    volume: 240,
  },

  constraint({ data }) {
    return data.volume > 0
  },

  task({ data }) {
    return (
      <>
        <p>Berechnen Sie das Volumen der Pyramide.</p>

        <svg viewBox="0 0 300 190">
          <polygon
            points="70,140 210,140 245,105 110,105"
            fill="#eee"
            stroke="black"
          />
          <line x1="70" y1="140" x2="155" y2="35" stroke="black" />
          <line x1="210" y1="140" x2="155" y2="35" stroke="black" />
          <line x1="245" y1="105" x2="155" y2="35" stroke="black" />
          <line x1="110" y1="105" x2="155" y2="35" stroke="black" />
          <line
            x1="155"
            y1="35"
            x2="155"
            y2="122"
            stroke="black"
            strokeDasharray="5 4"
          />

          <text x="122" y="165" fontSize="14">
            G = {pp(data.g)} {data.unit}²
          </text>
          <text x="165" y="86" fontSize="14">
            h = {pp(data.h)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        <p>Bei der Pyramide gilt:</p>
        <InlineMath math="V=\frac{G\cdot h}{3}" />

        <p>Einsetzen:</p>
        <InlineMath
          math={`V=\\frac{${pp(data.g)}\\cdot ${pp(data.h)}}{3}=${pp(
            data.volume,
          )}\\,\\mathrm{${data.unit}}^3`}
        />

        <p>
          Das Volumen beträgt{' '}
          <b>
            {pp(data.volume)} {data.unit}³
          </b>
          .
        </p>
        <h2>Erklärvideo</h2>
        <p>Hier gibt es noch ein Erklärungsvideo:</p>
        <div className="my-4">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/bAW92gLFCiQ"
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
