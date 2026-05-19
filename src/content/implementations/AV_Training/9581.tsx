// exercise9581.tsx
import { Exercise } from '@/data/types'
import { InlineMath } from 'react-katex'
import { pp } from '@/helper/pretty-print'

type Unit = 'cm' | 'dm' | 'm'
type Body = 'kugel' | 'halbkugel'

interface DATA {
  body: Body
  r: number
  unit: Unit
  volume: number
}

function round2(x: number) {
  return Math.round(x * 100) / 100
}

export const exercise9581: Exercise<DATA> = {
  title: 'Volumen Kugel',
  source: 'Körper und Volumen',
  useCalculator: true,
  duration: 42,
  points: 42,

  generator(rng) {
    const body: Body = rng.randomItemFromArray(['kugel', 'halbkugel'])
    const unit: Unit = rng.randomItemFromArray(['cm', 'dm', 'm'])
    const r = rng.randomItemFromArray([2, 3, 4, 5, 6, 8, 10])

    const full = (4 / 3) * Math.PI * r * r * r
    const volume = round2(body === 'kugel' ? full : full / 2)

    return { body, r, unit, volume }
  },

  originalData: {
    body: 'kugel',
    r: 5,
    unit: 'cm',
    volume: 523.6,
  },

  constraint({ data }) {
    return data.volume > 0
  },

  task({ data }) {
    return (
      <>
        <p>
          Berechnen Sie das Volumen {data.body === 'kugel' ? 'der Kugel' : 'der Halbkugel'}.
        </p>

        <svg viewBox="0 0 260 190">
          {data.body === 'kugel' ? (
            <>
              <circle cx="130" cy="95" r="65" fill="#eee" stroke="black" />
              <ellipse cx="130" cy="95" rx="65" ry="18" fill="none" stroke="black" />
              <line x1="130" y1="95" x2="195" y2="95" stroke="black" />
            </>
          ) : (
            <>
              <path d="M 65 105 A 65 65 0 0 1 195 105 L 65 105" fill="#eee" stroke="black" />
              <ellipse cx="130" cy="105" rx="65" ry="18" fill="none" stroke="black" />
              <line x1="130" y1="105" x2="195" y2="105" stroke="black" />
            </>
          )}

          <text x="150" y={data.body === 'kugel' ? 88 : 98} fontSize="14">
            r = {pp(data.r)} {data.unit}
          </text>
        </svg>
      </>
    )
  },

  solution({ data }) {
    return (
      <>
        {data.body === 'kugel' ? (
          <>
            <p>Bei der Kugel gilt:</p>
            <InlineMath math="V=\frac{4}{3}\cdot \pi\cdot r^3" />
            <p>Einsetzen:</p>
            <InlineMath
              math={`V=\\frac{4}{3}\\cdot \\pi\\cdot ${pp(
                data.r,
              )}^3\\approx ${pp(data.volume)}\\,\\mathrm{${data.unit}}^3`}
            />
          </>
        ) : (
          <>
            <p>Eine Halbkugel ist die Hälfte einer Kugel.</p>
            <InlineMath math="V=\frac{1}{2}\cdot \frac{4}{3}\cdot \pi\cdot r^3" />
            <p>Einsetzen:</p>
            <InlineMath
              math={`V=\\frac{1}{2}\\cdot \\frac{4}{3}\\cdot \\pi\\cdot ${pp(
                data.r,
              )}^3\\approx ${pp(data.volume)}\\,\\mathrm{${data.unit}}^3`}
            />
          </>
        )}

        <p>
          Das Volumen beträgt ungefähr <b>{pp(data.volume)} {data.unit}³</b>.
        </p>
      </>
    )
  },
}